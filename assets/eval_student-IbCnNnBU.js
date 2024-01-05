import{j as e,r as m,g as A,v as H,B as W,q as z,C as G,c as J,R as K}from"./auth-x3Nz2WY_.js";import{B as X}from"./back_arrow-IdcwQJqZ.js";function I({text:s,value:l,handleChangeChoice:n,selectedValue:c}){function r(){n(l)}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"RangeBtn","data-value":l,children:[e.jsx("label",{htmlFor:"RangeBtn",children:l}),e.jsx("div",{className:"RangeIcon "+(c==l?"Selected":""),onClick:r}),e.jsx("label",{htmlFor:"RangeBtn",className:"RangeHint",children:s})]})})}function Y({question:s,updateEval:l,submission:n,updateEvalComment:c}){function r(i){l(i)}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Question",id:s.id,children:[e.jsx("h3",{children:s.Question}),e.jsxs("div",{className:"Buttons",children:[e.jsx(I,{text:s.Answer.MinTitle,value:s.Answer.Min,handleChangeChoice:r,selectedValue:n.value}),[...Array(s.Answer.Max-s.Answer.Min-1)].map((i,u)=>e.jsx(I,{text:"",value:s.Answer.Min+u+1,handleChangeChoice:r,selectedValue:n.value})),e.jsx(I,{text:s.Answer.MaxTitle,value:s.Answer.Max,handleChangeChoice:r,selectedValue:n.value})]}),s.hasComment&&e.jsxs(e.Fragment,{children:[e.jsx("label",{htmlFor:"",children:"Comment: "}),e.jsx("textarea",{name:"",className:"CommentElmt",value:n.comment,onChange:i=>{c(i.target.value)}})]})]})})}function Z({text:s,handleChangeChoice:l,selectedValue:n}){function c(r){l(s)}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Choice","data-value":s,onClick:c,children:[e.jsx("div",{className:"ChoiceIcon "+(n==s?"Selected":"")}),e.jsx("label",{htmlFor:"Choice",className:"ChoiceText",children:s})]})})}function _({question:s,updateEval:l,submission:n,updateEvalComment:c}){function r(i){l(i)}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Question",id:s.id,children:[e.jsx("h3",{children:s.Question}),e.jsx("div",{className:"Options",children:s.Answer.Choices.map(i=>e.jsx(Z,{text:i,handleChangeChoice:r,selectedValue:n.value}))}),e.jsx("br",{}),s.hasComment&&e.jsxs(e.Fragment,{children:[e.jsx("label",{htmlFor:"",children:"Comment: "}),e.jsx("textarea",{name:"",className:"CommentElmt",value:n.comment,onChange:i=>{c(i.target.value)}})]})]})})}function $({text:s,handleAddChoice:l,handleRemoveChoice:n,selectedValue:c}){function r(){console.log(c),c.split(",").includes(s)?n(s):l(s)}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Select","data-value":s,onClick:r,children:[e.jsx("div",{className:"SelectIcon "+(c.split(",").includes(s)?"Selected":"")}),e.jsx("label",{htmlFor:"Select",className:"SelectText",children:s})]})})}function q({question:s,updateEval:l,getEval:n,submission:c,updateEvalComment:r}){function i(h){n().value==""?l(h):l(n().value+","+h)}function u(h){const j=n().value.split(",");j.splice(j.indexOf(h),1),l(j.join(","))}return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Question",id:s.id,children:[e.jsx("h3",{children:s.Question}),e.jsx("div",{className:"Options",children:s.Answer.Choices.map(h=>e.jsx($,{text:h,handleAddChoice:i,handleRemoveChoice:u,selectedValue:c.value}))}),e.jsx("br",{}),s.hasComment&&e.jsxs(e.Fragment,{children:[e.jsx("label",{htmlFor:"",children:"Comment: "}),e.jsx("textarea",{name:"",className:"CommentElmt",value:c.comment,onChange:h=>{r(h.target.value)}})]})]})})}function ee({question:s,updateEval:l,submission:n,updateEvalComment:c}){return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Question",id:s.id,children:[e.jsx("h3",{children:s.Question}),e.jsx("textarea",{name:"response",id:s.Question+"-value",className:"ResInput",value:n.value,onChange:r=>l(r.target.value)}),e.jsx("br",{}),s.hasComment&&e.jsxs(e.Fragment,{children:[e.jsx("label",{htmlFor:"",children:"Comment: "}),e.jsx("textarea",{name:"",className:"CommentElmt",value:n.comment,onChange:r=>{c(r.target.value)}})]})]})})}function se(){const[s,l]=m.useState(""),[n,c]=m.useState(""),[r,i]=m.useState(""),[u,h]=m.useState(""),[j,M]=m.useState(""),[d,p]=m.useState([]),E=m.useRef(null),S=m.useRef(null),[T,k]=m.useState(""),[Q,B]=m.useState(""),[P,U]=m.useState([{Question:"How much did they contribute?",Answer:{Type:"Range",Min:1,MinTitle:"Not at all",Max:5,MaxTitle:"Did Everything"},id:"contribution",hasComment:!0},{Question:"What did they help with?",Answer:{Type:"MultiChoice",Choices:["Slides","Research","Both"]},id:"help",hasComment:!0},{Question:"What did they do well?",Answer:{Type:"MultiSelect",Choices:["Teamwork","Efficiency","Creativity","Nothing"]},id:"well",hasComment:!0},{Question:"Any other comments?",Answer:{Type:"FreeResponse"},hasComment:!1,id:"comments"}]);m.useEffect(()=>{async function a(){const t=window.location.search,o=new URLSearchParams(t);if(!o.has("name"))throw Error("missing name!");if(!o.has("projectId"))throw Error("missing project id!");if(!o.has("studentId"))throw Error("missing student id!");if(!o.has("classId"))throw Error("missing class id!");const w=o.get("projectId"),f=o.get("classId"),V=o.get("studentId");l(o.get("name")),h(w),M(f),c(o.get("studentId"));const N=await A();if(!N)throw Error("missing user id!");i(N);const R=await H(f,w);U(R);const y=await W(f,w,V,N);console.log(y);const v=[];R.forEach(g=>{v.push({id:g.id,value:"",comment:""})}),console.log(v),y.forEach(g=>{v.forEach(b=>{g.id==b.id&&(b.value=g.value,b.comment=g.comment)})}),console.log(v),p(v);const F=await z(f,w);k(F.background),B(F.evalBackgroundColor)}a()},[]);async function D(){console.log(d);for(let t=0;t<d.length;t++)if(d[t].value==""){S.current.showModal();return}const a={submitterId:r,targetId:n,submission:d};console.log(a),await G(j,u,a,L)}const L=()=>{E.current.showModal()},x=a=>t=>{const o=[...d];o[a].value=t,p(o)},C=a=>t=>{const o=[...d];o[a].comment=t,p(o)},O=a=>()=>d[a];return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"Center "+T,style:{backgroundColor:Q},children:[e.jsx("h2",{className:"Title",children:s}),e.jsx("img",{src:X,alt:"back",className:"BackArrow",onClick:()=>{const a=new URL(window.location.href);a.searchParams.delete("name"),a.searchParams.delete("studentId"),window.location.href=a.origin+"/Project/"+a.search}}),e.jsx("div",{className:"EvalQuestions",children:d.length>0?P.map((a,t)=>e.jsx(e.Fragment,{children:a.Answer.Type=="Range"?e.jsx(Y,{question:a,updateEval:x(t),submission:d[t],updateEvalComment:C(t)},a.id):a.Answer.Type=="MultiChoice"?e.jsx(_,{question:a,updateEval:x(t),submission:d[t],updateEvalComment:C(t)},a.id):a.Answer.Type=="MultiSelect"?e.jsx(q,{question:a,updateEval:x(t),getEval:O(t),submission:d[t],updateEvalComment:C(t)},a.id):a.Answer.Type=="FreeResponse"?e.jsx(ee,{question:a,updateEval:x(t),submission:d[t],updateEvalComment:C(t)},a.id):null})):null}),e.jsx("br",{}),e.jsx("div",{className:"SubmitEval",children:e.jsx("button",{className:"SubmitEvalBtn",onClick:D,children:"Submit Evaluation"})}),e.jsx("br",{}),e.jsx("br",{})]}),e.jsxs("dialog",{ref:E,className:"CompleteEval",children:[e.jsx("h2",{children:"Eval Submitted!"}),e.jsx("button",{onClick:()=>{E.current.close();const a=new URL(window.location.href);a.searchParams.delete("name"),a.searchParams.delete("studentId"),window.location.href=a.origin+"/Project/"+a.search},children:"Close"})]}),e.jsxs("dialog",{ref:S,className:"IncompleteEval",children:[e.jsx("h2",{children:"Please fill out all the fields!"}),e.jsx("button",{onClick:()=>{S.current.close()},children:"Close"})]})]})}async function ae(){await A()||(window.location.href=window.location.origin+"/Login/")}(async()=>await ae())();J.createRoot(document.getElementById("root")).render(e.jsx(K.StrictMode,{children:e.jsx(se,{})}));
