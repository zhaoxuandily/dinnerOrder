import {
    EDIT_TEMPLATE,
    RETURN_TEMPLATE,
    UPDATECURRENT_TEMPLATE,
    REQUEST_TEMP_EDIT,
    RECEIVE_TEMP_EDIT,
    REQUEST_GET_MYTEMP,
    RECEIVE_GET_MYTEMP,
    REQUEST_SEND_TEMP,
    RECEIVE_SEND_TEMP
} from '../actions/TemplateAction';


/*---start----*/

/**
 * [handleGetMyTemplate description]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function handleGetMyTemplate(state,action){
   return Object.assign({},state,{
        cmdEdit:action.info,
        myTemplate:action.res
    });
}
/**
 * [handleSendTemplate description]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function handleSendTemplate(state,action){
    return Object.assign({},state,{
        cmdEdit:action.info,
        myTemplate:action.res.backUrl ? action.res : state.myTemplate
    });
}
/**
 * [templateReducer 模板信息]
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export const  templateReducer = (state = [], action) => {
    switch (action.type) {
        case EDIT_TEMPLATE:
            return Object.assign({},state,{currentTemplate:{
                id:action.id,
                state:'edit'
            }});
        case RETURN_TEMPLATE:
            return Object.assign({},state,{currentTemplate:{}});
        case UPDATECURRENT_TEMPLATE:
            return Object.assign({},state,{currentTemplate:
                Object.assign({},state.currentTemplate,action.info)
            });
        case REQUEST_TEMP_EDIT:
        case RECEIVE_TEMP_EDIT:
            return Object.assign({},state,{cmdEdit:action.info});
        case REQUEST_GET_MYTEMP:
            return Object.assign({},state,{cmdEdit:action.info});
        case RECEIVE_GET_MYTEMP:
            return handleGetMyTemplate(state,action);
        case REQUEST_SEND_TEMP:
            return Object.assign({},state,{cmdEdit:action.info});
        case RECEIVE_SEND_TEMP:
            return handleSendTemplate(state,action);
        default:
            return state;
    }
};

/*---end----*/
