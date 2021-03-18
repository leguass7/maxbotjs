import t from"axios";import e from"camelcase-keys";async function onResponseError(t){const e=t&&t.response,r=e&&parseInt(e.status,10),n={status:0,msg:"Timeout",response:e&&e.data||!1};return e?(n.msg=`httpError ${r}`,Promise.resolve(n)):Promise.resolve(n)}function prepareSendFilter(t){const{externalId:e,whatsapp:r,brCpf:n}=t,s={};if(e)s.ctExternalId=e;else if(r)s.ctWhatsapp=r;else{if(!n)return!1;s.ctBrCpf=n}return s}function normalizeContactSegmentation(t){return t&&Array.isArray(t)?t.filter((t=>!!t)).join(","):t}function isObject(t){return!("object"!=typeof t||null===t||t instanceof RegExp||t instanceof Error||t instanceof Date||Array.isArray(t))}function replaceAll(t,e,r){if(!t)return"";if(Array.isArray(e)){let n=`${t}`;for(let t=0;t<e.length;t++)n=replaceAll(n,e[t],r);return n}return t.split(`${e}`).join(r)}function extractExtension(t){return replaceAll((t=t.substr(1+t.lastIndexOf("/")).split("?")[0]).split("#")[0].substr(t.lastIndexOf(".")),".","")}function isValidURL(t){try{if(null!==t.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){const e=new URL(t);return!("http:"!==e.protocol&&"https:"!==e.protocol)}return!1}catch{return!1}}function decamelcaseStr(t,e="_"){return"string"==typeof t?t.replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu,`$1${e}$2`).replace(/(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu,`$1${e}$2`).toLowerCase():t}function mapObject(t){const e={};return Object.keys(t).forEach((r=>{const n=decamelcaseStr(r);e[n]=isObject(t[r])?mapObject(t[r]):t[r]})),e}function decamelcase(t){return Array.isArray(t)?t.map((t=>decamelcase(t))):isObject(t)?mapObject(t):decamelcaseStr(`${t}`)}const r="get_status",n="get_segmentation",s="get_template",i="get_service_sector",a="get_attendant",o="get_contact",c="get_prot",u="put_contact",l="set_contact",p="open_followup",d="send_text",h="send_image",g="send_file",f="send_sound";export default class Maxbot{constructor(e){return this.config={token:"",timeout:3e3,baseURL:"https://mbr.maxbot.com.br/api/v1.php",debug:!1},this.ready=!1,this.loggingPrefix="MaxbotJs",this.version="0.1.6",this.Api=t.create(),this.cancelSources=[],this.allowedExt={file:["pdf","doc","docx","xls","xlsx","ppt","pptx","pps"],image:["jpg","jpeg","png","gif"],sound:["mp3"]},this.setMe(e).configureAxios()}log(...t){this.config.debug&&console.log(this.loggingPrefix,...t,"\n")}getCancelToken(){return t.CancelToken}configureAxios(){return this.Api=t.create({baseURL:this.config.baseURL}),this.configureRequests().configureResponses()}configureRequests(){return this.Api.interceptors.request.use((t=>(t.headers["user-agent"]=`maxbotjs/${this.version} (+https://github.com/leguass7/maxbotjs.git)`,t.data=decamelcase(t.data),this.log("REQUEST:",t.data),t))),this}configureResponses(){return this.Api.interceptors.response.use((t=>(this.log("RESPONSE:",t.data||t),e(t.data,{deep:!0}))),onResponseError),this}addError(t){return{status:0,msg:t}}isValidExt(t,e=""){const r=replaceAll(t,".","");if(!e){return Object.keys(this.allowedExt).reduce(((t,e)=>(this.allowedExt[e].forEach((e=>t.push(e))),t)),[]).includes(replaceAll(r,".",""))}return!!this.allowedExt[e].includes(replaceAll(r,".",""))}async isReady(t=!1){if(!this.config.token)return!1;return!t&&this.ready||(this.ready=await(async()=>{try{const t=await this.getStatus();return!(!t||!t.status)}catch(t){return!1}})()),!!this.ready}setMe(t,e){const{config:r}=this;if("object"==typeof t){const e=Object.keys(t);for(let n=0;n<e.length;n++)e[n]in r&&(r[e[n]]=t[e[n]])}else"string"==typeof t&&t in r&&(r[t]="function"==typeof e?e():e);return this}getMe(){return this.config}async getStatus(){return await this.requestApi(r)}async getSegmentation(){return await this.requestApi(n)}async getTemplate(){return await this.requestApi(s)}async getServiceSector(){return await this.requestApi(i)}async getAttendant(){return await this.requestApi(a)}async getContact(t){return await this.requestApi(o,t)}async getProt(t){return await this.requestApi(c,t)}async putContact(t){t.segmentation&&(t.segmentation=normalizeContactSegmentation(t.segmentation));return await this.requestApi(u,t)}async setContact(t){t.segmentation&&(t.segmentation=normalizeContactSegmentation(t.segmentation));return await this.requestApi(l,t)}async openFollowup(t){return await this.requestApi(p,t)}async sendText(t,e){const r=prepareSendFilter(t);if(!r)return!1;const n={...r,msg:e};return await this.requestApi(d,n)}async sendImage(t,e){const r=prepareSendFilter(t);if(!r)return this.addError("internal: no contact");if(!isValidURL(e))return this.addError("internal: invalid url");const n=extractExtension(e);if(!this.isValidExt(n,"image"))return this.addError(`internal: invalid extension ${n}`);const s={...r,imageUrl:e,imageExtension:n};return await this.requestApi(h,s)}async sendFile(t,e){const r=prepareSendFilter(t);if(!r)return this.addError("internal: no contact");if(!isValidURL(e))return this.addError("internal: invalid url");const n=extractExtension(e);if(!this.isValidExt(n,"file"))return this.addError(`internal: invalid extension ${n}`);const s={...r,fileUrl:e,fileExtension:n};return await this.requestApi(g,s)}async sendSound(t,e){const r=prepareSendFilter(t);if(!r)return this.addError("internal: no contact");if(!isValidURL(e))return this.addError("internal: invalid url");const n=extractExtension(e);if(!this.isValidExt(n,"sound"))return this.addError(`internal: invalid extension ${n}`);const s={...r,soundUrl:e,soundExtension:n};return await this.requestApi(f,s)}async requestApi(t,e={}){const r=this.getCancelToken().source(),n=r.token;this.addCancelSource(r);const s=await this.Api.post(null,{cmd:t,token:this.config.token,...e},{timeout:this.config.timeout,cancelToken:n});return this.removeCancelSource(n),s}addCancelSource(t){return this.cancelSources.push({idToken:t.token,source:t}),this}removeCancelSource(t){if(t){const e=this.cancelSources.filter((({idToken:e})=>e!==t));return this.cancelSources=e||[],this}return this.cancelSources=[],this}cancel(){return this.cancelSources.forEach((({source:t})=>t&&t.cancel())),this.removeCancelSource(),this}}
//# sourceMappingURL=index.es.js.map
