import { Router } from "express"
import { t } from "../../trpc";
import { redisClient } from "../../redis-client";
import { z } from "zod";

export const redisAndTrpcRouter = Router()

const DEFAULT_EXPIRATION_TIME = 3600; // 1 hour in seconds

redisAndTrpcRouter.get("/photos-trpc", async (req, res) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    const photosData = await response.json();
    res.json(photosData);
});

export const redisAndTrpcWithoutRedisRouter = t.router({
    photosWithoutRedis: t.procedure.query(async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
        const photosData = await response.json();
        return photosData;
    }),
    photos_redis: t.procedure.query(async () => {
        try {
            if (!redisClient.isOpen) {
                await redisClient.connect();
            }
            const cachedPhotos = await redisClient.get(`photos`);
            if (cachedPhotos !== null) {
                return JSON.parse(cachedPhotos);
            } else {
                const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
                const photosData = await response.json();
                redisClient.setEx(`photos`, DEFAULT_EXPIRATION_TIME, JSON.stringify(photosData));
                return photosData;
            }
        } catch (error) {
            console.error("Error connecting to Redis or fetching data", error);
            throw new Error("Error connecting to Redis or fetching data");
        }
    }),
    photos_redis_album: t.procedure.input(z.object({
        albumId: z.number()
    })).mutation(async ({ input }) => {
        try {
            if (!redisClient.isOpen) {
                await redisClient.connect();
            }
            const cachedPhotos = await redisClient.get(`photos-album-${input.albumId}`);
            if (cachedPhotos !== null) {
                return JSON.parse(cachedPhotos);
            } else {
                const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${input.albumId}`);
                const photosData = await response.json();
                redisClient.setEx(`photos-album-${input.albumId}`, DEFAULT_EXPIRATION_TIME, JSON.stringify(photosData));
                return photosData;
            }
        } catch (error) {
            console.error("Error connecting to Redis or fetching data", error);
            throw new Error("Error connecting to Redis or fetching data");
        }
    })
})