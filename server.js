#!/usr/bin/env node

const express = require('express')
const app = express()
const port = 3000
const serverUrl = `http://localhost:${port}`

app.get('/', (req, res) => res.send('Hello, World!'))

app.listen(port, () => console.log(`Hello World listening on ${serverUrl}`))
