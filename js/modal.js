const modal = document.getElementById('modal');

const modalFunctions = {
    show: function() {
        modal.style.opacity = 1;
        modal.style.visibility = 'visible';
    },

    hide: function() {
        modal.style.opacity = 0;
        modal.style.visibility = 'hidden';    
    }
}

export { modalFunctions };