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
      title: "💆‍♀️ Masáž Zdarma",
      description:
        "Balíček obsahuje relaxační masáž dle vlastního výběru s plnou péčí, hromadou zlomených kostí a láskou 💜",
    },
    {
      title: "🍽️ Večeře Zdarma",
      description:
        "Balíček obsahuje pozvání na večeři do restaurace, nebo večeři vařernou doma se špetkou lásky a chaosu 🍝",
    },
    {
      title: "💞 Dumbass Přítel Zdarma",
      description:
        "Balíček obsahuje jednoho dumbass přítele, který tě bude akorát srát. Nekonečno hugs a pusinek jsou taktéž součástí balíčku 💘",
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
      <div className="couponTitle">🎉 Všechno nejlepší 🎉</div>
      <div style={{ marginBottom: "10px" }}>Na co máš nárok:</div>
      <div className="couponGrid">
        {coupons.map((coupon, index) => (
          <div className="couponCard" key={index}>
            <h3>{coupon.title}</h3>
            <p>{coupon.description}</p>
            <button className="redeemButton">Použít</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CouponPage;
