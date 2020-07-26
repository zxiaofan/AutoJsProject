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
    var counttmp = 0;

    goto_ant();

    //注册音量下按下退出脚本监听
    util.registEvent();
    while (!在蚂蚁森林任务页面()) {
        toastLog("还没进入蚂蚁森林任务页面呢...");
        sleep(2000);
    }
    toast("进入蚂蚁森林任务页面");
    scrollUp();
    scrollUp();
    scrollUp();
    var myEnergy1 = getMyEnergy();
    // 先把自己的能量收了
    // 排除区域：250,420,830,1608


    // var aaaa=1;
    // if(aaaa){
    //     toastLog("sssssss"+waterThreshold);
    //     return;
    // }

    toastLog("请求截图权限");

    var reqScreen = requestScreenCapture();
    // log("reqScreen:" + reqScreen);
    if (!reqScreen) {
        sleep(1000);
        toastLog("请求截图权限失败");
        return;
        // exit();
    }

    toastLog("收取自己的蚂蚁森林能量");
    // getEnergy(1);
    getEnergyByKJ(1, 0, 0);

    sleep(1000);
    toastLog("下滑");
    sleep(1000);

    scrollDown();
    var screen = captureScreen();
    if (screen == null) {
        toastLog("截图失败，程序退出");
        return;
        // exit();
    }
    toastLog("截图成功");
    sleep(500);
    var shou = images.load("/sdcard/antshou.jpg");
    var love = images.load("/sdcard/antlove.jpg");
    var yaoqing = images.load("/sdcard/yaoqing.jpg");
    if (null == shou) {
        shou = images.load("http://tc.zxiaofan.com/tc/a/icon/anthand.jpg");
    }
    sleep(1000);
    if (null == love) {
        love = images.load("http://tc.zxiaofan.com/tc/a/icon/antlove.jpg");
    }
    sleep(1000);
    if (null == yaoqing) {
        yaoqing = images.load("http://tc.zxiaofan.com/tc/a/icon/yaoqing.jpg");
    }
    sleep(1000);
    images.save(shou, "/sdcard/antshou.jpg");
    images.save(love, "/sdcard/antlove.jpg");
    images.save(yaoqing, "/sdcard/yaoqing.jpg");
    if (shou == null || love == null || yaoqing == null) {
        toastLog("加载图片失败");
        return;
        // exit();
    }

    var count = 0;
    toastLog("[屏幕分辨率]width:" + width + ";height:" + height);
    var jiaoshuiAll = 0;
    while (count < countmax) {
        count++;
        screen = captureScreen();
        var point = findImage(screen, shou, {
            region: [width - 200, 200, 200, height - 200],
            threshold: 0.5
        });
        sleep(500);
        if (!point) {
            point = findImage(screen, love, {
                region: [width - 200, 200, 200, height - 200],
                threshold: 0.5
            });
        }
        if (point) {
            toastLog("找到可收取能量:" + point);
            var xpoint = random() * 50 + 17;
            click(point.x - 20, point.y + 30);

            var jiaoshui = getEnergy(2);      //收能量
            // 计算收能量数量

            // var jiaoshui = getEnergyByKJ(2, waterThreshold, waterPlanNum, waterMinUnit);
            jiaoshuiAll = jiaoshuiAll + jiaoshui;
            sleep(500);
            back();
            sleep(1000);
        } else {
            toastLog("没有找到能量：" + count);
            sleep(1000);
            var 没有更多了 = text("没有更多了").findOnce();
            if (没有更多了 != null) {
                toastLog("所有好友的蚂蚁森林均已查看完毕");
                sleep(1000);
                count = countmax;
                break;
            }
            var hasYaoQing = findImage(screen, yaoqing);
            if (hasYaoQing != null) {
                toastLog("所有好友的蚂蚁森林均已查看完毕");
                sleep(1000);
                count = countmax;
                break;
            }
            //  else if (!textContains("排行榜").exists()) {
            //     toastLog("error_当前不在好友列表页面");
            //     back();
            // } 
            // else {
            // scrollDown();
            // util.swipeDown();
            util.swipeAuto(0.8, 0.75, 0.85, 0.2, 13);

            toastLog("查看更多好友");
            if (textContains("查看更多好友").exists()) {
                click("查看更多好友");
            } else {
                // util.swipeDown();
            }
            sleep(1000);
            // }
        }
    }
    toastLog("脚本运行结束");
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

