"ui";
var height = device.height;
var width = device.width;
var version = "202010062200";
var versionDesc = "逻辑优化，支持逛一逛收能量";

var main = {};
ui.layout(
    <vertical>

        <text marginTop="50px" gravity="center" textSize="20sp" id="kj_aboutThis" text="zxiaofan制作，欢迎前往订阅号zxiaofan交流" />
        <button marginTop="30px" id="kj_findMe" text="联系我" textColor="red" textSize="20sp" />

        <button marginTop="30px" id="kj_about" text="使用说明，必看" textColor="red" />
        {/* <button marginTop="100px" id="kj_miaobi" text="开始领喵币" /> */}
        {/* <button  id="kj_tbnl" text="双十二 领淘宝能量" /> */}
        <horizontal>
            <text marginLeft="10px" text="每收取 " marginTop="30px" />
            <input id="kj_waterThreshold" marginTop="50px" inputType="number" text="30" />
            <text text=" g能量，自动浇水" marginTop="50px" />
            <input id="kj_waterPlanNum" marginTop="50px" inputType="number" text="10" />
            <text text=" g" marginTop="50px" />
            <text text="，单次浇水最小" marginTop="50px" />
            <input id="kj_waterMinUnit" marginTop="50px" inputType="number" text="10" />
            <text text=" g" marginTop="50px" />

        </horizontal>
        <horizontal>

            <text text="好友能量球X坐标最大值：" marginTop="10px" />
            <input id="kj_friendXmax" marginTop="10px" inputType="number" text="900" />
            <text text="；Y坐标最大值：" marginTop="10px" />
            <input id="kj_friendYmax" marginTop="10px" inputType="number" text="810" />
        </horizontal>
        {/* <horizontal>
            <text text="浇水按钮横坐标X：" marginTop="10px" />
            <input id="kj_waterPointX" marginTop="10px" inputType="number" text="980" />
            <text text="；浇水按钮纵坐标Y：" marginTop="10px" />
            <input id="kj_waterPointY" marginTop="10px" inputType="number" text="1500" />
        </horizontal>  */}

        <horizontal>

            <checkbox marginLeft="30px" marginTop="50px" id="kj_select_ant" text="收取蚂蚁森林能量" />
            <checkbox marginTop="30px" id="kj_select_water" text="收能量And浇水" checked="true" />
        </horizontal>
        <horizontal>
            <checkbox marginLeft="30px" marginTop="50px" id="kj_select_领取支付宝积分" text="领取支付宝积分" checked="true" />
            <checkbox marginTop="30px" id="kj_select_显示悬浮窗" text="显示悬浮窗" checked="false" />
            {/* <checkbox marginTop="50px" id="kj_select_收取淘宝双十二能量" text="收取淘宝双十二能量" /> */}
        </horizontal>
        <button marginTop="30px" id="kj_all" text="一条龙（点击此处执行）" textColor="red" textSize="20sp" />
        {/* <input marginTop="100px" id="kj_input" text="这是一个输入框" /> */}

        <button marginTop="30px" id="kj_checkUpdate" text="【检查更新】" bg="#00ff00" textSize="20sp" />
        <button marginTop="30px" id="kj_close" text="关闭软件" />
        <button id="kj_resetParam" text="恢复默认参数配置" />
        <horizontal>
            <button marginTop="30px" id="kj_openConsole" text="打开日志窗口" />
            <button marginTop="30px" marginLeft="100px" id="kj_closeConsole" text="关闭日志窗口" />
            <button marginTop="30px" marginLeft="150px" id="kj_clearLog" text="清理日志" />
        </horizontal>
        <button marginTop="30px" id="kj_gotoGitHub" text="项目已开源，点击前往GitHub查看" />
    </vertical>
);
toastLog(ui.kj_aboutThis.getText());

// engines.execScriptFile("main_ant_miaobi.js");
var module_main_fun = require("./main_fun.js");
var module_util = require("./util.js");

initData();

this.fun_checkUpdate(version);

ui.kj_findMe.click(() => {

    threads.start(function () {
        let info = "程序将自动打开微信，搜索订阅号zxiaofan，\n\n" +
            "    你可以在这里联系我哟。";
        // toastLog(info);
        var result = dialogs.confirm(info);
        // var result = true;
        if (result) {
            var dyh = "zxiaofan";
            setClip(dyh);
            module_main_fun.findMe(dyh);
        } else {
            toastLog("你也可以手动前往公众号搜索zxiaofan找我");
        }
    });
});



ui.kj_openConsole.click(() => {

    threads.start(function () {
        let info = "是否确认打开日志窗口？\n\n" +
            "如果日志窗口区域有点击操作，请勿打开日志窗口。";

        var result = dialogs.confirm(info);
        if (result) {
            console.show();
            // console.setPosition(0, 0);
            // console.setSize(100, 50);
            toastLog("打开日志窗口");
        } else {
            toastLog("取消打开日志窗口");
        }
    });
});


