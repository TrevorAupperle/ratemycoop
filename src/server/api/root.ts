import { createTRPCRouter } from "~/server/api/trpc";
import { ambassadorRouter } from "./routers/ambassador";
import { majorRouter } from "./routers/major";
import { ratingRouter } from "./routers/rating";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ambassador: ambassadorRouter,
  major: majorRouter,
  rating: ratingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
