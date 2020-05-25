const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value; //The + here is to convert a string to a number
populateUI();

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("Selected Seats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("Index of Movie");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //This creates a node list of the seat,
  //This is why we can use the .length array function.

  //To store in Local storage
  const seatIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("Selected Seats", JSON.stringify(seatIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Save selected movie index and price for local storage
function setMovieData(index, MoviePrice) {
  localStorage.setItem("Index of Movie", JSON.stringify(index));
  localStorage.setItem("Price of Movie", JSON.stringify(MoviePrice));
}
//change movie
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value; //The + here is to convert a string to a number
  setMovieData(e.target.selectedIndex, e.target.value);
  return updateSelectedCount();
});

//seats container
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    return updateSelectedCount();
  }
  e.preventDefault();
});

// initial count and total
updateSelectedCount();
