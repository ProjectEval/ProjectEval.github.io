import{r as e,g as I,o as x,a as g,j as s,T as C,c as R,R as E}from"./auth-GtzMzfUn.js";import{I as S}from"./info_dialog-AMQudrJn.js";function T(){const r=e.useRef(null),[c,p]=e.useState(""),[i,J]=e.useState(""),[l,d]=e.useState(""),[w,h]=e.useState(""),[f,u]=e.useState("");e.useEffect(()=>{(async()=>{const a=await I();if(a==!1){window.location.href="/Login/"+window.location.search;return}u(a);const j=window.location.search,o=new URLSearchParams(j);if(!o.has("classId"))throw Error("missing classId");const t=o.get("classId");console.log(t),d(t);const n=await x(t);h(n.name),await g(a)&&(window.location.href="/Projects/"+window.location.search),n.students.includes(a)&&(window.location.href="/Projects/"+window.location.search)})()},[]);const m=async()=>{await C(l,f),window.location.href="/Projects/"+window.location.search};return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"Center",children:[s.jsxs("h2",{className:"Title",children:["Join Class - ",w]}),s.jsx("button",{onClick:m,children:"Join Class"}),s.jsx("br",{})]}),s.jsx(S,{info:c,Title:i,infoModalRef:r})]})}R.createRoot(document.getElementById("root")).render(s.jsx(E.StrictMode,{children:s.jsx(T,{})}));