'use strict'

import { TinderClient } from 'tinder-client'
let fs = require('fs')

async function getClient (id, token) {
  let client = await TinderClient.create({ id, token })
  return client
}

function getCredentials () {
  let content = fs.readFileSync('./credentials.json')
  let jsonContent = JSON.parse(content)

  return jsonContent
}

async function main () {
  let cred = getCredentials()
  let client = await getClient(cred.userId, cred.token)
}

// the server starts here..
console.log('starting server')

main()
