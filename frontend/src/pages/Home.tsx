import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Home() {
  return (

    <>
    <Navbar />

    <div className="min-h-screen bg-gray-950 text-gray-100">

      {/* Hero */}
      <section className="text-center px-6 py-24 max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold leading-tight">
          Understand Any GitHub Repository
          <span className="text-blue-500"> with AI</span>
        </h1>

        <p className="mt-4 text-gray-200 text-m max-w-2xl my-10 mx-auto">
          Chat with any Repository for FREE
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <div className="relative w-fit rounded-xl p-[3px] overflow-hidden">

  {/* Spinning border */}
  <div
    className="absolute inset-0 rounded-xl"
    style={{
      background: 'conic-gradient(from var(--angle), #6366f1, #22c55e, #06b6d4, #a855f7, #f59e0b, #6366f1)',
      animation: 'spin-border 1s linear infinite',
    }}
  />

  {/* Button */}
  <Link
    to="/github-copilot"
    className="relative inline-flex items-center px-6 py-3 rounded-[9px] font-medium text-white bg-blue-600 active:scale-95 transition-transform overflow-hidden group"
  >
    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    Try GitHub Copilot
  </Link>

</div>

          <a
            href="https://github.com/thevishwass"
            target="_blank"
            className="border border-gray-700 hover:border-gray-500 px-6 py-3 rounded-lg font-medium"
          >
            View GitHub
          </a>

        </div>

      </section>

      {/* Product Preview */}
      <section className="px-6 pb-24">

        <div className="max-w-6xl mx-auto">

          <img
            src="/copilot-preview.png"
            alt="AI GitHub Copilot Preview"
            className="rounded-xl border border-gray-800 shadow-xl"
          />

        </div>

      </section>

      {/* ── EVERYTHING BELOW THIS LINE IS UPDATED ── */}

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          {/* Section label */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Core Features
            </span>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Everything you need to explore a codebase
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-gray-900/80 transition-all duration-200 group">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 group-hover:scale-110 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">AI Code Understanding</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ask natural language questions about large codebases and get structured,
                context-aware explanations instantly — no grepping required.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/40 hover:bg-gray-900/80 transition-all duration-200 group">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 group-hover:scale-110 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Semantic Code Search</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Uses vector embeddings and Pinecone to find the most relevant code chunks
                across the entire repository with semantic similarity.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/40 hover:bg-gray-900/80 transition-all duration-200 group">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 group-hover:scale-110 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">RAG Architecture</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Built on Retrieval-Augmented Generation — answers are grounded in actual
                repository content, not hallucinated from general training data.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How to use — 3 steps */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-10">

            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 text-gray-400 text-xs font-medium px-3 py-1.5 rounded-full">
                How it works
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Paste a GitHub URL",
                  desc: "Drop in any public GitHub repository link and hit Analyze.",
                },
                {
                  step: "02",
                  title: "Wait for Indexing",
                  desc: "The backend clones the repo, chunks the code, and builds a vector index in Pinecone.",
                },
                {
                  step: "03",
                  title: "Ask Anything",
                  desc: "Type natural language questions and get precise, source-backed answers from the codebase.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <span className="text-2xl font-bold text-gray-600 font-mono leading-none mt-0.5 shrink-0">{step}</span>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      {/* <section className="text-center px-6 pb-28">
        <div className="max-w-xl mx-auto">

          <h2 className="text-2xl font-semibold text-white">
            Start Exploring Codebases with AI
          </h2>

          <p className="text-gray-500 mt-3 text-sm">
            Paste a GitHub repository URL and start asking questions — no setup needed.
          </p>

          <Link
            to="/github-copilot"
            className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-200 px-7 py-3.5 rounded-xl font-semibold text-sm text-white shadow-lg hover:shadow-blue-500/25"
          >
            Launch Copilot
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>

        </div>
      </section> */}


    </div>
      {/* Footer */}
      <Footer />
    </>

  )
}