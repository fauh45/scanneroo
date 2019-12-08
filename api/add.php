<?php
// Database load
include 'loaddb.php';

// Use for checking if already in DB
$exist = FALSE;

// Getting POST data
$EID = $_POST['EID'];
$QR = $_POST['QR'];

// Check if POST data empty
if (empty($EID) || empty($QR)) {
    echo '<h3 style="color:red;">Data Scan Kosong</h3>';
    exit();
}

// Prepare query
$query = "SELECT * FROM ".$EID." WHERE ID='".$QR."'";

// Query it into the DB
$result = mysqli_query($conn, $query);

// Check if exist
if (mysqli_num_rows($result) > 0) {
    $exist = TRUE;
}

// Fetch into array
$result = mysqli_fetch_array($result);

if ($exist == FALSE) {
    // Prepare query
    $query = "INSERT INTO ".$EID." (ID, time) VALUES ('".$QR."', '".date("d/m/Y H:i")." WIB')";

    // Query it to DB
    if (mysqli_query($conn, $query)) {
        echo '<h3 style="color:green;">Berhasil</h3>';
    }
    else
    {
        echo '<h3 style="color:red;">Query ke database gagal</h3>'.mysqli_error($conn);
    }
}
else
{
    echo '<h3 style="color:red";>Sudah di-scan pada '.$result['time'].'</h3>';
}

mysqli_close($conn);

?>