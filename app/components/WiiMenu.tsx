"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { channels, credits, gridSlots, person, type Block, type Channel } from "../content";
import Icon from "./Icon";
import { useSounds } from "./sounds";

type Stage = "preview" | "content";
type Open = { channel: Channel; stage: Stage; origin: string } | null;

export default function WiiMenu() {
  const [open, setOpen] = useState<Open>(null);
  const [soundOn, setSoundOn] = useState(false);
  const sounds = useSounds(soundOn);
  const lastTile = useRef<HTMLElement | null>(null);

  // Open a channel from the URL (#work), and follow the back button.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      const channel = channels.find((c) => c.id === id);
      setOpen(channel ? { channel, stage: "content", origin: "50% 50%" } : null);
    };
    fromHash();
    window.addEventListener("popstate", fromHash);
    return () => window.removeEventListener("popstate", fromHash);
  }, []);

  const openChannel = (channel: Channel, el: HTMLElement) => {
    lastTile.current = el;
    const r = el.getBoundingClientRect();
    const origin = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    sounds.select();
    setOpen({ channel, stage: "preview", origin });
  };

  const start = () => {
    if (!open) return;
    sounds.select();
    window.history.pushState(null, "", `#${open.channel.id}`);
    setOpen({ ...open, stage: "content" });
  };

  const close = () => {
    sounds.back();
    if (window.location.hash) window.history.pushState(null, "", window.location.pathname);
    setOpen(null);
    lastTile.current?.focus();
  };

  const empty = Math.max(gridSlots - channels.length, 0);
  const about = channels.find((c) => c.id === "about");
  const contact = channels.find((c) => c.id === "contact");

  return (
    <div className="wii">
      <Bubbles />

      <main className="menu" aria-hidden={open ? true : undefined}>
        <h1 className="sr-only">{person.fullName}, portfolio</h1>
        <ul className="grid" aria-label="Channels">
          {channels.map((c) => (
            <li key={c.id}>
              <button
                className={`tile tint-${c.tint}`}
                onClick={(e) => openChannel(c, e.currentTarget)}
                onMouseEnter={sounds.hover}
                onFocus={sounds.hover}
              >
                <span className="tile-face">
                  <Icon name={c.icon} className="tile-icon" />
                  <span className="tile-name">{c.name}</span>
                </span>
              </button>
            </li>
          ))}
          {Array.from({ length: empty }, (_, i) => (
            <li key={`empty-${i}`} aria-hidden="true">
              <span className="tile tile-empty" />
            </li>
          ))}
        </ul>
      </main>

      <BottomBar
        hidden={!!open}
        soundOn={soundOn}
        onToggleSound={() => setSoundOn((s) => !s)}
        onLeft={(el) => about && openChannel(about, el)}
        onRight={(el) => contact && openChannel(contact, el)}
      />

      {open && (
        <ChannelScreen
          key={open.channel.id + open.stage}
          open={open}
          onStart={start}
          onClose={close}
          onHover={sounds.hover}
        />
      )}
    </div>
  );
}

function BottomBar({
  hidden,
  soundOn,
  onToggleSound,
  onLeft,
  onRight,
}: {
  hidden: boolean;
  soundOn: boolean;
  onToggleSound: () => void;
  onLeft: (el: HTMLElement) => void;
  onRight: (el: HTMLElement) => void;
}) {
  const now = useNow();
  const time = now
    ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "")
    : "";
  const ampm = now ? (now.getHours() < 12 ? "AM" : "PM") : "";
  const date = now
    ? `${now.toLocaleDateString([], { weekday: "short" })} ${now.getMonth() + 1}/${now.getDate()}`
    : "";

  return (
    <footer className="bar" aria-hidden={hidden ? true : undefined}>
      <div className="clock" aria-label={now ? `${time} ${ampm}` : undefined}>
        <span className="clock-time">
          {time.split(":").map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="clock-colon">:</span>}
              {part}
            </span>
          ))}
        </span>
        <span className="clock-ampm">{ampm}</span>
      </div>

      <div className="bar-panel">
        <svg className="bar-shape" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="bar-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7f7f7" />
              <stop offset="1" stopColor="#dcdcdc" />
            </linearGradient>
          </defs>
          <path
            d="M0 20 H250 C300 20 310 70 360 70 H1080 C1130 70 1140 20 1190 20 H1440 V160 H0 Z"
            fill="url(#bar-fill)"
          />
          <path
            d="M0 20 H250 C300 20 310 70 360 70 H1080 C1130 70 1140 20 1190 20 H1440"
            fill="none"
            stroke="#5fd0f5"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <button className="round round-left" onClick={(e) => onLeft(e.currentTarget)} aria-label="About Tre">
          <span>Tre</span>
        </button>

        <p className="bar-date">{date}</p>

        <button
          className={`sound ${soundOn ? "is-on" : ""}`}
          onClick={onToggleSound}
          aria-pressed={soundOn}
        >
          Sound {soundOn ? "on" : "off"}
        </button>

        <button className="round round-right" onClick={(e) => onRight(e.currentTarget)} aria-label="Contact Tre">
          <Icon name="mail" className="round-icon" />
        </button>
      </div>
    </footer>
  );
}

