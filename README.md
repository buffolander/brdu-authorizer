# brdu-authorizer

This is a lightweight authentication and authorization middleware for Express based on Firebase user tokens and fixed tokens (for server-to-server requests).

The current version is only authenticating Firebase users tokens. Following versions will cover:

- user authorization based on roles
- user authorization for specific routes
- server authentcation
- server authorization for specific routes

## Module implementation

```bash
npm install -g npm
npm install --save @brdu/authorizer
```

Implemented as an Express.js middleware on your `index.js` entry file

```javascript
const admin = require('firebase-admin')
const express = require('express')

const { authorize, AuthTypes } = require('@brdu/authorizer')

admin.initializeApp({ credential: admin.credential.applicationDefault() })
const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

const routes = {
  get: [{
    endpoint: '/:id',
    regexp: new RegExp(/^\/(?:([^\/]+?))\/?$/i),
    path: './lambdas/get',
  }, {
    endpoint: '/',
    regexp: new RegExp(/^\/?$/i),
    path: './lambdas/list',
  }],
}

const app = express.Router()

app.use((req, res, next) => { Object.assign(req, { db }); next() })

app.use(authorize)

// eslint-disable-next-line global-require, import/no-dynamic-require
routes.get.forEach(route => app.get(route.endpoint, require(route.path)))

app.use('*', (req, res) => res.status(404).send('not-found'))

module.exports = { app }
```
