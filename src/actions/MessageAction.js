/*
 * action 类型
 */
export const NAV_PAGE = 'NAV_PAGE';

/*
 * 其它的常量
 */

/*
 * action 创建函数
 */


/**
 * [menuSecondNav 菜单二级导航]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
export function navPage(page) {
    return {
        type: NAV_PAGE,
        page
    };
}
