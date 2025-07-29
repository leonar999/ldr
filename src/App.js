import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// ──────────────────── DATA ────────────────────
const CHAT_LOG = [
  { sender: "Leo", text: "Hey babe, thinking of you ❤️" },
  { sender: "Racheal", text: "Aww, I miss you too 😘" },
  { sender: "Leo", text: "Counting down the days till we’re together again." },
  { sender: "Racheal", text: "Me too! Can’t wait to hug you tight." },
  { sender: "Leo", text: "You’re always in my heart, no matter the distance." }
];

const POEM_LINES = [
  "Racheal, we've had our ups and downs,",
  "Laughed, cried, and seen each other's frowns.",
  "We've fought, we've healed we've made it through,",
  "There's no one else, it's always you.",
  "I pray to God to bless your days,",
  "To guide your steps and light your ways.",
  "My love for you will never shake,",
  "No matter what, it's you I'll take.",
  "For in this life, both tried and true,",
  "I see forever me and you."
];

const LOVE_QUOTES = [
  "You are my today and all of my tomorrows.",
  "Distance means so little when someone means so much.",
  "Every love story is beautiful, but ours is my favourite.",
  "You + Me = Forever ❤️",
  "No matter the distance, we're always under the same sky."
];

export default function RomanticLDRApp() {
  const [hearts, setHearts] = useState([]);
  const [quote, setQuote] = useState("");
  const [showSurprise, setShowSurprise] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);

  // ── ambient hearts every 4 s ──
  useEffect(() => {
    const id = setInterval(() => spawnHearts(5), 4000);
    return () => clearInterval(id);
  }, []);

  // ── auto‑hide surprise/confetti after 6 s ──
  useEffect(() => {
    if (showSurprise) {
      const t = setTimeout(() => {
        setShowSurprise(false);
        setShowConfetti(false);
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [showSurprise]);

  // spawn hearts helper
  const spawnHearts = (count = 1) => {
    const batch = Array.from({ length: count }, () => ({
      id: Date.now() + Math.random(),
      left: Math.random() * 100
    }));
    setHearts((p) => [...p, ...batch]);
    setTimeout(
      () =>
        setHearts((p) =>
          p.filter((h) => !batch.some((b) => b.id === h.id))
        ),
      4000
    );
  };

  // press‑me handler — start music here
  const handleSurpriseClick = () => {
    spawnHearts(15);
    setShowSurprise(true);
    setShowConfetti(true);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.35;
      audio.play().catch(() => {
        console.log("Audio blocked — user interaction required");
      });
    }
  };

  // framer variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.4 } }
  };
  const lineVar = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main
      className="min-vh-100 d-flex flex-column align-items-center"
      style={{
        background:
          "linear-gradient(135deg,#ffe5ec 0%,#ffcad4 50%,#fff3f5 100%)",
        overflow: "hidden"
      }}
    >
      {/* Global CSS */}
      <style>{`
        @keyframes floatUp {
          0% {transform:translateY(0) scale(.8);opacity:1}
          100% {transform:translateY(-600px) scale(1.2);opacity:0}
        }
        .floating-heart {
          animation:floatUp 4s ease-in-out forwards;
          pointer-events:none;
          position:absolute;
          bottom:0;
          font-size:2rem;
        }
        .hover-scale {
          transition:transform .35s,box-shadow .35s
        }
        .hover-scale:hover {
          transform:scale(1.05);
          box-shadow:0 1rem 2.5rem rgba(0,0,0,.15)
        }
        @keyframes confFall {
          0% {transform:translateY(-10vh) rotate(0deg);opacity:1}
          100% {transform:translateY(110vh) rotate(360deg);opacity:0}
        }
        .confetti {
          position:fixed;
          top:-5vh;
          font-size:1.4rem;
          pointer-events:none;
          animation:confFall 4s linear forwards;
        }
      `}</style>

      {/* hidden audio */}
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/assets/Daniel-Caesar.mp3`}
        loop
        preload="auto"
      />

      {/* ambient hearts */}
      {hearts.map((h) => (
        <div key={h.id} className="floating-heart" style={{ left: `${h.left}%` }}>
          ❤️
        </div>
      ))}

      {/* confetti overlay */}
      {showConfetti &&
        Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            🎊
          </span>
        ))}

      <section className="container text-center py-5">
        <h1 className="display-4 fw-bold mb-4 hover-scale">
          Leo <span className="text-danger">💘</span> Racheal
        </h1>

        {/* carousel */}
        <Carousel
          showStatus={false}
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={3500}
          stopOnHover
          className="mb-5 rounded-4 overflow-hidden shadow hover-scale"
        >
          {["photo1.jpg", "photo2.jpg", "photo3.jpg"].map((name, i) => (
            <div key={i} className="position-relative">
              <img
                src={`${process.env.PUBLIC_URL}/assets/${name}`}
                alt={`Slide ${i}`}
                className="d-block w-100"
                style={{ maxHeight: 480, objectFit: "cover" }}
              />
              <p className="position-absolute bottom-0 start-0 end-0 text-white fw-semibold mb-3">
                {i === 0
                  ? "Our first date memory ❤️"
                  : i === 1
                  ? "Smiles across the miles 🥰"
                  : "Always in my heart 💞"}
              </p>
            </div>
          ))}
        </Carousel>

        {/* love note */}
        <Card
          className="bg-light mb-4 shadow-sm mx-auto hover-scale"
          style={{ maxWidth: 640 }}
        >
          <Card.Body className="p-4">
            <p className="fs-4 fst-italic">
              My love, through every sunrise and across every mile, you remain
              my favourite place to be. Thank you for making distance feel like
              nothing. ❤️
            </p>
          </Card.Body>
        </Card>

        {/* animated poem */}
        <Card
          className="bg-warning bg-opacity-10 mb-4 mx-auto hover-scale"
          style={{ maxWidth: 640 }}
        >
          <Card.Body className="p-4">
            <h3 className="mb-3">💫 A Poem for Us</h3>
            <motion.div variants={container} initial="hidden" animate="show">
              {POEM_LINES.map((line, idx) => (
                <motion.p
                  key={idx}
                  variants={lineVar}
                  className="fst-italic mb-1"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          </Card.Body>
        </Card>

        {/* chat bubbles */}
        <div className="mb-4">
          <h2 className="h4 mb-3">💬 Our Sweet Conversations</h2>
          <div className="d-flex flex-column gap-2">
            {CHAT_LOG.map((m, i) => (
              <div
                key={i}
                className={`rounded-3 p-2 px-3 shadow-sm hover-scale align-self-${
                  m.sender === "Leo"
                    ? "start bg-danger text-white"
                    : "end bg-light"
                }`}
                style={{ maxWidth: "75%" }}
              >
                <strong>{m.sender}:</strong> {m.text}
              </div>
            ))}
          </div>
        </div>

        {/* buttons */}
        <div className="d-flex justify-content-center gap-4 mb-4">
          <Button
            variant="outline-danger"
            onClick={() =>
              setQuote(
                LOVE_QUOTES[Math.floor(Math.random() * LOVE_QUOTES.length)]
              )
            }
          >
            Generate Love Quote
          </Button>
          <Button variant="danger" onClick={handleSurpriseClick}>
            Press Me ❤️
          </Button>
        </div>
        {quote && <p className="fst-italic">“{quote}”</p>}

        {/* surprise card */}
        {showSurprise && (
          <motion.div
            className="bg-light p-4 rounded-4 shadow mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220 }}
            style={{ maxWidth: 500 }}
          >
            <h4 className="text-danger">🎉 Surprise!</h4>
            <p className="mb-0">
              You’re the most beautiful part of my life, Racheal. I thank God
              every day for you! 💖
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
}
