const jf=()=>{};var Qu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Al=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},qf=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const s=r[e++];if(s<128)t[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[e++];t[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[e++],a=r[e++],u=r[e++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;t[n++]=String.fromCharCode(55296+(l>>10)),t[n++]=String.fromCharCode(56320+(l&1023))}else{const i=r[e++],a=r[e++];t[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")},bl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],a=s+1<r.length,u=a?r[s+1]:0,l=s+2<r.length,d=l?r[s+2]:0,m=i>>2,g=(i&3)<<4|u>>4;let E=(u&15)<<2|d>>6,S=d&63;l||(S=64,a||(E=64)),n.push(e[m],e[g],e[E],e[S])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(Al(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):qf(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=e[r.charAt(s++)],u=s<r.length?e[r.charAt(s)]:0;++s;const d=s<r.length?e[r.charAt(s)]:64;++s;const g=s<r.length?e[r.charAt(s)]:64;if(++s,i==null||u==null||d==null||g==null)throw new zf;const E=i<<2|u>>4;if(n.push(E),d!==64){const S=u<<4&240|d>>2;if(n.push(S),g!==64){const C=d<<6&192|g;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class zf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $f=function(r){const t=Al(r);return bl.encodeByteArray(t,!0)},Rl=function(r){return $f(r).replace(/\./g,"")},Kf=function(r){try{return bl.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf=()=>Sl().__FIREBASE_DEFAULTS__,Qf=()=>{if(typeof process>"u"||typeof Qu>"u")return;const r=Qu.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Hf=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=r&&Kf(r[1]);return t&&JSON.parse(t)},ai=()=>{try{return jf()||Gf()||Qf()||Hf()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Xy=r=>{var t,e;return(e=(t=ai())==null?void 0:t.emulatorHosts)==null?void 0:e[r]},Pl=()=>{var r;return(r=ai())==null?void 0:r.config},Yy=r=>{var t;return(t=ai())==null?void 0:t[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function En(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zy(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(En())}function Vl(){var t;const r=(t=ai())==null?void 0:t.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function tI(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function eI(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function nI(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function rI(){const r=En();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Cl(){return!Vl()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Dl(){return!Vl()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function xl(){try{return typeof indexedDB=="object"}catch{return!1}}function Jf(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xf="FirebaseError";class Un extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=Xf,Object.setPrototypeOf(this,Un.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Nl.prototype.create)}}class Nl{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],a=i?Yf(i,n):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new Un(s,u,n)}}function Yf(r,t){return r.replace(Zf,(e,n)=>{const s=t[n];return s!=null?String(s):`<${n}?>`})}const Zf=/\{\$([^}]+)}/g;function sI(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}function Fs(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const s of e){if(!n.includes(s))return!1;const i=r[s],a=t[s];if(Hu(i)&&Hu(a)){if(!Fs(i,a))return!1}else if(i!==a)return!1}for(const s of n)if(!e.includes(s))return!1;return!0}function Hu(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iI(r){const t=[];for(const[e,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(n));return t.length?"&"+t.join("&"):""}function oI(r){const t={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,i]=n.split("=");t[decodeURIComponent(s)]=decodeURIComponent(i)}}),t}function aI(r){const t=r.indexOf("?");if(!t)return"";const e=r.indexOf("#",t);return r.substring(t,e>0?e:void 0)}function uI(r,t){const e=new tm(r,t);return e.subscribe.bind(e)}class tm{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(n=>{this.error(n)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,n){let s;if(t===void 0&&e===void 0&&n===void 0)throw new Error("Missing Observer.");em(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:n},s.next===void 0&&(s.next=eo),s.error===void 0&&(s.error=eo),s.complete===void 0&&(s.complete=eo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function em(r,t){if(typeof r!="object"||r===null)return!1;for(const e of t)if(e in r&&typeof r[e]=="function")return!0;return!1}function eo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kl(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function nm(r){return(await fetch(r,{credentials:"include"})).ok}class Cr{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new Wf;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),n=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(im(t))try{this.getOrInitializeService({instanceIdentifier:Fe})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(t=Fe){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Fe){return this.instances.has(t)}getOptions(t=Fe){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[i,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);n===u&&a.resolve(s)}return s}onInit(t,e){const n=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(n)??new Set;s.add(t),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&t(i,n),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:sm(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=Fe){return this.component?this.component.multipleInstances?t:Fe:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function sm(r){return r===Fe?void 0:r}function im(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new rm(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(H||(H={}));const am={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},um=H.INFO,cm={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},lm=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),s=cm[t];if(s)console[s](`[${n}]  ${r.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Ol{constructor(t){this.name=t,this._logLevel=um,this._logHandler=lm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in H))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?am[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...t),this._logHandler(this,H.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...t),this._logHandler(this,H.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,H.INFO,...t),this._logHandler(this,H.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,H.WARN,...t),this._logHandler(this,H.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...t),this._logHandler(this,H.ERROR,...t)}}const hm=(r,t)=>t.some(e=>r instanceof e);let Wu,Ju;function dm(){return Wu||(Wu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function fm(){return Ju||(Ju=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ml=new WeakMap,_o=new WeakMap,Fl=new WeakMap,no=new WeakMap,Ho=new WeakMap;function mm(r){const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",a)},i=()=>{e(_e(r.result)),s()},a=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&Ml.set(e,r)}).catch(()=>{}),Ho.set(t,r),t}function gm(r){if(_o.has(r))return;const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",a),r.removeEventListener("abort",a)},i=()=>{e(),s()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",a),r.addEventListener("abort",a)});_o.set(r,t)}let yo={get(r,t,e){if(r instanceof IDBTransaction){if(t==="done")return _o.get(r);if(t==="objectStoreNames")return r.objectStoreNames||Fl.get(r);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return _e(r[t])},set(r,t,e){return r[t]=e,!0},has(r,t){return r instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in r}};function pm(r){yo=r(yo)}function _m(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const n=r.call(ro(this),t,...e);return Fl.set(n,t.sort?t.sort():[t]),_e(n)}:fm().includes(r)?function(...t){return r.apply(ro(this),t),_e(Ml.get(this))}:function(...t){return _e(r.apply(ro(this),t))}}function ym(r){return typeof r=="function"?_m(r):(r instanceof IDBTransaction&&gm(r),hm(r,dm())?new Proxy(r,yo):r)}function _e(r){if(r instanceof IDBRequest)return mm(r);if(no.has(r))return no.get(r);const t=ym(r);return t!==r&&(no.set(r,t),Ho.set(t,r)),t}const ro=r=>Ho.get(r);function Im(r,t,{blocked:e,upgrade:n,blocking:s,terminated:i}={}){const a=indexedDB.open(r,t),u=_e(a);return n&&a.addEventListener("upgradeneeded",l=>{n(_e(a.result),l.oldVersion,l.newVersion,_e(a.transaction),l)}),e&&a.addEventListener("blocked",l=>e(l.oldVersion,l.newVersion,l)),u.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const Em=["get","getKey","getAll","getAllKeys","count"],Tm=["put","add","delete","clear"],so=new Map;function Xu(r,t){if(!(r instanceof IDBDatabase&&!(t in r)&&typeof t=="string"))return;if(so.get(t))return so.get(t);const e=t.replace(/FromIndex$/,""),n=t!==e,s=Tm.includes(e);if(!(e in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Em.includes(e)))return;const i=async function(a,...u){const l=this.transaction(a,s?"readwrite":"readonly");let d=l.store;return n&&(d=d.index(u.shift())),(await Promise.all([d[e](...u),s&&l.done]))[0]};return so.set(t,i),i}pm(r=>({...r,get:(t,e,n)=>Xu(t,e)||r.get(t,e,n),has:(t,e)=>!!Xu(t,e)||r.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(vm(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function vm(r){const t=r.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Io="@firebase/app",Yu="0.14.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt=new Ol("@firebase/app"),Am="@firebase/app-compat",bm="@firebase/analytics-compat",Rm="@firebase/analytics",Sm="@firebase/app-check-compat",Pm="@firebase/app-check",Vm="@firebase/auth",Cm="@firebase/auth-compat",Dm="@firebase/database",xm="@firebase/data-connect",Nm="@firebase/database-compat",km="@firebase/functions",Om="@firebase/functions-compat",Mm="@firebase/installations",Fm="@firebase/installations-compat",Lm="@firebase/messaging",Bm="@firebase/messaging-compat",Um="@firebase/performance",jm="@firebase/performance-compat",qm="@firebase/remote-config",zm="@firebase/remote-config-compat",$m="@firebase/storage",Km="@firebase/storage-compat",Gm="@firebase/firestore",Qm="@firebase/ai",Hm="@firebase/firestore-compat",Wm="firebase",Jm="12.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo="[DEFAULT]",Xm={[Io]:"fire-core",[Am]:"fire-core-compat",[Rm]:"fire-analytics",[bm]:"fire-analytics-compat",[Pm]:"fire-app-check",[Sm]:"fire-app-check-compat",[Vm]:"fire-auth",[Cm]:"fire-auth-compat",[Dm]:"fire-rtdb",[xm]:"fire-data-connect",[Nm]:"fire-rtdb-compat",[km]:"fire-fn",[Om]:"fire-fn-compat",[Mm]:"fire-iid",[Fm]:"fire-iid-compat",[Lm]:"fire-fcm",[Bm]:"fire-fcm-compat",[Um]:"fire-perf",[jm]:"fire-perf-compat",[qm]:"fire-rc",[zm]:"fire-rc-compat",[$m]:"fire-gcs",[Km]:"fire-gcs-compat",[Gm]:"fire-fst",[Hm]:"fire-fst-compat",[Qm]:"fire-vertex","fire-js":"fire-js",[Wm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls=new Map,Ym=new Map,To=new Map;function Zu(r,t){try{r.container.addComponent(t)}catch(e){Zt.debug(`Component ${t.name} failed to register with FirebaseApp ${r.name}`,e)}}function Bs(r){const t=r.name;if(To.has(t))return Zt.debug(`There were multiple attempts to register component ${t}.`),!1;To.set(t,r);for(const e of Ls.values())Zu(e,r);for(const e of Ym.values())Zu(e,r);return!0}function Zm(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}function tg(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ye=new Nl("app","Firebase",eg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(t,e,n){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Cr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ye.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rg=Jm;function sg(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n={name:Eo,automaticDataCollectionEnabled:!0,...t},s=n.name;if(typeof s!="string"||!s)throw ye.create("bad-app-name",{appName:String(s)});if(e||(e=Pl()),!e)throw ye.create("no-options");const i=Ls.get(s);if(i){if(Fs(e,i.options)&&Fs(n,i.config))return i;throw ye.create("duplicate-app",{appName:s})}const a=new om(s);for(const l of To.values())a.addComponent(l);const u=new ng(e,n,a);return Ls.set(s,u),u}function cI(r=Eo){const t=Ls.get(r);if(!t&&r===Eo&&Pl())return sg();if(!t)throw ye.create("no-app",{appName:r});return t}function _n(r,t,e){let n=Xm[r]??r;e&&(n+=`-${e}`);const s=n.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const a=[`Unable to register library "${n}" with version "${t}":`];s&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Zt.warn(a.join(" "));return}Bs(new Cr(`${n}-version`,()=>({library:n,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ig="firebase-heartbeat-database",og=1,Dr="firebase-heartbeat-store";let io=null;function Ll(){return io||(io=Im(ig,og,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(Dr)}catch(e){console.warn(e)}}}}).catch(r=>{throw ye.create("idb-open",{originalErrorMessage:r.message})})),io}async function ag(r){try{const e=(await Ll()).transaction(Dr),n=await e.objectStore(Dr).get(Bl(r));return await e.done,n}catch(t){if(t instanceof Un)Zt.warn(t.message);else{const e=ye.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Zt.warn(e.message)}}}async function tc(r,t){try{const n=(await Ll()).transaction(Dr,"readwrite");await n.objectStore(Dr).put(t,Bl(r)),await n.done}catch(e){if(e instanceof Un)Zt.warn(e.message);else{const n=ye.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Zt.warn(n.message)}}}function Bl(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug=1024,cg=30;class lg{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new dg(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ec();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>cg){const a=fg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){Zt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ec(),{heartbeatsToSend:n,unsentEntries:s}=hg(this._heartbeatsCache.heartbeats),i=Rl(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Zt.warn(e),""}}}function ec(){return new Date().toISOString().substring(0,10)}function hg(r,t=ug){const e=[];let n=r.slice();for(const s of r){const i=e.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),nc(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),nc(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class dg{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return xl()?Jf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await ag(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const n=await this.read();return tc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const n=await this.read();return tc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}else return}}function nc(r){return Rl(JSON.stringify({version:2,heartbeats:r})).length}function fg(r){if(r.length===0)return-1;let t=0,e=r[0].date;for(let n=1;n<r.length;n++)r[n].date<e&&(e=r[n].date,t=n);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mg(r){Bs(new Cr("platform-logger",t=>new wm(t),"PRIVATE")),Bs(new Cr("heartbeat",t=>new lg(t),"PRIVATE")),_n(Io,Yu,r),_n(Io,Yu,"esm2020"),_n("fire-js","")}mg("");var rc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ie,Ul;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(I,p){function y(){}y.prototype=p.prototype,I.F=p.prototype,I.prototype=new y,I.prototype.constructor=I,I.D=function(w,T,b){for(var _=Array(arguments.length-2),Vt=2;Vt<arguments.length;Vt++)_[Vt-2]=arguments[Vt];return p.prototype[T].apply(w,_)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(n,e),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,p,y){y||(y=0);const w=Array(16);if(typeof p=="string")for(var T=0;T<16;++T)w[T]=p.charCodeAt(y++)|p.charCodeAt(y++)<<8|p.charCodeAt(y++)<<16|p.charCodeAt(y++)<<24;else for(T=0;T<16;++T)w[T]=p[y++]|p[y++]<<8|p[y++]<<16|p[y++]<<24;p=I.g[0],y=I.g[1],T=I.g[2];let b=I.g[3],_;_=p+(b^y&(T^b))+w[0]+3614090360&4294967295,p=y+(_<<7&4294967295|_>>>25),_=b+(T^p&(y^T))+w[1]+3905402710&4294967295,b=p+(_<<12&4294967295|_>>>20),_=T+(y^b&(p^y))+w[2]+606105819&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(p^T&(b^p))+w[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(b^y&(T^b))+w[4]+4118548399&4294967295,p=y+(_<<7&4294967295|_>>>25),_=b+(T^p&(y^T))+w[5]+1200080426&4294967295,b=p+(_<<12&4294967295|_>>>20),_=T+(y^b&(p^y))+w[6]+2821735955&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(p^T&(b^p))+w[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(b^y&(T^b))+w[8]+1770035416&4294967295,p=y+(_<<7&4294967295|_>>>25),_=b+(T^p&(y^T))+w[9]+2336552879&4294967295,b=p+(_<<12&4294967295|_>>>20),_=T+(y^b&(p^y))+w[10]+4294925233&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(p^T&(b^p))+w[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(b^y&(T^b))+w[12]+1804603682&4294967295,p=y+(_<<7&4294967295|_>>>25),_=b+(T^p&(y^T))+w[13]+4254626195&4294967295,b=p+(_<<12&4294967295|_>>>20),_=T+(y^b&(p^y))+w[14]+2792965006&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(p^T&(b^p))+w[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(T^b&(y^T))+w[1]+4129170786&4294967295,p=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(p^y))+w[6]+3225465664&4294967295,b=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(b^p))+w[11]+643717713&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^p&(T^b))+w[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^b&(y^T))+w[5]+3593408605&4294967295,p=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(p^y))+w[10]+38016083&4294967295,b=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(b^p))+w[15]+3634488961&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^p&(T^b))+w[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^b&(y^T))+w[9]+568446438&4294967295,p=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(p^y))+w[14]+3275163606&4294967295,b=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(b^p))+w[3]+4107603335&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^p&(T^b))+w[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^b&(y^T))+w[13]+2850285829&4294967295,p=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(p^y))+w[2]+4243563512&4294967295,b=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(b^p))+w[7]+1735328473&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^p&(T^b))+w[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(y^T^b)+w[5]+4294588738&4294967295,p=y+(_<<4&4294967295|_>>>28),_=b+(p^y^T)+w[8]+2272392833&4294967295,b=p+(_<<11&4294967295|_>>>21),_=T+(b^p^y)+w[11]+1839030562&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^p)+w[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^b)+w[1]+2763975236&4294967295,p=y+(_<<4&4294967295|_>>>28),_=b+(p^y^T)+w[4]+1272893353&4294967295,b=p+(_<<11&4294967295|_>>>21),_=T+(b^p^y)+w[7]+4139469664&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^p)+w[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^b)+w[13]+681279174&4294967295,p=y+(_<<4&4294967295|_>>>28),_=b+(p^y^T)+w[0]+3936430074&4294967295,b=p+(_<<11&4294967295|_>>>21),_=T+(b^p^y)+w[3]+3572445317&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^p)+w[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^b)+w[9]+3654602809&4294967295,p=y+(_<<4&4294967295|_>>>28),_=b+(p^y^T)+w[12]+3873151461&4294967295,b=p+(_<<11&4294967295|_>>>21),_=T+(b^p^y)+w[15]+530742520&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^p)+w[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(T^(y|~b))+w[0]+4096336452&4294967295,p=y+(_<<6&4294967295|_>>>26),_=b+(y^(p|~T))+w[7]+1126891415&4294967295,b=p+(_<<10&4294967295|_>>>22),_=T+(p^(b|~y))+w[14]+2878612391&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~p))+w[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~b))+w[12]+1700485571&4294967295,p=y+(_<<6&4294967295|_>>>26),_=b+(y^(p|~T))+w[3]+2399980690&4294967295,b=p+(_<<10&4294967295|_>>>22),_=T+(p^(b|~y))+w[10]+4293915773&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~p))+w[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~b))+w[8]+1873313359&4294967295,p=y+(_<<6&4294967295|_>>>26),_=b+(y^(p|~T))+w[15]+4264355552&4294967295,b=p+(_<<10&4294967295|_>>>22),_=T+(p^(b|~y))+w[6]+2734768916&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~p))+w[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~b))+w[4]+4149444226&4294967295,p=y+(_<<6&4294967295|_>>>26),_=b+(y^(p|~T))+w[11]+3174756917&4294967295,b=p+(_<<10&4294967295|_>>>22),_=T+(p^(b|~y))+w[2]+718787259&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~p))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+p&4294967295,I.g[1]=I.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+T&4294967295,I.g[3]=I.g[3]+b&4294967295}n.prototype.v=function(I,p){p===void 0&&(p=I.length);const y=p-this.blockSize,w=this.C;let T=this.h,b=0;for(;b<p;){if(T==0)for(;b<=y;)s(this,I,b),b+=this.blockSize;if(typeof I=="string"){for(;b<p;)if(w[T++]=I.charCodeAt(b++),T==this.blockSize){s(this,w),T=0;break}}else for(;b<p;)if(w[T++]=I[b++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=p},n.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var p=1;p<I.length-8;++p)I[p]=0;p=this.o*8;for(var y=I.length-8;y<I.length;++y)I[y]=p&255,p/=256;for(this.v(I),I=Array(16),p=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)I[p++]=this.g[y]>>>w&255;return I};function i(I,p){var y=u;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=p(I)}function a(I,p){this.h=p;const y=[];let w=!0;for(let T=I.length-1;T>=0;T--){const b=I[T]|0;w&&b==p||(y[T]=b,w=!1)}this.g=y}var u={};function l(I){return-128<=I&&I<128?i(I,function(p){return new a([p|0],p<0?-1:0)}):new a([I|0],I<0?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return g;if(I<0)return x(d(-I));const p=[];let y=1;for(let w=0;I>=y;w++)p[w]=I/y|0,y*=4294967296;return new a(p,0)}function m(I,p){if(I.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(I.charAt(0)=="-")return x(m(I.substring(1),p));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=d(Math.pow(p,8));let w=g;for(let b=0;b<I.length;b+=8){var T=Math.min(8,I.length-b);const _=parseInt(I.substring(b,b+T),p);T<8?(T=d(Math.pow(p,T)),w=w.j(T).add(d(_))):(w=w.j(y),w=w.add(d(_)))}return w}var g=l(0),E=l(1),S=l(16777216);r=a.prototype,r.m=function(){if(O(this))return-x(this).m();let I=0,p=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);I+=(w>=0?w:4294967296+w)*p,p*=4294967296}return I},r.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(C(this))return"0";if(O(this))return"-"+x(this).toString(I);const p=d(Math.pow(I,6));var y=this;let w="";for(;;){const T=rt(y,p).g;y=G(y,T.j(p));let b=((y.g.length>0?y.g[0]:y.h)>>>0).toString(I);if(y=T,C(y))return b+w;for(;b.length<6;)b="0"+b;w=b+w}},r.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function C(I){if(I.h!=0)return!1;for(let p=0;p<I.g.length;p++)if(I.g[p]!=0)return!1;return!0}function O(I){return I.h==-1}r.l=function(I){return I=G(this,I),O(I)?-1:C(I)?0:1};function x(I){const p=I.g.length,y=[];for(let w=0;w<p;w++)y[w]=~I.g[w];return new a(y,~I.h).add(E)}r.abs=function(){return O(this)?x(this):this},r.add=function(I){const p=Math.max(this.g.length,I.g.length),y=[];let w=0;for(let T=0;T<=p;T++){let b=w+(this.i(T)&65535)+(I.i(T)&65535),_=(b>>>16)+(this.i(T)>>>16)+(I.i(T)>>>16);w=_>>>16,b&=65535,_&=65535,y[T]=_<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function G(I,p){return I.add(x(p))}r.j=function(I){if(C(this)||C(I))return g;if(O(this))return O(I)?x(this).j(x(I)):x(x(this).j(I));if(O(I))return x(this.j(x(I)));if(this.l(S)<0&&I.l(S)<0)return d(this.m()*I.m());const p=this.g.length+I.g.length,y=[];for(var w=0;w<2*p;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<I.g.length;T++){const b=this.i(w)>>>16,_=this.i(w)&65535,Vt=I.i(T)>>>16,Ce=I.i(T)&65535;y[2*w+2*T]+=_*Ce,q(y,2*w+2*T),y[2*w+2*T+1]+=b*Ce,q(y,2*w+2*T+1),y[2*w+2*T+1]+=_*Vt,q(y,2*w+2*T+1),y[2*w+2*T+2]+=b*Vt,q(y,2*w+2*T+2)}for(I=0;I<p;I++)y[I]=y[2*I+1]<<16|y[2*I];for(I=p;I<2*p;I++)y[I]=0;return new a(y,0)};function q(I,p){for(;(I[p]&65535)!=I[p];)I[p+1]+=I[p]>>>16,I[p]&=65535,p++}function j(I,p){this.g=I,this.h=p}function rt(I,p){if(C(p))throw Error("division by zero");if(C(I))return new j(g,g);if(O(I))return p=rt(x(I),p),new j(x(p.g),x(p.h));if(O(p))return p=rt(I,x(p)),new j(x(p.g),p.h);if(I.g.length>30){if(O(I)||O(p))throw Error("slowDivide_ only works with positive integers.");for(var y=E,w=p;w.l(I)<=0;)y=W(y),w=W(w);var T=J(y,1),b=J(w,1);for(w=J(w,2),y=J(y,2);!C(w);){var _=b.add(w);_.l(I)<=0&&(T=T.add(y),b=_),w=J(w,1),y=J(y,1)}return p=G(I,T.j(p)),new j(T,p)}for(T=g;I.l(p)>=0;){for(y=Math.max(1,Math.floor(I.m()/p.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),b=d(y),_=b.j(p);O(_)||_.l(I)>0;)y-=w,b=d(y),_=b.j(p);C(b)&&(b=E),T=T.add(b),I=G(I,_)}return new j(T,I)}r.B=function(I){return rt(this,I).h},r.and=function(I){const p=Math.max(this.g.length,I.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)&I.i(w);return new a(y,this.h&I.h)},r.or=function(I){const p=Math.max(this.g.length,I.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)|I.i(w);return new a(y,this.h|I.h)},r.xor=function(I){const p=Math.max(this.g.length,I.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)^I.i(w);return new a(y,this.h^I.h)};function W(I){const p=I.g.length+1,y=[];for(let w=0;w<p;w++)y[w]=I.i(w)<<1|I.i(w-1)>>>31;return new a(y,I.h)}function J(I,p){const y=p>>5;p%=32;const w=I.g.length-y,T=[];for(let b=0;b<w;b++)T[b]=p>0?I.i(b+y)>>>p|I.i(b+y+1)<<32-p:I.i(b+y);return new a(T,I.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Ul=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,Ie=a}).apply(typeof rc<"u"?rc:typeof self<"u"?self:typeof window<"u"?window:{});var ys=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var jl,pr,ql,bs,wo,zl,$l,Kl;(function(){var r,t=Object.defineProperty;function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ys=="object"&&ys];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var n=e(this);function s(o,c){if(c)t:{var h=n;o=o.split(".");for(var f=0;f<o.length-1;f++){var A=o[f];if(!(A in h))break t;h=h[A]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&t(h,o,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(c){var h=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&h.push([f,c[f]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function u(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function l(o,c,h){return o.call.apply(o.bind,arguments)}function d(o,c,h){return d=l,d.apply(null,arguments)}function m(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function g(o,c){function h(){}h.prototype=c.prototype,o.Z=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(f,A,R){for(var D=Array(arguments.length-2),z=2;z<arguments.length;z++)D[z-2]=arguments[z];return c.prototype[A].apply(f,D)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function S(o){const c=o.length;if(c>0){const h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function C(o,c){for(let f=1;f<arguments.length;f++){const A=arguments[f];var h=typeof A;if(h=h!="object"?h:A?Array.isArray(A)?"array":h:"null",h=="array"||h=="object"&&typeof A.length=="number"){h=o.length||0;const R=A.length||0;o.length=h+R;for(let D=0;D<R;D++)o[h+D]=A[D]}else o.push(A)}}class O{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function x(o){a.setTimeout(()=>{throw o},0)}function G(){var o=I;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class q{constructor(){this.h=this.g=null}add(c,h){const f=j.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var j=new O(()=>new rt,o=>o.reset());class rt{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let W,J=!1,I=new q,p=()=>{const o=Promise.resolve(void 0);W=()=>{o.then(y)}};function y(){for(var o;o=G();){try{o.h.call(o.g)}catch(h){x(h)}var c=j;c.j(o),c.h<100&&(c.h++,o.next=c.g,c.g=o)}J=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var b=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,c),a.removeEventListener("test",h,c)}catch{}return o})();function _(o){return/^[\s\xa0]*$/.test(o)}function Vt(o,c){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,c)}g(Vt,T),Vt.prototype.init=function(o,c){const h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget,c||(h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Vt.Z.h.call(this)},Vt.prototype.h=function(){Vt.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ce="closure_listenable_"+(Math.random()*1e6|0),cf=0;function lf(o,c,h,f,A){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=A,this.key=++cf,this.da=this.fa=!1}function rs(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ss(o,c,h){for(const f in o)c.call(h,o[f],f,o)}function hf(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function Ga(o){const c={};for(const h in o)c[h]=o[h];return c}const Qa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ha(o,c){let h,f;for(let A=1;A<arguments.length;A++){f=arguments[A];for(h in f)o[h]=f[h];for(let R=0;R<Qa.length;R++)h=Qa[R],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function is(o){this.src=o,this.g={},this.h=0}is.prototype.add=function(o,c,h,f,A){const R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);const D=xi(o,c,f,A);return D>-1?(c=o[D],h||(c.fa=!1)):(c=new lf(c,this.src,R,!!f,A),c.fa=h,o.push(c)),c};function Di(o,c){const h=c.type;if(h in o.g){var f=o.g[h],A=Array.prototype.indexOf.call(f,c,void 0),R;(R=A>=0)&&Array.prototype.splice.call(f,A,1),R&&(rs(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function xi(o,c,h,f){for(let A=0;A<o.length;++A){const R=o[A];if(!R.da&&R.listener==c&&R.capture==!!h&&R.ha==f)return A}return-1}var Ni="closure_lm_"+(Math.random()*1e6|0),ki={};function Wa(o,c,h,f,A){if(Array.isArray(c)){for(let R=0;R<c.length;R++)Wa(o,c[R],h,f,A);return null}return h=Ya(h),o&&o[Ce]?o.J(c,h,u(f)?!!f.capture:!1,A):df(o,c,h,!1,f,A)}function df(o,c,h,f,A,R){if(!c)throw Error("Invalid event type");const D=u(A)?!!A.capture:!!A;let z=Mi(o);if(z||(o[Ni]=z=new is(o)),h=z.add(c,h,f,D,R),h.proxy)return h;if(f=ff(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)b||(A=D),A===void 0&&(A=!1),o.addEventListener(c.toString(),f,A);else if(o.attachEvent)o.attachEvent(Xa(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function ff(){function o(h){return c.call(o.src,o.listener,h)}const c=mf;return o}function Ja(o,c,h,f,A){if(Array.isArray(c))for(var R=0;R<c.length;R++)Ja(o,c[R],h,f,A);else f=u(f)?!!f.capture:!!f,h=Ya(h),o&&o[Ce]?(o=o.i,R=String(c).toString(),R in o.g&&(c=o.g[R],h=xi(c,h,f,A),h>-1&&(rs(c[h]),Array.prototype.splice.call(c,h,1),c.length==0&&(delete o.g[R],o.h--)))):o&&(o=Mi(o))&&(c=o.g[c.toString()],o=-1,c&&(o=xi(c,h,f,A)),(h=o>-1?c[o]:null)&&Oi(h))}function Oi(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Ce])Di(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(Xa(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=Mi(c))?(Di(h,o),h.h==0&&(h.src=null,c[Ni]=null)):rs(o)}}}function Xa(o){return o in ki?ki[o]:ki[o]="on"+o}function mf(o,c){if(o.da)o=!0;else{c=new Vt(c,this);const h=o.listener,f=o.ha||o.src;o.fa&&Oi(o),o=h.call(f,c)}return o}function Mi(o){return o=o[Ni],o instanceof is?o:null}var Fi="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ya(o){return typeof o=="function"?o:(o[Fi]||(o[Fi]=function(c){return o.handleEvent(c)}),o[Fi])}function Et(){w.call(this),this.i=new is(this),this.M=this,this.G=null}g(Et,w),Et.prototype[Ce]=!0,Et.prototype.removeEventListener=function(o,c,h,f){Ja(this,o,c,h,f)};function Rt(o,c){var h,f=o.G;if(f)for(h=[];f;f=f.G)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new T(c,o);else if(c instanceof T)c.target=c.target||o;else{var A=c;c=new T(f,o),Ha(c,A)}A=!0;let R,D;if(h)for(D=h.length-1;D>=0;D--)R=c.g=h[D],A=os(R,f,!0,c)&&A;if(R=c.g=o,A=os(R,f,!0,c)&&A,A=os(R,f,!1,c)&&A,h)for(D=0;D<h.length;D++)R=c.g=h[D],A=os(R,f,!1,c)&&A}Et.prototype.N=function(){if(Et.Z.N.call(this),this.i){var o=this.i;for(const c in o.g){const h=o.g[c];for(let f=0;f<h.length;f++)rs(h[f]);delete o.g[c],o.h--}}this.G=null},Et.prototype.J=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},Et.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function os(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();let A=!0;for(let R=0;R<c.length;++R){const D=c[R];if(D&&!D.da&&D.capture==h){const z=D.listener,mt=D.ha||D.src;D.fa&&Di(o.i,D),A=z.call(mt,f)!==!1&&A}}return A&&!f.defaultPrevented}function gf(o,c){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(o,c||0)}function Za(o){o.g=gf(()=>{o.g=null,o.i&&(o.i=!1,Za(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class pf extends w{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Za(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Qn(o){w.call(this),this.h=o,this.g={}}g(Qn,w);var tu=[];function eu(o){ss(o.g,function(c,h){this.g.hasOwnProperty(h)&&Oi(c)},o),o.g={}}Qn.prototype.N=function(){Qn.Z.N.call(this),eu(this)},Qn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Li=a.JSON.stringify,_f=a.JSON.parse,yf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function nu(){}function ru(){}var Hn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Bi(){T.call(this,"d")}g(Bi,T);function Ui(){T.call(this,"c")}g(Ui,T);var De={},su=null;function as(){return su=su||new Et}De.Ia="serverreachability";function iu(o){T.call(this,De.Ia,o)}g(iu,T);function Wn(o){const c=as();Rt(c,new iu(c))}De.STAT_EVENT="statevent";function ou(o,c){T.call(this,De.STAT_EVENT,o),this.stat=c}g(ou,T);function St(o){const c=as();Rt(c,new ou(c,o))}De.Ja="timingevent";function au(o,c){T.call(this,De.Ja,o),this.size=c}g(au,T);function Jn(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},c)}function Xn(){this.g=!0}Xn.prototype.ua=function(){this.g=!1};function If(o,c,h,f,A,R){o.info(function(){if(o.g)if(R){var D="",z=R.split("&");for(let et=0;et<z.length;et++){var mt=z[et].split("=");if(mt.length>1){const pt=mt[0];mt=mt[1];const zt=pt.split("_");D=zt.length>=2&&zt[1]=="type"?D+(pt+"="+mt+"&"):D+(pt+"=redacted&")}}}else D=null;else D=R;return"XMLHTTP REQ ("+f+") [attempt "+A+"]: "+c+`
`+h+`
`+D})}function Ef(o,c,h,f,A,R,D){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+A+"]: "+c+`
`+h+`
`+R+" "+D})}function nn(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+wf(o,h)+(f?" "+f:"")})}function Tf(o,c){o.info(function(){return"TIMEOUT: "+c})}Xn.prototype.info=function(){};function wf(o,c){if(!o.g)return c;if(!c)return null;try{const R=JSON.parse(c);if(R){for(o=0;o<R.length;o++)if(Array.isArray(R[o])){var h=R[o];if(!(h.length<2)){var f=h[1];if(Array.isArray(f)&&!(f.length<1)){var A=f[0];if(A!="noop"&&A!="stop"&&A!="close")for(let D=1;D<f.length;D++)f[D]=""}}}}return Li(R)}catch{return c}}var us={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},uu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},cu;function ji(){}g(ji,nu),ji.prototype.g=function(){return new XMLHttpRequest},cu=new ji;function Yn(o){return encodeURIComponent(String(o))}function vf(o){var c=1;o=o.split(":");const h=[];for(;c>0&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function oe(o,c,h,f){this.j=o,this.i=c,this.l=h,this.S=f||1,this.V=new Qn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new lu}function lu(){this.i=null,this.g="",this.h=!1}var hu={},qi={};function zi(o,c,h){o.M=1,o.A=ls(qt(c)),o.u=h,o.R=!0,du(o,null)}function du(o,c){o.F=Date.now(),cs(o),o.B=qt(o.A);var h=o.B,f=o.S;Array.isArray(f)||(f=[String(f)]),bu(h.i,"t",f),o.C=0,h=o.j.L,o.h=new lu,o.g=zu(o.j,h?c:null,!o.u),o.P>0&&(o.O=new pf(d(o.Y,o,o.g),o.P)),c=o.V,h=o.g,f=o.ba;var A="readystatechange";Array.isArray(A)||(A&&(tu[0]=A.toString()),A=tu);for(let R=0;R<A.length;R++){const D=Wa(h,A[R],f||c.handleEvent,!1,c.h||c);if(!D)break;c.g[D.key]=D}c=o.J?Ga(o.J):{},o.u?(o.v||(o.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,c)):(o.v="GET",o.g.ea(o.B,o.v,null,c)),Wn(),If(o.i,o.v,o.B,o.l,o.S,o.u)}oe.prototype.ba=function(o){o=o.target;const c=this.O;c&&ce(o)==3?c.j():this.Y(o)},oe.prototype.Y=function(o){try{if(o==this.g)t:{const z=ce(this.g),mt=this.g.ya(),et=this.g.ca();if(!(z<3)&&(z!=3||this.g&&(this.h.h||this.g.la()||xu(this.g)))){this.K||z!=4||mt==7||(mt==8||et<=0?Wn(3):Wn(2)),$i(this);var c=this.g.ca();this.X=c;var h=Af(this);if(this.o=c==200,Ef(this.i,this.v,this.B,this.l,this.S,z,c),this.o){if(this.U&&!this.L){e:{if(this.g){var f,A=this.g;if((f=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(f)){var R=f;break e}}R=null}if(o=R)nn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ki(this,o);else{this.o=!1,this.m=3,St(12),xe(this),Zn(this);break t}}if(this.R){o=!0;let pt;for(;!this.K&&this.C<h.length;)if(pt=bf(this,h),pt==qi){z==4&&(this.m=4,St(14),o=!1),nn(this.i,this.l,null,"[Incomplete Response]");break}else if(pt==hu){this.m=4,St(15),nn(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else nn(this.i,this.l,pt,null),Ki(this,pt);if(fu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),z!=4||h.length!=0||this.h.h||(this.m=1,St(16),o=!1),this.o=this.o&&o,!o)nn(this.i,this.l,h,"[Invalid Chunked Response]"),xe(this),Zn(this);else if(h.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Zi(D),D.P=!0,St(11))}}else nn(this.i,this.l,h,null),Ki(this,h);z==4&&xe(this),this.o&&!this.K&&(z==4?Bu(this.j,this):(this.o=!1,cs(this)))}else Bf(this.g),c==400&&h.indexOf("Unknown SID")>0?(this.m=3,St(12)):(this.m=0,St(13)),xe(this),Zn(this)}}}catch{}finally{}};function Af(o){if(!fu(o))return o.g.la();const c=xu(o.g);if(c==="")return"";let h="";const f=c.length,A=ce(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return xe(o),Zn(o),"";o.h.i=new a.TextDecoder}for(let R=0;R<f;R++)o.h.h=!0,h+=o.h.i.decode(c[R],{stream:!(A&&R==f-1)});return c.length=0,o.h.g+=h,o.C=0,o.h.g}function fu(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function bf(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?qi:(h=Number(c.substring(h,f)),isNaN(h)?hu:(f+=1,f+h>c.length?qi:(c=c.slice(f,f+h),o.C=f+h,c)))}oe.prototype.cancel=function(){this.K=!0,xe(this)};function cs(o){o.T=Date.now()+o.H,mu(o,o.H)}function mu(o,c){if(o.D!=null)throw Error("WatchDog timer not null");o.D=Jn(d(o.aa,o),c)}function $i(o){o.D&&(a.clearTimeout(o.D),o.D=null)}oe.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Tf(this.i,this.B),this.M!=2&&(Wn(),St(17)),xe(this),this.m=2,Zn(this)):mu(this,this.T-o)};function Zn(o){o.j.I==0||o.K||Bu(o.j,o)}function xe(o){$i(o);var c=o.O;c&&typeof c.dispose=="function"&&c.dispose(),o.O=null,eu(o.V),o.g&&(c=o.g,o.g=null,c.abort(),c.dispose())}function Ki(o,c){try{var h=o.j;if(h.I!=0&&(h.g==o||Gi(h.h,o))){if(!o.L&&Gi(h.h,o)&&h.I==3){try{var f=h.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var A=f;if(A[0]==0){t:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)gs(h),fs(h);else break t;Yi(h),St(18)}}else h.xa=A[1],0<h.xa-h.K&&A[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=Jn(d(h.Va,h),6e3));_u(h.h)<=1&&h.ta&&(h.ta=void 0)}else ke(h,11)}else if((o.L||h.g==o)&&gs(h),!_(c))for(A=h.Ba.g.parse(c),c=0;c<A.length;c++){let et=A[c];const pt=et[0];if(!(pt<=h.K))if(h.K=pt,et=et[1],h.I==2)if(et[0]=="c"){h.M=et[1],h.ba=et[2];const zt=et[3];zt!=null&&(h.ka=zt,h.j.info("VER="+h.ka));const Oe=et[4];Oe!=null&&(h.za=Oe,h.j.info("SVER="+h.za));const le=et[5];le!=null&&typeof le=="number"&&le>0&&(f=1.5*le,h.O=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const he=o.g;if(he){const _s=he.g?he.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_s){var R=f.h;R.g||_s.indexOf("spdy")==-1&&_s.indexOf("quic")==-1&&_s.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Qi(R,R.h),R.h=null))}if(f.G){const to=he.g?he.g.getResponseHeader("X-HTTP-Session-Id"):null;to&&(f.wa=to,st(f.J,f.G,to))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),f=h;var D=o;if(f.na=qu(f,f.L?f.ba:null,f.W),D.L){yu(f.h,D);var z=D,mt=f.O;mt&&(z.H=mt),z.D&&($i(z),cs(z)),f.g=D}else Fu(f);h.i.length>0&&ms(h)}else et[0]!="stop"&&et[0]!="close"||ke(h,7);else h.I==3&&(et[0]=="stop"||et[0]=="close"?et[0]=="stop"?ke(h,7):Xi(h):et[0]!="noop"&&h.l&&h.l.qa(et),h.A=0)}}Wn(4)}catch{}}var Rf=class{constructor(o,c){this.g=o,this.map=c}};function gu(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function pu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function _u(o){return o.h?1:o.g?o.g.size:0}function Gi(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Qi(o,c){o.g?o.g.add(c):o.h=c}function yu(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}gu.prototype.cancel=function(){if(this.i=Iu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Iu(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.G);return c}return S(o.i)}var Eu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Sf(o,c){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const f=o[h].indexOf("=");let A,R=null;f>=0?(A=o[h].substring(0,f),R=o[h].substring(f+1)):A=o[h],c(A,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function ae(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;o instanceof ae?(this.l=o.l,tr(this,o.j),this.o=o.o,this.g=o.g,er(this,o.u),this.h=o.h,Hi(this,Ru(o.i)),this.m=o.m):o&&(c=String(o).match(Eu))?(this.l=!1,tr(this,c[1]||"",!0),this.o=nr(c[2]||""),this.g=nr(c[3]||"",!0),er(this,c[4]),this.h=nr(c[5]||"",!0),Hi(this,c[6]||"",!0),this.m=nr(c[7]||"")):(this.l=!1,this.i=new sr(null,this.l))}ae.prototype.toString=function(){const o=[];var c=this.j;c&&o.push(rr(c,Tu,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(rr(c,Tu,!0),"@"),o.push(Yn(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(rr(h,h.charAt(0)=="/"?Cf:Vf,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",rr(h,xf)),o.join("")},ae.prototype.resolve=function(o){const c=qt(this);let h=!!o.j;h?tr(c,o.j):h=!!o.o,h?c.o=o.o:h=!!o.g,h?c.g=o.g:h=o.u!=null;var f=o.h;if(h)er(c,o.u);else if(h=!!o.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var A=c.h.lastIndexOf("/");A!=-1&&(f=c.h.slice(0,A+1)+f)}if(A=f,A==".."||A==".")f="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){f=A.lastIndexOf("/",0)==0,A=A.split("/");const R=[];for(let D=0;D<A.length;){const z=A[D++];z=="."?f&&D==A.length&&R.push(""):z==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),f&&D==A.length&&R.push("")):(R.push(z),f=!0)}f=R.join("/")}else f=A}return h?c.h=f:h=o.i.toString()!=="",h?Hi(c,Ru(o.i)):h=!!o.m,h&&(c.m=o.m),c};function qt(o){return new ae(o)}function tr(o,c,h){o.j=h?nr(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function er(o,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);o.u=c}else o.u=null}function Hi(o,c,h){c instanceof sr?(o.i=c,Nf(o.i,o.l)):(h||(c=rr(c,Df)),o.i=new sr(c,o.l))}function st(o,c,h){o.i.set(c,h)}function ls(o){return st(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function nr(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function rr(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,Pf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Pf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Tu=/[#\/\?@]/g,Vf=/[#\?:]/g,Cf=/[#\?]/g,Df=/[#\?@]/g,xf=/#/g;function sr(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Ne(o){o.g||(o.g=new Map,o.h=0,o.i&&Sf(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}r=sr.prototype,r.add=function(o,c){Ne(this),this.i=null,o=rn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function wu(o,c){Ne(o),c=rn(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function vu(o,c){return Ne(o),c=rn(o,c),o.g.has(c)}r.forEach=function(o,c){Ne(this),this.g.forEach(function(h,f){h.forEach(function(A){o.call(c,A,f,this)},this)},this)};function Au(o,c){Ne(o);let h=[];if(typeof c=="string")vu(o,c)&&(h=h.concat(o.g.get(rn(o,c))));else for(o=Array.from(o.g.values()),c=0;c<o.length;c++)h=h.concat(o[c]);return h}r.set=function(o,c){return Ne(this),this.i=null,o=rn(this,o),vu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},r.get=function(o,c){return o?(o=Au(this,o),o.length>0?String(o[0]):c):c};function bu(o,c,h){wu(o,c),h.length>0&&(o.i=null,o.g.set(rn(o,c),S(h)),o.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var h=c[f];const A=Yn(h);h=Au(this,h);for(let R=0;R<h.length;R++){let D=A;h[R]!==""&&(D+="="+Yn(h[R])),o.push(D)}}return this.i=o.join("&")};function Ru(o){const c=new sr;return c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),c}function rn(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Nf(o,c){c&&!o.j&&(Ne(o),o.i=null,o.g.forEach(function(h,f){const A=f.toLowerCase();f!=A&&(wu(this,f),bu(this,A,h))},o)),o.j=c}function kf(o,c){const h=new Xn;if(a.Image){const f=new Image;f.onload=m(ue,h,"TestLoadImage: loaded",!0,c,f),f.onerror=m(ue,h,"TestLoadImage: error",!1,c,f),f.onabort=m(ue,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=m(ue,h,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function Of(o,c){const h=new Xn,f=new AbortController,A=setTimeout(()=>{f.abort(),ue(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(R=>{clearTimeout(A),R.ok?ue(h,"TestPingServer: ok",!0,c):ue(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(A),ue(h,"TestPingServer: error",!1,c)})}function ue(o,c,h,f,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),f(h)}catch{}}function Mf(){this.g=new yf}function Wi(o){this.i=o.Sb||null,this.h=o.ab||!1}g(Wi,nu),Wi.prototype.g=function(){return new hs(this.i,this.h)};function hs(o,c){Et.call(this),this.H=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(hs,Et),r=hs.prototype,r.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=c,this.readyState=1,or(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(c.body=o),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ir(this)),this.readyState=0},r.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,or(this)),this.g&&(this.readyState=3,or(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Su(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Su(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}r.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?ir(this):or(this),this.readyState==3&&Su(this)}},r.Oa=function(o){this.g&&(this.response=this.responseText=o,ir(this))},r.Na=function(o){this.g&&(this.response=o,ir(this))},r.ga=function(){this.g&&ir(this)};function ir(o){o.readyState=4,o.l=null,o.j=null,o.B=null,or(o)}r.setRequestHeader=function(o,c){this.A.append(o,c)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function or(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(hs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Pu(o){let c="";return ss(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function Ji(o,c,h){t:{for(f in h){var f=!1;break t}f=!0}f||(h=Pu(h),typeof o=="string"?h!=null&&Yn(h):st(o,c,h))}function at(o){Et.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(at,Et);var Ff=/^https?$/i,Lf=["POST","PUT"];r=at.prototype,r.Fa=function(o){this.H=o},r.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():cu.g(),this.g.onreadystatechange=E(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){Vu(this,R);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var A in f)h.set(A,f[A]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())h.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),A=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Lf,c,void 0)>=0)||f||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,D]of h)this.g.setRequestHeader(R,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(R){Vu(this,R)}};function Vu(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.o=5,Cu(o),ds(o)}function Cu(o){o.A||(o.A=!0,Rt(o,"complete"),Rt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Rt(this,"complete"),Rt(this,"abort"),ds(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ds(this,!0)),at.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Du(this):this.Xa())},r.Xa=function(){Du(this)};function Du(o){if(o.h&&typeof i<"u"){if(o.v&&ce(o)==4)setTimeout(o.Ca.bind(o),0);else if(Rt(o,"readystatechange"),ce(o)==4){o.h=!1;try{const R=o.ca();t:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var h;if(!(h=c)){var f;if(f=R===0){let D=String(o.D).match(Eu)[1]||null;!D&&a.self&&a.self.location&&(D=a.self.location.protocol.slice(0,-1)),f=!Ff.test(D?D.toLowerCase():"")}h=f}if(h)Rt(o,"complete"),Rt(o,"success");else{o.o=6;try{var A=ce(o)>2?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.ca()+"]",Cu(o)}}finally{ds(o)}}}}function ds(o,c){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,c||Rt(o,"ready");try{h.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function ce(o){return o.g?o.g.readyState:0}r.ca=function(){try{return ce(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),_f(c)}};function xu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Bf(o){const c={};o=(o.g&&ce(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(_(o[f]))continue;var h=vf(o[f]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=c[A]||[];c[A]=R,R.push(h)}hf(c,function(f){return f.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ar(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function Nu(o){this.za=0,this.i=[],this.j=new Xn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ar("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ar("baseRetryDelayMs",5e3,o),this.Za=ar("retryDelaySeedMs",1e4,o),this.Ta=ar("forwardChannelMaxRetries",2,o),this.va=ar("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new gu(o&&o.concurrentRequestLimit),this.Ba=new Mf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Nu.prototype,r.ka=8,r.I=1,r.connect=function(o,c,h,f){St(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.J=qu(this,null,this.W),ms(this)};function Xi(o){if(ku(o),o.I==3){var c=o.V++,h=qt(o.J);if(st(h,"SID",o.M),st(h,"RID",c),st(h,"TYPE","terminate"),ur(o,h),c=new oe(o,o.j,c),c.M=2,c.A=ls(qt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=c.A,h=!0),h||(c.g=zu(c.j,null),c.g.ea(c.A)),c.F=Date.now(),cs(c)}ju(o)}function fs(o){o.g&&(Zi(o),o.g.cancel(),o.g=null)}function ku(o){fs(o),o.v&&(a.clearTimeout(o.v),o.v=null),gs(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function ms(o){if(!pu(o.h)&&!o.m){o.m=!0;var c=o.Ea;W||p(),J||(W(),J=!0),I.add(c,o),o.D=0}}function Uf(o,c){return _u(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=c.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=Jn(d(o.Ea,o,c),Uu(o,o.D)),o.D++,!0)}r.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const A=new oe(this,this.j,o);let R=this.o;if(this.U&&(R?(R=Ga(R),Ha(R,this.U)):R=this.U),this.u!==null||this.R||(A.J=R,R=null),this.S)t:{for(var c=0,h=0;h<this.i.length;h++){e:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=h;break t}if(c===4096||h===this.i.length-1){c=h+1;break t}}c=1e3}else c=1e3;c=Mu(this,A,c),h=qt(this.J),st(h,"RID",o),st(h,"CVER",22),this.G&&st(h,"X-HTTP-Session-Id",this.G),ur(this,h),R&&(this.R?c="headers="+Yn(Pu(R))+"&"+c:this.u&&Ji(h,this.u,R)),Qi(this.h,A),this.Ra&&st(h,"TYPE","init"),this.S?(st(h,"$req",c),st(h,"SID","null"),A.U=!0,zi(A,h,null)):zi(A,h,c),this.I=2}}else this.I==3&&(o?Ou(this,o):this.i.length==0||pu(this.h)||Ou(this))};function Ou(o,c){var h;c?h=c.l:h=o.V++;const f=qt(o.J);st(f,"SID",o.M),st(f,"RID",h),st(f,"AID",o.K),ur(o,f),o.u&&o.o&&Ji(f,o.u,o.o),h=new oe(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),c&&(o.i=c.G.concat(o.i)),c=Mu(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Qi(o.h,h),zi(h,f,c)}function ur(o,c){o.H&&ss(o.H,function(h,f){st(c,f,h)}),o.l&&ss({},function(h,f){st(c,f,h)})}function Mu(o,c,h){h=Math.min(o.i.length,h);const f=o.l?d(o.l.Ka,o.l,o):null;t:{var A=o.i;let z=-1;for(;;){const mt=["count="+h];z==-1?h>0?(z=A[0].g,mt.push("ofs="+z)):z=0:mt.push("ofs="+z);let et=!0;for(let pt=0;pt<h;pt++){var R=A[pt].g;const zt=A[pt].map;if(R-=z,R<0)z=Math.max(0,A[pt].g-100),et=!1;else try{R="req"+R+"_"||"";try{var D=zt instanceof Map?zt:Object.entries(zt);for(const[Oe,le]of D){let he=le;u(le)&&(he=Li(le)),mt.push(R+Oe+"="+encodeURIComponent(he))}}catch(Oe){throw mt.push(R+"type="+encodeURIComponent("_badmap")),Oe}}catch{f&&f(zt)}}if(et){D=mt.join("&");break t}}D=void 0}return o=o.i.splice(0,h),c.G=o,D}function Fu(o){if(!o.g&&!o.v){o.Y=1;var c=o.Da;W||p(),J||(W(),J=!0),I.add(c,o),o.A=0}}function Yi(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=Jn(d(o.Da,o),Uu(o,o.A)),o.A++,!0)}r.Da=function(){if(this.v=null,Lu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=Jn(d(this.Wa,this),o)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,St(10),fs(this),Lu(this))};function Zi(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Lu(o){o.g=new oe(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var c=qt(o.na);st(c,"RID","rpc"),st(c,"SID",o.M),st(c,"AID",o.K),st(c,"CI",o.F?"0":"1"),!o.F&&o.ia&&st(c,"TO",o.ia),st(c,"TYPE","xmlhttp"),ur(o,c),o.u&&o.o&&Ji(c,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=ls(qt(c)),h.u=null,h.R=!0,du(h,o)}r.Va=function(){this.C!=null&&(this.C=null,fs(this),Yi(this),St(19))};function gs(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Bu(o,c){var h=null;if(o.g==c){gs(o),Zi(o),o.g=null;var f=2}else if(Gi(o.h,c))h=c.G,yu(o.h,c),f=1;else return;if(o.I!=0){if(c.o)if(f==1){h=c.u?c.u.length:0,c=Date.now()-c.F;var A=o.D;f=as(),Rt(f,new au(f,h)),ms(o)}else Fu(o);else if(A=c.m,A==3||A==0&&c.X>0||!(f==1&&Uf(o,c)||f==2&&Yi(o)))switch(h&&h.length>0&&(c=o.h,c.i=c.i.concat(h)),A){case 1:ke(o,5);break;case 4:ke(o,10);break;case 3:ke(o,6);break;default:ke(o,2)}}}function Uu(o,c){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*c}function ke(o,c){if(o.j.info("Error code "+c),c==2){var h=d(o.bb,o),f=o.Ua;const A=!f;f=new ae(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||tr(f,"https"),ls(f),A?kf(f.toString(),h):Of(f.toString(),h)}else St(2);o.I=0,o.l&&o.l.pa(c),ju(o),ku(o)}r.bb=function(o){o?(this.j.info("Successfully pinged google.com"),St(2)):(this.j.info("Failed to ping google.com"),St(1))};function ju(o){if(o.I=0,o.ja=[],o.l){const c=Iu(o.h);(c.length!=0||o.i.length!=0)&&(C(o.ja,c),C(o.ja,o.i),o.h.i.length=0,S(o.i),o.i.length=0),o.l.oa()}}function qu(o,c,h){var f=h instanceof ae?qt(h):new ae(h);if(f.g!="")c&&(f.g=c+"."+f.g),er(f,f.u);else{var A=a.location;f=A.protocol,c=c?c+"."+A.hostname:A.hostname,A=+A.port;const R=new ae(null);f&&tr(R,f),c&&(R.g=c),A&&er(R,A),h&&(R.h=h),f=R}return h=o.G,c=o.wa,h&&c&&st(f,h,c),st(f,"VER",o.ka),ur(o,f),f}function zu(o,c,h){if(c&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Aa&&!o.ma?new at(new Wi({ab:h})):new at(o.ma),c.Fa(o.L),c}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function $u(){}r=$u.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function ps(){}ps.prototype.g=function(o,c){return new xt(o,c)};function xt(o,c){Et.call(this),this.g=new Nu(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(o?o["X-WebChannel-Client-Profile"]=c.sa:o={"X-WebChannel-Client-Profile":c.sa}),this.g.U=o,(o=c&&c.Qb)&&!_(o)&&(this.g.u=o),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!_(c)&&(this.g.G=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new sn(this)}g(xt,Et),xt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},xt.prototype.close=function(){Xi(this.g)},xt.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=Li(o),o=h);c.i.push(new Rf(c.Ya++,o)),c.I==3&&ms(c)},xt.prototype.N=function(){this.g.l=null,delete this.j,Xi(this.g),delete this.g,xt.Z.N.call(this)};function Ku(o){Bi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){t:{for(const h in c){o=h;break t}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}g(Ku,Bi);function Gu(){Ui.call(this),this.status=1}g(Gu,Ui);function sn(o){this.g=o}g(sn,$u),sn.prototype.ra=function(){Rt(this.g,"a")},sn.prototype.qa=function(o){Rt(this.g,new Ku(o))},sn.prototype.pa=function(o){Rt(this.g,new Gu)},sn.prototype.oa=function(){Rt(this.g,"b")},ps.prototype.createWebChannel=ps.prototype.g,xt.prototype.send=xt.prototype.o,xt.prototype.open=xt.prototype.m,xt.prototype.close=xt.prototype.close,Kl=function(){return new ps},$l=function(){return as()},zl=De,wo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},us.NO_ERROR=0,us.TIMEOUT=8,us.HTTP_ERROR=6,bs=us,uu.COMPLETE="complete",ql=uu,ru.EventType=Hn,Hn.OPEN="a",Hn.CLOSE="b",Hn.ERROR="c",Hn.MESSAGE="d",Et.prototype.listen=Et.prototype.J,pr=ru,at.prototype.listenOnce=at.prototype.K,at.prototype.getLastError=at.prototype.Ha,at.prototype.getLastErrorCode=at.prototype.ya,at.prototype.getStatus=at.prototype.ca,at.prototype.getResponseJson=at.prototype.La,at.prototype.getResponseText=at.prototype.la,at.prototype.send=at.prototype.ea,at.prototype.setWithCredentials=at.prototype.Fa,jl=at}).apply(typeof ys<"u"?ys:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}wt.UNAUTHENTICATED=new wt(null),wt.GOOGLE_CREDENTIALS=new wt("google-credentials-uid"),wt.FIRST_PARTY=new wt("first-party-uid"),wt.MOCK_USER=new wt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jn="12.14.0";function gg(r){jn=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je=new Ol("@firebase/firestore");function dn(){return Je.logLevel}function V(r,...t){if(Je.logLevel<=H.DEBUG){const e=t.map(Wo);Je.debug(`Firestore (${jn}): ${r}`,...e)}}function ct(r,...t){if(Je.logLevel<=H.ERROR){const e=t.map(Wo);Je.error(`Firestore (${jn}): ${r}`,...e)}}function Tn(r,...t){if(Je.logLevel<=H.WARN){const e=t.map(Wo);Je.warn(`Firestore (${jn}): ${r}`,...e)}}function Wo(r){if(typeof r=="string")return r;try{return(function(e){return JSON.stringify(e)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,Gl(r,n,e)}function Gl(r,t,e){let n=`FIRESTORE (${jn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw ct(n),new Error(n)}function L(r,t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,r||Gl(t,s,n)}function F(r,t){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends Un{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pg{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class _g{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(wt.UNAUTHENTICATED)))}shutdown(){}}class yg{constructor(t){this.t=t,this.currentUser=wt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){L(this.o===void 0,42304);let n=this.i;const s=l=>this.i!==n?(n=this.i,e(l)):Promise.resolve();let i=new Wt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Wt,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const l=i;t.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},u=l=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((l=>u(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?u(l):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Wt)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((n=>this.i!==t?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string",31837,{l:n}),new pg(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return L(t===null||typeof t=="string",2055,{h:t}),new wt(t)}}class Ig{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=wt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Eg{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new Ig(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(wt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class sc{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Tg{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,tg(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){L(this.o===void 0,3512);const n=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>n(i)))};const s=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new sc(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(L(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new sc(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wg(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=wg(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%62))}return n}}function U(r,t){return r<t?-1:r>t?1:0}function vo(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const s=r.charAt(n),i=t.charAt(n);if(s!==i)return oo(s)===oo(i)?U(s,i):oo(s)?1:-1}return U(r.length,t.length)}const vg=55296,Ag=57343;function oo(r){const t=r.charCodeAt(0);return t>=vg&&t<=Ag}function wn(r,t,e){return r.length===t.length&&r.every(((n,s)=>e(n,t[s])))}function Ql(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic="__name__";class $t{constructor(t,e,n){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&M(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return $t.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof $t?t.forEach((n=>{e.push(n)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=$t.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return U(t.length,e.length)}static compareSegments(t,e){const n=$t.isNumericId(t),s=$t.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?$t.extractNumericId(t).compare($t.extractNumericId(e)):vo(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Ie.fromString(t.substring(4,t.length-2))}}class X extends $t{construct(t,e,n){return new X(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((s=>s.length>0)))}return new X(e)}static emptyPath(){return new X([])}}const bg=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ot extends $t{construct(t,e,n){return new ot(t,e,n)}static isValidIdentifier(t){return bg.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ot.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ic}static keyField(){return new ot([ic])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const l=t[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=l,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ot(e)}static emptyPath(){return new ot([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(t){this.path=t}static fromPath(t){return new k(X.fromString(t))}static fromName(t){return new k(X.fromString(t).popFirst(5))}static empty(){return new k(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&X.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return X.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new k(new X(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(r,t,e){if(!e)throw new N(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function Rg(r,t,e,n){if(t===!0&&n===!0)throw new N(P.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function oc(r){if(!k.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function ac(r){if(k.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Wl(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Xo(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=(function(n){return n.constructor?n.constructor.name:null})(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function Ot(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Xo(r);throw new N(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(r,t){const e={typeString:r};return t&&(e.value=t),e}function Qr(r,t){if(!Wl(r))throw new N(P.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const s=t[n].typeString,i="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const a=r[n];if(s&&typeof a!==s){e=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){e=`Expected '${n}' field to equal '${i.value}'`;break}}if(e)throw new N(P.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc=-62135596800,cc=1e6;class Y{static now(){return Y.fromMillis(Date.now())}static fromDate(t){return Y.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*cc);return new Y(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<uc)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/cc}_compareTo(t){return this.seconds===t.seconds?U(this.nanoseconds,t.nanoseconds):U(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Y._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Qr(t,Y._jsonSchema))return new Y(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-uc;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Y._jsonSchemaVersion="firestore/timestamp/1.0",Y._jsonSchema={type:ft("string",Y._jsonSchemaVersion),seconds:ft("number"),nanoseconds:ft("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{static fromTimestamp(t){return new B(t)}static min(){return new B(new Y(0,0))}static max(){return new B(new Y(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn=-1;class Us{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function Ao(r){return r.fields.find((t=>t.kind===2))}function Le(r){return r.fields.filter((t=>t.kind!==2))}Us.UNKNOWN_ID=-1;class Rs{constructor(t,e){this.fieldPath=t,this.kind=e}}class xr{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new xr(0,Ft.min())}}function Jl(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=B.fromTimestamp(n===1e9?new Y(e+1,0):new Y(e,n));return new Ft(s,k.empty(),t)}function Xl(r){return new Ft(r.readTime,r.key,vn)}class Ft{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Ft(B.min(),k.empty(),vn)}static max(){return new Ft(B.max(),k.empty(),vn)}}function Yo(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=k.comparator(r.documentKey,t.documentKey),e!==0?e:U(r.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Zl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Re(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Yl)throw r;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new v(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(n,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof v?e:v.resolve(e)}catch(e){return v.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):v.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):v.reject(e)}static resolve(t){return new v(((e,n)=>{e(t)}))}static reject(t){return new v(((e,n)=>{n(t)}))}static waitFor(t){return new v(((e,n)=>{let s=0,i=0,a=!1;t.forEach((u=>{++s,u.next((()=>{++i,a&&i===s&&e()}),(l=>n(l)))})),a=!0,i===s&&e()}))}static or(t){let e=v.resolve(!1);for(const n of t)e=e.next((s=>s?v.resolve(s):n()));return e}static forEach(t,e){const n=[];return t.forEach(((s,i)=>{n.push(e.call(this,s,i))})),this.waitFor(n)}static mapArray(t,e){return new v(((n,s)=>{const i=t.length,a=new Array(i);let u=0;for(let l=0;l<i;l++){const d=l;e(t[d]).next((m=>{a[d]=m,++u,u===i&&n(a)}),(m=>s(m)))}}))}static doWhile(t,e){return new v(((n,s)=>{const i=()=>{t()===!0?e().next((()=>{i()}),s):n()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt="SimpleDb";class ui{static open(t,e,n,s){try{return new ui(e,t.transaction(s,n))}catch(i){throw new Tr(e,i)}}constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.S=new Wt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{e.error?this.S.reject(new Tr(t,e.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=Zo(n.target.error);this.S.reject(new Tr(t,s))}}get D(){return this.S.promise}abort(t){t&&this.S.reject(t),this.aborted||(V(Nt,"Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new Pg(e)}}class Ee{static delete(t){return V(Nt,"Removing database:",t),Ue(Sl().indexedDB.deleteDatabase(t)).toPromise()}static v(){if(!xl())return!1;if(Ee.F())return!0;const t=En(),e=Ee.M(t),n=0<e&&e<10,s=th(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static F(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)==null?void 0:t.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(t,e){return t.store(e)}static M(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(t,e,n){this.name=t,this.version=e,this.N=n,this.B=null,Ee.M(En())===12.2&&ct("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(t){return this.db||(V(Nt,"Opening database:",this.name),this.db=await new Promise(((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new Tr(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new N(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new N(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new Tr(t,a))},s.onupgradeneeded=i=>{V(Nt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.N.k(a,s.transaction,i.oldVersion,this.version).next((()=>{V(Nt,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}K(t){this.q=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.L(t);const u=ui.open(this.db,t,i?"readonly":"readwrite",n),l=s(u).next((d=>(u.C(),d))).catch((d=>(u.abort(d),v.reject(d)))).toPromise();return l.catch((()=>{})),await u.D,l}catch(u){const l=u,d=l.name!=="FirebaseError"&&a<3;if(V(Nt,"Transaction failed with error:",l.message,"Retrying:",d),this.close(),!d)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function th(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class Sg{constructor(t){this.U=t,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(t){this.U=t}done(){this.$=!0}j(t){this.W=t}delete(){return Ue(this.U.delete())}}class Tr extends N{constructor(t,e){super(P.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Se(r){return r.name==="IndexedDbTransactionError"}class Pg{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(V(Nt,"PUT",this.store.name,t,e),n=this.store.put(e,t)):(V(Nt,"PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),Ue(n)}add(t){return V(Nt,"ADD",this.store.name,t,t),Ue(this.store.add(t))}get(t){return Ue(this.store.get(t)).next((e=>(e===void 0&&(e=null),V(Nt,"GET",this.store.name,t,e),e)))}delete(t){return V(Nt,"DELETE",this.store.name,t),Ue(this.store.delete(t))}count(){return V(Nt,"COUNT",this.store.name),Ue(this.store.count())}J(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new v(((a,u)=>{i.onerror=l=>{u(l.target.error)},i.onsuccess=l=>{a(l.target.result)}}))}{const i=this.cursor(n),a=[];return this.H(i,((u,l)=>{a.push(l)})).next((()=>a))}}Z(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new v(((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}}))}X(t,e){V(Nt,"DELETE ALL",this.store.name);const n=this.options(t,e);n.Y=!1;const s=this.cursor(n);return this.H(s,((i,a,u)=>u.delete()))}ee(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.H(s,e)}te(t){const e=this.cursor({});return new v(((n,s)=>{e.onerror=i=>{const a=Zo(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next((u=>{u?a.continue():n()})):n()}}))}H(t,e){const n=[];return new v(((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const u=a.target.result;if(!u)return void s();const l=new Sg(u),d=e(u.primaryKey,u.value,l);if(d instanceof v){const m=d.catch((g=>(l.done(),v.reject(g))));n.push(m)}l.isDone?s():l.G===null?u.continue():u.continue(l.G)}})).next((()=>v.waitFor(n)))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.Y?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function Ue(r){return new v(((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=Zo(n.target.error);e(s)}}))}let lc=!1;function Zo(r){const t=Ee.M(En());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new N("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return lc||(lc=!0,setTimeout((()=>{throw n}),0)),n}}return r}const wr="IndexBackfiller";class Vg{constructor(t,e){this.asyncQueue=t,this.ne=e,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(t){V(wr,`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,(async()=>{this.task=null;try{const e=await this.ne.ie();V(wr,`Documents written: ${e}`)}catch(e){Se(e)?V(wr,"Ignoring IndexedDB error during index backfill: ",e):await Re(e)}await this.re(6e4)}))}}class Cg{constructor(t,e){this.localStore=t,this.persistence=e}async ie(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(e=>this.se(e,t)))}se(t,e){const n=new Set;let s=e,i=!0;return v.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next((a=>{if(a!==null&&!n.has(a))return V(wr,`Processing collection: ${a}`),this.oe(t,a,s).next((u=>{s-=u,n.add(a)}));i=!1})))).next((()=>e-s))}oe(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next((s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next((i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next((()=>this._e(s,i))).next((u=>(V(wr,`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(t,e,u)))).next((()=>a.size))}))))}_e(t,e){let n=t;return e.changes.forEach(((s,i)=>{const a=Xl(i);Yo(a,n)>0&&(n=a)})),new Ft(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ct.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke=-1;function ci(r){return r==null}function Nr(r){return r===0&&1/r==-1/0}function eh(r){return typeof r=="number"&&Number.isInteger(r)&&!Nr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js="";function bt(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=hc(t)),t=Dg(r.get(e),t);return hc(t)}function Dg(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case js:e+="";break;default:e+=i}}return e}function hc(r){return r+js+""}function Gt(r){const t=r.length;if(L(t>=2,64408,{path:r}),t===2)return L(r.charAt(0)===js&&r.charAt(1)==="",56145,{path:r}),X.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf(js,i);switch((a<0||a>e)&&M(50515,{path:r}),r.charAt(a+1)){case"":const u=r.substring(i,a);let l;s.length===0?l=u:(s+=u,l=s,s=""),n.push(l);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:M(61167,{path:r})}i=a+2}return new X(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be="remoteDocuments",Hr="owner",on="owner",kr="mutationQueues",xg="userId",Bt="mutations",dc="batchId",$e="userMutationsIndex",fc=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(r,t){return[r,bt(t)]}function nh(r,t,e){return[r,bt(t),e]}const Ng={},An="documentMutations",qs="remoteDocumentsV14",kg=["prefixPath","collectionGroup","readTime","documentId"],Ps="documentKeyIndex",Og=["prefixPath","collectionGroup","documentId"],rh="collectionGroupIndex",Mg=["collectionGroup","readTime","prefixPath","documentId"],Or="remoteDocumentGlobal",bo="remoteDocumentGlobalKey",bn="targets",sh="queryTargetsIndex",Fg=["canonicalId","targetId"],Rn="targetDocuments",Lg=["targetId","path"],ta="documentTargetsIndex",Bg=["path","targetId"],zs="targetGlobalKey",Ge="targetGlobal",Mr="collectionParents",Ug=["collectionId","parent"],Sn="clientMetadata",jg="clientId",li="bundles",qg="bundleId",hi="namedQueries",zg="name",ea="indexConfiguration",$g="indexId",Ro="collectionGroupIndex",Kg="collectionGroup",vr="indexState",Gg=["indexId","uid"],ih="sequenceNumberIndex",Qg=["uid","sequenceNumber"],Ar="indexEntries",Hg=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],oh="documentKeyIndex",Wg=["indexId","uid","orderedDocumentKey"],di="documentOverlays",Jg=["userId","collectionPath","documentId"],So="collectionPathOverlayIndex",Xg=["userId","collectionPath","largestBatchId"],ah="collectionGroupOverlayIndex",Yg=["userId","collectionGroup","largestBatchId"],na="globals",Zg="name",uh=[kr,Bt,An,Be,bn,Hr,Ge,Rn,Sn,Or,Mr,li,hi],tp=[...uh,di],ch=[kr,Bt,An,qs,bn,Hr,Ge,Rn,Sn,Or,Mr,li,hi,di],lh=ch,ra=[...lh,ea,vr,Ar],ep=ra,hh=[...ra,na],np=hh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po extends Zl{constructor(t,e){super(),this.le=t,this.currentSequenceNumber=e}}function gt(r,t){const e=F(r);return Ee.O(e.le,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mc(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function Pe(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function dh(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(t,e){this.comparator=t,this.root=e||It.EMPTY}insert(t,e){return new nt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,It.BLACK,null,null))}remove(t){return new nt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,It.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Is(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Is(this.root,t,this.comparator,!1)}getReverseIterator(){return new Is(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Is(this.root,t,this.comparator,!0)}}class Is{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class It{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n??It.RED,this.left=s??It.EMPTY,this.right=i??It.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new It(t??this.key,e??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return It.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return It.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,It.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,It.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}It.EMPTY=null,It.RED=!0,It.BLACK=!1;It.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,n,s,i){return this}insert(t,e,n){return new It(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(t){this.comparator=t,this.data=new nt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new gc(this.data.getIterator())}getIteratorFrom(t){return new gc(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((n=>{e=e.add(n)})),e}isEqual(t){if(!(t instanceof Z)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new Z(this.comparator);return e.data=t,e}}class gc{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function an(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(t){this.fields=t,t.sort(ot.comparator)}static empty(){return new Dt([])}unionWith(t){let e=new Z(ot.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Dt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return wn(this.fields,t.fields,((e,n)=>e.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new fh("Invalid base64 string: "+i):i}})(t);return new ht(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return U(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const rp=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function te(r){if(L(!!r,39018),typeof r=="string"){let t=0;const e=rp.exec(r);if(L(!!e,46558,{timestamp:r}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:it(r.seconds),nanos:it(r.nanos)}}function it(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ee(r){return typeof r=="string"?ht.fromBase64String(r):ht.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="server_timestamp",gh="__type__",ph="__previous_value__",_h="__local_write_time__";function sa(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[gh])==null?void 0:n.stringValue)===mh}function fi(r){const t=r.mapValue.fields[ph];return sa(t)?fi(t):t}function Fr(r){const t=te(r.mapValue.fields[_h].timestampValue);return new Y(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(t,e,n,s,i,a,u,l,d,m,g){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=m,this.apiKey=g}}const $s="(default)";class Xe{constructor(t,e){this.projectId=t,this.database=e||$s}static empty(){return new Xe("","")}get isDefaultDatabase(){return this.database===$s}isEqual(t){return t instanceof Xe&&t.projectId===this.projectId&&t.database===this.database}}function ip(r,t){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Xe(r.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ia="__type__",yh="__max__",pe={mapValue:{fields:{__type__:{stringValue:yh}}}},oa="__vector__",Pn="value",Vs={nullValue:"NULL_VALUE"};function we(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?sa(r)?4:Eh(r)?9007199254740991:mi(r)?10:11:M(28295,{value:r})}function Xt(r,t){if(r===t)return!0;const e=we(r);if(e!==we(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return Fr(r).isEqual(Fr(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=te(s.timestampValue),u=te(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos})(r,t);case 5:return r.stringValue===t.stringValue;case 6:return(function(s,i){return ee(s.bytesValue).isEqual(ee(i.bytesValue))})(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return(function(s,i){return it(s.geoPointValue.latitude)===it(i.geoPointValue.latitude)&&it(s.geoPointValue.longitude)===it(i.geoPointValue.longitude)})(r,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return it(s.integerValue)===it(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=it(s.doubleValue),u=it(i.doubleValue);return a===u?Nr(a)===Nr(u):isNaN(a)&&isNaN(u)}return!1})(r,t);case 9:return wn(r.arrayValue.values||[],t.arrayValue.values||[],Xt);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(mc(a)!==mc(u))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(u[l]===void 0||!Xt(a[l],u[l])))return!1;return!0})(r,t);default:return M(52216,{left:r})}}function Lr(r,t){return(r.values||[]).find((e=>Xt(e,t)))!==void 0}function ve(r,t){if(r===t)return 0;const e=we(r),n=we(t);if(e!==n)return U(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return U(r.booleanValue,t.booleanValue);case 2:return(function(i,a){const u=it(i.integerValue||i.doubleValue),l=it(a.integerValue||a.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1})(r,t);case 3:return pc(r.timestampValue,t.timestampValue);case 4:return pc(Fr(r),Fr(t));case 5:return vo(r.stringValue,t.stringValue);case 6:return(function(i,a){const u=ee(i),l=ee(a);return u.compareTo(l)})(r.bytesValue,t.bytesValue);case 7:return(function(i,a){const u=i.split("/"),l=a.split("/");for(let d=0;d<u.length&&d<l.length;d++){const m=U(u[d],l[d]);if(m!==0)return m}return U(u.length,l.length)})(r.referenceValue,t.referenceValue);case 8:return(function(i,a){const u=U(it(i.latitude),it(a.latitude));return u!==0?u:U(it(i.longitude),it(a.longitude))})(r.geoPointValue,t.geoPointValue);case 9:return _c(r.arrayValue,t.arrayValue);case 10:return(function(i,a){var E,S,C,O;const u=i.fields||{},l=a.fields||{},d=(E=u[Pn])==null?void 0:E.arrayValue,m=(S=l[Pn])==null?void 0:S.arrayValue,g=U(((C=d==null?void 0:d.values)==null?void 0:C.length)||0,((O=m==null?void 0:m.values)==null?void 0:O.length)||0);return g!==0?g:_c(d,m)})(r.mapValue,t.mapValue);case 11:return(function(i,a){if(i===pe.mapValue&&a===pe.mapValue)return 0;if(i===pe.mapValue)return 1;if(a===pe.mapValue)return-1;const u=i.fields||{},l=Object.keys(u),d=a.fields||{},m=Object.keys(d);l.sort(),m.sort();for(let g=0;g<l.length&&g<m.length;++g){const E=vo(l[g],m[g]);if(E!==0)return E;const S=ve(u[l[g]],d[m[g]]);if(S!==0)return S}return U(l.length,m.length)})(r.mapValue,t.mapValue);default:throw M(23264,{he:e})}}function pc(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return U(r,t);const e=te(r),n=te(t),s=U(e.seconds,n.seconds);return s!==0?s:U(e.nanos,n.nanos)}function _c(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=ve(e[s],n[s]);if(i)return i}return U(e.length,n.length)}function Vn(r){return Vo(r)}function Vo(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(e){const n=te(e);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(e){return ee(e).toBase64()})(r.bytesValue):"referenceValue"in r?(function(e){return k.fromName(e).toString()})(r.referenceValue):"geoPointValue"in r?(function(e){return`geo(${e.latitude},${e.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=Vo(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${Vo(e.fields[a])}`;return s+"}"})(r.mapValue):M(61005,{value:r})}function Cs(r){switch(we(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=fi(r);return t?16+Cs(t):16;case 5:return 2*r.stringValue.length;case 6:return ee(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+Cs(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return Pe(n.fields,((i,a)=>{s+=i.length+Cs(a)})),s})(r.mapValue);default:throw M(13486,{value:r})}}function aa(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function Br(r){return!!r&&"integerValue"in r}function Ih(r){return Br(r)||(function(e){return!!e&&"doubleValue"in e})(r)}function Ur(r){return!!r&&"arrayValue"in r}function yc(r){return!!r&&"nullValue"in r}function Ic(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Ds(r){return!!r&&"mapValue"in r}function mi(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[ia])==null?void 0:n.stringValue)===oa}function br(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return Pe(r.mapValue.fields,((e,n)=>t.mapValue.fields[e]=br(n))),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=br(r.arrayValue.values[e]);return t}return{...r}}function Eh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===yh}const Th={mapValue:{fields:{[ia]:{stringValue:oa},[Pn]:{arrayValue:{}}}}};function op(r){return"nullValue"in r?Vs:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?aa(Xe.empty(),k.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?mi(r)?Th:{mapValue:{}}:M(35942,{value:r})}function ap(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?aa(Xe.empty(),k.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Th:"mapValue"in r?mi(r)?{mapValue:{}}:pe:M(61959,{value:r})}function Ec(r,t){const e=ve(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function Tc(r,t){const e=ve(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t){this.value=t}static empty(){return new At({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Ds(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=br(e)}setAll(t){let e=ot.emptyPath(),n={},s=[];t.forEach(((a,u)=>{if(!e.isImmediateParentOf(u)){const l=this.getFieldsMap(e);this.applyChanges(l,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=br(a):s.push(u.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());Ds(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Xt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];Ds(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){Pe(e,((s,i)=>t[s]=i));for(const s of n)delete t[s]}clone(){return new At(br(this.value))}}function wh(r){const t=[];return Pe(r.fields,((e,n)=>{const s=new ot([e]);if(Ds(n)){const i=wh(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)})),new Dt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t,e,n,s,i,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(t){return new ut(t,0,B.min(),B.min(),B.min(),At.empty(),0)}static newFoundDocument(t,e,n,s){return new ut(t,1,e,B.min(),n,s,0)}static newNoDocument(t,e){return new ut(t,2,e,B.min(),B.min(),At.empty(),0)}static newUnknownDocument(t,e){return new ut(t,3,e,B.min(),B.min(),At.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=At.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=At.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof ut&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new ut(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(t,e){this.position=t,this.inclusive=e}}function wc(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=k.comparator(k.fromName(a.referenceValue),e.key):n=ve(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function vc(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Xt(r.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(t,e="asc"){this.field=t,this.dir=e}}function up(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{}class K extends vh{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new cp(t,e,n):e==="array-contains"?new dp(t,n):e==="in"?new Vh(t,n):e==="not-in"?new fp(t,n):e==="array-contains-any"?new mp(t,n):new K(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new lp(t,n):new hp(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(ve(e,this.value)):e!==null&&we(this.value)===we(e)&&this.matchesComparison(ve(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tt extends vh{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new tt(t,e)}matches(t){return Dn(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Dn(r){return r.op==="and"}function Co(r){return r.op==="or"}function ua(r){return Ah(r)&&Dn(r)}function Ah(r){for(const t of r.filters)if(t instanceof tt)return!1;return!0}function Do(r){if(r instanceof K)return r.field.canonicalString()+r.op.toString()+Vn(r.value);if(ua(r))return r.filters.map((t=>Do(t))).join(",");{const t=r.filters.map((e=>Do(e))).join(",");return`${r.op}(${t})`}}function bh(r,t){return r instanceof K?(function(n,s){return s instanceof K&&n.op===s.op&&n.field.isEqual(s.field)&&Xt(n.value,s.value)})(r,t):r instanceof tt?(function(n,s){return s instanceof tt&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,a,u)=>i&&bh(a,s.filters[u])),!0):!1})(r,t):void M(19439)}function Rh(r,t){const e=r.filters.concat(t);return tt.create(e,r.op)}function Sh(r){return r instanceof K?(function(e){return`${e.field.canonicalString()} ${e.op} ${Vn(e.value)}`})(r):r instanceof tt?(function(e){return e.op.toString()+" {"+e.getFilters().map(Sh).join(" ,")+"}"})(r):"Filter"}class cp extends K{constructor(t,e,n){super(t,e,n),this.key=k.fromName(n.referenceValue)}matches(t){const e=k.comparator(t.key,this.key);return this.matchesComparison(e)}}class lp extends K{constructor(t,e){super(t,"in",e),this.keys=Ph("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class hp extends K{constructor(t,e){super(t,"not-in",e),this.keys=Ph("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Ph(r,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((n=>k.fromName(n.referenceValue)))}class dp extends K{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Ur(e)&&Lr(e.arrayValue,this.value)}}class Vh extends K{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Lr(this.value.arrayValue,e)}}class fp extends K{constructor(t,e){super(t,"not-in",e)}matches(t){if(Lr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Lr(this.value.arrayValue,e)}}class mp extends K{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Ur(e)||!e.arrayValue.values)&&e.arrayValue.values.some((n=>Lr(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(t,e=null,n=[],s=[],i=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Te=null}}function xo(r,t=null,e=[],n=[],s=null,i=null,a=null){return new gp(r,t,e,n,s,i,a)}function Ye(r){const t=F(r);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((n=>Do(n))).join(","),e+="|ob:",e+=t.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),ci(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((n=>Vn(n))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((n=>Vn(n))).join(",")),t.Te=e}return t.Te}function Wr(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!up(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!bh(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!vc(r.startAt,t.startAt)&&vc(r.endAt,t.endAt)}function Gs(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Qs(r,t){return r.filters.filter((e=>e instanceof K&&e.field.isEqual(t)))}function Ac(r,t,e){let n=Vs,s=!0;for(const i of Qs(r,t)){let a=Vs,u=!0;switch(i.op){case"<":case"<=":a=op(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,u=!1;break;case"!=":case"not-in":a=Vs}Ec({value:n,inclusive:s},{value:a,inclusive:u})<0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Ec({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function bc(r,t,e){let n=pe,s=!0;for(const i of Qs(r,t)){let a=pe,u=!0;switch(i.op){case">=":case">":a=ap(i.value),u=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,u=!1;break;case"!=":case"not-in":a=pe}Tc({value:n,inclusive:s},{value:a,inclusive:u})>0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Tc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(t,e=null,n=[],s=[],i=null,a="F",u=null,l=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=l,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Ch(r,t,e,n,s,i,a,u){return new gi(r,t,e,n,s,i,a,u)}function Jr(r){return new gi(r)}function Rc(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function pp(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function _p(r){return r.collectionGroup!==null}function Rr(r){const t=F(r);if(t.Ie===null){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new Z(ot.comparator);return a.filters.forEach((l=>{l.getFlattenedFilters().forEach((d=>{d.isInequality()&&(u=u.add(d.field))}))})),u})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new Ks(i,n))})),e.has(ot.keyField().canonicalString())||t.Ie.push(new Ks(ot.keyField(),n))}return t.Ie}function Mt(r){const t=F(r);return t.Ee||(t.Ee=yp(t,Rr(r))),t.Ee}function yp(r,t){if(r.limitType==="F")return xo(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Ks(s.field,i)}));const e=r.endAt?new Cn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Cn(r.startAt.position,r.startAt.inclusive):null;return xo(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function No(r,t,e){return new gi(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function pi(r,t){return Wr(Mt(r),Mt(t))&&r.limitType===t.limitType}function Dh(r){return`${Ye(Mt(r))}|lt:${r.limitType}`}function fn(r){return`Query(target=${(function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map((s=>Sh(s))).join(", ")}]`),ci(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((s=>Vn(s))).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((s=>Vn(s))).join(",")),`Target(${n})`})(Mt(r))}; limitType=${r.limitType})`}function Xr(r,t){return t.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):k.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,t)&&(function(n,s){for(const i of Rr(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,t)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,t)&&(function(n,s){return!(n.startAt&&!(function(a,u,l){const d=wc(a,u,l);return a.inclusive?d<=0:d<0})(n.startAt,Rr(n),s)||n.endAt&&!(function(a,u,l){const d=wc(a,u,l);return a.inclusive?d>=0:d>0})(n.endAt,Rr(n),s))})(r,t)}function xh(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Nh(r){return(t,e)=>{let n=!1;for(const s of Rr(r)){const i=Ip(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function Ip(r,t,e){const n=r.field.isKeyField()?k.comparator(t.key,e.key):(function(i,a,u){const l=a.data.field(i),d=u.data.field(i);return l!==null&&d!==null?ve(l,d):M(42886)})(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Pe(this.inner,((e,n)=>{for(const[s,i]of n)t(s,i)}))}isEmpty(){return dh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep=new nt(k.comparator);function kt(){return Ep}const kh=new nt(k.comparator);function _r(...r){let t=kh;for(const e of r)t=t.insert(e.key,e);return t}function Oh(r){let t=kh;return r.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function Qt(){return Sr()}function Mh(){return Sr()}function Sr(){return new se((r=>r.toString()),((r,t)=>r.isEqual(t)))}const Tp=new nt(k.comparator),wp=new Z(k.comparator);function $(...r){let t=wp;for(const e of r)t=t.add(e);return t}const vp=new Z(U);function ca(){return vp}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Nr(t)?"-0":t}}function la(r){return{integerValue:""+r}}function Ap(r,t){return eh(t)?la(t):_i(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(){this._=void 0}}function bp(r,t,e){return r instanceof jr?(function(s,i){const a={fields:{[gh]:{stringValue:mh},[_h]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&sa(i)&&(i=fi(i)),i&&(a.fields[ph]=i),{mapValue:a}})(e,t):r instanceof xn?Lh(r,t):r instanceof Nn?Bh(r,t):r instanceof kn?(function(s,i){const a=Fh(s,i),u=Hs(a)+Hs(s.Ae);return Br(a)&&Br(s.Ae)?la(u):_i(s.serializer,u)})(r,t):r instanceof qr?(function(s,i){return Sc(s,i,Math.min)})(r,t):r instanceof zr?(function(s,i){return Sc(s,i,Math.max)})(r,t):void 0}function Rp(r,t,e){return r instanceof xn?Lh(r,t):r instanceof Nn?Bh(r,t):e}function Fh(r,t){return r instanceof kn?Ih(t)?t:{integerValue:0}:null}class jr extends yi{}class xn extends yi{constructor(t){super(),this.elements=t}}function Lh(r,t){const e=Uh(t);for(const n of r.elements)e.some((s=>Xt(s,n)))||e.push(n);return{arrayValue:{values:e}}}class Nn extends yi{constructor(t){super(),this.elements=t}}function Bh(r,t){let e=Uh(t);for(const n of r.elements)e=e.filter((s=>!Xt(s,n)));return{arrayValue:{values:e}}}class ha extends yi{constructor(t,e){super(),this.serializer=t,this.Ae=e}}class kn extends ha{}class qr extends ha{}class zr extends ha{}function Sc(r,t,e){if(!Ih(t))return r.Ae;const n=e(Hs(t),Hs(r.Ae));return Br(t)&&Br(r.Ae)?la(n):_i(r.serializer,n)}function Hs(r){return it(r.integerValue||r.doubleValue)}function Uh(r){return Ur(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(t,e){this.field=t,this.transform=e}}function Pp(r,t){return r.field.isEqual(t.field)&&(function(n,s){return n instanceof xn&&s instanceof xn||n instanceof Nn&&s instanceof Nn?wn(n.elements,s.elements,Xt):n instanceof kn&&s instanceof kn||n instanceof qr&&s instanceof qr||n instanceof zr&&s instanceof zr?Xt(n.Ae,s.Ae):n instanceof jr&&s instanceof jr})(r.transform,t.transform)}class Vp{constructor(t,e){this.version=t,this.transformResults=e}}class yt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new yt}static exists(t){return new yt(void 0,t)}static updateTime(t){return new yt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function xs(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class Ii{}function jh(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new Yr(r.key,yt.none()):new qn(r.key,r.data,yt.none());{const e=r.data,n=At.empty();let s=new Z(ot.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new ie(r.key,n,new Dt(s.toArray()),yt.none())}}function Cp(r,t,e){r instanceof qn?(function(s,i,a){const u=s.value.clone(),l=Vc(s.fieldTransforms,i,a.transformResults);u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(r,t,e):r instanceof ie?(function(s,i,a){if(!xs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=Vc(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(qh(s)),l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(r,t,e):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function Pr(r,t,e,n){return r instanceof qn?(function(i,a,u,l){if(!xs(i.precondition,a))return u;const d=i.value.clone(),m=Cc(i.fieldTransforms,l,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(r,t,e,n):r instanceof ie?(function(i,a,u,l){if(!xs(i.precondition,a))return u;const d=Cc(i.fieldTransforms,l,a),m=a.data;return m.setAll(qh(i)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((g=>g.field)))})(r,t,e,n):(function(i,a,u){return xs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(r,t,e)}function Dp(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=Fh(n.transform,s||null);i!=null&&(e===null&&(e=At.empty()),e.set(n.field,i))}return e||null}function Pc(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&wn(n,s,((i,a)=>Pp(i,a)))})(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class qn extends Ii{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ie extends Ii{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function qh(r){const t=new Map;return r.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}})),t}function Vc(r,t,e){const n=new Map;L(r.length===e.length,32656,{Ve:e.length,de:r.length});for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,u=t.data.field(i.field);n.set(i.field,Rp(a,u,e[s]))}return n}function Cc(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,bp(i,a,t))}return n}class Yr extends Ii{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class zh extends Ii{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Cp(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=Pr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=Pr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Mh();return this.mutations.forEach((s=>{const i=t.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=e.has(s.key)?null:u;const l=jh(a,u);l!==null&&n.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(B.min())})),n}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),$())}isEqual(t){return this.batchId===t.batchId&&wn(this.mutations,t.mutations,((e,n)=>Pc(e,n)))&&wn(this.baseMutations,t.baseMutations,((e,n)=>Pc(e,n)))}}class fa{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){L(t.mutations.length===n.length,58842,{me:t.mutations.length,fe:n.length});let s=(function(){return Tp})();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new fa(t,e,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var dt,Q;function Np(r){switch(r){case P.OK:return M(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return M(15467,{code:r})}}function $h(r){if(r===void 0)return ct("GRPC error has no .code"),P.UNKNOWN;switch(r){case dt.OK:return P.OK;case dt.CANCELLED:return P.CANCELLED;case dt.UNKNOWN:return P.UNKNOWN;case dt.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case dt.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case dt.INTERNAL:return P.INTERNAL;case dt.UNAVAILABLE:return P.UNAVAILABLE;case dt.UNAUTHENTICATED:return P.UNAUTHENTICATED;case dt.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case dt.NOT_FOUND:return P.NOT_FOUND;case dt.ALREADY_EXISTS:return P.ALREADY_EXISTS;case dt.PERMISSION_DENIED:return P.PERMISSION_DENIED;case dt.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case dt.ABORTED:return P.ABORTED;case dt.OUT_OF_RANGE:return P.OUT_OF_RANGE;case dt.UNIMPLEMENTED:return P.UNIMPLEMENTED;case dt.DATA_LOSS:return P.DATA_LOSS;default:return M(39323,{code:r})}}(Q=dt||(dt={}))[Q.OK=0]="OK",Q[Q.CANCELLED=1]="CANCELLED",Q[Q.UNKNOWN=2]="UNKNOWN",Q[Q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Q[Q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Q[Q.NOT_FOUND=5]="NOT_FOUND",Q[Q.ALREADY_EXISTS=6]="ALREADY_EXISTS",Q[Q.PERMISSION_DENIED=7]="PERMISSION_DENIED",Q[Q.UNAUTHENTICATED=16]="UNAUTHENTICATED",Q[Q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Q[Q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Q[Q.ABORTED=10]="ABORTED",Q[Q.OUT_OF_RANGE=11]="OUT_OF_RANGE",Q[Q.UNIMPLEMENTED=12]="UNIMPLEMENTED",Q[Q.INTERNAL=13]="INTERNAL",Q[Q.UNAVAILABLE=14]="UNAVAILABLE",Q[Q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kp(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Op=new Ie([4294967295,4294967295],0);function Dc(r){const t=kp().encode(r),e=new Ul;return e.update(t),new Uint8Array(e.digest())}function xc(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Ie([e,n],0),new Ie([s,i],0)]}class ga{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new yr(`Invalid padding: ${e}`);if(n<0)throw new yr(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new yr(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new yr(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Ie.fromNumber(this.ge)}ye(t,e,n){let s=t.add(e.multiply(Ie.fromNumber(n)));return s.compare(Op)===1&&(s=new Ie([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Dc(t),[n,s]=xc(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);if(!this.we(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new ga(i,s,e);return n.forEach((u=>a.insert(u))),a}insert(t){if(this.ge===0)return;const e=Dc(t),[n,s]=xc(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);this.Se(a)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class yr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,Zr.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new zn(B.min(),s,new nt(U),kt(),$())}}class Zr{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Zr(n,e,$(),$(),$())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(t,e,n,s){this.be=t,this.removedTargetIds=e,this.key=n,this.De=s}}class Kh{constructor(t,e){this.targetId=t,this.Ce=e}}class Gh{constructor(t,e,n=ht.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class Nc{constructor(t){this.targetId=t,this.ve=0,this.Fe=kc(),this.Me=ht.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=$(),e=$(),n=$();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:M(38017,{changeType:i})}})),new Zr(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=kc()}Ke(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,L(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const cr="WatchChangeAggregator";class Mp{constructor(t){this.Ge=t,this.ze=new Map,this.je=kt(),this.Je=Es(),this.He=Es(),this.Ze=new nt(U)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const n=this.ze.get(e);if(n)switch(t.state){case 0:this.nt(e)&&n.Le(t.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(e);break;case 3:this.nt(e)&&(n.Qe(),n.Le(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),n.Le(t.resumeToken));break;default:M(56790,{state:t.state})}else V(cr,`handleTargetChange received targetChange for untracked target ID (${e}) with state (${t.state})`)}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((n,s)=>{this.nt(s)&&e(s)}))}it(t){const e=t.targetId,n=t.Ce.count,s=this.st(e);if(s){const i=s.target;if(Gs(i))if(n===0){const a=new k(i.path);this.et(e,a,ut.newNoDocument(a,B.min()))}else L(n===1,20013,{expectedCount:n});else{const a=this.ot(e);if(a!==n){const u=this._t(t),l=u?this.ut(u,t,a):1;if(l!==0){this.rt(e);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,d)}}}}}_t(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,u;try{a=ee(n).toUint8Array()}catch(l){if(l instanceof fh)return Tn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new ga(a,s,i)}catch(l){return Tn(l instanceof yr?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.ge===0?null:u}ut(t,e,n){return e.Ce.count===n-this.ht(t,e.targetId)?0:2}ht(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let s=0;return n.forEach((i=>{const a=this.Ge.lt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.et(e,i,null),s++)})),s}Pt(t){const e=new Map;this.ze.forEach(((i,a)=>{const u=this.st(a);if(u){if(i.current&&Gs(u.target)){const l=new k(u.target.path);this.Tt(l).has(a)||this.It(a,l)||this.et(a,l,ut.newNoDocument(l,t))}i.Be&&(e.set(a,i.ke()),i.qe())}}));let n=$();this.He.forEach(((i,a)=>{let u=!0;a.forEachWhile((l=>{const d=this.st(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(n=n.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(t)));const s=new zn(t,e,this.Ze,this.je,n);return this.je=kt(),this.Je=Es(),this.He=Es(),this.Ze=new nt(U),s}Ye(t,e){const n=this.ze.get(t);if(!n||!this.nt(t))return void V(cr,`addDocumentToTarget received document for unknown inactive target (${t})`);const s=this.It(t,e.key)?2:0;n.Ke(e.key,s),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Tt(e.key).add(t)),this.He=this.He.insert(e.key,this.Et(e.key).add(t))}et(t,e,n){const s=this.ze.get(t);s&&this.nt(t)?(this.It(t,e)?s.Ke(e,1):s.Ue(e),this.He=this.He.insert(e,this.Et(e).delete(t)),this.He=this.He.insert(e,this.Et(e).add(t)),n&&(this.je=this.je.insert(e,n))):V(cr,`removeDocumentFromTarget received document for unknown or inactive target (${t})`)}removeTarget(t){this.ze.delete(t)}ot(t){const e=this.ze.get(t);if(!e)return 0;const n=e.ke();return this.Ge.getRemoteKeysForTarget(t).size+n.addedDocuments.size-n.removedDocuments.size}$e(t){let e=this.ze.get(t);e||(V(cr,`recordPendingTargetRequest set up tracking for target ID ${t}`),e=new Nc(t),this.ze.set(t,e)),e.$e()}Et(t){let e=this.He.get(t);return e||(e=new Z(U),this.He=this.He.insert(t,e)),e}Tt(t){let e=this.Je.get(t);return e||(e=new Z(U),this.Je=this.Je.insert(t,e)),e}nt(t){const e=this.st(t)!==null;return e||V(cr,"Detected inactive target",t),e}st(t){const e=this.ze.get(t);return e===void 0||e.Ne?null:this.Ge.Rt(t)}rt(t){this.ze.set(t,new Nc(t)),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}It(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Es(){return new nt(k.comparator)}function kc(){return new nt(k.comparator)}const Fp={asc:"ASCENDING",desc:"DESCENDING"},Lp={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Bp={and:"AND",or:"OR"};class Up{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ko(r,t){return r.useProto3Json||ci(t)?t:{value:t}}function On(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Qh(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function jp(r,t){return On(r,t.toTimestamp())}function Pt(r){return L(!!r,49232),B.fromTimestamp((function(e){const n=te(e);return new Y(n.seconds,n.nanos)})(r))}function pa(r,t){return Oo(r,t).canonicalString()}function Oo(r,t){const e=(function(s){return new X(["projects",s.projectId,"databases",s.database])})(r).child("documents");return t===void 0?e:e.child(t)}function Hh(r){const t=X.fromString(r);return L(rd(t),10190,{key:t.toString()}),t}function Ws(r,t){return pa(r.databaseId,t.path)}function Qe(r,t){const e=Hh(t);if(e.get(1)!==r.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new k(Xh(e))}function Wh(r,t){return pa(r.databaseId,t)}function Jh(r){const t=Hh(r);return t.length===4?X.emptyPath():Xh(t)}function Mo(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Xh(r){return L(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Oc(r,t,e){return{name:Ws(r,t),fields:e.value.mapValue.fields}}function qp(r,t,e){const n=Qe(r,t.name),s=Pt(t.updateTime),i=t.createTime?Pt(t.createTime):B.min(),a=new At({mapValue:{fields:t.fields}}),u=ut.newFoundDocument(n,s,i,a);return e&&u.setHasCommittedMutations(),e?u.setHasCommittedMutations():u}function zp(r,t){let e;if("targetChange"in t){t.targetChange;const n=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:M(39313,{state:d})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(d,m){return d.useProto3Json?(L(m===void 0||typeof m=="string",58123),ht.fromBase64String(m||"")):(L(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),ht.fromUint8Array(m||new Uint8Array))})(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&(function(d){const m=d.code===void 0?P.UNKNOWN:$h(d.code);return new N(m,d.message||"")})(a);e=new Gh(n,s,i,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=Qe(r,n.document.name),i=Pt(n.document.updateTime),a=n.document.createTime?Pt(n.document.createTime):B.min(),u=new At({mapValue:{fields:n.document.fields}}),l=ut.newFoundDocument(s,i,a,u),d=n.targetIds||[],m=n.removedTargetIds||[];e=new Ns(d,m,l.key,l)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=Qe(r,n.document),i=n.readTime?Pt(n.readTime):B.min(),a=ut.newNoDocument(s,i),u=n.removedTargetIds||[];e=new Ns([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=Qe(r,n.document),i=n.removedTargetIds||[];e=new Ns([],i,s,null)}else{if(!("filter"in t))return M(11601,{At:t});{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new xp(s,i),u=n.targetId;e=new Kh(u,a)}}return e}function Js(r,t){let e;if(t instanceof qn)e={update:Oc(r,t.key,t.value)};else if(t instanceof Yr)e={delete:Ws(r,t.key)};else if(t instanceof ie)e={update:Oc(r,t.key,t.data),updateMask:Wp(t.fieldMask)};else{if(!(t instanceof zh))return M(16599,{Vt:t.type});e={verify:Ws(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((n=>(function(i,a){const u=a.transform;if(u instanceof jr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof xn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Nn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof kn)return{fieldPath:a.field.canonicalString(),increment:u.Ae};if(u instanceof qr)return{fieldPath:a.field.canonicalString(),minimum:u.Ae};if(u instanceof zr)return{fieldPath:a.field.canonicalString(),maximum:u.Ae};throw M(20930,{transform:a.transform})})(0,n)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:jp(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:M(27497)})(r,t.precondition)),e}function Fo(r,t){const e=t.currentDocument?(function(i){return i.updateTime!==void 0?yt.updateTime(Pt(i.updateTime)):i.exists!==void 0?yt.exists(i.exists):yt.none()})(t.currentDocument):yt.none(),n=t.updateTransforms?t.updateTransforms.map((s=>(function(a,u){let l=null;if("setToServerValue"in u)L(u.setToServerValue==="REQUEST_TIME",16630,{proto:u}),l=new jr;else if("appendMissingElements"in u){const m=u.appendMissingElements.values||[];l=new xn(m)}else if("removeAllFromArray"in u){const m=u.removeAllFromArray.values||[];l=new Nn(m)}else"increment"in u?l=new kn(a,u.increment):"minimum"in u?l=new qr(a,u.minimum):"maximum"in u?l=new zr(a,u.maximum):M(16584,{proto:u});const d=ot.fromServerFormat(u.fieldPath);return new Sp(d,l)})(r,s))):[];if(t.update){t.update.name;const s=Qe(r,t.update.name),i=new At({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=(function(l){const d=l.fieldPaths||[];return new Dt(d.map((m=>ot.fromServerFormat(m))))})(t.updateMask);return new ie(s,i,a,e,n)}return new qn(s,i,e,n)}if(t.delete){const s=Qe(r,t.delete);return new Yr(s,e)}if(t.verify){const s=Qe(r,t.verify);return new zh(s,e)}return M(1463,{proto:t})}function $p(r,t){return r&&r.length>0?(L(t!==void 0,14353),r.map((e=>(function(s,i){let a=s.updateTime?Pt(s.updateTime):Pt(i);return a.isEqual(B.min())&&(a=Pt(i)),new Vp(a,s.transformResults||[])})(e,t)))):[]}function Yh(r,t){return{documents:[Wh(r,t.path)]}}function Zh(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=Wh(r,s);const i=(function(d){if(d.length!==0)return nd(tt.create(d,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const a=(function(d){if(d.length!==0)return d.map((m=>(function(E){return{field:mn(E.field),direction:Gp(E.dir)}})(m)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=ko(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(t.endAt)),{dt:e,parent:s}}function td(r){let t=Jh(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){L(n===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let i=[];e.where&&(i=(function(g){const E=ed(g);return E instanceof tt&&ua(E)?E.getFilters():[E]})(e.where));let a=[];e.orderBy&&(a=(function(g){return g.map((E=>(function(C){return new Ks(gn(C.field),(function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(E)))})(e.orderBy));let u=null;e.limit&&(u=(function(g){let E;return E=typeof g=="object"?g.value:g,ci(E)?null:E})(e.limit));let l=null;e.startAt&&(l=(function(g){const E=!!g.before,S=g.values||[];return new Cn(S,E)})(e.startAt));let d=null;return e.endAt&&(d=(function(g){const E=!g.before,S=g.values||[];return new Cn(S,E)})(e.endAt)),Ch(t,s,a,i,u,"F",l,d)}function Kp(r,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function ed(r){return r.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=gn(e.unaryFilter.field);return K.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=gn(e.unaryFilter.field);return K.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=gn(e.unaryFilter.field);return K.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=gn(e.unaryFilter.field);return K.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}})(r):r.fieldFilter!==void 0?(function(e){return K.create(gn(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(e){return tt.create(e.compositeFilter.filters.map((n=>ed(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}})(e.compositeFilter.op))})(r):M(30097,{filter:r})}function Gp(r){return Fp[r]}function Qp(r){return Lp[r]}function Hp(r){return Bp[r]}function mn(r){return{fieldPath:r.canonicalString()}}function gn(r){return ot.fromServerFormat(r.fieldPath)}function nd(r){return r instanceof K?(function(e){if(e.op==="=="){if(Ic(e.value))return{unaryFilter:{field:mn(e.field),op:"IS_NAN"}};if(yc(e.value))return{unaryFilter:{field:mn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Ic(e.value))return{unaryFilter:{field:mn(e.field),op:"IS_NOT_NAN"}};if(yc(e.value))return{unaryFilter:{field:mn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:mn(e.field),op:Qp(e.op),value:e.value}}})(r):r instanceof tt?(function(e){const n=e.getFilters().map((s=>nd(s)));return n.length===1?n[0]:{compositeFilter:{op:Hp(e.op),filters:n}}})(r):M(54877,{filter:r})}function Wp(r){const t=[];return r.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function rd(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function sd(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(t,e,n,s,i=B.min(),a=B.min(),u=ht.EMPTY_BYTE_STRING,l=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(t){return new Ht(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(t){this.gt=t}}function Jp(r,t){let e;if(t.document)e=qp(r.gt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=k.fromSegments(t.noDocument.path),s=tn(t.noDocument.readTime);e=ut.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return M(56709);{const n=k.fromSegments(t.unknownDocument.path),s=tn(t.unknownDocument.version);e=ut.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime((function(s){const i=new Y(s[0],s[1]);return B.fromTimestamp(i)})(t.readTime)),e}function Mc(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:Xs(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=(function(i,a){return{name:Ws(i,a.key),fields:a.data.value.mapValue.fields,updateTime:On(i,a.version.toTimestamp()),createTime:On(i,a.createTime.toTimestamp())}})(r.gt,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:Ze(t.version)};else{if(!t.isUnknownDocument())return M(57904,{document:t});n.unknownDocument={path:e.path.toArray(),version:Ze(t.version)}}return n}function Xs(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function Ze(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function tn(r){const t=new Y(r.seconds,r.nanoseconds);return B.fromTimestamp(t)}function je(r,t){const e=(t.baseMutations||[]).map((i=>Fo(r.gt,i)));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const u=t.mutations[i+1];a.updateTransforms=u.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map((i=>Fo(r.gt,i))),s=Y.fromMillis(t.localWriteTimeMs);return new da(t.batchId,s,e,n)}function Ir(r){const t=tn(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?tn(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const a=i.documents.length;return L(a===1,1966,{count:a}),Mt(Jr(Jh(i.documents[0])))})(r.query):(function(i){return Mt(td(i))})(r.query),new Ht(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,ht.fromBase64String(r.resumeToken))}function od(r,t){const e=Ze(t.snapshotVersion),n=Ze(t.lastLimboFreeSnapshotVersion);let s;s=Gs(t.target)?Yh(r.gt,t.target):Zh(r.gt,t.target).dt;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:Ye(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function ad(r){const t=td({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?No(t,t.limit,"L"):t}function ao(r,t){return new ma(t.largestBatchId,Fo(r.gt,t.overlayMutation))}function Fc(r,t){const e=t.path.lastSegment();return[r,bt(t.path.popLast()),e]}function Lc(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:Ze(n.readTime),documentKey:bt(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp{getBundleMetadata(t,e){return Bc(t).get(e).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:tn(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(t,e){return Bc(t).put((function(s){return{bundleId:s.id,createTime:Ze(Pt(s.createTime)),version:s.version}})(e))}getNamedQuery(t,e){return Uc(t).get(e).next((n=>{if(n)return(function(i){return{name:i.name,query:ad(i.bundledQuery),readTime:tn(i.readTime)}})(n)}))}saveNamedQuery(t,e){return Uc(t).put((function(s){return{name:s.name,readTime:Ze(Pt(s.readTime)),bundledQuery:s.bundledQuery}})(e))}}function Bc(r){return gt(r,li)}function Uc(r){return gt(r,hi)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(t,e){this.serializer=t,this.userId=e}static yt(t,e){const n=e.uid||"";return new Ei(t,n)}getOverlay(t,e){return lr(t).get(Fc(this.userId,e)).next((n=>n?ao(this.serializer,n):null))}getOverlays(t,e){const n=Qt();return v.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(t,e,n){const s=[];return n.forEach(((i,a)=>{const u=new ma(e,a);s.push(this.wt(t,u))})),v.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach((a=>s.add(bt(a.getCollectionPath()))));const i=[];return s.forEach((a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(lr(t).X(So,u))})),v.waitFor(i)}getOverlaysForCollection(t,e,n){const s=Qt(),i=bt(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return lr(t).J(So,a).next((u=>{for(const l of u){const d=ao(this.serializer,l);s.set(d.getKey(),d)}return s}))}getOverlaysForCollectionGroup(t,e,n,s){const i=Qt();let a;const u=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return lr(t).ee({index:ah,range:u},((l,d,m)=>{const g=ao(this.serializer,d);i.size()<s||g.largestBatchId===a?(i.set(g.getKey(),g),a=g.largestBatchId):m.done()})).next((()=>i))}wt(t,e){return lr(t).put((function(s,i,a){const[u,l,d]=Fc(i,a.mutation.key);return{userId:i,collectionPath:l,documentId:d,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:Js(s.gt,a.mutation)}})(this.serializer,this.userId,e))}}function lr(r){return gt(r,di)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{St(t){return gt(t,na)}getSessionToken(t){return this.St(t).get("sessionToken").next((e=>{const n=e==null?void 0:e.value;return n?ht.fromUint8Array(n):ht.EMPTY_BYTE_STRING}))}setSessionToken(t,e){return this.St(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(){}bt(t,e){this.Dt(t,e),e.Ct()}Dt(t,e){if("nullValue"in t)this.vt(e,5);else if("booleanValue"in t)this.vt(e,10),e.Ft(t.booleanValue?1:0);else if("integerValue"in t)this.vt(e,15),e.Ft(it(t.integerValue));else if("doubleValue"in t){const n=it(t.doubleValue);isNaN(n)?this.vt(e,13):(this.vt(e,15),Nr(n)?e.Ft(0):e.Ft(n))}else if("timestampValue"in t){let n=t.timestampValue;this.vt(e,20),typeof n=="string"&&(n=te(n)),e.Mt(`${n.seconds||""}`),e.Ft(n.nanos||0)}else if("stringValue"in t)this.xt(t.stringValue,e),this.Ot(e);else if("bytesValue"in t)this.vt(e,30),e.Nt(ee(t.bytesValue)),this.Ot(e);else if("referenceValue"in t)this.Bt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.vt(e,45),e.Ft(n.latitude||0),e.Ft(n.longitude||0)}else"mapValue"in t?Eh(t)?this.vt(e,Number.MAX_SAFE_INTEGER):mi(t)?this.Lt(t.mapValue,e):(this.kt(t.mapValue,e),this.Ot(e)):"arrayValue"in t?(this.qt(t.arrayValue,e),this.Ot(e)):M(19022,{Kt:t})}xt(t,e){this.vt(e,25),this.Ut(t,e)}Ut(t,e){e.Mt(t)}kt(t,e){const n=t.fields||{};this.vt(e,55);for(const s of Object.keys(n))this.xt(s,e),this.Dt(n[s],e)}Lt(t,e){var a,u;const n=t.fields||{};this.vt(e,53);const s=Pn,i=((u=(a=n[s].arrayValue)==null?void 0:a.values)==null?void 0:u.length)||0;this.vt(e,15),e.Ft(it(i)),this.xt(s,e),this.Dt(n[s],e)}qt(t,e){const n=t.values||[];this.vt(e,50);for(const s of n)this.Dt(s,e)}Bt(t,e){this.vt(e,37),k.fromName(t).path.forEach((n=>{this.vt(e,60),this.Ut(n,e)}))}vt(t,e){t.Ft(e)}Ot(t){t.Ft(2)}}qe.$t=new qe;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un=255;function Zp(r){if(r===0)return 8;let t=0;return r>>4||(t+=4,r<<=4),r>>6||(t+=2,r<<=2),r>>7||(t+=1),t}function jc(r){const t=64-(function(n){let s=0;for(let i=0;i<8;++i){const a=Zp(255&n[i]);if(s+=a,a!==8)break}return s})(r);return Math.ceil(t/8)}class t_{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Qt(n.value),n=e.next();this.Gt()}zt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.jt(n.value),n=e.next();this.Jt()}Ht(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Qt(n);else if(n<2048)this.Qt(960|n>>>6),this.Qt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Qt(480|n>>>12),this.Qt(128|63&n>>>6),this.Qt(128|63&n);else{const s=e.codePointAt(0);this.Qt(240|s>>>18),this.Qt(128|63&s>>>12),this.Qt(128|63&s>>>6),this.Qt(128|63&s)}}this.Gt()}Zt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.jt(n);else if(n<2048)this.jt(960|n>>>6),this.jt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.jt(480|n>>>12),this.jt(128|63&n>>>6),this.jt(128|63&n);else{const s=e.codePointAt(0);this.jt(240|s>>>18),this.jt(128|63&s>>>12),this.jt(128|63&s>>>6),this.jt(128|63&s)}}this.Jt()}Xt(t){const e=this.Yt(t),n=jc(e);this.en(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}tn(t){const e=this.Yt(t),n=jc(e);this.en(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}nn(){this.rn(un),this.rn(255)}sn(){this._n(un),this._n(255)}reset(){this.position=0}seed(t){this.en(t.length),this.buffer.set(t,this.position),this.position+=t.length}an(){return this.buffer.slice(0,this.position)}Yt(t){const e=(function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)})(t),n=!!(128&e[0]);e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}Qt(t){const e=255&t;e===0?(this.rn(0),this.rn(255)):e===un?(this.rn(un),this.rn(0)):this.rn(e)}jt(t){const e=255&t;e===0?(this._n(0),this._n(255)):e===un?(this._n(un),this._n(0)):this._n(t)}Gt(){this.rn(0),this.rn(1)}Jt(){this._n(0),this._n(1)}rn(t){this.en(1),this.buffer[this.position++]=t}_n(t){this.en(1),this.buffer[this.position++]=~t}en(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class e_{constructor(t){this.un=t}Nt(t){this.un.Wt(t)}Mt(t){this.un.Ht(t)}Ft(t){this.un.Xt(t)}Ct(){this.un.nn()}}class n_{constructor(t){this.un=t}Nt(t){this.un.zt(t)}Mt(t){this.un.Zt(t)}Ft(t){this.un.tn(t)}Ct(){this.un.sn()}}class hr{constructor(){this.un=new t_,this.ascending=new e_(this.un),this.descending=new n_(this.un)}seed(t){this.un.seed(t)}cn(t){return t===0?this.ascending:this.descending}an(){return this.un.an()}reset(){this.un.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(t,e,n,s){this.ln=t,this.hn=e,this.Pn=n,this.Tn=s}In(){const t=this.Tn.length,e=t===0||this.Tn[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.Tn,0),e!==t?n.set([0],this.Tn.length):++n[n.length-1],new ze(this.ln,this.hn,this.Pn,n)}En(t,e,n){return{indexId:this.ln,uid:t,arrayValue:ks(this.Pn),directionalValue:ks(this.Tn),orderedDocumentKey:ks(e),documentKey:n.path.toArray()}}Rn(t,e,n){const s=this.En(t,e,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function de(r,t){let e=r.ln-t.ln;return e!==0?e:(e=qc(r.Pn,t.Pn),e!==0?e:(e=qc(r.Tn,t.Tn),e!==0?e:k.comparator(r.hn,t.hn)))}function qc(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}function ks(r){return Dl()?(function(e){let n="";for(let s=0;s<e.length;s++)n+=String.fromCharCode(e[s]);return n})(r):r}function zc(r){return typeof r!="string"?r:(function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n})(r)}class $c{constructor(t){this.An=new Z(((e,n)=>ot.comparator(e.field,n.field))),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.Vn=t.orderBy,this.dn=[];for(const e of t.filters){const n=e;n.isInequality()?this.An=this.An.add(n):this.dn.push(n)}}get mn(){return this.An.size>1}fn(t){if(L(t.collectionGroup===this.collectionId,49279),this.mn)return!1;const e=Ao(t);if(e!==void 0&&!this.gn(e))return!1;const n=Le(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.gn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.An.size>0){const u=this.An.getIterator().getNext();if(!s.has(u.field.canonicalString())){const l=n[i];if(!this.pn(u,l)||!this.yn(this.Vn[a++],l))return!1}++i}for(;i<n.length;++i){const u=n[i];if(a>=this.Vn.length||!this.yn(this.Vn[a++],u))return!1}return!0}wn(){if(this.mn)return null;let t=new Z(ot.comparator);const e=[];for(const n of this.dn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new Rs(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new Rs(n.field,0))}for(const n of this.Vn)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new Rs(n.field,n.dir==="asc"?0:1)));return new Us(Us.UNKNOWN_ID,this.collectionId,e,xr.empty())}gn(t){for(const e of this.dn)if(this.pn(e,t))return!0;return!1}pn(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}yn(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ud(r){var e,n;if(L(r instanceof K||r instanceof tt,20012),r instanceof K){if(r instanceof Vh){const s=((n=(e=r.value.arrayValue)==null?void 0:e.values)==null?void 0:n.map((i=>K.create(r.field,"==",i))))||[];return tt.create(s,"or")}return r}const t=r.filters.map((s=>ud(s)));return tt.create(t,r.op)}function r_(r){if(r.getFilters().length===0)return[];const t=Uo(ud(r));return L(cd(t),7391),Lo(t)||Bo(t)?[t]:t.getFilters()}function Lo(r){return r instanceof K}function Bo(r){return r instanceof tt&&ua(r)}function cd(r){return Lo(r)||Bo(r)||(function(e){if(e instanceof tt&&Co(e)){for(const n of e.getFilters())if(!Lo(n)&&!Bo(n))return!1;return!0}return!1})(r)}function Uo(r){if(L(r instanceof K||r instanceof tt,34018),r instanceof K)return r;if(r.filters.length===1)return Uo(r.filters[0]);const t=r.filters.map((n=>Uo(n)));let e=tt.create(t,r.op);return e=Ys(e),cd(e)?e:(L(e instanceof tt,64498),L(Dn(e),40251),L(e.filters.length>1,57927),e.filters.reduce(((n,s)=>_a(n,s))))}function _a(r,t){let e;return L(r instanceof K||r instanceof tt,38388),L(t instanceof K||t instanceof tt,25473),e=r instanceof K?t instanceof K?(function(s,i){return tt.create([s,i],"and")})(r,t):Kc(r,t):t instanceof K?Kc(t,r):(function(s,i){if(L(s.filters.length>0&&i.filters.length>0,48005),Dn(s)&&Dn(i))return Rh(s,i.getFilters());const a=Co(s)?s:i,u=Co(s)?i:s,l=a.filters.map((d=>_a(d,u)));return tt.create(l,"or")})(r,t),Ys(e)}function Kc(r,t){if(Dn(t))return Rh(t,r.getFilters());{const e=t.filters.map((n=>_a(r,n)));return tt.create(e,"or")}}function Ys(r){if(L(r instanceof K||r instanceof tt,11850),r instanceof K)return r;const t=r.getFilters();if(t.length===1)return Ys(t[0]);if(Ah(r))return r;const e=t.map((s=>Ys(s))),n=[];return e.forEach((s=>{s instanceof K?n.push(s):s instanceof tt&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:tt.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(){this.Sn=new ya}addToCollectionParentIndex(t,e){return this.Sn.add(e),v.resolve()}getCollectionParents(t,e){return v.resolve(this.Sn.getEntries(e))}addFieldIndex(t,e){return v.resolve()}deleteFieldIndex(t,e){return v.resolve()}deleteAllFieldIndexes(t){return v.resolve()}createTargetIndexes(t,e){return v.resolve()}getDocumentsMatchingTarget(t,e){return v.resolve(null)}getIndexType(t,e){return v.resolve(0)}getFieldIndexes(t,e){return v.resolve([])}getNextCollectionGroupToUpdate(t){return v.resolve(null)}getMinOffset(t,e){return v.resolve(Ft.min())}getMinOffsetFromCollectionGroup(t,e){return v.resolve(Ft.min())}updateCollectionGroup(t,e,n){return v.resolve()}updateIndexEntries(t,e){return v.resolve()}}class ya{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new Z(X.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new Z(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc="IndexedDbIndexManager",Ts=new Uint8Array(0);class i_{constructor(t,e){this.databaseId=e,this.bn=new ya,this.Dn=new se((n=>Ye(n)),((n,s)=>Wr(n,s))),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.bn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener((()=>{this.bn.add(e)}));const i={collectionId:n,parent:bt(s)};return Qc(t).put(i)}return v.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[Ql(e),""],!1,!0);return Qc(t).J(s).next((i=>{for(const a of i){if(a.collectionId!==e)break;n.push(Gt(a.parent))}return n}))}addFieldIndex(t,e){const n=dr(t),s=(function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map((l=>[l.fieldPath.canonicalString(),l.kind]))}})(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=ln(t);return i.next((u=>{a.put(Lc(u,this.uid,e.indexState.sequenceNumber,e.indexState.offset))}))}return i.next()}deleteFieldIndex(t,e){const n=dr(t),s=ln(t),i=cn(t);return n.delete(e.indexId).next((()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))))}deleteAllFieldIndexes(t){const e=dr(t),n=cn(t),s=ln(t);return e.X().next((()=>n.X())).next((()=>s.X()))}createTargetIndexes(t,e){return v.forEach(this.Cn(e),(n=>this.getIndexType(t,n).next((s=>{if(s===0||s===1){const i=new $c(n).wn();if(i!=null)return this.addFieldIndex(t,i)}}))))}getDocumentsMatchingTarget(t,e){const n=cn(t);let s=!0;const i=new Map;return v.forEach(this.Cn(e),(a=>this.vn(t,a).next((u=>{s&&(s=!!u),i.set(a,u)})))).next((()=>{if(s){let a=$();const u=[];return v.forEach(i,((l,d)=>{V(Gc,`Using index ${(function(j){return`id=${j.indexId}|cg=${j.collectionGroup}|f=${j.fields.map((rt=>`${rt.fieldPath}:${rt.kind}`)).join(",")}`})(l)} to execute ${Ye(e)}`);const m=(function(j,rt){const W=Ao(rt);if(W===void 0)return null;for(const J of Qs(j,W.fieldPath))switch(J.op){case"array-contains-any":return J.value.arrayValue.values||[];case"array-contains":return[J.value]}return null})(d,l),g=(function(j,rt){const W=new Map;for(const J of Le(rt))for(const I of Qs(j,J.fieldPath))switch(I.op){case"==":case"in":W.set(J.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return W.set(J.fieldPath.canonicalString(),I.value),Array.from(W.values())}return null})(d,l),E=(function(j,rt){const W=[];let J=!0;for(const I of Le(rt)){const p=I.kind===0?Ac(j,I.fieldPath,j.startAt):bc(j,I.fieldPath,j.startAt);W.push(p.value),J&&(J=p.inclusive)}return new Cn(W,J)})(d,l),S=(function(j,rt){const W=[];let J=!0;for(const I of Le(rt)){const p=I.kind===0?bc(j,I.fieldPath,j.endAt):Ac(j,I.fieldPath,j.endAt);W.push(p.value),J&&(J=p.inclusive)}return new Cn(W,J)})(d,l),C=this.Fn(l,d,E),O=this.Fn(l,d,S),x=this.Mn(l,d,g),G=this.xn(l.indexId,m,C,E.inclusive,O,S.inclusive,x);return v.forEach(G,(q=>n.Z(q,e.limit).next((j=>{j.forEach((rt=>{const W=k.fromSegments(rt.documentKey);a.has(W)||(a=a.add(W),u.push(W))}))}))))})).next((()=>u))}return v.resolve(null)}))}Cn(t){let e=this.Dn.get(t);return e||(t.filters.length===0?e=[t]:e=r_(tt.create(t.filters,"and")).map((n=>xo(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt))),this.Dn.set(t,e),e)}xn(t,e,n,s,i,a,u){const l=(e!=null?e.length:1)*Math.max(n.length,i.length),d=l/(e!=null?e.length:1),m=[];for(let g=0;g<l;++g){const E=e?this.On(e[g/d]):Ts,S=this.Nn(t,E,n[g%d],s),C=this.Bn(t,E,i[g%d],a),O=u.map((x=>this.Nn(t,E,x,!0)));m.push(...this.createRange(S,C,O))}return m}Nn(t,e,n,s){const i=new ze(t,k.empty(),e,n);return s?i:i.In()}Bn(t,e,n,s){const i=new ze(t,k.empty(),e,n);return s?i.In():i}vn(t,e){const n=new $c(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next((i=>{let a=null;for(const u of i)n.fn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a}))}getIndexType(t,e){let n=2;const s=this.Cn(e);return v.forEach(s,(i=>this.vn(t,i).next((a=>{a?n!==0&&a.fields.length<(function(l){let d=new Z(ot.comparator),m=!1;for(const g of l.filters)for(const E of g.getFlattenedFilters())E.field.isKeyField()||(E.op==="array-contains"||E.op==="array-contains-any"?m=!0:d=d.add(E.field));for(const g of l.orderBy)g.field.isKeyField()||(d=d.add(g.field));return d.size+(m?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(a){return a.limit!==null})(e)&&s.length>1&&n===2?1:n))}Ln(t,e){const n=new hr;for(const s of Le(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.cn(s.kind);qe.$t.bt(i,a)}return n.an()}On(t){const e=new hr;return qe.$t.bt(t,e.cn(0)),e.an()}kn(t,e){const n=new hr;return qe.$t.bt(aa(this.databaseId,e),n.cn((function(i){const a=Le(i);return a.length===0?0:a[a.length-1].kind})(t))),n.an()}Mn(t,e,n){if(n===null)return[];let s=[];s.push(new hr);let i=0;for(const a of Le(t)){const u=n[i++];for(const l of s)if(this.qn(e,a.fieldPath)&&Ur(u))s=this.Kn(s,a,u);else{const d=l.cn(a.kind);qe.$t.bt(u,d)}}return this.Un(s)}Fn(t,e,n){return this.Mn(t,e,n.position)}Un(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].an();return e}Kn(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const u of s){const l=new hr;l.seed(u.an()),qe.$t.bt(a,l.cn(e.kind)),i.push(l)}return i}qn(t,e){return!!t.filters.find((n=>n instanceof K&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(t,e){const n=dr(t),s=ln(t);return(e?n.J(Ro,IDBKeyRange.bound(e,e)):n.J()).next((i=>{const a=[];return v.forEach(i,(u=>s.get([u.indexId,this.uid]).next((l=>{a.push((function(m,g){const E=g?new xr(g.sequenceNumber,new Ft(tn(g.readTime),new k(Gt(g.documentKey)),g.largestBatchId)):xr.empty(),S=m.fields.map((([C,O])=>new Rs(ot.fromServerFormat(C),O)));return new Us(m.indexId,m.collectionGroup,S,E)})(u,l))})))).next((()=>a))}))}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next((e=>e.length===0?null:(e.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:U(n.collectionGroup,s.collectionGroup)})),e[0].collectionGroup)))}updateCollectionGroup(t,e,n){const s=dr(t),i=ln(t);return this.$n(t).next((a=>s.J(Ro,IDBKeyRange.bound(e,e)).next((u=>v.forEach(u,(l=>i.put(Lc(l.indexId,this.uid,a,n))))))))}updateIndexEntries(t,e){const n=new Map;return v.forEach(e,((s,i)=>{const a=n.get(s.collectionGroup);return(a?v.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next((u=>(n.set(s.collectionGroup,u),v.forEach(u,(l=>this.Wn(t,s,l).next((d=>{const m=this.Qn(i,l);return d.isEqual(m)?v.resolve():this.Gn(t,i,l,d,m)})))))))}))}zn(t,e,n,s){return cn(t).put(s.En(this.uid,this.kn(n,e.key),e.key))}jn(t,e,n,s){return cn(t).delete(s.Rn(this.uid,this.kn(n,e.key),e.key))}Wn(t,e,n){const s=cn(t);let i=new Z(de);return s.ee({index:oh,range:IDBKeyRange.only([n.indexId,this.uid,ks(this.kn(n,e))])},((a,u)=>{i=i.add(new ze(n.indexId,e,zc(u.arrayValue),zc(u.directionalValue)))})).next((()=>i))}Qn(t,e){let n=new Z(de);const s=this.Ln(e,t);if(s==null)return n;const i=Ao(e);if(i!=null){const a=t.data.field(i.fieldPath);if(Ur(a))for(const u of a.arrayValue.values||[])n=n.add(new ze(e.indexId,t.key,this.On(u),s))}else n=n.add(new ze(e.indexId,t.key,Ts,s));return n}Gn(t,e,n,s,i){V(Gc,"Updating index entries for document '%s'",e.key);const a=[];return(function(l,d,m,g,E){const S=l.getIterator(),C=d.getIterator();let O=an(S),x=an(C);for(;O||x;){let G=!1,q=!1;if(O&&x){const j=m(O,x);j<0?q=!0:j>0&&(G=!0)}else O!=null?q=!0:G=!0;G?(g(x),x=an(C)):q?(E(O),O=an(S)):(O=an(S),x=an(C))}})(s,i,de,(u=>{a.push(this.zn(t,e,n,u))}),(u=>{a.push(this.jn(t,e,n,u))})),v.waitFor(a)}$n(t){let e=1;return ln(t).ee({index:ih,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),e=s.sequenceNumber+1})).next((()=>e))}createRange(t,e,n){n=n.sort(((a,u)=>de(a,u))).filter(((a,u,l)=>!u||de(a,l[u-1])!==0));const s=[];s.push(t);for(const a of n){const u=de(a,t),l=de(a,e);if(u===0)s[0]=t.In();else if(u>0&&l<0)s.push(a),s.push(a.In());else if(l>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.Jn(s[a],s[a+1]))return[];const u=s[a].Rn(this.uid,Ts,k.empty()),l=s[a+1].Rn(this.uid,Ts,k.empty());i.push(IDBKeyRange.bound(u,l))}return i}Jn(t,e){return de(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(Hc)}getMinOffset(t,e){return v.mapArray(this.Cn(e),(n=>this.vn(t,n).next((s=>s||M(44426))))).next(Hc)}}function Qc(r){return gt(r,Mr)}function cn(r){return gt(r,Ar)}function dr(r){return gt(r,ea)}function ln(r){return gt(r,vr)}function Hc(r){L(r.length!==0,28825);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Yo(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new Ft(t.readTime,t.documentKey,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ld=41943040;class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hd(r,t,e){const n=r.store(Bt),s=r.store(An),i=[],a=IDBKeyRange.only(e.batchId);let u=0;const l=n.ee({range:a},((m,g,E)=>(u++,E.delete())));i.push(l.next((()=>{L(u===1,47070,{batchId:e.batchId})})));const d=[];for(const m of e.mutations){const g=nh(t,m.key.path,e.batchId);i.push(s.delete(g)),d.push(m.key)}return v.waitFor(i).next((()=>d))}function Zs(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw M(14731);t=r.noDocument}return JSON.stringify(t).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt.DEFAULT_COLLECTION_PERCENTILE=10,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vt.DEFAULT=new vt(ld,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vt.DISABLED=new vt(-1,0,0);class Ti{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.Hn={}}static yt(t,e,n,s){L(t.uid!=="",64387);const i=t.isAuthenticated()?t.uid:"";return new Ti(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return fe(t).ee({index:$e,range:n},((s,i,a)=>{e=!1,a.done()})).next((()=>e))}addMutationBatch(t,e,n,s){const i=pn(t),a=fe(t);return a.add({}).next((u=>{L(typeof u=="number",49019);const l=new da(u,e,n,s),d=(function(S,C,O){const x=O.baseMutations.map((q=>Js(S.gt,q))),G=O.mutations.map((q=>Js(S.gt,q)));return{userId:C,batchId:O.batchId,localWriteTimeMs:O.localWriteTime.toMillis(),baseMutations:x,mutations:G}})(this.serializer,this.userId,l),m=[];let g=new Z(((E,S)=>U(E.canonicalString(),S.canonicalString())));for(const E of s){const S=nh(this.userId,E.key.path,u);g=g.add(E.key.path.popLast()),m.push(a.put(d)),m.push(i.put(S,Ng))}return g.forEach((E=>{m.push(this.indexManager.addToCollectionParentIndex(t,E))})),t.addOnCommittedListener((()=>{this.Hn[u]=l.keys()})),v.waitFor(m).next((()=>l))}))}lookupMutationBatch(t,e){return fe(t).get(e).next((n=>n?(L(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:e}),je(this.serializer,n)):null))}Zn(t,e){return this.Hn[e]?v.resolve(this.Hn[e]):this.lookupMutationBatch(t,e).next((n=>{if(n){const s=n.keys();return this.Hn[e]=s,s}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return fe(t).ee({index:$e,range:s},((a,u,l)=>{u.userId===this.userId&&(L(u.batchId>=n,47524,{Xn:n}),i=je(this.serializer,u)),l.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Ke;return fe(t).ee({index:$e,range:e,reverse:!0},((s,i,a)=>{n=i.batchId,a.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,Ke],[this.userId,Number.POSITIVE_INFINITY]);return fe(t).J($e,e).next((n=>n.map((s=>je(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=Ss(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return pn(t).ee({range:s},((a,u,l)=>{const[d,m,g]=a,E=Gt(m);if(d===this.userId&&e.path.isEqual(E))return fe(t).get(g).next((S=>{if(!S)throw M(61480,{Yn:a,batchId:g});L(S.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:S.userId,batchId:g}),i.push(je(this.serializer,S))}));l.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Z(U);const s=[];return e.forEach((i=>{const a=Ss(this.userId,i.path),u=IDBKeyRange.lowerBound(a),l=pn(t).ee({range:u},((d,m,g)=>{const[E,S,C]=d,O=Gt(S);E===this.userId&&i.path.isEqual(O)?n=n.add(C):g.done()}));s.push(l)})),v.waitFor(s).next((()=>this.er(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=Ss(this.userId,n),a=IDBKeyRange.lowerBound(i);let u=new Z(U);return pn(t).ee({range:a},((l,d,m)=>{const[g,E,S]=l,C=Gt(E);g===this.userId&&n.isPrefixOf(C)?C.length===s&&(u=u.add(S)):m.done()})).next((()=>this.er(t,u)))}er(t,e){const n=[],s=[];return e.forEach((i=>{s.push(fe(t).get(i).next((a=>{if(a===null)throw M(35274,{batchId:i});L(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:i}),n.push(je(this.serializer,a))})))})),v.waitFor(s).next((()=>n))}removeMutationBatch(t,e){return hd(t.le,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.tr(e.batchId)})),v.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))))}tr(t){delete this.Hn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return v.resolve();const n=IDBKeyRange.lowerBound((function(a){return[a]})(this.userId)),s=[];return pn(t).ee({range:n},((i,a,u)=>{if(i[0]===this.userId){const l=Gt(i[1]);s.push(l)}else u.done()})).next((()=>{L(s.length===0,56720,{nr:s.map((i=>i.canonicalString()))})}))}))}containsKey(t,e){return dd(t,this.userId,e)}rr(t){return fd(t).get(this.userId).next((e=>e||{userId:this.userId,lastAcknowledgedBatchId:Ke,lastStreamToken:""}))}}function dd(r,t,e){const n=Ss(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return pn(r).ee({range:i,Y:!0},((u,l,d)=>{const[m,g,E]=u;m===t&&g===s&&(a=!0),d.done()})).next((()=>a))}function fe(r){return gt(r,Bt)}function pn(r){return gt(r,An)}function fd(r){return gt(r,kr)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(t){this.ir=t}next(){return this.ir+=2,this.ir}static sr(){return new ne(0)}static _r(){return new ne(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.ar(t).next((e=>{const n=new ne(e.highestTargetId);return e.highestTargetId=n.next(),this.ur(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.ar(t).next((e=>B.fromTimestamp(new Y(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.ar(t).next((e=>e.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.ar(t).next((s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.ur(t,s))))}addTargetData(t,e){return this.cr(t,e).next((()=>this.ar(t).next((n=>(n.targetCount+=1,this.lr(e,n),this.ur(t,n))))))}updateTargetData(t,e){return this.cr(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>hn(t).delete(e.targetId))).next((()=>this.ar(t))).next((n=>(L(n.targetCount>0,8065),n.targetCount-=1,this.ur(t,n))))}removeTargets(t,e,n){let s=0;const i=[];return hn(t).ee(((a,u)=>{const l=Ir(u);l.sequenceNumber<=e&&n.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(t,l)))})).next((()=>v.waitFor(i))).next((()=>s))}forEachTarget(t,e){return hn(t).ee(((n,s)=>{const i=Ir(s);e(i)}))}ar(t){return Jc(t).get(zs).next((e=>(L(e!==null,2888),e)))}ur(t,e){return Jc(t).put(zs,e)}cr(t,e){return hn(t).put(od(this.serializer,e))}lr(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.ar(t).next((e=>e.targetCount))}getTargetData(t,e){const n=Ye(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return hn(t).ee({range:s,index:sh},((a,u,l)=>{const d=Ir(u);Wr(e,d.target)&&(i=d,l.done())})).next((()=>i))}addMatchingKeys(t,e,n){const s=[],i=ge(t);return e.forEach((a=>{const u=bt(a.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(t,n,a))})),v.waitFor(s)}removeMatchingKeys(t,e,n){const s=ge(t);return v.forEach(e,(i=>{const a=bt(i.path);return v.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])}))}removeMatchingKeysForTargetId(t,e){const n=ge(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=ge(t);let i=$();return s.ee({range:n,Y:!0},((a,u,l)=>{const d=Gt(a[1]),m=new k(d);i=i.add(m)})).next((()=>i))}containsKey(t,e){const n=bt(e.path),s=IDBKeyRange.bound([n],[Ql(n)],!1,!0);let i=0;return ge(t).ee({index:ta,Y:!0,range:s},(([a,u],l,d)=>{a!==0&&(i++,d.done())})).next((()=>i>0))}Rt(t,e){return hn(t).get(e).next((n=>n?Ir(n):null))}}function hn(r){return gt(r,bn)}function Jc(r){return gt(r,Ge)}function ge(r){return gt(r,Rn)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc="LruGarbageCollector",md=1048576;function Yc([r,t],[e,n]){const s=U(r,e);return s===0?U(t,n):s}class a_{constructor(t){this.hr=t,this.buffer=new Z(Yc),this.Pr=0}Tr(){return++this.Pr}Ir(t){const e=[t,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Yc(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class gd{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(t){V(Xc,`Garbage collection scheduled in ${t}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Se(e)?V(Xc,"Ignoring IndexedDB error during garbage collection: ",e):await Re(e)}await this.Rr(3e5)}))}}class u_{constructor(t,e){this.Ar=t,this.params=e}calculateTargetCount(t,e){return this.Ar.Vr(t).next((n=>Math.floor(e/100*n)))}nthSequenceNumber(t,e){if(e===0)return v.resolve(Ct.ce);const n=new a_(e);return this.Ar.forEachTarget(t,(s=>n.Ir(s.sequenceNumber))).next((()=>this.Ar.dr(t,(s=>n.Ir(s))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.Ar.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Ar.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),v.resolve(Wc)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Wc):this.mr(t,e)))}getCacheSize(t){return this.Ar.getCacheSize(t)}mr(t,e){let n,s,i,a,u,l,d;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((g=>(g>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,a=Date.now(),this.nthSequenceNumber(t,s)))).next((g=>(n=g,u=Date.now(),this.removeTargets(t,n,e)))).next((g=>(i=g,l=Date.now(),this.removeOrphanedDocuments(t,n)))).next((g=>(d=Date.now(),dn()<=H.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(l-u)+`ms
	Removed ${g} documents in `+(d-l)+`ms
Total Duration: ${d-m}ms`),v.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g}))))}}function pd(r,t){return new u_(r,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{constructor(t,e){this.db=t,this.garbageCollector=pd(this,e)}Vr(t){const e=this.gr(t);return this.db.getTargetCache().getTargetCount(t).next((n=>e.next((s=>n+s))))}gr(t){let e=0;return this.dr(t,(n=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}dr(t,e){return this.pr(t,((n,s)=>e(s)))}addReference(t,e,n){return ws(t,n)}removeReference(t,e,n){return ws(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return ws(t,e)}yr(t,e){return(function(s,i){let a=!1;return fd(s).te((u=>dd(s,u,i).next((l=>(l&&(a=!0),v.resolve(!l)))))).next((()=>a))})(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.pr(t,((a,u)=>{if(u<=e){const l=this.yr(t,a).next((d=>{if(!d)return i++,n.getEntry(t,a).next((()=>(n.removeEntry(a,B.min()),ge(t).delete((function(g){return[0,bt(g.path)]})(a)))))}));s.push(l)}})).next((()=>v.waitFor(s))).next((()=>n.apply(t))).next((()=>i))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return ws(t,e)}pr(t,e){const n=ge(t);let s,i=Ct.ce;return n.ee({index:ta},(([a,u],{path:l,sequenceNumber:d})=>{a===0?(i!==Ct.ce&&e(new k(Gt(s)),i),i=d,s=l):i=Ct.ce})).next((()=>{i!==Ct.ce&&e(new k(Gt(s)),i)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function ws(r,t){return ge(r).put((function(n,s){return{targetId:0,path:bt(n.path),sequenceNumber:s}})(t,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _d{constructor(){this.changes=new se((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,ut.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?v.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return Me(t).put(n)}removeEntry(t,e,n){return Me(t).delete((function(i,a){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],Xs(a),u[u.length-1]]})(e,n))}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.wr(t,n))))}getEntry(t,e){let n=ut.newInvalidDocument(e);return Me(t).ee({index:Ps,range:IDBKeyRange.only(fr(e))},((s,i)=>{n=this.Sr(e,i)})).next((()=>n))}br(t,e){let n={size:0,document:ut.newInvalidDocument(e)};return Me(t).ee({index:Ps,range:IDBKeyRange.only(fr(e))},((s,i)=>{n={document:this.Sr(e,i),size:Zs(i)}})).next((()=>n))}getEntries(t,e){let n=kt();return this.Dr(t,e,((s,i)=>{const a=this.Sr(s,i);n=n.insert(s,a)})).next((()=>n))}Cr(t,e){let n=kt(),s=new nt(k.comparator);return this.Dr(t,e,((i,a)=>{const u=this.Sr(i,a);n=n.insert(i,u),s=s.insert(i,Zs(a))})).next((()=>({documents:n,vr:s})))}Dr(t,e,n){if(e.isEmpty())return v.resolve();let s=new Z(el);e.forEach((l=>s=s.add(l)));const i=IDBKeyRange.bound(fr(s.first()),fr(s.last())),a=s.getIterator();let u=a.getNext();return Me(t).ee({index:Ps,range:i},((l,d,m)=>{const g=k.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;u&&el(u,g)<0;)n(u,null),u=a.getNext();u&&u.isEqual(g)&&(n(u,d),u=a.hasNext()?a.getNext():null),u?m.j(fr(u)):m.done()})).next((()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null}))}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,u=[a.popLast().toArray(),a.lastSegment(),Xs(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],l=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Me(t).J(IDBKeyRange.bound(u,l,!0)).next((d=>{i==null||i.incrementDocumentReadCount(d.length);let m=kt();for(const g of d){const E=this.Sr(k.fromSegments(g.prefixPath.concat(g.collectionGroup,g.documentId)),g);E.isFoundDocument()&&(Xr(e,E)||s.has(E.key))&&(m=m.insert(E.key,E))}return m}))}getAllFromCollectionGroup(t,e,n,s){let i=kt();const a=tl(e,n),u=tl(e,Ft.max());return Me(t).ee({index:rh,range:IDBKeyRange.bound(a,u,!0)},((l,d,m)=>{const g=this.Sr(k.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);i=i.insert(g.key,g),i.size===s&&m.done()})).next((()=>i))}newChangeBuffer(t){return new h_(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((e=>e.byteSize))}getMetadata(t){return Zc(t).get(bo).next((e=>(L(!!e,20021),e)))}wr(t,e){return Zc(t).put(bo,e)}Sr(t,e){if(e){const n=Jp(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return ut.newInvalidDocument(t)}}function yd(r){return new l_(r)}class h_ extends _d{constructor(t,e){super(),this.Fr=t,this.trackRemovals=e,this.Mr=new se((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(t){const e=[];let n=0,s=new Z(((i,a)=>U(i.canonicalString(),a.canonicalString())));return this.changes.forEach(((i,a)=>{const u=this.Mr.get(i);if(e.push(this.Fr.removeEntry(t,i,u.readTime)),a.isValidDocument()){const l=Mc(this.Fr.serializer,a);s=s.add(i.path.popLast());const d=Zs(l);n+=d-u.size,e.push(this.Fr.addEntry(t,i,l))}else if(n-=u.size,this.trackRemovals){const l=Mc(this.Fr.serializer,a.convertToNoDocument(B.min()));e.push(this.Fr.addEntry(t,i,l))}})),s.forEach((i=>{e.push(this.Fr.indexManager.addToCollectionParentIndex(t,i))})),e.push(this.Fr.updateMetadata(t,n)),v.waitFor(e)}getFromCache(t,e){return this.Fr.br(t,e).next((n=>(this.Mr.set(e,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(t,e){return this.Fr.Cr(t,e).next((({documents:n,vr:s})=>(s.forEach(((i,a)=>{this.Mr.set(i,{size:a,readTime:n.get(i).readTime})})),n)))}}function Zc(r){return gt(r,Or)}function Me(r){return gt(r,qs)}function fr(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function tl(r,t){const e=t.documentKey.path.toArray();return[r,Xs(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function el(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=U(e[i],n[i]),s)return s;return s=U(e.length,n.length),s||(s=U(e[e.length-2],n[n.length-2]),s||U(e[e.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(n=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(n!==null&&Pr(n.mutation,s,Dt.empty(),Y.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.getLocalViewOfDocuments(t,n,$()).next((()=>n))))}getLocalViewOfDocuments(t,e,n=$()){const s=Qt();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,n).next((i=>{let a=_r();return i.forEach(((u,l)=>{a=a.insert(u,l.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const n=Qt();return this.populateOverlays(t,n,e).next((()=>this.computeViews(t,e,n,$())))}populateOverlays(t,e,n){const s=[];return n.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((a,u)=>{e.set(a,u)}))}))}computeViews(t,e,n,s){let i=kt();const a=Sr(),u=(function(){return Sr()})();return e.forEach(((l,d)=>{const m=n.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof ie)?i=i.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),Pr(m.mutation,d,m.mutation.getFieldMask(),Y.now())):a.set(d.key,Dt.empty())})),this.recalculateAndSaveOverlays(t,i).next((l=>(l.forEach(((d,m)=>a.set(d,m))),e.forEach(((d,m)=>u.set(d,new d_(m,a.get(d)??null)))),u)))}recalculateAndSaveOverlays(t,e){const n=Sr();let s=new nt(((a,u)=>a-u)),i=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const u of a)u.keys().forEach((l=>{const d=e.get(l);if(d===null)return;let m=n.get(l)||Dt.empty();m=u.applyToLocalView(d,m),n.set(l,m);const g=(s.get(u.batchId)||$()).add(l);s=s.insert(u.batchId,g)}))})).next((()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const l=u.getNext(),d=l.key,m=l.value,g=Mh();m.forEach((E=>{if(!i.has(E)){const S=jh(e.get(E),n.get(E));S!==null&&g.set(E,S),i=i.add(E)}})),a.push(this.documentOverlayCache.saveOverlays(t,d,g))}return v.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.recalculateAndSaveOverlays(t,n)))}getDocumentsMatchingQuery(t,e,n,s){return pp(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):_p(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):v.resolve(Qt());let u=vn,l=i;return a.next((d=>v.forEach(d,((m,g)=>(u<g.largestBatchId&&(u=g.largestBatchId),i.get(m)?v.resolve():this.remoteDocumentCache.getEntry(t,m).next((E=>{l=l.insert(m,E)}))))).next((()=>this.populateOverlays(t,d,i))).next((()=>this.computeViews(t,l,d,$()))).next((m=>({batchId:u,changes:Oh(m)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new k(e)).next((n=>{let s=_r();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=_r();return this.indexManager.getCollectionParents(t,i).next((u=>v.forEach(u,(l=>{const d=(function(g,E){return new gi(E,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)})(e,l.child(i));return this.getDocumentsMatchingCollectionQuery(t,d,n,s).next((m=>{m.forEach(((g,E)=>{a=a.insert(g,E)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s)))).next((a=>{i.forEach(((l,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,ut.newInvalidDocument(m)))}));let u=_r();return a.forEach(((l,d)=>{const m=i.get(l);m!==void 0&&Pr(m.mutation,d,Dt.empty(),Y.now()),Xr(e,d)&&(u=u.insert(l,d))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{constructor(t){this.serializer=t,this.Or=new Map,this.Nr=new Map}getBundleMetadata(t,e){return v.resolve(this.Or.get(e))}saveBundleMetadata(t,e){return this.Or.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:Pt(s.createTime)}})(e)),v.resolve()}getNamedQuery(t,e){return v.resolve(this.Nr.get(e))}saveNamedQuery(t,e){return this.Nr.set(e.name,(function(s){return{name:s.name,query:ad(s.bundledQuery),readTime:Pt(s.readTime)}})(e)),v.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(){this.overlays=new nt(k.comparator),this.Br=new Map}getOverlay(t,e){return v.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Qt();return v.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(t,e,n){return n.forEach(((s,i)=>{this.wt(t,e,i)})),v.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Br.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Br.delete(n)),v.resolve()}getOverlaysForCollection(t,e,n){const s=Qt(),i=e.length+1,a=new k(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const l=u.getNext().value,d=l.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===i&&l.largestBatchId>n&&s.set(l.getKey(),l)}return v.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new nt(((d,m)=>d-m));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>n){let m=i.get(d.largestBatchId);m===null&&(m=Qt(),i=i.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const u=Qt(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((d,m)=>u.set(d,m))),!(u.size()>=s)););return v.resolve(u)}wt(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Br.get(s.largestBatchId).delete(n.key);this.Br.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new ma(e,n));let i=this.Br.get(e);i===void 0&&(i=$(),this.Br.set(e,i)),this.Br.set(e,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return v.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,v.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(){this.Lr=new Z(_t.kr),this.qr=new Z(_t.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(t,e){const n=new _t(t,e);this.Lr=this.Lr.add(n),this.qr=this.qr.add(n)}Ur(t,e){t.forEach((n=>this.addReference(n,e)))}removeReference(t,e){this.$r(new _t(t,e))}Wr(t,e){t.forEach((n=>this.removeReference(n,e)))}Qr(t){const e=new k(new X([])),n=new _t(e,t),s=new _t(e,t+1),i=[];return this.qr.forEachInRange([n,s],(a=>{this.$r(a),i.push(a.key)})),i}Gr(){this.Lr.forEach((t=>this.$r(t)))}$r(t){this.Lr=this.Lr.delete(t),this.qr=this.qr.delete(t)}zr(t){const e=new k(new X([])),n=new _t(e,t),s=new _t(e,t+1);let i=$();return this.qr.forEachInRange([n,s],(a=>{i=i.add(a.key)})),i}containsKey(t){const e=new _t(t,0),n=this.Lr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class _t{constructor(t,e){this.key=t,this.jr=e}static kr(t,e){return k.comparator(t.key,e.key)||U(t.jr,e.jr)}static Kr(t,e){return U(t.jr,e.jr)||k.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Xn=1,this.Jr=new Z(_t.kr)}checkEmpty(t){return v.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new da(i,e,n,s);this.mutationQueue.push(a);for(const u of s)this.Jr=this.Jr.add(new _t(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return v.resolve(a)}lookupMutationBatch(t,e){return v.resolve(this.Hr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Zr(n),i=s<0?0:s;return v.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return v.resolve(this.mutationQueue.length===0?Ke:this.Xn-1)}getAllMutationBatches(t){return v.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new _t(e,0),s=new _t(e,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([n,s],(a=>{const u=this.Hr(a.jr);i.push(u)})),v.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Z(U);return e.forEach((s=>{const i=new _t(s,0),a=new _t(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,a],(u=>{n=n.add(u.jr)}))})),v.resolve(this.Xr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;k.isDocumentKey(i)||(i=i.child(""));const a=new _t(new k(i),0);let u=new Z(U);return this.Jr.forEachWhile((l=>{const d=l.key.path;return!!n.isPrefixOf(d)&&(d.length===s&&(u=u.add(l.jr)),!0)}),a),v.resolve(this.Xr(u))}Xr(t){const e=[];return t.forEach((n=>{const s=this.Hr(n);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){L(this.Yr(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Jr;return v.forEach(e.mutations,(s=>{const i=new _t(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Jr=n}))}tr(t){}containsKey(t,e){const n=new _t(e,0),s=this.Jr.firstAfterOrEqual(n);return v.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,v.resolve()}Yr(t,e){return this.Zr(t)}Zr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Hr(t){const e=this.Zr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __{constructor(t){this.ei=t,this.docs=(function(){return new nt(k.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.ei(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return v.resolve(n?n.document.mutableCopy():ut.newInvalidDocument(e))}getEntries(t,e){let n=kt();return e.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ut.newInvalidDocument(s))})),v.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=kt();const a=e.path,u=new k(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){const{key:d,value:{document:m}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Yo(Xl(m),n)<=0||(s.has(m.key)||Xr(e,m))&&(i=i.insert(m.key,m.mutableCopy()))}return v.resolve(i)}getAllFromCollectionGroup(t,e,n,s){M(9500)}ti(t,e){return v.forEach(this.docs,(n=>e(n)))}newChangeBuffer(t){return new y_(this)}getSize(t){return v.resolve(this.size)}}class y_ extends _d{constructor(t){super(),this.Fr=t}applyChanges(t){const e=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?e.push(this.Fr.addEntry(t,s)):this.Fr.removeEntry(n)})),v.waitFor(e)}getFromCache(t,e){return this.Fr.getEntry(t,e)}getAllFromCache(t,e){return this.Fr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(t){this.persistence=t,this.ni=new se((e=>Ye(e)),Wr),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.ri=0,this.ii=new Ia,this.targetCount=0,this.si=ne.sr()}forEachTarget(t,e){return this.ni.forEach(((n,s)=>e(s))),v.resolve()}getLastRemoteSnapshotVersion(t){return v.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return v.resolve(this.ri)}allocateTargetId(t){return this.highestTargetId=this.si.next(),v.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ri&&(this.ri=e),v.resolve()}cr(t){this.ni.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.si=new ne(e),this.highestTargetId=e),t.sequenceNumber>this.ri&&(this.ri=t.sequenceNumber)}addTargetData(t,e){return this.cr(e),this.targetCount+=1,v.resolve()}updateTargetData(t,e){return this.cr(e),v.resolve()}removeTargetData(t,e){return this.ni.delete(e.target),this.ii.Qr(e.targetId),this.targetCount-=1,v.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.ni.forEach(((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.ni.delete(a),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)})),v.waitFor(i).next((()=>s))}getTargetCount(t){return v.resolve(this.targetCount)}getTargetData(t,e){const n=this.ni.get(e)||null;return v.resolve(n)}addMatchingKeys(t,e,n){return this.ii.Ur(e,n),v.resolve()}removeMatchingKeys(t,e,n){this.ii.Wr(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((a=>{i.push(s.markPotentiallyOrphaned(t,a))})),v.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.ii.Qr(e),v.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ii.zr(e);return v.resolve(n)}containsKey(t,e){return v.resolve(this.ii.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(t,e){this.oi={},this.overlays={},this._i=new Ct(0),this.ai=!1,this.ai=!0,this.ui=new g_,this.referenceDelegate=t(this),this.ci=new I_(this),this.indexManager=new s_,this.remoteDocumentCache=(function(s){return new __(s)})((n=>this.referenceDelegate.li(n))),this.serializer=new id(e),this.hi=new f_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new m_,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.oi[t.toKey()];return n||(n=new p_(e,this.referenceDelegate),this.oi[t.toKey()]=n),n}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(t,e,n){V("MemoryPersistence","Starting transaction:",t);const s=new E_(this._i.next());return this.referenceDelegate.Pi(),n(s).next((i=>this.referenceDelegate.Ti(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(t,e){return v.or(Object.values(this.oi).map((n=>()=>n.containsKey(t,e))))}}class E_ extends Zl{constructor(t){super(),this.currentSequenceNumber=t}}class wi{constructor(t){this.persistence=t,this.Ei=new Ia,this.Ri=null}static Ai(t){return new wi(t)}get Vi(){if(this.Ri)return this.Ri;throw M(60996)}addReference(t,e,n){return this.Ei.addReference(n,e),this.Vi.delete(n.toString()),v.resolve()}removeReference(t,e,n){return this.Ei.removeReference(n,e),this.Vi.add(n.toString()),v.resolve()}markPotentiallyOrphaned(t,e){return this.Vi.add(e.toString()),v.resolve()}removeTarget(t,e){this.Ei.Qr(e.targetId).forEach((s=>this.Vi.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.Vi.add(i.toString())))})).next((()=>n.removeTargetData(t,e)))}Pi(){this.Ri=new Set}Ti(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return v.forEach(this.Vi,(n=>{const s=k.fromPath(n);return this.di(t,s).next((i=>{i||e.removeEntry(s,B.min())}))})).next((()=>(this.Ri=null,e.apply(t))))}updateLimboDocument(t,e){return this.di(t,e).next((n=>{n?this.Vi.delete(e.toString()):this.Vi.add(e.toString())}))}li(t){return 0}di(t,e){return v.or([()=>v.resolve(this.Ei.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ii(t,e)])}}class ti{constructor(t,e){this.persistence=t,this.mi=new se((n=>bt(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=pd(this,e)}static Ai(t,e){return new ti(t,e)}Pi(){}Ti(t){return v.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}Vr(t){const e=this.gr(t);return this.persistence.getTargetCache().getTargetCount(t).next((n=>e.next((s=>n+s))))}gr(t){let e=0;return this.dr(t,(n=>{e++})).next((()=>e))}dr(t,e){return v.forEach(this.mi,((n,s)=>this.yr(t,n,s).next((i=>i?v.resolve():e(s)))))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ti(t,(a=>this.yr(t,a,e).next((u=>{u||(n++,i.removeEntry(a,B.min()))})))).next((()=>i.apply(t))).next((()=>n))}markPotentiallyOrphaned(t,e){return this.mi.set(e,t.currentSequenceNumber),v.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.mi.set(n,t.currentSequenceNumber),v.resolve()}removeReference(t,e,n){return this.mi.set(n,t.currentSequenceNumber),v.resolve()}updateLimboDocument(t,e){return this.mi.set(e,t.currentSequenceNumber),v.resolve()}li(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Cs(t.data.value)),e}yr(t,e,n){return v.or([()=>this.persistence.Ii(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.mi.get(e);return v.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(t){this.serializer=t}k(t,e,n,s){const i=new ui("createOrUpgrade",e);n<1&&s>=1&&((function(l){l.createObjectStore(Hr)})(t),(function(l){l.createObjectStore(kr,{keyPath:xg}),l.createObjectStore(Bt,{keyPath:dc,autoIncrement:!0}).createIndex($e,fc,{unique:!0}),l.createObjectStore(An)})(t),nl(t),(function(l){l.createObjectStore(Be)})(t));let a=v.resolve();return n<3&&s>=3&&(n!==0&&((function(l){l.deleteObjectStore(Rn),l.deleteObjectStore(bn),l.deleteObjectStore(Ge)})(t),nl(t)),a=a.next((()=>(function(l){const d=l.store(Ge),m={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return d.put(zs,m)})(i)))),n<4&&s>=4&&(n!==0&&(a=a.next((()=>(function(l,d){return d.store(Bt).J().next((g=>{l.deleteObjectStore(Bt),l.createObjectStore(Bt,{keyPath:dc,autoIncrement:!0}).createIndex($e,fc,{unique:!0});const E=d.store(Bt),S=g.map((C=>E.put(C)));return v.waitFor(S)}))})(t,i)))),a=a.next((()=>{(function(l){l.createObjectStore(Sn,{keyPath:jg})})(t)}))),n<5&&s>=5&&(a=a.next((()=>this.fi(i)))),n<6&&s>=6&&(a=a.next((()=>((function(l){l.createObjectStore(Or)})(t),this.gi(i))))),n<7&&s>=7&&(a=a.next((()=>this.pi(i)))),n<8&&s>=8&&(a=a.next((()=>this.yi(t,i)))),n<9&&s>=9&&(a=a.next((()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(t)}))),n<10&&s>=10&&(a=a.next((()=>this.wi(i)))),n<11&&s>=11&&(a=a.next((()=>{(function(l){l.createObjectStore(li,{keyPath:qg})})(t),(function(l){l.createObjectStore(hi,{keyPath:zg})})(t)}))),n<12&&s>=12&&(a=a.next((()=>{(function(l){const d=l.createObjectStore(di,{keyPath:Jg});d.createIndex(So,Xg,{unique:!1}),d.createIndex(ah,Yg,{unique:!1})})(t)}))),n<13&&s>=13&&(a=a.next((()=>(function(l){const d=l.createObjectStore(qs,{keyPath:kg});d.createIndex(Ps,Og),d.createIndex(rh,Mg)})(t))).next((()=>this.Si(t,i))).next((()=>t.deleteObjectStore(Be)))),n<14&&s>=14&&(a=a.next((()=>this.bi(t,i)))),n<15&&s>=15&&(a=a.next((()=>(function(l){l.createObjectStore(ea,{keyPath:$g,autoIncrement:!0}).createIndex(Ro,Kg,{unique:!1}),l.createObjectStore(vr,{keyPath:Gg}).createIndex(ih,Qg,{unique:!1}),l.createObjectStore(Ar,{keyPath:Hg}).createIndex(oh,Wg,{unique:!1})})(t)))),n<16&&s>=16&&(a=a.next((()=>{e.objectStore(vr).clear()})).next((()=>{e.objectStore(Ar).clear()}))),n<17&&s>=17&&(a=a.next((()=>{(function(l){l.createObjectStore(na,{keyPath:Zg})})(t)}))),n<18&&s>=18&&Dl()&&(a=a.next((()=>{e.objectStore(vr).clear()})).next((()=>{e.objectStore(Ar).clear()}))),a}gi(t){let e=0;return t.store(Be).ee(((n,s)=>{e+=Zs(s)})).next((()=>{const n={byteSize:e};return t.store(Or).put(bo,n)}))}fi(t){const e=t.store(kr),n=t.store(Bt);return e.J().next((s=>v.forEach(s,(i=>{const a=IDBKeyRange.bound([i.userId,Ke],[i.userId,i.lastAcknowledgedBatchId]);return n.J($e,a).next((u=>v.forEach(u,(l=>{L(l.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:l.batchId});const d=je(this.serializer,l);return hd(t,i.userId,d).next((()=>{}))}))))}))))}pi(t){const e=t.store(Rn),n=t.store(Be);return t.store(Ge).get(zs).next((s=>{const i=[];return n.ee(((a,u)=>{const l=new X(a),d=(function(g){return[0,bt(g)]})(l);i.push(e.get(d).next((m=>m?v.resolve():(g=>e.put({targetId:0,path:bt(g),sequenceNumber:s.highestListenSequenceNumber}))(l))))})).next((()=>v.waitFor(i)))}))}yi(t,e){t.createObjectStore(Mr,{keyPath:Ug});const n=e.store(Mr),s=new ya,i=a=>{if(s.add(a)){const u=a.lastSegment(),l=a.popLast();return n.put({collectionId:u,parent:bt(l)})}};return e.store(Be).ee({Y:!0},((a,u)=>{const l=new X(a);return i(l.popLast())})).next((()=>e.store(An).ee({Y:!0},(([a,u,l],d)=>{const m=Gt(u);return i(m.popLast())}))))}wi(t){const e=t.store(bn);return e.ee(((n,s)=>{const i=Ir(s),a=od(this.serializer,i);return e.put(a)}))}Si(t,e){const n=e.store(Be),s=[];return n.ee(((i,a)=>{const u=e.store(qs),l=(function(g){return g.document?new k(X.fromString(g.document.name).popFirst(5)):g.noDocument?k.fromSegments(g.noDocument.path):g.unknownDocument?k.fromSegments(g.unknownDocument.path):M(36783)})(a).path.toArray(),d={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(u.put(d))})).next((()=>v.waitFor(s)))}bi(t,e){const n=e.store(Bt),s=yd(this.serializer),i=new Ea(wi.Ai,this.serializer.gt);return n.J().next((a=>{const u=new Map;return a.forEach((l=>{let d=u.get(l.userId)??$();je(this.serializer,l).keys().forEach((m=>d=d.add(m))),u.set(l.userId,d)})),v.forEach(u,((l,d)=>{const m=new wt(d),g=Ei.yt(this.serializer,m),E=i.getIndexManager(m),S=Ti.yt(m,this.serializer,E,i.referenceDelegate);return new Id(s,S,g,E).recalculateAndSaveOverlaysForDocumentKeys(new Po(e,Ct.ce),l).next()}))}))}}function nl(r){r.createObjectStore(Rn,{keyPath:Lg}).createIndex(ta,Bg,{unique:!0}),r.createObjectStore(bn,{keyPath:"targetId"}).createIndex(sh,Fg,{unique:!0}),r.createObjectStore(Ge)}const me="IndexedDbPersistence",uo=18e5,co=5e3,lo="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",w_="main";class Ta{constructor(t,e,n,s,i,a,u,l,d,m,g=18){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Di=i,this.window=a,this.document=u,this.Ci=d,this.Fi=m,this.Mi=g,this._i=null,this.ai=!1,this.isPrimary=!1,this.networkEnabled=!0,this.xi=null,this.inForeground=!1,this.Oi=null,this.Ni=null,this.Bi=Number.NEGATIVE_INFINITY,this.Li=E=>Promise.resolve(),!Ta.v())throw new N(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new c_(this,s),this.ki=e+w_,this.serializer=new id(l),this.qi=new Ee(this.ki,this.Mi,new T_(this.serializer)),this.ui=new Yp,this.ci=new o_(this.referenceDelegate,this.serializer),this.remoteDocumentCache=yd(this.serializer),this.hi=new Xp,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,m===!1&&ct(me,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ui().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new N(P.FAILED_PRECONDITION,lo);return this.$i(),this.Wi(),this.Qi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.ci.getHighestSequenceNumber(t)))})).then((t=>{this._i=new Ct(t,this.Ci)})).then((()=>{this.ai=!0})).catch((t=>(this.qi&&this.qi.close(),Promise.reject(t))))}Gi(t){return this.Li=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.qi.K((async e=>{e.newVersion===null&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Di.enqueueAndForget((async()=>{this.started&&await this.Ui()})))}Ui(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>vs(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.zi(t).next((e=>{e||(this.isPrimary=!1,this.Di.enqueueRetryable((()=>this.Li(!1))))}))})).next((()=>this.ji(t))).next((e=>this.isPrimary&&!e?this.Ji(t).next((()=>!1)):!!e&&this.Hi(t).next((()=>!0)))))).catch((t=>{if(Se(t))return V(me,"Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return V(me,"Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Di.enqueueRetryable((()=>this.Li(t))),this.isPrimary=t}))}zi(t){return mr(t).get(on).next((e=>v.resolve(this.Zi(e))))}Xi(t){return vs(t).delete(this.clientId)}async Yi(){if(this.isPrimary&&!this.es(this.Bi,uo)){this.Bi=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(e=>{const n=gt(e,Sn);return n.J().next((s=>{const i=this.ts(s,uo),a=s.filter((u=>i.indexOf(u)===-1));return v.forEach(a,(u=>n.delete(u.clientId))).next((()=>a))}))})).catch((()=>[]));if(this.Ki)for(const e of t)this.Ki.removeItem(this.ns(e.clientId))}}Qi(){this.Ni=this.Di.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.Ui().then((()=>this.Yi())).then((()=>this.Qi()))))}Zi(t){return!!t&&t.ownerId===this.clientId}ji(t){return this.Fi?v.resolve(!0):mr(t).get(on).next((e=>{if(e!==null&&this.es(e.leaseTimestampMs,co)&&!this.rs(e.ownerId)){if(this.Zi(e)&&this.networkEnabled)return!0;if(!this.Zi(e)){if(!e.allowTabSynchronization)throw new N(P.FAILED_PRECONDITION,lo);return!1}}return!(!this.networkEnabled||!this.inForeground)||vs(t).J().next((n=>this.ts(n,co).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||a&&u)return!0}return!1}))===void 0))})).next((e=>(this.isPrimary!==e&&V(me,`Client ${e?"is":"is not"} eligible for a primary lease.`),e)))}async shutdown(){this.ai=!1,this.ss(),this.Ni&&(this.Ni.cancel(),this.Ni=null),this._s(),this.us(),await this.qi.runTransaction("shutdown","readwrite",[Hr,Sn],(t=>{const e=new Po(t,Ct.ce);return this.Ji(e).next((()=>this.Xi(e)))})),this.qi.close(),this.cs()}ts(t,e){return t.filter((n=>this.es(n.updateTimeMs,e)&&!this.rs(n.clientId)))}ls(){return this.runTransaction("getActiveClients","readonly",(t=>vs(t).J().next((e=>this.ts(e,uo).map((n=>n.clientId))))))}get started(){return this.ai}getGlobalsCache(){return this.ui}getMutationQueue(t,e){return Ti.yt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new i_(t,this.serializer.gt.databaseId)}getDocumentOverlayCache(t){return Ei.yt(this.serializer,t)}getBundleCache(){return this.hi}runTransaction(t,e,n){V(me,"Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=(function(l){return l===18?np:l===17?hh:l===16?ep:l===15?ra:l===14?lh:l===13?ch:l===12?tp:l===11?uh:void M(60245)})(this.Mi);let a;return this.qi.runTransaction(t,s,i,(u=>(a=new Po(u,this._i?this._i.next():Ct.ce),e==="readwrite-primary"?this.zi(a).next((l=>!!l||this.ji(a))).next((l=>{if(!l)throw ct(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Di.enqueueRetryable((()=>this.Li(!1))),new N(P.FAILED_PRECONDITION,Yl);return n(a)})).next((l=>this.Hi(a).next((()=>l)))):this.hs(a).next((()=>n(a)))))).then((u=>(a.raiseOnCommittedEvent(),u)))}hs(t){return mr(t).get(on).next((e=>{if(e!==null&&this.es(e.leaseTimestampMs,co)&&!this.rs(e.ownerId)&&!this.Zi(e)&&!(this.Fi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new N(P.FAILED_PRECONDITION,lo)}))}Hi(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return mr(t).put(on,e)}static v(){return Ee.v()}Ji(t){const e=mr(t);return e.get(on).next((n=>this.Zi(n)?(V(me,"Releasing primary lease."),e.delete(on)):v.resolve()))}es(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(ct(`Detected an update time that is in the future: ${t} > ${n}`),!1))}$i(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Oi=()=>{this.Di.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.Ui())))},this.document.addEventListener("visibilitychange",this.Oi),this.inForeground=this.document.visibilityState==="visible")}_s(){this.Oi&&(this.document.removeEventListener("visibilitychange",this.Oi),this.Oi=null)}Wi(){var t;typeof((t=this.window)==null?void 0:t.addEventListener)=="function"&&(this.xi=()=>{this.ss();const e=/(?:Version|Mobile)\/1[456]/;Cl()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Di.enterRestrictedMode(!0),this.Di.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.xi))}us(){this.xi&&(this.window.removeEventListener("pagehide",this.xi),this.xi=null)}rs(t){var e;try{const n=((e=this.Ki)==null?void 0:e.getItem(this.ns(t)))!==null;return V(me,`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ct(me,"Failed to get zombied client id.",n),!1}}ss(){if(this.Ki)try{this.Ki.setItem(this.ns(this.clientId),String(Date.now()))}catch(t){ct("Failed to set zombie client id.",t)}}cs(){if(this.Ki)try{this.Ki.removeItem(this.ns(this.clientId))}catch{}}ns(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function mr(r){return gt(r,Hr)}function vs(r){return gt(r,Sn)}function Ed(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Ps=n,this.Ts=s}static Is(t,e){let n=$(),s=$();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new wa(t,e.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=(function(){return Cl()?8:th(En())>0?6:4})()}initialize(t,e){this.ds=t,this.indexManager=e,this.Es=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.fs(t,e).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.gs(t,e,s,n).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new v_;return this.ps(t,e,a).next((u=>{if(i.result=u,this.Rs)return this.ys(t,e,a,u.size)}))})).next((()=>i.result))}ys(t,e,n,s){return n.documentReadCount<this.As?(dn()<=H.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",fn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),v.resolve()):(dn()<=H.DEBUG&&V("QueryEngine","Query:",fn(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Vs*s?(dn()<=H.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",fn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Mt(e))):v.resolve())}fs(t,e){if(Rc(e))return v.resolve(null);let n=Mt(e);return this.indexManager.getIndexType(t,n).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=No(e,null,"F"),n=Mt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next((i=>{const a=$(...i);return this.ds.getDocuments(t,a).next((u=>this.indexManager.getMinOffset(t,n).next((l=>{const d=this.ws(e,u);return this.Ss(e,d,a,l.readTime)?this.fs(t,No(e,null,"F")):this.bs(t,d,e,l)}))))})))))}gs(t,e,n,s){return Rc(e)||s.isEqual(B.min())?v.resolve(null):this.ds.getDocuments(t,n).next((i=>{const a=this.ws(e,i);return this.Ss(e,a,n,s)?v.resolve(null):(dn()<=H.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),fn(e)),this.bs(t,a,e,Jl(s,vn)).next((u=>u)))}))}ws(t,e){let n=new Z(Nh(t));return e.forEach(((s,i)=>{Xr(t,i)&&(n=n.add(i))})),n}Ss(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ps(t,e,n){return dn()<=H.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",fn(e)),this.ds.getDocumentsMatchingQuery(t,e,Ft.min(),n)}bs(t,e,n,s){return this.ds.getDocumentsMatchingQuery(t,n,s).next((i=>(e.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="LocalStore",A_=3e8;class b_{constructor(t,e,n,s){this.persistence=t,this.Ds=e,this.serializer=s,this.Cs=new nt(U),this.vs=new se((i=>Ye(i)),Wr),this.Fs=new Map,this.Ms=t.getRemoteDocumentCache(),this.ci=t.getTargetCache(),this.hi=t.getBundleCache(),this.xs(n)}xs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Id(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Cs)))}}function wd(r,t,e,n){return new b_(r,t,e,n)}async function vd(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,e.xs(t),e.mutationQueue.getAllMutationBatches(n)))).next((i=>{const a=[],u=[];let l=$();for(const d of s){a.push(d.batchId);for(const m of d.mutations)l=l.add(m.key)}for(const d of i){u.push(d.batchId);for(const m of d.mutations)l=l.add(m.key)}return e.localDocuments.getDocuments(n,l).next((d=>({Os:d,removedBatchIds:a,addedBatchIds:u})))}))}))}function R_(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=t.batch.keys(),i=e.Ms.newChangeBuffer({trackRemovals:!0});return(function(u,l,d,m){const g=d.batch,E=g.keys();let S=v.resolve();return E.forEach((C=>{S=S.next((()=>m.getEntry(l,C))).next((O=>{const x=d.docVersions.get(C);L(x!==null,48541),O.version.compareTo(x)<0&&(g.applyToRemoteDocument(O,d),O.isValidDocument()&&(O.setReadTime(d.commitVersion),m.addEntry(O)))}))})),S.next((()=>u.mutationQueue.removeMutationBatch(l,g)))})(e,n,t,i).next((()=>i.apply(n))).next((()=>e.mutationQueue.performConsistencyCheck(n))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(u){let l=$();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(l=l.add(u.batch.mutations[d].key));return l})(t)))).next((()=>e.localDocuments.getDocuments(n,s)))}))}function Ad(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.ci.getLastRemoteSnapshotVersion(e)))}function S_(r,t){const e=F(r),n=t.snapshotVersion;let s=e.Cs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=e.Ms.newChangeBuffer({trackRemovals:!0});s=e.Cs;const u=[];t.targetChanges.forEach(((m,g)=>{const E=s.get(g);if(!E)return;u.push(e.ci.removeMatchingKeys(i,m.removedDocuments,g).next((()=>e.ci.addMatchingKeys(i,m.addedDocuments,g))));let S=E.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(g)!==null?S=S.withResumeToken(ht.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):m.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(m.resumeToken,n)),s=s.insert(g,S),(function(O,x,G){return O.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=A_?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0})(E,S,m)&&u.push(e.ci.updateTargetData(i,S))}));let l=kt(),d=$();if(t.documentUpdates.forEach((m=>{t.resolvedLimboDocuments.has(m)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,m))})),u.push(P_(i,a,t.documentUpdates).next((m=>{l=m.Ns,d=m.Bs}))),!n.isEqual(B.min())){const m=e.ci.getLastRemoteSnapshotVersion(i).next((g=>e.ci.setTargetsMetadata(i,i.currentSequenceNumber,n)));u.push(m)}return v.waitFor(u).next((()=>a.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,l,d))).next((()=>l))})).then((i=>(e.Cs=s,i)))}function P_(r,t,e){let n=$(),s=$();return e.forEach((i=>n=n.add(i))),t.getEntries(r,n).next((i=>{let a=kt();return e.forEach(((u,l)=>{const d=i.get(u);l.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(u)),l.isNoDocument()&&l.version.isEqual(B.min())?(t.removeEntry(u,l.readTime),a=a.insert(u,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(l),a=a.insert(u,l)):V(va,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",l.version)})),{Ns:a,Bs:s}}))}function V_(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",(n=>(t===void 0&&(t=Ke),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t))))}function ei(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return e.ci.getTargetData(n,t).next((i=>i?(s=i,v.resolve(s)):e.ci.allocateTargetId(n).next((a=>(s=new Ht(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.ci.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=e.Cs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Cs=e.Cs.insert(n.targetId,n),e.vs.set(t,n.targetId)),n}))}async function Mn(r,t,e){const n=F(r),s=n.Cs.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,(a=>n.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Se(a))throw a;V(va,`Failed to update sequence numbers for target ${t}: ${a}`)}n.Cs=n.Cs.remove(t),n.vs.delete(s.target)}function jo(r,t,e){const n=F(r);let s=B.min(),i=$();return n.persistence.runTransaction("Execute query","readwrite",(a=>(function(l,d,m){const g=F(l),E=g.vs.get(m);return E!==void 0?v.resolve(g.Cs.get(E)):g.ci.getTargetData(d,m)})(n,a,Mt(t)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.ci.getMatchingKeysForTargetId(a,u.targetId).next((l=>{i=l}))})).next((()=>n.Ds.getDocumentsMatchingQuery(a,t,e?s:B.min(),e?i:$()))).next((u=>(Sd(n,xh(t),u),{documents:u,Ls:i})))))}function bd(r,t){const e=F(r),n=F(e.ci),s=e.Cs.get(t);return s?Promise.resolve(s.target):e.persistence.runTransaction("Get target data","readonly",(i=>n.Rt(i,t).next((a=>a?a.target:null))))}function Rd(r,t){const e=F(r),n=e.Fs.get(t)||B.min();return e.persistence.runTransaction("Get new document changes","readonly",(s=>e.Ms.getAllFromCollectionGroup(s,t,Jl(n,vn),Number.MAX_SAFE_INTEGER))).then((s=>(Sd(e,t,s),s)))}function Sd(r,t,e){let n=r.Fs.get(t)||B.min();e.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Fs.set(t,n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd="firestore_clients";function rl(r,t){return`${Pd}_${r}_${t}`}const Vd="firestore_mutations";function sl(r,t,e){let n=`${Vd}_${r}_${e}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}const Cd="firestore_targets";function ho(r,t){return`${Cd}_${r}_${t}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt="SharedClientState";class ni{constructor(t,e,n,s){this.user=t,this.batchId=e,this.state=n,this.error=s}static Us(t,e,n){const s=JSON.parse(n);let i,a=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return a&&s.error&&(a=typeof s.error.message=="string"&&typeof s.error.code=="string",a&&(i=new N(s.error.code,s.error.message))),a?new ni(t,e,s.state,i):(ct(Kt,`Failed to parse mutation state for ID '${e}': ${n}`),null)}$s(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Vr{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Us(t,e){const n=JSON.parse(e);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new N(n.error.code,n.error.message))),i?new Vr(t,n.state,s):(ct(Kt,`Failed to parse target state for ID '${t}': ${e}`),null)}$s(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class ri{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Us(t,e){const n=JSON.parse(e);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=ca();for(let a=0;s&&a<n.activeTargetIds.length;++a)s=eh(n.activeTargetIds[a]),i=i.add(n.activeTargetIds[a]);return s?new ri(t,i):(ct(Kt,`Failed to parse client data for instance '${t}': ${e}`),null)}}class Aa{constructor(t,e){this.clientId=t,this.onlineState=e}static Us(t){const e=JSON.parse(t);return typeof e=="object"&&["Unknown","Online","Offline"].indexOf(e.onlineState)!==-1&&typeof e.clientId=="string"?new Aa(e.clientId,e.onlineState):(ct(Kt,`Failed to parse online state: ${t}`),null)}}class qo{constructor(){this.activeTargetIds=ca()}Ws(t){this.activeTargetIds=this.activeTargetIds.add(t)}Qs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}$s(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class fo{constructor(t,e,n,s,i){this.window=t,this.Di=e,this.persistenceKey=n,this.Gs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.zs=this.js.bind(this),this.Js=new nt(U),this.started=!1,this.Hs=[];const a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Zs=rl(this.persistenceKey,this.Gs),this.Xs=(function(l){return`firestore_sequence_number_${l}`})(this.persistenceKey),this.Js=this.Js.insert(this.Gs,new qo),this.Ys=new RegExp(`^${Pd}_${a}_([^_]*)$`),this.eo=new RegExp(`^${Vd}_${a}_(\\d+)(?:_(.*))?$`),this.no=new RegExp(`^${Cd}_${a}_(\\d+)$`),this.ro=(function(l){return`firestore_online_state_${l}`})(this.persistenceKey),this.io=(function(l){return`firestore_bundle_loaded_v2_${l}`})(this.persistenceKey),this.window.addEventListener("storage",this.zs)}static v(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.ls();for(const n of t){if(n===this.Gs)continue;const s=this.getItem(rl(this.persistenceKey,n));if(s){const i=ri.Us(n,s);i&&(this.Js=this.Js.insert(i.clientId,i))}}this.so();const e=this.storage.getItem(this.ro);if(e){const n=this.oo(e);n&&this._o(n)}for(const n of this.Hs)this.js(n);this.Hs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(t){this.setItem(this.Xs,JSON.stringify(t))}getAllActiveQueryTargets(){return this.ao(this.Js)}isActiveQueryTarget(t){let e=!1;return this.Js.forEach(((n,s)=>{s.activeTargetIds.has(t)&&(e=!0)})),e}addPendingMutation(t){this.uo(t,"pending")}updateMutationState(t,e,n){this.uo(t,e,n),this.co(t)}addLocalQueryTarget(t,e=!0){let n="not-current";if(this.isActiveQueryTarget(t)){const s=this.storage.getItem(ho(this.persistenceKey,t));if(s){const i=Vr.Us(t,s);i&&(n=i.state)}}return e&&this.lo.Ws(t),this.so(),n}removeLocalQueryTarget(t){this.lo.Qs(t),this.so()}isLocalQueryTarget(t){return this.lo.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(ho(this.persistenceKey,t))}updateQueryState(t,e,n){this.ho(t,e,n)}handleUserChange(t,e,n){e.forEach((s=>{this.co(s)})),this.currentUser=t,n.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(t){this.Po(t)}notifyBundleLoaded(t){this.To(t)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.zs),this.removeItem(this.Zs),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return V(Kt,"READ",t,e),e}setItem(t,e){V(Kt,"SET",t,e),this.storage.setItem(t,e)}removeItem(t){V(Kt,"REMOVE",t),this.storage.removeItem(t)}js(t){const e=t;if(e.storageArea===this.storage){if(V(Kt,"EVENT",e.key,e.newValue),e.key===this.Zs)return void ct("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Di.enqueueRetryable((async()=>{if(this.started){if(e.key!==null){if(this.Ys.test(e.key)){if(e.newValue==null){const n=this.Io(e.key);return this.Eo(n,null)}{const n=this.Ro(e.key,e.newValue);if(n)return this.Eo(n.clientId,n)}}else if(this.eo.test(e.key)){if(e.newValue!==null){const n=this.Ao(e.key,e.newValue);if(n)return this.Vo(n)}}else if(this.no.test(e.key)){if(e.newValue!==null){const n=this.mo(e.key,e.newValue);if(n)return this.fo(n)}}else if(e.key===this.ro){if(e.newValue!==null){const n=this.oo(e.newValue);if(n)return this._o(n)}}else if(e.key===this.Xs){const n=(function(i){let a=Ct.ce;if(i!=null)try{const u=JSON.parse(i);L(typeof u=="number",30636,{po:i}),a=u}catch(u){ct(Kt,"Failed to read sequence number from WebStorage",u)}return a})(e.newValue);n!==Ct.ce&&this.sequenceNumberHandler(n)}else if(e.key===this.io){const n=this.yo(e.newValue);await Promise.all(n.map((s=>this.syncEngine.wo(s))))}}}else this.Hs.push(e)}))}}get lo(){return this.Js.get(this.Gs)}so(){this.setItem(this.Zs,this.lo.$s())}uo(t,e,n){const s=new ni(this.currentUser,t,e,n),i=sl(this.persistenceKey,this.currentUser,t);this.setItem(i,s.$s())}co(t){const e=sl(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Po(t){const e={clientId:this.Gs,onlineState:t};this.storage.setItem(this.ro,JSON.stringify(e))}ho(t,e,n){const s=ho(this.persistenceKey,t),i=new Vr(t,e,n);this.setItem(s,i.$s())}To(t){const e=JSON.stringify(Array.from(t));this.setItem(this.io,e)}Io(t){const e=this.Ys.exec(t);return e?e[1]:null}Ro(t,e){const n=this.Io(t);return ri.Us(n,e)}Ao(t,e){const n=this.eo.exec(t),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return ni.Us(new wt(i),s,e)}mo(t,e){const n=this.no.exec(t),s=Number(n[1]);return Vr.Us(s,e)}oo(t){return Aa.Us(t)}yo(t){return JSON.parse(t)}async Vo(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.So(t.batchId,t.state,t.error);V(Kt,`Ignoring mutation for non-active user ${t.user.uid}`)}fo(t){return this.syncEngine.bo(t.targetId,t.state,t.error)}Eo(t,e){const n=e?this.Js.insert(t,e):this.Js.remove(t),s=this.ao(this.Js),i=this.ao(n),a=[],u=[];return i.forEach((l=>{s.has(l)||a.push(l)})),s.forEach((l=>{i.has(l)||u.push(l)})),this.syncEngine.Do(a,u).then((()=>{this.Js=n}))}_o(t){this.Js.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}ao(t){let e=ca();return t.forEach(((n,s)=>{e=e.unionWith(s.activeTargetIds)})),e}}class Dd{constructor(){this.Co=new qo,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.Co.Ws(t),this.vo[t]||"not-current"}updateQueryState(t,e,n){this.vo[t]=e}removeLocalQueryTarget(t){this.Co.Qs(t)}isLocalQueryTarget(t){return this.Co.activeTargetIds.has(t)}clearQueryState(t){delete this.vo[t]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(t){return this.Co.activeTargetIds.has(t)}start(){return this.Co=new qo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{Fo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il="ConnectivityMonitor";class ol{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(t){this.Bo.push(t)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){V(il,"Network connectivity changed: AVAILABLE");for(const t of this.Bo)t(0)}No(){V(il,"Network connectivity changed: UNAVAILABLE");for(const t of this.Bo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let As=null;function zo(){return As===null?As=(function(){return 268435456+Math.round(2147483648*Math.random())})():As++,"0x"+As.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mo="RestConnection",D_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class x_{get ko(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=e+"://"+t.host,this.Ko=`projects/${n}/databases/${s}`,this.Uo=this.databaseId.database===$s?`project_id=${n}`:`project_id=${n}&database_id=${s}`}$o(t,e,n,s,i){const a=zo(),u=this.Wo(t,e.toUriEncodedString());V(mo,`Sending RPC '${t}' ${a}:`,u,n);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(l,s,i);const{host:d}=new URL(u),m=kl(d);return this.Go(t,u,l,n,m).then((g=>(V(mo,`Received RPC '${t}' ${a}: `,g),g)),(g=>{throw Tn(mo,`RPC '${t}' ${a} failed with error: `,g,"url: ",u,"request:",n),g}))}zo(t,e,n,s,i,a){return this.$o(t,e,n,s,i)}Qo(t,e,n){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+jn})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),n&&n.headers.forEach(((s,i)=>t[i]=s))}Wo(t,e){const n=D_[t];let s=`${this.qo}/v1/${e}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(t){this.jo=t.jo,this.Jo=t.Jo}Ho(t){this.Zo=t}Xo(t){this.Yo=t}e_(t){this.t_=t}onMessage(t){this.n_=t}close(){this.Jo()}send(t){this.jo(t)}r_(){this.Zo()}i_(){this.Yo()}s_(t){this.t_(t)}o_(t){this.n_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt="WebChannelConnection",gr=(r,t,e)=>{r.listen(t,(n=>{try{e(n)}catch(s){setTimeout((()=>{throw s}),0)}}))};class yn extends x_{constructor(t){super(t),this.__=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static a_(){if(!yn.u_){const t=$l();gr(t,zl.STAT_EVENT,(e=>{e.stat===wo.PROXY?V(Tt,"STAT_EVENT: detected buffering proxy"):e.stat===wo.NOPROXY&&V(Tt,"STAT_EVENT: detected no buffering proxy")})),yn.u_=!0}}Go(t,e,n,s,i){const a=zo();return new Promise(((u,l)=>{const d=new jl;d.setWithCredentials(!0),d.listenOnce(ql.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case bs.NO_ERROR:const g=d.getResponseJson();V(Tt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(g)),u(g);break;case bs.TIMEOUT:V(Tt,`RPC '${t}' ${a} timed out`),l(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case bs.HTTP_ERROR:const E=d.getStatus();if(V(Tt,`RPC '${t}' ${a} failed with status:`,E,"response text:",d.getResponseText()),E>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S==null?void 0:S.error;if(C&&C.status&&C.message){const O=(function(G){const q=G.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(q)>=0?q:P.UNKNOWN})(C.status);l(new N(O,C.message))}else l(new N(P.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new N(P.UNAVAILABLE,"Connection failed."));break;default:M(9055,{c_:t,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{V(Tt,`RPC '${t}' ${a} completed.`)}}));const m=JSON.stringify(s);V(Tt,`RPC '${t}' ${a} sending request:`,s),d.send(e,"POST",m,n,15)}))}P_(t,e,n){const s=zo(),i=[this.qo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(u.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Qo(u.initMessageHeaders,e,n),u.encodeInitMessageHeaders=!0;const d=i.join("");V(Tt,`Creating RPC '${t}' stream ${s}: ${d}`,u);const m=a.createWebChannel(d,u);this.T_(m);let g=!1,E=!1;const S=new N_({jo:C=>{E?V(Tt,`Not sending because RPC '${t}' stream ${s} is closed:`,C):(g||(V(Tt,`Opening RPC '${t}' stream ${s} transport.`),m.open(),g=!0),V(Tt,`RPC '${t}' stream ${s} sending:`,C),m.send(C))},Jo:()=>m.close()});return gr(m,pr.EventType.OPEN,(()=>{E||(V(Tt,`RPC '${t}' stream ${s} transport opened.`),S.r_())})),gr(m,pr.EventType.CLOSE,(()=>{E||(E=!0,V(Tt,`RPC '${t}' stream ${s} transport closed`),S.s_(),this.I_(m))})),gr(m,pr.EventType.ERROR,(C=>{E||(E=!0,Tn(Tt,`RPC '${t}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),S.s_(new N(P.UNAVAILABLE,"The operation could not be completed")))})),gr(m,pr.EventType.MESSAGE,(C=>{var O;if(!E){const x=C.data[0];L(!!x,16349);const G=x,q=(G==null?void 0:G.error)||((O=G[0])==null?void 0:O.error);if(q){V(Tt,`RPC '${t}' stream ${s} received error:`,q);const j=q.status;let rt=(function(I){const p=dt[I];if(p!==void 0)return $h(p)})(j),W=q.message;j==="NOT_FOUND"&&W.includes("database")&&W.includes("does not exist")&&W.includes(this.databaseId.database)&&Tn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),rt===void 0&&(rt=P.INTERNAL,W="Unknown error status: "+j+" with message "+q.message),E=!0,S.s_(new N(rt,W)),m.close()}else V(Tt,`RPC '${t}' stream ${s} received:`,x),S.o_(x)}})),yn.a_(),setTimeout((()=>{S.i_()}),0),S}terminate(){this.__.forEach((t=>t.close())),this.__=[]}T_(t){this.__.push(t)}I_(t){this.__=this.__.filter((e=>e===t))}Qo(t,e,n){super.Qo(t,e,n),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Kl()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_(r){return new yn(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xd(){return typeof window<"u"?window:null}function Os(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vi(r){return new Up(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */yn.u_=!1;class Nd{constructor(t,e,n=1e3,s=1.5,i=6e4){this.Di=t,this.timerId=e,this.E_=n,this.R_=s,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(t){this.cancel();const e=Math.floor(this.V_+this.p_()),n=Math.max(0,Date.now()-this.m_),s=Math.max(0,e-n);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),t()))),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al="PersistentStream";class kd{constructor(t,e,n,s,i,a,u,l){this.Di=t,this.w_=n,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new Nd(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(t,e){this.q_(),this.K_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(ct(e.toString()),ct("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.e_(e)}U_(){}auth(){this.state=1;const t=this.W_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.b_===e&&this.Q_(n,s)}),(n=>{t((()=>{const s=new N(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.G_(s)}))}))}Q_(t,e){const n=this.W_(this.b_);this.stream=this.z_(t,e),this.stream.Ho((()=>{n((()=>this.listener.Ho()))})),this.stream.Xo((()=>{n((()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.Xo())))})),this.stream.e_((s=>{n((()=>this.G_(s)))})),this.stream.onMessage((s=>{n((()=>++this.v_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(t){return V(al,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Di.enqueueAndForget((()=>this.b_===t?e():(V(al,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class O_ extends kd{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();const e=zp(this.serializer,t),n=(function(i){if(!("targetChange"in i))return B.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?Pt(a.readTime):B.min()})(t);return this.listener.J_(e,n)}H_(t){const e={};e.database=Mo(this.serializer),e.addTarget=(function(i,a){let u;const l=a.target;if(u=Gs(l)?{documents:Yh(i,l)}:{query:Zh(i,l).dt},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Qh(i,a.resumeToken);const d=ko(i,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(B.min())>0){u.readTime=On(i,a.snapshotVersion.toTimestamp());const d=ko(i,a.expectedCount);d!==null&&(u.expectedCount=d)}return u})(this.serializer,t);const n=Kp(this.serializer,t);n&&(e.labels=n),this.k_(e)}Z_(t){const e={};e.database=Mo(this.serializer),e.removeTarget=t,this.k_(e)}}class M_ extends kd{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(t,e){return this.connection.P_("Write",t,e)}j_(t){return L(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,L(!t.writeResults||t.writeResults.length===0,55816),this.listener.ea()}onNext(t){L(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.F_.reset();const e=$p(t.writeResults,t.commitTime),n=Pt(t.commitTime);return this.listener.ta(n,e)}na(){const t={};t.database=Mo(this.serializer),this.k_(t)}Y_(t){const e={streamToken:this.lastStreamToken,writes:t.map((n=>Js(this.serializer,n)))};this.k_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{}class L_ extends F_{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}$o(t,e,n,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.$o(t,Oo(e,n),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(P.UNKNOWN,i.toString())}))}zo(t,e,n,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection.zo(t,Oo(e,n),s,a,u,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new N(P.UNKNOWN,a.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}function B_(r,t,e,n){return new L_(r,t,e,n)}class U_{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(ct(e),this._a=!1):V("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="RemoteStore";class j_{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new ne(1e3),this.Aa=new ne(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo((a=>{n.enqueueAndForget((async()=>{en(this)&&(V(Yt,"Restarting streams for network reachability change."),await(async function(l){const d=F(l);d.Va.add(4),await ts(d),d.fa.set("Unknown"),d.Va.delete(4),await Ai(d)})(this))}))})),this.fa=new U_(n,s)}}async function Ai(r){if(en(r))for(const t of r.da)await t(!0)}async function ts(r){for(const t of r.da)await t(!1)}function $o(r,t){return r.Ia.get(t)||void 0}function bi(r,t){const e=F(r),n=$o(e,t.targetId);if(n!==void 0&&e.Ta.has(n))return;const s=(function(u,l){const d=$o(u,l);d!==void 0&&u.Ea.delete(d);const m=(function(E,S){return S%2!=0?E.Aa.next():E.Ra.next()})(u,l);return u.Ia.set(l,m),u.Ea.set(m,l),m})(e,t.targetId);V(Yt,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const i=new Ht(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);e.Ta.set(s,i),Sa(e)?Ra(e):Kn(e).x_()&&ba(e,i)}function Fn(r,t){const e=F(r),n=Kn(e),s=$o(e,t);V(Yt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),e.Ta.delete(s),e.Ia.delete(t),e.Ea.delete(s),n.x_()&&Od(e,s),e.Ta.size===0&&(n.x_()?n.B_():en(e)&&e.fa.set("Unknown"))}function ba(r,t){if(r.ga.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(B.min())>0){const e=r.Ea.get(t.targetId);if(e===void 0)return void V(Yt,"SDK target ID not found for remote ID: "+t.targetId);const n=r.remoteSyncer.getRemoteKeysForTarget(e).size;t=t.withExpectedCount(n)}Kn(r).H_(t)}function Od(r,t){r.ga.$e(t),Kn(r).Z_(t)}function Ra(r){r.ga=new Mp({getRemoteKeysForTarget:t=>{const e=r.Ea.get(t);return e!==void 0?r.remoteSyncer.getRemoteKeysForTarget(e):$()},Rt:t=>r.Ta.get(t)||null,lt:()=>r.datastore.serializer.databaseId}),Kn(r).start(),r.fa.aa()}function Sa(r){return en(r)&&!Kn(r).M_()&&r.Ta.size>0}function en(r){return F(r).Va.size===0}function Md(r){r.ga=void 0}async function q_(r){r.fa.set("Online")}async function z_(r){r.Ta.forEach(((t,e)=>{ba(r,t)}))}async function $_(r,t){Md(r),Sa(r)?(r.fa.la(t),Ra(r)):r.fa.set("Unknown")}async function K_(r,t,e){if(r.fa.set("Online"),t instanceof Gh&&t.state===2&&t.cause)try{await(async function(s,i){const a=i.cause;for(const u of i.targetIds){if(s.Ta.has(u)){const l=s.Ea.get(u);l!==void 0&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Ea.delete(u)),s.Ta.delete(u)}s.ga.removeTarget(u)}})(r,t)}catch(n){V(Yt,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await si(r,n)}else if(t instanceof Ns?r.ga.Xe(t):t instanceof Kh?r.ga.it(t):r.ga.tt(t),!e.isEqual(B.min()))try{const n=await Ad(r.localStore);e.compareTo(n)>=0&&await(function(i,a){const u=i.ga.Pt(a);u.targetChanges.forEach(((d,m)=>{if(d.resumeToken.approximateByteSize()>0){const g=i.Ta.get(m);g&&i.Ta.set(m,g.withResumeToken(d.resumeToken,a))}})),u.targetMismatches.forEach(((d,m)=>{const g=i.Ta.get(d);if(!g)return;i.Ta.set(d,g.withResumeToken(ht.EMPTY_BYTE_STRING,g.snapshotVersion)),Od(i,d);const E=new Ht(g.target,d,m,g.sequenceNumber);ba(i,E)}));const l=(function(m,g){const E=new Map;g.targetChanges.forEach(((C,O)=>{const x=m.Ea.get(O);x!==void 0&&E.set(x,C)}));let S=new nt(U);return g.targetMismatches.forEach(((C,O)=>{const x=m.Ea.get(C);x!==void 0&&(S=S.insert(x,O))})),new zn(g.snapshotVersion,E,S,g.documentUpdates,g.resolvedLimboDocuments)})(i,u);return i.remoteSyncer.applyRemoteEvent(l)})(r,e)}catch(n){V(Yt,"Failed to raise snapshot:",n),await si(r,n)}}async function si(r,t,e){if(!Se(t))throw t;r.Va.add(1),await ts(r),r.fa.set("Offline"),e||(e=()=>Ad(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{V(Yt,"Retrying IndexedDB access"),await e(),r.Va.delete(1),await Ai(r)}))}function Fd(r,t){return t().catch((e=>si(r,e,t)))}async function $n(r){const t=F(r),e=Ae(t);let n=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:Ke;for(;G_(t);)try{const s=await V_(t.localStore,n);if(s===null){t.Pa.length===0&&e.B_();break}n=s.batchId,Q_(t,s)}catch(s){await si(t,s)}Ld(t)&&Bd(t)}function G_(r){return en(r)&&r.Pa.length<10}function Q_(r,t){r.Pa.push(t);const e=Ae(r);e.x_()&&e.X_&&e.Y_(t.mutations)}function Ld(r){return en(r)&&!Ae(r).M_()&&r.Pa.length>0}function Bd(r){Ae(r).start()}async function H_(r){Ae(r).na()}async function W_(r){const t=Ae(r);for(const e of r.Pa)t.Y_(e.mutations)}async function J_(r,t,e){const n=r.Pa.shift(),s=fa.from(n,t,e);await Fd(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await $n(r)}async function X_(r,t){t&&Ae(r).X_&&await(async function(n,s){if((function(a){return Np(a)&&a!==P.ABORTED})(s.code)){const i=n.Pa.shift();Ae(n).N_(),await Fd(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await $n(n)}})(r,t),Ld(r)&&Bd(r)}async function ul(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),V(Yt,"RemoteStore received new credentials");const n=en(e);e.Va.add(3),await ts(e),n&&e.fa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Va.delete(3),await Ai(e)}async function Ko(r,t){const e=F(r);t?(e.Va.delete(2),await Ai(e)):t||(e.Va.add(2),await ts(e),e.fa.set("Unknown"))}function Kn(r){return r.pa||(r.pa=(function(e,n,s){const i=F(e);return i.ia(),new O_(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Ho:q_.bind(null,r),Xo:z_.bind(null,r),e_:$_.bind(null,r),J_:K_.bind(null,r)}),r.da.push((async t=>{t?(r.pa.N_(),Sa(r)?Ra(r):r.fa.set("Unknown")):(await r.pa.stop(),Md(r))}))),r.pa}function Ae(r){return r.ya||(r.ya=(function(e,n,s){const i=F(e);return i.ia(),new M_(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Ho:()=>Promise.resolve(),Xo:H_.bind(null,r),e_:X_.bind(null,r),ea:W_.bind(null,r),ta:J_.bind(null,r)}),r.da.push((async t=>{t?(r.ya.N_(),await $n(r)):(await r.ya.stop(),r.Pa.length>0&&(V(Yt,`Stopping write stream with ${r.Pa.length} pending writes`),r.Pa=[]))}))),r.ya}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,u=new Pa(t,e,a,s,i);return u.start(n),u}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Va(r,t){if(ct("AsyncQueue",`${t}: ${r}`),Se(r))return new N(P.UNAVAILABLE,`${t}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{static emptySet(t){return new In(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||k.comparator(e.key,n.key):(e,n)=>k.comparator(e.key,n.key),this.keyedMap=_r(),this.sortedSet=new nt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof In)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new In;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(){this.wa=new nt(k.comparator)}track(t){const e=t.doc.key,n=this.wa.get(e);n?t.type!==0&&n.type===3?this.wa=this.wa.insert(e,t):t.type===3&&n.type!==1?this.wa=this.wa.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.wa=this.wa.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.wa=this.wa.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.wa=this.wa.remove(e):t.type===1&&n.type===2?this.wa=this.wa.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.wa=this.wa.insert(e,{type:2,doc:t.doc}):M(63341,{At:t,Sa:n}):this.wa=this.wa.insert(e,t)}ba(){const t=[];return this.wa.inorderTraversal(((e,n)=>{t.push(n)})),t}}class Ln{constructor(t,e,n,s,i,a,u,l,d){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach((u=>{a.push({type:0,doc:u})})),new Ln(t,e,In.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&pi(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some((t=>t.Fa()))}}class Z_{constructor(){this.queries=ll(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(e,n){const s=F(e),i=s.queries;s.queries=ll(),i.forEach(((a,u)=>{for(const l of u.Ca)l.onError(n)}))})(this,new N(P.ABORTED,"Firestore shutting down"))}}function ll(){return new se((r=>Dh(r)),pi)}async function Ca(r,t){const e=F(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.va()&&t.Fa()&&(n=2):(i=new Y_,n=t.Fa()?0:1);try{switch(n){case 0:i.Da=await e.onListen(s,!0);break;case 1:i.Da=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=Va(a,`Initialization of query '${fn(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.Ca.push(t),t.xa(e.onlineState),i.Da&&t.Oa(i.Da)&&xa(e)}async function Da(r,t){const e=F(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.Ca.indexOf(t);a>=0&&(i.Ca.splice(a,1),i.Ca.length===0?s=t.Fa()?0:1:!i.va()&&t.Fa()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function ty(r,t){const e=F(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const u of a.Ca)u.Oa(s)&&(n=!0);a.Da=s}}n&&xa(e)}function ey(r,t,e){const n=F(r),s=n.queries.get(t);if(s)for(const i of s.Ca)i.onError(e);n.queries.delete(t)}function xa(r){r.Ma.forEach((t=>{t.next()}))}var Go,hl;(hl=Go||(Go={})).Na="default",hl.Cache="cache";class Na{constructor(t,e,n){this.query=t,this.Ba=e,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=n||{}}Oa(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new Ln(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.La?this.qa(t)&&(this.Ba.next(t),e=!0):this.Ka(t,this.onlineState)&&(this.Ua(t),e=!0),this.ka=t,e}onError(t){this.Ba.error(t)}xa(t){this.onlineState=t;let e=!1;return this.ka&&!this.La&&this.Ka(this.ka,t)&&(this.Ua(this.ka),e=!0),e}Ka(t,e){if(!t.fromCache||!this.Fa())return!0;const n=e!=="Offline";return(!this.options.$a||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}qa(t){if(t.docChanges.length>0)return!0;const e=this.ka&&this.ka.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}Ua(t){t=Ln.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.La=!0,this.Ba.next(t)}Fa(){return this.options.source!==Go.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(t){this.key=t}}class jd{constructor(t){this.key=t}}class ny{constructor(t,e){this.query=t,this.eu=e,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=$(),this.mutatedKeys=$(),this.ru=Nh(t),this.iu=new In(this.ru)}get su(){return this.eu}ou(t,e){const n=e?e._u:new cl,s=e?e.iu:this.iu;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((m,g)=>{const E=s.get(m),S=Xr(this.query,g)?g:null,C=!!E&&this.mutatedKeys.has(E.key),O=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let x=!1;E&&S?E.data.isEqual(S.data)?C!==O&&(n.track({type:3,doc:S}),x=!0):this.au(E,S)||(n.track({type:2,doc:S}),x=!0,(l&&this.ru(S,l)>0||d&&this.ru(S,d)<0)&&(u=!0)):!E&&S?(n.track({type:0,doc:S}),x=!0):E&&!S&&(n.track({type:1,doc:E}),x=!0,(l||d)&&(u=!0)),x&&(S?(a=a.add(S),i=O?i.add(m):i.delete(m)):(a=a.delete(m),i=i.delete(m)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),i=i.delete(m.key),n.track({type:1,doc:m})}return{iu:a,_u:n,Ss:u,mutatedKeys:i}}au(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.iu;this.iu=t.iu,this.mutatedKeys=t.mutatedKeys;const a=t._u.ba();a.sort(((m,g)=>(function(S,C){const O=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{At:x})}};return O(S)-O(C)})(m.type,g.type)||this.ru(m.doc,g.doc))),this.uu(n),s=s??!1;const u=e&&!s?this.cu():[],l=this.nu.size===0&&this.current&&!s?1:0,d=l!==this.tu;return this.tu=l,a.length!==0||d?{snapshot:new Ln(this.query,t.iu,i,a,t.mutatedKeys,l===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),lu:u}:{lu:u}}xa(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new cl,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(t){return!this.eu.has(t)&&!!this.iu.has(t)&&!this.iu.get(t).hasLocalMutations}uu(t){t&&(t.addedDocuments.forEach((e=>this.eu=this.eu.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.eu=this.eu.delete(e))),this.current=t.current)}cu(){if(!this.current)return[];const t=this.nu;this.nu=$(),this.iu.forEach((n=>{this.hu(n.key)&&(this.nu=this.nu.add(n.key))}));const e=[];return t.forEach((n=>{this.nu.has(n)||e.push(new jd(n))})),this.nu.forEach((n=>{t.has(n)||e.push(new Ud(n))})),e}Pu(t){this.eu=t.Ls,this.nu=$();const e=this.ou(t.documents);return this.applyChanges(e,!0)}Tu(){return Ln.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const Gn="SyncEngine";class ry{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class sy{constructor(t){this.key=t,this.Iu=!1}}class iy{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Eu={},this.Ru=new se((u=>Dh(u)),pi),this.Au=new Map,this.Vu=new Set,this.du=new nt(k.comparator),this.mu=new Map,this.fu=new Ia,this.gu={},this.pu=new Map,this.yu=ne._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function oy(r,t,e=!0){const n=Ri(r);let s;const i=n.Ru.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Tu()):s=await qd(n,t,e,!0),s}async function ay(r,t){const e=Ri(r);await qd(e,t,!0,!1)}async function qd(r,t,e,n){const s=await ei(r.localStore,Mt(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let u;return n&&(u=await ka(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&bi(r.remoteStore,s),u}async function ka(r,t,e,n,s){r.Su=(g,E,S)=>(async function(O,x,G,q){let j=x.view.ou(G);j.Ss&&(j=await jo(O.localStore,x.query,!1).then((({documents:I})=>x.view.ou(I,j))));const rt=q&&q.targetChanges.get(x.targetId),W=q&&q.targetMismatches.get(x.targetId)!=null,J=x.view.applyChanges(j,O.isPrimaryClient,rt,W);return Qo(O,x.targetId,J.lu),J.snapshot})(r,g,E,S);const i=await jo(r.localStore,t,!0),a=new ny(t,i.Ls),u=a.ou(i.documents),l=Zr.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),d=a.applyChanges(u,r.isPrimaryClient,l);Qo(r,e,d.lu);const m=new ry(t,e,a);return r.Ru.set(t,m),r.Au.has(e)?r.Au.get(e).push(t):r.Au.set(e,[t]),d.snapshot}async function uy(r,t,e){const n=F(r),s=n.Ru.get(t),i=n.Au.get(s.targetId);if(i.length>1)return n.Au.set(s.targetId,i.filter((a=>!pi(a,t)))),void n.Ru.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Mn(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),e&&Fn(n.remoteStore,s.targetId),Bn(n,s.targetId)})).catch(Re)):(Bn(n,s.targetId),await Mn(n.localStore,s.targetId,!0))}async function cy(r,t){const e=F(r),n=e.Ru.get(t),s=e.Au.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Fn(e.remoteStore,n.targetId))}async function ly(r,t,e){const n=La(r);try{const s=await(function(a,u){const l=F(a),d=Y.now(),m=u.reduce(((S,C)=>S.add(C.key)),$());let g,E;return l.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let C=kt(),O=$();return l.Ms.getEntries(S,m).next((x=>{C=x,C.forEach(((G,q)=>{q.isValidDocument()||(O=O.add(G))}))})).next((()=>l.localDocuments.getOverlayedDocuments(S,C))).next((x=>{g=x;const G=[];for(const q of u){const j=Dp(q,g.get(q.key).overlayedDocument);j!=null&&G.push(new ie(q.key,j,wh(j.value.mapValue),yt.exists(!0)))}return l.mutationQueue.addMutationBatch(S,d,G,u)})).next((x=>{E=x;const G=x.applyToLocalDocumentSet(g,O);return l.documentOverlayCache.saveOverlays(S,x.batchId,G)}))})).then((()=>({batchId:E.batchId,changes:Oh(g)})))})(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),(function(a,u,l){let d=a.gu[a.currentUser.toKey()];d||(d=new nt(U)),d=d.insert(u,l),a.gu[a.currentUser.toKey()]=d})(n,s.batchId,e),await Ve(n,s.changes),await $n(n.remoteStore)}catch(s){const i=Va(s,"Failed to persist write");e.reject(i)}}async function zd(r,t){const e=F(r);try{const n=await S_(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const a=e.mu.get(i);a&&(L(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Iu=!0:s.modifiedDocuments.size>0?L(a.Iu,14607):s.removedDocuments.size>0&&(L(a.Iu,42227),a.Iu=!1))})),await Ve(e,n,t)}catch(n){await Re(n)}}function dl(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.Ru.forEach(((i,a)=>{const u=a.view.xa(t);u.snapshot&&s.push(u.snapshot)})),(function(a,u){const l=F(a);l.onlineState=u;let d=!1;l.queries.forEach(((m,g)=>{for(const E of g.Ca)E.xa(u)&&(d=!0)})),d&&xa(l)})(n.eventManager,t),s.length&&n.Eu.J_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function hy(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.mu.get(t),i=s&&s.key;if(i){let a=new nt(k.comparator);a=a.insert(i,ut.newNoDocument(i,B.min()));const u=$().add(i),l=new zn(B.min(),new Map,new nt(U),a,u);await zd(n,l),n.du=n.du.remove(i),n.mu.delete(t),Fa(n)}else await Mn(n.localStore,t,!1).then((()=>Bn(n,t,e))).catch(Re)}async function dy(r,t){const e=F(r),n=t.batch.batchId;try{const s=await R_(e.localStore,t);Ma(e,n,null),Oa(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await Ve(e,s)}catch(s){await Re(s)}}async function fy(r,t,e){const n=F(r);try{const s=await(function(a,u){const l=F(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let m;return l.mutationQueue.lookupMutationBatch(d,u).next((g=>(L(g!==null,37113),m=g.keys(),l.mutationQueue.removeMutationBatch(d,g)))).next((()=>l.mutationQueue.performConsistencyCheck(d))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(d,m,u))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m))).next((()=>l.localDocuments.getDocuments(d,m)))}))})(n.localStore,t);Ma(n,t,e),Oa(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await Ve(n,s)}catch(s){await Re(s)}}function Oa(r,t){(r.pu.get(t)||[]).forEach((e=>{e.resolve()})),r.pu.delete(t)}function Ma(r,t,e){const n=F(r);let s=n.gu[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.gu[n.currentUser.toKey()]=s}}function Bn(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Au.get(t))r.Ru.delete(n),e&&r.Eu.bu(n,e);r.Au.delete(t),r.isPrimaryClient&&r.fu.Qr(t).forEach((n=>{r.fu.containsKey(n)||$d(r,n)}))}function $d(r,t){r.Vu.delete(t.path.canonicalString());const e=r.du.get(t);e!==null&&(Fn(r.remoteStore,e),r.du=r.du.remove(t),r.mu.delete(e),Fa(r))}function Qo(r,t,e){for(const n of e)n instanceof Ud?(r.fu.addReference(n.key,t),my(r,n)):n instanceof jd?(V(Gn,"Document no longer in limbo: "+n.key),r.fu.removeReference(n.key,t),r.fu.containsKey(n.key)||$d(r,n.key)):M(19791,{Du:n})}function my(r,t){const e=t.key,n=e.path.canonicalString();r.du.get(e)||r.Vu.has(n)||(V(Gn,"New document in limbo: "+e),r.Vu.add(n),Fa(r))}function Fa(r){for(;r.Vu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const t=r.Vu.values().next().value;r.Vu.delete(t);const e=new k(X.fromString(t)),n=r.yu.next();r.mu.set(n,new sy(e)),r.du=r.du.insert(e,n),bi(r.remoteStore,new Ht(Mt(Jr(e.path)),n,"TargetPurposeLimboResolution",Ct.ce))}}async function Ve(r,t,e){const n=F(r),s=[],i=[],a=[];n.Ru.isEmpty()||(n.Ru.forEach(((u,l)=>{a.push(n.Su(l,t,e).then((d=>{var m;if((d||e)&&n.isPrimaryClient){const g=d?!d.fromCache:(m=e==null?void 0:e.targetChanges.get(l.targetId))==null?void 0:m.current;n.sharedClientState.updateQueryState(l.targetId,g?"current":"not-current")}if(d){s.push(d);const g=wa.Is(l.targetId,d);i.push(g)}})))})),await Promise.all(a),n.Eu.J_(s),await(async function(l,d){const m=F(l);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",(g=>v.forEach(d,(E=>v.forEach(E.Ps,(S=>m.persistence.referenceDelegate.addReference(g,E.targetId,S))).next((()=>v.forEach(E.Ts,(S=>m.persistence.referenceDelegate.removeReference(g,E.targetId,S)))))))))}catch(g){if(!Se(g))throw g;V(va,"Failed to update sequence numbers: "+g)}for(const g of d){const E=g.targetId;if(!g.fromCache){const S=m.Cs.get(E),C=S.snapshotVersion,O=S.withLastLimboFreeSnapshotVersion(C);m.Cs=m.Cs.insert(E,O)}}})(n.localStore,i))}async function gy(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){V(Gn,"User change. New user:",t.toKey());const n=await vd(e.localStore,t);e.currentUser=t,(function(i,a){i.pu.forEach((u=>{u.forEach((l=>{l.reject(new N(P.CANCELLED,a))}))})),i.pu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await Ve(e,n.Os)}}function py(r,t){const e=F(r),n=e.mu.get(t);if(n&&n.Iu)return $().add(n.key);{let s=$();const i=e.Au.get(t);if(!i)return s;for(const a of i){const u=e.Ru.get(a);s=s.unionWith(u.view.su)}return s}}async function _y(r,t){const e=F(r),n=await jo(e.localStore,t.query,!0),s=t.view.Pu(n);return e.isPrimaryClient&&Qo(e,t.targetId,s.lu),s}async function yy(r,t){const e=F(r);return Rd(e.localStore,t).then((n=>Ve(e,n)))}async function Iy(r,t,e,n){const s=F(r),i=await(function(u,l){const d=F(u),m=F(d.mutationQueue);return d.persistence.runTransaction("Lookup mutation documents","readonly",(g=>m.Zn(g,l).next((E=>E?d.localDocuments.getDocuments(g,E):v.resolve(null)))))})(s.localStore,t);i!==null?(e==="pending"?await $n(s.remoteStore):e==="acknowledged"||e==="rejected"?(Ma(s,t,n||null),Oa(s,t),(function(u,l){F(F(u).mutationQueue).tr(l)})(s.localStore,t)):M(6720,"Unknown batchState",{Cu:e}),await Ve(s,i)):V(Gn,"Cannot apply mutation batch with id: "+t)}async function Ey(r,t){const e=F(r);if(Ri(e),La(e),t===!0&&e.wu!==!0){const n=e.sharedClientState.getAllActiveQueryTargets(),s=await fl(e,n.toArray());e.wu=!0,await Ko(e.remoteStore,!0);for(const i of s)bi(e.remoteStore,i)}else if(t===!1&&e.wu!==!1){const n=[];let s=Promise.resolve();e.Au.forEach(((i,a)=>{e.sharedClientState.isLocalQueryTarget(a)?n.push(a):s=s.then((()=>(Bn(e,a),Mn(e.localStore,a,!0)))),Fn(e.remoteStore,a)})),await s,await fl(e,n),(function(a){const u=F(a);u.mu.forEach(((l,d)=>{Fn(u.remoteStore,d)})),u.fu.Gr(),u.mu=new Map,u.du=new nt(k.comparator)})(e),e.wu=!1,await Ko(e.remoteStore,!1)}}async function fl(r,t,e){const n=F(r),s=[],i=[];for(const a of t){let u;const l=n.Au.get(a);if(l&&l.length!==0){u=await ei(n.localStore,Mt(l[0]));for(const d of l){const m=n.Ru.get(d),g=await _y(n,m);g.snapshot&&i.push(g.snapshot)}}else{const d=await bd(n.localStore,a);u=await ei(n.localStore,d),await ka(n,Kd(d),a,!1,u.resumeToken)}s.push(u)}return n.Eu.J_(i),s}function Kd(r){return Ch(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function Ty(r){return(function(e){return F(F(e).persistence).ls()})(F(r).localStore)}async function wy(r,t,e,n){const s=F(r);if(s.wu)return void V(Gn,"Ignoring unexpected query state notification.");const i=s.Au.get(t);if(i&&i.length>0)switch(e){case"current":case"not-current":{const a=await Rd(s.localStore,xh(i[0])),u=zn.createSynthesizedRemoteEventForCurrentChange(t,e==="current",ht.EMPTY_BYTE_STRING);await Ve(s,a,u);break}case"rejected":await Mn(s.localStore,t,!0),Bn(s,t,n);break;default:M(64155,e)}}async function vy(r,t,e){const n=Ri(r);if(n.wu){for(const s of t){if(n.Au.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){V(Gn,"Adding an already active target "+s);continue}const i=await bd(n.localStore,s),a=await ei(n.localStore,i);await ka(n,Kd(i),a.targetId,!1,a.resumeToken),bi(n.remoteStore,a)}for(const s of e)n.Au.has(s)&&await Mn(n.localStore,s,!1).then((()=>{Fn(n.remoteStore,s),Bn(n,s)})).catch(Re)}}function Ri(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=zd.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=py.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=hy.bind(null,t),t.Eu.J_=ty.bind(null,t.eventManager),t.Eu.bu=ey.bind(null,t.eventManager),t}function La(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=dy.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=fy.bind(null,t),t}class $r{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=vi(t.databaseInfo.databaseId),this.sharedClientState=this.Fu(t),this.persistence=this.Mu(t),await this.persistence.start(),this.localStore=this.xu(t),this.gcScheduler=this.Ou(t,this.localStore),this.indexBackfillerScheduler=this.Nu(t,this.localStore)}Ou(t,e){return null}Nu(t,e){return null}xu(t){return wd(this.persistence,new Td,t.initialUser,this.serializer)}Mu(t){return new Ea(wi.Ai,this.serializer)}Fu(t){return new Dd}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}$r.provider={build:()=>new $r};class Ay extends $r{constructor(t){super(),this.cacheSizeBytes=t}Ou(t,e){L(this.persistence.referenceDelegate instanceof ti,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new gd(n,t.asyncQueue,e)}Mu(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new Ea((n=>ti.Ai(n,e)),this.serializer)}}class Gd extends $r{constructor(t,e,n){super(),this.Bu=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.Bu.initialize(this,t),await La(this.Bu.syncEngine),await $n(this.Bu.remoteStore),await this.persistence.Gi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}xu(t){return wd(this.persistence,new Td,t.initialUser,this.serializer)}Ou(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new gd(n,t.asyncQueue,e)}Nu(t,e){const n=new Cg(e,this.persistence);return new Vg(t.asyncQueue,n)}Mu(t){const e=Ed(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new Ta(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,xd(),Os(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Fu(t){return new Dd}}class by extends Gd{constructor(t,e){super(t,e,!1),this.Bu=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.Bu.syncEngine;this.sharedClientState instanceof fo&&(this.sharedClientState.syncEngine={So:Iy.bind(null,e),bo:wy.bind(null,e),Do:vy.bind(null,e),ls:Ty.bind(null,e),wo:yy.bind(null,e)},await this.sharedClientState.start()),await this.persistence.Gi((async n=>{await Ey(this.Bu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())}))}Fu(t){const e=xd();if(!fo.v(e))throw new N(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Ed(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new fo(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class Kr{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>dl(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=gy.bind(null,this.syncEngine),await Ko(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Z_})()}createDatastore(t){const e=vi(t.databaseInfo.databaseId),n=k_(t.databaseInfo);return B_(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return(function(n,s,i,a,u){return new j_(n,s,i,a,u)})(this.localStore,this.datastore,t.asyncQueue,(e=>dl(this.syncEngine,e,0)),(function(){return ol.v()?new ol:new C_})())}createSyncEngine(t,e){return(function(s,i,a,u,l,d,m){const g=new iy(s,i,a,u,l,d);return m&&(g.wu=!0),g})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const i=F(s);V(Yt,"RemoteStore shutting down."),i.Va.add(5),await ts(i),i.ma.shutdown(),i.fa.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}Kr.provider={build:()=>new Kr};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Lu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Lu(this.observer.error,t):ct("Uncaught Error in snapshot listener:",t.toString()))}ku(){this.muted=!0}Lu(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be="FirestoreClient";class Ry{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this._databaseInfo=s,this.user=wt.UNAUTHENTICATED,this.clientId=Jo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async a=>{V(be,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(V(be,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Va(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function go(r,t){r.asyncQueue.verifyOperationInProgress(),V(be,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await vd(t.localStore,s),n=s)})),t.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=t}async function ml(r,t){r.asyncQueue.verifyOperationInProgress();const e=await Sy(r);V(be,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener((n=>ul(t.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>ul(t.remoteStore,s))),r._onlineComponents=t}async function Sy(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){V(be,"Using user provided OfflineComponentProvider");try{await go(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Tn("Error using user provided cache. Falling back to memory cache: "+e),await go(r,new $r)}}else V(be,"Using default OfflineComponentProvider"),await go(r,new Ay(void 0));return r._offlineComponents}async function Qd(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(V(be,"Using user provided OnlineComponentProvider"),await ml(r,r._uninitializedComponentsProvider._online)):(V(be,"Using default OnlineComponentProvider"),await ml(r,new Kr))),r._onlineComponents}function Py(r){return Qd(r).then((t=>t.syncEngine))}async function ii(r){const t=await Qd(r),e=t.eventManager;return e.onListen=oy.bind(null,t.syncEngine),e.onUnlisten=uy.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=ay.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=cy.bind(null,t.syncEngine),e}function Vy(r,t,e,n){const s=new Ba(n),i=new Na(t,s,e);return r.asyncQueue.enqueueAndForget((async()=>Ca(await ii(r),i))),()=>{s.ku(),r.asyncQueue.enqueueAndForget((async()=>Da(await ii(r),i)))}}function Cy(r,t,e={}){const n=new Wt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,l,d){const m=new Ba({next:E=>{m.ku(),a.enqueueAndForget((()=>Da(i,g)));const S=E.docs.has(u);!S&&E.fromCache?d.reject(new N(P.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&E.fromCache&&l&&l.source==="server"?d.reject(new N(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(E)},error:E=>d.reject(E)}),g=new Na(Jr(u.path),m,{includeMetadataChanges:!0,$a:!0});return Ca(i,g)})(await ii(r),r.asyncQueue,t,e,n))),n.promise}function Dy(r,t,e={}){const n=new Wt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,l,d){const m=new Ba({next:E=>{m.ku(),a.enqueueAndForget((()=>Da(i,g))),E.fromCache&&l.source==="server"?d.reject(new N(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(E)},error:E=>d.reject(E)}),g=new Na(u,m,{includeMetadataChanges:!0,$a:!0});return Ca(i,g)})(await ii(r),r.asyncQueue,t,e,n))),n.promise}function xy(r,t){const e=new Wt;return r.asyncQueue.enqueueAndForget((async()=>ly(await Py(r),t,e))),e.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny="ComponentProvider",gl=new Map;function ky(r,t,e,n,s){return new sp(r,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Hd(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oy="firestore.googleapis.com",pl=!0;class _l{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Oy,this.ssl=pl}else this.host=t.host,this.ssl=t.ssl??pl;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=ld;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<md)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Rg("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Hd(t.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Ua{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new _l({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new _l(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new _g;switch(n.type){case"firstParty":return new Eg(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const n=gl.get(e);n&&(V(Ny,"Removing Datastore"),gl.delete(e),n.terminate())})(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new es(this.firestore,t,this._query)}}class lt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Te(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new lt(this.firestore,t,this._key)}toJSON(){return{type:lt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(Qr(e,lt._jsonSchema))return new lt(t,n||null,new k(X.fromString(e.referencePath)))}}lt._jsonSchemaVersion="firestore/documentReference/1.0",lt._jsonSchema={type:ft("string",lt._jsonSchemaVersion),referencePath:ft("string")};class Te extends es{constructor(t,e,n){super(t,e,Jr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new lt(this.firestore,null,new k(t))}withConverter(t){return new Te(this.firestore,t,this._path)}}function hI(r,t,...e){if(r=jt(r),Hl("collection","path",t),r instanceof Ua){const n=X.fromString(t,...e);return ac(n),new Te(r,null,n)}{if(!(r instanceof lt||r instanceof Te))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(t,...e));return ac(n),new Te(r.firestore,null,n)}}function dI(r,t,...e){if(r=jt(r),arguments.length===1&&(t=Jo.newId()),Hl("doc","path",t),r instanceof Ua){const n=X.fromString(t,...e);return oc(n),new lt(r,null,new k(n))}{if(!(r instanceof lt||r instanceof Te))throw new N(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(t,...e));return oc(n),new lt(r.firestore,r instanceof Te?r.converter:null,new k(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl="AsyncQueue";class Il{constructor(t=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new Nd(this,"async_queue_retry"),this.cc=()=>{const n=Os();n&&V(yl,"Visibility state changed to "+n.visibilityState),this.F_.y_()},this.lc=t;const e=Os();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.hc(),this.Pc(t)}enterRestrictedMode(t){if(!this.rc){this.rc=!0,this.ac=t||!1;const e=Os();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.cc)}}enqueue(t){if(this.hc(),this.rc)return new Promise((()=>{}));const e=new Wt;return this.Pc((()=>this.rc&&this.ac?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.nc.push(t),this.Tc())))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(t){if(!Se(t))throw t;V(yl,"Operation failed with retryable error: "+t)}this.nc.length>0&&this.F_.g_((()=>this.Tc()))}}Pc(t){const e=this.lc.then((()=>(this._c=!0,t().catch((n=>{throw this.oc=n,this._c=!1,ct("INTERNAL UNHANDLED ERROR: ",El(n)),n})).then((n=>(this._c=!1,n))))));return this.lc=e,e}enqueueAfterDelay(t,e,n){this.hc(),this.uc.indexOf(t)>-1&&(e=0);const s=Pa.createAndSchedule(this,t,e,n,(i=>this.Ic(i)));return this.sc.push(s),s}hc(){this.oc&&M(47125,{Ec:El(this.oc)})}verifyOperationInProgress(){}async Rc(){let t;do t=this.lc,await t;while(t!==this.lc)}Ac(t){for(const e of this.sc)if(e.timerId===t)return!0;return!1}Vc(t){return this.Rc().then((()=>{this.sc.sort(((e,n)=>e.targetTimeMs-n.targetTimeMs));for(const e of this.sc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Rc()}))}dc(t){this.uc.push(t)}Ic(t){const e=this.sc.indexOf(t);this.sc.splice(e,1)}}function El(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}class re extends Ua{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new Il,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Il(t),this._firestoreClient=void 0,await t}}}function fI(r,t,e){e||(e=$s);const n=Zm(r,"firestore");if(n.isInitialized(e)){const s=n.getImmediate({identifier:e}),i=n.getOptions(e);if(Fs(i,t))return s;throw new N(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(t.cacheSizeBytes!==void 0&&t.localCache!==void 0)throw new N(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(t.cacheSizeBytes!==void 0&&t.cacheSizeBytes!==-1&&t.cacheSizeBytes<md)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&kl(t.host)&&nm(t.host),n.initialize({options:t,instanceIdentifier:e})}function ns(r){if(r._terminated)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||My(r),r._firestoreClient}function My(r){var n,s,i,a;const t=r._freezeSettings(),e=ky(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,t);r._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(r._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),r._firestoreClient=new Ry(r._authCredentials,r._appCheckCredentials,r._queue,e,r._componentsProvider&&(function(l){const d=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(d),_online:d}})(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Lt(ht.fromBase64String(t))}catch(e){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Lt(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Lt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Qr(t,Lt._jsonSchema))return Lt.fromBase64String(t.bytes)}}Lt._jsonSchemaVersion="firestore/bytes/1.0",Lt._jsonSchema={type:ft("string",Lt._jsonSchemaVersion),bytes:ft("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ot(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return U(this._lat,t._lat)||U(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Jt._jsonSchemaVersion}}static fromJSON(t){if(Qr(t,Jt._jsonSchema))return new Jt(t.latitude,t.longitude)}}Jt._jsonSchemaVersion="firestore/geoPoint/1.0",Jt._jsonSchema={type:ft("string",Jt._jsonSchemaVersion),latitude:ft("number"),longitude:ft("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:Ut._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Qr(t,Ut._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new Ut(t.vectorValues);throw new N(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ut._jsonSchemaVersion="firestore/vectorValue/1.0",Ut._jsonSchema={type:ft("string",Ut._jsonSchemaVersion),vectorValues:ft("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fy=/^__.*__$/;class Ly{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new ie(t,this.data,this.fieldMask,e,this.fieldTransforms):new qn(t,this.data,e,this.fieldTransforms)}}class Wd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ie(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Jd(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:r})}}class qa{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.mc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new qa({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),n=this.i({path:e,arrayElement:!1});return n.yc(t),n}wc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),n=this.i({path:e,arrayElement:!1});return n.mc(),n}Sc(t){return this.i({path:void 0,arrayElement:!0})}bc(t){return oi(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}mc(){if(this.path)for(let t=0;t<this.path.length;t++)this.yc(this.path.get(t))}yc(t){if(t.length===0)throw this.bc("Document fields must not be empty");if(Jd(this.dataSource)&&Fy.test(t))throw this.bc('Document fields cannot begin and end with "__"')}}class By{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||vi(t)}V(t,e,n,s=!1){return new qa({dataSource:t,methodName:e,targetDoc:n,path:ot.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function za(r){const t=r._freezeSettings(),e=vi(r._databaseId);return new By(r._databaseId,!!t.ignoreUndefinedProperties,e)}function Xd(r,t,e,n,s,i={}){const a=r.V(i.merge||i.mergeFields?2:0,t,e,s);$a("Data must be an object, but it was:",a,n);const u=tf(n,a);let l,d;if(i.merge)l=new Dt(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const m=[];for(const g of i.mergeFields){const E=Gr(t,g,e);if(!a.contains(E))throw new N(P.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);rf(m,E)||m.push(E)}l=new Dt(m),d=a.fieldTransforms.filter((g=>l.covers(g.field)))}else l=null,d=a.fieldTransforms;return new Ly(new At(u),l,d)}class Pi extends ja{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.bc(`${this._methodName}() can only appear at the top level of your update data`):t.bc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Pi}}function Yd(r,t,e,n){const s=r.V(1,t,e);$a("Data must be an object, but it was:",s,n);const i=[],a=At.empty();Pe(n,((l,d)=>{const m=nf(t,l,e);d=jt(d);const g=s.wc(m);if(d instanceof Pi)i.push(m);else{const E=Vi(d,g);E!=null&&(i.push(m),a.set(m,E))}}));const u=new Dt(i);return new Wd(a,u,s.fieldTransforms)}function Zd(r,t,e,n,s,i){const a=r.V(1,t,e),u=[Gr(t,n,e)],l=[s];if(i.length%2!=0)throw new N(P.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let E=0;E<i.length;E+=2)u.push(Gr(t,i[E])),l.push(i[E+1]);const d=[],m=At.empty();for(let E=u.length-1;E>=0;--E)if(!rf(d,u[E])){const S=u[E];let C=l[E];C=jt(C);const O=a.wc(S);if(C instanceof Pi)d.push(S);else{const x=Vi(C,O);x!=null&&(d.push(S),m.set(S,x))}}const g=new Dt(d);return new Wd(m,g,a.fieldTransforms)}function Vi(r,t){if(ef(r=jt(r)))return $a("Unsupported field value:",t,r),tf(r,t);if(r instanceof ja)return(function(n,s){if(!Jd(s.dataSource))throw s.bc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.bc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.bc("Nested arrays are not supported");return(function(n,s){const i=[];let a=0;for(const u of n){let l=Vi(u,s.Sc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}})(r,t)}return(function(n,s){if((n=jt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Ap(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Y.fromDate(n);return{timestampValue:On(s.serializer,i)}}if(n instanceof Y){const i=new Y(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:On(s.serializer,i)}}if(n instanceof Jt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Lt)return{bytesValue:Qh(s.serializer,n._byteString)};if(n instanceof lt){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.bc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:pa(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof Ut)return(function(a,u){const l=a instanceof Ut?a.toArray():a;return{mapValue:{fields:{[ia]:{stringValue:oa},[Pn]:{arrayValue:{values:l.map((m=>{if(typeof m!="number")throw u.bc("VectorValues must only contain numeric values.");return _i(u.serializer,m)}))}}}}}})(n,s);if(sd(n))return n._toProto(s.serializer);throw s.bc(`Unsupported field value: ${Xo(n)}`)})(r,t)}function tf(r,t){const e={};return dh(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Pe(r,((n,s)=>{const i=Vi(s,t.gc(n));i!=null&&(e[n]=i)})),{mapValue:{fields:e}}}function ef(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Y||r instanceof Jt||r instanceof Lt||r instanceof lt||r instanceof ja||r instanceof Ut||sd(r))}function $a(r,t,e){if(!ef(e)||!Wl(e)){const n=Xo(e);throw n==="an object"?t.bc(r+" a custom object"):t.bc(r+" "+n)}}function Gr(r,t,e){if((t=jt(t))instanceof Si)return t._internalPath;if(typeof t=="string")return nf(r,t);throw oi("Field path arguments must be of type string or ",r,!1,void 0,e)}const Uy=new RegExp("[~\\*/\\[\\]]");function nf(r,t,e){if(t.search(Uy)>=0)throw oi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new Si(...t.split("."))._internalPath}catch{throw oi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function oi(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${n}`),a&&(l+=` in document ${s}`),l+=")"),new N(P.INVALID_ARGUMENT,u+r+l)}function rf(r,t){return r.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{convertValue(t,e="none"){switch(we(t)){case 0:return null;case 1:return t.booleanValue;case 2:return it(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ee(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Pe(t,((s,i)=>{n[s]=this.convertValue(i,e)})),n}convertVectorValue(t){var n,s,i;const e=(i=(s=(n=t.fields)==null?void 0:n[Pn].arrayValue)==null?void 0:s.values)==null?void 0:i.map((a=>it(a.doubleValue)));return new Ut(e)}convertGeoPoint(t){return new Jt(it(t.latitude),it(t.longitude))}convertArray(t,e){return(t.values||[]).map((n=>this.convertValue(n,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=fi(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Fr(t));default:return null}}convertTimestamp(t){const e=te(t);return new Y(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=X.fromString(t);L(rd(n),9688,{name:t});const s=new Xe(n.get(1),n.get(3)),i=new k(n.popFirst(5));return s.isEqual(e)||ct(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka extends jy{constructor(t){super(),this.firestore=t}convertBytes(t){return new Lt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new lt(this.firestore,null,e)}}const Tl="@firebase/firestore",wl="4.15.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vl(r){return(function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new lt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new qy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Gr("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class qy extends sf{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function of(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new N(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}function af(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}class zy{constructor(t){let e;this.kind="persistent",t!=null&&t.tabManager?(t.tabManager._initialize(t),e=t.tabManager):(e=Gy(void 0),e._initialize(t)),this._onlineComponentProvider=e._onlineComponentProvider,this._offlineComponentProvider=e._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function mI(r){return new zy(r)}class $y{constructor(t){this.forceOwnership=t,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=Kr.provider,this._offlineComponentProvider={build:e=>new Gd(e,t==null?void 0:t.cacheSizeBytes,this.forceOwnership)}}}class Ky{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=Kr.provider,this._offlineComponentProvider={build:e=>new by(e,t==null?void 0:t.cacheSizeBytes)}}}function Gy(r){return new $y(r==null?void 0:r.forceOwnership)}function gI(){return new Ky}class Er{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class He extends sf{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Ms(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Gr("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=He._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}He._jsonSchemaVersion="firestore/documentSnapshot/1.0",He._jsonSchema={type:ft("string",He._jsonSchemaVersion),bundleSource:ft("string","DocumentSnapshot"),bundleName:ft("string"),bundle:ft("string")};class Ms extends He{data(t={}){return super.data(t)}}class We{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Er(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new Ms(this._firestore,this._userDataWriter,n.key,n,new Er(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new N(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((u=>{const l=new Ms(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Er(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{const l=new Ms(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Er(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),m=a.indexOf(u.doc.key)),{type:Qy(u.type),doc:l,oldIndex:d,newIndex:m}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=We._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Jo.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function Qy(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */We._jsonSchemaVersion="firestore/querySnapshot/1.0",We._jsonSchema={type:ft("string",We._jsonSchemaVersion),bundleSource:ft("string","QuerySnapshot"),bundleName:ft("string"),bundle:ft("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hy{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=za(t)}set(t,e,n){this._verifyNotCommitted();const s=po(t,this._firestore),i=af(s.converter,e,n),a=Xd(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(a.toMutation(s._key,yt.none())),this}update(t,e,n,...s){this._verifyNotCommitted();const i=po(t,this._firestore);let a;return a=typeof(e=jt(e))=="string"||e instanceof Si?Zd(this._dataReader,"WriteBatch.update",i._key,e,n,s):Yd(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(a.toMutation(i._key,yt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=po(t,this._firestore);return this._mutations=this._mutations.concat(new Yr(e._key,yt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function po(r,t){if((r=jt(r)).firestore!==t)throw new N(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pI(r){r=Ot(r,lt);const t=Ot(r.firestore,re),e=ns(t);return Cy(e,r._key).then((n=>uf(t,r,n)))}function _I(r){r=Ot(r,es);const t=Ot(r.firestore,re),e=ns(t),n=new Ka(t);return of(r._query),Dy(e,r._query).then((s=>new We(t,n,r,s)))}function yI(r,t,e){r=Ot(r,lt);const n=Ot(r.firestore,re),s=af(r.converter,t,e),i=za(n);return Ci(n,[Xd(i,"setDoc",r._key,s,r.converter!==null,e).toMutation(r._key,yt.none())])}function II(r,t,e,...n){r=Ot(r,lt);const s=Ot(r.firestore,re),i=za(s);let a;return a=typeof(t=jt(t))=="string"||t instanceof Si?Zd(i,"updateDoc",r._key,t,e,n):Yd(i,"updateDoc",r._key,t),Ci(s,[a.toMutation(r._key,yt.exists(!0))])}function EI(r){return Ci(Ot(r.firestore,re),[new Yr(r._key,yt.none())])}function TI(r,...t){var d,m,g;r=jt(r);let e={includeMetadataChanges:!1,source:"default"},n=0;typeof t[n]!="object"||vl(t[n])||(e=t[n++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(vl(t[n])){const E=t[n];t[n]=(d=E.next)==null?void 0:d.bind(E),t[n+1]=(m=E.error)==null?void 0:m.bind(E),t[n+2]=(g=E.complete)==null?void 0:g.bind(E)}let i,a,u;if(r instanceof lt)a=Ot(r.firestore,re),u=Jr(r._key.path),i={next:E=>{t[n]&&t[n](uf(a,r,E))},error:t[n+1],complete:t[n+2]};else{const E=Ot(r,es);a=Ot(E.firestore,re),u=E._query;const S=new Ka(a);i={next:C=>{t[n]&&t[n](new We(a,S,E,C))},error:t[n+1],complete:t[n+2]},of(r._query)}const l=ns(a);return Vy(l,u,s,i)}function Ci(r,t){const e=ns(r);return xy(e,t)}function uf(r,t,e){const n=e.docs.get(t._key),s=new Ka(r);return new He(r,s,t._key,n,new Er(e.hasPendingWrites,e.fromCache),t.converter)}function wI(r){return r=Ot(r,re),ns(r),new Hy(r,(t=>Ci(r,t)))}(function(t,e=!0){gg(rg),Bs(new Cr("firestore",((n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),u=new re(new yg(n.getProvider("auth-internal")),new Tg(a,n.getProvider("app-check-internal")),ip(a,s),a);return i={useFetchStreams:e,...i},u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),_n(Tl,wl,t),_n(Tl,wl,"esm2020")})();var Wy="firebase",Jy="12.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */_n(Wy,Jy,"app");export{TI as A,mI as B,Cr as C,gI as D,Nl as E,Un as F,nm as G,iI as H,oI as I,_n as J,yI as K,H as L,II as M,wI as N,rg as S,Zm as _,Ol as a,tg as b,Bs as c,Kf as d,hI as e,uI as f,Fs as g,EI as h,dI as i,aI as j,cI as k,Xy as l,pI as m,_I as n,Yy as o,jt as p,En as q,sg as r,fI as s,eI as t,kl as u,tI as v,sI as w,rI as x,Zy as y,nI as z};
