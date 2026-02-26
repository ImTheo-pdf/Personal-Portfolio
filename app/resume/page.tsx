/*import Resume3D from "../components/Resume3D";

export default function ResumePage() {
  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Resume</h1>

      <div className="max-w-5xl mx-auto">
        <Resume3D fileUrl="/resume.pdf" />
      </div>
    </div>
  );
}*/

"use client";

import dynamic from "next/dynamic";

const Resume3D = dynamic(() => import("../components/Resume3D"), {
  ssr: false,
  loading: () => <div className="text-white">Loading resume…</div>,
});

export default function ResumePage() {
  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Resume</h1>

      <div className="max-w-5xl mx-auto">
        <Resume3D fileUrl="/resume.pdf" />
      </div>
    </div>
  );
}

