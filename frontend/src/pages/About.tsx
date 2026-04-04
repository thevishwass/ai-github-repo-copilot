import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function About() {
  const [noticeDismissed, setNoticeDismissed] = useState(false)

  const techStack = [
    "React",
    "Vite",
    "TailwindCSS",
    "Node.js",
    "Express",
    "DeepSeek LLM",
    "OpenRouter",
    "Pinecone",
    "RAG Architecture",
  ]

  const tips = [
    "Ask specific questions like \"How does authentication work?\" instead of vague ones.",
    "Avoid repeatedly analyzing the same repo — embeddings are already stored.",
    "Don't send empty or test queries; each call consumes API tokens.",
    "If the answer seems off, rephrase — don't spam the same query.",
  ]

  const contacts = [
    {
      label: "Email",
      value: "thevishwass@gmail.com",
      href: "mailto:thevishwass@gmail.com",
      color: "blue",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/thevishwass",
      href: "https://github.com/thevishwass",
      color: "violet",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "vishwassingh15",
      href: "https://linkedin.com/in/vishwassingh15",
      color: "emerald",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ]

  const colorMap = {
    blue: {
      card: "hover:border-blue-500/40",
      icon: "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-500/40",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40",
      arrow: "text-blue-400/40 group-hover:text-blue-400",
    },
    violet: {
      card: "hover:border-violet-500/40",
      icon: "bg-violet-500/10 border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20 group-hover:border-violet-500/40",
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-500/40",
      arrow: "text-violet-400/40 group-hover:text-violet-400",
    },
    emerald: {
      card: "hover:border-emerald-500/40",
      icon: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40",
      arrow: "text-emerald-400/40 group-hover:text-emerald-400",
    },
  }

  return (
    <>
      <Navbar />

      {/* ⚠️ Dismissible API Notice Banner */}
      {!noticeDismissed && (
        <div className="bg-yellow-300 border-b border-gray-800 px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-start gap-3">
            <div className="shrink-0 mt-0.5 text-red-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <p className="text-xs text-black leading-relaxed flex-1">
              <span className="font-semibold text-black">API limits apply.</span>{" "}
              This tool uses free-tier API keys. Please ask focused questions and avoid repeating the same repository analysis, as each request uses tokens.
            </p>
            <button
              onClick={() => setNoticeDismissed(true)}
              className="shrink-0 text-black hover:text-black transition-colors ml-2 mt-0.5"
              aria-label="Dismiss notice"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-950 text-gray-200 px-6 py-20">
        <div className="max-w-5xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-tight tracking-tight">
              About AI GitHub Copilot
            </h1>
            <p className="mt-5 text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
              A developer tool that understands GitHub repositories and lets you ask natural language questions about any codebase, without manually searching through files.
            </p>
          </div>

          {/* What it does + How it works */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-blue-500/40 transition-all duration-200 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 group-hover:scale-110 transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-white">What This Tool Does</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI GitHub Copilot analyzes an entire GitHub repository and allows developers to
                interact with the codebase using natural language. Instead of manually searching
                through files, you can ask questions like how authentication works or where API
                routes are defined — and get precise, context-aware answers instantly.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-violet-500/40 transition-all duration-200 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 group-hover:scale-110 transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-white">How It Works</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The system clones the repository, splits code into semantic chunks, generates
                vector embeddings, and stores them in a Pinecone vector database. When you ask
                a question, it performs similarity search and sends the most relevant code
                context to DeepSeek LLM to generate a grounded, accurate answer.
              </p>
            </div>
          </div>

          {/* Architecture */}
          <div className="mb-16">
            <h2 className="text-xl font-semibold text-white mb-8">System Architecture</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 group-hover:scale-110 transition-all duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-gray-600">01</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">Repository Analysis</h3>
                <p className="text-sm text-gray-400 leading-relaxed">The backend clones GitHub repositories and scans source files such as JavaScript, TypeScript, Python, and Markdown.</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/40 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center text-violet-400 bg-violet-500/10 border-violet-500/20 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 group-hover:scale-110 transition-all duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-gray-600">02</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">Vector Search</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Code chunks are converted into embeddings and stored in Pinecone to enable semantic search across the entire codebase.</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/40 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 group-hover:scale-110 transition-all duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-gray-600">03</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">AI Responses</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Retrieved context is sent to the DeepSeek LLM which generates accurate explanations based only on the repository content.</p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="text-xl font-semibold text-white mb-5">Technology Stack</h2>
            <div className="flex flex-wrap gap-2.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-blue-500/20 hover:border-blue-500/40 hover:scale-105 transition-all duration-150 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Get in Touch</h2>
            <p className="text-gray-400 text-sm mb-8">
              Have feedback, questions, or want to collaborate? Feel free to reach out.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {contacts.map(({ label, value, href, color, icon }) => {
                const c = colorMap[color as keyof typeof colorMap]
                return (
                  <a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`bg-gray-900 border border-gray-800 rounded-2xl p-6 ${c.card} transition-all duration-200 group flex flex-col gap-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${c.icon} group-hover:scale-110 transition-all duration-200`}>
                        {icon}
                      </div>
                      <svg className={`w-4 h-4 ${c.arrow} transition-colors duration-200`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-sm text-gray-300 font-medium truncate">{value}</p>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* API Notice */}
          <div className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-7 mt-16">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-amber-300 mb-3">
                  Please Use This Tool Responsibly — API Limits Apply
                </h3>
                <p className="text-sm text-amber-200/60 mb-4 leading-relaxed">
                  This tool runs on free-tier API keys for OpenRouter and Pinecone. Each query,
                  embedding, and repository analysis consumes real tokens and credits. Please be
                  mindful so the tool remains available for everyone.
                </p>
                <ul className="space-y-2.5">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-amber-200/50">
                      <span className="w-1 h-1 rounded-full bg-amber-500/50 mt-2 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          </div>

          

        </div>
      </div>
     <Footer />
    </>
  )
}