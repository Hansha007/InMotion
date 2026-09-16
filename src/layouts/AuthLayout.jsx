import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function InMotionMark({ className = "h-9 w-9" }) {
	return (
		<svg
			viewBox="0 0 36 36"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="authLogoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#00E5FF" />
					<stop offset="100%" stopColor="#0066FF" />
				</linearGradient>
				<linearGradient id="authLogoGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="#29B6F6" />
					<stop offset="100%" stopColor="#1565C0" />
				</linearGradient>
			</defs>
			<path
				d="M6 8L14 18L6 28H11.5L16.5 21.5L21.5 28H27L19 18L27 8H21.5L16.5 14.5L11.5 8H6Z"
				fill="url(#authLogoGrad1)"
			/>
			<path
				d="M23 8L30 18L23 28H28L35 18L28 8H23Z"
				fill="url(#authLogoGrad2)"
				opacity="0.9"
			/>
		</svg>
	);
}

function AuthLayout({ eyebrow, title, description, children, footer }) {
	return (
		<main className="relative min-h-screen overflow-hidden bg-[#020812] px-5 py-6 text-[#F5F7FA] sm:px-8 sm:py-8">
			<div className="pointer-events-none absolute -right-32 -top-40 h-[460px] w-[460px] rounded-full bg-[#1477D4]/[0.08] blur-[130px]" />
			<div className="pointer-events-none absolute bottom-[-220px] left-[-160px] h-[420px] w-[420px] rounded-full bg-[#0B3559]/[0.18] blur-[120px]" />

			<div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1180px] flex-col">
				<header className="flex items-center justify-between">
					<Link to="/" className="group flex items-center gap-3" aria-label="Back to InMotion home">
						<div className="drop-shadow-[0_0_12px_rgba(33,150,243,0.45)] transition-transform duration-300 group-hover:scale-105">
							<InMotionMark />
						</div>
						<span className="text-[17px] font-bold tracking-[0.14em] text-white">
							INMOTION
						</span>
					</Link>

					<Link
						to="/"
						className="inline-flex items-center gap-2 text-[12px] font-medium text-[#8B9AAF] transition-colors hover:text-white"
					>
						<ArrowLeft size={14} />
						Back to home
					</Link>
				</header>

				<div className="flex flex-1 items-center justify-center py-10 sm:py-12">
					<section className="w-full max-w-[470px] rounded-2xl border border-[#18304A] bg-[#07111F]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_42px_rgba(20,119,212,0.08)] backdrop-blur-xl sm:p-9">
						<div className="mb-8">
							<p className="text-[10px] font-semibold tracking-[0.2em] text-[#38BDF8]">
								{eyebrow}
							</p>
							<h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-white">
								{title}
							</h1>
							<p className="mt-3 max-w-[390px] text-[14px] leading-7 text-[#9AAABD]">
								{description}
							</p>
						</div>

						{children}
						{footer}
					</section>
				</div>

				<p className="pb-2 text-center text-[11px] tracking-[0.08em] text-[#53677D]">
					INMOTION CONTROL CENTER
				</p>
			</div>
		</main>
	);
}

export default AuthLayout;
