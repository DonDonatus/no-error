"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/register/route";
exports.ids = ["app/api/auth/register/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cdedoo%5CDownloads%5Cproject-updated%5Cproject-main%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdedoo%5CDownloads%5Cproject-updated%5Cproject-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cdedoo%5CDownloads%5Cproject-updated%5Cproject-main%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdedoo%5CDownloads%5Cproject-updated%5Cproject-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_dedoo_Downloads_project_updated_project_main_src_app_api_auth_register_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/register/route.ts */ \"(rsc)/./src/app/api/auth/register/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/register/route\",\n        pathname: \"/api/auth/register\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/register/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\dedoo\\\\Downloads\\\\project-updated\\\\project-main\\\\src\\\\app\\\\api\\\\auth\\\\register\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_dedoo_Downloads_project_updated_project_main_src_app_api_auth_register_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/register/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGcmVnaXN0ZXIlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNkZWRvbyU1Q0Rvd25sb2FkcyU1Q3Byb2plY3QtdXBkYXRlZCU1Q3Byb2plY3QtbWFpbiU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDZGVkb28lNUNEb3dubG9hZHMlNUNwcm9qZWN0LXVwZGF0ZWQlNUNwcm9qZWN0LW1haW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ21EO0FBQ2hJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYW5pbWEtcHJvamVjdC8/NmY4ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxkZWRvb1xcXFxEb3dubG9hZHNcXFxccHJvamVjdC11cGRhdGVkXFxcXHByb2plY3QtbWFpblxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXHJlZ2lzdGVyXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL3JlZ2lzdGVyL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9yZWdpc3RlclwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9yZWdpc3Rlci9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGRlZG9vXFxcXERvd25sb2Fkc1xcXFxwcm9qZWN0LXVwZGF0ZWRcXFxccHJvamVjdC1tYWluXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxccmVnaXN0ZXJcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cdedoo%5CDownloads%5Cproject-updated%5Cproject-main%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdedoo%5CDownloads%5Cproject-updated%5Cproject-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/register/route.ts":
/*!********************************************!*\
  !*** ./src/app/api/auth/register/route.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/lib/index.mjs\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ \"(rsc)/./node_modules/uuid/dist/esm/v4.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_email__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/email */ \"(rsc)/./src/lib/email.ts\");\n// FILE: src/app/api/auth/register/route.ts\n\n\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_2__.PrismaClient();\n// Password schema with strict requirements\nconst passwordSchema = zod__WEBPACK_IMPORTED_MODULE_4__.z.string().min(8, \"Must be at least 8 characters\").regex(/[A-Z]/, \"Must contain at least one uppercase letter\").regex(/[0-9]/, \"Must contain at least one number\").regex(/[^A-Za-z0-9]/, \"Must contain at least one special character\");\n// Form validation schema\nconst formSchema = zod__WEBPACK_IMPORTED_MODULE_4__.z.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_4__.z.string().min(1, \"Username is required\"),\n    email: zod__WEBPACK_IMPORTED_MODULE_4__.z.string().email(\"Invalid email address\"),\n    phoneNumber: zod__WEBPACK_IMPORTED_MODULE_4__.z.string().regex(/^\\+1 \\(\\d{3}\\) \\d{3}-\\d{4}$/, \"Invalid US phone format\"),\n    password: passwordSchema\n});\nasync function POST(request) {\n    try {\n        // Parse and validate request body\n        const body = await request.json();\n        const validationResult = formSchema.safeParse(body);\n        if (!validationResult.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid input data\",\n                details: validationResult.error.errors\n            }, {\n                status: 400\n            });\n        }\n        const { name, email, phoneNumber, password } = validationResult.data;\n        // Check if user with this email already exists\n        const existingUser = await prisma.user.findUnique({\n            where: {\n                email\n            }\n        });\n        if (existingUser) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Email already in use\"\n            }, {\n                status: 409\n            });\n        }\n        // Hash password\n        const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hash(password, 10);\n        // Generate verification token (UUID) and set expiry (24 hours)\n        const verificationToken = (0,uuid__WEBPACK_IMPORTED_MODULE_5__[\"default\"])();\n        const verificationTokenExpiry = new Date();\n        verificationTokenExpiry.setHours(verificationTokenExpiry.getHours() + 24);\n        // Send verification email\n        const emailResult = await (0,_lib_email__WEBPACK_IMPORTED_MODULE_3__.sendVerificationEmail)(email, verificationToken);\n        if (!emailResult.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Failed to send verification email\"\n            }, {\n                status: 500\n            });\n        }\n        // Create temporary user record in database\n        // Note: We're creating the user in the database but with emailVerified=false\n        const user = await prisma.user.create({\n            data: {\n                name,\n                email,\n                phoneNumber,\n                password: hashedPassword,\n                emailVerified: false,\n                verificationToken,\n                verificationTokenExpiry\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Registration successful! Please check your email to verify your account.\"\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Registration error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"An error occurred during registration\"\n        }, {\n            status: 500\n        });\n    } finally{\n        await prisma.$disconnect();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL3JlZ2lzdGVyL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTJDO0FBQ2E7QUFDMUI7QUFDTjtBQUNZO0FBQ1U7QUFDTTtBQUdwRCxNQUFNTyxTQUFTLElBQUlGLHdEQUFZQTtBQUcvQiwyQ0FBMkM7QUFDM0MsTUFBTUcsaUJBQWlCTixrQ0FBQ0EsQ0FDckJPLE1BQU0sR0FDTkMsR0FBRyxDQUFDLEdBQUcsaUNBQ1BDLEtBQUssQ0FBQyxTQUFTLDhDQUNmQSxLQUFLLENBQUMsU0FBUyxvQ0FDZkEsS0FBSyxDQUFDLGdCQUFnQjtBQUd6Qix5QkFBeUI7QUFDekIsTUFBTUMsYUFBYVYsa0NBQUNBLENBQUNXLE1BQU0sQ0FBQztJQUMxQkMsTUFBTVosa0NBQUNBLENBQUNPLE1BQU0sR0FBR0MsR0FBRyxDQUFDLEdBQUc7SUFDeEJLLE9BQU9iLGtDQUFDQSxDQUFDTyxNQUFNLEdBQUdNLEtBQUssQ0FBQztJQUN4QkMsYUFBYWQsa0NBQUNBLENBQUNPLE1BQU0sR0FBR0UsS0FBSyxDQUFDLCtCQUErQjtJQUM3RE0sVUFBVVQ7QUFDWjtBQUdPLGVBQWVVLEtBQUtDLE9BQW9CO0lBQzdDLElBQUk7UUFDRixrQ0FBa0M7UUFDbEMsTUFBTUMsT0FBTyxNQUFNRCxRQUFRRSxJQUFJO1FBQy9CLE1BQU1DLG1CQUFtQlYsV0FBV1csU0FBUyxDQUFDSDtRQUU5QyxJQUFJLENBQUNFLGlCQUFpQkUsT0FBTyxFQUFFO1lBQzdCLE9BQU94QixxREFBWUEsQ0FBQ3FCLElBQUksQ0FBQztnQkFDdkJJLE9BQU87Z0JBQ1BDLFNBQVNKLGlCQUFpQkcsS0FBSyxDQUFDRSxNQUFNO1lBQ3hDLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNuQjtRQUVBLE1BQU0sRUFBRWQsSUFBSSxFQUFFQyxLQUFLLEVBQUVDLFdBQVcsRUFBRUMsUUFBUSxFQUFFLEdBQUdLLGlCQUFpQk8sSUFBSTtRQUVwRSwrQ0FBK0M7UUFDL0MsTUFBTUMsZUFBZSxNQUFNdkIsT0FBT3dCLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1lBQ2hEQyxPQUFPO2dCQUFFbEI7WUFBTTtRQUNqQjtRQUVBLElBQUllLGNBQWM7WUFDaEIsT0FBTzlCLHFEQUFZQSxDQUFDcUIsSUFBSSxDQUFDO2dCQUFFSSxPQUFPO1lBQXVCLEdBQUc7Z0JBQUVHLFFBQVE7WUFBSTtRQUM1RTtRQUVBLGdCQUFnQjtRQUNoQixNQUFNTSxpQkFBaUIsTUFBTWpDLHFEQUFXLENBQUNnQixVQUFVO1FBRW5ELCtEQUErRDtRQUMvRCxNQUFNbUIsb0JBQW9CaEMsZ0RBQU1BO1FBQ2hDLE1BQU1pQywwQkFBMEIsSUFBSUM7UUFDcENELHdCQUF3QkUsUUFBUSxDQUFDRix3QkFBd0JHLFFBQVEsS0FBSztRQUV0RSwwQkFBMEI7UUFDMUIsTUFBTUMsY0FBYyxNQUFNbkMsaUVBQXFCQSxDQUFDUyxPQUFPcUI7UUFFdkQsSUFBSSxDQUFDSyxZQUFZakIsT0FBTyxFQUFFO1lBQ3hCLE9BQU94QixxREFBWUEsQ0FBQ3FCLElBQUksQ0FBQztnQkFDdkJJLE9BQU87WUFDVCxHQUFHO2dCQUFFRyxRQUFRO1lBQUk7UUFDbkI7UUFFQSwyQ0FBMkM7UUFDM0MsNkVBQTZFO1FBQzdFLE1BQU1HLE9BQU8sTUFBTXhCLE9BQU93QixJQUFJLENBQUNXLE1BQU0sQ0FBQztZQUNwQ2IsTUFBTTtnQkFDSmY7Z0JBQ0FDO2dCQUNBQztnQkFDQUMsVUFBVWlCO2dCQUNWUyxlQUFlO2dCQUNmUDtnQkFDQUM7WUFDRjtRQUNGO1FBRUEsT0FBT3JDLHFEQUFZQSxDQUFDcUIsSUFBSSxDQUFDO1lBQ3ZCRyxTQUFTO1lBQ1RvQixTQUFTO1FBQ1gsR0FBRztZQUFFaEIsUUFBUTtRQUFJO0lBRW5CLEVBQUUsT0FBT0gsT0FBTztRQUNkb0IsUUFBUXBCLEtBQUssQ0FBQyx1QkFBdUJBO1FBQ3JDLE9BQU96QixxREFBWUEsQ0FBQ3FCLElBQUksQ0FBQztZQUN2QkksT0FBTztRQUNULEdBQUc7WUFBRUcsUUFBUTtRQUFJO0lBQ25CLFNBQVU7UUFDUixNQUFNckIsT0FBT3VDLFdBQVc7SUFDMUI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FuaW1hLXByb2plY3QvLi9zcmMvYXBwL2FwaS9hdXRoL3JlZ2lzdGVyL3JvdXRlLnRzP2U4MDMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRklMRTogc3JjL2FwcC9hcGkvYXV0aC9yZWdpc3Rlci9yb3V0ZS50c1xyXG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcclxuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xyXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XHJcbmltcG9ydCB7IHNlbmRWZXJpZmljYXRpb25FbWFpbCB9IGZyb20gJ0AvbGliL2VtYWlsJztcclxuXHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XHJcblxyXG5cclxuLy8gUGFzc3dvcmQgc2NoZW1hIHdpdGggc3RyaWN0IHJlcXVpcmVtZW50c1xyXG5jb25zdCBwYXNzd29yZFNjaGVtYSA9IHpcclxuICAuc3RyaW5nKClcclxuICAubWluKDgsIFwiTXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnNcIilcclxuICAucmVnZXgoL1tBLVpdLywgXCJNdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIHVwcGVyY2FzZSBsZXR0ZXJcIilcclxuICAucmVnZXgoL1swLTldLywgXCJNdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIG51bWJlclwiKVxyXG4gIC5yZWdleCgvW15BLVphLXowLTldLywgXCJNdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIHNwZWNpYWwgY2hhcmFjdGVyXCIpO1xyXG5cclxuXHJcbi8vIEZvcm0gdmFsaWRhdGlvbiBzY2hlbWFcclxuY29uc3QgZm9ybVNjaGVtYSA9IHoub2JqZWN0KHtcclxuICBuYW1lOiB6LnN0cmluZygpLm1pbigxLCBcIlVzZXJuYW1lIGlzIHJlcXVpcmVkXCIpLFxyXG4gIGVtYWlsOiB6LnN0cmluZygpLmVtYWlsKFwiSW52YWxpZCBlbWFpbCBhZGRyZXNzXCIpLFxyXG4gIHBob25lTnVtYmVyOiB6LnN0cmluZygpLnJlZ2V4KC9eXFwrMSBcXChcXGR7M31cXCkgXFxkezN9LVxcZHs0fSQvLCBcIkludmFsaWQgVVMgcGhvbmUgZm9ybWF0XCIpLFxyXG4gIHBhc3N3b3JkOiBwYXNzd29yZFNjaGVtYSxcclxufSk7XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgLy8gUGFyc2UgYW5kIHZhbGlkYXRlIHJlcXVlc3QgYm9keVxyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IGZvcm1TY2hlbWEuc2FmZVBhcnNlKGJvZHkpO1xyXG4gICBcclxuICAgIGlmICghdmFsaWRhdGlvblJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgICAgZXJyb3I6IFwiSW52YWxpZCBpbnB1dCBkYXRhXCIsXHJcbiAgICAgICAgZGV0YWlsczogdmFsaWRhdGlvblJlc3VsdC5lcnJvci5lcnJvcnNcclxuICAgICAgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICAgIH1cclxuICAgXHJcbiAgICBjb25zdCB7IG5hbWUsIGVtYWlsLCBwaG9uZU51bWJlciwgcGFzc3dvcmQgfSA9IHZhbGlkYXRpb25SZXN1bHQuZGF0YTtcclxuICAgXHJcbiAgICAvLyBDaGVjayBpZiB1c2VyIHdpdGggdGhpcyBlbWFpbCBhbHJlYWR5IGV4aXN0c1xyXG4gICAgY29uc3QgZXhpc3RpbmdVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGVtYWlsIH1cclxuICAgIH0pO1xyXG4gICBcclxuICAgIGlmIChleGlzdGluZ1VzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRW1haWwgYWxyZWFkeSBpbiB1c2VcIiB9LCB7IHN0YXR1czogNDA5IH0pO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8vIEhhc2ggcGFzc3dvcmRcclxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEwKTtcclxuICAgXHJcbiAgICAvLyBHZW5lcmF0ZSB2ZXJpZmljYXRpb24gdG9rZW4gKFVVSUQpIGFuZCBzZXQgZXhwaXJ5ICgyNCBob3VycylcclxuICAgIGNvbnN0IHZlcmlmaWNhdGlvblRva2VuID0gdXVpZHY0KCk7XHJcbiAgICBjb25zdCB2ZXJpZmljYXRpb25Ub2tlbkV4cGlyeSA9IG5ldyBEYXRlKCk7XHJcbiAgICB2ZXJpZmljYXRpb25Ub2tlbkV4cGlyeS5zZXRIb3Vycyh2ZXJpZmljYXRpb25Ub2tlbkV4cGlyeS5nZXRIb3VycygpICsgMjQpO1xyXG4gICBcclxuICAgIC8vIFNlbmQgdmVyaWZpY2F0aW9uIGVtYWlsXHJcbiAgICBjb25zdCBlbWFpbFJlc3VsdCA9IGF3YWl0IHNlbmRWZXJpZmljYXRpb25FbWFpbChlbWFpbCwgdmVyaWZpY2F0aW9uVG9rZW4pO1xyXG4gICBcclxuICAgIGlmICghZW1haWxSZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgIGVycm9yOiBcIkZhaWxlZCB0byBzZW5kIHZlcmlmaWNhdGlvbiBlbWFpbFwiXHJcbiAgICAgIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLy8gQ3JlYXRlIHRlbXBvcmFyeSB1c2VyIHJlY29yZCBpbiBkYXRhYmFzZVxyXG4gICAgLy8gTm90ZTogV2UncmUgY3JlYXRpbmcgdGhlIHVzZXIgaW4gdGhlIGRhdGFiYXNlIGJ1dCB3aXRoIGVtYWlsVmVyaWZpZWQ9ZmFsc2VcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5jcmVhdGUoe1xyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBlbWFpbCxcclxuICAgICAgICBwaG9uZU51bWJlcixcclxuICAgICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXHJcbiAgICAgICAgZW1haWxWZXJpZmllZDogZmFsc2UsXHJcbiAgICAgICAgdmVyaWZpY2F0aW9uVG9rZW4sXHJcbiAgICAgICAgdmVyaWZpY2F0aW9uVG9rZW5FeHBpcnksXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICBcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgIG1lc3NhZ2U6IFwiUmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwhIFBsZWFzZSBjaGVjayB5b3VyIGVtYWlsIHRvIHZlcmlmeSB5b3VyIGFjY291bnQuXCJcclxuICAgIH0sIHsgc3RhdHVzOiAyMDEgfSk7XHJcbiAgIFxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiUmVnaXN0cmF0aW9uIGVycm9yOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBlcnJvcjogXCJBbiBlcnJvciBvY2N1cnJlZCBkdXJpbmcgcmVnaXN0cmF0aW9uXCJcclxuICAgIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGF3YWl0IHByaXNtYS4kZGlzY29ubmVjdCgpO1xyXG4gIH1cclxufVxyXG5cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImJjcnlwdCIsInoiLCJ2NCIsInV1aWR2NCIsIlByaXNtYUNsaWVudCIsInNlbmRWZXJpZmljYXRpb25FbWFpbCIsInByaXNtYSIsInBhc3N3b3JkU2NoZW1hIiwic3RyaW5nIiwibWluIiwicmVnZXgiLCJmb3JtU2NoZW1hIiwib2JqZWN0IiwibmFtZSIsImVtYWlsIiwicGhvbmVOdW1iZXIiLCJwYXNzd29yZCIsIlBPU1QiLCJyZXF1ZXN0IiwiYm9keSIsImpzb24iLCJ2YWxpZGF0aW9uUmVzdWx0Iiwic2FmZVBhcnNlIiwic3VjY2VzcyIsImVycm9yIiwiZGV0YWlscyIsImVycm9ycyIsInN0YXR1cyIsImRhdGEiLCJleGlzdGluZ1VzZXIiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaGFzaGVkUGFzc3dvcmQiLCJoYXNoIiwidmVyaWZpY2F0aW9uVG9rZW4iLCJ2ZXJpZmljYXRpb25Ub2tlbkV4cGlyeSIsIkRhdGUiLCJzZXRIb3VycyIsImdldEhvdXJzIiwiZW1haWxSZXN1bHQiLCJjcmVhdGUiLCJlbWFpbFZlcmlmaWVkIiwibWVzc2FnZSIsImNvbnNvbGUiLCIkZGlzY29ubmVjdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/register/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/email.ts":
/*!**************************!*\
  !*** ./src/lib/email.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendVerificationEmail: () => (/* binding */ sendVerificationEmail)\n/* harmony export */ });\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ \"(rsc)/./node_modules/nodemailer/lib/nodemailer.js\");\n// FILE: src/lib/email.ts\n\n// Configure nodemailer with environment variables\nconst transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0__.createTransport({\n    service: \"gmail\",\n    auth: {\n        user: process.env.EMAIL_USER,\n        pass: process.env.EMAIL_PASSWORD\n    }\n});\n// Function to send verification email\nasync function sendVerificationEmail(email, verificationToken) {\n    const baseUrl = process.env.NEXTAUTH_URL || \"http://localhost:3000\";\n    const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${verificationToken}`;\n    const mailOptions = {\n        from: `\"UOMO MIGLIORE\" <${process.env.EMAIL_USER}>`,\n        to: email,\n        subject: \"Verify Your Email Address\",\n        html: `\r\n      <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;\">\r\n        <img src=\"${baseUrl}/icons/logoh.svg\" alt=\"Logo\" style=\"max-width: 200px; display: block; margin: 0 auto 20px;\" />\r\n        <h2 style=\"color: #08106c; text-align: center;\">Verify Your Email Address</h2>\r\n        <p style=\"margin-bottom: 20px; line-height: 1.5;\">Thank you for signing up! Please verify your email address to complete your registration.</p>\r\n        <div style=\"text-align: center; margin: 30px 0;\">\r\n          <a href=\"${verificationUrl}\" style=\"background-color: #08106c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;\">Verify Email</a>\r\n        </div>\r\n        <p style=\"font-size: 14px; color: #666; margin-top: 30px;\">If you didn't create an account, you can safely ignore this email.</p>\r\n      </div>\r\n    `\n    };\n    try {\n        await transporter.sendMail(mailOptions);\n        return {\n            success: true\n        };\n    } catch (error) {\n        console.error(\"Error sending verification email:\", error);\n        return {\n            success: false,\n            error\n        };\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2VtYWlsLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUJBQXlCO0FBQ1c7QUFHcEMsa0RBQWtEO0FBQ2xELE1BQU1DLGNBQWNELHVEQUEwQixDQUFDO0lBQzdDRyxTQUFTO0lBQ1RDLE1BQU07UUFDSkMsTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1FBQzVCQyxNQUFNSCxRQUFRQyxHQUFHLENBQUNHLGNBQWM7SUFDbEM7QUFDRjtBQUdBLHNDQUFzQztBQUMvQixlQUFlQyxzQkFBc0JDLEtBQWEsRUFBRUMsaUJBQXlCO0lBQ2xGLE1BQU1DLFVBQVVSLFFBQVFDLEdBQUcsQ0FBQ1EsWUFBWSxJQUFJO0lBQzVDLE1BQU1DLGtCQUFrQixDQUFDLEVBQUVGLFFBQVEsNkJBQTZCLEVBQUVELGtCQUFrQixDQUFDO0lBRXJGLE1BQU1JLGNBQWM7UUFDbEJDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRVosUUFBUUMsR0FBRyxDQUFDQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ25EVyxJQUFJUDtRQUNKUSxTQUFTO1FBQ1RDLE1BQU0sQ0FBQzs7a0JBRU8sRUFBRVAsUUFBUTs7OzttQkFJVCxFQUFFRSxnQkFBZ0I7Ozs7SUFJakMsQ0FBQztJQUNIO0lBR0EsSUFBSTtRQUNGLE1BQU1mLFlBQVlxQixRQUFRLENBQUNMO1FBQzNCLE9BQU87WUFBRU0sU0FBUztRQUFLO0lBQ3pCLEVBQUUsT0FBT0MsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMscUNBQXFDQTtRQUNuRCxPQUFPO1lBQUVELFNBQVM7WUFBT0M7UUFBTTtJQUNqQztBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYW5pbWEtcHJvamVjdC8uL3NyYy9saWIvZW1haWwudHM/NGMxOCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGSUxFOiBzcmMvbGliL2VtYWlsLnRzXHJcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gJ25vZGVtYWlsZXInO1xyXG5cclxuXHJcbi8vIENvbmZpZ3VyZSBub2RlbWFpbGVyIHdpdGggZW52aXJvbm1lbnQgdmFyaWFibGVzXHJcbmNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gIHNlcnZpY2U6ICdnbWFpbCcsXHJcbiAgYXV0aDoge1xyXG4gICAgdXNlcjogcHJvY2Vzcy5lbnYuRU1BSUxfVVNFUixcclxuICAgIHBhc3M6IHByb2Nlc3MuZW52LkVNQUlMX1BBU1NXT1JELFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuXHJcbi8vIEZ1bmN0aW9uIHRvIHNlbmQgdmVyaWZpY2F0aW9uIGVtYWlsXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kVmVyaWZpY2F0aW9uRW1haWwoZW1haWw6IHN0cmluZywgdmVyaWZpY2F0aW9uVG9rZW46IHN0cmluZykge1xyXG4gIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUQVVUSF9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCc7XHJcbiAgY29uc3QgdmVyaWZpY2F0aW9uVXJsID0gYCR7YmFzZVVybH0vYXBpL2F1dGgvdmVyaWZ5LWVtYWlsP3Rva2VuPSR7dmVyaWZpY2F0aW9uVG9rZW59YDtcclxuIFxyXG4gIGNvbnN0IG1haWxPcHRpb25zID0ge1xyXG4gICAgZnJvbTogYFwiVU9NTyBNSUdMSU9SRVwiIDwke3Byb2Nlc3MuZW52LkVNQUlMX1VTRVJ9PmAsXHJcbiAgICB0bzogZW1haWwsXHJcbiAgICBzdWJqZWN0OiAnVmVyaWZ5IFlvdXIgRW1haWwgQWRkcmVzcycsXHJcbiAgICBodG1sOiBgXHJcbiAgICAgIDxkaXYgc3R5bGU9XCJmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IG1heC13aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvOyBwYWRkaW5nOiAyMHB4OyBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwOyBib3JkZXItcmFkaXVzOiA1cHg7XCI+XHJcbiAgICAgICAgPGltZyBzcmM9XCIke2Jhc2VVcmx9L2ljb25zL2xvZ29oLnN2Z1wiIGFsdD1cIkxvZ29cIiBzdHlsZT1cIm1heC13aWR0aDogMjAwcHg7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW46IDAgYXV0byAyMHB4O1wiIC8+XHJcbiAgICAgICAgPGgyIHN0eWxlPVwiY29sb3I6ICMwODEwNmM7IHRleHQtYWxpZ246IGNlbnRlcjtcIj5WZXJpZnkgWW91ciBFbWFpbCBBZGRyZXNzPC9oMj5cclxuICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDIwcHg7IGxpbmUtaGVpZ2h0OiAxLjU7XCI+VGhhbmsgeW91IGZvciBzaWduaW5nIHVwISBQbGVhc2UgdmVyaWZ5IHlvdXIgZW1haWwgYWRkcmVzcyB0byBjb21wbGV0ZSB5b3VyIHJlZ2lzdHJhdGlvbi48L3A+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luOiAzMHB4IDA7XCI+XHJcbiAgICAgICAgICA8YSBocmVmPVwiJHt2ZXJpZmljYXRpb25Vcmx9XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDgxMDZjOyBjb2xvcjogd2hpdGU7IHBhZGRpbmc6IDEycHggMjRweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBib3JkZXItcmFkaXVzOiA1cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+VmVyaWZ5IEVtYWlsPC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiAxNHB4OyBjb2xvcjogIzY2NjsgbWFyZ2luLXRvcDogMzBweDtcIj5JZiB5b3UgZGlkbid0IGNyZWF0ZSBhbiBhY2NvdW50LCB5b3UgY2FuIHNhZmVseSBpZ25vcmUgdGhpcyBlbWFpbC48L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICB9O1xyXG5cclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWw6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yIH07XHJcbiAgfVxyXG59XHJcblxyXG4iXSwibmFtZXMiOlsibm9kZW1haWxlciIsInRyYW5zcG9ydGVyIiwiY3JlYXRlVHJhbnNwb3J0Iiwic2VydmljZSIsImF1dGgiLCJ1c2VyIiwicHJvY2VzcyIsImVudiIsIkVNQUlMX1VTRVIiLCJwYXNzIiwiRU1BSUxfUEFTU1dPUkQiLCJzZW5kVmVyaWZpY2F0aW9uRW1haWwiLCJlbWFpbCIsInZlcmlmaWNhdGlvblRva2VuIiwiYmFzZVVybCIsIk5FWFRBVVRIX1VSTCIsInZlcmlmaWNhdGlvblVybCIsIm1haWxPcHRpb25zIiwiZnJvbSIsInRvIiwic3ViamVjdCIsImh0bWwiLCJzZW5kTWFpbCIsInN1Y2Nlc3MiLCJlcnJvciIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/email.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod","vendor-chunks/nodemailer","vendor-chunks/uuid","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cdedoo%5CDownloads%5Cproject-updated%5Cproject-main%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdedoo%5CDownloads%5Cproject-updated%5Cproject-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();