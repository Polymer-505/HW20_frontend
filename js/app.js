const galleryImages = document.querySelectorAll(".image");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
let currentIndex = 0;

const updateModalImage = (index) => {
  currentIndex = index;
  modalImg.src = galleryImages[currentIndex].src;
};

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    updateModalImage(index);
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

document.addEventListener("keydown", (e) => {
  if (modal.style.display !== "block") return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateModalImage(currentIndex);
  } else if (e.key === "ArrowLeft") {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModalImage(currentIndex);
  } else if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

const input = document.querySelector("#controls input");
const renderBtn = document.querySelector('[data-action="render"]');
const destroyBtn = document.querySelector('[data-action="destroy"]');
const boxesContainer = document.querySelector("#boxes");

function getRandomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function createBoxes(amount) {
  const elements = [];
  let size = 30;

  for (let i = 0; i < amount; i++) {
    const div = document.createElement("div");
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.backgroundColor = getRandomRgbColor();
    div.style.marginTop = "10px";

    elements.push(div);
    size += 10;
  }

  boxesContainer.append(...elements);
}

function destroyBoxes() {
  boxesContainer.innerHTML = "";
}

renderBtn.addEventListener("click", () => {
  const amount = Number(input.value);
  if (amount > 0 && amount <= 100) {
    createBoxes(amount);
  } else {
    alert("Будь ласка, введіть число від 1 до 100");
  }
});

destroyBtn.addEventListener("click", destroyBoxes);
