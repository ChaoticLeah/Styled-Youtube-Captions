function y(){}const lt=t=>t;function ut(t,e){for(const n in e)t[n]=e[n];return t}function K(t){return t()}function I(){return Object.create(null)}function x(t){t.forEach(K)}function P(t){return typeof t=="function"}function Lt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let S;function zt(t,e){return S||(S=document.createElement("a")),S.href=e,t===S.href}function at(t){return Object.keys(t).length===0}function ft(t,...e){if(t==null)return y;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Bt(t,e,n){t.$$.on_destroy.push(ft(e,n))}function Ht(t,e,n,i){if(t){const s=Q(t,e,n,i);return t[0](s)}}function Q(t,e,n,i){return t[1]&&i?ut(n.ctx.slice(),t[1](i(e))):n.ctx}function Ft(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)c[l]=e.dirty[l]|s[l];return c}return e.dirty|s}return e.dirty}function It(t,e,n,i,s,c){if(s){const r=Q(e,n,i,c);t.p(r,s)}}function Wt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Gt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Jt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Kt(t){const e={};for(const n in t)e[n]=!0;return e}function Qt(t,e,n){return t.set(n),e}function Ut(t){return t&&P(t.destroy)?t.destroy:y}const U=typeof window<"u";let _t=U?()=>window.performance.now():()=>Date.now(),H=U?t=>requestAnimationFrame(t):y;const b=new Set;function V(t){b.forEach(e=>{e.c(t)||(b.delete(e),e.f())}),b.size!==0&&H(V)}function dt(t){let e;return b.size===0&&H(V),{promise:new Promise(n=>{b.add(e={c:t,f:n})}),abort(){b.delete(e)}}}let q=!1;function ht(){q=!0}function mt(){q=!1}function pt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function yt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&o.push(_)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,_=(s>0&&e[n[s]].claim_order<=u?s+1:pt(1,s,a=>e[n[a]].claim_order,u))-1;i[o]=n[_]+1;const f=_+1;n[f]=o,s=Math.max(f,s)}const c=[],r=[];let l=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);l>=o;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);c.reverse(),r.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<r.length;o++){for(;u<c.length&&r[o].claim_order>=c[u].claim_order;)u++;const _=u<c.length?c[u]:null;t.insertBefore(r[o],_)}}function gt(t,e){t.appendChild(e)}function X(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function $t(t){const e=Z("style");return bt(X(t),e),e.sheet}function bt(t,e){return gt(t.head||t,e),e.sheet}function xt(t,e){if(q){for(yt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Vt(t,e,n){q&&!n?xt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function Y(t){t.parentNode&&t.parentNode.removeChild(t)}function Xt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Z(t){return document.createElement(t)}function wt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function F(t){return document.createTextNode(t)}function Yt(){return F(" ")}function Zt(){return F("")}function te(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function tt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ee(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:tt(t,i,e[i])}function ne(t,e){Object.keys(e).forEach(n=>{vt(t,n,e[n])})}function vt(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:tt(t,e,n)}function Et(t){return Array.from(t.childNodes)}function kt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function et(t,e,n,i,s=!1){kt(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function nt(t,e,n,i){return et(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||c.push(l.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function ie(t,e,n){return nt(t,e,n,Z)}function re(t,e,n){return nt(t,e,n,wt)}function Nt(t,e){return et(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>F(e),!0)}function se(t){return Nt(t," ")}function oe(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function ce(t,e){t.value=e==null?"":e}function le(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function ue(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}function ae(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];i.selected=~e.indexOf(i.__value)}}function fe(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function _e(t,e,n){t.classList[n?"add":"remove"](e)}function it(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function de(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const c=s.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(s)):c===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}function he(t,e){return new t(e)}const T=new Map;let O=0;function At(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function St(t,e){const n={stylesheet:$t(e),rules:{}};return T.set(t,n),n}function W(t,e,n,i,s,c,r,l=0){const o=16.666/i;let u=`{
`;for(let p=0;p<=1;p+=o){const $=e+(n-e)*c(p);u+=p*100+`%{${r($,1-$)}}
`}const _=u+`100% {${r(n,1-n)}}
}`,f=`__svelte_${At(_)}_${l}`,a=X(t),{stylesheet:d,rules:h}=T.get(a)||St(a,t);h[f]||(h[f]=!0,d.insertRule(`@keyframes ${f} ${_}`,d.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${f} ${i}ms linear ${s}ms 1 both`,O+=1,f}function jt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),O-=s,O||Ct())}function Ct(){H(()=>{O||(T.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&Y(e)}),T.clear())})}let N;function k(t){N=t}function w(){if(!N)throw new Error("Function called outside component initialization");return N}function me(t){w().$$.on_mount.push(t)}function pe(t){w().$$.after_update.push(t)}function ye(t){w().$$.on_destroy.push(t)}function ge(){const t=w();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const c=it(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,c)}),!c.defaultPrevented}return!0}}function $e(t,e){return w().$$.context.set(t,e),e}function be(t){return w().$$.context.get(t)}function xe(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const E=[],G=[],C=[],J=[],rt=Promise.resolve();let B=!1;function st(){B||(B=!0,rt.then(ot))}function we(){return st(),rt}function M(t){C.push(t)}const L=new Set;let j=0;function ot(){const t=N;do{for(;j<E.length;){const e=E[j];j++,k(e),Dt(e.$$)}for(k(null),E.length=0,j=0;G.length;)G.pop()();for(let e=0;e<C.length;e+=1){const n=C[e];L.has(n)||(L.add(n),n())}C.length=0}while(E.length);for(;J.length;)J.pop()();B=!1,L.clear(),k(t)}function Dt(t){if(t.fragment!==null){t.update(),x(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}let v;function Tt(){return v||(v=Promise.resolve(),v.then(()=>{v=null})),v}function z(t,e,n){t.dispatchEvent(it(`${e?"intro":"outro"}${n}`))}const D=new Set;let m;function ve(){m={r:0,c:[],p:m}}function Ee(){m.r||x(m.c),m=m.p}function Ot(t,e){t&&t.i&&(D.delete(t),t.i(e))}function ke(t,e,n,i){if(t&&t.o){if(D.has(t))return;D.add(t),m.c.push(()=>{D.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Mt={duration:0};function Ne(t,e,n,i){let s=e(t,n),c=i?0:1,r=null,l=null,o=null;function u(){o&&jt(t,o)}function _(a,d){const h=a.b-c;return d*=Math.abs(h),{a:c,b:a.b,d:h,duration:d,start:a.start,end:a.start+d,group:a.group}}function f(a){const{delay:d=0,duration:h=300,easing:g=lt,tick:p=y,css:$}=s||Mt,R={start:_t()+d,b:a};a||(R.group=m,m.r+=1),r||l?l=R:($&&(u(),o=W(t,c,a,h,d,g,$)),a&&p(0,1),r=_(R,h),M(()=>z(t,a,"start")),dt(A=>{if(l&&A>l.start&&(r=_(l,h),l=null,z(t,r.b,"start"),$&&(u(),o=W(t,c,r.b,r.duration,0,g,s.css))),r){if(A>=r.end)p(c=r.b,1-c),z(t,r.b,"end"),l||(r.b?u():--r.group.r||x(r.group.c)),r=null;else if(A>=r.start){const ct=A-r.start;c=r.a+r.d*g(ct/r.duration),p(c,1-c)}}return!!(r||l)}))}return{run(a){P(s)?Tt().then(()=>{s=s(),f(a)}):f(a)},end(){u(),r=l=null}}}const Ae=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Se(t,e){const n={},i={},s={$$scope:1};let c=t.length;for(;c--;){const r=t[c],l=e[c];if(l){for(const o in r)o in l||(i[o]=1);for(const o in l)s[o]||(n[o]=l[o],s[o]=1);t[c]=l}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function je(t){return typeof t=="object"&&t!==null?t:{}}function Ce(t){t&&t.c()}function De(t,e){t&&t.l(e)}function Pt(t,e,n,i){const{fragment:s,after_update:c}=t.$$;s&&s.m(e,n),i||M(()=>{const r=t.$$.on_mount.map(K).filter(P);t.$$.on_destroy?t.$$.on_destroy.push(...r):x(r),t.$$.on_mount=[]}),c.forEach(M)}function qt(t,e){const n=t.$$;n.fragment!==null&&(x(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Rt(t,e){t.$$.dirty[0]===-1&&(E.push(t),st(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Te(t,e,n,i,s,c,r,l=[-1]){const o=N;k(t);const u=t.$$={fragment:null,ctx:[],props:c,update:y,not_equal:s,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:I(),dirty:l,skip_bound:!1,root:e.target||o.$$.root};r&&r(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(f,a,...d)=>{const h=d.length?d[0]:a;return u.ctx&&s(u.ctx[f],u.ctx[f]=h)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](h),_&&Rt(t,f)),a}):[],u.update(),_=!0,x(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){ht();const f=Et(e.target);u.fragment&&u.fragment.l(f),f.forEach(Y)}else u.fragment&&u.fragment.c();e.intro&&Ot(t.$$.fragment),Pt(t,e.target,e.anchor,e.customElement),mt(),ot()}k(o)}class Oe{$destroy(){qt(this,1),this.$destroy=y}$on(e,n){if(!P(n))return y;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!at(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{re as $,we as A,y as B,Ht as C,It as D,Wt as E,Ft as F,xt as G,Bt as H,Jt as I,$e as J,ut as K,Gt as L,xe as M,G as N,ne as O,ee as P,Ut as Q,te as R,Oe as S,Se as T,P as U,x as V,M as W,Ne as X,lt as Y,be as Z,wt as _,Yt as a,Kt as a0,ce as a1,ae as a2,ue as a3,Xt as a4,fe as a5,je as a6,Qt as a7,de as a8,Ae as a9,zt as aa,ge as ab,_e as ac,ye as ad,Vt as b,se as c,Ee as d,Zt as e,Ot as f,ve as g,Y as h,Te as i,pe as j,Z as k,ie as l,Et as m,tt as n,me as o,le as p,F as q,Nt as r,Lt as s,ke as t,oe as u,he as v,Ce as w,De as x,Pt as y,qt as z};