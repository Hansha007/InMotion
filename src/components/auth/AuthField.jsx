function AuthField({ label, id, error, children, ...inputProps }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[12px] font-medium text-[#C5D1DE]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={Boolean(error)}
          className={`h-11 w-full rounded-md border bg-[#050D18] px-3.5 text-[13px] text-white outline-none transition-colors placeholder:text-[#53677D] focus:border-[#2196F3] focus:ring-1 focus:ring-[#2196F3]/30 ${
            error ? "border-[#EF4444]/80" : "border-[#223B56]"
          } ${children ? "pr-11" : ""}`}
          {...inputProps}
        />
        {children}
      </div>
      {error && <p className="mt-1.5 text-[11px] text-[#F87171]">{error}</p>}
    </div>
  );
}

export default AuthField;
