<html>
<head>
<style>
table {
    width: 100%;
    border-collapse: collapse;
}

table, td, th {
    border: 1px solid black;
    padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
// Database load
include 'loaddb.php';

// Getting POST data
$EID = $_POST['EID'];

// Getting the data
$sql="SELECT * FROM ".$EID;
$result = mysqli_query($conn,$sql);

echo "<table>
<tr>
<th>ID</th>
<th>Time</th>
</tr>";
while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['ID'] . "</td>";
    echo "<td>" . $row['time'] . "</td>";
    echo "</tr>";
}
echo "</table>";
mysqli_close($conn);
?>
</body>
</html>