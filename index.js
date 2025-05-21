// Giphy API key //

//external source, Giphy API
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
//DOM manipulation
const gifBtn = document.getElementById("gif-button");
const gifInput = document.getElementById("gif-input");
const displayDiv = document.getElementById("add-gif");
const removeBtn = document.getElementById("remove");
const errorMessage = document.createElement("div");
const err = document.createElement("p");
//add an event listener to gif-button when user searchs for a gif
gifBtn.addEventListener("click", function (e) {
  err.innerHTML = "";
  errorMessage.innerHTML = "";
  e.preventDefault();
  retrieveGiphy();
});

//Event Handling for removal of gifs on web page
removeBtn.addEventListener("click", function (e) {
  const removeAllGifs = document.querySelectorAll(".gif-image");
  for (let i = 0; i < removeAllGifs.length; i++) {
    removeAllGifs[i].remove();
  }
});

//Impplemented aysnchronous function that uses axios to get data from Giphy API and returns a promise for
//further data manipulation
async function retrieveGiphy() {
  try {
    //get user input from data entered in the input field
    const userInput = gifInput.value;
    if (!userInput) {
      return;
    }
    //axios returns a promise
    const response = await axios.get(
      `http://api.giphy.com/v1/gifs/search?q=${userInput}&api_key=${giphyApiKey}`
    );
    //once response is recieved and promise is fulfilled, manipulate response.data.data array
    const gif_arr = response.data.data;

    //generate a random index into the gif_arr to display a random gif image
    const randIdx = Math.floor(Math.random() * gif_arr.length);
    const gifImage = gif_arr[randIdx].images.original.url;

    //Display user input as a gif from search button into an img tag
    const newDiv = document.createElement("img");
    newDiv.src = gifImage;
    newDiv.classList.add("gif-image");
    displayDiv.appendChild(newDiv);
    //clear user input from input field
    gifInput.value = "";
  } catch (error) {
    //error handling for enhanced usability
    errorMessage.innerHTML = "Error -->";
    err.innerHTML = error;
    errorMessage.classList.add("error");
    err.classList.add("error");
    //display error on web page as text
    displayDiv.appendChild(errorMessage);
    displayDiv.appendChild(err);
  }
}
