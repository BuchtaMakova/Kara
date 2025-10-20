import { useRef, useState } from "react";
import "./App.css";

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

function App() {
  const [yesScale, setYesScale] = useState(1);
  const [noClicks, setNoClicks] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const noBtnRef = useRef<HTMLButtonElement | null>(null);
  const [noDodging, setNoDodging] = useState(false);
  const [noWrapperMinWidth, setNoWrapperMinWidth] = useState<number | null>(
    null
  );
  const [initialIndex, setInitialIndex] = useState(0);
  const [repeatIndex, setRepeatIndex] = useState(0);

  const davidImage = "david.jpeg";
  const [imgSrc, setImgSrc] = useState("karka.jpg");

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
      if (repeatingQuestions.length === 0) return 0;
      return (r + 1) % repeatingQuestions.length;
    });

    setYesScale((prev) => prev + 0.1);
    setNoClicks((prev) => {
      const newCount = prev + 1;
      const threshold = 5;

      if (newCount >= threshold) {
        setImgSrc(davidImage);
      } else if (newCount >= 1 && newCount <= numberImages.length) {
        setImgSrc(numberImages[newCount - 1]);
      } else {
        setImgSrc("karka.jpg");
      }

      if (newCount >= threshold) {
        const container = containerRef.current;
        const btn = noBtnRef.current;

        if (container && btn && !noDodging) {
          const btnRect = btn.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const measuredTop = btnRect.top - containerRect.top;
          const measuredLeft = btnRect.left - containerRect.left;
          const btnH = btn.offsetHeight || 40;
          const btnW = btn.offsetWidth || 80;
          setNoWrapperMinWidth(btnW);
          setNoDodging(true);
          setNoPosition({ top: measuredTop, left: measuredLeft });
          const maxTop = Math.max(0, container.clientHeight - btnH);
          const maxLeft = Math.max(0, container.clientWidth - btnW);
          const randomTop = Math.random() * maxTop;
          const randomLeft = Math.random() * maxLeft;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setNoPosition({ top: randomTop, left: randomLeft });
            });
          });
        } else if (container && btn) {
          const btnH = btn.offsetHeight || 40;
          const btnW = btn.offsetWidth || 80;
          setNoWrapperMinWidth((w) => w ?? btnW);
          const maxTop = Math.max(0, container.clientHeight - btnH);
          const maxLeft = Math.max(0, container.clientWidth - btnW);
          const randomTop = Math.random() * maxTop;
          const randomLeft = Math.random() * maxLeft;
          setNoPosition({ top: randomTop, left: randomLeft });
          setNoDodging(true);
        } else {
          const randomTop = Math.random() * (window.innerHeight * 0.8);
          const randomLeft = Math.random() * (window.innerWidth * 0.8);
          setNoPosition({ top: randomTop, left: randomLeft });
          setNoDodging(true);
        }
      }

      return newCount;
    });
  };

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
              style={{
                transform: `scale(${yesScale})`,
                transition: "transform 0.2s ease",
              }}
            >
              Yes
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
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
