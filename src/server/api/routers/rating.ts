import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ratingRouter = createTRPCRouter({
  addRating: publicProcedure
    .input(
      z.object({
        majors: z.array(z.object({ id: z.number(), name: z.string() })),
        rating: z.number(),
        knowledgeRating: z.number(),
        wouldRecommend: z.number(),
        jokes: z.boolean(),
        friendly: z.boolean(),
        inspirational: z.boolean(),
        easyCommunication: z.boolean(),
        review: z.string(),
        ambassadorId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.rating.create({
        data: {
          rating: input.rating,
          knowledgeRating: input.knowledgeRating,
          wouldRecommend: input.wouldRecommend === 1 ? true : false,
          jokes: input.jokes,
          friendly: input.friendly,
          inspirational: input.inspirational,
          easyCommunication: input.easyCommunication,
          review: input.review,
          ambassadorId: input.ambassadorId,
          MajorRatings: {
            create: input.majors.map((major) => ({
              majorId: major.id,
            })),
          },
        },
      });
    }),
});
