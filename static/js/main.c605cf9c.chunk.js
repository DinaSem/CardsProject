(this.webpackJsonptodo16v2=this.webpackJsonptodo16v2||[]).push([[0],{110:function(e,t,n){},111:function(e,t,n){},136:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(32),i=n.n(c),o=(n(110),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,190)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))}),s=(n(111),n(15)),l=n(182),j=n(180),d=n(18),u={status:"idle",error:null,isInitialized:!1},b=function(e){return{type:"APP/SET-ERROR",error:e}},O=function(e){return{type:"APP/SET-STATUS",status:e}},h=n(1),m=a.a.forwardRef((function(e,t){return Object(h.jsx)(j.a,Object(s.a)({elevation:6,ref:t,variant:"filled"},e))}));function p(){var e=Object(d.c)((function(e){return e.app.error})),t=Object(d.b)(),n=function(e,n){"clickaway"!==n&&t(b(null))};return Object(h.jsx)(l.a,{open:null!==e,autoHideDuration:6e3,onClose:n,children:Object(h.jsx)(m,{onClose:n,severity:"error",sx:{width:"100%"},children:e})})}var f,g,v=n(186),x=n(181),w=n(183),y=n(184),S=n(187),E=n(178),T=n(188),C=n(57),I=n(91),L=n.n(I).a.create({baseURL:"https://neko-back.herokuapp.com/2.0",withCredentials:!0}),P=function(e){return L.post("/auth/login",e)},_=function(e){return L.post("/auth/register",e)},A=function(){return L.post("/auth/me",{})},R=function(e){return L.put("/auth/me",{name:e})};!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(f||(f={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(g||(g={}));var k=function(e,t){t(b(e.message?e.message:"Some error occurred")),t(O("failed"))},D={isLoggedIn:!1,isRegistered:!1,user:null,name:"",email:""},F=function(e){return{type:"login/SET-IS-LOGGED-IN",payload:e}},U=function(e){return{type:"login/SET-EMAIL",email:e}},G=n(14),N=n(23),H=function(){var e=Object(d.c)((function(e){return e.auth.isLoggedIn})),t=Object(d.b)(),n=Object(G.g)(),a=Object(C.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 \u0444\u043e\u0440\u043c\u0430\u0442 email"):t.email="\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f email",e.password?e.password.length<3&&(t.password="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c \u0431\u043e\u043b\u044c\u0448\u0435 3 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"):t.password="\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u043f\u0430\u0440\u043e\u043b\u044c",t},onSubmit:function(e){var n;t((n=e,function(e){e(O("loading")),P(n).then((function(t){e(F(t.data)),e(O("succeeded"))})).catch((function(t){k(t,e)}))})),a.resetForm()}});return Object(r.useEffect)((function(){e&&n("/")}),[n,e]),Object(h.jsx)("form",{onSubmit:a.handleSubmit,children:Object(h.jsx)(v.a,{container:!0,justifyContent:"center",children:Object(h.jsx)(v.a,{item:!0,justifyContent:"center",children:Object(h.jsx)(w.a,{children:Object(h.jsxs)(S.a,{children:[Object(h.jsx)(E.a,Object(s.a)({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email&&Object(h.jsx)("div",{style:{color:"red"},children:a.errors.email}),Object(h.jsx)(E.a,Object(s.a)({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.password&&Object(h.jsx)("div",{style:{color:"red"},children:a.errors.password}),Object(h.jsx)(y.a,{label:"Remember me",control:Object(h.jsx)(x.a,Object(s.a)({checked:a.values.rememberMe},a.getFieldProps("rememberMe")))}),Object(h.jsx)("div",{children:Object(h.jsx)(N.b,{to:"/recovery",children:"Forgot Password"})}),Object(h.jsx)(T.a,{type:"submit",variant:"contained",color:"primary",children:"Login"}),Object(h.jsx)("h6",{children:"Already have an account?"}),Object(h.jsx)("div",{children:Object(h.jsx)(N.b,{to:"/registration",children:"Sign Up"})})]})})})})})},M=function(){return Object(h.jsx)("div",{children:Object(h.jsx)("h1",{children:"Error 404"})})},Z=n(12),B=a.a.memo((function(e){console.log("EditableSpan called");var t=Object(r.useState)(!1),n=Object(Z.a)(t,2),a=n[0],c=n[1],i=Object(r.useState)(e.value),o=Object(Z.a)(i,2),s=o[0],l=o[1];return a?Object(h.jsx)(E.a,{value:s,onChange:function(e){l(e.currentTarget.value)},autoFocus:!0,onBlur:function(){c(!1),e.onChange(s)}}):Object(h.jsx)("span",{onDoubleClick:function(){c(!0),l(e.value)},children:e.value})})),V=function(){var e=Object(d.c)((function(e){return e.auth.isLoggedIn})),t=Object(d.c)((function(e){var t;return null===(t=e.auth.user)||void 0===t?void 0:t.name})),n=Object(d.b)(),a=Object(r.useState)(""),c=Object(Z.a)(a,2),i=c[0],o=c[1];return Object(r.useEffect)((function(){t&&o(t)}),[t]),e?Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{style:{marginLeft:"auto",marginRight:"auto",marginTop:"auto",maxHeight:"100vh",width:"6em"},children:Object(h.jsx)("h1",{style:{color:"black"},children:"Profile"})}),Object(h.jsxs)("div",{children:[Object(h.jsx)(B,{value:i,onChange:o}),Object(h.jsx)("button",{onClick:function(){var e;n((e=i,function(t){t(O("loading")),R(e).then((function(n){t(function(e){return{type:"login/UPDATE-USER",name:e}}(e)),t(O("succeeded"))}))}))},children:"SAVE"})]}),Object(h.jsx)("button",{onClick:function(){n({type:"login/SET-IS-LOGGED-OUT"})},children:"Logout"})]}):Object(h.jsx)(G.a,{to:"/login"})},z=function(){return Object(h.jsx)("div",{children:Object(h.jsx)("h1",{children:"NewPassword"})})},J=function(){var e=Object(r.useState)(""),t=Object(Z.a)(e,2),n=t[0],a=t[1],c=Object(d.b)();return n&&c(U(n)),Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{style:{marginLeft:"auto",marginRight:"auto",marginTop:"auto",maxHeight:"100vh",width:"6em"},children:Object(h.jsx)("h1",{children:"Recovery page"})}),Object(h.jsx)("input",{value:n,onChange:function(){return a(n)}})]})},X=function(){var e=Object(d.c)((function(e){return e.auth.isLoggedIn})),t=Object(d.b)(),n=Object(C.a)({initialValues:{email:"",password:"",passwordConfirm:""},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 \u0444\u043e\u0440\u043c\u0430\u0442 email"):t.email="\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f email",e.password?e.password.length<3&&(t.password="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c \u0431\u043e\u043b\u044c\u0448\u0435 3 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"):t.password="\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u043f\u0430\u0440\u043e\u043b\u044c",e.passwordConfirm?e.password.length<3?t.passwordConfirm="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c \u0431\u043e\u043b\u044c\u0448\u0435 3 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432":e.password!==e.passwordConfirm&&(t.passwordConfirm="\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442"):t.passwordConfirm="\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c",t},onSubmit:function(e){var r;t((r=e,function(e){e(O("loading")),_(r).then((function(t){e({type:"login/SET-IS-REGISTRATED-IN",value:!0}),e(O("succeeded"))})).catch((function(t){k(t,e)}))})),n.resetForm()}});return e?Object(h.jsx)(G.a,{to:"/"}):Object(h.jsx)("form",{onSubmit:n.handleSubmit,children:Object(h.jsx)(v.a,{container:!0,justifyContent:"center",children:Object(h.jsx)(v.a,{item:!0,justifyContent:"center",children:Object(h.jsx)(w.a,{children:Object(h.jsxs)(S.a,{children:[Object(h.jsx)(E.a,Object(s.a)({label:"Email",margin:"normal"},n.getFieldProps("email"))),n.touched.email&&n.errors.email&&Object(h.jsx)("div",{style:{color:"red"},children:n.errors.email}),Object(h.jsx)(E.a,Object(s.a)({type:"password",label:"Password",margin:"normal"},n.getFieldProps("password"))),n.touched.password&&n.errors.password&&Object(h.jsx)("div",{style:{color:"red"},children:n.errors.password}),Object(h.jsx)(E.a,Object(s.a)({type:"password",label:"Confirm password",margin:"normal"},n.getFieldProps("passwordConfirm"))),n.touched.passwordConfirm&&n.errors.passwordConfirm&&Object(h.jsx)("div",{style:{color:"red"},children:n.errors.passwordConfirm}),Object(h.jsx)(T.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})})})})})},$=function(){return Object(h.jsx)("div",{children:Object(h.jsx)("h1",{children:"Test"})})},W=n(92),q=n.n(W),K=function(){var e=Object(d.c)((function(e){return e.auth.isLoggedIn}));return Object(h.jsxs)("div",{className:q.a.nav,children:[Object(h.jsx)(N.c,{to:{pathname:"/"},children:"Profile"}),e?Object(h.jsx)(N.c,{to:{pathname:"login"},children:"Logout"}):Object(h.jsx)(N.c,{to:{pathname:"login"},children:"Login"}),Object(h.jsx)(N.c,{to:{pathname:"recovery"},children:"Recovery"}),Object(h.jsx)(N.b,{to:"registration",children:"Registration"}),Object(h.jsx)(N.b,{to:"test",children:"Test"}),Object(h.jsx)(N.b,{to:{pathname:"404"},children:"Error404"})]})},Q=function(){var e=Object(d.b)();return Object(r.useEffect)((function(){e((function(e){e(O("loading")),A().then((function(t){t.data._id&&(e(F(t.data)),e(O("succeeded"))),console.log("me",t.data)}))}))}),[e]),Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(p,{}),Object(h.jsx)(K,{}),Object(h.jsxs)(G.d,{children:[Object(h.jsx)(G.b,{path:"/",element:Object(h.jsx)(V,{})}),Object(h.jsx)(G.b,{path:"login",element:Object(h.jsx)(H,{})}),Object(h.jsx)(G.b,{path:"newpass",element:Object(h.jsx)(z,{})}),Object(h.jsx)(G.b,{path:"recovery",element:Object(h.jsx)(J,{})}),Object(h.jsx)(G.b,{path:"registration",element:Object(h.jsx)(X,{})}),Object(h.jsx)(G.b,{path:"new-pass",element:Object(h.jsx)(z,{})}),Object(h.jsx)(G.b,{path:"test",element:Object(h.jsx)($,{})}),Object(h.jsx)(G.b,{path:"404",element:Object(h.jsx)(M,{})}),Object(h.jsx)(G.b,{path:"*",element:Object(h.jsx)(G.a,{to:"/404"})})]})]})},Y=n(61),ee=n(93),te=Object(Y.b)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(s.a)(Object(s.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(s.a)(Object(s.a)({},e),{},{error:t.error});case"login/SET-IS-INITIALIZED--IN":return Object(s.a)(Object(s.a)({},e),{},{isInitialized:t.value});default:return Object(s.a)({},e)}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(s.a)(Object(s.a)({},e),{},{user:t.payload,isLoggedIn:!0});case"login/SET-IS-REGISTRATED-IN":return Object(s.a)(Object(s.a)({},e),{},{isRegistered:t.value});case"login/SET-IS-LOGGED-OUT":return Object(s.a)(Object(s.a)({},e),{},{user:null,isLoggedIn:!1});case"login/UPDATE-USER":return Object(s.a)(Object(s.a)({},e),{},{name:t.name});case"login/SET-EMAIL":return Object(s.a)(Object(s.a)({},e),{},{email:t.email});default:return e}}}),ne=Object(Y.c)(te,Object(Y.a)(ee.a));window.store=ne,i.a.render(Object(h.jsx)(d.a,{store:ne,children:Object(h.jsx)(N.a,{children:Object(h.jsx)(Q,{})})}),document.getElementById("root")),o()},92:function(e,t,n){e.exports={nav:"navbar_nav__1Uaxp",navHeader:"navbar_navHeader__11THd",navTitle:"navbar_navTitle__35jWX",navBtn:"navbar_navBtn__1bG0o",navLinks:"navbar_navLinks__2LyUu",navCheck:"navbar_navCheck__2XmC7",logo:"navbar_logo__36ywt"}}},[[136,1,2]]]);
//# sourceMappingURL=main.c605cf9c.chunk.js.map