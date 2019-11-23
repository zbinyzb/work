$(function(){
    var url = "http://10.0.78.25:8624/goushushenpixitong/test/book";
    var laboratory;      
    
    //查询所有课程用书信息
    $.get(url + "/list",
        {currentPage: 1, pageSize: 2},
        function (json){
            laboratory = json.data;

            for (var i = laboratory.length - 1; i >=0; i--){
                var id = laboratory[i].id;
                var name = laboratory[i].name;
                var author = laboratory[i].author;
                var publisher = laboratory[i].publisher;
                var publishDate = laboratory[i].publishDate;
                var edition = laboratory[i].edition;
                var nation = laboratory[i].nation;
                var type = laboratory[i].type;
                var purpose = laboratory[i].purpose;
                var levelId = laboratory[i].levelId;
                var price = laboratory[i].price;
                var renew = laboratory[i].renew;
                var remarks = laboratory[i].remarks;

                $(".List table tbody").append(
                    "<tr>" +
                    "<td>" + id + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + author + "</td>" +
                    "<td>" + publisher + "</td>" +
                    "<td>" + publishDate + "</td>" +
                    "<td>" + edition + "</td>" +
                    "<td>" + nation + "</td>" +
                    "<td>" + type + "</td>" +
                    "<td>" + purpose + "</td>" +
                    "<td>" + levelId + "</td>" +
                    "<td>" + price + "</td>" +
                    "<td>" + renew + "</td>" +
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
                $("input[name='name']").val(institute.name);
                $("input[name='author']").val(institute.author);
                $("input[name='publisher']").val(institute.publisher);
                $("input[name='publishDate']").val(institute.publishDate);
                $("input[name='edition']").val(institute.edition);
                $("input[name='nation']").val(institute.nation);
                $("input[name='type']").val(institute.type);
                $("input[name='purpose']").val(institute.purpose);
                $("input[name='levelId']").val(institute.levelId);
                $("input[name='price']").val(institute.price);
                $("input[name='renew']").val(institute.renew);
                $("input[name='remarks']").val(institute.remarks);
            });

    });

    //添加
    $.post(url,
        {id: id, name: name, author: author, publisher: publisher,
         publishDate: publishDate, edition: edition, nation: nation, type: type,
         purpose: purpose, levelId: levelId, price: price, renew: renew,
         remarks: remarks},//相关参数
        function(data){
            alert("添加成功");
            console.log(data.id);
            console.log(data.name);
            console.log(data.author);
            console.log(data.publisher);
            console.log(data.publishDate);
            console.log(data.edition);
            console.log(data.nation);
            console.log(data.type);
            console.log(data.purpose);
            console.log(data.levelId);
            console.log(data.price);
            console.log(data.renew);
            console.log(data.remarks);
        },"json");

    //更新
    $.ajax({
        type: 'PUT',
        url: url,
        data:  {id: id, name: name, author: author, publisher: publisher,
                publishDate: publishDate, edition: edition, nation: nation, type: type,
                purpose: purpose, levelId: levelId, price: price, renew: renew,
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

    //获取科研室审核结果
    $.post(url,
            
            function (json) {
                if (json.code == 200) {
                    alert("获取科研室审核结果");
                    window.location.href = "#";//定位到要跳转的html文件
                    
                }
            })

    //添加教务处审核结果
    $.ajax({
        type: 'PUT',
        url: url,
        
        complete: function (json) {
            console.log(json.responseJSON);
            if (json.responseJSON.code == 200) {
                alert("添加成功");
                window.location.href = "#";     //定位到要跳转的html文件
            }
        }
    });


});


