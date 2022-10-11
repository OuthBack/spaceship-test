import { z } from "zod";
import { createRouter } from "./context";

export const todoRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.todo.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })
  .query("get", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      const todo = ctx.prisma.todo.findFirst({ where: { id: input.id } });

      return todo;
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      const todo = ctx.prisma.todo.create({ data: input });
      return todo;
    },
  })
  .mutation("remove", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      const todo = ctx.prisma.todo.delete({ where: { id: input.id } });
      return todo;
    },
  });
