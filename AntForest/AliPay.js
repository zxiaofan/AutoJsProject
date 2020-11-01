// 支付宝工具箱
var AliPay = {};
var util = require("./util.js");
// var main = require("./main_UI.js");
var height = device.height;
var width = device.width;
var count = 0;
var countmax = 100;

// 收取蚂蚁森林能量
AliPay.fun_ant_main = function fun_ant_main(waterThreshold, waterPlanNum, waterMinUnit) {
    toastLog("Build By @zxiaofan，有问题请前往订阅号【zxiaofan】留言");
    toastLog("请为此APP打开以下权限：无障碍服务权限、后台弹出界面");
    auto.waitFor();
    toastLog("打开支付宝");
    setScreenMetrics(width, height);
    launch("com.eg.android.AlipayGphone");
    sleep(4000);
    // waitForPackage("com.eg.android.AlipayGphone");
    toastLog("进入支付宝首页，准备收取蚂蚁森林能量");
    count = 0;
    goto_ant();

    //注册音量下按下退出脚本监听
    util.registEvent();
    while (!在蚂蚁森林任务页面()) {
        toastLog("还没进入蚂蚁森林任务页面呢...");
        goto_ant();
        sleep(2000);
    }
    toast("进入蚂蚁森林任务页面");
    scrollUp();
    scrollUp();
    scrollUp();
    var myEnergy1 = getMyEnergy();
    // 先把自己的能量收了
    // 排除区域：250,420,830,1608

    getEnergyByClickAllRegion("me");

    sleep(1000);

    var myEnergyTemp = getMyEnergy();
    var info1 = "收取自己的能量" + (myEnergyTemp - myEnergy1) + "g";
    toastLog(info1);
    // toastLog("[屏幕分辨率]width:" + width + ";height:" + height);

    var jiaoshuiAll = 0;
    toastLog("去好友的森林里找能量ing");

    while (!在好友的蚂蚁森林页面() && !在蚂蚁森林任务页面()) {
        toastLog("当前不在自己或者好友的蚂蚁森林页面呢，请尽快切换到蚂蚁森林页面...");
        sleep(2000);
    }

    getEnergyByZhaoNengLiang(jiaoshuiAll);

    toastLog("收能量结束");
    toastLog("Build By @zxiaofan，有问题请前往订阅号【zxiaofan】留言");
    back();
    scrollUp();
    scrollUp();
    scrollUp();
    sleep(500);
    var myEnergy2 = getMyEnergy();
    back();
    var info1 = "本次共计为好友浇水" + jiaoshuiAll + "g，\n" + "，能量合计新增" + (myEnergy2 - myEnergy1) + "g";
    // dialogs.confirm(info1);
    toastLog(info1);
    // exit();
}

// 收能量-找能量
function getEnergyByZhaoNengLiang(jiaoshuiAll) {
    var count2 = 3;


    setScreenMetrics(width, height);
    // 连点2次，避免挂件影响
    click(util.getStorage("x_znl"), util.getStorage("y_znl"));
    sleep(200);
    click(util.getStorage("x_znl"), util.getStorage("y_znl"));
    sleep(1500);

    // 返回我的森林
    if (className("android.view.View").text("startapp?appId=60000002&url=%2Fwww%2Fhome").exists()) {
        sleep(500);
        toastLog("森林里除了鸟叫，什么也没有发现");
        sleep(500);
        toastLog("找能量暂未发现可收取能量");
        return false;
    }
    等待进入好友的蚂蚁森林页面(8000);

    if (在好友的蚂蚁森林页面()) {

        if (++count > countmax) {
            toastLog("处理次数超过" + countmax + "次，暂停执行");
            return false;
        }
        var friendName = "好友";
        var friendSL = textContains("的蚂蚁森林").className("android.widget.TextView").findOnce();
        if (null != friendSL) {
            friendName = friendSL.getText();
            if (null != friendName) {
                friendName = friendName.replace("的蚂蚁森林", "");
            }
        }
        toastLog("已进入好友的蚂蚁森林，准备收取能量：" + friendName);

        var 你收取TA1 = getTaTotal();
        getEnergyByClickAllRegion("friend");
        sleep(1000);
        var 你收取TA2 = getTaTotal();

        var getTa = 你收取TA2 - 你收取TA1;
        toastLog("本次收取[" + friendName + "]能量：" + getTa + "g");


        waterActualNum = waterFun(getTa);
        if (waterActualNum > 0) {
            toastLog("本次为好友[" + friendName + "]浇水：" + waterActualNum + "g");
        }

        jiaoshuiAll = jiaoshuiAll + waterActualNum;
        sleep(1000);

        getEnergyByZhaoNengLiang(jiaoshuiAll);
    } else if (!在好友的蚂蚁森林页面() && !在蚂蚁森林任务页面()) {
        toastLog("当前不在自己或者好友的蚂蚁森林页面呢，请尽快切换到蚂蚁森林页面...");
        sleep(2000);
        var count1 = 3;
        while (!在好友的蚂蚁森林页面() && !在蚂蚁森林任务页面() && count1 > 0) {
            back();
            sleep(1000);
            count1--;
        }
        if (在好友的蚂蚁森林页面() || 在蚂蚁森林任务页面()) {
            getEnergyByZhaoNengLiang(jiaoshuiAll)
        }

    } else {
        toastLog("[找能量]暂未发现可收取能量");
        return false;
    }
}

