import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ambassadorRouter = createTRPCRouter({
  getNames: publicProcedure.query(({ ctx }) => {
    return ctx.db.ambassador.findMany({
      select: { name: true, id: true },
    });
  }),

  getAmbassadorName: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.ambassador.findUnique({
        where: { id: input.id },
        select: {
          name: true,
        },
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
            include: {
              MajorRatings: { include: { major: true } },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });
    }),
});
