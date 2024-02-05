//Important arrays
const galeryImages = [
  {src: "./assets/gallery/image1.jpg", alt: "Thumbnail Image 1"},
  {src: "./assets/gallery/image2.jpg", alt: "Thumbnail Image 2"},
  {src: "./assets/gallery/image3.jpg", alt: "Thumbnail Image 3"},
]
//RightMenu
function menuHandler() {
  document
    .querySelector("#open-nav-menu")
    .addEventListener("click", function () {
      document.querySelector("header nav .wrapper").classList.add("nav-open")
    })

  document
    .querySelector("#close-nav-menu")
    .addEventListener("click", function () {
      document.querySelector("header nav .wrapper").classList.remove("nav-open")
    })
}

function calculateTemperature(temperature) {
  let fahr = temperature * 1.8 + 32
  return fahr
}
//Greating text
function greetingHandler() {
  let currentHour = new Date().getHours()
  let greetingText

  if (currentHour < 12) {
    greetingText = "Good Morinig!"
  } else if (currentHour < 18) {
    greetingText = "Good Afternoon!"
  } else if (currentHour < 24) {
    greetingText = "Good Night!"
  } else {
    ;("Greetings!")
  }
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
}

//Header part

//Clock and time
function clockHendler() {
  setInterval(function () {
    let dataTime = new Date()
    document.querySelector("span[data-time=hours]").textContent = dataTime
      .getHours()
      .toString()
      .padStart(2, "0")

    document.querySelector("span[data-time=minutes]").textContent = dataTime
      .getMinutes()
      .toString()
      .padStart(2, "0")

    document.querySelector("span[data-time=seconds]").textContent = dataTime
      .getSeconds()
      .toString()
      .padStart(2, "0")
  }, 1000)
}

//Gallery and thumbnails
//<img src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1" data-array-index="0" data-selected="true">
function galleryHendler() {
  let mainImage = document.querySelector("#gallery > img")
  let thumbnails = document.querySelector("#gallery .thumbnails")

  mainImage.src = galeryImages[0].src
  mainImage.alt = galeryImages[0].alt

  //<img src="./assets/gallery/image2.jpg" alt="Thumbnail Image 2" data-array-index="1" data-selected="false">

  galeryImages.forEach(function (image, index) {
    let thumb = document.createElement("img")
    thumb.src = image.src
    thumb.alt = image.alt
    thumb.dataset.arrayIndex = index
    thumb.dataset.selected = index === 0 ? true : false

    thumb.addEventListener("click", function (e) {
      let selectedIndex = e.target.dataset.arrayIndex
      let selectedImage = galeryImages[selectedIndex]
      mainImage.src = selectedImage.src
      mainImage.alt = selectedIndex.alt

      thumbnails.querySelectorAll("img").forEach(function (img) {
        img.dataset.selected = false
      })

      e.target.dataset.selected = true
    })
    thumbnails.appendChild(thumb)
  })
}

//PageLoud
menuHandler()
clockHendler()
greetingHandler()
galleryHendler()
