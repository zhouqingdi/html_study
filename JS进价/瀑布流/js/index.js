window.onload = function () {

    waterFall('main','box');
    
    //动态加载同一批
    window.onscroll = function () {


        if (checkWillLoadImage()){

            //造数据
            var  dataArr = [
                {'src':'4.jpg'},
                {'src':'6.jpg'},
                {'src':'8.jpg'},
                {'src':'10.jpg'},
                {'src':'12.jpg'},
                {'src':'14.jpg'},
                {'src':'16.jpg'},
                {'src':'18.jpg'},
                {'src':'20.jpg'},
                {'src':'22.jpg'},
            ];
            //创建元素
            for (var i = 0 ;i<dataArr.length;i++){

                var newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);
                var newImg = document.createElement('img');
                newImg.src = 'img/'+dataArr[i].src;
                newPic.appendChild(newImg);


            }
            waterFall('main','box');
        }
    }
    var timer = null;
    window.onresize = function () {

        //节流
        clearInterval(timer);

      timer =  setInterval(function () {
            waterFall('main','box');

        },200)
    }
}



/**
 *
 * @param parent 父标签id
 * @param child
 */
function waterFall(parent,child) {
    //瀑布流布局

    //
    //1 父盒子居中
    //获取所有子盒子
    var allBox = $(parent).getElementsByClassName(child);
    var box = allBox[0];
    // console.log(box.offsetWidth);
    //计算列数
    var cols =parseInt( document.documentElement.clientWidth/box.offsetWidth);
    var mainWidth = cols * box.offsetWidth;
    $(parent).style.width = mainWidth+'px';
    $(parent).style.margin = '0 auto';

    //2.子盒子 布局

    var  heightArr = [] ,boxHeight ,minBoxHeight=0,minIndex;
    //便利所有的子盒子

    for (var i = 0;i<allBox.length;i++){

        boxHeight = allBox[i].offsetHeight;
        //第一列盒子的高度
        if (i<cols){
            heightArr.push(boxHeight);
            allBox[i].style = '';
        }else {
            //剩余行

            //1取出最矮的的盒子的高度
            minBoxHeight = Math.min.apply(this,heightArr);
            minIndex = getMinIndex(heightArr,minBoxHeight);
            //子盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = minIndex * allBox[i].offsetWidth +'px';
            allBox[i].style.top = minBoxHeight +'px';

            //更新数组中的高度

            heightArr[minIndex] +=boxHeight;



        }
    }



}

function getMinIndex(array,num) {

    for (var i = 0;i<array.length;i++){
        if (array[i] === num){
            return i;
        }
    }

}

function $(id) {
    return typeof id === "string" ? document.getElementById(id):null;
}
//是否加载图片
function checkWillLoadImage() {
    var  allBox = document.getElementsByClassName('box');
    var lastBoxt = allBox[allBox.length -1];

    //求出盒子的 自身的高度的一半 + 头部偏移的高度 offsetTop
    var lastDistance = lastBoxt.offsetHeight *0.5 + lastBoxt.offsetTop;

    //求出屏幕的高度
    var screenH = document.body.clientHeight || document.documentElement.clientHeight;

    //页面的滚的高度
    var scrollTop = scroll().top;

    return lastDistance <= screenH +scrollTop;


}