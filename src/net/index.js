import axios from "axios";
import { ElMessage } from "element-plus";
import router from '../router';

const defaultFailure = (code, message) => {
    if (code === 400) {
        ElMessage.error(message)
    } else {
        ElMessage.warning(code + ':' + message)
    }
}

function internalPost(api, data, headers, success, failure = defaultFailure) {  // 这里data是前端向后端发送的请求内容
    axios.post(api, data, {
        headers: headers,
        withCredentials: true
    }).then(({data}) => {  // 这里data的属性对应于后端向前端返回的Result<T>的属性，有code(网络状态码)，message(具体信息)，data(具体数据)
        if(data.code == 200)
            success(data.data, data.message)
        else
            failure(data.code, data.message)
    }).catch(err => {
        // 尝试从错误响应中获取后端返回的错误信息
        if (err.response && err.response.data) {
            const responseData = err.response.data;
            failure(responseData.code || 500, responseData.message || '未知错误');
        } else {
            ElMessage.error('请求失败，请检查网络连接');
        }
    })
}

function internalGet(api, headers, success, failure = defaultFailure) {
    axios.get(api, {
        headers: headers,
        withCredentials: true
    }).then(({data}) => {
        if(data.code == 200)
            success(data.data, data.message)
        else
            failure(data.code, data.message)
    }).catch(err => {
        // 尝试从错误响应中获取后端返回的错误信息
        if (err.response && err.response.data) {
            const responseData = err.response.data;
            failure(responseData.code || 500, responseData.message || '未知错误');
        } else {
            ElMessage.error('请求失败，请检查网络连接');
        }
    })
}

function post(api, data, success, failure = defaultFailure) {
    internalPost(api, data, {'Authorization': `Bearer ${localStorage.getItem('token')}`}, success, failure)
}

function get(api, success, failure = defaultFailure) {
    internalGet(api, {'Authorization': `Bearer ${localStorage.getItem('token')}`}, success, failure)
}

function login(data, failure = defaultFailure) {
    internalPost('/api/user/login', data, {'Content-Type': 'application/json'}, (responseData, message) => {
        // ElMessage.success(message);
        localStorage.setItem('token', responseData.token);  // token存到localStorage

        // 根据用户类型跳转到不同页面
        if(responseData.userInfo.role === 'ADMIN') {
            router.push('/admin/index');
        } else {
            router.push('/user/index');
        }
    }, failure)
}

export { get, post, login }