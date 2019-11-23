$(function (){//在DOM加载完成后运行预定函数
    var url = "http://10.0.78.25:8624/goushushenpixitong/test/staff"//请求URL
    var laboratory;
    

    //分页查询专业记录
    $.get(url + "/list",
        {currentPage: 1, pageSize: 2},//参数类型
        function (json) {
            laboratory = json.data;

            for (var i = laboratory.length -1; i >=0; i--){
                 var id = laboratory[i].id;
                 var name = laboratory[i].name;
                 var majorId = laboratory[i].name;
                 var instituteId = laboratory[i].instituteId;
                 var tel = laboratory[i].tel;
                 var remarks = laboratory[i].remarks;
                 var pwd = laboratory[i].pwd;


                 $(".List table tbody").append(//在List标签添加输出json数据表格
                     "<tr>"+
                        "<td>" + id + "</td>" +
                        "<td>" + name + "</td>" +
                        "<td>" + majorId + "</td>" +
                        "<td>" + instituteId + "</td>" +
                        "<td>" + tel + "</td>" +
                        "<td>" + remarks + "</td>" +
                        "<td>" + pwd + "</td>" +
                     "</tr>"
                 );
            }
        }
    );

    //查询单条记录
    $("#getOne").click(function () {    //点击id = getOne标签执行
        var id = $("input[name='fixId']").val();
        console.log(id);

        $.get(url,
            {id: id},
            function (json) {
                console.log(json.data);
                var institute = json.data;

                $("input[name='id']").val(institute.id);
                $("input[name='name']").val(institute.name);
                $("input[name='name']").val(institute.majorId);
                $("input[name='instituteId']").val(institute.instituteId);
                $("input[name='name']").val(institute.tel);
                $("input[name='remarks']").val(institute.remarks);
                $("input[name='name']").val(institute.pwd);
            });

    });
    
     //添加人员
     $.post(url,
        {id: id, name: name, instituteId: instituteId, majorId: majorId,
         pwd: pwd, tel: tel, remarks: remarks},//相关参数
        function(data){
            alert("添加成功");
            console.log(data.id);
            console.log(data.name);
            console.log(data.instituteId);
            console.log(data.majorId);
            console.log(data.pwd);
            console.log(data.tel);
            console.log(data.remarks);
        },"json");

    //更新信息
    $.ajax({
        type: 'PUT',
        url: url,
        data: {id: id, name: name, instituteId: instituteId, majorId: majorId,
               pwd: pwd, tel: tel, remarks: remarks},//相关参数
        complete: function (json) {
            console.log(json.responseJSON);
            if (json.responseJSON.code == 200) {
                alert("修改成功");
                window.location.href = "#";//定位到要跳转的html文件
            }
        }
    });

    //删除人员
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