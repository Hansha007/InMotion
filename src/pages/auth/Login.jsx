import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Check, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import AuthField from "../../components/auth/AuthField";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.email.trim()) nextErrors.email = "Work email is required.";
    else if (!emailPattern.test(form.email)) nextErrors.email = "Enter a valid work email.";
    if (!form.password) nextErrors.password = "Password is required.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 650));
    setStatus("success");
    setTimeout(() => navigate("/app/dashboard"), 450);
  };

  return (
    <AuthLayout
      eyebrow="CONTROL CENTER ACCESS"
      title="WELCOME BACK"
      description="Sign in to your InMotion Control Center"
      footer={
        <div className="mt-8">
          <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.16em] text-[#53677D]">
            <span className="h-px flex-1 bg-[#18304A]" />
            OR
            <span className="h-px flex-1 bg-[#18304A]" />
          </div>
          <button
            type="button"
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#223B56] bg-transparent text-[12px] font-medium text-[#C5D1DE] transition-colors hover:border-[#38516B] hover:bg-[#0B182B]"
          >
            Continue with Google
          </button>
          <p className="mt-6 text-center text-[12px] text-[#7F91A5]">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-[#38BDF8] hover:text-white">
              Get Started
            </Link>
          </p>
        </div>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthField
          label="Work Email"
          id="login-email"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          placeholder="Enter your email"
          autoComplete="email"
          error={errors.email}
        />

        <AuthField
          label="Password"
          id="login-password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={updateField}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password}
        >
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71869C] transition-colors hover:text-white"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </AuthField>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-[12px] text-[#8B9AAF]">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={updateField}
              className="h-3.5 w-3.5 accent-[#2196F3]"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-[12px] text-[#38BDF8] hover:text-white">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#087CF0] text-[12px] font-bold tracking-[0.12em] text-white shadow-[0_0_24px_rgba(0,112,243,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#1686F5] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? "SIGNING IN..." : status === "success" ? "SIGNED IN" : "SIGN IN"}
          {status === "success" ? <Check size={15} /> : status === "loading" ? <LockKeyhole size={14} /> : <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
