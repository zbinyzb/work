$(function(){
    var url = "http://10.0.78.25:8624/goushushenpixitong/test/subject";
    var laboratory;      
    
    //查询所有课程用书信息
    $.get(url + "/list",
        {currentPage: 1, pageSize: 5},
        function (json){
            laboratory = json.data;

            for (var i = laboratory.length - 1; i >=0; i--){
                var id = laboratory[i].id;
                var courserId = laboratory[i].courserId;
                var termId = laboratory[i].termId;
                var bookId = laboratory[i].bookId;
                var remarks = laboratory[i].remarks;

                $(".List table tbody").append(
                    "<tr>" +
                    "<td>" + id + "</td>" +
                    "<td>" + courserId + "</td>" +
                    "<td>" + termId + "</td>" +
                    "<td>" + bookId + "</td>" +
                    "<td>" + remarks + "</td>" +
                    +"<td></td>" +
                    "</tr>"
                );
            }
        }
    );

    //查询单条记录
    $("#getOne").click(function () {
        var id = $("input[name='fixId']").val();    //检索匹配类的标签
        console.log(id);
       
        $.get(url,
            {id: id},
            function (json) {
                console.log(json.data);
                var institute = json.data;

                $("input[name='id']").val(institute.id);
                $("input[name='termId']").val(institute.termId);
                $("input[name='bookId']").val(institute.bookId);
                $("input[name='remarks']").val(institute.remarks);
            });

    });

    //添加
    $.post(url,
        {id: id, termId: termId, bookId: bookId, courserId: courserId,
         remarks: remarks},//相关参数
        function(data){
            alert("添加成功");
            console.log(data.id);
            console.log(data.termId);
            console.log(data.bookId);
            console.log(data.courserId);
            console.log(data.remarks);
        },"json");

    //更新
    $.ajax({
        type: 'PUT',
        url: url,
        data: {id: id, termId: termId, bookId: bookId, courserId: courserId,
               remarks: remarks},//相关参数
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


