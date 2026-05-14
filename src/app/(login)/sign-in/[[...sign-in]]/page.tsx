import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Layers, Sparkles } from "lucide-react";
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

export default function SignInPage() {
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
            <span className="text-zinc-300 text-xs font-medium">AI-Powered Interior Design</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-medium text-white tracking-tight leading-[1.15]">
            Welcome back to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">
              your designs.
            </span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
            Sign in to continue transforming spaces with the power of generative AI.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <div className="flex -space-x-3">
              {[11, 12, 13, 14].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i}`}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-zinc-900 grayscale"
                />
              ))}
            </div>
            <p className="text-zinc-400 text-sm">
              <span className="text-white font-medium">300+</span> designers already onboard
            </p>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 p-5 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-zinc-300 text-sm leading-relaxed italic">
            &ldquo;ArchiVision saved me hours of work. The AI renders are stunning and my clients love the results.&rdquo;
          </p>
          <p className="text-zinc-500 text-xs mt-3 font-medium">— Interior Designer, Bucharest</p>
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
          <SignIn appearance={clerkAppearance} />
        </div>
      </div>
    </main>
  );
}
