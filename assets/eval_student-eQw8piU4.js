import{j as e,r as d,g as b,t as U,v as L,w as D,c as O,R as V}from"./auth-OIc4apUQ.js";import{B as H}from"./back_arrow-IdcwQJqZ.js";function I({text:s,value:a,handleChangeChoice:l,selectedValue:c}){function r(){l(a)}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"RangeBtn","data-value":a,children:[e.jsx("label",{htmlFor:"RangeBtn",children:a}),e.jsx("div",{className:"RangeIcon "+(c==a?"Selected":""),onClick:r}),e.jsx("label",{htmlFor:"RangeBtn",className:"RangeHint",children:s})]})})}function W({question:s,updateEval:a,submission:l}){function c(r){a(r)}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Question",id:s.id,children:[e.jsx("h3",{children:s.Question}),e.jsxs("div",{className:"Buttons",children:[e.jsx(I,{text:s.Answer.MinTitle,value:s.Answer.Min,handleChangeChoice:c,selectedValue:l.value}),[...Array(s.Answer.Max-s.Answer.Min-1)].map((r,m)=>e.jsx(I,{text:"",value:s.Answer.Min+m+1,handleChangeChoice:c,selectedValue:l.value})),e.jsx(I,{text:s.Answer.MaxTitle,value:s.Answer.Max,handleChangeChoice:c,selectedValue:l.value})]})]})})}function z({text:s,handleChangeChoice:a,selectedValue:l}){function c(r){a(s)}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Choice","data-value":s,onClick:c,children:[e.jsx("div",{className:"ChoiceIcon "+(l==s?"Selected":"")}),e.jsx("label",{htmlFor:"Choice",className:"ChoiceText",children:s})]})})}function G({question:s,updateEval:a,submission:l}){function c(r){a(r)}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Question",id:s.id,children:[e.jsx("h3",{children:s.Question}),e.jsx("div",{className:"Options",children:s.Answer.Choices.map(r=>e.jsx(z,{text:r,handleChangeChoice:c,selectedValue:l.value}))})]})})}function J({text:s,handleAddChoice:a,handleRemoveChoice:l,selectedValue:c}){function r(){console.log(c),c.split(",").includes(s)?l(s):a(s)}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Select","data-value":s,onClick:r,children:[e.jsx("div",{className:"SelectIcon "+(c.split(",").includes(s)?"Selected":"")}),e.jsx("label",{htmlFor:"Select",className:"SelectText",children:s})]})})}function K({question:s,updateEval:a,getEval:l,submission:c}){function r(h){l().value==""?a(h):a(l().value+","+h)}function m(h){const u=l().value.split(",");u.splice(u.indexOf(h),1),a(u.join(","))}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Question",id:s.id,children:[e.jsx("h3",{children:s.Question}),e.jsx("div",{className:"Options",children:s.Answer.Choices.map(h=>e.jsx(J,{text:h,handleAddChoice:r,handleRemoveChoice:m,selectedValue:c.value}))})]})})}function X({question:s,updateEval:a,submission:l}){return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Question",id:s.id,children:[e.jsx("h3",{children:s.Question}),e.jsx("textarea",{name:"response",id:s.Question+"-value",className:"ResInput",value:l.value,onChange:c=>a(c.target.value)})]})})}function Y(){const[s,a]=d.useState(""),[l,c]=d.useState(""),[r,m]=d.useState(""),[h,u]=d.useState(""),[y,A]=d.useState(""),[o,g]=d.useState([]),w=d.useRef(null),f=d.useRef(null),[M,T]=d.useState([{Question:"How much did they contribute?",Answer:{Type:"Range",Min:1,MinTitle:"Not at all",Max:5,MaxTitle:"Did Everything"},id:"contribution",hasComment:!0},{Question:"What did they help with?",Answer:{Type:"MultiChoice",Choices:["Slides","Research","Both"]},id:"help",hasComment:!0},{Question:"What did they do well?",Answer:{Type:"MultiSelect",Choices:["Teamwork","Efficiency","Creativity","Nothing"]},id:"well",hasComment:!0},{Question:"Any other comments?",Answer:{Type:"FreeResponse"},hasComment:!1,id:"comments"}]);d.useEffect(()=>{async function n(){const t=window.location.search,i=new URLSearchParams(t);if(!i.has("name"))throw Error("missing name!");if(!i.has("projectId"))throw Error("missing project id!");if(!i.has("studentId"))throw Error("missing student id!");if(!i.has("classId"))throw Error("missing class id!");const p=i.get("projectId"),C=i.get("classId"),P=i.get("studentId");a(i.get("name")),u(p),A(C),c(i.get("studentId"));const E=await b();if(!E)throw Error("missing user id!");m(E);const R=await U(C,p);T(R);const N=await L(C,p,P,E);console.log(N);const j=[];R.forEach(v=>{j.push({id:v.id,value:"",comment:""})}),console.log(j),N.forEach(v=>{j.forEach(S=>{v.id==S.id&&(S.value=v.value,S.comment=v.comment)})}),console.log(j),g(j)}n()},[]);async function F(){console.log(o);for(let t=0;t<o.length;t++)if(o[t].value==""){f.current.showModal();return}const n={submitterId:r,targetId:l,submission:o};console.log(n),await D(y,h,n,Q)}const Q=()=>{w.current.showModal()},x=n=>t=>{const i=[...o];i[n].value=t,g(i)},k=n=>t=>{const i=[...o];i[n].comment=t,g(i)},B=n=>()=>o[n];return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"Center",children:[e.jsx("h2",{className:"Title",children:s}),e.jsx("img",{src:H,alt:"back",className:"BackArrow",onClick:()=>{const n=new URL(window.location.href);n.searchParams.delete("name"),n.searchParams.delete("studentId"),window.location.href=n.origin+"/Project/"+n.search}}),e.jsx("div",{className:"EvalQuestions",children:o.length>0?M.map((n,t)=>e.jsxs(e.Fragment,{children:[n.Answer.Type=="Range"?e.jsx(W,{question:n,updateEval:x(t),submission:o[t]},n.id):n.Answer.Type=="MultiChoice"?e.jsx(G,{question:n,updateEval:x(t),submission:o[t]},n.id):n.Answer.Type=="MultiSelect"?e.jsx(K,{question:n,updateEval:x(t),getEval:B(t),submission:o[t]},n.id):n.Answer.Type=="FreeResponse"?e.jsx(X,{question:n,updateEval:x(t),submission:o[t]},n.id):null,n.hasComment?e.jsxs(e.Fragment,{children:[e.jsx("label",{htmlFor:"",children:"Comment: "}),e.jsx("br",{}),e.jsx("textarea",{name:"",value:o[t].comment,onChange:i=>{k(t)(i.target.value)},cols:20,rows:5})," "]}):null]})):null}),e.jsx("br",{}),e.jsx("div",{className:"SubmitEval",children:e.jsx("button",{className:"SubmitEvalBtn",onClick:F,children:"Submit Evaluation"})}),e.jsx("br",{}),e.jsx("br",{})]}),e.jsxs("dialog",{ref:w,className:"CompleteEval",children:[e.jsx("h2",{children:"Eval Submitted!"}),e.jsx("button",{onClick:()=>{w.current.close();const n=new URL(window.location.href);n.searchParams.delete("name"),n.searchParams.delete("studentId"),window.location.href=n.origin+"/Project/"+n.search},children:"Close"})]}),e.jsxs("dialog",{ref:f,className:"IncompleteEval",children:[e.jsx("h2",{children:"Please fill out all the fields!"}),e.jsx("button",{onClick:()=>{f.current.close()},children:"Close"})]})]})}async function Z(){await b()||(window.location.href=window.location.origin+"/Login/")}(async()=>await Z())();O.createRoot(document.getElementById("root")).render(e.jsx(V.StrictMode,{children:e.jsx(Y,{})}));
