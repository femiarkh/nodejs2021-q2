# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/get-started)

## Downloading

```
git clone {repository URL}
```

## Running application with Docker

Make sure Docker is installed.
Go to the root directory and run

```
docker-compose up
```

In order to stop and remove the containers, run

```
docker-compose down
```

## Switching between Express and Fastify

You can switch between Express and Fastify by setting `USE_FASTIFY` to `'true'` (or not) in `.env` file.

If you wish to compare performance of the app in different frameworks, you can run:

`$(npm bin)/artillery run artillery-test.yml`

It will test the `users` module with one or the other framework depending on the `USE_FASTIFY` value.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
