import{r as e,g as x,A as I,i as g,j as s,L as C,c as E,R}from"./auth-OIc4apUQ.js";import{E as S}from"./error_dialog-qsErQp_K.js";function p(){const n=e.useRef(null),[c,J]=e.useState(""),[i,N]=e.useState(""),[l,d]=e.useState(""),[w,h]=e.useState(""),[u,f]=e.useState("");e.useEffect(()=>{(async()=>{const a=await x();if(a==!1){window.location.href="/Login/"+window.location.search;return}f(a);const j=window.location.search,o=new URLSearchParams(j);if(!o.has("classId"))throw Error("missing classId");const t=o.get("classId");console.log(t),d(t);const r=await I(t);h(r.name),await g(a)&&(window.location.href="/Projects/"+window.location.search),r.students.includes(a)&&(window.location.href="/Projects/"+window.location.search)})()},[]);const m=async()=>{await C(l,u),window.location.href="/Projects/"+window.location.search};return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"Center",children:[s.jsxs("h2",{className:"Title",children:["Join Class - ",w]}),s.jsx("button",{onClick:m,children:"Join Class"}),s.jsx("br",{})]}),s.jsx(S,{error:c,errorTitle:i,errorModalRef:n})]})}E.createRoot(document.getElementById("root")).render(s.jsx(R.StrictMode,{children:s.jsx(p,{})}));
