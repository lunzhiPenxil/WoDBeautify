// ==UserScript==
// @name         WoD 美化
// @icon         http://info.world-of-dungeons.org/wod/css/WOD.gif
// @description  美化一下老旧的WoD网站页面
// @namespace    lunzhiPenxil
// @repository   https://github.com/lunzhiPenxil/WoDBeautify
// @license      AGPL3
// @version      2025.12.27.8
// @include      http*://*.world-of-dungeons.org/*
// @grant        GM_addStyle
// @run-at       document-end
// @downloadURL  https://update.greasyfork.org/scripts/560353/WoD%20%E7%BE%8E%E5%8C%96.user.js
// @updateURL    https://update.greasyfork.org/scripts/560353/WoD%20%E7%BE%8E%E5%8C%96.meta.js
// ==/UserScript==

(function() {
    const baseCSS = /*css*/ `
        /* == 基础过渡 == */
        * {
            transition: all 300ms;
        }

        .content_table * {
            transition: all 300ms;
        }

        /* == 表格行高度过渡 == */
        #gadgettable-center .content_table tr[class^="row"] {
            position: relative;
            transition: background-color 300ms ease;
        }

        #gadgettable-center .content_table tr[class^="row"] td > :is(a, div, span) {
            display: inline-block;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            overflow: hidden !important;
            transition: all 400ms cubic-bezier(0, 0, 0, 2) !important;
            transition-property: max-height, padding-top, padding-bottom, opacity !important;
            vertical-align: top;
            box-sizing: border-box !important;
        }

        #gadgettable-center:not(:has(input[name="report_id[0]"])) .content_table tr[class^="row"]:is(:hover, .expanded) td > :is(a, div, span) {
            max-height: 120px !important;
            padding-top: 8px !important;
            padding-bottom: 8px !important;
        }

        #gadgettable-center .content_table tr[class^="row"] td {
            position: relative;
        }

        #gadgettable-center .content_table tr[class^="row"] td::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            transition: background-color 0.3s ease;
            z-index: -1;
            pointer-events: none;
        }

        #gadgettable-center .content_table tr[class^="row"]:hover td::after {
            background-color: rgba(102, 126, 234, 0.05);
        }

        /* == 超链接下划线动画 == */
        :is(
            .gadget.main_content.popup,
            .content_table,
            #gadgettable-top,
            #gadgettable-left,
            #gadgettable-center,
            #gadgettable-right
        ) a:not(:has(:is(
            span.prevHeroLinkImageLeft,
            span.nextHeroLinkImageRight,
            span.font_Hero_Name
        ))) {
            position: relative !important;
            width: max-content;
            padding: 0;
            transition: color 200ms, transform 350ms cubic-bezier(0, 0, 0, 2);
        }

        :is(
            .gadget.main_content.popup,
            .content_table,
            #gadgettable-top,
            #gadgettable-left,
            #gadgettable-center,
            #gadgettable-right
        ) a:not(:has(:is(
            span.prevHeroLinkImageLeft,
            span.nextHeroLinkImageRight,
            span.font_Hero_Name
        )))::after {
            content: "";
            position: absolute;
            bottom: 0px;
            left: 100%;
            width: 0;
            height: 1px;
            background: #ffffff;
            transition: width 350ms, left 350ms;
        }

        :is(
            .gadget.main_content.popup,
            .content_table,
            #gadgettable-top,
            #gadgettable-center,
            #gadgettable-right
        ) a:not(:has(:is(
            span.prevHeroLinkImageLeft,
            span.nextHeroLinkImageRight,
            span.font_Hero_Name
        )))::after {
            height: 1px;
        }

        :is(
            .gadget.main_content.popup,
            .content_table,
            #gadgettable-top,
            #gadgettable-left,
            #gadgettable-center,
            #gadgettable-right
        ) a:not(:has(:is(
            span.prevHeroLinkImageLeft,
            span.nextHeroLinkImageRight,
            span.font_Hero_Name
        ))):hover::after {
            left: 0;
            width: 100%;
            transition: width 350ms, left 0ms;
        }

        #gadgettable-left a span {
            transform: translateX(20px);
            transition: 350ms cubic-bezier(0, 0, 0, 2);
            transition-delay: 100ms;
        }

        #gadgettable-left a:hover span {
            transform: translateX(24px);
        }

        .changeHeroLink::after {
            display: none;
        }

        /* == 左侧菜单自适应，flex化 == */
        #gadgettable-left a:hover {
            transform: translateX(20%) scale(1.5);
        }

        #gadgettable-left #gadgettable-left-gadgets {
            padding-left: 10px;
        }

        #gadgettable-left .gadget_scroll .menu-vertical {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        #gadgettable-left .gadget_scroll .menu-vertical .menu-0-body {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        #gadgettable-left .gadget_scroll .menu-vertical .menu-0-body > * {
            overflow: hidden;
            box-sizing: border-box;
        }

        #gadgettable-left .gadget_scroll .menu-vertical .menu-1 {
            padding-bottom: 8px;
            padding-left: 4px;
        }

        #gadgettable-left .gadget_scroll .menu-vertical .menu-1:has(.menu-1-body) {
            padding-bottom: 0;
        }

        #gadgettable-left .gadget_scroll .menu-vertical .menu-1:has(.menu-1-caption) .menu-1-body {
            display: block !important;
            padding: 0;
            padding-top: 8px;
            padding-left: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.3s ease;
        }

        #gadgettable-left .gadget_scroll .menu-vertical .menu-1:has(.menu-1-caption.selected) .menu-1-body {
            max-height: 700px;
            padding: 8px;
        }

        .menu-1-arrow.open, .menu-2-arrow.closed.open {
            background: url(https://delta.world-of-dungeons.org/wod/css//skins/skin-8/images/page/navigate_down.png) no-repeat;
        }

        /* == 顶部菜单栏 == */
        #gadgettable-top {
            position: fixed;
            z-index: 999;
            width: 100%;
        }

        #gadgettable-top .background {
            background-color: #00000000;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0px 5px 10px 0px #000000;
        }

        #gadgettable-top :is(
            .border-top,
            .border-bottom,
            .border-left,
            .border-right
        ) {
            display: none;
        }

        #gadgettable-top .gadget_scroll {
            overflow-y: hidden;
        }

        #gadgettable-left,
        #gadgettable-center,
        #gadgettable-right {
            padding-top: 20px;
        }
    `;

    GM_addStyle(baseCSS);

    // 一次性初始化函数
    function initMenuStatesOnce() {
        const allMenus = document.querySelectorAll('.menu-1');
        const total = allMenus.length;

        if (total === 0) {
            console.log('[WoD美化] 未找到菜单元素');
            return;
        }

        let marked = 0;

        allMenus.forEach(menu => {
            const caption = menu.querySelector('.menu-1-caption');
            if (caption && menu.classList.contains('open')) {
                caption.classList.add('selected');
                marked++;
            }
        });

        console.log(`[WoD美化] 完成。检查了 ${total} 个菜单，标记了 ${marked} 个`);
    }

    // 在DOM就绪后执行一次
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenuStatesOnce);
    } else {
        setTimeout(initMenuStatesOnce, 50);
    }
})();