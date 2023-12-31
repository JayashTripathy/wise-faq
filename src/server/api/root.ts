
import { createTRPCRouter } from "@/server/api/trpc";
import { faqRouter } from "./routers/faq";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({

  faq: faqRouter,

});



// export type definition of API
export type AppRouter = typeof appRouter;
