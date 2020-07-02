<?php
header("content-type:text/html;charset=utf-8");
open_sql();
function open_sql(){
    // 数据库连接(地址，用户名，密码，库名，端口号)
   $sql=mysqli_connect("localhost","root","root","game","3306");
//    获取当前是否连接上数据库 如果返回为1就是没有连接上
    if(mysqli_connect_errno()) return;
    // 使用MySql语句 mysqli_query(打开的数据库对象,"MySQL语句")
    $res=mysqli_query($sql,"SELECT * FROM `user` WHERE `user`='$_POST[user]'");
    // $res->num_rows  表示查询到的结果有多少条
    if($res->num_rows>0){
        echo "<script>
            location.href='http://127.0.0.1:5500/小米官网/signUp.html';
            alert('用户名重复，请重新输入');
         </script>";
         return;
    }
    $result=mysqli_query($sql,"INSERT INTO `user`(`user`, `password`, `name`, `age`, `sex`, `tel`, `email`) VALUES ('$_POST[user]','$_POST[password]','$_POST[name]',$_POST[age],'$_POST[sex]','$_POST[tel]','$_POST[email]')");
    if($result){
        echo "<script>
            location.href='http://127.0.0.1:5500/小米官网/signIn.html';
            alert('注册成功，请登录');
        </script>";
    }
}