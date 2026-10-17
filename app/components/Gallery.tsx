"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Picture } from "../content";

// Framed photos. One or two show at their own shape; more become an even grid.
// Clicking any photo opens the viewer, which pages through the rest.
export default function Gallery({ items }: { items: Picture[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const grid = items.length > 2;

  const close = () => {
    const last = open;
    setOpen(null);
    if (last !== null) buttons.current[last]?.focus();
  };

  return (
    <>
      <ul className={grid ? "gallery gallery-grid" : `gallery gallery-${items.length}`}>
        {items.map((p, i) => (
          <li key={p.src} style={items.length === 2 ? { flex: `${p.width / p.height} 1 0` } : undefined}>
            <button
              className="frame"
              ref={(el) => {
                buttons.current[i] = el;
              }}
              onClick={() => setOpen(i)}
              aria-label={`View photo: ${p.caption ?? p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes={grid ? "(max-width: 700px) 45vw, 240px" : "(max-width: 700px) 90vw, 360px"}
                className={grid ? "frame-img frame-img-crop" : "frame-img"}
              />
            </button>
            {/* in a big grid the captions show in the viewer instead */}
            {p.caption && !grid && <p className="frame-caption">{p.caption}</p>}
          </li>
        ))}
      </ul>
      {/* rendered on <body> so it sits above the channel's header */}
      {open !== null &&
        createPortal(<Viewer items={items} index={open} onIndex={setOpen} onClose={close} />, document.body)}
    </>
  );
}

function Viewer({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: Picture[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const many = items.length > 1;
  const pic = items[index];
  const go = (step: number) => onIndex((index + step + items.length) % items.length);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  // keep the current thumbnail in view
  useEffect(() => {
    stripRef.current
      ?.querySelector<HTMLElement>(`[data-i="${index}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  return (
    <div
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        else if (many && e.key === "ArrowRight") go(1);
        else if (many && e.key === "ArrowLeft") go(-1);
        else return;
        e.preventDefault();
        e.stopPropagation(); // don't also close the channel behind
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || !many) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <header className="viewer-head">
        <span className="viewer-count" aria-live="polite">
          {many ? `${index + 1} / ${items.length}` : ""}
        </span>
        <button className="pill pill-small" ref={closeRef} onClick={onClose}>
          Close
        </button>
      </header>

      <div className="viewer-stage">
        {many && (
          <button className="viewer-arrow" onClick={() => go(-1)} aria-label="Previous photo">
            ‹
          </button>
        )}
        <figure className="viewer-figure" key={pic.src}>
          <div className="viewer-frame">
            <Image src={pic.src} alt={pic.alt} width={pic.width} height={pic.height} sizes="90vw" className="viewer-img" priority />
          </div>
          {pic.caption && <figcaption className="viewer-caption">{pic.caption}</figcaption>}
        </figure>
        {many && (
          <button className="viewer-arrow" onClick={() => go(1)} aria-label="Next photo">
            ›
          </button>
        )}
      </div>

      {many && (
        <div className="viewer-strip" ref={stripRef}>
          {items.map((p, i) => (
            <button
              key={p.src}
              data-i={i}
              className={`viewer-thumb ${i === index ? "is-current" : ""}`}
              onClick={() => onIndex(i)}
              aria-label={`Photo ${i + 1}: ${p.caption ?? p.alt}`}
              aria-current={i === index ? "true" : undefined}
            >
              <Image src={p.src} alt="" width={p.width} height={p.height} sizes="72px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
