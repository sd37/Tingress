'use strict'
import { TinderClient } from 'tinder-client'

async function doStuff (id, token) {
  // var client = await TinderClient.create({ facebookUserId, facebookToken })
  console.log(id)
  console.log(token)
  let client = await Promise.resolve(1)
  return client
}

const facebookUserId = 'someFacebookUserId'
const facebookToken = 'someFacebookToken'

let x = doStuff(facebookUserId, facebookToken)
console.log('printing value of x:' + x)
