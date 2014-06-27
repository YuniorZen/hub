js-tool
=======

JavaScript function Tools file
/*
 *	create by dluf	2014-6-12 17:37
 * 
 * 	好记性不如破键盘
 * 
 */

//获取主域
function getdomain(){
	var host=document.location.hostname;
	return host.match(/\.?(\w+\.(com|cn|net|me|com\.cn|info|cc|org))/)[1];		
}

//cookie 相关操作
var cookieUtil = {
	get : function(name) {
		var cookiename = encodeURIComponent(name) + "=", cookiestart = document.cookie.indexOf(cookiename), cookievalue = null;
		if (cookiestart > -1) {
			var cookieend = document.cookie.indexOf(";", cookiestart);
			if (cookieend == -1)
				cookieend = document.cookie.length;
			cookievalue = decodeURIComponent(document.cookie.substring(cookiestart + cookiename.length, cookieend));
		}
		return cookievalue;
	},
	set : function(name, value, expires, path, domain, secure) {
		var cookietext = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		if ( expires instanceof Date)
			cookietext += ";expires=" + expires.toGMTString();
		if (path)
			cookietext += ";path=" + path;
		if (domain)
			cookietext += ";domain=" + domain;
		if (secure)
			cookietext += ";secure";
		document.cookie = cookietext;
	},
	unset : function(name,path,domain,secure) {
			this.set(name, "", new Date(0),path,domain,secure);
	},
    clear:function(){		
		var cookie=document.cookie,
			cookies=cookie.split(";"),
			domain=window.domain;
						
		for(var i=0;i<cookies.length;i++){
			var index=cookies[i].indexOf("=");
			var name=decodeURIComponent(cookies[i].substring(0,index));
			name=name.replace(/\s* /g,"");
			this.unset(name,"/");				
			this.unset(name,"/",domain);			
		}			
	} 
}


//获取某一个元素到最外层顶部的距离
function offsetTop(element) {
	var top = 0;	
	while (element) {
		top += element.offsetTop;
		element =element.offsetParent;
	}
	return top;
}

//跨浏览器获取视口大小
function getWinSize() {
	if (typeof window.innerWidth != 'undefined') {
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	} else {
		return {
			width : document.documentElement.clientWidth||document.body.clientWidth,
			height : document.documentElement.clientHeight||document.body.clientHeight
		}
	}
}


//获取样式
function getStyle(obj,attr){
	if(obj.currentStyle){
		if(attr=="opacity"){//ie中的filter属性结合完美运动框架返回透明度为小数。
			/opacity=(\d+|NaN)\)$/.exec(obj.currentStyle["filter"])
			var value=parseInt(RegExp.$1)/100;				
			if(RegExp.$1=="NaN") {
				return 1;
			}else {
				return value;
			}				
		}
		return obj.currentStyle[attr];		
	}	
	else {
		return getComputedStyle(obj,null)[attr];
	}
}

//完美运动框架
function startMove(obj,json,fn){
	
	clearInterval(obj.timer);
	var clearself=arguments[3];
	
	obj.timer=setInterval(function(){
		var iSuc=true;
		for(attr in json){
			var nowvalue=0;
			if(attr=="opacity")
				nowvalue=parseInt(parseFloat(getStyle(obj,attr))*100);
			else
				nowvalue=parseInt(getStyle(obj,attr));		
			iSpeed=(json[attr]-nowvalue)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);		
			if(nowvalue!=json[attr])
				iSuc=false;
			if(attr=="opacity"){
				obj.style.opacity=(nowvalue+iSpeed)/100;
				obj.style.filter="alpha(opacity="+(nowvalue+iSpeed)+")";
			}else
				obj.style[attr]=nowvalue+iSpeed+"px";
		}
		
		if(iSuc){
			clearInterval(obj.timer);			
			clearself ? obj.parentNode.removeChild(obj):"";	
			fn?fn():"";
		}
	},30);
	
}



//检测ie6
function checkIE6(){
	return /Microsoft Internet Explorer/i.test(navigator.appName)&&/MSIE 6\.0/i.test(navigator.appVersion);
}

//函数节流优化默认事件的调用频率
function throttle(method) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){    	
       	   method();
    }, 100);
}


//通过类名获取元素
function getByClassName(obj, name) {
	var result = [];
	var all = obj.getElementsByTagName("*");
	for (var i = 0; i < all.length; i++) {
		if (all[i].className.match(name))
			result.push(all[i]);
	}
	return result;
}

//添加事件
function addEvent(obj, oEv, fn) {
	try {
		obj.attachEvent("on" + oEv, function() {//ie 取消默认事件和阻止冒泡
			fn.call(obj);
			event.returnValue = false;
			event.cancelBubble=true;
		});
	} catch(e) {
		obj.addEventListener(oEv, function(ev) {//w3c 取消默认事件和阻止冒泡
			fn.call(obj);
			ev.preventDefault();
			ev.stopPropagation();
		}, false);
	}
}

//获取当前正在执行的js对象 ，此方法无法获取safari浏览的
function getCurrentScript() {
	//for firefox chrome opera
	if (document.currentScript) {
		return document.currentScript
	}

	// for ie
	var scripts = document.getElementsByTagName("script");
	for (var i = scripts.length - 1; i >= 0; i--) {
		var script = scripts[i];
		if (script.readyState === "interactive") {
			interactiveScript = script;
			return interactiveScript
		}
	}

	return "";
}

//动态加载js文件
function loadScript(src) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src;
	document.body.insertBefore(script, document.body.firstChild);//避用appendChild 防止ie6下出现dom紊乱不能访问页面。
}

