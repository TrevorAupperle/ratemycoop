import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ambassadorRouter = createTRPCRouter({
  getNames: publicProcedure.query(({ ctx }) => {
    return ctx.db.ambassador.findMany({
      select: { name: true, id: true },
    });
  }),

  getAmbassador: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.ambassador.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          major: true,
          ratings: {
            select: {
              id: true,
              createdAt: true,
              majors: true,
              rating: true,
              knowledgeRating: true,
              wouldRecommend: true,
              jokes: true,
              friendly: true,
              inspirational: true,
              easyCommunication: true,
              review: true,
              reports: true,
              removed: true,
              moderated: true,
              ambassadorId: true,
            },
          },
        },
      });
    }),
});
