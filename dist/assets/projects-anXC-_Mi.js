import{j as e,r as t,g as Z,o as ie,I as de,a as Ae,J as ue,K as he,h as ge,f as je,L as me,M as Ce,N as xe,O as fe,P as we,c as Se,R as ke}from"./auth-7a6rBG4F.js";import{T as pe}from"./trash-arEgRoH7.js";import{P as Ee}from"./plus-Ip2amvQB.js";import{S as J}from"./search_bar-L5nwHk8M.js";import{B as Re}from"./back_arrow-IdcwQJqZ.js";import{E as Ie,C as Pe}from"./close_warning_dialog-UxHtJz5W.js";import{C as L}from"./close-CDqjbHS0.js";import{I as Ne}from"./info_dialog-q-ePwUyF.js";import{C as Te,a as Be}from"./choose_colors_dialog-pD3VPFlA.js";function be({name:i,id:m,classId:d,isTeahcer:C,deleteProject:A}){return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"ProjectTile",onClick:()=>{const c=new URL(window.location.origin);c.searchParams.set("classId",d),c.searchParams.set("projectId",m),window.location.href=c.origin+"/Project/"+c.search},children:[e.jsx("h2",{className:"ProjectName",children:i}),C&&e.jsx("img",{className:"ProjectTrashIcon",src:pe,alt:"Trash Icon",onClick:c=>{c.stopPropagation(),A()}})]})})}const He="data:image/png;base64,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";function ye(){const[i,m]=t.useState([]),[d,C]=t.useState(""),[A,c]=t.useState(!1),[n,D]=t.useState(""),[X,G]=t.useState([]),[O,W]=t.useState([]);t.useState([]);const[z,V]=t.useState([]),u=t.useRef(null),h=t.useRef(null),[I,x]=t.useState(""),[f,q]=t.useState(""),[Ue,_]=t.useState(""),[w,P]=t.useState(""),N=t.useRef(null),T=t.useRef(null),[S,B]=t.useState(""),[$,ee]=t.useState([]),k=t.useRef(null),[se,b]=t.useState(""),[te,H]=t.useState(""),[y,p]=t.useState([]),[M,E]=t.useState([]),[R,U]=t.useState(""),v=t.useRef(null);t.useEffect(()=>{g(),console.log("Fetched Projects")},[]);async function g(){const s=await Z();q(s);const a=window.location.search,r=new URLSearchParams(a);if(!r.has("classId"))throw Error("missing class id!");const o=r.get("classId");D(o);const l=await ie(o);C(l.name),x(l.name),U(l.background),_(l.background),P(l.backgroundColor);const K=await de(l.teachers),Q=K.filter(le=>le.id!=s);G(Q),E(Q),console.log(K);const Y=await Ae(s);c(Y);let j=null;Y?(console.log("IS a teacher"),j=await he(o)):j=await ue(s,o),console.log(j),m(j);const re=await ge();ee(re);const ne=await je();W(ne);const F=await me(o);V(F),p(F)}const ae=async()=>{var a,r;if(await Ce(n,S)){b("This project name is already taken!"),H("Project Name Taken"),(a=k.current)==null||a.showModal();return}await xe(S,n),(r=u.current)==null||r.close(),g()},oe=async()=>{var r;const s=M.map(o=>o.id);s.push(f);const a=y.map(o=>o.id);await fe(n,I,a,s,R,w),(r=h.current)==null||r.close(),g()},ce=s=>async()=>{await we(n,s),g()};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"Center "+R,style:{backgroundColor:w},children:[e.jsx("h2",{className:"Title",children:d}),e.jsx("h3",{children:"Projects:"}),A?e.jsxs("div",{className:"TeacherIcons",children:[e.jsx("img",{src:He,alt:"create join link",className:"LinkIcon",onClick:async()=>{var a;const s=window.location.origin+"/JoinClass/?classId="+n;await navigator.clipboard.writeText(s),b("Copied join link to clipboard!"),H("Copied!"),(a=k.current)==null||a.showModal()}}),e.jsx("img",{src:Ie,alt:"edit class",className:"EditIcon",onClick:()=>{var s;(s=h.current)==null||s.showModal()}}),e.jsx("img",{src:Ee,alt:"add project",className:"PlusIcon",onClick:()=>{var s;(s=u.current)==null||s.showModal()}})]}):null,e.jsx("img",{src:Re,alt:"back",className:"BackArrow",onClick:()=>{window.location.href="/Dashboard/"}}),e.jsx("div",{className:"Projects",children:i.map(s=>e.jsx(be,{name:s.name,id:s.id,classId:n,isTeahcer:A,deleteProject:ce(s.id)},s.id))}),e.jsx("br",{})]}),e.jsxs("dialog",{ref:u,children:[e.jsx("h2",{children:"Create Project"}),e.jsx("img",{src:L,alt:"close",className:"CloseIcon",onClick:()=>{var s;B(""),(s=u.current)==null||s.close()}}),e.jsxs("form",{children:[e.jsx("label",{htmlFor:"projectName",children:"Project Name:"}),e.jsx("span",{children:" "}),e.jsx("input",{type:"text",name:"projectName",id:"projectName",value:S,onChange:s=>{B(s.target.value)}}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("button",{type:"button",onClick:ae,children:"Create Project"})]})]}),e.jsxs("dialog",{ref:h,className:"EditClassDialog",children:[e.jsx("h2",{children:"Edit Class"}),e.jsx("img",{src:L,alt:"close",className:"CloseIcon",onClick:()=>{var s;(s=v.current)==null||s.showModal()}}),e.jsxs("form",{children:[e.jsx("label",{htmlFor:"className",children:"Class Name:"}),e.jsx("span",{children:" "}),e.jsx("input",{type:"text",name:"className",id:"className",value:I,onChange:s=>{x(s.target.value)}}),e.jsx("br",{}),e.jsxs("div",{className:"Invitees",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"",className:"InviteTitle",children:"Other Teachers: "}),e.jsx(J,{name:"Teacher",content:O,currentUserId:f,defaultAddedContent:M,updateContent:s=>{E(s)}})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"",className:"InviteTitle",children:"Students: "}),e.jsx(J,{name:"Student",content:$,currentUserId:f,defaultAddedContent:y,updateContent:s=>{p(s)}})]})]}),e.jsx("br",{}),e.jsx("button",{type:"button",onClick:()=>{var s;(s=N.current)==null||s.showModal()},children:"Edit Background"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("button",{type:"button",onClick:()=>{var s;(s=T.current)==null||s.showModal()},children:"Edit Color"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("button",{type:"button",onClick:oe,children:"Save Class"})]})]}),e.jsx(Pe,{closeWarningRef:v,connectedRef:h,onYes:()=>{x(d),p(z),E(X)}}),e.jsx(Ne,{info:se,Title:te,infoModalRef:k}),e.jsx(Te,{setBackground:U,backgroundRef:N,currentBackground:R}),e.jsx(Be,{setBgColor:P,colorRef:T,currentBgColor:w,isProject:!1})]})}async function Me(){await Z()||(window.location.href=window.location.origin+"/Login/")}(async()=>await Me())();Se.createRoot(document.getElementById("root")).render(e.jsx(ke.StrictMode,{children:e.jsx(ye,{})}));