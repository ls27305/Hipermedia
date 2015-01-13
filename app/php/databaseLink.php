<?php
	$q = intval($_GET['q']);

	$con = mysqli_connect('localhost','hiper_db_user','');
	if (!$con) {
	    die('Could not connect: ' . mysqli_error($con));
	    console.log("pene");
	}

	mysqli_select_db($con,"hipermedia_v1");
	$sql="SELECT * FROM album ";
	$result = mysqli_query($con,$sql);

	echo "<table>
	<tr>
	<th>id_album</th>
	<th>name_album</th>
	</tr>";
	while($row = mysqli_fetch_array($result)) {
	    echo "<tr>";
	    echo "<td>" . $row['id_album'] . "</td>";
	    echo "<td>" . $row['name_album'] . "</td>";
	    echo "</tr>";
	}
	echo "</table>";
	mysqli_close($con);
?>