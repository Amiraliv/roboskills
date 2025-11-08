"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    const res = await fetch("/api/auth/login-password", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
      router.push(`/auth/verify?email=${email}&mode=login`);
    } else {
      setMessage(data.error || "مشکلی پیش آمده");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>ورود با ایمیل و پسورد</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="پسورد"
        />
        <button type="submit">ارسال و دریافت کد</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
