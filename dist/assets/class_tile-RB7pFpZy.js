import{j as a}from"./auth-l123uYc1.js";import{T as c}from"./trash-arEgRoH7.js";function t({name:o,id:r,isTeacher:i,deleteClass:n}){return a.jsx(a.Fragment,{children:a.jsxs("div",{className:"ClassTile",onClick:()=>{const s=new URL(window.location.origin);s.searchParams.set("classId",r),window.location.href=s.origin+"/Projects/"+s.search},children:[a.jsx("h2",{className:"ClassName",children:o}),i&&a.jsx("img",{className:"ClassTrashIcon",src:c,alt:"Trash Icon",onClick:s=>{s.stopPropagation(),n()}})]})})}export{t as C};