// 计算"找能量"坐标
// x： 950 ；1080
// y： 1550 ；2160
function calZNLZB() {
    util.getStorage("x_znl");
    util.getStorage("y_znl");
}

// 计算"浇水"坐标
// x： 750 ；
// y： 1550 ；
function calJSZB() {

}

function getMyEnergy() {
    var 我的能量 = 0;
    var kj_种树 = className("Button").text("种树").findOnce();
    if (kj_种树 != null) {
        我的能量 = kj_种树.parent().children()[1].children()[0].getText();
        toastLog("我的能量：" + 我的能量);
        return 我的能量.trim().replace("g", "");
    } else {
        toastLog("当前未在蚂蚁森林首页，无法获取我的能量");
    }
    return 0;
}

function getFromTaNum() {
    sleep(500);
    var 你收取 = text("你收取TA").findOnce();
    if (null == 你收取) {
        return -1;
    }
    var 你收取TA = 你收取.parent();
    var result;
    // log("你收取TA:" + 你收取TA.children());
    你收取TA.children().forEach(function (child) {
        // log(child.className());
        // log(child.text());
        if (child.text().endsWith("g")) {
            // log(child.text());
            // log(child.text().trim().replace("g", ""));
            result = child.text().trim().replace("g", "");
            // 跳出 forEach循环使用return false，而不是break;
            return false;
        }
    });
    return result;
}


function getFromMeNum() {
    var TA收取你 = text("TA收取你").findOnce().parent();
    var result;
    // log("TA收取你:" + TA收取你.children());
    TA收取你.children().forEach(function (child) {
        // log("TA收取你22:"+child.text());
        if (child.text().endsWith("g")) {
            // log(child.text());
            result = child.text().trim().replace("g", "");
            // 跳出 forEach循环使用return false，而不是break;
            return false;
        }
    });
    return result;
}

function getHelpTaNum() {
    sleep(500);
    var 你给TA助力 = text("你给TA助力").findOnce().parent();
    var result;
    // log("你收取TA:" + 你收取TA.children());
    你给TA助力.children().forEach(function (child) {
        // log(child.className());
        // log(child.text());
        if (child.text().endsWith("g")) {
            // log(child.text());
            // log(child.text().trim().replace("g", ""));
            result = child.text().trim().replace("g", "");
            // 跳出 forEach循环使用return false，而不是break;
            return false;
        }
    });
    return result;
}

function getHelpMeNum() {
    sleep(500);
    var TA给你助力 = text("TA给你助力").findOnce().parent();
    var result;
    TA给你助力.children().forEach(function (child) {
        // log(child.className());
        // log(child.text());
        if (child.text().endsWith("g")) {
            // log(child.text());
            // log(child.text().trim().replace("g", ""));
            result = child.text().trim().replace("g", "");
            // 跳出 forEach循环使用return false，而不是break;
            return false;
        }
    });
    return result;
}
function getTaTotal() {
    var getTa = 0;
    try {
        getTa = parseInt(getFromTaNum()) + parseInt(getHelpTaNum());
    } catch (error) {
        try {
            sleep(1000);
            getTa = parseInt(getFromTaNum()) + parseInt(getHelpTaNum());
        } catch (error2) {
            toastLog("[error]计算收取好友能量数量失败，再次计算");
        }
    }

    return getTa;
}


