"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware",{

/***/ "(middleware)/./src/middleware.ts":
/*!***************************!*\
  !*** ./src/middleware.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/middleware */ \"(middleware)/./node_modules/next-auth/middleware.js\");\n/* harmony import */ var next_auth_middleware__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_middleware__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_auth_middleware__WEBPACK_IMPORTED_MODULE_0__.withAuth)({\n    pages: {\n        signIn: \"/signin\"\n    },\n    callbacks: {\n        authorized: ({ token })=>{\n            // ALL routes except public ones require auth\n            return !!token; // True = allow, False = block\n        }\n    }\n}));\n// Apply to EVERY route except:\n// - Public routes (signin, signup, home)\n// - Static files (_next, images, favicon)\nconst config = {\n    matcher: [\n        \"/((?!signin|signup|$|_next|images|favicon.ico).*)\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFnRDtBQUloRCxpRUFBZUEsOERBQVFBLENBQUM7SUFDdEJDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FDLFdBQVc7UUFDVEMsWUFBWSxDQUFDLEVBQUVDLEtBQUssRUFBRTtZQUNwQiw2Q0FBNkM7WUFDN0MsT0FBTyxDQUFDLENBQUNBLE9BQU8sOEJBQThCO1FBQ2hEO0lBQ0Y7QUFDRixFQUFFLEVBQUM7QUFHSCwrQkFBK0I7QUFDL0IseUNBQXlDO0FBQ3pDLDBDQUEwQztBQUNuQyxNQUFNQyxTQUFTO0lBQ3BCQyxTQUFTO1FBQUM7S0FBb0Q7QUFDaEUsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvbWlkZGxld2FyZS50cz9kMTk5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdpdGhBdXRoIH0gZnJvbSBcIm5leHQtYXV0aC9taWRkbGV3YXJlXCI7XHJcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhBdXRoKHtcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiBcIi9zaWduaW5cIiwgLy8gUmVkaXJlY3QgaGVyZSBpZiB1bmF1dGhvcml6ZWRcclxuICB9LFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXV0aG9yaXplZDogKHsgdG9rZW4gfSkgPT4ge1xyXG4gICAgICAvLyBBTEwgcm91dGVzIGV4Y2VwdCBwdWJsaWMgb25lcyByZXF1aXJlIGF1dGhcclxuICAgICAgcmV0dXJuICEhdG9rZW47IC8vIFRydWUgPSBhbGxvdywgRmFsc2UgPSBibG9ja1xyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcblxyXG4vLyBBcHBseSB0byBFVkVSWSByb3V0ZSBleGNlcHQ6XHJcbi8vIC0gUHVibGljIHJvdXRlcyAoc2lnbmluLCBzaWdudXAsIGhvbWUpXHJcbi8vIC0gU3RhdGljIGZpbGVzIChfbmV4dCwgaW1hZ2VzLCBmYXZpY29uKVxyXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xyXG4gIG1hdGNoZXI6IFtcIi8oKD8hc2lnbmlufHNpZ251cHwkfF9uZXh0fGltYWdlc3xmYXZpY29uLmljbykuKilcIl0sXHJcbn07XHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6WyJ3aXRoQXV0aCIsInBhZ2VzIiwic2lnbkluIiwiY2FsbGJhY2tzIiwiYXV0aG9yaXplZCIsInRva2VuIiwiY29uZmlnIiwibWF0Y2hlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n");

/***/ })

});