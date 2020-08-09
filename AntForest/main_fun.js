var versionUrl = "http://zxiaofan.com/tc/b/201911/tbmbversion.txt";
var height = device.height;
var width = device.width;
var count = 0;
var countmax = 100;

var util = require("./util.js");
var AliPay = require("./AliPay.js");

var main_fun = {};

// 联系我
main_fun.findMe = function findMe(dyh) {
    var thread = threads.start(function () {
        findMeFun(dyh, false);
    });
    return thread;
};

// 检查更新
// checkUpdate 没有括号
main_fun.checkUpdate = function checkUpdate(version) {
    // var thread = threads.start(function () {
    //     checkUpdateFun(version);
    // });
    // toastLog(thread);
    // return thread;
    var checkRes = checkUpdateFun(version);
    return checkRes;
};

// 收取蚂蚁森林能量
main_fun.ant_main = function ant_main(waterThreshold, waterPlanNum) {
    var dis_result1 = threads.disposable();
    var thread = threads.start(function () {
        AliPay.fun_ant_main(waterThreshold, waterPlanNum);
    });
    dis_result1.setAndNotify(1);
    return dis_result1;
};

// 收取淘宝喵币
main_fun.getMiaoBi_main = function getMiaoBi_main() {
    var dis_result2 = threads.disposable();
    var thread = threads.start(function () {
        fun_getMiaoBi_main();
    });
    dis_result2.setAndNotify(2);
    return dis_result2;
};

// 收取淘宝能量
main_fun.getTaoBaoNengLiang_main = function getTaoBaoNengLiang_main() {
    var dis_result3 = threads.disposable();
    var thread = threads.start(function () {
        fun_getTaoBaoNengLiang_main();
    });
    dis_result3.setAndNotify(3);
    return dis_result3;
};


// 领取支付宝积分
main_fun.领积分 = function 领积分_main() {
    var dis_result4 = threads.disposable();
    var thread = threads.start(function () {
        AliPay.领积分();
    });
    dis_result4.setAndNotify(4);
    return dis_result4;
};

main_fun.main_method = function main_method(method, boolThread, waterThreshold, waterPlanNum, waterMinUnit) {
    if ("蚂蚁森林" == method) {
        if (boolThread) {
            var dis_result1 = threads.disposable();
            var thread = threads.start(function () {
                AliPay.fun_ant_main(waterThreshold, waterPlanNum, waterMinUnit);
            });
            dis_result1.setAndNotify(1);
            return dis_result1;
        } else {
            AliPay.fun_ant_main(waterThreshold, waterPlanNum, waterMinUnit);
        }
    } else if ("支付宝会员积分" == method) {
        if (boolThread) {
            var dis_result4 = threads.disposable();
            var thread = threads.start(function () {
                AliPay.领积分();
            });
            dis_result4.setAndNotify(4);
            return dis_result4;
        } else {
            AliPay.领积分();
        }
    } else if ("淘宝收能量" == method) {
        if (boolThread) {
            var dis_result3 = threads.disposable();
            var thread = threads.start(function () {
                fun_getTaoBaoNengLiang_main();
            });
            dis_result3.setAndNotify(3);
            return dis_result3;
        } else {
            fun_getTaoBaoNengLiang_main();
        }
    }
}