ui.kj_closeConsole.click(() => {

    threads.start(function () {
        toastLog("关闭日志窗口");
        console.hide();
    });
});


ui.kj_clearLog.click(() => {

    threads.start(function () {
        toastLog("清理日志");
        console.clear();
    });
});


ui.kj_resetParam.click(() => {

    toastLog("恢复默认参数配置");
    module_util.clearStorage();
    resetUIData();
    setStorageData();

});


ui.kj_about.click(() => {
    let info = "" +
        "1、APP需要打开以下权限：无障碍服务权限、后台弹出界面；\n\n" +
        "    权限必须提前打开，否则可能执行失败；\n\n" +
        "    权限必须提前打开！！！\n\n" +
        "2、更新说明：20201006支持逛一逛收能量；\n\n" +
        "3、【支付宝会员领积分】:\n" +
        // "    2.1、浏览店铺领喵币；\n" +
        // "    2.2、天降喵币；\n" +
        // "    2.3、店铺签到领喵币；\n" +
        // "    2.4、领喵币主页签到；\n" +
        // "    2.5、开心农场签到（需手动领喵币）；\n\n" +
        "4、【蚂蚁森林能量】:\n" +
        "    4.1、收取蚂蚁森林能量需要申请截图权限，弹出提示框时同意即可；\n\n" +
        "    4.2、基于控件坐标位置收取能量，适用于所有分辨率的手机；\n\n" +
        "    4.3、支持收取能量同时给好友浇水（默认每收取该好友30g能量，则浇水10g）；\n\n" +
        "    4.4、收能量已改版，每天最多浇水3次，实际浇水优先级：66g>33g>18g>10g；\n\n" +
        "        如计划浇水10g，则实际浇水10g 1次；计划浇水30g，则实际浇水18g1次+10g1次；\n\n" +
        "        计划浇水80g，则实际浇水66g1次+10g1次；\n\n" +

        "5、【日志】:\n" +
        "    5.1、如果使用有bug，可在使用后“打开日志窗口”，分析日志；\n\n" +
        "6、Build By zxiaofan（订阅号、CSDN）";

    // dialogs.confirm(info);
    dialogs.build({
        title: "使用说明",
        content: info
    }
    ).show();
});



ui.kj_checkUpdate.click(() => {
    // log("main_ant_miaobi:" + module_main_ant_miaobi);
    this.fun_checkUpdate(version);
    // exit();
});



// ui.kj_tbnl.click(() => {
//     module_main_fun.getTaoBaoNengLiang_main();
// });


// ui.kj_miaobi.click(() => {
//     module_main_ant_miaobi.getMiaoBi_main();
// });

// 收取蚂蚁森林能量
// ui.kj_ant.click(() => {
//     module_main_fun.ant_main(999);
// });

// 收取蚂蚁森林能量-浇水
// ui.kj_HiAnt.click(() => {
//     // toastLog(ui.kj_HiAntCount.getText());
//     module_main_fun.ant_main(ui.kj_HiAntCount.getText());
// });

// 一条龙
ui.kj_all.click(() => {
    toastLog("一条龙Starting...");

    // var thread = threads.start(function () {
    //     // 收取蚂蚁森林能量
    //     if(ui.kj_select_ant.isChecked()){
    //         var dis_result =  module_main_fun.ant_main(999);
    //         toastLog("收拾收拾...");
    //         dis_result.blockedGet();
    //         toastLog("搜索 asas拾...");

    //     }

    // // 收取蚂蚁森林能量-浇水
    // if(ui.kj_select_water.isChecked()){
    //     toastLog("ui.kj_select_water.");
    //     var dis_result =  module_main_fun.ant_main(ui.kj_HiAntCount.getText());
    //     dis_result.blockedGet();
    // }
    setStorageData();
    var thread = threads.start(function () {

        if (ui.kj_select_显示悬浮窗.isChecked()) {
            console.hide();
            toastLog("[Start]" + ui.kj_select_显示悬浮窗.getText());
            showConsole();
        }
        // 收取蚂蚁森林能量
        if (ui.kj_select_ant.isChecked()) {
            toastLog("[Start]" + ui.kj_select_ant.getText());
            module_main_fun.main_method("蚂蚁森林", false, 999, 0);
        }

        // 收取蚂蚁森林能量-浇水
        if (ui.kj_select_water.isChecked()) {
            toastLog("[Start]" + ui.kj_select_water.getText());
            toastLog("每收取好友" + ui.kj_waterThreshold.getText() + "g能量浇水" + ui.kj_waterPlanNum.getText() + "g。");
            module_main_fun.main_method("蚂蚁森林", false, ui.kj_waterThreshold.getText(), ui.kj_waterPlanNum.getText(), ui.kj_waterMinUnit.getText());
        }
        if (ui.kj_select_领取支付宝积分.isChecked()) {
            toastLog("[Start]" + ui.kj_select_领取支付宝积分.getText());
            module_main_fun.main_method("支付宝会员积分", false, version, 0);
        }

        // if(ui.kj_select_收取淘宝双十二能量.isChecked()){
        //     toastLog("[Start]"+ui.kj_select_收取淘宝双十二能量.getText());
        //     module_main_fun.main_method("淘宝收能量", false,version);
        // }

        toastLog("[End] 一条龙处理完毕");

    });
    //    thread.join(); // 会卡死的，可能使无障碍服务失效，需要重启手机

});

