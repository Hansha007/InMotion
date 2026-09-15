import { useEffect, useState } from "react";
import { ArrowRight, Check, Eye, EyeOff, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { InMotionMark } from "../../layouts/AuthLayout";
import AuthField from "./AuthField";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  remember: false,
};

function AuthModal({ mode, onModeChange, onClose }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [visibleFields, setVisibleFields] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const isSignup = mode === "signup";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const toggleVisibility = (field) => {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
  };

  const validate = () => {
    const nextErrors = {};
    if (isSignup && !form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.email.trim()) nextErrors.email = "Work email is required.";
    else if (!emailPattern.test(form.email)) nextErrors.email = "Enter a valid work email.";
    if (!form.password) nextErrors.password = "Password is required.";
    else if (isSignup && form.password.length < 8) nextErrors.password = "Use at least 8 characters.";
    if (isSignup && !form.confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
    else if (isSignup && form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, isSignup ? 700 : 650));
    setStatus("success");
    setTimeout(() => {
      onClose();
      navigate("/app/dashboard");
    }, 450);
  };

  const switchMode = (nextMode) => {
    setForm(initialForm);
    setErrors({});
    setStatus("idle");
    setVisibleFields({ password: false, confirmPassword: false });
    onModeChange(nextMode);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#000814]/65 px-4 py-4 backdrop-blur-[2px] sm:px-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="auth-modal-panel relative my-auto max-h-[calc(100dvh-32px)] w-full max-w-[440px] overflow-y-auto rounded-[16px] border border-[#18304A] bg-[#07111F] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.62),0_0_26px_rgba(20,119,212,0.08)] sm:p-7"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close authentication dialog"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-[#71869C] transition-colors hover:bg-[#102238] hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="mb-5 pr-8">
          <div className="mb-4 flex items-center gap-2">
            <div className="drop-shadow-[0_0_10px_rgba(33,150,243,0.45)]">
              <InMotionMark className="h-7 w-7" />
            </div>
            <span className="text-[14px] font-bold tracking-[0.14em] text-white">INMOTION</span>
          </div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#38BDF8]">
            {isSignup ? "NETWORK ACCESS" : "CONTROL CENTER ACCESS"}
          </p>
          <h2 id="auth-modal-title" className="mt-2 text-xl font-bold leading-tight tracking-[-0.02em] text-white">
            {isSignup ? "Get started with InMotion" : "Welcome back"}
          </h2>
          <p className="mt-2 text-[12px] leading-5 text-[#9AAABD]">
            {isSignup
              ? "Create your account and get access to your logistics control center."
              : "Sign in to your InMotion Control Center"}
          </p>
        </div>

        <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
          {isSignup && (
            <AuthField
              label="Full Name"
              id="modal-full-name"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={updateField}
              placeholder="Enter your full name"
              autoComplete="name"
              error={errors.fullName}
            />
          )}

          <AuthField
            label="Work Email"
            id="modal-email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder={isSignup ? "Enter your work email" : "Enter your email"}
            autoComplete="email"
            error={errors.email}
          />

          <AuthField
            label="Password"
            id="modal-password"
            name="password"
            type={visibleFields.password ? "text" : "password"}
            value={form.password}
            onChange={updateField}
            placeholder={isSignup ? "Create a password" : "Enter your password"}
            autoComplete={isSignup ? "new-password" : "current-password"}
            error={errors.password}
          >
            <button
              type="button"
              aria-label={visibleFields.password ? "Hide password" : "Show password"}
              onClick={() => toggleVisibility("password")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71869C] transition-colors hover:text-white"
            >
              {visibleFields.password ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </AuthField>

          {isSignup ? (
            <AuthField
              label="Confirm Password"
              id="modal-confirm-password"
              name="confirmPassword"
              type={visibleFields.confirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={updateField}
              placeholder="Confirm your password"
              autoComplete="new-password"
              error={errors.confirmPassword}
            >
              <button
                type="button"
                aria-label={visibleFields.confirmPassword ? "Hide password" : "Show password"}
                onClick={() => toggleVisibility("confirmPassword")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71869C] transition-colors hover:text-white"
              >
                {visibleFields.confirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </AuthField>
          ) : (
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
              <Link to="/forgot-password" onClick={onClose} className="text-[12px] text-[#38BDF8] hover:text-white">
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="group mt-1.5 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#087CF0] text-[12px] font-bold tracking-[0.12em] text-white shadow-[0_0_20px_rgba(0,112,243,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#1686F5] disabled:cursor-wait disabled:opacity-70"
          >
            {status === "loading"
              ? isSignup ? "CREATING ACCOUNT..." : "SIGNING IN..."
              : status === "success"
                ? isSignup ? "ACCOUNT CREATED" : "SIGNED IN"
                : isSignup ? "CREATE ACCOUNT" : "SIGN IN"}
            {status === "success" ? <Check size={15} /> : <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />}
          </button>
        </form>

        <p className="mt-4 text-center text-[12px] text-[#7F91A5]">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => switchMode(isSignup ? "login" : "signup")}
            className="font-semibold text-[#38BDF8] hover:text-white"
          >
            {isSignup ? "Login" : "Get Started"}
          </button>
        </p>
      </section>
    </div>
  );
}

export default AuthModal;
