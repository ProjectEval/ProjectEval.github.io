import{r as t,j as e,g as o,n as h,l as x,c as f,R as j}from"./auth-x3Nz2WY_.js";import{C as w}from"./class_tile-7i-Bo1e3.js";import"./trash-arEgRoH7.js";function y(){const[a,c]=t.useState([]),[C,r]=t.useState(""),[i,l]=t.useState("Hex");t.useEffect(()=>{const s=["RedPolygon","FieryPolygon","Hex"],u=Math.floor(Math.random()*s.length);l(s[u]);async function g(){const n=await o();r(n);const m=await h(n);c(m)}g(),console.log(a)},[]);const d=async()=>{await x(),localStorage.removeItem("userType"),window.location.href=window.location.origin+"/Login/"};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"Center "+i,children:[e.jsx("h2",{className:"Title",children:"Student Classes"}),e.jsx("div",{className:"Classes",children:a.map(s=>e.jsx(w,{name:s.name,id:s.id,isTeacher:!1},s.name))}),e.jsx("br",{}),e.jsx("div",{className:"Controls",children:e.jsx("button",{className:"LogOut",onClick:d,children:"Log Out"})}),e.jsx("br",{})]})})}async function p(){await o()||(window.location.href=window.location.origin+"/Login/")}(async()=>await p())();f.createRoot(document.getElementById("root")).render(e.jsx(j.StrictMode,{children:e.jsx(y,{})}));
