/**
 * 获取cookie
 * @param {String} key 
 */
export function getItem(key){
    return new RegExp('[; ]' + key + '=([^;]*);?').test('; ' + document.cookie) ? decodeURIComponent(RegExp.$1) : '';
}

/**
 * 设置cookie
 * @param {String} key 
 * @param {String} value 
 * @param {Number|String|Date} expiration 0:进程，-1:永久，数字:天数，字符串，日期
 * @param {String} path 文档路径
 * @param {String} domain 域名，可以设置主域名
 */
export function setItem(key, value, expiration, path, domain){
    let str = key + "=" + encodeURIComponent(value);
    if(expiration){
        let type = typeof expiration;
        if( type === 'number'){
            // 数字，为 天数
            expiration = new Date().getTime() + expiration * 24 * 60 * 60 * 1000;
        }
        else if( type === 'string'){
            expiration = new Date(expiration.replace(/\-/g, '/').replace(/T/, ' ').replace(/\.\d*$/, ''));
        }
        str += "; expires=" + expiration.toGMTString();
    }
    if(path){
        str += "; path=" + path;
    }
    if(domain){
        str += "; domain=" + domain;
    }

    document.cookie = str;
}

/**
 * 移除cookie
 * @param {*} key 
 * @param {*} path 文档路径
 * @param {*} domain 域名，可以设置主域名
 */
export function removeItem(key, path, domain){
    let str = key + "=; expires=" + (new Date(0)).toGMTString();
    if (path) {
        r += "; path=" + path;
    }
    if (domain) {
        str += "; domain=" + domain;
    }
    document.cookie = str;
}
// $.cookie
export const $cookie = (t, x, u) => {
    if (typeof x != "undefined") {
        u = u || {};
        if (x === null) {
            x = "";
            u.expires = -1
        }
        var r = "";
        if (u.expires && (typeof u.expires == "number" || u.expires.toUTCString)) {
            var p;
            if (typeof u.expires == "number") {
                p = new Date();
                p.setTime(p.getTime() + (u.expires * 24 * 60 * 60 * 1000))
            } else {
                p = u.expires
            }
            r = "; expires=" + p.toUTCString()
        }
        var v = u.path ? "; path=" + u.path : "";
        var q = u.domain ? "; domain=" + u.domain : "";
        var w = u.secure ? "; secure" : "";
        
        x = u.unEncoded ? x : encodeURIComponent( x );
        document.cookie = [ t, '=', x, r, v, q, w ].join( '' );
        // document.cookie = [t, "=", encodeURIComponent(x), r, v, q, w].join("")
    } else {
        var o = null;
        if (document.cookie && document.cookie != "") {
            var n = document.cookie.split("; ");
            for (var s = 0; s < n.length; s++) {
                var i = n[s];
                if (i.substring(0, t.length + 1) == (t + "=")) {
                    o = decodeURIComponent(i.substring(t.length + 1));
                    break
                }
            }
        }
        return o
    }
}
/**
 * 取cookie值
 * @param  {String} name 名称
 */
export const getCookie = (name) => {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return decodeURIComponent(arr[2]);
    }else{
        return null;
    }
}
/**
 * 获取某个cookie里的所有参数
 * @param  {String} value cookie值
 */
export const parseCookie = (value) => {
    let resultObject = {};
    if(value){
        let items = value.split('&')
        items.forEach(function (item) {
            let splitIndex = item.indexOf('=')
            let key = item.substring(0, splitIndex)
            let value = item.substring(splitIndex + 1, item.length)
            resultObject[key] = value
        })
    }
    return resultObject
}
//获取根域
export const getRootDomain = () =>{
    let match = location.host.match( /([a-zA-Z]+)\.com/ );
    if ( match ) {
        return match[ 0 ];
    } else {
        return location.hostname;
    }
}