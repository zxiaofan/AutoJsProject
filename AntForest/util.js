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



/**  swipe(x1, y1, x2, y2, duration)
x1 {number} 滑动的起始坐标的x值
y1 {number} 滑动的起始坐标的y值
x2 {number} 滑动的结束坐标的x值
y2 {number} 滑动的结束坐标的y值
duration {number} 滑动时长，单位毫秒
*/

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
util.getStorage = function getStorage(key) {
    var storage = storages.create("zxiaofan:ant");
    // console.log("storages:"+storage.get(key) );

    return storage.get(key);
}

util.clearStorage = function clearStorage() {
    var storage = storages.create("zxiaofan:ant");
    return storage.clear();
}

util.readFile = function readFile(filePath) {
    var content = "NULL";
    try {
        content = files.read(filePath);
    } catch (error) {
        log(error);
    }
    return content;
}

util.createUid = function createUid() {
    var random1 = random(10, 999);
    if (random1 < 99) {
        random1 = "0" + random1;
    }
    return "uid" + this.getYYYYMMddHHmmssS() + random1;
}


util.getUid = function getUid() {
    var storage = storages.create("zxiaofan:ant");
    var uid = storage.get("uid");
    if (uid) {
        return uid;
    }
    var cachePath = "/sdcard/antforest/cache.txt";
    uid = this.readFile(cachePath);
    if (uid != "" && uid != "NULL") {
        storage.put("uid", uid);
        return uid;
    }
    uid = this.createUid();
    storage.put("uid", uid);
    files.createWithDirs(cachePath);
    files.write(cachePath, uid);
    return uid;
}


util.getYYYYMMddHHmmssS = function getYYYYMMddHHmmssS() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    var strDate = date.getDate();
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hour = date.getHours(); //获取当前小时数(0-23)
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    var min = date.getMinutes(); //获取当前分钟数(0-59)
    if (min >= 0 && min <= 9) {
        min = "0" + min;
    }
    var second = date.getSeconds(); //获取当前秒数(0-59)
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }
    var mill = date.getMilliseconds(); //获取当前毫秒数(0-999)
    if (mill >= 0 && mill <= 9) {
        mill = "00" + mill;
    } else if (mill >= 10 && mill <= 99) {
        mill = "0" + mill;
    }
    return year + month + strDate + hour + min + second + mill + "";
}

module.exports = util;