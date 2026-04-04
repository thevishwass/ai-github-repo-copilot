export default function RepoStats({ data }: any) {

  if (!data) return null

  const stats = [
    { label: "Files", value: data.files },
    { label: "Documents", value: data.documents },
    { label: "Chunks", value: data.chunks },

    { label: "Stars", value: data.githubInfo?.stars },
    { label: "Forks", value: data.githubInfo?.forks },
    { label: "Watchers", value: data.githubInfo?.watchers },
    // { label: "Language", value: data.githubInfo?.language }
  ]

  return (
    <div className="mt-6">

      {/* Repo Stats */}
      <div className="text-xs text-gray-300 mb-3 mt-8 uppercase tracking-wider text-center">
        Repository Stats
      </div>

      <div className="space-y-2">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="
              flex items-center justify-between
              px-3 py-2
              bg-gray-900
              border border-gray-800
              rounded-lg
            "
          >

            <span className="text-sm text-gray-400">
              {stat.label}
            </span>

            <span className="text-sm font-semibold text-gray-200">
              {stat.value ?? "—"}
            </span>

          </div>
        ))}

      </div>


      {/* Language Breakdown */}
      {data.languages && data.languages.length > 0 && (
        <div className="mt-6">

          <div className="text-xs text-gray-300 mb-3 uppercase tracking-wider text-center">
            Languages Used
          </div>

          <div className="space-y-3">

            {data.languages.map((lang: any) => (
              <div key={lang.language}>

                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">
                    {lang.language}
                  </span>

                  <span className="text-gray-200 font-semibold">
                    {lang.percent}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${lang.percent}%` }}
                  />
                </div>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  )
}