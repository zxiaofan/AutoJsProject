// 支付宝工具箱
var AliMB = {};
var util = require("./util.js");
// var main = require("./main_UI.js");
var height = device.height;
var width = device.width;

// 收取天猫喵币
AliMB.fun_TMMB = function fun_TMMB() {
    toastLog("Build By @zxiaofan，有问题请前往订阅号【zxiaofan】留言");
    toastLog("请为此APP打开以下权限：无障碍服务权限、后台弹出界面");
    auto.waitFor();
    toastLog("打开天猫");
    setScreenMetrics(width, height);
    launch("com.tmall.wireless");
    sleep(4000);
    // waitForPackage("com.tmall.wireless");
    while (!atTMHome() && !在天猫喵币任务页面()) {
        toastLog("还没进入天猫主页呢...");
        sleep(2000);
        back();
    }
    toastLog("进入天猫首页，准备领喵币");
    count = 0;
    scrollUp();
    goto_tmmb();

    //注册音量下按下退出脚本监听
    util.registEvent();
    while (!在天猫喵币任务页面()) {
        toastLog("还没进入天猫喵币任务页面呢...");
        sleep(2000);
    }
    sleep(1000);
    toast("进入天猫喵币任务页面");
    scrollUp();
    scrollUp();

    getTM20000mb();

    sleep(1000);

    getTMMbByLiuLanDP();

    // toastLog("[屏幕分辨率]width:" + width + ";height:" + height);


    toastLog("Build By @zxiaofan，有问题请前往订阅号【zxiaofan】留言");

    scrollUp();
    sleep(1000);
    // back();
    var info1 = "天猫领喵币完成";
    toastLog(info1);
    // exit();
}


// 收取支付宝喵币
AliMB.fun_ZFBMB = function fun_ZFBMB() {
    toastLog("Build By @zxiaofan，有问题请前往订阅号【zxiaofan】留言");
    toastLog("请为此APP打开以下权限：无障碍服务权限、后台弹出界面");
    auto.waitFor();
    toastLog("打开支付宝");
    setScreenMetrics(width, height);
    launch("com.eg.android.AlipayGphone");
    sleep(4000);
    // waitForPackage("com.eg.android.AlipayGphone");
    toastLog("进入支付宝首页，准备领喵币");
    scrollUp();
    scrollUp();


    //注册音量下按下退出脚本监听
    util.registEvent();

    while (!在支付宝底部界面() && !在支付宝喵币任务页面()) {
        toastLog("还没进入支付宝首页呢...");
        sleep(2000);
        back();
    }
    goto_zfbmb();
    while (!在支付宝喵币任务页面()) {
        toastLog("还没进入支付宝喵币任务页面呢...");
        sleep(2000);
    }
    sleep(1000);
    toast("进入支付宝喵币任务页面");
    scrollUp();
    scrollUp();
    getTM20000mb();

    sleep(1000);

    getZFBMbByLiuLanDP();

    toastLog("Build By @zxiaofan，有问题请前往订阅号【zxiaofan】留言");

    scrollUp();
    sleep(1000);
    var info1 = "支付宝领喵币完成";
    toastLog(info1);
}



// 收取淘宝喵币
AliMB.fun_TBMB = function fun_TBMB() {
    toastLog("Build By @zxiaofan，有问题请前往订阅号【zxiaofan】留言");
    toastLog("请为此APP打开以下权限：无障碍服务权限、后台弹出界面");
    auto.waitFor();
    toastLog("打开淘宝");
    setScreenMetrics(width, height);
    launch("com.taobao.taobao");
    sleep(4000);
    // waitForPackage("com.eg.android.AlipayGphone");
    toastLog("进入淘宝首页，准备领喵币");
    scrollUp();
    scrollUp();


    //注册音量下按下退出脚本监听
    util.registEvent();

    while (!在淘宝底部界面() && !在淘宝喵币任务页面()) {
        toastLog("还没进入淘宝首页呢...");
        sleep(2000);
        back();
    }
    goto_tbmb();
    while (!在淘宝喵币任务页面()) {
        toastLog("还没进入淘宝喵币任务页面呢...");
        sleep(2000);
    }
    sleep(1000);
    toast("进入淘宝喵币任务页面");
    scrollUp();
    scrollUp();

    sleep(1000);

    getTBMbByLiuLanDP();

    toastLog("Build By @zxiaofan，有问题请前往订阅号【zxiaofan】留言");

    scrollUp();
    sleep(1000);
    var info1 = "淘宝领喵币完成";
    toastLog(info1);
}


