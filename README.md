# Todo App (Vue3 + Koa + SQLite)

## Install
* Make sure you have [Node.js](https://nodejs.org/) version 8.9 or above
* Clone this project `git clone git@github.com:omieliekh/vue-koa-todo-app.git`
* Go to the project's directory `cd vue-koa-todo-app`
* Run `npm install` to install all the modules and dependencies

## Run
Run `npm start` and open [http://localhost:8080](http://localhost:8080) in your browser.

## Development

#### Run servers separately
There are two servers for this project: front-end static vue-server 
and back-end koa-server that handles all the API requests.

To run them simultaneously, just use `npm start` command. 

But, for your convenience you may want to run them in separate consoles. If you do, then:

* Run `npm run serve` in one console to start front-end static server
* Run `npm run server` in second console to start back-end server

#### Build
Run `npm run build` to prepare production build

#### Tests
Run `npm run test` to execute local unit tests

#### Lint
Run `npm run lint` to check spelling in your code

#### Database
After first run, `sqlite3.db` file will be created in project's root.
You can open it to alter your Database' data with any tool like [DB Browser for SQLite](https://sqlitebrowser.org/)
