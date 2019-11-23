window.onload = function (ev) {
//自动填入
    $.ajax({
            url: "http://10.0.78.25:8624/goushushenpixitong/test/course",
            type: "GET",
            dataType: 'json',
            success: function (result) {
                if ("200" == result.code) {
                    var data = result.data;
                    for(var k in data){
                        var type = $("[name="+k+"]").attr("type");
                        $("textarea[name="+k+"]").val(data[k]);
                        if (type!=undefined&&type!=null) {
                            if(type=="text"){
                                if(data[k]!=""&&data[k]!=null){
                                    $("[name="+k+"]").val(data[k]);
                                }
                            }else if(type=="radio"){
                                if(data[k]!=""&&data[k]!=null){
                                    $("[name="+k+"][value="+data[k]+"]").attr("checked","true");
                                }
                            }else if(type=="checkbox"){
                                var ckeckboxVal = data[k];
                                if(ckeckboxVal!=""&&ckeckboxVal!=undefined&&ckeckboxVal!=null){
                                    if(ckeckboxVal.length==1){
                                        $("[name="+k+"][value="+ckeckboxVal+"]").attr("checked","true");
                                    }else{
                                        var str = ckeckboxVal.split(",");
                                        for (var i = 0; i < str.length; i++) {
                                            $("[name="+k+"][value="+str[i]+"]").attr("checked","true");
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
    );

    // console.log(Math.random());//随机数
    // console.log(new Date().getTime());//当前时间
    var oBtn = document.querySelector("#uploading");

    oBtn.onclick = function (ev1) {
        ajax("http://10.0.78.25:8624/goushushenpixitong/test/book",function (xhr) {
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


