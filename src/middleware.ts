// import { sendRedirect, createMiddleware } from "@solidjs/start/server";
//
// export default createMiddleware({
//   onRequest: [
//     (event) => {
//       const { pathname } = new URL(event.request.url);
//
//       /* Redirect all routes to "/" */
//       if (pathname !== "/") {
//         return sendRedirect(event, "/");
//       }
//     },
//   ],
// });
