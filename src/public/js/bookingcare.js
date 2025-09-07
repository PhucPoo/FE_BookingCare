const list = document.querySelector('.partners-list');
const btnLeft = document.querySelector('.arrow.left');
const btnRight = document.querySelector('.arrow.right');

btnLeft.addEventListener('click', () => {
  list.scrollBy({ left: -200, behavior: 'smooth' });
});
btnRight.addEventListener('click', () => {
  list.scrollBy({ left: 200, behavior: 'smooth' });
});
