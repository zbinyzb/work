$(function () {
    var url = "http://10.0.78.25:8624/goushushenpixitong/test/course";
    var laboratory;
    
    //查询所有课程信息
    $.get(url + "list",
        {currentPage: 1 , pageSize: 5},
        function (json) {
            laboratory = json.data;

            for (var i = laboratory.length -1; i >= 0; i--){
                var id = laboratory[i].id;
                var termId = laboratory[i].termId;
                var name = laboratory[i].name;
                var period = laboratory[i].period;
                var usableRange = laboratory[i].usableRange;
                var studentNum = laboratory[i].studentNum;
                var teacherNum = laboratory[i].teacherNum;
                var principalId = laboratory[i].principalId;
                var remarks = laboratory[i].remarks;

                $(".List table tbody").append(
                    "<tr>" +
                    "<td>" + id + "</td>" +
                    "<td>" + termId + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + period + "</td>" +
                    "<td>" + usableRange + "</td>" +
                    "<td>" + studentNum + "</td>" +
                    "<td>" + teacherNum + "</td>" +
                    "<td>" + principalId + "</td>" +
                    "<td>" + remarks + "</td>" +
                    +"<td></td>" +
                    "</tr>"
                );
            }
        });
        //查询单条记录
        $("#getOne").click(function () {
            var id = $("input[name='fixId']").val();    //检索匹配类的标签
            var termId = $("input[name='fixtermId']").val();
            console.log(id);
            console.log(termId);
    
            $.get(url,
                {id: id, termId: termId},
                function (json) {
                    console.log(json.data);
                    var institute = json.data;
    
                    $("input[name='id']").val(institute.id);
                    $("input[name='termId']").val(institute.termId);
                    $("input[name='period']").val(institute.period);
                    $("input[name='credit']").val(institute.credit);
                    $("input[name='usableRange']").val(institute.usableRange);
                    $("input[name='studentNum']").val(institute.studentNum);
                    $("input[name='teacherNum']").val(institute.teacherNum);
                    $("input[name='principalId']").val(institute.principalId);
                    $("input[name='remarks']").val(institute.remarks);
                });
    
        });

        //添加
        $.post(url,
            {id: id, termId: termId, name: name, period: period,credit: credit,
             usableRange: usableRange, studentNum: studentNum, teacherNum: teacherNum,
             principalId: principalId, remarks: remarks},//相关参数
            function(data){
                alert("添加成功");
                console.log(data.id);
                console.log(data.name);
                console.log(data.remarks);
            },"json");

        //更新
        $.ajax({
            type: 'PUT',
            url: url,
            data: {id: id, termId: termId, name: name, period: period,credit: credit,
                   usableRange: usableRange, studentNum: studentNum, teacherNum: teacherNum,
                   principalId: principalId, remarks: remarks},//相关参数
            complete: function (json) {
                console.log(json.responseJSON);
                if (json.responseJSON.code == 200) {
                    alert("修改成功");
                    window.location.href = "#";     //定位到要跳转的html文件
                }
            }
        });

        //删除
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
                    window.location.href = "#";     //定位到要跳转的html文件
                }
            }
        });

    });

    

});