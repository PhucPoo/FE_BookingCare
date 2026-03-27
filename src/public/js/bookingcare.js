const list = document.querySelector(".partners-list");
const slides = document.querySelectorAll(".partner-card");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");
const progressBar = document.querySelector(".progress-bar");

let currentIndex = 0;

function updateSlider() {
  list.style.transform = `translateX(-${currentIndex * 100}%)`;

  // update progress bar
  let progress = ((currentIndex + 1) / slides.length) * 100;
  progressBar.style.width = progress + "%";
}

// Nút phải
rightBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

// Nút trái
leftBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

// Khởi tạo
updateSlider();