function showConsole() {
    console.hide()
    sleep(200);
    console.show();
    // console.setSize(500, 300);
    console.setPosition(20, device.height - 900);
};

ui.kj_close.click(() => {
    engines.stopAllAndToast();
    ui.finish();
    exit();
});


ui.kj_gotoGitHub.click(() => {
    app.openUrl("https://github.com/zxiaofan/AutoJsProject");
});


// main.getWaterThreshold = function getWaterThreshold() {
//     return ui.kj_waterThreshold.getText();
// };

// main.getWaterPlanNum = function getWaterPlanNum() {
//     return ui.kj_waterPlanNum.getText();
// };

// main.getWaterMinUnit = function getWaterMinUnit() {
//     return ui.kj_waterMinUnit.getText();
// };

// main.getkj_waterPointX = function getkj_waterPointX() {
//     return ui.kj_waterPointX.getText();
// };

// main.getkj_waterPointY = function getkj_waterPointY() {
//     return ui.kj_waterPointY.getText();
// };

// main.getkj_friendXmax = function getkj_friendXmax() {
//     return ui.kj_friendXmax.getText();
// };

// main.getkj_friendYmax = function getkj_friendYmax() {
//     return ui.kj_friendYmax.getText();
// };

function fun_checkUpdate(version) {
    var thread = threads.start(function () {
        var updateResult = module_main_fun.checkUpdate(version);
        // toastLog("fun_checkUpdate:" + updateResult);
        if (updateResult != "") {
            ui.kj_checkUpdate.setText("【检查更新】APP已更新，赶紧使用最新版吧");
        } else {
            ui.kj_checkUpdate.setText("【检查更新】");
        }
    });
}

function setStorageData() {
    var storage = storages.create("zxiaofan:ant");

    storage.put("kj_waterThreshold", parseInt(ui.kj_waterThreshold.getText()));
    storage.put("kj_waterPlanNum", parseInt(ui.kj_waterPlanNum.getText()));
    storage.put("kj_waterMinUnit", parseInt(ui.kj_waterMinUnit.getText()));
    // storage.put("kj_waterPointX", parseInt(ui.kj_waterPointX.getText()));
    // storage.put("kj_waterPointY", parseInt(ui.kj_waterPointY.getText()));
    storage.put("kj_friendXmax", parseInt(ui.kj_friendXmax.getText()));
    storage.put("kj_friendYmax", parseInt(ui.kj_friendYmax.getText()));
    // storage.put("a", 123);
    // console.log(storage.get("a"));
    // console.log(storage.get("kj_waterThreshold"));
    // console.log(getStorage("kj_friendXmax"));
    // console.log(getStorage("kj_friendXmax").mText());
}

function initData() {
    var storage = storages.create("zxiaofan:ant");
    console.log(storage.get("kj_waterThreshold"));

    if (storage.contains("kj_waterThreshold")) {
        ui.kj_waterThreshold.setText(storage.get("kj_waterThreshold") + "");
    }
    if (storage.contains("kj_waterPlanNum")) {
        ui.kj_waterPlanNum.setText(storage.get("kj_waterPlanNum") + "");
    }
    if (storage.contains("kj_waterMinUnit")) {
        ui.kj_waterMinUnit.setText(storage.get("kj_waterMinUnit") + "");
    }
    // if (storage.contains("kj_waterPointX")) {
    //     ui.kj_waterPointX.setText(storage.get("kj_waterPointX") + "");
    // }
    // if (storage.contains("kj_waterPointY")) {
    //     ui.kj_waterPointY.setText(storage.get("kj_waterPointY") + "");
    // }
    if (storage.contains("kj_friendXmax")) {
        ui.kj_friendXmax.setText(storage.get("kj_friendXmax") + "");
    }
    if (storage.contains("kj_friendYmax")) {
        ui.kj_friendYmax.setText(storage.get("kj_friendYmax") + "");
    }
    module_util.getUid();
}

function resetUIData() {
    var storage = storages.create("zxiaofan:ant");

    ui.kj_waterThreshold.setText("30");
    ui.kj_waterPlanNum.setText("10");

    ui.kj_waterMinUnit.setText("10");

    ui.kj_friendXmax.setText("900");

    ui.kj_friendYmax.setText("810");

}


// context.exports = main;