// 进入天猫喵币主页
function goto_tmmb() {
    scrollUp();
    scrollUp();
    toastLog("【Start】准备天猫“天猫双十一，超级星秀猫”");
    sleep(1000);
    var x_cjxxm = 300;
    var y_cjxxm = 1200;
    toastLog("[坐标]超级星秀猫：" + x_cjxxm + "," + y_cjxxm);
    click(x_cjxxm, y_cjxxm);
    sleep(1000);
}

// 进入支付宝喵币主页
function goto_zfbmb() {
    scrollUp();
    scrollUp();
    toastLog("【Start】准备支付宝“天猫双十一，超级星秀猫”");
    sleep(1000);
    var x_cjxxm = 500;
    var y_cjxxm = 600;
    toastLog("[坐标]超级星秀猫：" + x_cjxxm + "," + y_cjxxm);
    click(x_cjxxm, y_cjxxm);
    sleep(1000);
}

// 进入淘宝喵币主页
function goto_tbmb() {
    scrollUp();
    scrollUp();
    toastLog("【Start】准备淘宝“天猫双十一，超级星秀猫”");
    sleep(1000);
    var x_cjxxm = 800;
    var y_cjxxm = 800;
    toastLog("[坐标]超级星秀猫：" + x_cjxxm + "," + y_cjxxm);
    click(x_cjxxm, y_cjxxm);
    sleep(1000);
}

// 20000喵币点击领取
function getTM20000mb() {
    toastLog("【Start】准备点击领取20000喵币");
    click("20000喵币点击领取");
    sleep(500);
    toastLog("【End】领取20000喵币");
    sleep(500);

}


// 支付宝签到领喵币
function getZFBMbBySign() {
    toastLog("【Start】支付宝签到领喵币");
    click("签到");
    sleep(500);
    toastLog("【End】支付宝签到领喵币");
    sleep(500);

}

// 天猫浏览店铺领喵币
function getTMMbByLiuLanDP() {
    toastLog("【Start】浏览店铺领喵币");

    var 位置_下滑店铺得更多喵币 = textContains("下滑店铺得更多喵币").findOnce();
    if (位置_下滑店铺得更多喵币 == null) {
        toastLog("自动进入【领喵币中心】失败，请手动进入");
    } else {
        toastLog(位置_下滑店铺得更多喵币.bounds());
        toastLog("[计算坐标]下滑店铺得更多喵币");
        sleep(200);
        x_llb = width - 100;
        y_llb = 位置_下滑店铺得更多喵币.bounds().centerY() - 100;
        toastLog("[坐标]领喵币：" + x_llb + "," + y_llb);
        click(x_llb, y_llb);
        sleep(500);
    }
    // 进入【领喵币中心】
    while (!在天猫领喵币中心页面()) {
        toastLog("还没进入天猫【领喵币中心】呢...");
        sleep(2000);
    }

    getTMMbjx();
    getTMMbQD();
    getTMMbQuLiuLan("去浏览", "天猫");
    getTMMbQuLiuLan("逛一逛", "天猫");
    getTMMbQuLiuLan("去完成", "天猫");
    getTMMbQuLiuLan("去施肥", "天猫");
    toastLog("【End】浏览店铺领喵币");

}

// 淘宝浏览店铺领喵币
function getTBMbByLiuLanDP() {
    toastLog("【Start】浏览店铺领喵币");

    var 位置_下滑店铺得更多喵币 = textContains("下滑店铺得更多喵币").findOnce();
    if (位置_下滑店铺得更多喵币 == null) {
        toastLog("自动进入【领喵币中心】失败，请手动进入");
    } else {
        toastLog(位置_下滑店铺得更多喵币.bounds());
        toastLog("[计算坐标]下滑店铺得更多喵币");
        sleep(200);
        x_llb = width - 100;
        y_llb = 位置_下滑店铺得更多喵币.bounds().centerY() - 100;
        toastLog("[坐标]领喵币：" + x_llb + "," + y_llb);
        click(x_llb, y_llb);
        sleep(500);
    }
    // 进入【领喵币中心】
    while (!在淘宝领喵币中心页面()) {
        toastLog("还没进入淘宝【领喵币中心】呢...");
        sleep(2000);
    }
    click("开心收下，喵");
    getTMMbQuLiuLan("去浏览", "淘宝");
    getTMMbQuLiuLan("去观看", "淘宝");
    getTMMbQuLiuLan("去搜索", "淘宝");
    getTMMbQuLiuLan("去完成", "淘宝");
    toastLog("【End】浏览店铺领喵币");

}

