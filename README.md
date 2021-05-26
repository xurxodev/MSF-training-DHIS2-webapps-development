# DHIS2 webapps development - MSF training - HMIS Configuration App

-   DHIS2 web application development using React, Material-UI and Clean Architecture.

## Training requirements 

-   A DHIS2 server instance up and running with CORS enabled for the localhost:8080
-   You will have to fork and clone this repository
-   Install yarn and npm

## Branches

-   Master contains the full solution developed by EyeSeeTea (we recommended not to see the solution until the last session)
-   [session_1](https://github.com/EyeSeeTea/MSF-training-DHIS2-webapps-development/tree/session_1) is the branch for session 1 exercise
-   [session_2](https://github.com/EyeSeeTea/MSF-training-DHIS2-webapps-development/tree/session_2) is the branch for session 2 exercise (work in progress)
-   session_3 is the branch for session 3 exercise (work in progress)
-   session_4 is the branch for session 4 exercise (work in progress)

## Setup

Install dependencies:

```
$ yarn install
```

## Development

Start development server:

```
$ PORT=8081 REACT_APP_DHIS2_BASE_URL="DHIS2_INSTANCE_URL" yarn start
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
$ export CYPRESS_EXTERNAL_API="DHIS2_INSTANCE_URL"
$ export CYPRESS_ROOT_URL=http://localhost:8081

# non-interactive
$ yarn cy:e2e:run

# interactive UI
$ yarn cy:e2e:open
```

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

The file `src/contexts/app-context.ts` holds some general context so typical infrastructure objects (`compositionRoot`, ...) are readily available. Add your own global objects if necessary.

### Scripts

Check the example script, entry `"script-example"`in `package.json`->scripts and `src/scripts/example.ts`.
