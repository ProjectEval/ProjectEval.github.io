import{j as e,r as t,g as z,o as pe,p as H,q as ge,a as Ce,t as xe,u as fe,v as we,w as Ie,x as Se,y as Ne,z as ke,A as ye,c as Ee,R as Re}from"./auth-GtzMzfUn.js";import{S as Be}from"./student_tile-N7MQswta.js";import{E as Pe,C as be}from"./close_warning_dialog-OISnX8W_.js";import{S as Ge}from"./search_bar-dFaHz4xM.js";import{B as ve}from"./back_arrow-IdcwQJqZ.js";import{C as q}from"./close-CDqjbHS0.js";import{P as Te}from"./plus-Ip2amvQB.js";import{I as Fe}from"./info_dialog-AMQudrJn.js";import{C as Le,a as De}from"./choose_colors_dialog-wW7gqsDG.js";import{T as Ue}from"./trash-arEgRoH7.js";const Me="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAxCAYAAACoJ+s+AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAMQAAAAAXFpNfAAAD1UlEQVRYCe2ZSWjVUBSGfbWi1VqxooILBUGcLc4julLBhSCCoKILKxZFxGEluBC6EFxbK9aiIoJUFFw4ICIoDrgpxWrFsdSNAy3a1qGtw/P7Q1LiM8m7Sdr3svDA33vuOeee/Dk3Nzf3NTUghKTT6XGE7wErQXGIoZ2pVGqe4skxhaaZfrfJ+EKTIMWQeBLNeTBC/RiyibFl5NsGybZseQqyBbj8R9HjklO6NFAVz0JypAxBYkSQRDNJMi0oUQSfZkQkA2/aiCCJyiIQ8BuiCjoyGeUMJEscQ2ZrSrA0c2Af9jUzpyE53CunKcEuBn+w0Urb45Ushm0GY09BclhmjlSmwbRPMj07c8FasBoE3az7NXOY2I3AS+oxlrO6vznOoKROjGdLknZwG+wlYD145RkYzjiH8JPcfJEz7K/3II5ROGaDMaA3yAl2tRch1uH00ZsYu4H+cbDIsfu07kXiFTIf4wnyVZC3yyJIR7vCIaDpGgiyyS0COhin91k5qBRhJUWvBktAHNFNVilfAX9EshasAybkCOsVxeumLpBntO4YfSd4ANzinqkWtyNAX4Zve4rEmprKgEAv1yrItDB2Os7LdsAb2i3YW7EPQdd0L7V9albgey8FfwnNIOlZpEeLZE2WIFP3RAL10i11VfK+a/B+fNaixN8B2gzQqQo+JEnYF7FXBR0uL1BUyc/kHoyuZ9Kp5HP0u6ATmEi3CDYRGfbZCyKoCz8DW1Upm6SmW89UWPmikoclZ3KRqQRZeywk9d23C9wzGZgZYz0TmcY+6msB1VLB4jgk+5Og7nMW0B47NCrJ/iYoktqZaiBZFIVkLgiKpM4j1h4blmSuCIrkAlCtVW2T3E3/qRxBkkuC4rEYHINkISS/ox8AP4GvxCWY7cvE68LLMe6TA5LNNFek+4l7E/eL8bJrL5Vo/9VeHHYnGm9XUdW7CvQ96SlRCS4kWyMV0NfLQc/M5saGoNCoU1xBBfSOiy3c5FeSCJ4StYKa4jpIPqZ9C354Zg823oDcHTtEBP85MMkXlaDG6sCl83LUM7MWiEPQdyVHnWJy50b+E4xb5/8VjFnB7qRXsC3pBBuSTFAfInVJJljFTtMYZyeJ+fx7Dv+N9QmogdxNRSSF4A64aLv7aH88iJsliSAIqZcOocw2yc+gxTWfBI2OCyKow0s+xOi6IvguH+xMryuCj/JAUCu23uS6IngORPlkN8nvF3OJlfvJz+m2FxD4GoNOZn39zxn3ddy6ZuyI2xCk61xhCQegCSibgX5HGQv062ivHz2qaHdoB/rl9Tq4RlF+0RrJH/T5KYIhbDcJAAAAAElFTkSuQmCC";function Ze({name:j,projectId:x,classId:f,groupId:m,deleteGroup:w}){return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"GroupTile",onClick:()=>{const a=new URL(window.location.origin);a.searchParams.set("classId",f),a.searchParams.set("projectId",x),a.searchParams.set("groupId",m),window.location.href=a.origin+"/Group/"+a.search},children:[e.jsx("h2",{className:"GroupName",children:j}),e.jsx("img",{src:Ue,alt:"delete group",className:"GroupTrashIcon",onClick:a=>{a.stopPropagation(),w(m)}})]})})}function Qe(){const[j,x]=t.useState([]),[f,m]=t.useState([]),[w,a]=t.useState([]),[I,X]=t.useState(""),[b,$]=t.useState(!1),[r,_]=t.useState(""),[n,ee]=t.useState(""),S=t.useRef(null),A=t.useRef(null),[G,N]=t.useState(""),[se,te]=t.useState(""),k=t.useRef(null),[oe,v]=t.useState(""),[ae,T]=t.useState(""),[y,F]=t.useState(""),[E,L]=t.useState(""),[D,U]=t.useState(""),[M,Z]=t.useState(""),Q=t.useRef(null),J=t.useRef(null),Y=t.useRef(null),[re,ne]=t.useState(!1),i=t.useRef(null),[ce,le]=t.useState(),[K,R]=t.useState(""),[h,B]=t.useState([]),[ie,W]=t.useState(!1),[de,ue]=t.useState(!0);t.useEffect(()=>{p(),console.log("Fetched Students")},[]);async function p(){var V;const s=await z();te(s);const g=window.location.search,c=new URLSearchParams(g);if(!c.has("classId"))throw Error("missing class id!");if(!c.has("projectId"))throw Error("missing project id!");const o=c.get("classId");ee(o);const C=await pe(o),O=await H(C.students);m(O);const d=c.get("projectId"),l=await ge(o,d);X(l.name),N(l.name),F(l.background),Z(l.cardColor),L(l.backgroundColor),U(l.evalBackgroundColor),_(d);const P=await Ce(s);if($(P),P){const u=await xe(o,d);a(u)}else{const u=await fe(o,d,s);if(u!=null){ne(!0);const he=await H(u.students);x(he)}}P&&(await we(o,d)).length==0&&((V=S.current)==null||V.showModal()),ue(!1)}const je=async()=>{var s;await Se(n,r,G,y,E,M,D),(s=A.current)==null||s.close(),await p()},me=async()=>{var g,c;const s=h.map(o=>o.id);for(let o=0;o<h.length;o++){const C=h[o];if(await Ne(n,r,C.id)){v(`${C.name} is already in another group`),T("Unable to create group"),(g=k.current)==null||g.showModal();return}}await ke(n,r,K,s),await p(),(c=i.current)==null||c.close()},Ae=async s=>{await ye(n,r,s),await p()};return e.jsxs(e.Fragment,{children:[de?e.jsx("div",{className:"Loading"}):e.jsxs("div",{className:"Center "+y,style:{backgroundColor:E},children:[e.jsx("h2",{className:"Title",children:I}),b&&e.jsxs("div",{className:"TeacherIcons",children:[e.jsx("img",{src:Me,alt:"copy project",className:"CopyIcon",onClick:async()=>{var s;W(!0),await Ie(n,r),v("Project copied successfully!"),T("Project Copied"),(s=k.current)==null||s.showModal()}}),e.jsx("img",{src:Pe,alt:"edit project",className:"EditIcon",onClick:()=>{var s;(s=A.current)==null||s.showModal()}}),e.jsx("img",{src:Te,alt:"add group",className:"PlusIcon",onClick:()=>{var s;(s=i.current)==null||s.showModal()}})]}),e.jsx("img",{src:ve,alt:"back",className:"BackArrow",onClick:()=>{const s=new URL(window.location.href);s.searchParams.delete("projectId"),window.location.href=s.origin+"/Projects/"+s.search}}),b?e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Groups:"}),e.jsx("div",{className:"Students",children:w.map(s=>e.jsx(Ze,{name:s.name,groupId:s.id,projectId:r,classId:n,deleteGroup:Ae},s.id))})]}):re?e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Students:"}),e.jsx("div",{className:"Students",children:j.map(s=>e.jsx(Be,{name:s.name,id:s.id,projectId:r,classId:n,projectName:I},s.id))})]}):e.jsx("h2",{children:"Not in a group!"}),e.jsx("br",{})]}),e.jsxs("dialog",{ref:S,className:"warningDialog",children:[e.jsx("label",{children:"This project has no evaluation template! You need to create one before you can evaluate students."}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("button",{onClick:()=>{const s=new URL(window.location.origin);s.searchParams.set("projectId",r),s.searchParams.set("classId",n),window.location.href=s.origin+"/Project/Editor/"+s.search},children:"Create Eval Template"}),e.jsx("span",{children:" "}),e.jsx("button",{onClick:()=>{var s;(s=S.current)==null||s.close()},children:"Close"})]}),e.jsxs("dialog",{ref:A,className:"EditProjDialog",children:[e.jsx("h2",{children:"Edit Project"}),e.jsx("img",{src:q,alt:"close",className:"CloseIcon",onClick:()=>{var s;le(A),(s=Y.current)==null||s.showModal()}}),e.jsxs("form",{children:[e.jsxs("div",{className:"EditSides",children:[e.jsxs("div",{className:"EditLeft",children:[e.jsx("label",{htmlFor:"projectName",children:"Project Name:"}),e.jsx("span",{children:" "}),e.jsx("input",{type:"text",name:"projectName",id:"projectName",value:G,onChange:s=>{N(s.target.value)}}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("button",{type:"button",onClick:()=>{const s=new URL(window.location.origin);s.searchParams.set("projectId",r),s.searchParams.set("classId",n),window.location.href=s.origin+"/Project/Editor/"+s.search},children:"Edit Project Template"})]}),e.jsxs("div",{className:"EditRight",children:[e.jsx("button",{type:"button",onClick:()=>{var s;(s=J.current)==null||s.showModal()},children:"Edit Background"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("button",{type:"button",onClick:()=>{var s;(s=Q.current)==null||s.showModal()},children:"Edit Colors"})]})]}),e.jsx("button",{type:"button",onClick:je,children:"Save Project"})]})]}),e.jsx(Fe,{info:oe,Title:ae,infoModalRef:k,onClose:()=>{if(!ie)return;W(!1);const s=new URL(window.location.href);s.searchParams.delete("projectId"),window.location.href=s.origin+"/Projects/"+s.search}}),e.jsxs("dialog",{ref:i,onClose:()=>{var s;R(""),B([]),(s=i.current)==null||s.close()},children:[e.jsx("h2",{children:"Create Group"}),e.jsx("img",{src:q,alt:"close",className:"CloseIcon",onClick:()=>{var s;R(""),B([]),(s=i.current)==null||s.close()}}),e.jsxs("form",{children:[e.jsx("label",{htmlFor:"groupName",children:"Group Name:"}),e.jsx("span",{children:" "}),e.jsx("input",{type:"text",name:"groupName",id:"groupName",value:K,onChange:s=>{R(s.target.value)}}),e.jsx("br",{}),e.jsx("label",{htmlFor:"",className:"InviteTitle",children:"Students: "}),e.jsx(Ge,{name:"Student",content:f,currentUserId:se,defaultAddedContent:h,updateContent:s=>{B(s)}}),e.jsx("br",{}),e.jsx("button",{type:"button",onClick:me,children:"Create Group"})]})]}),e.jsx(be,{closeWarningRef:Y,connectedRef:ce,onYes:()=>{N(I)}}),e.jsx(Le,{setBackground:F,backgroundRef:J,currentBackground:y}),e.jsx(De,{setBgColor:L,colorRef:Q,currentBgColor:E,isProject:!0,currentTileColor:M,setTileColor:Z,currentEvalBgColor:D,setEvalBgColor:U})]})}async function Je(){await z()||(window.location.href=window.location.origin+"/Login/")}(async()=>await Je())();Ee.createRoot(document.getElementById("root")).render(e.jsx(Re.StrictMode,{children:e.jsx(Qe,{})}));