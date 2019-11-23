$(function(){
    var url = "http://10.0.78.25:8624/goushushenpixitong/test/term"//请求URL
    var laboratory;
     //查询学期单条记录
    $.get(url,
        {id: 2},//参数类型
        function(json){
            laboratory = json.data;

            for(var i = laboratory.length - 1; i >=0; i--){
                var id = laboratory[i].id;
                var name = laboratory[i].name;
                var remarks = laboratory[i].remarks;


                $(".List table tbody").append(//在List标签添加输出json数据表格
                    "<tr>"+
                       "<td>" + id + "</td>" +
                       "<td>" + name + "</td>" +
                       "<td>" + remarks + "</td>" +
                    "</tr>"
                );
            }
        }
    ); 
})