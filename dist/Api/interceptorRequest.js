"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../decamelcase.js");exports.default=function interceptorRequest(t){return t.headers["user-agent"]="maxbotjs/0.1.0 (+https://github.com/leguass7/maxbotjs.git)",t.data=e.default(t.data),console.log("config.data",t.data),t};
