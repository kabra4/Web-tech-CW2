var countDownDate = new Date(document.getElementById("deadline").innerHTML).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  if (distance < 0) document.getElementById("timeLeft").innerHTML = "Passed";
  else {
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("timeLeft").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
  }

  // Time calculations for days, hours, minutes and seconds

}, 1000);

document.getElementById("putOff").onclick = () => {
  let x = document.getElementById("putOffForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
