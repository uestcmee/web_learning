(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"279":function(e,t,o){},"291":function(e,t,o){"use strict";var n,r,l=o(2),a=o(3),i=o(52),u=o(245),c=(o(279),o(79)),s=o(49),p=o(244),m=o(391),d=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();var f=(n=function(e){function AddColumn(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AddColumn);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AddColumn.__proto__||Object.getPrototypeOf(AddColumn)).call(this,e));r.call(t);var o=t.props.column.active;return t.state={"form":{"module-new-0":t.props.AddSub&&void 0!==o.list.module?o.list.module:1}},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AddColumn,a["a"].Component),d(AddColumn,[{"key":"render","value":function render(){var e,t,o,n,r=this,a=this.props.column,c=a.list,s=a.mod_list,p=this.props.global.$word,d=this.state.form;return this.addFormList=[{"type":"Input","label":p.sort,"field":"no_order-new-0","value":d["no_order-new-0"]||0,"after":p.noorderinfo,"required":1},{"type":"Input","label":p.columnname,"field":"name-new-0","required":1,"value":d["name-new-0"]},{"type":"Select","label":p.columnnav,"options":c.nav_list,"value":d["nav-new-0"],"field":"nav-new-0","rangeKey":"label"},{"type":"Select","label":p.columnmodule,"options":(e=r.props.column.active,t=r.props.AddSub,o=r.props.AddSub?parseInt(e.list.classtype)+1:1,n=[],$.each(s,function(r,l){if(l.mod=parseInt(l.mod),l.num=void 0!==l.num?parseInt(l.num):"",3==o&&l.mod!=e.list.module&&l.mod)return!0;if(t){if(6==l.mod&&l.num&&6!=e.list.module||6==e.list.module&&l.mod!=e.list.module)return!0}else if(6==l.mod)return!0;n.push(l)}),n),"value":d["module-new-0"],"valueName":"mod","rangeKey":"name","field":"module-new-0","eventChange":function eventChange(e,t){r.setState({"form":r.state.form})}},{"type":function(){var e=parseInt(d["module-new-0"]),t=r.props.column.active,o="Input";return 6!=e&&7!=e&&10!=e&&11!=e&&12!=e&&13!=e||(o="Text"),r.props.AddSub&&e==t.list.module&&(o="Text"),o}(),"label":p[d["module-new-0"]?"columndocument":"columnhref"],"field":(d["module-new-0"]?"foldername":"out_url")+"-new-0","value":function(){var e=parseInt(d["module-new-0"]),t=r.props.column.active,o=void 0;switch(e){case 6:o="job";break;case 7:o="message";break;case 10:o="member";break;case 11:o="search";break;case 12:o="sitemap";break;case 13:o="tags"}return r.props.AddSub&&e==t.list.module&&(o=t.list.foldername),o}(),"required":function(){var e=parseInt(d["module-new-0"]),t=r.props.column.active,o=1;return 6!=e&&7!=e&&10!=e&&11!=e&&12!=e&&13!=e||(o=0),r.props.AddSub&&e==t.list.module&&(o=0),o}()}],l.j.createElement(i.a,{"className":"add-column"},l.j.createElement(m.a,null),l.j.createElement(u.a,{"data":this.addFormList,"form":this.state.form}),l.j.createElement(i.a,{"className":"cu-bar bg-white"},l.j.createElement(i.a,{"className":"action margin-0 flex-sub ","onClick":this.props.close},p.cancel),l.j.createElement(i.a,{"className":"action margin-0 flex-sub  text-blue solid-left","onClick":this.save},p.save)))}}]),AddColumn}(),r=function _initialiseProps(){var e=this;this.save=function(){var t=e.props.column.active,o=e.state.form;o.allid=0,o["bigclass-new-0"]=e.props.AddSub?t.list.id:0,o["classtype-new-0"]=e.props.AddSub?parseInt(t.list.classtype)+1:1,Object(p.e)(e.addFormList,e.state.form,function(t,o){o||s.a(t).then(function(t){t.status&&(e.props.saveCallback(),e.props.close(),e.setState({"form":{}}))})})}},n);t.a=Object(c.b)(function(e){return{"column":e.column,"global":e.global}})(f)},"398":function(e,t,o){"use strict";o.r(t);var n=o(2),r=o(252),l=o(3),a=o(242),i=o(52),u=o(386),c=o(260),s=o(393),p=(o(279),o(79)),m=o(265),d=o(305),f=o(291),b=o(253),h=o(258),v=o(273),y=o(246),w=o(244),C=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}(),j=function get(e,t,o){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var r=Object.getPrototypeOf(e);return null===r?void 0:get(r,t,o)}if("value"in n)return n.value;var l=n.get;return void 0!==l?l.call(o):void 0};var g=function(e){function Column(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Column);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Column.__proto__||Object.getPrototypeOf(Column)).call(this,e));return t.config={"navigationBarTitleText":"栏目"},t.fetch=function(){t.props.dispatch({"type":"column/GetColumnList"})},t.openModal=function(e,o){var r=t.props.global.$word,l=void 0,a=void 0,i=void 0;switch(e){case"AddColumn":l=r.add,i=n.j.createElement(f.a,{"close":t.props.modal.handleCancel,"saveCallback":t.fetch}),a=" "}var u={"params":void 0,"title":l,"width":"98%","visible":!0,"footer":a,"content":i};t.props.modal.openModal(u)},t.EditColumn=function(e){l.a.navigateTo({"url":"/pages/column/setting?id="+e.id})},t.state={"form":{}},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Column,l["a"].Component),C(Column,[{"key":"componentDidShow","value":function componentDidShow(){var e=this.props.global,t=e.$info,o=e.$word;t.auth.column?this.fetch():Object(a.c)({"title":o.js81,"icon":"error","mask":!0,"duration":4e3})}},{"key":"render","value":function render(){var e=this,t=this.props.column.list,o=this.props.global,r=o.$info,l=o.$word,a=n.j.createElement(i.a,{"onClick":function onClick(){Object(w.a)("index")}},n.j.createElement(u.a,{"className":"cuIcon-back text-gray"}),l.js55+l.homepage);return r.auth.column?n.j.createElement(i.a,{"className":"met-column p-t-50 pb-2rem"},n.j.createElement(y.a,{"title":l.columumanage,"left":a}),n.j.createElement(c.a,null,n.j.createElement(m.a,{"btn":n.j.createElement(v.a,null)}),n.j.createElement(d.a,{"data":t.column_list,"itemClick":this.EditColumn}),n.j.createElement(s.a,{"className":"cu-btn bg-blue shadow raound btn-add cuIcon lg","onClick":function onClick(){e.props.dispatch({"type":"column/GetModlist","callback":function callback(t){e.openModal("AddColumn")}})}},n.j.createElement(u.a,{"className":"cuIcon-add"})),n.j.createElement(h.a,null))):null}},{"key":"componentDidMount","value":function componentDidMount(){j(Column.prototype.__proto__||Object.getPrototypeOf(Column.prototype),"componentDidMount",this)&&j(Column.prototype.__proto__||Object.getPrototypeOf(Column.prototype),"componentDidMount",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){j(Column.prototype.__proto__||Object.getPrototypeOf(Column.prototype),"componentDidHide",this)&&j(Column.prototype.__proto__||Object.getPrototypeOf(Column.prototype),"componentDidHide",this).call(this)}}]),Column}();g=Object(r.a)([Object(b.a)()],g),t.default=Object(p.b)(function(e){return{"column":e.column,"global":e.global}})(g)}}]);