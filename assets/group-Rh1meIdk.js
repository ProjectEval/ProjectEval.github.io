import{r as s,g as E,o as O,p as R,q as Q,X as V,j as t,A as Z,Y as _,c as tt,R as et}from"./auth-l123uYc1.js";import{S as st}from"./student_tile-ZKY392sM.js";import{E as ot,C as at}from"./close_warning_dialog-BpEjKHTw.js";import{S as nt}from"./search_bar-7c5lsXz1.js";import{B as rt}from"./back_arrow-IdcwQJqZ.js";import{C as ct}from"./close-CDqjbHS0.js";import{I as it}from"./info_dialog-gg6UHO-1.js";import"./trash-arEgRoH7.js";function dt(){const[h,k]=s.useState([]),[b,y]=s.useState(""),[i,D]=s.useState(""),[d,P]=s.useState(""),[T,B]=s.useState(""),j=s.useRef(null),[v,U]=s.useState(""),[A,F]=s.useState(""),[L,M]=s.useState(""),[W,q]=s.useState(""),X=s.useRef(null),[Y,lt]=s.useState(),[$,z]=s.useState(""),[f,H]=s.useState([]),[u,J]=s.useState(""),[S,I]=s.useState(""),[l,x]=s.useState([]),n=s.useRef(null);s.useEffect(()=>{w(),console.log("Fetched Students")},[]);async function w(){const e=await E();B(e);const r=window.location.search,a=new URLSearchParams(r);if(!a.has("classId"))throw Error("missing class id!");if(!a.has("projectId"))throw Error("missing project id!");if(!a.has("groupId"))throw Error("missing group id");const o=a.get("classId");P(o);const c=await O(o),C=await R(c.students);k(C);const p=a.get("projectId"),m=await Q(o,p);M(m.background),y(m.name),q(m.backgroundColor),D(p);const G=a.get("groupId");J(G);const g=await V(o,p,G);z(g.name),I(g.name);const N=await R(g.students);H(N),x(N)}const K=async()=>{var r,a;const e=l.map(o=>o.id);for(let o=0;o<l.length;o++){const c=l[o];if(await Z(d,i,c.id,u)){U(`${c.name} is already in another group`),F("Unable to edit group"),(r=j.current)==null||r.showModal();return}}await _(d,i,u,S,e),await w(),(a=n.current)==null||a.close()};return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"Center "+L,style:{backgroundColor:W},children:[t.jsx("h2",{className:"Title",children:$}),t.jsx("div",{className:"TeacherIcons",children:t.jsx("img",{src:ot,alt:"edit group",className:"EditIcon",onClick:()=>{var e;(e=n.current)==null||e.showModal()}})}),t.jsx("img",{src:rt,alt:"back",className:"BackArrow",onClick:()=>{const e=new URL(window.location.href);e.searchParams.delete("groupId"),window.location.href=e.origin+"/Project/"+e.search}}),t.jsx("h3",{children:"Students:"}),t.jsx("div",{className:"Students",children:f.map(e=>t.jsx(st,{name:e.name,id:e.id,projectId:i,classId:d,groupId:u,projectName:b},e.id))}),t.jsx("br",{})]}),t.jsxs("dialog",{ref:n,children:[t.jsx("h2",{children:"Edit Group"}),t.jsx("img",{src:ct,alt:"close",className:"CloseIcon",onClick:()=>{var e;(e=n.current)==null||e.close()}}),t.jsxs("form",{children:[t.jsx("label",{htmlFor:"groupName",children:"Group Name:"}),t.jsx("span",{children:" "}),t.jsx("input",{type:"text",name:"groupName",id:"groupName",value:S,onChange:e=>{I(e.target.value)}}),t.jsx("br",{}),t.jsx("label",{htmlFor:"",className:"InviteTitle",children:"Students: "}),t.jsx(nt,{name:"Student",content:h,currentUserId:T,defaultAddedContent:f,updateContent:e=>{x(e)}}),t.jsx("br",{}),t.jsx("button",{type:"button",onClick:K,children:"Edit Group"})]})]}),t.jsx(it,{info:v,Title:A,infoModalRef:j}),t.jsx(at,{closeWarningRef:X,connectedRef:Y})]})}async function ut(){await E()||(window.location.href=window.location.origin+"/Login/")}(async()=>await ut())();tt.createRoot(document.getElementById("root")).render(t.jsx(et.StrictMode,{children:t.jsx(dt,{})}));