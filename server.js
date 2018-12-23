'use strict'

import { TinderClient } from 'tinder-client'
let fs = require('fs')

async function getClient (facebookUserId, facebookToken) {
  let client = null
  try {
    client = await TinderClient.create({ facebookUserId, facebookToken })
  } catch (error) {
    console.log(error)
    throw error
  }

  return client
}

// How to get tinder access token:
// https://github.com/defaultnamehere/tinder-detective/issues/3
// https://medium.com/@paulxuca/tinder-tales-or-the-search-for-tinders-new-api-4d3a36e2542
function getCredentials () {
  let content = fs.readFileSync('./credentials.json')
  let jsonContent = JSON.parse(content)

  return jsonContent
}

async function main () {
  let cred = getCredentials()
  let client = await getClient(cred.userId, cred.token)
  let profileMetaData = await client.getMetadata()
  console.log(profileMetaData)
  // console.log(profile)
  // let recommendations = await client.getRecommendations()

  try {
    let userId = '5a82567982e3b3df16844775'
    let likeOutput = null
    // let likeOutput = await client.like(userId)
    console.log(likeOutput)
  } catch (error) {
    console.log(error)
  }
}

// the server starts here..
console.log('starting server')

main()
