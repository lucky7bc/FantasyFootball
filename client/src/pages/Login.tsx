import React, { useState } from "react";

const styles: Record<string, React.CSSProperties> = {
  wrap: { minHeight: "100vh", display: "grid", placeItems: "center", background: "#0f172a", color: "#e5e7eb" },
  card: { width: "100%", maxWidth: 380, background: "#111827", padding: 28, borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,.3)" },
  h1: { margin: "0 0 16px", fontSize: 22 },
  muted: { color: "#9ca3af", fontSize: 14, marginBottom: 18 },
  label: { display: "block", fontSize: 14, margin: "10px 0 6px" },
  input: { width: "100%", padding: "10px 12px", border: "1px solid #374151", background: "#0b1220", color: "#e5e7eb", borderRadius: 10, outline: "none" },
  row: { position: "relative" as const },
  toggle: { position: "absolute" as const, right: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 12, color: "#9ca3af" },
  btn: { width: "100%", marginTop: 14, padding: "11px 12px", border: 0, borderRadius: 10, background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer" },
  btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
  err: { marginTop: 10, color: "#ef4444", fontSize: 14, minHeight: 18 },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!email || !password) {
      setErr("Please fill in both fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Login failed");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (e: any) {
      setErr(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrap}>
      <main style={styles.card} role="main" aria-labelledby="login-title">
        <h1 id="login-title" style={styles.h1}>Sign in</h1>
        <p style={styles.muted}>Use your account email and password.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            id="email" name="email" type="email" autoComplete="email" required
            style={styles.input}
            value={email} onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" style={styles.label}>Password</label>
          <div style={styles.row}>
            <input
              id="password" name="password" type={show ? "text" : "password"} autoComplete="current-password" required
              style={styles.input}
              value={password} onChange={(e) => setPw(e.target.value)}
            />
            <span style={styles.toggle} onClick={() => setShow(s => !s)}>{show ? "Hide" : "Show"}</span>
          </div>

          <button type="submit" style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }} disabled={loading}>
            {loading ? "Signing in..." : "Continue"}
          </button>
          <div style={styles.err} role="alert" aria-live="polite">{err}</div>
        </form>
      </main>
    </div>
  );
}
