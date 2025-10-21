import { useState } from "react";
import InitialPage from "./components/initialPage/initialPage";
import BirthdayPage from "./components/birthdayPage/birthdayPage";
import CouponPage from "./components/couponsPage/couponsPage";

function App() {
  const [page, setPage] = useState<"initial" | "birthday" | "coupon">(
    "initial"
  );

  return (
    <>
      {page === "initial" && <InitialPage onYes={() => setPage("birthday")} />}
      {page === "birthday" && (
        <BirthdayPage onShowCoupon={() => setPage("coupon")} />
      )}
      {page === "coupon" && <CouponPage />}
    </>
  );
}

export default App;
