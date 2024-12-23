"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[0],{17906:function(e,t,r){r.d(t,{Z:function(){return x}});var s=r(38875);let i=s.createContext(null);function o(){return s.useContext(i)}var n="function"==typeof Symbol&&Symbol.for?Symbol.for("mui.nested"):"__THEME_NESTED__",a=r(48499),l=function(e){let{children:t,theme:r}=e,l=o(),u=s.useMemo(()=>{let e=null===l?{...r}:"function"==typeof r?r(l):{...l,...r};return null!=e&&(e[n]=null!==l),e},[r,l]);return(0,a.jsx)(i.Provider,{value:u,children:t})},u=r(40388),c=r(33270),h=r(8742),d=r(95574);let m={};function f(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return s.useMemo(()=>{let s=e&&t[e]||t;if("function"==typeof r){let o=r(s),n=e?{...t,[e]:o}:o;return i?()=>n:n}return e?{...t,[e]:r}:{...t,...r}},[e,t,r,i])}var y=function(e){let{children:t,theme:r,themeId:s}=e,i=(0,c.Z)(m),n=o()||m,y=f(s,i,r),g=f(s,n,r,!0),p="rtl"===(s?y[s]:y).direction;return(0,a.jsx)(l,{theme:g,children:(0,a.jsx)(u.T.Provider,{value:y,children:(0,a.jsx)(h.Z,{value:p,children:(0,a.jsx)(d.Z,{value:s?y[s].components:y.components,children:t})})})})},g=r(80468);function p(e){let{theme:t,...r}=e,s=g.Z in t?t[g.Z]:void 0;return(0,a.jsx)(y,{...r,themeId:s?g.Z:void 0,theme:s||t})}var v=r(89899),S=r(82069);let b="mode",C="color-scheme";function k(e){if("undefined"!=typeof window&&"function"==typeof window.matchMedia&&"system"===e)return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function w(e,t){return"light"===e.mode||"system"===e.mode&&"light"===e.systemMode?t("light"):"dark"===e.mode||"system"===e.mode&&"dark"===e.systemMode?t("dark"):void 0}function q(e,t){let r;if("undefined"!=typeof window){try{(r=localStorage.getItem(e)||void 0)||localStorage.setItem(e,t)}catch(e){}return r||t}}var M=r(54971),O=r(59783);let{CssVarsProvider:P,useColorScheme:Q,getInitColorSchemeScript:E}=function(e){let{themeId:t,theme:r={},modeStorageKey:i=b,colorSchemeStorageKey:n=C,disableTransitionOnChange:l=!1,defaultColorScheme:u,resolveTheme:c}=e,h={allColorSchemes:[],colorScheme:void 0,darkColorScheme:void 0,lightColorScheme:void 0,mode:void 0,setColorScheme:()=>{},setMode:()=>{},systemMode:void 0},d=s.createContext(void 0),m={},f={},g="string"==typeof u?u:u.light,p="string"==typeof u?u:u.dark;return{CssVarsProvider:function(e){let{children:h,theme:g,modeStorageKey:p=i,colorSchemeStorageKey:v=n,disableTransitionOnChange:M=l,storageWindow:O="undefined"==typeof window?void 0:window,documentNode:P="undefined"==typeof document?void 0:document,colorSchemeNode:Q="undefined"==typeof document?void 0:document.documentElement,disableNestedContext:E=!1,disableStyleSheetGeneration:x=!1,defaultMode:A="system",noSsr:D}=e,I=s.useRef(!1),T=o(),j=s.useContext(d),Z=!!j&&!E,$=s.useMemo(()=>g||("function"==typeof r?r():r),[g]),V=$[t],K=V||$,{colorSchemes:_=m,components:H=f,cssVarPrefix:F}=K,L=Object.keys(_).filter(e=>!!_[e]).join(","),N=s.useMemo(()=>L.split(","),[L]),R="string"==typeof u?u:u.light,W="string"==typeof u?u:u.dark,X=_[R]&&_[W]?A:_[K.defaultColorScheme]?.palette?.mode||K.palette?.mode,{mode:B,setMode:Y,systemMode:z,lightColorScheme:G,darkColorScheme:J,colorScheme:U,setColorScheme:ee}=function(e){let{defaultMode:t="light",defaultLightColorScheme:r,defaultDarkColorScheme:i,supportedColorSchemes:o=[],modeStorageKey:n=b,colorSchemeStorageKey:a=C,storageWindow:l="undefined"==typeof window?void 0:window,noSsr:u=!1}=e,c=o.join(","),h=o.length>1,[d,m]=s.useState(()=>{let e=q(n,t),s=q("".concat(a,"-light"),r),o=q("".concat(a,"-dark"),i);return{mode:e,systemMode:k(e),lightColorScheme:s,darkColorScheme:o}}),[f,y]=s.useState(u||!h);s.useEffect(()=>{y(!0)},[]);let g=w(d,e=>"light"===e?d.lightColorScheme:"dark"===e?d.darkColorScheme:void 0),p=s.useCallback(e=>{m(r=>{if(e===r.mode)return r;let s=null!=e?e:t;try{localStorage.setItem(n,s)}catch(e){}return{...r,mode:s,systemMode:k(s)}})},[n,t]),v=s.useCallback(e=>{e?"string"==typeof e?e&&!c.includes(e)?console.error("`".concat(e,"` does not exist in `theme.colorSchemes`.")):m(t=>{let r={...t};return w(t,t=>{try{localStorage.setItem("".concat(a,"-").concat(t),e)}catch(e){}"light"===t&&(r.lightColorScheme=e),"dark"===t&&(r.darkColorScheme=e)}),r}):m(t=>{let s={...t},o=null===e.light?r:e.light,n=null===e.dark?i:e.dark;if(o){if(c.includes(o)){s.lightColorScheme=o;try{localStorage.setItem("".concat(a,"-light"),o)}catch(e){}}else console.error("`".concat(o,"` does not exist in `theme.colorSchemes`."))}if(n){if(c.includes(n)){s.darkColorScheme=n;try{localStorage.setItem("".concat(a,"-dark"),n)}catch(e){}}else console.error("`".concat(n,"` does not exist in `theme.colorSchemes`."))}return s}):m(e=>{try{localStorage.setItem("".concat(a,"-light"),r),localStorage.setItem("".concat(a,"-dark"),i)}catch(e){}return{...e,lightColorScheme:r,darkColorScheme:i}})},[c,a,r,i]),S=s.useCallback(e=>{"system"===d.mode&&m(t=>{let r=(null==e?void 0:e.matches)?"dark":"light";return t.systemMode===r?t:{...t,systemMode:r}})},[d.mode]),M=s.useRef(S);return M.current=S,s.useEffect(()=>{if("function"!=typeof window.matchMedia||!h)return;let e=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return M.current(...t)},t=window.matchMedia("(prefers-color-scheme: dark)");return t.addListener(e),e(t),()=>{t.removeListener(e)}},[h]),s.useEffect(()=>{if(l&&h){let e=e=>{let r=e.newValue;"string"==typeof e.key&&e.key.startsWith(a)&&(!r||c.match(r))&&(e.key.endsWith("light")&&v({light:r}),e.key.endsWith("dark")&&v({dark:r})),e.key===n&&(!r||["light","dark","system"].includes(r))&&p(r||t)};return l.addEventListener("storage",e),()=>{l.removeEventListener("storage",e)}}},[v,p,n,a,c,t,l,h]),{...d,mode:f?d.mode:void 0,systemMode:f?d.systemMode:void 0,colorScheme:f?g:void 0,setMode:p,setColorScheme:v}}({supportedColorSchemes:N,defaultLightColorScheme:R,defaultDarkColorScheme:W,modeStorageKey:p,colorSchemeStorageKey:v,defaultMode:X,storageWindow:O,noSsr:D}),et=B,er=U;Z&&(et=j.mode,er=j.colorScheme);let es=s.useMemo(()=>{let e=er||K.defaultColorScheme,t=K.generateThemeVars?.()||K.vars,r={...K,components:H,colorSchemes:_,cssVarPrefix:F,vars:t};if("function"==typeof r.generateSpacing&&(r.spacing=r.generateSpacing()),e){let t=_[e];t&&"object"==typeof t&&Object.keys(t).forEach(e=>{t[e]&&"object"==typeof t[e]?r[e]={...r[e],...t[e]}:r[e]=t[e]})}return c?c(r):r},[K,er,H,_,F]),ei=K.colorSchemeSelector;s.useEffect(()=>{if(er&&Q&&ei&&"media"!==ei){let e=ei;if("class"===ei&&(e=".%s"),"data"===ei&&(e="[data-%s]"),ei?.startsWith("data-")&&!ei.includes("%s")&&(e=`[${ei}="%s"]`),e.startsWith("."))Q.classList.remove(...N.map(t=>e.substring(1).replace("%s",t))),Q.classList.add(e.substring(1).replace("%s",er));else{let t=e.replace("%s",er).match(/\[([^\]]+)\]/);if(t){let[e,r]=t[1].split("=");r||N.forEach(t=>{Q.removeAttribute(e.replace(er,t))}),Q.setAttribute(e,r?r.replace(/"|'/g,""):"")}else Q.setAttribute(e,er)}}},[er,ei,Q,N]),s.useEffect(()=>{let e;if(M&&I.current&&P){let t=P.createElement("style");t.appendChild(P.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),P.head.appendChild(t),window.getComputedStyle(P.body),e=setTimeout(()=>{P.head.removeChild(t)},1)}return()=>{clearTimeout(e)}},[er,M,P]),s.useEffect(()=>(I.current=!0,()=>{I.current=!1}),[]);let eo=s.useMemo(()=>({allColorSchemes:N,colorScheme:er,darkColorScheme:J,lightColorScheme:G,mode:et,setColorScheme:ee,setMode:Y,systemMode:z}),[N,er,J,G,et,ee,Y,z,es.colorSchemeSelector]),en=!0;(x||!1===K.cssVariables||Z&&T?.cssVarPrefix===F)&&(en=!1);let ea=(0,a.jsxs)(s.Fragment,{children:[(0,a.jsx)(y,{themeId:V?t:void 0,theme:es,children:h}),en&&(0,a.jsx)(S.Z,{styles:es.generateStyleSheets?.()||[]})]});return Z?ea:(0,a.jsx)(d.Provider,{value:eo,children:ea})},useColorScheme:()=>s.useContext(d)||h,getInitColorSchemeScript:e=>(function(e){let{defaultMode:t="system",defaultLightColorScheme:r="light",defaultDarkColorScheme:s="dark",modeStorageKey:i=b,colorSchemeStorageKey:o=C,attribute:n="data-color-scheme",colorSchemeNode:l="document.documentElement",nonce:u}=e||{},c="",h=n;if("class"===n&&(h=".%s"),"data"===n&&(h="[data-%s]"),h.startsWith(".")){let e=h.substring(1);c+=`${l}.classList.remove('${e}'.replace('%s', light), '${e}'.replace('%s', dark));
      ${l}.classList.add('${e}'.replace('%s', colorScheme));`}let d=h.match(/\[([^\]]+)\]/);if(d){let[e,t]=d[1].split("=");t||(c+=`${l}.removeAttribute('${e}'.replace('%s', light));
      ${l}.removeAttribute('${e}'.replace('%s', dark));`),c+=`
      ${l}.setAttribute('${e}'.replace('%s', colorScheme), ${t?`${t}.replace('%s', colorScheme)`:'""'});`}else c+=`${l}.setAttribute('${h}', colorScheme);`;return(0,a.jsx)("script",{suppressHydrationWarning:!0,nonce:"undefined"==typeof window?u:"",dangerouslySetInnerHTML:{__html:`(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${i}') || '${t}';
  const dark = localStorage.getItem('${o}-dark') || '${s}';
  const light = localStorage.getItem('${o}-light') || '${r}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${c}
  }
} catch(e){}})();`}},"mui-color-scheme-init")})({colorSchemeStorageKey:n,defaultLightColorScheme:g,defaultDarkColorScheme:p,modeStorageKey:i,...e})}}({themeId:g.Z,theme:()=>(0,M.Z)({cssVariables:!0}),colorSchemeStorageKey:"mui-color-scheme",modeStorageKey:"mui-mode",defaultColorScheme:{light:"light",dark:"dark"},resolveTheme:e=>{let t={...e,typography:(0,O.Z)(e.palette,e.typography)};return t.unstable_sx=function(e){return(0,v.Z)({sx:e,theme:this})},t}});function x(e){let{theme:t,...r}=e;return"function"!=typeof t&&"colorSchemes"in(g.Z in t?t[g.Z]:t)?(0,a.jsx)(P,{theme:t,...r}):(0,a.jsx)(p,{theme:t,...r})}},36112:function(e,t,r){r.d(t,{S:function(){return y}});var s=r(56740),i=r(18090),o=r(97638),n=r(87933),a=class extends n.l{constructor(e={}){super(),this.config=e,this.#e=new Map}#e;build(e,t,r){let o=t.queryKey,n=t.queryHash??(0,s.Rm)(o,t),a=this.get(n);return a||(a=new i.A({cache:this,queryKey:o,queryHash:n,options:e.defaultQueryOptions(t),state:r,defaultOptions:e.getQueryDefaults(o)}),this.add(a)),a}add(e){this.#e.has(e.queryHash)||(this.#e.set(e.queryHash,e),this.notify({type:"added",query:e}))}remove(e){let t=this.#e.get(e.queryHash);t&&(e.destroy(),t===e&&this.#e.delete(e.queryHash),this.notify({type:"removed",query:e}))}clear(){o.V.batch(()=>{this.getAll().forEach(e=>{this.remove(e)})})}get(e){return this.#e.get(e)}getAll(){return[...this.#e.values()]}find(e){let t={exact:!0,...e};return this.getAll().find(e=>(0,s._x)(t,e))}findAll(e={}){let t=this.getAll();return Object.keys(e).length>0?t.filter(t=>(0,s._x)(e,t)):t}notify(e){o.V.batch(()=>{this.listeners.forEach(t=>{t(e)})})}onFocus(){o.V.batch(()=>{this.getAll().forEach(e=>{e.onFocus()})})}onOnline(){o.V.batch(()=>{this.getAll().forEach(e=>{e.onOnline()})})}},l=r(46932),u=class extends n.l{constructor(e={}){super(),this.config=e,this.#t=new Map,this.#r=Date.now()}#t;#r;build(e,t,r){let s=new l.m({mutationCache:this,mutationId:++this.#r,options:e.defaultMutationOptions(t),state:r});return this.add(s),s}add(e){let t=c(e),r=this.#t.get(t)??[];r.push(e),this.#t.set(t,r),this.notify({type:"added",mutation:e})}remove(e){let t=c(e);if(this.#t.has(t)){let r=this.#t.get(t)?.filter(t=>t!==e);r&&(0===r.length?this.#t.delete(t):this.#t.set(t,r))}this.notify({type:"removed",mutation:e})}canRun(e){let t=this.#t.get(c(e))?.find(e=>"pending"===e.state.status);return!t||t===e}runNext(e){let t=this.#t.get(c(e))?.find(t=>t!==e&&t.state.isPaused);return t?.continue()??Promise.resolve()}clear(){o.V.batch(()=>{this.getAll().forEach(e=>{this.remove(e)})})}getAll(){return[...this.#t.values()].flat()}find(e){let t={exact:!0,...e};return this.getAll().find(e=>(0,s.X7)(t,e))}findAll(e={}){return this.getAll().filter(t=>(0,s.X7)(e,t))}notify(e){o.V.batch(()=>{this.listeners.forEach(t=>{t(e)})})}resumePausedMutations(){let e=this.getAll().filter(e=>e.state.isPaused);return o.V.batch(()=>Promise.all(e.map(e=>e.continue().catch(s.ZT))))}};function c(e){return e.options.scope?.id??String(e.mutationId)}var h=r(64737),d=r(68700);function m(e){return{onFetch:(t,r)=>{let i=t.options,o=t.fetchOptions?.meta?.fetchMore?.direction,n=t.state.data?.pages||[],a=t.state.data?.pageParams||[],l={pages:[],pageParams:[]},u=0,c=async()=>{let r=!1,c=e=>{Object.defineProperty(e,"signal",{enumerable:!0,get:()=>(t.signal.aborted?r=!0:t.signal.addEventListener("abort",()=>{r=!0}),t.signal)})},h=(0,s.cG)(t.options,t.fetchOptions),d=async(e,i,o)=>{if(r)return Promise.reject();if(null==i&&e.pages.length)return Promise.resolve(e);let n={queryKey:t.queryKey,pageParam:i,direction:o?"backward":"forward",meta:t.options.meta};c(n);let a=await h(n),{maxPages:l}=t.options,u=o?s.Ht:s.VX;return{pages:u(e.pages,a,l),pageParams:u(e.pageParams,i,l)}};if(o&&n.length){let e="backward"===o,t={pages:n,pageParams:a},r=(e?function(e,{pages:t,pageParams:r}){return t.length>0?e.getPreviousPageParam?.(t[0],t,r[0],r):void 0}:f)(i,t);l=await d(t,r,e)}else{let t=e??n.length;do{let e=0===u?a[0]??i.initialPageParam:f(i,l);if(u>0&&null==e)break;l=await d(l,e),u++}while(u<t)}return l};t.options.persister?t.fetchFn=()=>t.options.persister?.(c,{queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},r):t.fetchFn=c}}}function f(e,{pages:t,pageParams:r}){let s=t.length-1;return t.length>0?e.getNextPageParam(t[s],t,r[s],r):void 0}var y=class{#s;#i;#o;#n;#a;#l;#u;#c;constructor(e={}){this.#s=e.queryCache||new a,this.#i=e.mutationCache||new u,this.#o=e.defaultOptions||{},this.#n=new Map,this.#a=new Map,this.#l=0}mount(){this.#l++,1===this.#l&&(this.#u=h.j.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#s.onFocus())}),this.#c=d.N.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#s.onOnline())}))}unmount(){this.#l--,0===this.#l&&(this.#u?.(),this.#u=void 0,this.#c?.(),this.#c=void 0)}isFetching(e){return this.#s.findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return this.#i.findAll({...e,status:"pending"}).length}getQueryData(e){let t=this.defaultQueryOptions({queryKey:e});return this.#s.get(t.queryHash)?.state.data}ensureQueryData(e){let t=this.defaultQueryOptions(e),r=this.#s.build(this,t),i=r.state.data;return void 0===i?this.fetchQuery(e):(e.revalidateIfStale&&r.isStaleByTime((0,s.KC)(t.staleTime,r))&&this.prefetchQuery(t),Promise.resolve(i))}getQueriesData(e){return this.#s.findAll(e).map(({queryKey:e,state:t})=>[e,t.data])}setQueryData(e,t,r){let i=this.defaultQueryOptions({queryKey:e}),o=this.#s.get(i.queryHash),n=o?.state.data,a=(0,s.SE)(t,n);if(void 0!==a)return this.#s.build(this,i).setData(a,{...r,manual:!0})}setQueriesData(e,t,r){return o.V.batch(()=>this.#s.findAll(e).map(({queryKey:e})=>[e,this.setQueryData(e,t,r)]))}getQueryState(e){let t=this.defaultQueryOptions({queryKey:e});return this.#s.get(t.queryHash)?.state}removeQueries(e){let t=this.#s;o.V.batch(()=>{t.findAll(e).forEach(e=>{t.remove(e)})})}resetQueries(e,t){let r=this.#s,s={type:"active",...e};return o.V.batch(()=>(r.findAll(e).forEach(e=>{e.reset()}),this.refetchQueries(s,t)))}cancelQueries(e,t={}){let r={revert:!0,...t};return Promise.all(o.V.batch(()=>this.#s.findAll(e).map(e=>e.cancel(r)))).then(s.ZT).catch(s.ZT)}invalidateQueries(e,t={}){return o.V.batch(()=>{if(this.#s.findAll(e).forEach(e=>{e.invalidate()}),e?.refetchType==="none")return Promise.resolve();let r={...e,type:e?.refetchType??e?.type??"active"};return this.refetchQueries(r,t)})}refetchQueries(e,t={}){let r={...t,cancelRefetch:t.cancelRefetch??!0};return Promise.all(o.V.batch(()=>this.#s.findAll(e).filter(e=>!e.isDisabled()).map(e=>{let t=e.fetch(void 0,r);return r.throwOnError||(t=t.catch(s.ZT)),"paused"===e.state.fetchStatus?Promise.resolve():t}))).then(s.ZT)}fetchQuery(e){let t=this.defaultQueryOptions(e);void 0===t.retry&&(t.retry=!1);let r=this.#s.build(this,t);return r.isStaleByTime((0,s.KC)(t.staleTime,r))?r.fetch(t):Promise.resolve(r.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(s.ZT).catch(s.ZT)}fetchInfiniteQuery(e){return e.behavior=m(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(s.ZT).catch(s.ZT)}ensureInfiniteQueryData(e){return e.behavior=m(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return d.N.isOnline()?this.#i.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#s}getMutationCache(){return this.#i}getDefaultOptions(){return this.#o}setDefaultOptions(e){this.#o=e}setQueryDefaults(e,t){this.#n.set((0,s.Ym)(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){let t=[...this.#n.values()],r={};return t.forEach(t=>{(0,s.to)(e,t.queryKey)&&Object.assign(r,t.defaultOptions)}),r}setMutationDefaults(e,t){this.#a.set((0,s.Ym)(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){let t=[...this.#a.values()],r={};return t.forEach(t=>{(0,s.to)(e,t.mutationKey)&&(r={...r,...t.defaultOptions})}),r}defaultQueryOptions(e){if(e._defaulted)return e;let t={...this.#o.queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=(0,s.Rm)(t.queryKey,t)),void 0===t.refetchOnReconnect&&(t.refetchOnReconnect="always"!==t.networkMode),void 0===t.throwOnError&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===s.CN&&(t.enabled=!1),t}defaultMutationOptions(e){return e?._defaulted?e:{...this.#o.mutations,...e?.mutationKey&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){this.#s.clear(),this.#i.clear()}}}}]);