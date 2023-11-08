import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const majorRouter = createTRPCRouter({
  getAllMajors: publicProcedure.query(({ ctx }) => {
    return ctx.db.major.findMany({
      select: { id: true, name: true },
    });
  }),

  getMajorsForRating: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.majorRating.findMany({
        where: { ratingId: input.id },
        select: {
          major: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
});
