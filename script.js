//your code here
let draggedDiv = null;

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".image");

  images.forEach((img) => {
    img.addEventListener("dragstart", (e) => {
      draggedDiv = e.target;
      e.target.classList.add("selected");
    });

    img.addEventListener("dragover", (e) => {
      e.preventDefault(); // Necessary to allow drop
    });

    img.addEventListener("drop", (e) => {
      e.preventDefault();

      if (draggedDiv && draggedDiv !== e.target) {
        // Swap the background images
        const temp = draggedDiv.style.backgroundImage;
        draggedDiv.style.backgroundImage = e.target.style.backgroundImage;
        e.target.style.backgroundImage = temp;
      }
    });

    img.addEventListener("dragend", (e) => {
      e.target.classList.remove("selected");
    });
  });
});