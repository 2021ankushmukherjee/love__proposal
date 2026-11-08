
"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  MailOpen,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { proposalContent as c } from "@/data/proposal-content";

const celebrationEmojis = [
  ["🌹", 4, 10, 28, 13],
  ["❤️", 10, 34, 31, 11],
  ["😘", 18, 3, 28, 14],
  ["💞", 89, 14, 28, 12],
  ["👩‍❤️‍👨", 94, 41, 30, 15],
  ["💋", 7, 66, 26, 13],
  ["🥰", 91, 69, 29, 16],
  ["💕", 14, 92, 27, 14],
  ["👩‍❤️‍💋‍👨", 86, 93, 28, 17],
  ["💖", 3, 98, 26, 15],
] as const;

const floatingPetals = [
  ["✦", 8, 16, 0],
  ["❤", 20, 80, 2],
  ["✦", 78, 13, 5],
  ["♥", 89, 68, 1],
  ["✦", 65, 89, 4],
  ["❤", 5, 59, 3],
] as const;

function FloatingPetals() {
  return (
    <div className="floating-petals" aria-hidden>
      {floatingPetals.map(([mark, left, top, delay], i) => (
        <span
          key={`${mark}-${i}`}
          style={
            {
              left: `${left}%`,
              top: `${top}%`,
              "--delay": `${delay}s`,
            } as React.CSSProperties
          }
        >
          {mark}
        </span>
      ))}
    </div>
  );
}

function CelebrationBurst() {
  return (
    <div className="celebration-burst" aria-hidden>
      {celebrationEmojis.map(
        ([emoji, left, bottom, size, duration], i) => (
          <span
            key={i}
            style={
              {
                left: `${left}%`,
                bottom: `-${bottom}px`,
                "--size": `${size}px`,
                "--duration": `${duration}s`,
                "--delay": `${-(i % 5) * 1.15}s`,
              } as React.CSSProperties
            }
          >
            {emoji}
          </span>
        )
      )}
    </div>
  );
}

