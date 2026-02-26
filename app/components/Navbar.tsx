import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-2 bg-black/40 backdrop-blur text-white z-50">
      <Link href="/" className="font-semibold text-lg">
        Theodore Ormes Jackson III
      </Link>

      <div className="space-x-6 text-sm">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/resume">Resume</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/skills">Skills</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}