# MSF training DHIS2 webapps development

-   We are here to practice Dhis2 apps Development using React, Material-UI and Clean Architecture.
-   Clean Architecture is a way of structuring code.

## Training requirements - Contacts App

-   It's necessary a dhis2 server instance
-   Fork and clone this repository

## Branches

-   Master contains full solution by EyeSeeTea (we recommended dont' see until the end)
-   [session_1](https://github.com/EyeSeeTea/MSF-training-DHIS2-webapps-development/tree/session_1) is the branch for session 1 exercise
-   [session_2](https://github.com/EyeSeeTea/MSF-training-DHIS2-webapps-development/tree/session_2) is the branch for session 1 exercise
-   session_3 is the branch for session 1 exercise
-   session_4 is the branch for session 1 exercise

## Setup

Install dependencies:

```
$ yarn install
```

## Development

Start development server:

```
$ PORT=8081 REACT_APP_DHIS2_BASE_URL="http://localhost:8080" yarn start
```

Linting:

```
$ yarn lint
```

## Tests

Run unit tests:

```
$ yarn test
```

Run integration tests locally:

```
$ export CYPRESS_DHIS2_AUTH='admin:district'
$ export CYPRESS_EXTERNAL_API="http://localhost:8080"
$ export CYPRESS_ROOT_URL=http://localhost:8081

# non-interactive
$ yarn cy:e2e:run

# interactive UI
$ yarn cy:e2e:open
```

For this to work in Travis, you will have to create an environment variable `CYPRESS_DHIS2_AUTH`
(Settings -> Environment Variables) with the `user:password` used in your testing DHIS2 instance.

## Build app ZIP

```
$ yarn build-webapp
```

## Some development tips

### Structure

-   `i18n/`: Contains literal translations (gettext format)
-   `public/`: Main app folder with a `index.html`, exposes the APP, contains the feedback-tool.
-   `src/webapp`: Presentation UI Layer (clean architecture)
-   `src/webapp/pages`: Main React components.
-   `src/webapp/components`: Reusable React components.
-   `src/domain`: Domain layer of the app (clean architecture)
-   `src/data`: Data of the app (clean architecture)
-   `src/types`: `.d.ts` file types for modules without TS definitions.
-   `src/utils`: Misc utilities.
-   `src/locales`: Auto-generated, do not update or add to the version control.
-   `cypress/integration/`: Cypress integration tests.

### i18n

```
$ yarn update-po
# ... add/edit translations in i18n/*.po files ...
$ yarn localize
```

### App context

The file `src/contexts/app-context.ts` holds some general context so typical infrastructure objects (`api`, `d2`, ...) are readily available. Add your own global objects if necessary.

### Scripts

Check the example script, entry `"script-example"`in `package.json`->scripts and `src/scripts/example.ts`.
