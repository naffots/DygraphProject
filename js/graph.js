function dateToTimestamp(x) {
      var dateparts = x.split(' ');
      var parts = dateparts[0].split('-');
      var hourparts = dateparts[1].split('.');
      var timeparts = hourparts[0].split(':');
      var newDate = new Date(parts[0],parts[1]-1,parts[2],timeparts[0],timeparts[1],timeparts[2]);
      return newDate.getTime();
};

g1 = new Dygraph(
  document.getElementById("graphdiv1"),
  "temp.php", // path to CSV file
  {
    delimiter: ";",
    labels: [ "Date", "Temp"],
    ylabel: "&deg;C",
    xValueParser: dateToTimestamp,
    axes: {
      x: {
        valueFormatter: Dygraph.dateString_,
        ticker: Dygraph.dateTicker
      }
    }
  }
);

g2 = new Dygraph(
  document.getElementById("graphdiv2"),
  "moisture.php", // path to CSV file
  {
    delimiter: ";",
    labels: [ "Date", "Humidity"],
    xValueParser: dateToTimestamp,
    ylabel: "Volt",
    axes: {
      x: {
        valueFormatter: Dygraph.dateString_,
        ticker: Dygraph.dateTicker
      }
    }
  }
);

