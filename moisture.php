<?php
/**
 * Simple example of extending the SQLite3 class and changing the __construct
 * parameters, then using the open method to initialize the DB.
 */
class MyDB extends SQLite3
{
    function __construct()
    {
        $this->open('measurements.db');
    }
}

$db = new MyDB();

header('Content-Type: text/csv; charset=utf-8');

// create a file pointer connected to the output stream
$output = fopen('php://output', 'w');

$query = "SELECT * FROM measurements WHERE date > '" . date("Y-m-d H:i:s", strtotime('-1 week', time())) . "'";                                                                                          
$result = $db->query($query);
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
      fwrite($output, $row["date"] . ";" . $row["moisture"] . "\n");
}
fclose();
?>
