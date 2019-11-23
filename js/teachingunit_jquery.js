$(function () {
    var url = "http://10.0.78.25:8624/goushushenpixitong/test/teachingunit";
    var laboratory;
    
    //分页获取开课教学单位审核条目
    $.get(url + "/list",
        {currentPage: 1, pageSize: 1000},
        function(json) {
            laboratory = json.data;

            for (var i = laboratory.length - 1; i >= 0; i--){
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

    //获取单条审核条目记录
    $("#getOne").click(function () {    //点击id = getOne标签执行
        //var id = $("input[name='fixId']").val(); 从input获取用户输入的id
        //console.log(id);

        $.get(url,
            {id: 2},
            function (json) {
                console.log(json.data);
                var institute = json.data;

                $("input[name='id']").val(institute.id);
                $("input[name='content']").val(institute.content);
                $("input[name='remarks']").val(institute.remarks);
            });

    });

    //添加开课教学单位审核结果
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

    //获取科研室审核结果
    $("#getOne").click(function () {
       

        $.get(url + "/opinions",
            function (json) {
                console.log(json.data);
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
    $("#amLaboratory").click(function () {
        var id = $("input[name='id']").val();
        var content = $("input[name='content']").val();
        var remarks = $("input[name='remarks']").val();

        $.ajax({
        type: 'PUT',
        url: url,
        data: {id:id, name: name, remarks: remarks},
        complete: function (json) {
            console.log(json.responseJSON);
            if (json.responseJSON.code == 200) {
                alert("修改成功");
                window.location.href = "#";//定位到要跳转的html文件
             }
            }
        });
    });

    //删除条目信息
    $("#delete").click(function () {
        var id = $("input[name='deleteId']").val();

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
        })
    });

    

    
    

});