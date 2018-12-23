'use strict'

import { TinderClient } from 'tinder-client'
let fs = require('fs')
const sleep = require('system-sleep')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('tinderdb', 'postgres', 'besmart', {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  operatorsAliases: false
})

const Users = sequelize.define('users', {
  user_id: Sequelize.STRING,
  name: Sequelize.STRING,
  bio: Sequelize.STRING,
  distance_mi: Sequelize.INTEGER,
  ping_time: Sequelize.TIME,
  birth_date: Sequelize.TIME
})

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

async function likeAndPushToDb (client) {
  let recosResponses = await sleepyGetRecommendations(client)
  let recos = recosResponses.results

  recos.forEach(async r => {
    await sleepyLike(client, r._id)
    Users.create({
      user_id: r._id,
      name: r.name,
      bio: r.bio,
      distance_mi: r.distance_mi,
      ping_time: r.ping_time,
      birth_date: r.birth_date })
  })
}

async function sleepyLike (client, id) {
  let secondsToSleep = 1
  sleep(secondsToSleep * 1000)
  let likeOutput = await client.like(id)
  console.log(likeOutput)
}

async function sleepyGetRecommendations (client) {
  let secondsToSleep = 0.5
  sleep(secondsToSleep * 1000)
  let recosResponses = await client.getRecommendations()
  return recosResponses
}

async function main () {
  let cred = getCredentials()
  let client = await getClient(cred.userId, cred.token)

  console.log('***Profile Info***')
  let profile = await client.getProfile()
  console.log(profile)
  console.log('Profile Info EOF***')

  let iterations = 100
  try {
    for (let i = 1; i <= iterations; i++) {
      console.log('Iteration: ' + i)
      await likeAndPushToDb(client)
    }
  } catch (error) {
    console.log(error)
  }
}

// the server starts here..
console.log('starting server')
main()
