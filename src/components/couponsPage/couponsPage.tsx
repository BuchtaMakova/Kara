import React, { useState, type JSX } from "react";
import "../couponsPage/couponsPage.css";

function CouponPage(): JSX.Element {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");
  const correctAnswer = "Bivoj";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setAuthorized(true);
    } else {
      alert("Špatná odpověď 😜");
    }
  };

  const coupons = [
    {
      title: "💆‍♀️ Free Massage",
      description:
        "Enjoy one relaxing massage, no time limits, full service guaranteed 💜",
    },
    {
      title: "🍽️ Free Dinner",
      description:
        "A homemade dinner, candles included, cooked with love and a hint of chaos 🍝",
    },
    {
      title: "💞 One Free Dumbass Boyfriend",
      description:
        "Redeem for unlimited hugs, random compliments, and questionable jokes forever 💘",
    },
  ];

  if (!authorized) {
    return (
      <div className="passwordContent">
        <div className="passwordBox">
          <h2>🔒 Jak se bude jmenovat náš syn?</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Zadej jméno..."
              className="passwordInput"
            />
            <button type="submit" className="passwordButton">
              Potvrdit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="couponContent">
      <div className="couponTitle">🎉 Happy Birthday! 🎉</div>
      <div className="couponGrid">
        {coupons.map((coupon, index) => (
          <div className="couponCard" key={index}>
            <h3>{coupon.title}</h3>
            <p>{coupon.description}</p>
            <button className="redeemButton">Redeem</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CouponPage;
