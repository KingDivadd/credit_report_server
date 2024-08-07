import { redis_url } from './constants';
import { createClient } from 'redis';

if (!redis_url) {
    throw new Error('REDIS URL not found');
}

let redis_client = createClient({
    url: String(redis_url),
    socket: {
        reconnectStrategy: (retries) => {
            console.log('Reconnecting to Redis...'.cyan.bold);
            return Math.min(retries * 100, 3000); // Exponential backoff
        },
    },
});

function setupClientListeners(client:any ) {
    client.on('connect', () => {
        console.log('Redis client connected'.cyan.bold);
    });

    client.on('end', () => {
        console.log('Redis client disconnected'.yellow.bold);
    });

    client.on('error', (err:any) => {
        console.log('Redis Client Error'.red.bold, err);
        if (err.code === 'ECONNRESET' || err.code === 'NR_CLOSED' || err.message.includes('Socket closed unexpectedly')) {
            recreateRedisClient(); // Recreate the client on specific errors
        }
    });
}

async function recreateRedisClient() {
    try {
        if (redis_client.isOpen) {
            console.log('closing existing connection')
            await redis_client.quit(); // Close the existing connection if open
        }
    } catch (err) {
        console.log('Error quitting Redis client', err);
    }

    redis_client = createClient({
        url: String(redis_url),
        socket: {
            reconnectStrategy: (retries) => {
                console.log('Reconnecting to Redis...'.cyan.bold);
                return Math.min(retries * 100, 3000); // Exponential backoff
            },
        },
    });

    setupClientListeners(redis_client);

    try {
        await redis_client.connect();
    } catch (err) {
        console.error('Could not establish a connection with Redis', err);
        setTimeout(recreateRedisClient, 3000); // Retry after delay if connection fails
    }
}

setupClientListeners(redis_client);

try {
    redis_client.connect();
} catch (err) {
    console.log('Error occurred', err);
    recreateRedisClient();
}

export default redis_client;