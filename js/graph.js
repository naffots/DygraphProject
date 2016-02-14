function dateToTimestamp(x) {
      var dateparts = x.split(' ');
      var parts = dateparts[0].split('-');
      var hourparts = dateparts[1].split('.');
      var timeparts = hourparts[0].split(':');
      var newDate = new Date(parts[0],parts[1]-1,parts[2],timeparts[0],timeparts[1],timeparts[2]);
      return newDate.getTime();
};

function formatDate(d) {
        var yyyy = d.getFullYear(),
            mm = d.getMonth() + 1,
            dd = d.getDate();
        return yyyy + '-' + (mm < 10 ? '0' : '') + mm + (dd < 10 ? '0' : '') + dd;
};

tempFile = "temp.php";
moistureFile = "moisture.php";

g1 = new Dygraph(
  document.getElementById("graphdiv1"),
  tempFile, // path to CSV file
  {
    delimiter: ";",
    labels: [ "Date", "Temp"],
    xValueParser: dateToTimestamp,
    ylabel: "&deg;C",
    axes: {
      x: {
        valueFormatter: function(ms) {
          return Dygraph.dateString_(ms, false);
        }
      }
    }
  }
);

g2 = new Dygraph(
  document.getElementById("graphdiv2"),
  moistureFile, // path to CSV file
  {
    delimiter: ";",
    labels: [ "Date", "Humidity"],
    xValueParser: dateToTimestamp,
    ylabel: "Volt",
    axes: {
      x: {
        valueFormatter: function(ms) {
          return Dygraph.dateString_(ms, false);
        }
      }
    }
  }
);

setInterval(function() {
  g1.updateOptions( { 'file': tempFile } );
  g2.updateOptions( { 'file': moistureFile } );
}, 60000);
