//某一条或者多条加入密码列表
export const ADD_TO_PASSWORD = 'ADD_TO_PASSWORD'

//更新某一条密码信息
export const UPDATE_TO_PASSWORD = 'UPDATE_TO_PASSWORD'

//更新当前选中的密码状态
export const UPDATE_TO_PASSWORD_TYPE = 'UPDATE_TO_PASSWORD_TYPE'

//当前编辑的密码数据
export const EDIT_TO_PASSWORD = 'EDIT_TO_PASSWORD'

//当密码类型改变时，先删除之前所在类型的密码数据（纯粹是为了兼容element-ui表格刷新的bug）
export const DELETE_OLD_PASSWORD = 'DELETE_OLD_PASSWORD';