function ChannelScreen({
  open,
  onStart,
  onClose,
  onHover,
}: {
  open: NonNullable<Open>;
  onStart: () => void;
  onClose: () => void;
  onHover: () => void;
}) {
  const { channel, stage, origin } = open;
  const startRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    (stage === "preview" ? startRef : backRef).current?.focus({ preventScroll: true });
  }, [stage]);

  if (stage === "preview") {
    return (
      <div
        className={`screen preview tint-${channel.tint}`}
        style={{ transformOrigin: origin }}
        role="dialog"
        aria-modal="true"
        aria-label={channel.name}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      >
        <Bubbles />
        <div className="preview-banner">
          <Icon name={channel.icon} className="preview-icon" />
          <h2 className="preview-name">{channel.name}</h2>
          <p className="preview-tagline">{channel.tagline}</p>
        </div>
        <div className="preview-actions">
          <button className="pill" onClick={onClose} onMouseEnter={onHover}>
            Wii Menu
          </button>
          <button className="pill" ref={startRef} onClick={onStart} onMouseEnter={onHover}>
            Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`screen content tint-${channel.tint}`} role="dialog" aria-modal="true" aria-label={channel.name} onKeyDown={(e) => e.key === "Escape" && onClose()}>
      <Bubbles />
      <header className="content-head">
        <button className="pill pill-small" ref={backRef} onClick={onClose} onMouseEnter={onHover}>
          ‹ Wii Menu
        </button>
        <span className="content-title">
          <Icon name={channel.icon} className="content-icon" />
          {channel.name}
        </span>
      </header>
      <div className="content-scroll">
        <article className="glass">
          <h2 className="glass-title">{channel.tagline}</h2>
          {channel.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
          {channel.id === "photos" && (
            <p className="credits">
              Photos from Wikimedia Commons:{" "}
              {credits.map((c, i) => (
                <span key={c.url}>
                  <a href={c.url} target="_blank" rel="noreferrer">
                    {c.title}
                  </a>{" "}
                  ({c.by}, {c.licence}){i < credits.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          )}
        </article>
      </div>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  const heading = block.heading ? <h3 className="block-head">{block.heading}</h3> : null;
  switch (block.type) {
    case "text":
      return (
        <section className="block">
          {heading}
          <p className="block-text">{block.text}</p>
        </section>
      );
    case "facts":
      return (
        <section className="block">
          {heading}
          <dl className="facts">
            {block.items.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case "entries":
      return (
        <section className="block">
          {heading}
          <ul className="entries">
            {block.items.map((e) => (
              <li key={e.title} className="entry">
                <p className="entry-title">{e.title}</p>
                <p className="entry-meta">{e.meta}</p>
                {e.points && (
                  <ul className="entry-points">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      );
    case "tags":
      return (
        <section className="block">
          {heading}
          <ul className="tags">
            {block.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      );
    case "photos":
      return (
        <section className="block">
          {heading}
          <ul className="photos">
            {block.items.map((p) => (
              <li key={p.src}>
                <figure>
                  <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 700px) 90vw, 400px" />
                  <figcaption>{p.alt}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      );
    case "links":
      return (
        <section className="block">
          {heading}
          <p className="links">
            {block.items.map((l) => (
              <a
                key={l.label}
                className="pill pill-link"
                href={l.href}
                {...(l.download
                  ? { download: "" }
                  : l.href.startsWith("http") || l.href.endsWith(".pdf")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
              >
                {l.label}
              </a>
            ))}
          </p>
        </section>
      );
    case "pdf":
      return (
        <section className="block">
          {heading}
          <iframe className="pdf-frame" src={`${block.src}#navpanes=0&view=FitH`} title={block.title} />
        </section>
      );
  }
}

function Bubbles() {
  return (
    <div className="bubbles" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className={`bubble b${i}`} />
      ))}
    </div>
  );
}

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const t = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(t);
    };
  }, []);
  return now;
}