// 基于控件获取坐标收取能量
function getEnergyByKJ(k, waterThreshold, waterPlanNum, waterMinUnit) {
    sleep(3000);
    while (2 == k && !text("你收取TA").exists()) {
        toastLog("还没进入好友的蚂蚁森林主页呢...");
        sleep(2000);
    }
    var jiaoshuiNum = 0;
    var 你收取TA1;
    if (k == 2) {
        你收取TA1 = getTaTotal();
    }
    // var keshouqu;

    // if (k == 1) {
    //     keshouqu = className("android.widget.Button").textContains("能量").clickable(true).find();
    // } else {
    //     keshouqu = className("android.widget.Button").clickable(true).find();
    // }
    var keshouqu = className("android.widget.Button").clickable(true).find();
    clickNengLiangQiu(keshouqu, 0);
    var friendName = "好友";
    var friendSL = textContains("的蚂蚁森林").className("android.widget.TextView").findOnce();
    if (null != friendSL) {
        friendName = friendSL.getText();
        if (null != friendName) {
            friendName = friendName.replace("的蚂蚁森林", "");
        }
    }
    var getTa = 0;
    if (k == 2) {
        sleep(1000);
        var 你收取TA2 = getTaTotal();
        getTa = 你收取TA2 - 你收取TA1;
        toastLog("本次收取[" + friendName + "]能量：" + getTa + "g");
    }
    // var jiaoshuiTime = 0;
    // while (2 == k && jiaoshuiTime < 3 && getTa >= waterThreshold) {
    //     jiaoshuiTime++;
    //     toastLog("为[" + friendName + "]浇水第" + jiaoshuiTime + "次");
    //     var 浇水 = className("android.widget.Button").text("浇水").findOnce();
    //     // log(浇水.bounds());
    //     click(浇水.bounds().centerX(), 浇水.bounds().centerY());
    //     jiaoshuiNum = jiaoshuiNum + 10;
    //     sleep(3000);
    //     getTa = getTa - waterThreshold;
    // }
    var waterActualNum = 0;
    if (k == 2) {
        waterActualNum = waterFun(waterThreshold, getTa, waterPlanNum, waterMinUnit);
        if (waterActualNum > 0) {
            toastLog("本次为好友[" + friendName + "]浇水：" + waterActualNum + "g");
        }
    }
    return waterActualNum;

}

function clickNengLiangQiu(keshouqu, time) {
    if (null == keshouqu || time > 10) {
        return;
    }

    var getTa1 = getFromTaNum();
    if(getTa1 == -1){
        getTa1 = getMyEnergy();
    }
    var hasClick = false;
    for (var i = 0; i < keshouqu.length; i++) {
        var child = keshouqu[i];
        if (child.text().trim().equals("") || child.text().startsWith("收集能量")) {
            // log("text1:" + child.text());
            // log("text2:" + child.indexInParent());
            // child.click();
            var pos = child.bounds();   //能量球坐标范围
            // 判断是否时能量球
            var qiu = false;
            if (pos.centerX() > 150 && pos.centerX() < (width - 200) && pos.centerY() > 400 && pos.centerY() < 900) {
                qiu = true;
            }
            if (!qiu) {
                continue;
            }
            hasClick = true;
            click(pos.centerX(), pos.centerY() - 20); //点击能量球中心
            if (null == time || time == 0) {
                sleep(300);
            } else {
                sleep(100);
            }

        }
    }
    if (hasClick) {
        var getTa2 = getFromTaNum();
        if(getTa2 == -1){
            getTa2 = getMyEnergy();
        }
        if (getTa2 > 0 && getTa1 != getTa2) {
            // 能量有变化，才有继续点击的必要
            var keshouqu = className("android.widget.Button").clickable(true).find();
            clickNengLiangQiu(keshouqu, time + 1);
        }
    }
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

// var 你收取TA = getFromTaNum();
// log("你收取TA：" + 你收取TA);

// var TA收取你 = Number(getFromMeNum());
// log("TA收取你:" + TA收取你);


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
    var getTa = parseInt(getFromTaNum()) + parseInt(getHelpTaNum());
    return getTa;
}
function getTaOld() {
    var getTaNum = 0;
    if (text("你给TA助力").exists()) {
        var factor = 7;
        getTaNum = getTaNum + parseInt(getHelpTaNum());
        var 你给TA助力 = text("你给TA助力").findOnce().parent();
        var xxx = 你给TA助力.parent().parent().parent().parent().parent();
        log("你给TA助力");
        gesture(200, [xxx.bounds().centerX() - 131 + parseInt(random() * factor), xxx.bounds().centerY()], [xxx.bounds().centerX() + 131, xxx.bounds().centerY()]);
        getTaNum = getTaNum + parseInt(getFromTaNum());
    } else if (text("你收取TA").exists()) {
        var factor = 7;
        getTaNum = getTaNum + parseInt(getFromTaNum());
        var 你收取TA = text("你收取TA").findOnce().parent();
        var xxx = 你收取TA.parent().parent().parent().parent().parent();
        log("你收取TA");
        gesture(200, [xxx.bounds().centerX() + 131 + parseInt(random() * factor), xxx.bounds().centerY()], [xxx.bounds().centerX() - 131, xxx.bounds().centerY()]);
        getTaNum = getTaNum + parseInt(getHelpTaNum());

    }

    return getTaNum;
}

