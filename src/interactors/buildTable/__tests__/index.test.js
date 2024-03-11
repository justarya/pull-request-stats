const reviewers = require('../../__tests__/mocks/populatedReviewers.json');
const buildTable = require('../index');

const SIMPLE_RESPONSE = `|                                                                                                            | User  | Total reviews | Time to review           | Total comments |
| ---------------------------------------------------------------------------------------------------------- | ----- | ------------- | ------------------------ | -------------- |
| <a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="20"></a> | user1 | **4**         | **34m** (2052.5 seconds) | 1              |
| <a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="20"></a> | user2 | 1             | 2h 21m (8465 seconds)    | **5**          |`;

const CHARTS_RESPONSE = `|                                                                                                            | User         | Total reviews      | Time to review                     | Total comments     |
| ---------------------------------------------------------------------------------------------------------- | ------------ | ------------------ | ---------------------------------- | ------------------ |
| <a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="32"></a> | user1<br/>🥇 | **4**<br/>▀▀▀▀▀▀▀▀ | **34m** (2052.5 seconds)<br/>▀▀    | 1<br/>▀▀           |
| <a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="32"></a> | user2<br/>🥈 | 1<br/>▀▀           | 2h 21m (8465 seconds)<br/>▀▀▀▀▀▀▀▀ | **5**<br/>▀▀▀▀▀▀▀▀ |`;

const LINKS_RESPONSE = `|                                                                                                            | User  | Total reviews | Time to review                                                           | Total comments |
| ---------------------------------------------------------------------------------------------------------- | ----- | ------------- | ------------------------------------------------------------------------ | -------------- |
| <a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="20"></a> | user1 | **4**         | [**34m**](https://app.flowwer.dev/charts/review-time/1) (2052.5 seconds) | 1              |
| <a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="20"></a> | user2 | 1             | [2h 21m](https://app.flowwer.dev/charts/review-time/2) (8465 seconds)    | **5**          |`;

const LINKS_AND_CHARTS_RESPONSE = `|                                                                                                            | User         | Total reviews      | Time to review                                                                     | Total comments     |
| ---------------------------------------------------------------------------------------------------------- | ------------ | ------------------ | ---------------------------------------------------------------------------------- | ------------------ |
| <a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="32"></a> | user1<br/>🥇 | **4**<br/>▀▀▀▀▀▀▀▀ | [**34m**](https://app.flowwer.dev/charts/review-time/1) (2052.5 seconds)<br/>▀▀    | 1<br/>▀▀           |
| <a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="32"></a> | user2<br/>🥈 | 1<br/>▀▀           | [2h 21m](https://app.flowwer.dev/charts/review-time/2) (8465 seconds)<br/>▀▀▀▀▀▀▀▀ | **5**<br/>▀▀▀▀▀▀▀▀ |`;

const REVIEW_PER_PR_RESPONSE = `|                                                                                                            | User  | Total reviews | Total reviews per PRs | Time to review                                                           | Total comments |
| ---------------------------------------------------------------------------------------------------------- | ----- | ------------- | --------------------- | ------------------------------------------------------------------------ | -------------- |
| <a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="20"></a> | user1 | **4**         | 4/5 (80%)             | [**34m**](https://app.flowwer.dev/charts/review-time/1) (2052.5 seconds) | 1              |
| <a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="20"></a> | user2 | 1             | 1/5 (20%)             | [2h 21m](https://app.flowwer.dev/charts/review-time/2) (8465 seconds)    | **5**          |`;

describe('Interactors | .buildTable', () => {
  it('returns all available reviewers in a set of pull requests', () => {
    const response = buildTable({ reviewers, disableLinks: true });
    expect(response).toEqual(SIMPLE_RESPONSE);
  });

  it('can add charts to the table', () => {
    const response = buildTable({ reviewers, displayCharts: true, disableLinks: true });
    expect(response).toEqual(CHARTS_RESPONSE);
  });

  it('with links enabled by default', () => {
    const response = buildTable({ reviewers });
    expect(response).toEqual(LINKS_RESPONSE);
  });

  it('with links and charts', () => {
    const response = buildTable({ reviewers, displayCharts: true });
    expect(response).toEqual(LINKS_AND_CHARTS_RESPONSE);
  });

  it('with displayTotalReviewsPerPrs true', () => {
    const response = buildTable({ reviewers, displayTotalReviewsPerPrs: true });
    expect(response).toEqual(REVIEW_PER_PR_RESPONSE);
  });
});
