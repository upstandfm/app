# App

[![CircleCI](https://circleci.com/gh/upstandfm/app.svg?style=svg)](https://circleci.com/gh/upstandfm/app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/621e0425-89e1-4168-9168-0341e0f4da45/deploy-status)](https://app.netlify.com/sites/upstand-fm-app/deploys)

Upstand web application.

- [Create React App](#create-react-app)
- [Tests](#tests)
- [CI/CD](#cicd)
- [Configuration](#configuration)
- [Design](#design)

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) (CRA).

- [Available scripts](#available-scripts)
- [Code linting](#code-linting)
- [Code formatting](#code-formatting)
- [Additional resources](#additional-resources)

### Available scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

_Make sure you have created a [configuration](#configuration) file first._

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### `npm run cy`

Runs end-to-end tests locally using [Cypress](https://www.cypress.io/).

Caveats:

- The local dev server must be running (use `npm start`), before the end-to-end tests can run.
- The [watch-and-reload plugin](https://github.com/bahmutov/cypress-watch-and-reload) is used to rerun tests on source code change. But according to [this issue](https://github.com/cypress-io/cypress/issues/456), this functionality will be native in the future. When that's the case, remove the plugin.

### Code linting

CRA default ESLint settings are used, but are extended with a custom `.eslintrc.json` file. For example to add Cypress globals.

### Code formatting

Code is automatically formatted on commit with Prettier.

### Additional resources

- [Code splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the bundle size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [npm run build fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

## Tests

### End-to-end

[Cypress](https://www.cypress.io) is used to run end-to-end tests, and all test runs for the app can be viewed [here](https://dashboard.cypress.io/#/projects/b58xj4/runs).

## CI/CD

[CircleCI](https://circleci.com/gh/organizations/upstandfm) is used to to run unit tests, end-to-end tests, test builds and deploy the app via [Netlify](https://app.netlify.com).

### Testing

CircleCI requires a Cypress token to record tests and store screenshots.

The token can be found in the [Cypress dashboard](https://dashboard.cypress.io/#/projects/b58xj4/settings) under "Record Keys".

The token is configured as an [environment variable](https://circleci.com/gh/upstandfm/app/edit#env-vars), and is used by the [Cypress CircleCI Orb](https://github.com/cypress-io/circleci-orb), used in the `.circleci/config.yml` file.

The token is configured in CircleCI as an environment variable named `CYPRESS_RECORD_KEY`.

### Netlify

CircleCI requires a Netlify access token, site ID and publish directory to deploy the built files. These are configured as [environment variables](https://circleci.com/gh/upstandfm/app/edit#env-vars), and can be used in the `.circleci/config.yml` file.

### Token

The Netlify access token can be found in the [1Password](https://1password.com/) "upstand.fm" vault under "Netlify access token for CircleCI".

The token is configured in CircleCI as an environment variable named `NETLIFY_ACCESS_TOKEN`.

### Site ID

The Netlify site ID (named "API ID" in the Netlify web app) can be found in the [settings page](https://app.netlify.com/sites/upstand-fm-app/settings/general) under `Settings > General > Site Details > Site Information`.

The site ID is configured in CircleCI as an environment variable named `NETLIFY_SITE_ID`.

### Publish directory

The publish directory contains the files that Netlify must deploy. This is the output after running the `npm run build` command, which creates the directory `/build` by default.

The publish directory is configured in CircleCI as an environment variable named `NETLIFY_PUBLISH_DIR`. It must have the value `build`.

## Configuration

The app is configured via `.env` files:

- `.env.development` is the config required to run the app locally.
- `.env.production` is the config required to run the app in production.

_Note that these files should **NOT** contain secrets!_

Both files must contain the following environment variables:

| Name                         | Required | Description                                                                                             |
| ---------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| REACT_APP_AUTH0_DOMAIN       | Yes      | The Auth0 tenant domain name.                                                                           |
| REACT_APP_AUTH0_CLIENT_ID    | Yes      | The application client ID as configured in Auth0.                                                       |
| REACT_APP_AUTH0_REDIRECT_URI | Yes      | Set to `http://localhost:3000` for dev. And `https://www.upstand.fm` for prod.                          |
| REACT_APP_AUTH0_LOGOUT_URL   | Yes      | Should match the `REACT_APP_AUTH0_REDIRECT_URI` value.                                                  |
| REACT_APP_AUTH0_AUDIENCE     | Yes      | The audience for which the issued token is intended. Set this to `https://api.upstand.fm`.              |
| REACT_APP_AUTH0_SCOPE        | Yes      | The OAuth scopes that are requested on behalf of the user. And which are "evaluated" by the "audience". |

### Caveats

- You must create custom environment variables beginning with `REACT_APP_`.
- Any other variables except `NODE_ENV` will be ignored to avoid accidentally
  exposing a private key on the machine that could have the same name.
- You have to restart the dev server after changing the `.env.development` file.

### Design

#### Logo & color scheme

See the [design assets](https://github.com/upstandfm/design-assets) for more info.

#### Fonts

[Fira Sans](https://fonts.google.com/specimen/Fira+Sans) is used:

- Regular (400)
- Bold (700)

They can be found in `src/fonts`.

#### Layout

The app layout is inspired by [Slack's](https://slack.com) sidebar layout.
