'use strict';
import { TinderClient } from 'tinder-client'

var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);

var client = TinderClient.create({ facebookUserId, facebookToken })

