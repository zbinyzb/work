window.onload = function (ev) {
    var url = "http://10.0.78.25:8624/goushushenpixitong/test/course";
    // console.log(Math.random());//随机数
    // console.log(new Date().getTime());//当前时间
    var oBtn = document.querySelector("#uploading");

    oBtn.onclick = function (ev1) {
        ajax("url",function (xhr) {
            alert("连接成功");
        }, function (xhr) {
            alert("连接失败");
        })
    }
}
function ajax(url, success, error) {
    //1.创建一个异步对象
    var xmlhttp = new XMLHttpRequest();
    //2.设置请求方式和请求地址
    /*
    method: 请求的类型：GET 或 POST
    url: 文件在服务器上的位置
    async: true(异步) 或 false(同步)
     */
    xmlhttp.open("POST",url,true);
    //3.发送请求
    xmlhttp.send();
    //4.监听状态的变化
    xmlhttp.onreadystatechange = function (ev2) {
        /*
        0: 请求未初始化
        1：服务器连接已提交
        2：请求已接收
        3：请求处理中
        4：请求已完成，且响应已就绪
         */
        if (xmlhttp.readyState === 4){
            if (xmlhttp.status >= 200 && xmlhttp.status <300 ||
                xmlhttp.status === 304){
                //5.处理返回的结果
                // console.log("接收到服务器的数据");
                success(xmlhttp);
            }
            else {
                // console.log("没有接收到服务器的数据")
                error(xmlhttp);
            }
        }

    }
}