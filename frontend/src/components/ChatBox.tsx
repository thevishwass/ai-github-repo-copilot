import { useState } from "react"
import { askAI } from "../api/chatApi"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type ChatBoxProps = {
  repoUrl: string
}

export default function ChatBox({ repoUrl }: ChatBoxProps) {

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) return

    setLoading(true)

    try {
      const res = await askAI(question, repoUrl)
      setAnswer(res.answer)
      setSources(res.sources || [])
    } catch (err) {
      console.error(err)
      setAnswer("Something went wrong while asking the AI.")
    }

    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAsk()
  }

  return (
    <div className="mt-12 w-full max-w-[820px]">

      {/* Input */}
      <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">

        <input
          placeholder="Ask anything about this repository..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-m text-gray-200 placeholder-gray-500 outline-none"
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className={`px-4 py-2 text-sm rounded-lg font-medium transition
            ${loading
              ? "bg-gray-800 text-gray-500"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          `}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

      </div>

      {/* Answer */}
      {answer && (
        <div className="mt-8 border border-gray-800 bg-gray-900 rounded-xl">

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-800 text-sm font-semibold text-gray-300">
            AI Answer
          </div>

          {/* Markdown */}
          <div className="px-6 py-6 text-[15px] leading-7 text-gray-300">

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{

                p: ({ children }) => (
                  <p className="mb-5">{children}</p>
                ),

                h1: ({ children }) => (
                  <h1 className="text-xl font-semibold mt-6 mb-3 text-white">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-lg font-semibold mt-6 mb-3 text-white">
                    {children}
                  </h2>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc ml-6 mb-5 space-y-1">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="list-decimal ml-6 mb-5 space-y-1">
                    {children}
                  </ol>
                ),

                code: ({ children, className }) => {

                  const isBlock = className?.includes("language-")

                  if (isBlock) {
                    return (
                      <pre className="bg-black border border-gray-800 rounded-lg p-4 text-sm overflow-x-auto mb-5 font-sans">
                            <code className="text-gray-200 font-sans">
                          {children}
                        </code>
                      </pre>
                    )
                  }

                  return (
                    <code className="bg-blue-300 text-black px-1.5 py-0.5 rounded text-[13px] font-sans">
                      {children}
                    </code>
                  )
                },

                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-yellow-500 pl-4 text-gray-400 italic mb-5">
                    {children}
                  </blockquote>
                )

              }}
            >
              {answer}
            </ReactMarkdown>

          </div>

          {/* Sources */}
          {sources.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-800">

              <div className="text-xs text-gray-300 tracking-wider uppercase mb-3">
                Source Files
              </div>

              <div className="flex flex-wrap gap-2">

  {[...new Set(sources)].map((s, i) => (
    <div
      key={i}
      className="
        flex items-center gap-2
        bg-gray-800 hover:bg-gray-700
        border border-gray-700
        text-gray-300
        text-xs
        px-3 py-1.5
        rounded-md
        font-mono
        transition
        cursor-default
      "
    >

      <span className="text-blue-400">📄</span>

      <span className="truncate max-w-[220px]">
        {s}
      </span>

    </div>
  ))}

</div>

            </div>
          )}

        </div>
      )}

    </div>
  )
}