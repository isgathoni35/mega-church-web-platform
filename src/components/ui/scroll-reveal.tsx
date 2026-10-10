"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR =
  ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale";

/**
 * ScrollObserverInit
 * Globally initializes IntersectionObserver for all .scroll-reveal* elements.
 * Automatically marks elements above the fold visible immediately, and
 * smoothly reveals elements as the user scrolls down the page.
 */
export function ScrollObserverInit() {
  const pathname = usePathname();

  useEffect(() => {
    // If user prefers reduced motion or browser doesn't support IntersectionObserver, reveal all immediately
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        el.classList.add("scroll-reveal-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(REVEAL_SELECTOR);
      const viewportHeight = window.innerHeight;

      elements.forEach((el) => {
        if (el.classList.contains("scroll-reveal-visible")) return;

        const rect = el.getBoundingClientRect();
        // Immediately reveal if already visible or above viewport on page load
        if (rect.top <= viewportHeight * 0.95 && rect.bottom >= 0) {
          el.classList.add("scroll-reveal-visible");
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial check
    observeElements();

    // Re-check shortly after initial paint for hydration & dynamic images
    const timeoutId = setTimeout(observeElements, 120);

    // MutationObserver to watch for newly mounted DOM sections
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "up" | "left" | "right" | "scale";
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  as?: React.ElementType;
}

/**
 * ScrollReveal
 * Declarative wrapper for scroll reveal animations.
 */
export function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Component = "div",
  ...props
}: ScrollRevealProps) {
  const variantClass =
    variant === "left"
      ? "scroll-reveal-left"
      : variant === "right"
      ? "scroll-reveal-right"
      : variant === "scale"
      ? "scroll-reveal-scale"
      : "scroll-reveal";

  const delayClass = delay > 0 ? `stagger-${delay}` : "";

  return (
    <Component
      className={`${variantClass} ${delayClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
