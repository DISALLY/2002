<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table
        {
            border-collapse: collapse;
            width: 1000px;
        }
        td,th{
            border:1px solid #000000;
        }
    </style>
</head>
<body>
<?php
 header("content-type:text/html;charset=utf-8");
 open_sql();
 function open_sql()
 {
     $sql = mysqli_connect("localhost", "root", "root", "game", "3306");
     if (mysqli_connect_errno()) return;
     $res=mysqli_query($sql,"DELETE FROM `user` WHERE `pid`=$_GET[pid]");
     show_list($sql);
 }
 function show_list($sql)
 {
     $res = mysqli_query($sql, "SELECT * FROM `user` WHERE 1");
     echo "<table>";
     for ($i = 0; $i < $res->num_rows; $i++) {
         $arr = mysqli_fetch_assoc($res);
         if($i===0){
             echo "<tr>";
             foreach($arr as $key=>$value){
                 echo "<th>";
                 echo $key;
                 echo "</th>";
             }
             echo "<th>删除</th>";
             echo "</tr>";
         }
         echo "<tr>";
         foreach ($arr as $key => $value) {
             echo "<td>";
             echo $value;
             echo "</td>";
         }
         echo "<td><form action='http://localhost:4010/delete.php' method='GET'><input type='text' name='pid' value={$arr['pid']} style='display:none'><button type='submit'>删除</button></form></td>";
         echo "</tr>";
     }
     echo "</table>";
 }
 ?>
</body>
</html>