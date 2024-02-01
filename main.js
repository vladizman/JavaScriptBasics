//Menu section

document.querySelector("#open-nav-menu").addEventListener("click", function () {
  document.querySelector("header nav .wrapper").classList.add("nav-open")
})

document
  .querySelector("#close-nav-menu")
  .addEventListener("click", function () {
    document.querySelector("header nav .wrapper").classList.remove("nav-open")
  })

//Header part
function calculateTemperature(temperature) {
  let fahr = temperature * 1.8 + 32
  return fahr
}

const greetingText = "Good Night!"
const weatherCondition = "Sunny"
const userLocation = "Chisinau"
let temperature = 22
let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(
  1
)}°C outside.`

let fehrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${calculateTemperature(
  temperature
).toFixed(1)}°C outside.`

document.querySelector("#greeting").innerHTML = greetingText
document.querySelector("p#weather").innerHTML = celsiusText

document
  .querySelector(".weather-group")
  .addEventListener("click", function (e) {
    if (e.target.id == "celsius") {
      document.querySelector("p#weather").innerHTML = celsiusText
    } else if (e.target.id == "fahr") {
      document.querySelector("p#weather").innerHTML = fehrText
    }
  })
