"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("axios"),t=require("./interceptorRequest.js"),r=require("./interceptorResponse.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}const s=_interopDefaultLegacy(e).default.create({});s.interceptors.request.use(t.default),s.interceptors.response.use(r.default,r.onResponseError),exports.default=s;