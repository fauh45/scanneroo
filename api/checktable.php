<?php
// Database load
include 'loaddb.php';

// Getting POST data
$EID = $_POST['EID'];

// Check if POST data empty
if (empty($EID)) {
    echo 'Data Kosong';
    exit();
}

// Prepare query
$query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='".$db."' AND TABLE_NAME='".$EID."'";

// Query it into the DB
$result = mysqli_query($conn, $query);

// Check if exist
if (mysqli_num_rows($result) > 0) {
    echo "Ada";
}
else {
    echo "Tidak";
}

mysqli_close($conn);

?>