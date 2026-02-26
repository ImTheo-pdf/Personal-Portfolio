"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

type Props = {
  fileUrl?: string;
};

export default function Resume3D({ fileUrl = "/resume.pdf" }: Props) {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
  }, []);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);

  const [zoom, setZoom] = useState(2);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    const maxTilt = 10;
    const ry = (px - 0.5) * (maxTilt * 2);
    const rx = -(py - 0.5) * (maxTilt * 2);

    setTilt({
      rx: clamp(rx, -maxTilt, maxTilt),
      ry: clamp(ry, -maxTilt, maxTilt),
    });
  };

  const onMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  const canPrev = page > 1;
  const canNext = page < numPages;

  const zoomLabel = useMemo(() => `${Math.round(zoom * 100)}%`, [zoom]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2 text-white">
        <button
          className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
          onClick={() => setZoom((z) => clamp(z - 0.1, 0.8, 3))}
        >
          −
        </button>
        <div className="px-3 py-1 rounded-md bg-white/10">{zoomLabel}</div>
        <button
          className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
          onClick={() => setZoom((z) => clamp(z + 0.1, 0.8, 3))}
        >
          +
        </button>

        <div className="w-px h-6 bg-white/20 mx-2" />

        <button
          className={`px-3 py-1 rounded-md transition ${
            canPrev
              ? "bg-white/10 hover:bg-white/20"
              : "bg-white/5 opacity-50 cursor-not-allowed"
          }`}
          onClick={() => canPrev && setPage((p) => p - 1)}
        >
          Prev
        </button>

        <div className="px-3 py-1 rounded-md bg-white/10">
          Page {page} / {numPages}
        </div>

        <button
          className={`px-3 py-1 rounded-md transition ${
            canNext
              ? "bg-white/10 hover:bg-white/20"
              : "bg-white/5 opacity-50 cursor-not-allowed"
          }`}
          onClick={() => canNext && setPage((p) => p + 1)}
        >
          Next
        </button>

        <a
          className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open PDF
        </a>
      </div>

      <div className="w-full flex justify-center">
        <div className="perspective-[1200px]">
          <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative rounded-2xl bg-white/10 border border-white/15 shadow-xl backdrop-blur-md p-4"
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
              transition: "transform 120ms ease",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="rounded-xl overflow-hidden bg-white"
              style={{ transform: "translateZ(30px)" }}
            >
              <Document
                file={fileUrl}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                  setPage(1);
                }}
                loading={<div className="p-6 text-black">Loading resume…</div>}
                error={
                  <div className="p-6 text-black">
                    Couldn’t load the PDF. Make sure /public/resume.pdf exists.
                  </div>
                }
              >
                <Page
                  pageNumber={page}
                  scale={zoom}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </div>

            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08) inset, 0 30px 80px rgba(0,0,0,0.35)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}