if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const t=e=>n(e,c),o={module:{uri:c},exports:r,require:t};s[c]=Promise.all(a.map((e=>o[e]||t(e)))).then((e=>(i(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/2560x1440-min.png",revision:"d69030ad1737138c2c81f766cf7a54a1"},{url:"/Mbackground-min.png",revision:"df9119122bb7827d098a04b2668ecb96"},{url:"/_next/static/_e7Zinj2PR6WaX3UXWR9u/_buildManifest.js",revision:"83a01d37b296d22cd170633405cc6179"},{url:"/_next/static/_e7Zinj2PR6WaX3UXWR9u/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/214-9c36172b8f8bc4c6.js",revision:"9c36172b8f8bc4c6"},{url:"/_next/static/chunks/553.92ce81ac0ae1e9aa.js",revision:"92ce81ac0ae1e9aa"},{url:"/_next/static/chunks/701.d6c1dabee9a2885d.js",revision:"d6c1dabee9a2885d"},{url:"/_next/static/chunks/752.c25113d47d9b0825.js",revision:"c25113d47d9b0825"},{url:"/_next/static/chunks/framework-114634acb84f8baa.js",revision:"114634acb84f8baa"},{url:"/_next/static/chunks/main-ac533633f8b32a28.js",revision:"ac533633f8b32a28"},{url:"/_next/static/chunks/pages/_app-111760663e7522fe.js",revision:"111760663e7522fe"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/index-689c94418ee76fee.js",revision:"689c94418ee76fee"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-2fb0c78d22fcef37.js",revision:"2fb0c78d22fcef37"},{url:"/_next/static/css/24d958c5b911e01b.css",revision:"24d958c5b911e01b"},{url:"/_next/static/css/5003f9377be29575.css",revision:"5003f9377be29575"},{url:"/_next/static/css/decd1617886cea91.css",revision:"decd1617886cea91"},{url:"/_next/static/css/e9931aa218d84398.css",revision:"e9931aa218d84398"},{url:"/arrow_drop_down.svg",revision:"176c74519b645c314bc9750679e1af5f"},{url:"/background_orange-min.png",revision:"7118818561258e37167106232304eea3"},{url:"/camera.svg",revision:"2340852d4716dbfea765cb63419098d0"},{url:"/carrot-min.png",revision:"c1f0679bef70a3c2c6fde190eacf5590"},{url:"/cartoon.ttf",revision:"0277f5e007e808c01564561b77e03963"},{url:"/close.svg",revision:"23666e4f704baa77b48f27a5b5e44174"},{url:"/gr_thumbnail.png",revision:"2ddc09148d374d5924fc34815a0b6ac9"},{url:"/history.svg",revision:"454f3751040d09aa0c8127c05aaa4ada"},{url:"/icon-192x192.png",revision:"7fa7ad31b600c92cf2e43be048ed005b"},{url:"/icon-256x256.png",revision:"0167cf800908389601ec745934109f45"},{url:"/icon-384x384.png",revision:"ad1aeed8e98bed7978da9e6dbe1942d6"},{url:"/icon-512x512.png",revision:"870e9026190a6bf754d72a06ea7b1b33"},{url:"/icon.png",revision:"78bdb751c1a42ea545737c3c3f846418"},{url:"/idle.gif",revision:"2871b8c52d427ab64716d9a0a7152278"},{url:"/manifest.json",revision:"c41dae43405f32763e43518bea924e64"},{url:"/mic_off.svg",revision:"8283a051bceeef22d9849e0ff2525a0f"},{url:"/play_sound.svg",revision:"a425c17abff000e1127bd4fdefbde692"},{url:"/question.gif",revision:"885281fa9b119643be108c3a7ee08889"},{url:"/s_ar.png",revision:"3f6515b2e5bdfef8569e4d27325354bc"},{url:"/s_ch.png",revision:"54ef83e2e88e56572cb5fa9cd45898e7"},{url:"/s_da.png",revision:"5b29c68b89d9d78169e35d83d5ea158e"},{url:"/s_en.png",revision:"218f936fc192343d0485baaa35fe5e18"},{url:"/s_fr.png",revision:"7213a16165e9ba30d33be8c953faae28"},{url:"/s_jp.png",revision:"183f76e8fe090672afb6154905c297e5"},{url:"/s_kr.png",revision:"99de9fc80bd576c39b796cd5ca73a911"},{url:"/search.svg",revision:"e171e03754c4c71bb54fadb3077ff607"},{url:"/searching.gif",revision:"c31f8ea2b653b99c161545a21925d47c"},{url:"/smart.jpg",revision:"429a34c2e1e99011cdf72b54b9b61ecd"},{url:"/speaking.gif",revision:"48360a6402773c5ec502cea7938274f2"},{url:"/speaking1.gif",revision:"c482bb60fdc7eba02298914a58387c94"},{url:"/speaking2.gif",revision:"4974832764466bdc8907caeb0f733584"},{url:"/stop_circle.svg",revision:"639f2d631564862143628833a92ba6ec"},{url:"/stop_sound.svg",revision:"750627eed93d306c28a186665d714087"},{url:"/thick.ttf",revision:"58cc117001de0d11fef59a00943ddd81"},{url:"/volume_off.svg",revision:"f77ca40197910886b1d692c852730664"},{url:"/volume_on.svg",revision:"b19234da42fad0f596dda52fde0bbcf2"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
