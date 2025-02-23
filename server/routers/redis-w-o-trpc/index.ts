import { Router } from "express";

import { createClient } from 'redis';

const redisClient = createClient();

// await client.connect();

const DEFAULT_EXPIRATION_TIME = 3600; // 1 hour in seconds

const redisWithoutTrpcRouter = Router();

redisWithoutTrpcRouter.get("/photos-redis", async (req, res) => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        const cachedPhotos = await redisClient.get(`photos`);

        if (cachedPhotos !== null) {
            res.json(JSON.parse(cachedPhotos));
        } else {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
            const photosData = await response.json();
            redisClient.setEx(`photos`, DEFAULT_EXPIRATION_TIME, JSON.stringify(photosData));
            res.json(photosData);
        }
    } catch (error) {
        console.error("Error connecting to Redis or fetching data", error);
        res.status(500).json({ message: "Error connecting to Redis or fetching data" });
    }
});

redisWithoutTrpcRouter.get("/photos", async (req, res) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    const photos = await response.json();
    res.json(photos);
});

redisWithoutTrpcRouter.get("/photos/album/:albumId", async (req, res) => {
    const albumId = req.params.albumId;
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    const photos = await response.json();
    console.log(photos, "photos", albumId, req.params);
    res.json(photos);
});

// redisWithoutTrpcRouter.get("/photos-redis/album/:albumId", async (req, res) => {
//     const albumId = req.params.albumId;
//     try {
//         if (!redisClient.isOpen) {
//             await redisClient.connect();
//         }
//         const cachedPhotos = await redisClient.get(`photos-album-${albumId}`);
//         if (cachedPhotos !== null) {
//             res.json(JSON.parse(cachedPhotos));
//         } else {
//             const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
//             const photosData = await response.json();
//             redisClient.setEx(`photos-album-${albumId}`, DEFAULT_EXPIRATION_TIME, JSON.stringify(photosData));
//             res.json(photosData);
//         }
//     } catch (error) {
//         console.error("Error connecting to Redis or fetching data", error);
//         res.status(500).json({ message: "Error connecting to Redis or fetching data" });
//     }
// });
redisWithoutTrpcRouter.get("/photos-redis/album/:albumId", async (req, res) => {
    const albumId = req.params.albumId;
    const photos = await getOrSetCachedData(`photos-album:${albumId}`, async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        const albumPhotosData = await response.json();
        return albumPhotosData;
    })
    res.json(photos);
});

redisWithoutTrpcRouter.get("/photos/:id", async (req, res) => {
    const photoId = req.params.id;
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
    const photo = await response.json();
    res.json(photo);
});

redisWithoutTrpcRouter.get("/photos-redis/:id", async (req, res) => {
    const photoId = req.params.id;
    const photo = await getOrSetCachedData(`photo:${photoId}`, async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
        const photoData = await response.json();
        return photoData;
    });
    res.json(photo);
});

const getOrSetCachedData = async (key: string, fetchFunction: () => Promise<any>) => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
        const cachedData = await redisClient.get(key);
        if (cachedData !== null) {
            return JSON.parse(cachedData);
        } else {
            const data = await fetchFunction();
            redisClient.setEx(key, DEFAULT_EXPIRATION_TIME, JSON.stringify(data));
            return data;
        }
    } catch (error) {
        console.error("Error connecting to Redis or fetching data", error);
        throw new Error("Error connecting to Redis or fetching data");
    }
};

export { redisWithoutTrpcRouter };


/**
 * 
 * 
 // import { v4 as uuid } from "uuid";
// import Redis from "redis";

// const redisClient = Redis.createClient(
//     // we could explicitly define for local host or by default its set to localhost but for production we need to explicitly define host url
//     // {
//     //     url: "localhost",
//     // }
// );

// import { createClient } from 'redis';

// const redisClient = createClient();

// redisClient.on('connect', () => {
//     console.log('Connected to Redis');
// });

// redisClient.on('error', (err) => {
//     console.log('Redis Client Error', err);
// });


// redisClient.on('error', err => console.log('Redis Client Error', err));

// redisWithoutTrpcRouter.get("/photos-redis", async (req, res) => {
//     const ready = await redisClient.connect();
//     // console.log(ready);

//     if (!ready) {
//         res.status(500).json({ message: "Error connecting to Redis" });
//     } else {
//         const photos = await redisClient.get("photos");

//         if (photos !== null) {
//             res.json(JSON.parse(photos));
//         } else {
//             const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);

//             const photos = await response.json();

//             console.log(typeof photos);

//             // setting data in redis
//             // redisClient.set("photos", DEFAULT_EXPIRATION_TIME, photos);
//             redisClient.setEx("photos", DEFAULT_EXPIRATION_TIME, JSON.stringify(photos));

//             res.json(photos);
//         }
//     }
// });

// redisWithoutTrpcRouter.get("/photos-redis", async (req, res) => {
//     const ready = await redisClient.connect();
//     if (!ready) {
//         res.status(500).json({ message: "Error connecting to Redis" });
//     } else {
//         const photos = await redisClient.get("photos");

//         if (photos) {
//             res.json(JSON.parse(photos));
//         } else {
//             const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);

//             const photos = await response.json();

//             console.log(typeof photos);

//             // setting data in redis
//             // redisClient.set("photos", DEFAULT_EXPIRATION_TIME, photos);
//             redisClient.setEx("photos", DEFAULT_EXPIRATION_TIME, JSON.stringify(photos));

//             res.json(photos);
//         }
//     }
// });
 */