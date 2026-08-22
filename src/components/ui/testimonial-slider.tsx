import { useState, useRef, useEffect, useCallback } from "react";
import { Transition } from "@headlessui/react";

export interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

export const Component = ({
  testimonials,
  activeIndex,
  onActiveChange,
}: {
  testimonials: Testimonial[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [internalActive, setInternalActive] = useState<number>(0);

  const isControlled = activeIndex !== undefined;
  const active = isControlled ? activeIndex : internalActive;

  const setActive = useCallback((index: number | ((prev: number) => number)) => {
    if (typeof index === "function") {
      setInternalActive((prev) => {
        const next = index(prev);
        if (onActiveChange) onActiveChange(next);
        return next;
      });
    } else {
      setInternalActive(index);
      if (onActiveChange) onActiveChange(index);
    }
  }, [onActiveChange]);

  const isLockedRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number | null>(null);

  // Handle step change with locking mechanism
  const changeTestimonial = useCallback(
    (direction: "next" | "prev", e?: Event) => {
      if (isLockedRef.current) {
        if (e && e.cancelable) e.preventDefault();
        return;
      }

      if (direction === "next") {
        if (active < testimonials.length - 1) {
          if (e && e.cancelable) e.preventDefault();
          setActive(active + 1);
          isLockedRef.current = true;
          setTimeout(() => {
            isLockedRef.current = false;
          }, 600);
        }
      } else if (direction === "prev") {
        if (active > 0) {
          if (e && e.cancelable) e.preventDefault();
          setActive(active - 1);
          isLockedRef.current = true;
          setTimeout(() => {
            isLockedRef.current = false;
          }, 600);
        }
      }
    },
    [active, testimonials.length, setActive]
  );

  // Wheel, trackpad, and touch event listeners (only when uncontrolled)
  useEffect(() => {
    if (isControlled) return;
    const element = containerRef.current;
    if (!element) return;

    let accumulatedDeltaY = 0;
    let resetTimer: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      // Check if element is in visible viewport region
      const rect = element.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;

      if (!inView) return;

      accumulatedDeltaY += e.deltaY;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accumulatedDeltaY = 0;
      }, 200);

      const deltaThreshold = 18;

      if (e.deltaY > deltaThreshold || accumulatedDeltaY > 35) {
        if (active < testimonials.length - 1) {
          if (e.cancelable) e.preventDefault();
          changeTestimonial("next", e);
          accumulatedDeltaY = 0;
        }
      } else if (e.deltaY < -deltaThreshold || accumulatedDeltaY < -35) {
        if (active > 0) {
          if (e.cancelable) e.preventDefault();
          changeTestimonial("prev", e);
          accumulatedDeltaY = 0;
        }
      } else if (isLockedRef.current) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;

      const rect = element.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
      if (!inView) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;

      if (Math.abs(deltaY) > 25) {
        if (deltaY > 0) {
          if (active < testimonials.length - 1) {
            if (e.cancelable) e.preventDefault();
            changeTestimonial("next", e);
            touchStartYRef.current = currentY;
          }
        } else {
          if (active > 0) {
            if (e.cancelable) e.preventDefault();
            changeTestimonial("prev", e);
            touchStartYRef.current = currentY;
          }
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("wheel", handleWheel);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [active, testimonials.length, changeTestimonial, isControlled]);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-3xl text-center select-none py-2">
      {/* Avatar Slider */}
      <div className="relative h-24 sm:h-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2">
          <div className="h-24 sm:h-28">
            {testimonials.map((testimonial, index) => (
              <Transition
                as="div"
                key={index}
                show={active === index}
                className="absolute inset-0 -z-10 h-full"
                enter="transition-all duration-500 ease-out order-first"
                enterFrom="opacity-0 translate-y-3 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="transition-all duration-300 ease-in absolute inset-0"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 -translate-y-3 scale-95"
              >
                <img
                  className="relative left-1/2 top-4 sm:top-6 -translate-x-1/2 rounded-full object-cover shadow-sm ring-2 ring-[#0B0D12]/20"
                  src={testimonial.img}
                  width={56}
                  height={56}
                  alt={testimonial.name}
                />
              </Transition>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Slider */}
      <div className="mb-8 sm:mb-9">
        <div className="grid items-center" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <Transition
              key={index}
              show={active === index}
              enter="transition-all duration-500 ease-out z-10"
              enterFrom="opacity-0 translate-y-3"
              enterTo="opacity-100 translate-y-0"
              leave="transition-all duration-300 ease-in z-0"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-3"
            >
              <div className="col-start-1 row-start-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B0D12] leading-relaxed px-4 sm:px-6 before:content-['\201C'] after:content-['\201D']">
                  {testimonial.quote}
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>

      {/* Author Indicator Badges */}
      <div className="-m-1 flex flex-wrap justify-center gap-1.5">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            className={`m-1 inline-flex justify-center items-center whitespace-nowrap rounded px-3.5 py-1.5 text-xs font-mono transition-all duration-200 cursor-pointer select-none ${
              active === index
                ? "bg-[#0B0D12] text-white shadow-xs font-bold"
                : "bg-[#FAF8F5] text-[#0B0D12] border border-[#0B0D12]/15 hover:border-[#0B0D12]"
            }`}
          >
            <span>{testimonial.name}</span>{" "}
            <span
              className={`mx-1.5 ${
                active === index ? "text-[#FF4A1C]" : "text-[#5A5E6E]"
              }`}
            >
              /
            </span>{" "}
            <span className={active === index ? "text-[#F4F1EA]/80" : "text-[#5A5E6E]"}>{testimonial.role}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Component;
