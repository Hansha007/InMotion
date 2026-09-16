import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import AuthField from "../../components/auth/AuthField";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setError("Work email is required.");
      return;
    }
    if (!emailPattern.test(email)) {
      setError("Enter a valid work email.");
      return;
    }

    setError("");
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
  };

  return (
    <AuthLayout
      eyebrow="ACCOUNT RECOVERY"
      title="FORGOT PASSWORD"
      description="Enter your work email and we'll send instructions to reset your password."
      footer={
        <p className="mt-7 text-center text-[12px] text-[#7F91A5]">
          <Link to="/login" className="font-semibold text-[#38BDF8] hover:text-white">
            Back to Login
          </Link>
        </p>
      }
    >
      {status === "success" ? (
        <div className="border border-[#22C55E]/30 bg-[#22C55E]/[0.06] p-4 text-[13px] leading-6 text-[#B7E5C5]" role="status">
          Reset instructions have been sent. Check your inbox to continue.
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <AuthField
            label="Work Email"
            id="reset-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            placeholder="Enter your email"
            autoComplete="email"
            error={error}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#087CF0] text-[12px] font-bold tracking-[0.12em] text-white shadow-[0_0_24px_rgba(0,112,243,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#1686F5] disabled:cursor-wait disabled:opacity-70"
          >
            {status === "loading" ? "SENDING..." : "SEND RESET LINK"}
            {status === "loading" ? null : status === "success" ? <Check size={15} /> : <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}

export default ForgotPassword;
