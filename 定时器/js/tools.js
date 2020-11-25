// obj 要执行动画的对象
// attr 要执行动画的样式,比如left，width
//target 执行动画目标位置
//speed 移动速度（正数向右负数向左）
//callback 回调函数，这个函数在动画执行完之后执行
function move(obj, attr, target, speed, callback) {
    // 关闭上一次定时器
    clearInterval(obj.timer);
    // 获取元素目前的位置
    var current = parseInt(getStyle(obj, attr));
    //判断移动的正负值
    // 0到800值为正，800向0则为负
    if (current > target) {
        // 此时速度应为负值
        speed = -speed;
    }
    //开启一个定时器来执行动画效果
    //向执行动画对象中添加一个timer属性，来保存自己的定时器标识,这样不会干扰另一个
    obj.timer = setInterval(function () {
        //获取原来left值
        //parseInt()获取合法数字
        oldValue = parseInt(getStyle(obj, attr));
        //在旧值基础上增加
        var newValue = oldValue + speed;
        //判断是否到800
        //向左移动时，判断newValue是否小于target
        // 向右移动时，判断newValue是否大于target
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }
        //给box1新值
        //[]这个前不能加.      []里面可以写变量,传啥改变啥
        obj.style[attr] = newValue + "px";
        //移动到800就停止
        if (newValue == target) {
            clearInterval(obj.timer);
            //动画执行完毕调用回调函数
            //传回调函数就执行，不传就不执行，这样才不会报错  安迪烦的
            callback && callback();
        }
    }, 30);

}
// 定义一个函数，用来获取指定元素的当前样式
// 在ie里没有指定方向的值可能显示auto
// 参数：
//       obj 要获取的元素样式
//       name 要获取的样式名
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else {
        //    ie没有getComputedStyle()方法
        return obj.currentStyle[name];
    }
}
// 向元素中添加指定的class属性值
// Obj 要添加class属性的元素
// cn要添加的class值
function addClass(obj, cn) {
    // 检查obj中是否含有cn，有就不加类名没有就加
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }

}
// 判断元素中是否含有指定的class属性值
function hasClass(obj, cn) {
    //正则表达式判断
    var reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
}

//删除指定元素class属性
function removeClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "")
}
//切换类，有就删没有就加上
function toggleClass(obj, cn) {
    // 判断obj中是否有cn
    if (hasClass(obj, cn)) {
        //有就删
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}
