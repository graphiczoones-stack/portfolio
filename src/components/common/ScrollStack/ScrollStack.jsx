import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete
}) => {
    const scrollerRef = useRef(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef(null);
    const lenisRef = useRef(null);
    const cardsRef = useRef([]);
    const lastTransformsRef = useRef(new Map());
    const isUpdatingRef = useRef(false);

    // PERFORMANCE FIX: Cache offsets to avoid layout thrashing
    const cardOffsetsRef = useRef([]);
    const endElementOffsetRef = useRef(0);

    const calculateProgress = useCallback((scrollTop, start, end) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value, containerHeight) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
                scrollContainer: document.documentElement
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller.scrollTop,
                containerHeight: scroller.clientHeight,
                scrollContainer: scroller
            };
        }
    }, [useWindowScroll]);

    // PERFORMANCE FIX: Use cached offsets
    const getCachedOffset = useCallback((index) => {
        return cardOffsetsRef.current[index] || 0;
    }, []);

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        const endElementTop = endElementOffsetRef.current;

        // PERFORMANCE FIX: Calculate topCardIndex ONCE per frame
        let topCardIndex = 0;
        if (blurAmount) {
            for (let j = 0; j < cardsRef.current.length; j++) {
                const jCardTop = getCachedOffset(j);
                const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
                if (scrollTop >= jTriggerStart) {
                    topCardIndex = j;
                } else {
                    break; // Optimization: offsets are sequential
                }
            }
        }

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = getCachedOffset(i);
            const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount && i < topCardIndex) {
                blur = Math.max(0, (topCardIndex - i) * blurAmount);
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
            }

            const newTransform = {
                translateY: Math.round(translateY * 10) / 10,   // Less precision = fewer updates
                scale: Math.round(scale * 100) / 100,
                rotation: Math.round(rotation * 10) / 10,
                blur: Math.round(blur * 10) / 10
            };

            const lastTransform = lastTransformsRef.current.get(i);

            // PERFORMANCE FIX: Significantly increased thresholds to avoid micro-updates
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.5 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.005 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 1.0 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 1.0;

            if (hasChanged) {
                // PERFORMANCE FIX: Check if card is near the viewport before updating
                const cardInView = scrollTop + containerHeight > cardTop - 500 && scrollTop < cardTop + containerHeight + 500;

                if (cardInView || i === topCardIndex) {
                    const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                    const filter = newTransform.blur > 1 ? `blur(${newTransform.blur}px)` : '';

                    card.style.transform = transform;
                    card.style.filter = filter;

                    lastTransformsRef.current.set(i, newTransform);
                }
            }

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        calculateProgress,
        parsePercentage,
        getScrollData,
        getCachedOffset
    ]);

    const handleScroll = useCallback(() => {
        updateCardTransforms();
    }, [updateCardTransforms]);

    const setupLenis = useCallback(() => {
        const lenisOptions = {
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
            wheelMultiplier: 1,
            lerp: 0.1,
            syncTouch: true,
            syncTouchLerp: 0.075
        };

        if (!useWindowScroll) {
            const scroller = scrollerRef.current;
            if (!scroller) return;
            lenisOptions.wrapper = scroller;
            lenisOptions.content = scroller.querySelector('.scroll-stack-inner');
            lenisOptions.gestureOrientationHandler = true;
            lenisOptions.normalizeWheel = true;
            lenisOptions.touchInertiaMultiplier = 35;
            lenisOptions.touchInertia = 0.6;
        }

        const lenis = new Lenis(lenisOptions);
        lenis.on('scroll', handleScroll);

        const raf = time => {
            lenis.raf(time);
            animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);

        lenisRef.current = lenis;
        return lenis;
    }, [handleScroll, useWindowScroll]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : scroller.querySelectorAll('.scroll-stack-card')
        );

        cardsRef.current = cards;
        const transformsCache = lastTransformsRef.current;

        // Apply initial styles and determine margins
        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            card.style.transform = 'translateZ(0)';
            card.style.webkitTransform = 'translateZ(0)';
            card.style.perspective = '1000px';
            card.style.webkitPerspective = '1000px';
        });

        // PERFORMANCE FIX: Pre-calculate offsets
        const updateOffsets = () => {
            cardOffsetsRef.current = cards.map(card => {
                if (useWindowScroll) {
                    const rect = card.getBoundingClientRect();
                    return rect.top + window.scrollY;
                } else {
                    return card.offsetTop;
                }
            });

            const endElement = useWindowScroll
                ? document.querySelector('.scroll-stack-end')
                : scrollerRef.current?.querySelector('.scroll-stack-end');

            if (endElement) {
                if (useWindowScroll) {
                    const rect = endElement.getBoundingClientRect();
                    endElementOffsetRef.current = rect.top + window.scrollY;
                } else {
                    endElementOffsetRef.current = endElement.offsetTop;
                }
            }
        };

        updateOffsets();
        window.addEventListener('resize', updateOffsets);

        setupLenis();
        updateCardTransforms();

        return () => {
            window.removeEventListener('resize', updateOffsets);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
            stackCompletedRef.current = false;
            cardsRef.current = [];
            transformsCache.clear();
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        setupLenis,
        updateCardTransforms
    ]);

    return (
        <div className={`scroll-stack-scroller ${className} ${useWindowScroll ? 'window-scroll' : ''}`.trim()} ref={scrollerRef}>
            <div className="scroll-stack-inner">
                {children}
                <div className="scroll-stack-end" />
            </div>
        </div>
    );
};

export default ScrollStack;
