<?php
$server = "localhost";
$usr = "root";
$pass = "";
$db = "scanneroo";

$conn = mysqli_connect($server, $usr, $pass, $db);

if (!$conn) {
    die("Connection failed".mysqli_connect_error());
}

date_default_timezone_set("Asia/Bangkok");

?>