function getEnergy(k) {
    sleep(3000);
    while (2 == k && !text("你收取TA").exists()) {
        toastLog("还没进入好友的蚂蚁森林主页呢...");
        sleep(2000);
    }
    //浇水 sleep(3000);
    /*
     if (text("浇水").exists()) {        //判断有没有浇水
         var Water = text("浇水").findOne(600).bounds();
         click(Water.centerX(), Water.centerY());
         sleep(1000);
     }
    */
    // if (textStartsWith("收集能量").exists()) {//判断是否存在能量球
    //     textStartsWith("收集能量").find().forEach(function (e) {
    //         var pos = e.bounds();   //能量球坐标范围
    //         click(pos.centerX(), pos.centerY() - 70);//点击能量球坐标范围中心点
    //         sleep(500);
    //     })
    // }  else {
    //     toast("没有可收集的能量");
    // }
    var friendName = "好友";
    var friendSL = textContains("的蚂蚁森林").className("android.widget.TextView").findOnce();
    if (null != friendSL) {
        friendName = friendSL.getText();
        if (null != friendName) {
            friendName = friendName.replace("的蚂蚁森林", "");
        }
    }
    var 你收取TA1;
    if (k == 2) {
        你收取TA1 = getTaTotal();
    }
    //将能量球存在的区域都点一遍，间隔是能量球的半径
    var colmax = util.getStorage("kj_friendXmax"); // 900
    var rowmax = util.getStorage("kj_friendYmax"); // 900
    // console.log("colmax:"+colmax+",rowmax:"+rowmax);
    if (k == 1) {
        colmax = 750;
        rowmax = 750;
    }
    for (var row = 640; row < rowmax; row += 100) {
        for (var col = 140; col < colmax; col += 100) {
            // console.log("col:"+col+",row:"+row);
            
            click(col, row);
            sleep(30);
        }
    }

    var getTa = 0;
    if (k == 2) {
        sleep(1000);
        var 你收取TA2 = getTaTotal();
        getTa = 你收取TA2 - 你收取TA1;
        toastLog("本次收取[" + friendName + "]能量：" + getTa + "g");
    }

    var waterActualNum = 0;
    if (k == 2) {
        waterActualNum = waterFun(getTa);
        if (waterActualNum > 0) {
            toastLog("本次为好友[" + friendName + "]浇水：" + waterActualNum + "g");
        }
    }
    return waterActualNum;
}