function checkUpdateFun(version) {
    var response = null;
    toastLog("检查更新中");
    // toastLog("获取新版本号：" + versionUrl);
    threads.start(function () {
        var reqUrl = versionUrl;
        if (reqUrl.indexOf("zxiaofan") > -1) {
            reqUrl += "?version=" + version + "?uid=" + util.getStorage("uid");
        }
        var r = http.get(reqUrl, {}, function (res, err) {
            if (err) {
                console.error(err);
                return;
            }
            response = res;
        });
    });
    let timeOutTimes = 20;
    for (let i = 0; i < timeOutTimes; i++) {
        if (response == null) {
            sleep(200);
            if (i > 2) {
                toastLog("查询最新版本ing：" + i);
            }
        } else {
            break;
        }
    }
    var versionEsc = null;
    // toastLog("response:" + response);P
    if (response.statusCode >= 200 && response.statusCode <= 304) {
        versionEsc = response.body.string();
    } else {
        toastLog("检查更新失败，请前往订阅号zxiaofan回复关键字【蚂蚁森林】获取最新版APP");
    }

    sleep(2000);
    var info = "";
    if (version.length >= 12 && versionEsc.length >= 12 && version.substring(0, 12) == versionEsc.substring(0, 12)) {
        toastLog("当前已是最新版");
    } else {
        toastLog("【当前版本】" + version + ";【服务器版本】" + versionEsc);
        info = "APP已更新，请前往订阅号zxiaofan回复关键字【蚂蚁森林】获取最新版APP：" + versionEsc;
        dialogs.confirm(info);
    }
    return info;
};


function findMeFun(dyh, autoGuanzhu) {
    sleep(500);
    toastLog("打开微信搜索 " + dyh);
    launch("com.tencent.mm");
    sleep(1000);
    waitForPackage("com.tencent.mm");
    // logKJInfo(搜索);
    toastLog("点击搜索...");
    var 微信头 = textStartsWith("微信(").findOnce();
    var inttemp = 0;
    while (inttemp < 4 && null == 微信头) {
        toastLog("当前不在微信首页");
        back();
        inttemp++;
        sleep(1000);
        微信头 = textStartsWith("微信(").findOnce();
    }
    // logKJInfo(微信头);

    for (var col = device.width / 2; col < device.width; col += 100) {
        var clickResult = click(col, 微信头.bounds().centerY());
        if (!textStartsWith("微信(").exists()) {
            sleep(500);
            toastLog("进入搜索...");
            break;
        }
        sleep(50);
    }


    sleep(1000);
    var 搜索框 = className("android.widget.EditText").findOnce();
    if (null != 搜索框) {
        搜索框.setText(dyh);
        click("搜一搜 " + dyh);
        sleep(600);
        var factor = 13;
        util.swipeAuto(0.5, 0.4, 0.5, 0.2, factor);
        scrollUp();
        sleep(600);
        util.swipeAuto(0.5, 0.4, 0.5, 0.2, factor);
        util.swipeAuto(0.5, 0.6, 0.5, 0.2, factor);
        var 搜索zxf = textStartsWith("搜一搜").textEndsWith(dyh).findOne(1000);
        // logKJInfo(搜索zxf);
        util.clickByKJBounds(搜索zxf);

        sleep(600);
        text(dyh).waitFor();
        sleep(1500);
        if (!textContains("公众号").findOnce()) {
            sleep(1000);
        }
        if (!textContains("公众号").findOnce()) {
            sleep(1000);
        }
        if (!textContains("公众号").findOnce()) {
            sleep(1000);
        }
        toastLog("点击公众号" + dyh);
        click("公众号", 0);
        sleep(1000);
        var kj_dyh = text(dyh).findOnce();
        if (null != kj_dyh) {
            toastLog("点击公众号.." + dyh);
            kj_dyh.parent().click();
        }
        sleep(1000);

        if (autoGuanzhu) {
            click("关注公众号");
        } else if (!textContains("不再关注").findOnce()) {
            toastLog("还没关注" + dyh + "？\n赶紧和你的朋友一起关注吧");
        }
    }
}


function fun_getTaoBaoNengLiang_main() {
    // 历史版本暂不开源，今年双11开源
}


function quliulan() {
    // 历史版本暂不开源，今年双11开源

}

function shopSign() {
    // 历史版本暂不开源，今年双11开源
}

function tjmb() {
    // 领取天降喵币
    // 历史版本暂不开源，今年双11开源
}
function getOwnMiaoBi() {
    sleep(1000);

}

module.exports = main_fun;