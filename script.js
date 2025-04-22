document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('drop', drop);
        item.addEventListener('dragend', dragEnd);
    });
    
    let draggedItem = null;
    
    function dragStart(e) {
        draggedItem = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        // Use setData to make drop work in Firefox
        e.dataTransfer.setData('text/html', this.innerHTML);
    }
    
    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    
    function dragEnter(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    }
    
    function dragLeave() {
        this.classList.remove('drag-over');
    }
    
    function drop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        // Don't do anything if we drop on the same item we're dragging
        if (draggedItem !== this) {
            // Swap background images
            const draggedBg = draggedItem.style.backgroundImage;
            const targetBg = this.style.backgroundImage;
            
            draggedItem.style.backgroundImage = targetBg || getComputedStyle(this).backgroundImage;
            this.style.backgroundImage = draggedBg || getComputedStyle(draggedItem).backgroundImage;
        }
    }
    
    function dragEnd() {
        this.classList.remove('dragging');
        // Remove drag-over class from all items in case any were left in that state
        gridItems.forEach(item => {
            item.classList.remove('drag-over');
        });
    }
});