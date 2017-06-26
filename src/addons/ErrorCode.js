/*
 * 错误码表
 */
let ErrorCode = {
    3:'用户不存在或者密码错误',
    7:'参数错误',
    4416:'不在白名单中',
    500:'服务器内部错误',
    501:'用户不存在',
    2013:'删除通知错误',
    /*adpater*/
    4201: 'json格式不合法',
    4202: 'appkey不存在',
    4203: 'appkey已存在',
    4204: 'appkey 环境未配置',
    4205: 'front环境未配置',
    /*ess-control*/
    5001: '申请短信超过次数',
    5002: '参数不合法',
    5003: '超过有效期，请重新登录',
    5004: '申请验证码过于频繁（1分钟）',
    5005: '不是超级管理员，不具备操作权限',
    5006: '当前设备已有普通管理员',
    5007: '用户当前请求是非法请求（token不匹配）',
    5008: '用户当前操作超时（token失效）',
    5009: '用户短信验证码超时',
    5010: '用户短信验证码无效',
    5015: '验证码错误',
    5020: '网关已被绑定',
    5021: '不是该网关管理员',
     /*ess-portal*/
    6001: 'PORTAL用户验证码在相应时间内失效（5分钟内）',
    6002: 'PORTAL用户不能超过最大申请次数',
    6003: 'PORTAL用户不能重复申请验证码（1分钟内）',
    6004: '将PORTAL ID存入ESS失败',
    6005: '从ESS中取PORTAL失败',
    6006: 't_portal_module表中对应的module_id不存在',
    6007: '查询portal_module_info失败',
    /*web*/
    50000: '参数不合法',
    50001: '未建立连接',
    50002: '账号未登录',
    50003: '当前浏览器不支持跨域请求,请换用其他浏览器',
    50004: '当前浏览器不支持异步上传文件,请换用其他浏览器',
    50005: '文件上传失败'
};

export default ErrorCode;