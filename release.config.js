module.exports = {
    branches: ["master"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "CHANGELOG.md",
            },
        ],
        "@semantic-release/npm",
        [
            "@semantic-release/github",
            {
                assets: ["build/*.js"],
            },
        ],
        [
            "@semantic-release/git",
            {
                assets: ["CHANGELOG.md"],
                message:
                    "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
        ],
    ],
};
