import { useState } from "react"
import { askAI } from "../api/chatApi"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type ChatBoxProps = {
  repoUrl: string
}

// Icon: Chat bubble with sparkle
const ChatIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-400 shrink-0"
  >
    <path
      d="M14 1H2C1.44772 1 1 1.44772 1 2V10C1 10.5523 1.44772 11 2 11H5V14.5L9.5 11H14C14.5523 11 15 10.5523 15 10V2C15 1.44772 14.5523 1 14 1Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 6.5H10.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M5.5 4H10.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
)

// Icon: Send arrow (diagonal upward-right)
const SendIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 1.5L1.5 5.5L6 7.5L8 12.5L12.5 1.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 7.5L8.5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

// Icon: File for source chips
const FileIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-blue-400 shrink-0"
  >
    <path
      d="M2 1H7.5L10 3.5V11H2V1Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 1V3.5H10"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4 6H8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <path d="M4 8H7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)

// Icon: Sparkle for AI Answer header
const SparkleIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-blue-400"
  >
    <path
      d="M7 1L8.5 5.5H13L9.5 8L11 12.5L7 10L3 12.5L4.5 8L1 5.5H5.5L7 1Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

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
    <div className="mt-0 w-full max-w-[820px] mx-auto">

      {/* Input Section */}
      <div className="relative w-full">

        {/* Animated conic border when input is empty */}
        {!question && (
          <div
            className="absolute -inset-[3px] rounded-2xl opacity-80"
            style={{
              background:
                "conic-gradient(from var(--angle), #6366f1, #22c55e, #06b6d4, #a855f7, #f59e0b, #6366f1)",
              animation: "spin-border 3s linear infinite",
            }}
          />
        )}

        {/* Input container */}
        <div className="relative flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3 shadow-lg transition">

          {/* Chat icon */}
          <ChatIcon />

          {/* Input */}
          <input
            placeholder="Ask anything about this repository..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none min-w-0"
          />

          {/* Clear button — only shown when there's text */}
          {question && (
            <button
              onClick={() => setQuestion("")}
              className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-gray-200 transition shrink-0"
              aria-label="Clear input"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}

          {/* Divider */}
          <div className="w-px h-5 bg-gray-800 shrink-0" />

          {/* Ask button */}
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className={`
              flex items-center gap-1.5
              px-4 py-2 text-sm font-medium rounded-xl
              transition-all shrink-0
              ${loading || !question.trim()
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-md shadow-blue-900/40"}
            `}
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Thinking</span>
              </>
            ) : (
              <>
                <span>Ask</span>
                <SendIcon />
              </>
            )}
          </button>

        </div>
      </div>

      {/* Answer */}
      {answer && (
        <div className="mt-8 border border-gray-800 bg-gray-900 rounded-xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-800">
            <SparkleIcon />
            <span className="text-sm font-semibold text-gray-300">AI Answer</span>
          </div>

          {/* Markdown content */}
          <div className="px-6 py-6 text-[15px] leading-7 text-gray-300">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-5">{children}</p>,

                em: ({ children }) => (
      <span className="font-semibold uppercase text-white">{children}</span>
    ),

                h1: ({ children }) => (
                  <h1 className="text-xl font-semibold mt-6 mb-3 text-white">{children}</h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-lg font-semibold mt-6 mb-3 text-white">{children}</h2>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc ml-6 mb-5 space-y-1">{children}</ul>
                ),

                ol: ({ children }) => (
                  <ol className="list-decimal  ml-6 mb-5 space-y-1">{children}</ol>
                ),

                code: ({ children, className }) => {
                  const isBlock = className?.includes("language-")
                  if (isBlock) {
                    return (
                      <pre className="bg-blue-700 text-white border font-sans border-gray-200 rounded-lg p-4 text-m overflow-x-auto mb-5">
                        <code className="text-gray-200">{children}</code>
                      </pre>
                    )
                  }
                  return (
                    <code className="bg-blue-600 text-white border font-sans border-blue-900/60 px-1.5 py-0.5 rounded text-[14px]">
                      {children}
                    </code>
                  )
                },

                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-yellow-500/70 pl-4 text-gray-400 italic mb-5">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {answer}
            </ReactMarkdown>
          </div>

          {/* Sources */}
          {sources.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-800">
              <div className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase mb-3">
                Source Files
              </div>
              <div className="flex flex-wrap gap-2">
                {[...new Set(sources)].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-gray-800/70 hover:bg-gray-800 border border-gray-700/80 text-gray-300 text-xs px-3 py-1.5 rounded-md transition cursor-default"
                  >
                    <FileIcon />
                    <span className="truncate max-w-[220px]">{s}</span>
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