module.exports = {
  repositoryUrl: 'https://github.com/SelectQuoteLabs/SQForm.git',
  // Semantic release will only release off the master branch and any branch that includes the `maintenance-release` string.
  branches: ['*maintenance-release*', 'master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        commit: 'commits',
        issue: 'issue',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        successComment: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['docs', 'CHANGELOG.md', 'package.json', 'package-lock.json'],
        message:
          // eslint-disable-next-line no-template-curly-in-string
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
