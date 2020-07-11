<?php
header("Content-Type: text/html;charset=utf-8");
include './../conectar.php';
$tables  =getTablesByPublic();
echo json_encode($tables);
exit;

?>