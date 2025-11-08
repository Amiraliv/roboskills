"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  const params = useSearchParams();
  const router = useRouter();

  const email = params.get("email") || "";
  const mode = params.get("mode") || "login"; // 'login' یا 'register'

  useEffect(() => {
    if (!email) setMessage("ایمیل مشخص نیست. از صفحهٔ ورود یا ثبت‌نام بیا.");
  }, [email]);

  async function handleVerify(e) {
    e.preventDefault();
    setMessage(null);

    // 🔹 حالت ورود
    if (mode === "login") {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        code,
      });

      if (result?.ok) {
        setMessage("✅ ورود موفق — در حال هدایت...");
        setTimeout(() => (window.location.href = "/"), 1000);
      } else {
        setMessage("❌ کد اشتباه یا منقضی شده.");
      }
      return;
    }

    // 🔹 حالت ثبت‌نام
    if (mode === "register") {
      const name = params.get("name");
      const password = params.get("password");

      const res = await fetch("/api/auth/verify-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "❌ کد نادرست یا منقضی شده است.");
        return;
      }

      setMessage("✅ ثبت‌نام تأیید شد، حالا وارد شو.");
      setTimeout(() => router.push("/login"), 1500);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", textAlign: "center" }}>
      <h2>{mode === "register" ? "تأیید ثبت‌نام" : "تأیید ورود"}</h2>
      <p>
        کدی که به <b>{email}</b> فرستاده شد را وارد کن.
      </p>

      <form onSubmit={handleVerify}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="کد ۶ رقمی"
          required
        />
        <br />
        <button type="submit" style={{ marginTop: "1rem" }}>
          {mode === "register" ? "تأیید ثبت‌نام" : "تأیید ورود"}
        </button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
