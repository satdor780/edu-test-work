import { useRef, useEffect, useState, type RefObject } from "react";

interface TextLayoutInfo {
  lineCount: number;
  lastLineFillPercent: number;
}

interface UseTextLayoutReturn {
  ref: RefObject<HTMLParagraphElement | null>;
  lineCount: number;
  lastLineFillPercent: number;
}

export const useTextLayout = (): UseTextLayoutReturn => {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [layout, setLayout] = useState<TextLayoutInfo>({
    lineCount: 0,
    lastLineFillPercent: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const range = document.createRange();
      range.selectNodeContents(el);

      const rects = Array.from(range.getClientRects());
      if (rects.length === 0) return;

      const containerWidth = el.getBoundingClientRect().width;
      if (containerWidth === 0) return;

      const lastLine = rects[rects.length - 1];
      const lastLineFillPercent = lastLine.width / containerWidth;

      setLayout({ lineCount: rects.length, lastLineFillPercent });
    };

    requestAnimationFrame(measure);

    const resizeObserver = new ResizeObserver(() =>
      requestAnimationFrame(measure),
    );
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(() =>
      requestAnimationFrame(measure),
    );
    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return { ref, ...layout };
};
