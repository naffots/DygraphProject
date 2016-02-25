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

header('Content-Type: text/csv; charset=utf-8');

$type = $_GET["type"];
$offset = $_GET["offset"];

$filename = $type . "_" . $offset . ".csv";

// create a file pointer connected to the output stream
$output = fopen('php://output', 'w');


if (file_exist($filename) && (filemtime($filename) > (time() - 60 * 5)))
{
  // Our cache is fresh, return file
  $output = file_get_contents($filename);
}
else 
{
  $db = new MyDB();

  $query = "SELECT * FROM measurements WHERE date > '" . date("Y-m-d H:i:s", strtotime($offset, time())) . "'";
  $result = $db->query($query);

  while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    fwrite($output, $row["date"] . ";" . $row[$type] . "\n");
  }
  
  // Update cached file
  file_put_contents($filename, $output, LOCK_EX);
}

fclose($output);
?>
