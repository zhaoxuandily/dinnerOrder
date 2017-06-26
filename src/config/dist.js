'use strict';

import baseConfig from './base';

let config = {
    appEnv: 'dev',  // feel free to remove the appEnv property here
    appkey:'122223vv',
    appkey_password:'123456',
    adapterUrl:'http://dt.littlec.site:8201/adapter/client/getConfig',
    project:''
};

export default Object.freeze(Object.assign({}, baseConfig, config));
