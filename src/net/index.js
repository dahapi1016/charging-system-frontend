import axios from "axios";
import { ElMessage } from "element-plus";

const defaultError = () => ElMessage.error('发生了一些错误，请联系管理员')
const defaultFailure = (code, message) => ElMessage.warning(code + ':' + message)

function internalPost(api, data, headers, success, failure = defaultFailure, error = defaultError) {  // 这里data是前端向后端发送的请求内容
    axios.post(api, data, {
        headers: headers,
        withCredentials: true
    }).then(({data}) => {  // 这里data的属性对应于后端向前端返回的Result<T>的属性，有code(网络状态码)，message(具体信息)，data(具体数据)
        if(data.code == 200)
            success(data.data, data.message)
        else
            failure(data.code, data.message)
    }).catch(error)
}

function internalGet(api, headers, success, failure = defaultFailure, error = defaultError) {
    axios.get(api, {
        headers: headers,
        withCredentials: true
    }).then(({data}) => {
        if(data.code == 200)
            success(data.data, data.message)
        else
            failure(data.code, data.message)
    }).catch(error)
}

function post(api, data, success, failure = defaultFailure, error = defaultError) {
    internalPost(api, data, {'Authorization': `Bearer ${localStorage.getItem('token')}`}, success, failure, error)
}

function get(api, success, failure = defaultFailure, error = defaultError) {
    internalGet(api, {'Authorization': `Bearer ${localStorage.getItem('token')}`}, success, failure, error)
}

function login(data) {
    internalPost('/api/user/login', data, {'Content-Type': 'application/x-www-form-urlencoded'}, (data, message) => {
        ElMessage.success(message);
        localStorage.setItem('token', data.token);  // token存到localStorage
    })
}

export { get, post, login }