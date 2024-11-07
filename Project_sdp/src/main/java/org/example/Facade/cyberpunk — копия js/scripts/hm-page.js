document.getElementById('toggleButton').addEventListener('click', function() {
    const allCards = document.querySelectorAll('.card');
    const hiddenCards = document.querySelectorAll('.card.hidden');
    const btnContent = this.querySelector('.btn__content1');
if (hiddenCards.length > 0) {
    hiddenCards.forEach(card => {
        card.classList.remove('hidden');  
});
btnContent.innerText = 'Less'; 
} else {
const halfLength = Math.floor(allCards.length / 4); 
    allCards.forEach((card, index) => {
        if (index > halfLength) {
            card.classList.add('hidden'); 
}
});
    btnContent.innerText = 'More'; 
}
});