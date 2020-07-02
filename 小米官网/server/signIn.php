<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
</head>

<body>
<?php
header("content-type:text/html;charset=utf-8");
open_sql();
function open_sql(){
       //数据库链接(地址，用户名，密码，库名，端口号)
        $sql=mysqli_connect("localhost","root","root","game","3306");
        //获取当前是否连接上数据库，如果返回一就是没有连接上
        if(mysqli_connect_errno()) return;
        //使用MySql语句 mysqli_query(打开的数据库对象，“MySQL语句”)
        $res=mysqli_query($sql,"SELECT * FROM `user` WHERE `user`='$_POST[user]'");
        // $res->num_rows  表示查询到的结果有多少条
        if($res->num_rows>0){
            //从结果中取出第一条数据，变为数组，这个数组中含有索引数据和关联数据两条
            //$arr=mysqli_fetch_array($res);
            //从结果中取出第一条数据，变为数组，这个数组关联数组
            $arr=mysqli_fetch_assoc($res);
            if($arr["password"]===$_POST["password"]){
                //echo "用户名和密码正确";
                $user=$arr["user"];
                echo "<script>
                     location.href='http://127.0.0.1:5500/小米官网/index.html?id=$user';
                     alert ('登陆成功');
                    </script>";
            }else{
                echo "密码错误";
            }
            
        }else{
            echo "<script>
            location.href='http://127.0.0.1:5500/小米官网/signin.html';
            alert ('没找到该用户名');
           </script>";
        }
    }
   
    ?>
</body>

</html>