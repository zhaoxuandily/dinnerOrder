/*
 * action 类型
 */
export const MENU_FIRST_NAV = 'MENU_FIRST_NAV';
export const MENU_SECOND_NAV = 'MENU_SECOND_NAV';


/*
 * 其它的常量
 */

/*
 * action 创建函数
 */

/**
 * [menuFirstNav 菜单一级导航]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
export function menuFirstNav(firstItem) {
    return {
        type: MENU_FIRST_NAV,
        firstItem
    };
}

/**
 * [menuSecondNav 菜单二级导航]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
export function menuSecondNav(firstItem, secondItem) {
    return {
        type: MENU_SECOND_NAV,
        firstItem,
        secondItem
    };
}
