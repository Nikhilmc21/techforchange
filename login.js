let loglink = document.querySelector(".loglink");
let signlink = document.querySelector(".signlink");
let signForm = document.querySelector(".signForm");
let loginForm = document.querySelector(".loginForm");
const lcanvas = document.querySelector(".lcanvas");
const scanvas = document.querySelector(".scanvas");

if (window.innerWidth > 700) {
  signlink.addEventListener("click", (e) => {
    signForm.style.setProperty("animation", "slideUpIn 1s ease-in-out");
    signForm.style.setProperty("transform", "translateY(0%)");
    loginForm.style.setProperty("animation", "slideDownOut 1s ease-in-out");
    loginForm.style.setProperty("transform", "translateY(-200%)");
    lcanvas.style.setProperty("animation", "slideUpOut 1s ease-in-out");
    scanvas.style.setProperty("animation", "slideDownIn 1s ease-in-out");
  });

  loglink.addEventListener("click", (e) => {
    loginForm.style.setProperty("animation", "slideUpIn 1s ease-in-out");
    loginForm.style.setProperty("transform", "translateY(0%)");
    signForm.style.setProperty("animation", "slideDownOut 1s ease-in-out");
    signForm.style.setProperty("transform", "translateY(200%)");
    lcanvas.style.setProperty("animation", "slideDownIn 1s ease-in-out");
    scanvas.style.setProperty("animation", "slideUpOut 1s ease-in-out");
  });
} else {
  signlink.addEventListener("click", (e) => {
    loginForm.style.setProperty("animation", "slideUpOut 1s ease-in-out");
    signForm.style.setProperty("animation", "slideUpIn 1s ease-in-out");
    loginForm.style.setProperty("transform", "translateY(200%)");
    signForm.style.setProperty("transform", "translateY(0%)");
  });

  loglink.addEventListener("click", (e) => {
    signForm.style.setProperty("animation", "slideDownOut 1s ease-in-out");
    loginForm.style.setProperty("animation", "slideDownIn 1s ease-in-out");
    signForm.style.setProperty("transform", "translateY(-200%)");
    loginForm.style.setProperty("transform", "translateY(0%)");
  });
}

const images = [
  "https://images.unsplash.com/photo-1687201364205-6ec23f194c9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1687190521215-1aef26f5b2da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1687201363617-f2f6eee77c26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
]; // Replace with your image URLs

let currentIndex = 0;
let intervalId;

function setBackgroundImage(element, imageUrl) {
  element.style.backgroundImage = `url(${imageUrl})`;
  element.style.backgroundSize = "cover";
  element.style.backgroundPosition = "center";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  setBackgroundImage(lcanvas, images[currentIndex]);
  setBackgroundImage(scanvas, images[currentIndex]);
}

function startSlideshow(intervalTime) {
  setBackgroundImage(lcanvas, images[currentIndex]);
  setBackgroundImage(scanvas, images[currentIndex]);
  intervalId = setInterval(nextImage, intervalTime);
}

startSlideshow(3000);