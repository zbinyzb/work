$(function (){//在DOM加载完成后运行预定函数
    var url = "http://10.0.78.25:8624/goushushenpixitong/test/role"//请求URL
    var laboratory;
    

    //查询所有人员的角色信息
    $.get(url + "/list",
        {currentPage: 1, pageSize: 2},//参数类型
        function (json) {
            laboratory = json.data;

            for (var i = laboratory.length -1; i >=0; i--){
                 var id = laboratory[i].id;
                 var type = laboratory[i].type;
                 var remarks = laboratory[i].remarks;


                 $(".List table tbody").append(//在List标签添加输出json数据表格
                     "<tr>"+
                        "<td>" + id + "</td>" +
                        "<td>" + type + "</td>" +
                        "<td>" + remarks + "</td>" +
                     "</tr>"
                 );
            }
        }
    );

    //查询某个工号的所有角色信息
    $("#getOne").click(function () {    //点击id = getOne标签执行
        var id = $("input[name='fixId']").val();
        console.log(id);

        $.get(url,
            {id: id},
            function (json) {
                console.log(json.data);
                var institute = json.data;

                $("input[name='id']").val(institute.id);
                $("input[name='type']").val(institute.type);
                $("input[name='remarks']").val(institute.remarks);
            });

    });
    
     //添加角色记录
     $.post(url,
        {id: id, type: type, remarks: remarks},//相关参数
        function(data){
            alert("添加成功");
            console.log(data.id);
            console.log(data.type);
            console.log(data.remarks);
        },"json");

    //更新信息
    $.ajax({
        type: 'PUT',
        url: url,
        data: {id:id, type: type, remarks: remarks},
        complete: function (json) {
            console.log(json.responseJSON);
            if (json.responseJSON.code == 200) {
                alert("修改成功");
                window.location.href = "#";//定位到要跳转的html文件
            }
        }
    });

    
}); 