// 支付宝浏览店铺领喵币
function getZFBMbByLiuLanDP() {
    toastLog("【Start】支付宝浏览店铺领喵币");
    scrollUp();
    scrollUp();
    toastLog("[计算坐标]支付宝领喵币");
    sleep(200);
    x_llb = width - 100;
    y_llb = height - 100;
    click(x_llb, y_llb);
    sleep(500);
    var count = 5;
    // 进入【领喵币中心】
    while (!在支付宝领喵币中心页面() && count > 0) {
        toastLog("还没进入支付宝【领喵币中心】呢...");
        sleep(2000);
        x_llb = width - 100;
        y_llb = y_llb - 100;
        click(x_llb, y_llb);
        count--;
    }
    sleep(1000);
    getTMMbQD();
    click("好的，我知道了")
    getTMMbQuLiuLan("逛一逛", "支付宝");
    // getTMMbQuLiuLan("再逛逛", "支付宝");
    toastLog("【End】支付宝浏览店铺领喵币");

}

// 准备领惊喜喵币礼包
function getTMMbjx() {
    toastLog("【Start】准备领惊喜喵币礼包");
    click("领取");
    sleep(500);
    toastLog("【End】领惊喜喵币礼包");
    sleep(500);

}

// 每日签到领喵币
function getTMMbQD() {
    toastLog("【Start】准备每日签到领喵币");
    click("签到");
    sleep(500);
    toastLog("【End】每日签到领喵币");
    sleep(500);
}

// 去浏览领喵币
// sign：去浏览；去完成
function getTMMbQuLiuLan(sign, source) {
    toastLog("【GoGoGo】" + source);
    toastLog("【Start】准备去【" + sign + "]浏览店铺领喵币");
    var count = 0;
    var countMax = 30;
    if ("逛一逛" == sign) {

        var hasC = checkHasCompleteByNum(sign);
        if (isCom) {
            return;
        }
        if ("天猫" == source) {
            countMax = 2;
        }
    } else if ("去施肥" == sign) {
        countMax = 1;
    }
    while (count < countMax) {
        click("好的，我知道了");
        click("开心收下，喵");
        sleep(1000);
        var 去浏览 = textContains(sign).findOnce();
        if ("去完成" == sign) {
            // UiSelector.boundsInside(left, top, right, buttom)
            去浏览 = textContains(sign).boundsInside(0, device.height / 2, device.width, device.height).findOnce();
        }
        // log("[去浏览]：" + 去浏览);
        if (去浏览 == null) {
            if ("支付宝" == source && !在支付宝领喵币中心页面()) {
                toastLog("支付宝-继续向上返回");
                back();
                sleep(2000);
                click("好的，我知道了");
                去浏览 = textContains(sign).findOnce();
            }
            if ("淘宝" == source && !在淘宝领喵币中心页面()) {
                toastLog("淘宝-继续向上返回");
                back();
                sleep(2000);
                click("好的，我知道了");
                去浏览 = textContains(sign).findOnce();
            }
            if ("天猫" == source && !在天猫领喵币中心页面()) {
                toastLog("天猫-继续向上返回");
                back();
                sleep(2000);
                click("好的，我知道了");
                去浏览 = textContains(sign).findOnce();
            }
            if (去浏览 == null) {
                toastLog("浏览店铺领喵币/能量已完成");
                break;
            }
        }
        count++;
        toastLog("[" + sign + "：]" + count);
        click(sign);
        sleep(1000);
        util.swipeDown();
        sleep(100);
        if ("去施肥" == sign) {
            getTMMBByNongChang();
            return;
        }

        tjmb();
        shopSign();


        var isCom = checkHasComplete();
        if (isCom) {
            break;
        }

        sleep(2000);

        var isTbTj = isTbTeJia();
        if (isTbTj) {
            back();
            continue;
        }

        util.swipeUp();
        sleep(1000);

        var isCom = checkHasComplete();
        if (isCom) {
            break;
        }


        util.swipeUp();
        toastLog("[等待滑动15秒领取喵币/能量1 ing...]");
        sleep(3000);

        var isCom = checkHasComplete();
        if (isCom) {
            break;
        }
        sleep(5000);
        if (!在直播界面()) {
            util.swipeDown();
            toastLog("[等待滑动15秒领取喵币/能量2 ing...]");
            util.swipeDown();
        }
        // desc 任务完成
        sleep(9000);
        if (text("全部").exists() && desc("搜索").exists()) {
            toastLog("上滑再次进入领喵币/能量主页");
            scrollUp();
            sleep(200);
            scrollUp();
            sleep(200);
            scrollUp();
            scrollUp();
            sleep(200);
            scrollUp();
        } else {
            toastLog("返回领喵币/能量主页");
            back();
            sleep(1000);
            if ("天猫" == source && !在天猫领喵币中心页面()) {
                toastLog("目前没有在天猫领喵币/能量中心了呢，逛店铺领喵币/能量结束");
                sleep(1000);
            }
            if ("支付宝" == source && !在支付宝领喵币中心页面()) {
                toastLog("目前没有在支付宝领喵币/能量中心了呢，逛店铺领喵币/能量结束");
                sleep(1000);
            }
            if ("淘宝" == source && !在淘宝领喵币中心页面()) {
                toastLog("目前没有在淘宝领喵币/能量中心了呢，逛店铺领喵币/能量结束");
                sleep(1000);
            }
        }

    }
    toastLog("已浏览店铺：" + count);
    sleep(1000);
    toastLog("【End】去浏览店铺领喵币");

}