function Button({
  children,
  onClick,
  secondary = false,
  gold = false,
  className = "",
  onMouseEnter,
  onFocus,
}: {
  children: React.ReactNode;
  onClick: () => void;
  secondary?: boolean;
  gold?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onFocus?: () => void;
}) {
  return (
    <button
      className={`romantic-button ${secondary ? "secondary" : ""} ${
        gold ? "gold" : ""
      } ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
    >
      {children}
    </button>
  );
}

function Welcome({ next }: { next: () => void }) {
  return (
    <section className="content">
      <p className="eyebrow">a small note, made with care</p>

      <h1>
        Hey, {c.recipient}
        <br />
        <span className="pulse-heart">❤️</span>
      </h1>

      <p className="lead">{c.welcome[0]}</p>
      <p className="lead muted">{c.welcome[1]}</p>

      <div className="button-row">
        <Button onClick={next}>
          <MailOpen size={18} /> Open My Heart 💌
        </Button>
      </div>
    </section>
  );
}

function Moment({ next }: { next: () => void }) {
  return (
    <section className="content moment-screen">
      <p className="eyebrow">before I say anything else</p>

      <div className="memory-card">
        <div className="memory-image-wrap">
          <img
            src="/love-letter-moment.png"
            alt="A watercolor love letter surrounded by rose petals"
            className="memory-image"
          />
          <span className="image-glow" />
          <span className="memory-heart">❤</span>
        </div>

        <div className="memory-copy">
          <span className="memory-kicker">
            <Sparkles size={14} /> a little moment
          </span>
          <h2>Some feelings arrive quietly.</h2>
          <p className="lead">
            Not all at once. Sometimes they grow in the spaces between a
            smile, a conversation, and the little moments you never want to
            end.
          </p>
        </div>
      </div>

      <div className="moment-actions">
        <Button onClick={next}>
          Read What&apos;s In My Heart <Heart size={17} fill="currentColor" />
        </Button>
      </div>
    </section>
  );
}

function Letter({ next }: { next: () => void }) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => setRevealed(true), 1150);

    return () => window.clearTimeout(timer);
  }, [open]);

  const openLetter = () => setOpen(true);

  return (
    <section className="content">
      <p className="eyebrow">a letter from my heart</p>

      <div
        className={`envelope ${open ? "open" : ""}`}
        onClick={openLetter}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLetter();
          }
        }}
        aria-label="Open the letter"
      >
        <div className="envelope-back" />
        <div className="envelope-front" />
        <div className="flap" />
        <span className="envelope-seal">❤</span>
      </div>

      <p className="lead">
        {open
          ? "A little note, just for you..."
          : "Tap the envelope to open it."}
      </p>

      {revealed && (
        <motion.article
          className="letter-container"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="letter-content">
            {c.letter.map((line, i) => (
              <p
                key={line}
                className={i === 0 ? "letter-greeting" : ""}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="button-row">
            <Button onClick={next}>
              There&apos;s More... ❤️
            </Button>
          </div>
        </motion.article>
      )}
    </section>
  );
}

function Things({ next }: { next: () => void }) {
  const [i, setI] = useState(0);

  return (
    <section className="content">
      <p className="eyebrow">the little things</p>

      <div className="glass-card thing-card">
        <button
          onClick={() =>
            setI((i + 1) % c.littleThings.length)
          }
          aria-label="Show next thought"
        >
          <span className="thing-number">
            a quiet thought · {i + 1} / {c.littleThings.length}
          </span>

          <p className="quote">
            “{c.littleThings[i]}”
          </p>

          <span className="muted">
            Tap for another{" "}
            <Sparkles
              size={15}
              style={{ verticalAlign: "middle" }}
            />
          </span>
        </button>
      </div>

      <div className="card-nav">
        <button
          className="text-button"
          onClick={() =>
            setI((i - 1 + c.littleThings.length) % c.littleThings.length)
          }
        >
          <ChevronLeft size={16} /> Previous
        </button>

        {i === c.littleThings.length - 1 ? (
          <Button onClick={next}>
            A Small Confession
          </Button>
        ) : (
          <button
            className="text-button"
            onClick={() =>
              setI((i + 1) % c.littleThings.length)
            }
          >
            Next <ChevronRight size={16} />
          </button>
        )}
      </div>
    </section>
  );
}

function Confession({ next }: { next: () => void }) {
  return (
    <section className="content confession">
      <p className="eyebrow">something honest</p>

      {c.confession.map((x) => (
        <p className="lead" key={x}>
          {x}
        </p>
      ))}

      <p className="truth">
        Pratitee, I have
        <br />
        feelings for you.{" "}
        <Heart fill="currentColor" size={28} />
      </p>

      <Button onClick={next}>
        One Last Thing...
      </Button>
    </section>
  );
}


function Proposal({ yes }: { yes: () => void }) {
  const [moves, setMoves] = useState(0);

  const shift = () => {
    setMoves((x) => (x + 1) % 4);
  };

  const translate = [
    "translate(0) rotate(0deg)",
    "translate(-94px,62px) rotate(-7deg)",
    "translate(102px,-54px) rotate(6deg)",
    "translate(-108px,-42px) rotate(-8deg)",
  ][moves];

  return (
    <section className="content">
      <div className="glass-card">
        <p className="eyebrow">
          the question I wanted to ask
        </p>

        <h2>Pratitee... ❤️</h2>

        {c.proposal.map((x) => (
          <p className="lead" key={x}>
            {x}
          </p>
        ))}

        <p className="proposal-question serif">
          Would you give
          <br />
          us a chance? ❤️
        </p>

        <div className="choice-area">
          <Button gold onClick={yes}>
            Yes ❤️
          </Button>

          <Button
            secondary
            className="no-button"
            onMouseEnter={shift}
            onFocus={shift}
            onClick={shift}
          >
            No{" "}
            <X
              size={16}
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>

      <style>{`.no-button{transform:${translate}}`}</style>
    </section>
  );
}


function Accepted() {
  return (
    <section className="content glass-card celebration">
      <h2>
        You just made
        <br />
        my heart smile. ❤️
      </h2>

      <p className="lead">{c.acceptance[1]}</p>

      <div style={{ height: 12 }} />

      {c.promise.map((x) => (
        <p className="lead" key={x}>
          {x}
        </p>
      ))}

      <div className="acceptance-hug" role="img" aria-label="A cute panda giving a warm hug">
        <span className="acceptance-hug-image">
          <img src="/panda-love.gif" alt="" />
        </span>
        <span>A tiny hug, just for you.</span>
      </div>

      <p className="signature">
        {c.signature[0]}
        <br />
        {c.signature[1]}
      </p>
    </section>
  );
}

function Declined() {
  return (
    <section className="content glass-card decline">
      <p className="eyebrow">
        with respect, always
      </p>

      <h2>Thank you for being here.</h2>

      <p className="lead">{c.decline}</p>

      <p className="signature">
        With warmth, always. ❤️
      </p>
    </section>
  );
}

export function ProposalExperience() {
  const [step, setStep] = useState(0);
  const [ending, setEnding] = useState<"yes" | "no" | null>(null);

  const next = () => {
    setStep((x) => Math.min(5, x + 1));
  };

  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step > 0 && !ending) {
        setStep((x) => x - 1);
      }
    };

    window.addEventListener("keydown", f);

    return () => {
      window.removeEventListener("keydown", f);
    };
  }, [step, ending]);

  const screens = [
    <Welcome key="welcome" next={next} />,
    <Moment key="moment" next={next} />,
    <Letter key="letter" next={next} />,
    <Things key="things" next={next} />,
    <Confession key="confession" next={next} />,
    <Proposal
      key="proposal"
      yes={() => setEnding("yes")}
    //   no={() => setEnding("no")}
    />,
  ];

  const body =
    ending === "yes" ? (
      <Accepted />
    ) : ending === "no" ? (
      <Declined />
    ) : (
      screens[step]
    );

  return (
    <main
      className={`proposal-shell ${
        ending === "yes" ? "is-celebrating" : ""
      }`}
    >
      <div className="grain" />
      <FloatingPetals />

      {ending === "yes" && <CelebrationBurst />}

      <div className="stage">
        {step > 0 && !ending && (
          <button
            className="back"
            onClick={() => setStep((x) => x - 1)}
          >
            <ArrowLeft size={18} /> Back
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={ending ?? step}
            initial={{
              opacity: 0,
              y: 18,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0)",
            }}
            exit={{
              opacity: 0,
              y: -12,
              filter: "blur(4px)",
            }}
            transition={{ duration: 0.45 }}
          >
            {body}
          </motion.div>
        </AnimatePresence>
      </div>

      {!ending && (
        <div
          className="progress"
          aria-label={`Step ${step + 1} of 6`}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <i
              key={i}
              className={i === step ? "active" : ""}
            />
          ))}
        </div>
      )}
    </main>
  );
}
