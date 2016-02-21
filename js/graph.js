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

tempFile = "measurements.php?type=temperature&offset=-3%20days";
moistureFile = "measurements.php?type=moisture&offset=-1%20week";

g1 = new Dygraph(
  document.getElementById("graphdiv1"),
  tempFile, // path to CSV file
  {
    delimiter: ";",
    labels: [ "Date", "Temp"],
    xValueParser: dateToTimestamp,
    color: "#FF4040",
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
    color: "#4AABFF",
    xValueParser: dateToTimestamp,
    ylabel: "Volt",
    fillGraph: true,
    axes: {
      x: {
        valueFormatter: function(ms) {
          return Dygraph.dateString_(ms, false);
        }
      }
    }
  }
);

var target_g1 = document.getElementById("graphdiv1");
var target_g2 = document.getElementById("graphdiv2");
var spinner_g1 = new Spinner().spin(target_g1);
var spinner_g2 = new Spinner().spin(target_g2);


g1.ready(function () {
  spinner_g1.stop();
});

g2.ready(function () {
  spinner_g2.stop();
});


setInterval(function() {
  g1.updateOptions( { 'file': tempFile } );
  g2.updateOptions( { 'file': moistureFile } );
}, 60000);

// Add listeners to buttons
document.getElementById("temp_days").onclick = function() {
  tempFile = "measurements.php?type=temperature&offset=-3%20days"; 
  g1.updateOptions( { 'file': tempFile } );
};

document.getElementById("temp_weeks").onclick = function() {
  tempFile = "measurements.php?type=temperature&offset=-3%20weeks"; 
  g1.updateOptions( { 'file': tempFile } );
};

document.getElementById("temp_months").onclick = function() {
  tempFile = "measurements.php?type=temperature&offset=-3%20months"; 
  g1.updateOptions( { 'file': tempFile } );
};

// Add listeners to moisture buttons
document.getElementById("moist_days").onclick = function() {
  moistureFile = "measurements.php?type=moisture&offset=-3%20days"; 
  g2.updateOptions( { 'file': moistureFile } );
};

document.getElementById("moist_weeks").onclick = function() {
  moistureFile = "measurements.php?type=moisture&offset=-3%20weeks"; 
  g2.updateOptions( { 'file': moistureFile } );
};

document.getElementById("moist_months").onclick = function() {
  moistureFile = "measurements.php?type=moisture&offset=-3%20months"; 
  g2.updateOptions( { 'file': moistureFile } );
};






