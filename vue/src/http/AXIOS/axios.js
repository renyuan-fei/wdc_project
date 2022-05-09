import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
});

service.interceptors.request.use(
    function(config) {
        // 发送请求前会做的事情
        return config;
    },
    function(error) {
        // 请求错误要做的事情
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    function(response) {
        // 2xx的状态码会激活的函数
        return response;
    },
    function(error) {
        // 非2xx状态码会激活的函数
        return Promise.reject(error);
    }
);

export default service;