import{r as a,j as s,g as f,e as g,f as w,h as p,i as Y,k as v,l as H,m as z,c as K,R as Q}from"./auth-x3Nz2WY_.js";import{C as X}from"./class_tile-7i-Bo1e3.js";import{P as J}from"./plus-Ip2amvQB.js";import{S}from"./search_bar-xIEDx9PG.js";import{C as T}from"./close-CDqjbHS0.js";import{I as Z}from"./info_dialog-csbS-ued.js";import"./trash-arEgRoH7.js";const q="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKaADAAQAAAABAAAAKQAAAADAIIRfAAAEa0lEQVRYCcWYe6hNWRzH7/F+j2g8poamjBLJOxSFGSGTKUOiZPyBJvL6YwyF/MM/iEhDmZRHdyY3j0kkz8i4HuNZyPiDvPL4w9t4HJ/vtfdun73WWevs4zr3V9/WWr/n96y19l5rn0xZNUg2m51KmuGgfizdc/obM5nMnpiuqG6mqKhYEAT7M/wjpop33zEYCNGHcWXafq20ARb/gRZdqKpNp184KLatDpI9PcV7eOxecx2XB0upWRoBzoM/WTYtXyTYGzLoHCnsHeuPILYJ7hNBG7CZ3Nfs4WVlefckScYStASEPkqykGT/hsnw6Ut/UzjO075H34e4p6GduGH0F4BWge4F7RR8TgXjnCYkkKMkyTgUi0HSnkX3F9gIRoLRoC3wyQUcysE5MA8MAEl5iWIqRE8mDUkSZRD8EadlwLAlgz/D+BU5J8VXSzVsD85s9DVBUHwaAL1zc8RG8l6OR+kHRn0byeWl5xVV1L78PRoFHYMk+6ES2+6kY4nGa6h/N1nLuvd4eL7EcR9onAz4jOPr5B4FybfJGsZMygHHBzTrk86esd51Z8EhcBEYxdC5ZKmNoAJcJ047V8aY7Tb9lWAfRf4P9axGU/o/gV9As1DvaL/Bdsxmz7fczXHWjDSyBcV0/9CfAbknMV1OF7Jfo9gARMIlVzCOif/Q0LmKJIlEqg/oDXqCTsC6FdCH8h8dJdW90SkB0QqcfDOqldDpdBroiDxD/pcZEuiQ11Gla1UamUyC44UGUGcyvr8W6h/4aZ/PFEmx1v5JI7cg+F2aAOpoFrU90k7GaS1pWoLiph+WSvhR2rdXUwV9dG7m23f5cj7KZ/DoH3vsVnOxJPWgFSNfFBMkktG7LUWCbil8q1zZk7rFd0wbh/9rkdTxl1Y6ULRryiBdkuOfvIWG79XTradtEOgPeoFvQSHb4Bx+E3ggvMcfNVrguxO0Aj55g8MlcAYcIX+lceKQUK8KkV0N6gKX6LY0z0U0yLcev+6uRNh0vOp9fYF8uqFHYswYDk/AQTx0LPrkBxy2QMTYo+i0SkOwVwAfQdXZTt3KJEEZXBeMo9iHyskjIlgOoRu054Hehy2BjtjWoFA5nM/RWG45UrAezd+gvcYlkgPMom5MhhjLHXhMoS0lQZUdwuQMDurnNMZM4ihyeiCKeV3kJC9icIeYEcyovnUisc3kXKw1QVCkvgI/qxMXG8kucYca6HdO1rSR3J50KuE4S60dyXoGSfbDWpy2Jh1j48v054Bd4HVM7+o+xbgNzAd38ziK4GLq70/ajQcndOABWkR/fDimfQb0wbWVRO+lD57Gdep7RP/23pcPMbpoTAfae+EFWAQX4VNOa0hekvIk4TQaXQx0Tq8iiT51I8GuI1R/Jrjy3CTu+ygo6BCrO8IsoIdlAz57ApPRuJIbzjYFxfS66mizBboKCPzmsHtNxp70RpgOuq24xGd3xVbZqoPkcUcV7bUTDntBpuogqRuTXlv6/NR/6iF00VjBUusK9knyAS/8HXeV2iFNAAAAAElFTkSuQmCC";function _(){const[d,A]=a.useState([]),[y,x]=a.useState([]),u=a.useRef(null),r=a.useRef(null),k=a.useRef(null),[N,I]=a.useState(""),[b,E]=a.useState(""),[M,B]=a.useState([]),[h,U]=a.useState(""),[c,C]=a.useState(""),[l,G]=a.useState(""),[L,j]=a.useState([]),[D,F]=a.useState([]);a.useEffect(()=>{console.log("Runne");const e=new URL(window.location.href);if(e.searchParams.has("background"))G(e.searchParams.get("background"));else{console.log(l);const t=["RedPolygon","FieryPolygon","Hex"],n=Math.floor(Math.random()*t.length),o=new URL(window.location.href);o.searchParams.set("background",t[n]),window.location.href=o.href}},[l]),a.useEffect(()=>{async function e(){const t=await f();C(t);const n=await g(t);A(n);const o=await w();x(o);const i=await p();j(i)}(async()=>await e())(),console.log(d)},[]);async function P(){const e=await f();C(e);const t=await g(e);A(t);const n=await w();x(n);const o=await p();j(o)}const O=async()=>{var i,R;if(await Y(h)){I("This class name is already taken!"),E("Class Name Taken"),(i=k.current)==null||i.showModal();return}const t=M.map(m=>m.id);t.push(c);const n=D.map(m=>m.id);await v(h,n,t),(R=r.current)==null||R.close();const o=await g(c);A(o)},V=async()=>{await H(),localStorage.removeItem("userType"),window.location.href=window.location.origin+"/Login/"},W=e=>async()=>{await z(e),P()};return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"Center "+l,children:[s.jsx("h2",{className:"Title",children:"Teacher Classes"}),s.jsxs("div",{className:"Icons",children:[s.jsx("img",{src:J,alt:"add class",className:"PlusIcon",onClick:()=>{var e;(e=r.current)==null||e.showModal()}}),s.jsx("img",{src:q,alt:"open account settings",className:"SettingsIcon",onClick:()=>{var e;(e=u.current)==null||e.showModal()}})]}),s.jsx("div",{className:"Classes",children:d.map(e=>s.jsx(X,{name:e.name,id:e.id,isTeacher:!0,deleteClass:W(e.id)},e.name))}),s.jsx("br",{}),s.jsx("div",{className:"Controls",children:s.jsx("button",{className:"LogOut",onClick:V,children:"Log Out"})}),s.jsx("br",{})]}),s.jsxs("dialog",{ref:r,children:[s.jsx("h2",{children:"Create Class"}),s.jsx("img",{src:T,alt:"close",className:"CloseIcon",onClick:()=>{var e;(e=r.current)==null||e.close()}}),s.jsxs("form",{children:[s.jsx("label",{htmlFor:"className",children:"Class Name:"}),s.jsx("span",{children:" "}),s.jsx("input",{type:"text",name:"className",id:"className",value:h,onChange:e=>{U(e.target.value)}}),s.jsx("br",{}),s.jsx("label",{htmlFor:"",children:"Other Teachers: "}),s.jsx(S,{name:"Teacher",content:y,currentUserId:c,updateContent:e=>{B(e)}}),s.jsx("br",{}),s.jsx("label",{htmlFor:"",children:"Students: "}),s.jsx(S,{name:"Student",content:L,currentUserId:c,updateContent:e=>{F(e)}}),s.jsx("br",{}),s.jsx("button",{type:"button",onClick:O,children:"Create Class"})]})]}),s.jsxs("dialog",{ref:u,className:"SettingsDialog",children:[s.jsx("h2",{children:"Account Settings"}),s.jsx("img",{src:T,alt:"close",className:"CloseIcon",onClick:()=>{var e;(e=u.current)==null||e.close()}}),s.jsx("form",{children:s.jsx("button",{type:"button",onClick:()=>{const e=new URL(window.location.origin);e.searchParams.set("userId",c),e.searchParams.set("background",l),window.location.href=e.origin+"/Project/Editor/"+e.search},children:"Edit Default Template"})})]}),s.jsx(Z,{info:N,Title:b,infoModalRef:k})]})}async function $(){await f()||(window.location.href=window.location.origin+"/Login/")}(async()=>await $())();K.createRoot(document.getElementById("root")).render(s.jsx(Q.StrictMode,{children:s.jsx(_,{})}));
