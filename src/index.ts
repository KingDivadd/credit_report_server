import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import bodyParser, { text } from 'body-parser';
import webpush from 'web-push'
import apn from 'apn'
import cors from 'cors';
import colors from 'colors';
require('colors')
import dotenv from 'dotenv'; 
const jwt = require('jsonwebtoken')
import { CORS_OPTION, port } from './helpers/constants';
import index from './routes/index'
import not_found from  './middlewares/not_found'
import check_network_availability from './middlewares/network_availability'

import prisma from './helpers/prisma_initializer';


dotenv.config();

const app = express();

const server = http.createServer(app);

const io:any = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] }});

app.use(express.json());
app.use(cors(CORS_OPTION));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// config webpush.js

// Sockets area


export {io}

// middleware
app.use(check_network_availability);

// routes
app.use('/api/v1/auth', index);
app.use('/api/v1/user', index);


app.use(not_found);



const start = async () => {
    const PORT = port || 4500;
    try {
        server.listen(PORT, () => console.log(`Credit Resolution App server started and running on port ${PORT}`.cyan.bold));
    } catch (err) {
        console.log(`something went wrong`.red.bold);
    }
}

start();