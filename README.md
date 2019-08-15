# App

[![CircleCI](https://circleci.com/gh/upstandfm/app.svg?style=svg)](https://circleci.com/gh/upstandfm/app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/621e0425-89e1-4168-9168-0341e0f4da45/deploy-status)](https://app.netlify.com/sites/upstand-fm-app/deploys)

Upstand web application.

- [Create React App](#create-react-app)
- [CI/CD](#cicd)

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

### Code linting

CRA default ESLint settings are used.

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

## CI/CD

[CircleCI](https://circleci.com/gh/organizations/upstandfm) is used to to run tests, test builds and deploy the app via [Netlify](https://app.netlify.com). Here CircleCI requires a Netlify access token and site ID to deploy the built files.

### Token

The Netlify access token can be found in the [1Password](https://1password.com/) "upstand.fm" vault under "Netlify access token for CircleCI".

The token is configured in the CircleCI "credentials" [context](https://circleci.com/gh/organizations/upstandfm/settings#contexts/e1538fa8-437b-4179-aec6-d54de91c4b7a), which exposes the token value via the `NETLIFY_ACCESS_TOKEN` env var, so it can be used in the `.circleci/config.yml` file.

### Site ID

The Netlify site ID (named "API ID" in the Netlify web app) can be found in the [settings page](https://app.netlify.com/sites/upstand-fm-app/settings/general) under `Settings > General > Site Details > Site Information`.

The site ID is configured in the `package.json` file, in the `scripts.release` command (this command is executed by CircleCI).
