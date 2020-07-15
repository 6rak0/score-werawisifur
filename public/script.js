const socket = io()

const winBox = document.querySelector('.win');
const loseBox = document.querySelector('.lose');
const buttons = document.querySelectorAll('.btn');

socket.on('update', data => {
  winBox.innerText = data.win
  loseBox.innerText = data.lose
})

// handler function
function handleButtonClick(e) {
  const value = e.target.innerText;
  socket.emit(value)
}
// add event listener
buttons.forEach(button => button.addEventListener('click', handleButtonClick));

