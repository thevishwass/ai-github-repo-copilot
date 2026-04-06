import { useState } from "react"
import { analyzeRepo } from "../api/repoApi"

export default function RepoInput({ setResult, setRepoUrl }: any) {

  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!url.trim()) return

    setLoading(true)

    try {
      const data = await analyzeRepo(url)
      setResult(data)
      setRepoUrl(url)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAnalyze()
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">

      {/* Wrapper */}
      <div className="relative w-full max-w-[560px]">

        {/* Gradient animated border */}
        {!url && (
          <div
            className="absolute -inset-[2.5px] rounded-2xl opacity-90"
            style={{
              background: 'conic-gradient(from var(--angle), #6366f1, #22c55e, #06b6d4, #a855f7, #f59e0b, #6366f1)',
              animation: 'spin-border 3s linear infinite',
            }}
          />
        )}

        {/* Input container */}
        <div
          className="
          relative
          flex items-center gap-3
          bg-white dark:bg-gray-900
          rounded-2xl px-4 py-3
          shadow-lg
          transition-all
        "
        >

          {/* GitHub icon */}
          <svg
            className="w-4 h-4 text-gray-100 shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
            -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
            .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
            -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
            .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
            .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
            0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>

          {/* Input */}
          <input
            className="
              flex-1 bg-transparent
              text-sm text-gray-800 dark:text-gray-200
              placeholder-gray-400 dark:placeholder-gray-500
              outline-none
            "
            placeholder="https://github.com/owner/repository"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Clear button */}
          {url && !loading && (
            <button
              onClick={() => setUrl("")}
              className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition shrink-0"
              aria-label="Clear"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M2 2l10 10M12 2L2 12" strokeLinecap="round" />
              </svg>
            </button>
          )}

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 shrink-0" />

          {/* Analyze button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !url.trim()}
            className={`
              flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl transition shrink-0
              ${loading || !url.trim()
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 active:scale-95 text-white shadow-md"
              }
            `}
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                Analyzing
              </>
            ) : (
              <>
                Analyze
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>

        </div>

      </div>

      <p className="text-sm italic text-gray-300 text-center mb-0">
        Large repositories may take a little longer to process.
      </p>

      <p className="text-xs text-yellow-400 text-center mt-0">
        Note: The backend runs on a free server and may take ~30–60 seconds to wake on the first request.
      </p>

    </div>
  )
}