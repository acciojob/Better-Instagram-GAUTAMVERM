// Grab all the div elements with unique IDs
const divs = document.querySelectorAll('.image');

// Add event listeners for dragstart, dragover, and drop events
divs.forEach(div => {
  div.addEventListener('dragstart', handleDragStart);
  div.addEventListener('dragover', handleDragOver);
  div.addEventListener('drop', handleDrop);
});

let draggedElement = null;

// Handle the dragstart event
function handleDragStart(event) {
  draggedElement = event.target; // Store the dragged element
  event.target.style.opacity = '0.5'; // Make the dragged element semi-transparent
  event.dataTransfer.setData('text', event.target.id); // Store the ID of the dragged element
}

// Handle the dragover event (allowing the element to be dropped)
function handleDragOver(event) {
  event.preventDefault(); // Prevent the default to allow drop
}

// Handle the drop event
function handleDrop(event) {
  event.preventDefault();
  const droppedId = event.dataTransfer.getData('text'); // Get the ID of the dragged element
  const draggedElement = document.getElementById(droppedId); // Get the dragged element by ID

  // Only swap if the target is not the same as the dragged element
  if (event.target !== draggedElement) {
    // Swap the innerHTML (content) of the dragged element and the target element
    const targetContent = event.target.innerHTML;
    event.target.innerHTML = draggedElement.innerHTML;
    draggedElement.innerHTML = targetContent;

    // Optionally, you can swap background images or other content here
  }

  draggedElement.style.opacity = '1'; // Reset opacity of the dragged element
}