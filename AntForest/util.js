var util = {};


// 点击元素的中心位置
util.clickByKJBounds = function clickByKJBounds(kj) {
    if (kj == null) {
        return false;
    }
    var result = false;
    try {
        click(kj.bounds().centerX(), kj.bounds().centerY());
        result = true;
    } catch (e) {

    };
    return result;
}

// 自动模拟滑动（随机因子）
util.swipeAuto = function swipeAuto(x1factor, y1factor, x2factor, y2factor, factor) {
    swipe(device.width * x1factor + parseInt(random() * factor), device.height * y1factor + parseInt(random() * factor), device.width * x2factor + parseInt(random() * factor), device.height * y2factor + parseInt(random() * factor), 600);
}

// 看下面的数据
util.swipeDown = function swipeDown() {
    var factor = 53;
    swipe(device.width / 2 + parseInt(random() * factor), device.height / 4 * 3 + parseInt(random() * factor), device.width / 2 + parseInt(random() * factor), device.height / 5 + parseInt(random() * factor), 600);
}

// 看上面的数据
util.swipeUp = function swipeUp() {
    var factor = 57;
    swipe(device.width / 2 + parseInt(random() * factor), device.height / 4 + parseInt(random() * factor), device.width / 2 + parseInt(random() * factor), device.height / 5 * 4 + parseInt(random() * factor), 600);
}


/**
 * 设置按键监听 当脚本执行时候按音量减 退出脚本
 */
util.registEvent = function registEvent() {
    //启用按键监听
    events.observeKey();
    //监听音量下键按下
    events.onKeyDown("volume_down", function (event) {
        toastLog("音量下键被按下了");
        exit();
    });
}

/**
 * 获取指定应用数据
 */
util.getStorage= function getStorage(key) {
    var storage = storages.create("zxiaofan:ant");
    // console.log("storages:"+storage.get(key) );
    
    return storage.get(key) ;
}


module.exports = util;