// 收能量-覆盖点击区域内所有坐标
// 收自己的能量：xmin=220, ymin=500, xmax=900, ymax=810；
// 收好友的能量：xmin=220, ymin=500, xmax=900, ymax=810；
// type：me、friend;
function getEnergyByClickAllRegion(type) {
    toastLog("[start]收取蚂蚁森林能量：" + type);
    setScreenMetrics(width, height);

    var xmin = util.getStorage("kj_xmin");
    var ymin = util.getStorage("kj_ymin");
    var xmax = util.getStorage("kj_xmax");
    var ymax = util.getStorage("kj_ymax");
    // 间隔是能量球的半径
    for (var x1 = xmin; x1 < xmax; x1 += 100) {
        for (var y1 = ymin; y1 < ymax; y1 += 100) {
            // console.log("col:"+col+",row:"+row);
            click(x1, y1);
            sleep(30);
            if (!(在好友的蚂蚁森林页面() || 在蚂蚁森林任务页面())) {
                sleep(500);
                if (!(在好友的蚂蚁森林页面() || 在蚂蚁森林任务页面())) {
                    toastLog("当前不在自己或者好友的蚂蚁森林，立即返回");
                    back();
                    sleep(1000);
                }
            }
        }
    }
    sleep(1000);
    toastLog("[end]收取蚂蚁森林能量：" + type);
}

// waterThreshold 浇水阀值，getNum 收取能量数量，waterPlanNum达到阀值后浇水数量, waterMinUnit浇水最小单位
function waterFun(getNum) {
    if (getNum <= 0) {
        return 0;
    }
    var waterMaxCount = parseInt(getNum / util.getStorage("kj_waterThreshold"));
    var waterNum = waterMaxCount * util.getStorage("kj_waterPlanNum");
    if (waterMaxCount < 1 || waterNum < util.getStorage("kj_waterPlanNum")) {
        // 计划浇水小于waterPlanNum(默认10g，就不浇水了
        return 0;
    }

    var waterActualNum = 0;
    // if (null != selectWater) {
    waterActualNum = calAndWater(waterNum, util.getStorage("kj_waterMinUnit"));
    // calAndWater(30, 10);
    // }

    sleep(800);
    return waterActualNum;
}

// 计算浇水数量并浇水： waterThreshold 浇水阀值，每收取多少g浇水10g； getNum 实际收取能量g数
function calAndWater(waterNum, waterMinUnit) {
    var info = "计划浇水" + waterNum + "g，";
    var waterArr = [];
    while (waterArr.length < 3 && waterNum >= 1) {
        if (waterNum >= 66 && 66 >= waterMinUnit) {
            waterNum = waterNum - 66;
            waterArr.push(66);
        } else if (waterNum >= 33 && 33 >= waterMinUnit) {
            waterNum = waterNum - 33;
            waterArr.push(33);
        } else if (waterNum >= 18 && 18 >= waterMinUnit) {
            waterNum = waterNum - 18;
            waterArr.push(18);
        } else if (waterNum >= 10 && 10 >= waterMinUnit) {
            waterNum = waterNum - 10;
            waterArr.push(10);
        } else {
            break;
        }
    }
    // 排序
    waterArr.sort(function (a, b) {
        return a - b;
    });
    toastLog(info + "实际浇水计划：" + waterArr);
    var waterActualNum = 0;
    setScreenMetrics(width, height);
    for (var i = 0; i < waterArr.length; i++) {
        // 新式浇水啦
        // var 浇水 = className("android.widget.Button").text("浇水").findOnce();
        // click(浇水.bounds().centerX(), 浇水.bounds().centerY());
        click(util.getStorage("x_jiaoshui"), util.getStorage("y_jiaoshui"));
        sleep(700);
        var selectWater = text("请选择为TA浇水的克数").findOne(3000);
        if (null == selectWater) {
            toastLog("今日浇水已达上限");
            break;
        }
        waterNew(waterArr[i]);
        waterActualNum += waterArr[i];
        sleep(500);
    }
    return waterActualNum;
}
function waterNew(param) {
    // param:10克，18克，33克，66克，浇水送祝福
    sleep(300);
    toastLog("即将浇水" + param + "g");
    var 浇水克数 = text(param + "克").className("android.widget.Button").clickable().findOnce();
    sleep(200);
    if (浇水克数 == null) {
        click(util.getStorage("x_jiaoshui"), util.getStorage("y_jiaoshui"));
    } else {
        浇水克数.click();
    }
    sleep(600);
    var 浇水送祝福 = text("浇水送祝福").className("android.widget.Button").clickable().findOnce();
    if (null != 浇水送祝福) {
        浇水送祝福.click();
        toastLog("浇水送祝福：" + param + "g");
    }
    sleep(300);
}

