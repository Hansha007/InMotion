import { useState } from "react";
import { ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import AuthField from "../../components/auth/AuthField";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [visibleFields, setVisibleFields] = useState({ password: false, confirmPassword: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.email.trim()) nextErrors.email = "Work email is required.";
    else if (!emailPattern.test(form.email)) nextErrors.email = "Enter a valid work email.";
    if (!form.password) nextErrors.password = "Create a password to continue.";
    else if (form.password.length < 8) nextErrors.password = "Use at least 8 characters.";
    if (!form.confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
    else if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    setTimeout(() => navigate("/app/dashboard"), 450);
  };

  const toggleVisibility = (field) => {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
  };

  return (
    <AuthLayout
      eyebrow="NETWORK ACCESS"
      title="GET STARTED WITH INMOTION"
      description="Create your account and get access to your logistics control center."
      footer={
        <p className="mt-7 text-center text-[12px] text-[#7F91A5]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[#38BDF8] hover:text-white">
            Log in
          </Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <AuthField
          label="Full Name"
          id="signup-full-name"
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={updateField}
          placeholder="Enter your full name"
          autoComplete="name"
          error={errors.fullName}
        />
        <AuthField
          label="Work Email"
          id="signup-email"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          placeholder="Enter your work email"
          autoComplete="email"
          error={errors.email}
        />
        <AuthField
          label="Password"
          id="signup-password"
          name="password"
          type={visibleFields.password ? "text" : "password"}
          value={form.password}
          onChange={updateField}
          placeholder="Create a password"
          autoComplete="new-password"
          error={errors.password}
        >
          <button
            type="button"
            aria-label={visibleFields.password ? "Hide password" : "Show password"}
            onClick={() => toggleVisibility("password")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71869C] hover:text-white"
          >
            {visibleFields.password ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </AuthField>
        <AuthField
          label="Confirm Password"
          id="signup-confirm-password"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71869C] hover:text-white"
          >
            {visibleFields.confirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </AuthField>

        <button
          type="submit"
          disabled={status === "loading"}
          className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#087CF0] text-[12px] font-bold tracking-[0.12em] text-white shadow-[0_0_24px_rgba(0,112,243,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#1686F5] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? "CREATING ACCOUNT..." : status === "success" ? "ACCOUNT CREATED" : "CREATE ACCOUNT"}
          {status === "success" ? <Check size={15} /> : <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Signup;
