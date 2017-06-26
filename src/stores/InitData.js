export default {
    /**
     * [homeReducer 主页]
     * @type {Object}
     */
    homeReducer:{

    },
    /**
     * [commonReducer 公共信息]
     * @type {Object}
     */
    commonReducer:{
        dialog:{
            type:''
        },
        menuTipState:{

        },
        toast:{
            errorText:''
        }
    },
    /**
     * [loginReducer 用户登录信息]
     * @type {Object}
     */
    loginReducer:{
        isRequest:false,
        userName:'',
        checkCode:'',
        errorText:'',
        count:0
    },
    /**
     * [menuReducer 菜单配置]
     * @type {Array}
     */
    menuReducer : [
        {
            id:'1',
            path:'/main/notify',
            title:'通知管理',
            iclass:'fa fa-ellipsis-v',
            child:[
                {
                    id:'1.1',
                    path:'/main/notify/send',
                    title:'发布通知'
                },
                {
                    id:'1.2',
                    path:'/main/notify/list',
                    title:'通知记录'
                }
            ]
        },
        {
            id:'2',
            path:'/main/temps',
            title:'模板管理',
            iclass:'fa fa-indent',
            active:false,
            child:[
                {
                    id:'2.1',
                    path:'/main/temps/edit',
                    title:'编辑模板'
                }
            ]
        },
        {
            id:'3',
            path:'/main/device',
            title:'设备管理',
            iclass:'fa fa-th',
            active:false,
            child:[
                {
                    id:'3.1',
                    path:'/main/device/mine',
                    title:'我的设备'
                }
            ]
        },
        {
            id:'10',
            path:'/main/setting',
            title:'个人中心',
            iclass:'fa fa-cog',
            active:true,
            child:[
                {
                    id:'10.1',
                    path:'/main/setting/profile',
                    title:'个人信息',
                    active:true,
                },
                {
                    id:'10.2',
                    path:'/main/setting/message',
                    title:'我的消息',
                    active:false
                },
            ]
        }
    ],
     /**
     * [deviceReducer 设备信息]
     * @type {Object}
     */
    deviceReducer:{
        cmd:{
        },
        list:[
        ],
        pages:[
        ],
        total:''
    },
    /**
     * [notifyReducer 通知信息]
     * @type {Object}
     */
    notifyReducer:{
        cmdSendNotify:{},
        cmd:{
        },
        list:[
        ],
        pages:[
        ],
        total:''
    },
    /**
     * [templateReducer 模板信息]
     * @type {Object}
     */
    templateReducer:{
        cmdEdit:{},
        currentTemplate:{
            id:0,
            img:{
                backUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496727467786&di=bb15569d24eae8376290d1294c09f576&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F94%2F90%2F45w58PIC7j6_1024.jpg',
                text:'cmcc'
            }
        },
        myTemplate:{
            id:0
        }
    },
    /**
     * [messageReducer 消息信息]
     * @type {Object}
     */
    messageReducer:{
        list:[
            {
                content:'少年强则中国强。沐浴着党的阳光，孩子们的童心被点亮，他们的前途和志向，将与祖国和人民紧紧联系在一起，在中华民族伟大复兴的新征程上，续写辉煌。',
                time:'2017-06-01 08:00',
                state:'已读'
            },
            {
                content:'默克尔举行隆重仪式欢迎李克强到访。',
                time:'2017-06-01 08:00',
                state:'未读'
            },
            {
                content:'天津港废纸堆发生大火 过火面积约1000平米。',
                time:'2017-06-01 08:00',
                state:'已读'
            }
        ],
        lastlist:[
            {
                content:'少年强则中国强。沐浴着党的阳光，孩子们的童心被点亮，他们的前途和志向，将与祖国和人民紧紧联系在一起，在中华民族伟大复兴的新征程上，续写辉煌。',
                time:'2017-06-01 08:00',
                state:'已读'
            },
            {
                content:'默克尔举行隆重仪式欢迎李克强到访。',
                time:'2017-06-01 08:00',
                state:'未读'
            },
            {
                content:'天津港废纸堆发生大火 过火面积约1000平米。',
                time:'2017-06-01 08:00',
                state:'已读'
            }
        ],
        pages:[
            {
                index:1,
                active:true
            },
            {
                index:2,
                active:false
            },
             {
                index:3,
                active:false
            },
             {
                index:4,
                active:false
            },
             {
                index:5,
                active:false
            },
             {
                index:6,
                active:false
            },
             {
                index:7,
                active:false
            }
        ]
    },
};
