import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Layers, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorBackground: "#09090b",
    colorInputBackground: "#18181b",
    colorInputText: "#ffffff",
    colorText: "#ffffff",
    colorTextSecondary: "#a1a1aa",
    colorPrimary: "#ffffff",
    colorTextOnPrimaryBackground: "#09090b",
    colorNeutral: "#71717a",
    borderRadius: "0.75rem",
    fontFamily: "inherit",
  },
  elements: {
    card: "bg-transparent shadow-none border-none p-0",
    headerTitle: "text-white text-2xl font-semibold tracking-tight",
    headerSubtitle: "text-zinc-400 text-sm",
    socialButtonsBlockButton:
      "border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all rounded-xl h-11",
    socialButtonsBlockButtonText: "text-white font-medium text-sm",
    dividerLine: "bg-white/10",
    dividerText: "text-zinc-500 text-xs",
    formFieldLabel: "text-zinc-300 text-sm font-medium",
    formFieldInput:
      "bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-600 rounded-xl h-11 focus:border-white/30 focus:ring-0 transition-all",
    formButtonPrimary:
      "bg-white text-zinc-950 hover:bg-zinc-200 transition-all rounded-xl h-11 font-medium text-sm shadow-none",
    footerActionLink: "text-white hover:text-zinc-300 font-medium",
    footerActionText: "text-zinc-500",
    identityPreviewText: "text-white",
    identityPreviewEditButton: "text-zinc-400 hover:text-white",
    formFieldErrorText: "text-red-400 text-xs",
    alertText: "text-zinc-300 text-sm",
    logoBox: "hidden",
  },
};

const features = [
  "Upload floor plans & room photos",
  "Generate AI-powered interior renders",
  "Explore dozens of design styles",
  "Share & export your projects",
];

export default function SignUpPage() {
  return (
    <main className="flex h-screen w-full bg-zinc-950 overflow-hidden">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/5 rounded-[100%] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-zinc-800/40 rounded-full blur-[100px] pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 bg-white text-zinc-950 rounded-full flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-white font-bold tracking-tight text-xl">ArchiVision</span>
        </Link>

        {/* Center content */}
        <div className="relative z-10 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full w-fit">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-zinc-300 text-xs font-medium">Start for free — no credit card</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-medium text-white tracking-tight leading-[1.15]">
            Design your space<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">
              with AI today.
            </span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
            Join thousands of designers using ArchiVision to bring interior visions to life in seconds.
          </p>

          {/* Feature list */}
          <ul className="flex flex-col gap-3 pt-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span className="text-zinc-300 text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Before / after preview */}
        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 h-32">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
            alt="AI Interior"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 to-transparent flex items-center px-5">
            <p className="text-white text-sm font-medium">See your room transformed in seconds</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/3 rounded-full blur-[120px] pointer-events-none" />

        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2.5 mb-10 relative z-10">
          <div className="w-8 h-8 bg-white text-zinc-950 rounded-full flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-white font-bold tracking-tight text-lg">ArchiVision</span>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <SignUp appearance={clerkAppearance} />
        </div>
      </div>
    </main>
  );
}
