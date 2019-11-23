$(function (){//在DOM加载完成后运行预定函数
    var url = "http://10.0.78.25:8624/goushushenpixitong/test/deanoffice"//请求URL
    var laboratory;
    

    //分页获取教务处审核条目
    $.get(url + "/list",
        {currentPage: 1, pageSize: 2},//参数类型
        function (json) {
            laboratory = json.data;

            for (var i = laboratory.length -1; i >=0; i--){
                 var id = laboratory[i].id;
                 var content = laboratory[i].content;
                 var remarks = laboratory[i].remarks;


                 $(".List table tbody").append(//在List标签添加输出json数据表格
                     "<tr>"+
                        "<td>" + id + "</td>" +
                        "<td>" + content + "</td>" +
                        "<td>" + remarks + "</td>" +
                     "</tr>"
                 );
            }
        }
    );
    // //获取单条审核条目记录
    $("#getOne").click(function () {    //点击id = getOne标签执行
        var id = $("input[name='fixId']").val();
        console.log(id);

        $.get(url,
            {id: id},
            function (json) {
                console.log(json.data);
                var institute = json.data;

                $("input[name='id']").val(institute.id);
                $("input[name='content']").val(institute.content);
                $("input[name='remarks']").val(institute.remarks);
            });

    });

    //添加审核条目
    $("#amLaboratory").click(function () {
        var id = $("input[name='id']").val();
        var content = $("input[name='content']").val();
        var remarks = $("input[name='remarks']").val();

        $.post(url,
            {id: id, content: content, remarks: remarks},//相关参数
            function(data){
                alert("添加成功");
                console.log(data.id);
                console.log(data.content);
                console.log(data.remarks);
            },"json");

    });



    //更新条目信息 
    $.ajax({
        type: 'PUT',
        url: url,
        data: {id:id, content: content, remarks: remarks},
        complete: function (json) {
            console.log(json.responseJSON);
            if (json.responseJSON.code == 200) {
                alert("修改成功");
                window.location.href = "#";//定位到要跳转的html文件
            }
        }
    });

    //删除条目
    $("#delete").click(function () {
        var id = $("input[name='deleteId']").val();
        // console.log(id);

        $.ajax({
            type: 'DELETE',
            url: url,
            data: {id: id},
            complete: function (json) {
                console.log(json.responseJSON);
                if (json.responseJSON.code == 200) {
                    alert("删除成功");
                    window.location.href = "#";//定位到要跳转的html文件
                }
            }
        });

    });

}); 