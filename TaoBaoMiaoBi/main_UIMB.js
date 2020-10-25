"ui";
var height = device.height;
var width = device.width;
var version = "202010241800";
var versionDesc = "2020双十一，【天猫+支付宝】一键领喵币再次来袭";

var main = {};
ui.layout(
    <vertical>

        <text marginTop="50px" gravity="center" textSize="20sp" id="kj_aboutThis" text="zxiaofan制作，欢迎前往订阅号zxiaofan交流" />
        <button marginTop="30px" id="kj_findMe" text="联系我" textColor="red" textSize="20sp" />

        <button marginTop="30px" id="kj_about" text="使用说明，必看" textColor="red" />

        <horizontal>
            <checkbox marginTop="30px" marginLeft="30px" id="kj_select_TMMB" text="打开天猫领喵币" textSize="20sp" checked="true" />
            <checkbox marginTop="30px" marginLeft="30px" id="kj_select_TBMB" text="打开淘宝领喵币" textSize="20sp" checked="true" />
        </horizontal>
        <horizontal>
            <checkbox marginLeft="30px" id="kj_select_ZFBMB" text="打开支付宝领喵币" textSize="20sp" />
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
var module_main_funMB = require("./main_funMB.js");
var module_util = require("./util.js");

initData();
this.fun_checkUpdate(version);

ui.kj_findMe.click(() => {

    threads.start(function () {
        let info = "程序将【自动】打开微信，搜索订阅号zxiaofan，\n\n" +
            "    你可以在这里联系我哟。";
        // toastLog(info);
        var result = dialogs.confirm(info);
        // var result = true;
        if (result) {
            var dyh = "zxiaofan";
            setClip(dyh);
            module_main_funMB.findMe(dyh);
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

});


ui.kj_about.click(() => {
    let info = "" +
        "1、APP需要打开以下权限：无障碍服务权限、后台弹出界面；\n\n" +
        "    权限必须提前打开，否则可能执行失败；\n\n" +
        "    权限必须提前打开！！！\n\n" +
        "2、更新说明：20201024支持【天猫+淘宝+支付宝】一键领喵币；\n\n" +
        "5、【日志】:\n" +
        "    5.1、如果使用有bug，可在使用后“打开日志窗口”，分析日志；\n\n" +
        "6、作者：公众号【zxiaofan】";

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


// 一条龙
ui.kj_all.click(() => {
    toastLog("一条龙Starting...");

    var thread = threads.start(function () {
        var res;
        if (ui.kj_select_TMMB.isChecked()) {
            // 天猫猫币
            toastLog("[UI]天猫喵币");

            res = module_main_funMB.main_method("天猫喵币", true);
        }
        if (ui.kj_select_ZFBMB.isChecked()) {
            // 支付宝猫币
            toastLog("[UI]支付宝喵币");
            res = module_main_funMB.main_method("支付宝喵币", true);
        }

        if (ui.kj_select_TBMB.isChecked()) {
            // 淘宝猫币
            toastLog("[UI]淘宝喵币");
            res = module_main_funMB.main_method("淘宝猫币", true);
        }
        res.blockedGet();

        toastLog("[End] 一条龙处理完毕");

        dialogs.confirm("喵币已为您领取完毕，请查收；最新版APP请前往公众号【zxiaofan】留言“喵币”获取");

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

function fun_checkUpdate(version) {
    var thread = threads.start(function () {
        var updateResult = module_main_funMB.checkUpdate(version);
        // toastLog("fun_checkUpdate:" + updateResult);
        if (updateResult != "") {
            ui.kj_checkUpdate.setText("【检查更新】APP已更新，赶紧使用最新版吧");
        } else {
            ui.kj_checkUpdate.setText("【检查更新】");
        }
    });
}

function initData() {
    // var storage = storages.create("zxiaofan:ant");
    module_util.getUid("miaobi");
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