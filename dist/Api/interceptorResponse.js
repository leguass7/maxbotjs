"use strict";function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var e=_interopDefaultLegacy(require("camelcase-keys"));exports.default=function interceptorResponse(t){return e.default(t.data,{deep:!0})},exports.onResponseError=async function onResponseError(e){const t=e&&e.response,r=t&&parseInt(t.status,10),s={status:0,msg:"Timeout",response:t&&t.data||!1};return t?(s.msg="httpError "+r,Promise.resolve(s)):Promise.resolve(s)};