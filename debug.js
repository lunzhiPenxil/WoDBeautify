// ==UserScript==
// @name         WoD 美化 [调试]
// @icon         http://info.world-of-dungeons.org/wod/css/WOD.gif
// @description  美化一下老旧的WoD网站页面 - 本地调试版本
// @namespace    lunzhiPenxil
// @version      dev
// @include      http*://*.world-of-dungeons.org/*
// @grant        GM_addStyle
// @run-at       document-end
// @require      file:///D:/path/to/your/WoDBeautify.js
// ==/UserScript==

/* ================================================
   本地调试加载器
   
   使用说明：
   1. 将第11行的路径修改为你本地 WoDBeautify.js 的实际路径
   2. 将此脚本保存为 "WoDBeautify_Loader.user.js"
   3. 在Tampermonkey中启用此脚本
   4. 访问WoD网站即可调试本地代码
   
   Windows路径示例：file:///C:/Users/用户名/项目/WoDBeautify.js
   macOS路径示例：file:///Users/用户名/项目/WoDBeautify.js
================================================ */

console.log('[WoD] 美化 本地调试已加载 - 开发模式');

if (typeof unsafeWindow !== 'undefined') {
    unsafeWindow.__WoDBeautifyDebug = true;
}
