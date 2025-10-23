import { useRef, useState, useEffect } from "react";
import "../../App.css";

interface InitialPageProps {
  onYes: () => void;
}

const initialQuestions = [
  "Miluješ me?",
  "Co prosím?",
  "To nemyslíš vážně, že?",
  "Opravdu?",
  "Dávám ti poslední šanci zmáčknout ne",
  "OKAY, NENECHÁVÁŠ MI JINOU MOŽNOST!",
  "Ha! Jak ti je?",
  "Dříve či později to ANO zmáčknout musíš",
  "To už tě nemůže bavit, ne?",
  "Dělej, Zmáčkni to!!!",
];

const repeatingQuestions = [
  "Neser mě",
  "Urvu ti hlavu",
  "...",
  "Vím kde bydlíš",
  "Naseru ti pod polštář",
  "Tak co teda?",
];

const numberImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
const davidImage = "david.jpeg";
const defaultImage = "karka.jpg";

function InitialPage({ onYes }: InitialPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [yesScale, setYesScale] = useState(1);
  const [, setNoClicks] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const noBtnRef = useRef<HTMLButtonElement | null>(null);
  const [noDodging, setNoDodging] = useState(false);
  const [noWrapperMinWidth, setNoWrapperMinWidth] = useState<number | null>(
    null
  );
  const [initialIndex, setInitialIndex] = useState(0);
  const [repeatIndex, setRepeatIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(defaultImage);

  // 🖼️ Preload images on mount
  useEffect(() => {
    const allImages = [defaultImage, davidImage, ...numberImages];
    let loadedCount = 0;

    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === allImages.length) {
          // small artificial delay to show loader
          setTimeout(() => setIsLoading(false), 1000);
        }
      };
    });
  }, []);

  const currentQuestion =
    initialIndex < initialQuestions.length
      ? initialQuestions[initialIndex]
      : repeatingQuestions[repeatIndex];

  const handleNoClick = () => {
    setInitialIndex((i) => {
      if (i < initialQuestions.length - 1) {
        return i + 1;
      }
      return initialQuestions.length;
    });

    setRepeatIndex((r) => {
      if (initialIndex < initialQuestions.length - 1) {
        return r;
      }
      return (r + 1) % repeatingQuestions.length;
    });

    setYesScale((prev) => prev + 0.3);

    setNoClicks((prev) => {
      const newCount = prev + 1;
      const threshold = 5;

      if (newCount >= threshold) {
        setImgSrc(davidImage);
      } else if (newCount >= 1 && newCount <= numberImages.length) {
        setImgSrc(numberImages[newCount - 1]);
      } else {
        setImgSrc(defaultImage);
      }

      const container = containerRef.current;
      const btn = noBtnRef.current;

      if (newCount >= threshold && container && btn) {
        const btnH = btn.offsetHeight || 40;
        const btnW = btn.offsetWidth || 80;
        setNoWrapperMinWidth((w) => w ?? btnW);
        const maxTop = Math.max(0, container.clientHeight - btnH);
        const maxLeft = Math.max(0, container.clientWidth - btnW);
        const randomTop = Math.random() * maxTop;
        const randomLeft = Math.random() * maxLeft;
        setNoPosition({ top: randomTop, left: randomLeft });
        setNoDodging(true);
      }

      return newCount;
    });
  };

  // 🌀 Loading screen
  if (isLoading) {
    return (
      <div className="content">
        <div className="container">
          <div className="loading-screen">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  // 🌟 Main UI after loading
  return (
    <div ref={containerRef} className="content">
      <div className="container">
        <div className="imageWrapper">
          <img src={imgSrc} className="Image" />
        </div>

        <span className="question">{currentQuestion}</span>
        <div className="buttons">
          <div className="yesWrapper">
            <button
              className="yes-btn"
              onClick={onYes}
              style={{
                transform: `scale(${yesScale})`,
                transition: "transform 0.2s ease",
              }}
            >
              Ano
            </button>
          </div>
          <div
            className="noWrapper"
            style={{
              minWidth: noWrapperMinWidth
                ? `${noWrapperMinWidth}px`
                : undefined,
            }}
          >
            <button
              ref={noBtnRef}
              onClick={handleNoClick}
              className="no-btn"
              style={{
                position: noDodging ? "absolute" : "relative",
                top: noDodging ? `${noPosition.top}px` : undefined,
                left: noDodging ? `${noPosition.left}px` : undefined,
                transition: "top 0.35s ease, left 0.35s ease",
              }}
            >
              Ne
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialPage;
