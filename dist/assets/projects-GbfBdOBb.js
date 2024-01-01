import{j as e,r as t,g as U,A as te,B as ae,C as ce,D as re,k as ne,h as oe,q as le,E as ie,F as de,G as Ae,H as he,c as me,R as ue}from"./auth-OIc4apUQ.js";import{T as je,C as H}from"./close-KeMSzLwU.js";import{P as ge}from"./plus-Ip2amvQB.js";import{S as p}from"./search_bar-DzdhLxBV.js";import{B as Ce}from"./back_arrow-IdcwQJqZ.js";import{E as we}from"./square_pencil-nCEf_pik.js";import{E as xe}from"./error_dialog-qsErQp_K.js";function Se({name:l,id:j,classId:g,isTeahcer:C,deleteProject:d}){return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"ProjectTile",onClick:()=>{const c=new URL(window.location.origin);c.searchParams.set("classId",g),c.searchParams.set("projectId",j),window.location.href=c.origin+"/Project/"+c.search},children:[e.jsx("h2",{className:"ProjectName",children:l}),C&&e.jsx("img",{className:"ProjectTrashIcon",src:je,alt:"Trash Icon",onClick:c=>{c.stopPropagation(),d()}})]})})}const pe="data:image/png;base64,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";function Ee(){const[l,j]=t.useState([]),[g,C]=t.useState(""),[d,c]=t.useState(!1),[o,y]=t.useState(""),[b,v]=t.useState([]),[K,M]=t.useState([]),[Q,F]=t.useState([]);t.useState([]);const[E,N]=t.useState([]),A=t.useRef(null),h=t.useRef(null),[I,P]=t.useState(""),[w,Y]=t.useState(""),[x,J]=t.useState(""),[f,L]=t.useState([]),[Z,G]=t.useState([]),S=t.useRef(null),[X,T]=t.useState(""),[D,R]=t.useState("");t.useEffect(()=>{m(),console.log(l)},[]);async function m(){const s=await U();Y(s);const r=window.location.search,n=new URLSearchParams(r);if(!n.has("classId"))throw Error("missing class id!");const a=n.get("classId");y(a);const i=await te(a);C(i.name),P(i.name);const k=await ae(i.teachers),V=k.filter(se=>se.id!=s);v(V),console.log(k);const W=localStorage.getItem("userType");let B=!1;W=="Teacher"&&(c(!0),B=!0);let u=null;B?u=await re(a):u=await ce(s,a),console.log(u),j(u);const _=await ne();L(_);const $=await oe();M($);const ee=await le(a);N(ee)}const O=async()=>{var n,a;if(await ie(o,x)){T("This project name is already taken!"),R("Project Name Taken"),(n=S.current)==null||n.showModal();return}const r=Z.map(i=>i.id);await de(x,r,o),(a=A.current)==null||a.close(),m()},q=async()=>{var n;const s=Q.map(a=>a.id),r=E.map(a=>a.id);await Ae(o,I,r,s),(n=h.current)==null||n.close(),m()},z=s=>async()=>{await he(o,s),m()};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"Center",children:[e.jsx("h2",{className:"Title",children:g}),e.jsx("h3",{children:"Projects:"}),d?e.jsxs("div",{className:"TeacherIcons",children:[e.jsx("img",{src:pe,alt:"create join link",className:"LinkIcon",onClick:async()=>{var r;const s=window.location.origin+"/JoinClass/?classId="+o;await navigator.clipboard.writeText(s),T("Copied join link to clipboard!"),R("Copied!"),(r=S.current)==null||r.showModal()}}),e.jsx("img",{src:we,alt:"edit class",className:"EditIcon",onClick:()=>{var s;(s=h.current)==null||s.showModal()}}),e.jsx("img",{src:ge,alt:"add project",className:"PlusIcon",onClick:()=>{var s;(s=A.current)==null||s.showModal()}})]}):null,e.jsx("img",{src:Ce,alt:"back",className:"BackArrow",onClick:()=>{window.location.href="/Dashboard/"}}),e.jsx("div",{className:"Projects",children:l.map(s=>e.jsx(Se,{name:s.name,id:s.id,classId:o,isTeahcer:d,deleteProject:z(s.id)},s.id))}),e.jsx("br",{})]}),e.jsxs("dialog",{ref:A,children:[e.jsx("h2",{children:"Create Project"}),e.jsx("img",{src:H,alt:"close",className:"CloseIcon",onClick:()=>{var s;(s=A.current)==null||s.close()}}),e.jsxs("form",{children:[e.jsx("label",{htmlFor:"projectName",children:"Project Name:"}),e.jsx("span",{children:" "}),e.jsx("input",{type:"text",name:"projectName",id:"projectName",value:x,onChange:s=>{J(s.target.value)}}),e.jsx("br",{}),e.jsx("label",{htmlFor:"",children:"Students: "}),e.jsx(p,{name:"Student",currentUserId:w,content:f,updateContent:s=>{G(s)}}),e.jsx("br",{}),e.jsx("button",{type:"button",onClick:O,children:"Create Project"})]})]}),e.jsxs("dialog",{ref:h,className:"EditClassDialog",children:[e.jsx("h2",{children:"Edit Class"}),e.jsx("img",{src:H,alt:"close",className:"CloseIcon",onClick:()=>{var s;(s=h.current)==null||s.close()}}),e.jsxs("form",{children:[e.jsx("label",{htmlFor:"className",children:"Class Name:"}),e.jsx("span",{children:" "}),e.jsx("input",{type:"text",name:"className",id:"className",value:I,onChange:s=>{P(s.target.value)}}),e.jsx("br",{}),e.jsxs("div",{className:"Invitees",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"",className:"InviteTitle",children:"Other Teachers: "}),e.jsx(p,{name:"Teacher",content:K,currentUserId:w,defaultAddedContent:b,updateContent:s=>{F(s)}})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"",className:"InviteTitle",children:"Students: "}),e.jsx(p,{name:"Student",content:f,currentUserId:w,defaultAddedContent:E,updateContent:s=>{N(s)}})]})]}),e.jsx("br",{}),e.jsx("button",{type:"button",onClick:q,children:"Edit Class"})]})]}),e.jsx(xe,{error:X,errorTitle:D,errorModalRef:S})]})}async function Ne(){await U()||(window.location.href=window.location.origin+"/Login/")}(async()=>await Ne())();me.createRoot(document.getElementById("root")).render(e.jsx(ue.StrictMode,{children:e.jsx(Ee,{})}));