AliPay.领积分 = function fun_领积分() {
    auto.waitFor();
    toastLog("打开支付宝");
    launch("com.eg.android.AlipayGphone");
    sleep(4000);
    toastLog("此时需在支付宝首页哦");
    // waitForPackage("com.eg.android.AlipayGphone");
    toastLog("进入支付宝首页，准备领积分");
    while (!(Boolean(在支付宝首页()) || Boolean(在支付宝我的首页()) || Boolean(在支付宝会员首页()))) {
        // scrollUp();
        // back();
        // scrollUp();
        toastLog("当前未在支付宝首页呢...");
        sleep(2000);
    }
    sleep(1000);
    toastLog("即将进入【支付宝-我的】主页...");
    if (Boolean(在支付宝首页())) {
        scrollUp();
        text("我的").findOnce().parent().click();
    }

    sleep(500);
    while (!(Boolean(在支付宝我的首页()) || Boolean(在支付宝会员首页()))) {
        scrollUp();
        toastLog("还没进入【支付宝-我的】主页呢...");
        sleep(2000);
    }
    toastLog("即将进入【支付宝会员】主页...");
    util.swipeUp();
    util.swipeUp();
    sleep(1000);
    if (!在支付宝会员首页()) {
        // click("支付宝会员");
        setScreenMetrics(width, height);
        click(util.getStorage("x_zfbhy"), util.getStorage("y_zfbhy"));
    }
    sleep(2000);
    while (!(Boolean(在支付宝会员首页()))) {
        scrollUp();
        toastLog("还没进入【支付宝会员】主页呢...");
        sleep(2000);
    }
    toastLog("即将领积分...");
    click("领积分");
    sleep(2000);
    util.swipeUp();
    util.swipeUp();
    while (textContains("签到").findOne() || textContains("规则").findOne()) {
        // scrollUp();
        sleep(500);
        scrollUp();
        var re = click("点击领取");
        if (!re) {
            break;
        }
    }
    toastLog("领取支付宝积分结束");
    back();
    back();
    back();
}

// 进入蚂蚁森林主页
function goto_ant() {
    // 支付宝内部功能调用appId
    app.startActivity({
        action: "VIEW",
        data: "alipays://platformapi/startapp?appId=60000002",
    });
}

function 在支付宝底部界面() {
    if (text("我的").exists() && text("首页").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在支付宝首页() {
    if (text("我的").exists() && text("扫一扫").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在支付宝我的首页() {
    if (text("我的").exists() && desc("设置").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在支付宝会员首页() {
    if (text("会员中心").exists() && text("个人中心").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在蚂蚁森林任务页面() {
    if (text("种树").exists()) {
        return true;
    } else {
        return false;
    }
}

function 在好友的蚂蚁森林页面() {
    if (textContains("的蚂蚁森林").exists()) {
        return true;
    } else {
        return false;
    }
}


function 等待进入好友的蚂蚁森林页面(timeout) {
    textContains("的蚂蚁森林").findOne(timeout);
    // text("浇水").findOne(timeout);
}

module.exports = AliPay;