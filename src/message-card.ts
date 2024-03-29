export function createMessageCard(
  notificationSummary: string,
  notificationColor: string,
  commit: any,
  author: any,
  runNum: string,
  runId: string,
  repoName: string,
  sha: string,
  repoUrl: string,
  timestamp: string
): any {
  const avatar_url = author?.avatar_url
    ? author.avatar_url
    : 'https://www.cdnlogo.com/logos/g/69/github-icon.svg'

  const author_url =
    author?.login && author.html_url
      ? `[(@${author.login})](${author.html_url}) `
      : ''

  const messageCard = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: notificationSummary,
    themeColor: notificationColor,
    title: notificationSummary,
    sections: [
      {
        activityTitle: `**CI #${runNum} (commit ${sha.substring(0, 7)})** on [${repoName}](${repoUrl})`,
        activityImage: avatar_url,
        activitySubtitle: `by ${commit.data.commit.author.name} ${author_url}on ${timestamp}`
      }
    ],
    potentialAction: [
      createAction('View Workflow Run', `${repoUrl}/actions/runs/${runNum}`),
      createAction('View Commit Changes', commit.data.html_url)
    ]
  }

  return messageCard
}

function createAction(name: string, target: string): any {
  return {
    '@context': 'http://schema.org',
    target: [target],
    '@type': 'ViewAction',
    name
  }
}