// waterThreshold 浇水阀值，getNum 收取能量数量，waterPlanNum达到阀值后浇水数量, waterMinUnit浇水最小单位
function waterFun(getNum) {
    if(getNum <= 0){
        return 0;
    }
    var waterMaxCount = parseInt(getNum / util.getStorage("kj_waterThreshold"));
    var waterNum = waterMaxCount * util.getStorage("kj_waterPlanNum");
    if (waterMaxCount < 1 || waterNum < util.getStorage("kj_waterPlanNum")) {
        // 计划浇水小于waterPlanNum(默认10g，就不浇水了
        return 0;
    }
    // var 浇水 = className("android.widget.Button").text("浇水").findOnce();
    // // log(浇水.bounds());
    // click(浇水.bounds().centerX(), 浇水.bounds().centerY());
    // click(util.getStorage("kj_waterPointX"), util.getStorage("kj_waterPointY"));
    // sleep(500);
    // var selectWater = text("请选择为TA浇水的克数").className("android.view.View").findOnce();
    // sleep(300); // 今日浇水量已达上限
    var waterActualNum = 0;
    // if (null != selectWater) {
        waterActualNum = calAndWater(waterNum, util.getStorage("kj_waterMinUnit"));
        // calAndWater(30, 10);
    // }
   /**  else {
        waterActualNum = waterActualNum + 10;
        // 老版本浇水，已经浇水成功1次了，总共最多浇水3次
        waterMaxCount--;
        if (waterMaxCount > 0) {
            // 浇水 = className("android.widget.Button").text("浇水").findOnce();
            // click(浇水.bounds().centerX(), 浇水.bounds().centerY());
            click(util.getStorage("kj_waterPointX"), util.getStorage("kj_waterPointY"));
            waterActualNum = waterActualNum + 10;
            sleep(500);
            waterMaxCount--;
        }
        if (waterMaxCount > 0) {
            // 浇水 = className("android.widget.Button").text("浇水").findOnce();
            // click(浇水.bounds().centerX(), 浇水.bounds().centerY());
            click(util.getStorage("kj_waterPointX"), util.getStorage("kj_waterPointY"));
            waterActualNum = waterActualNum + 10;
            sleep(500);
            waterMaxCount--;
        }
    }
    **/
    sleep(800);
    return waterActualNum;
}

// 计算浇水数量并浇水：waterThreshold浇水阀值，每收取多少g浇水10g；getNum实际收取能量g数
function calAndWater(waterNum, waterMinUnit) {
    var info = "计划浇水" + waterNum + "g，";
    var waterArr = [];
    while (waterArr.length < 3 && waterNum >= 1) {
        if (waterNum >= 18 && 18 >= waterMinUnit) {
            waterNum = waterNum - 18;
            waterArr.push(18);
        } else if (waterNum >= 10 && 10 >= waterMinUnit) {
            waterNum = waterNum - 10;
            waterArr.push(10);
        } else if (waterNum >= 5 && 5 >= waterMinUnit) {
            waterNum = waterNum - 5;
            waterArr.push(5);
        } else if (waterNum >= 1 && 1 >= waterMinUnit) {
            waterNum = waterNum - 1;
            waterArr.push(1);
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
    // waterArr.forEach(function (element, index, array) {
    //     //         console.info(element); //当前元素的值
    //     //         console.info(index);   //当前下标
    //     //         console.info(array);  //数组本身 
    //     // 新式浇水啦
    //     waterNew(element);
    //     waterActualNum + element;
    // });
    for (var i = 0; i < waterArr.length; i++) {
        // 新式浇水啦
        // var selectWater = text("请选择为TA浇水的克数").className("android.view.View").findOnce();
        // if (selectWater == null) {
        //     var 浇水 = className("android.widget.Button").text("浇水").findOnce();
        //     click(浇水.bounds().centerX(), 浇水.bounds().centerY());
        // }
        click(util.getStorage("kj_waterPointX"), util.getStorage("kj_waterPointY"));
        sleep(300);
        var selectWater = text("请选择为TA浇水的克数").className("android.view.View").findOnce();
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
    // param:1克，5克，10克，18克，浇水送祝福
    sleep(300);
    toastLog("即将浇水" + param + "g");
    var 浇水克数 = text(param + "克").className("android.widget.Button").clickable().findOnce();
    sleep(200);
    if (浇水克数 == null) {
        // var 浇水 = className("android.widget.Button").text("浇水").findOnce();
        // click(浇水.bounds().centerX(), 浇水.bounds().centerY());
        click(util.getStorage("kj_waterPointX"), util.getStorage("kj_waterPointY"));
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
    click("支付宝会员");
    sleep(2000);
    while (!(Boolean(在支付宝会员首页()))) {
        scrollUp();
        toastLog("还没进入【支付宝会员】主页呢...");
        sleep(2000);
    }
    toastLog("即将领积分...");
    click("领积分");
    sleep(2000);
    scrollUp();
    scrollUp();
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
    if (text("支付宝会员").exists() && text("账单").exists()) {
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
    if (text("种树").exists() && text("任务").exists()) {
        return true;
    } else {
        return false;
    }
}

module.exports = AliPay;