import{r as s,j as e,s as F,g as k,a as E,b as L,d as R,c as U,R as M}from"./auth-rRsfrA7Z.js";import{B as C}from"./back_arrow-IdcwQJqZ.js";import{I as P}from"./info_dialog-wKtPKFcQ.js";function B({background:c,setLoginState:r}){const[t,i]=s.useState(""),[o,l]=s.useState(""),[d,u]=s.useState(!1),g=s.useRef(null),[x,h]=s.useState(""),[w,S]=s.useState("");async function j(){u(!0),await F(t,o,f);const a=await k();console.log(a);const m=await E(a);console.log(m),m?localStorage.setItem("userType","Teacher"):localStorage.setItem("userType","Student"),window.location.href=window.location.origin+"/Dashboard/"}const f=(a,m)=>{var p;u(!1),h(a),S(m),(p=g.current)==null||p.showModal()},b=()=>{window.location.href="/Login/ForgotPassword/"+window.location.search};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"Center "+c,children:[e.jsx("h2",{className:"Title",children:"Sign In"}),e.jsx("img",{src:C,alt:"back",className:"BackArrow",onClick:()=>{r(""),i(""),l("")}}),e.jsx("label",{htmlFor:"email",children:"Email "}),e.jsx("input",{type:"text",id:"email",value:t,onChange:a=>{i(a.target.value)}}),e.jsx("br",{}),e.jsx("label",{htmlFor:"password",children:"Password "}),e.jsx("input",{type:"password",id:"password",value:o,onChange:a=>{l(a.target.value)}}),e.jsx("br",{}),e.jsx("a",{className:"ForgotPassword",onClick:b,children:"Forgot Password?"}),e.jsx("br",{}),d?e.jsx("div",{className:"Loading"}):e.jsx("button",{onClick:j,children:"Sign In"}),e.jsx("br",{})]}),e.jsx(P,{info:x,Title:w,infoModalRef:g})]})}function D({background:c,setLoginState:r}){const[t,i]=s.useState(""),[o,l]=s.useState(""),[d,u]=s.useState(""),[g,x]=s.useState(""),[h,w]=s.useState(""),[S,j]=s.useState(!1),f=s.useRef(null),[b,a]=s.useState(""),[m,p]=s.useState("");async function v(){if(j(!0),o!=d){T("Passwords do not match!","Passwords do not match!");return}if(await L(g)){T("This name is already taken!","Name Taken");return}localStorage.setItem("userType",h),await R(g,t,o,h=="Teacher",I,T)}function I(){if(new URLSearchParams(window.location.search).get("classId")!=null){window.location.href="/JoinClass/"+window.location.search;return}window.location.href="/Dashboard/"}const T=(n,N)=>{var y;j(!1),a(n),p(N),(y=f.current)==null||y.showModal()};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"Center "+c,children:[e.jsx("h2",{className:"Title",children:"Sign Up"}),e.jsx("img",{src:C,alt:"back",className:"BackArrow",onClick:()=>{h==""?(r(""),i(""),l(""),x("")):(w(""),i(""),l(""),x(""))}}),h==""?e.jsxs("div",{className:"Options",children:[e.jsx("button",{onClick:()=>{w("Teacher")},children:"Teacher"}),e.jsx("button",{onClick:()=>{w("Student")},children:"Student"})]}):e.jsxs(e.Fragment,{children:[e.jsx("label",{htmlFor:"name",children:"Name "}),e.jsx("input",{type:"text",id:"name",value:g,onChange:n=>{x(n.target.value)}}),e.jsx("br",{}),e.jsx("label",{htmlFor:"email",children:"Email "}),e.jsx("input",{type:"text",id:"email",value:t,onChange:n=>{i(n.target.value)}}),e.jsx("br",{}),e.jsx("label",{htmlFor:"password",children:"Password "}),e.jsx("input",{type:"password",id:"password",value:o,onChange:n=>{l(n.target.value)}}),e.jsx("br",{}),e.jsx("label",{htmlFor:"confirmPassword",children:"Confirm Password "}),e.jsx("input",{type:"password",id:"confirmPassword",value:d,onChange:n=>{u(n.target.value)}}),e.jsx("br",{}),S?e.jsx("div",{className:"Loading"}):e.jsx("button",{onClick:v,children:"Sign Up"})]}),e.jsx("br",{})]}),e.jsx(P,{info:b,Title:m,infoModalRef:f})]})}function A(){const[c,r]=s.useState(""),[t,i]=s.useState("Hex");return s.useEffect(()=>{const o=["RedPolygon","FieryPolygon","Hex"],l=Math.floor(Math.random()*o.length);i(o[l]);async function d(){const u=await k();console.log(u)}d()},[]),e.jsx(e.Fragment,{children:c==""?e.jsxs("div",{className:"Login Center "+t,children:[e.jsx("h2",{className:"Title",children:"Login"}),e.jsxs("div",{className:"Options",children:[e.jsx("button",{onClick:()=>{r("signin")},children:"Sign In"}),e.jsx("button",{onClick:()=>{r("signup")},children:"Sign Up"})]}),e.jsx("br",{})]}):c=="signin"?e.jsx(B,{background:t,setLoginState:r}):e.jsx(D,{background:t,setLoginState:r})})}async function H(){await k()&&(window.location.href=window.location.origin+"/Dashboard/")}(async()=>await H())();U.createRoot(document.getElementById("root")).render(e.jsx(M.StrictMode,{children:e.jsx(A,{})}));
