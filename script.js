document.addEventListener('DOMContentLoaded', function() {
    // Create mapping between dragX and divX identifiers
    const elementsMap = {};
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        // Map both ID types for easy lookup
        elementsMap[item.id] = item;
        elementsMap[item.dataset.id] = item;
        
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
        
        if (draggedItem !== this) {
            // Swap the inner HTML (images) of the dragged and dropped elements
            const draggedContent = draggedItem.innerHTML;
            draggedItem.innerHTML = this.innerHTML;
            this.innerHTML = draggedContent;
        }
    }
    
    function dragEnd() {
        this.classList.remove('dragging');
        gridItems.forEach(item => {
            item.classList.remove('drag-over');
        });
    }

    // Make elements accessible via both ID types in tests
    window.testElements = elementsMap;
});