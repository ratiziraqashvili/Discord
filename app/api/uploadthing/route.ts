//@ts-ignore
import { createNextRouteHandler } from "uploadthing/next";

//@ts-ignore 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});