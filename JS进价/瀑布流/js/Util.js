/**
 * 获取头部 顶部滚动距离
 * scroll().top
 * @returns {{top: number, left: number}}
 */
function scroll() {
    if (window.pageYOffset !== null){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    } else if( document.compatMode === 'CSS1Compat'){
        //    W3C
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }

    return  {
        top:document.body.scrollTop,
        left:document.body.scrollLeft
    }


}
function $(id) {
    return typeof id === "string" ? document.getElementById(id):null;
}

/**
 * 获取屏幕的 宽高
 * @returns {{width: number, height: number}}
 */

function client() {

    if (window.innerWidth){
        // ie9+ 最新浏览器
        return {
            width :window.innerWidth,
            height:window.innerHeight
        }
    } else  if (document.compatMode === 'CSS1Compat'){
        return {
            width :document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }

    return {
        width :document.body.clientWidth,
        height:document.body.clientHeight
    }

}