module.exports = {
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "master",
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true }
  ],
  plugins: [
    [
      "semantic-release-gitmoji",
      {
        releaseRules: {
          major: ["💥"],
          minor: ["✨", "🏗", "⚡"],
          patch: ["🐛", "🚑", "🔒", "♻", "💚", "⬆", "⬇", "➕", "➖", "🔧", "📝", "🔥", "👷‍♂️", "🔨", "⏪", "🚚"]
        }
      }
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        tarballDir: "./dist/"
      }
    ],
    [
      "@semantic-release/git",
      {
        message: "🔖 ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          {
            path: "./dist/*.tgz",
            name: "vb6-antlr4-${nextRelease.version}.tgz"
          }
        ]
      }
    ]
  ]
};
