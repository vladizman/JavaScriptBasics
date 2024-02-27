const WeatherApiKey = "9dec45844ee9b2853a1281e6e99cd276"
const WeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`

//Important arrays
const galeryImages = [
  {src: "./assets/gallery/image1.jpg", alt: "Thumbnail Image 1"},
  {src: "./assets/gallery/image2.jpg", alt: "Thumbnail Image 2"},
  {src: "./assets/gallery/image3.jpg", alt: "Thumbnail Image 3"},
]

const products = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png",
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35,
    image: "./assets/products/img1.png",
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    image: "./assets/products/img2.png",
  },
  {
    title: "Black Dog",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png",
  },
  {
    title: "My Little Robot",
    author: "Pedro Paulo",
    price: 0,
    image: "./assets/products/img5.png",
  },
  {
    title: "Garden Girl",
    author: "Ankit Patel",
    price: 45,
    image: "./assets/products/img4.png",
  },
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
  document.querySelector("#greeting").innerHTML = greetingText
}

//weatherText
function handleFooter() {
  let currentYear = new Date().getFullYear()

  document.querySelector(
    "footer"
  ).textContent = `©${currentYear} - All rights reserved`
}
function weatherHandler() {
  navigator.geolocation.getCurrentPosition(position => {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    let url = WeatherApiURL.replace("{lat}", latitude)
      .replace("{lon}", longitude)
      .replace("{API key}", WeatherApiKey)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const condition = data.weather[0].description
        const location = data.name
        let temperature = data.main.temp

        let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(
          1
        )}°C outside.`

        let fehrText = `The weather is ${condition} in ${location} and it's ${calculateTemperature(
          temperature
        ).toFixed(1)}°C outside.`

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
      })
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

//Product Menu
function populateProducts(productList) {
  let productsSection = document.querySelector(".products-area")
  productsSection.textContent = ""

  //maping the products
  productList.forEach(function (product, index) {
    //creating the div for Products
    let productElm = document.createElement("div")
    productElm.classList.add("product-item")

    //creating the image inside the div
    let productImage = document.createElement("img")
    productImage.src = product.image
    productImage.alt = "image for : " + product.title

    //creating the productTitle
    let productDetails = document.createElement("div")
    productDetails.classList.add("product-details")
    //create product title, author, price-title and price
    let productTitle = document.createElement("h3")
    productTitle.classList.add("product-title")
    productTitle.textContent = product.title

    let productAuthor = document.createElement("p")
    productAuthor.classList.add("product-author")
    productAuthor.textContent = product.author

    let priceTitle = document.createElement("p")
    priceTitle.classList.add("price-title")
    priceTitle.textContent = "price"

    let productPrice = document.createElement("p")
    productPrice.classList.add("product-price")
    productPrice.textContent =
      product.price > 0 ? "$" + product.price.toFixed(2) : "free"

    //append the product details
    productDetails.append(productTitle)
    productDetails.append(productAuthor)
    productDetails.append(priceTitle)
    productDetails.append(productPrice)

    //add all child HTML elemets to the product
    productElm.append(productImage)
    productElm.append(productDetails)

    //add complete individual product to the product section
    productsSection.append(productElm)
  })
}

function productsHandler() {
  //creating a vari

  let freeProducts = products.filter(item => !item.price || item.price <= 0)

  let paidProducts = products.filter(item => item.price > 0)

  populateProducts(products)

  document.querySelector(
    ".products-filter label[for=all] span.product-amount"
  ).textContent = products.length

  document.querySelector(
    ".products-filter label[for=paid] span.product-amount"
  ).textContent = paidProducts.length

  document.querySelector(
    ".products-filter label[for=free] span.product-amount"
  ).textContent = freeProducts.length

  let productsFilter = document.querySelector(".products-filter")
  productsFilter.addEventListener("click", function (e) {
    if (e.target.id === "all") {
      populateProducts(products)
    } else if (e.target.id === "paid") {
      populateProducts(paidProducts)
    } else if (e.target.id === "free") {
      populateProducts(freeProducts)
    }
  })
}

//<footer>©2023 - All rights reserved</footer>

//PageLoud
menuHandler(),
  clockHendler(),
  greetingHandler(),
  weatherHandler(),
  galleryHendler(),
  productsHandler(),
  handleFooter()
