import { useEffect, useState, type JSX } from "react";
import "../birthdayPage/birthdayPage.css";

interface BirthdayPageProps {
  onShowCoupon: () => void;
}

function BirthdayPage({ onShowCoupon }: BirthdayPageProps): JSX.Element {
  const birthDate = new Date(2001, 9, 23, 0, 0, 0);

  const getElapsed = () => {
    const now = new Date();
    let diff = Math.max(0, now.getTime() - birthDate.getTime());

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    return { days, hours, minutes, seconds };
  };

  const [elapsed, setElapsed] = useState(getElapsed);

  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="birthDayContent">
      <div className="birthDayContainer">
        <div>Již to bude:</div>
        <div>
          {elapsed.days} dní, {pad(elapsed.hours)} hodin a{" "}
          {pad(elapsed.minutes)} minut
        </div>
        <div>Co svět udělala lepším místem Klárka Bulavů 💜💜💜</div>

        <button className="couponButton" onClick={onShowCoupon}>
          🎁 Pokračovat
        </button>
      </div>
    </div>
  );
}

export default BirthdayPage;
