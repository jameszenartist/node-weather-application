// console.log("client side javascript file is loaded!");
// fetch("http://puzzle.mead.io/puzzle")
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
// fetch("http://localhost:3000/weather?address=boston")
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  messageOne.textContent = "Now Loading...";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        // console.log(data.location);
        messageOne.textContent = data.location;
        // console.log(data.forecast);
        messageTwo.textContent = data.forecast;
      }
    });
  search.value = "";
});