function getTMMBByNongChang() {
    toastLog("准备去施肥");
    var count = 0;
    // 可能某些用户没启用芭比农场
    while (!atTMNongChang() && count < 5) {
        toastLog("还没进入芭比农场页面呢...");
        sleep(2000);
        count++;
    }
    if (count >= 5) {
        return;
    }
    toastLog("进入芭比农场页面了...");
    var 集肥料 = text("gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==").indexInParent(6).findOnce();
    if (null == 集肥料) {
        toastLog("【计算坐标】无法定位到集肥料...");
    }
    var x_shifei = width / 2;
    var y_shifei = 集肥料.bounds().centerY();
    sleep(500);
    toastLog("【坐标】集肥料>施肥：" + x_shifei + "," + y_shifei);
    click(x_shifei, y_shifei);
    sleep(1000);
    toastLog("完成施肥领喵币");
    back();
}

// 通过数字判断是否已经完成：逛一逛
function checkHasCompleteByNum(sign) {
    var guangyiguangText = textContains(sign).className("android.view.View").findOnce();
    if (null != guangyiguangText) {
        guangyiguangTextDesc = guangyiguangText.getText() + "";
        toastLog("【逛一逛】" + guangyiguangTextDesc);
        if (null != guangyiguangTextDesc) {
            var aa = guangyiguangTextDesc.substr(guangyiguangTextDesc.indexOf("\("), guangyiguangTextDesc.indexOf("\)"));
            if (null != aa) {
                var a1 = aa.substr(0, aa.indexOf("\/"));
                var a2 = aa.substr(aa.indexOf("\/") + 1, aa.length);
                toastLog("【逛一逛】情况" + a1 + "," + a2);
                if (a1 = a2) {
                    toastLog("【逛一逛】已领取完毕");
                    return true;
                }
            }
        }
    }
    return false;
}


function checkHasComplete() {
    if (desc("今日已经").exists() && desc("全部完成啦").exists()) {
        toastLog("此任务今日已经全部完成啦");
        return true;
    }
    return false;
}

function shopSign() {
    sleep(500);
    if (desc("签到领喵币").exists()) {
        toastLog("店铺签到领喵币ing...");
        sleep(1000);
        desc("签到领喵币").findOnce().parent().click();
        sleep(1000);
        desc("开心收下").findOnce().click();
        toastLog("完成店铺签到领喵币");
    }
}

function tjmb() {
    // 领取天降喵币
    if (text("直接收下").exists()) {
        toastLog("领取天降喵币");
        click("直接收下");
        sleep(1000);
    }
}

function 在天猫喵币任务页面() {
    if (textContains("天猫双十一，超级星秀猫").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在支付宝喵币任务页面() {
    if (textContains("天猫双十一，超级星秀猫").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在天猫领喵币中心页面() {
    if (textContains("累计任务奖励").exists()) {
        return true;
    } else {
        return false;
    }
}
function 在支付宝领喵币中心页面() {
    if (textContains("连续签到得").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在淘宝领喵币中心页面() {
    if (textContains("累计任务奖励").exists()) {
        return true;
    } else {
        return false;
    }
}

// 确保在天猫首页
function atTMHome() {
    if (text("购物车").exists()) {
        return true;
    } else {
        return false;
    }
}

// 确保在天猫农场界面
function atTMNongChang() {
    // 集肥料
    if (text("gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在支付宝底部界面() {
    if (text("我的").exists() && text("首页").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在淘宝底部界面() {
    if (desc("搜索").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在淘宝喵币任务页面() {
    if (textContains("天猫双十一，超级星秀猫").exists()) {
        return true;
    } else {
        return false;
    }
}


function 在直播界面() {
    if (idContains("taolive_").exists()) {
        return true;
    } else {
        return false;
    }
}

function isTbTeJia() {
    if (textContains("淘宝特价版送红包").exists()) {
        return true;
    } else {
        return false;
    }
}
module.exports = AliMB;