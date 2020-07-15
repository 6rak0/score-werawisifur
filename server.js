const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const PORT = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketio(server)

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

let total = {win:0,lose:0}

//on socket connection
io.on('connection', socket => {
  socket.on('win+', () =>{
    total.win++
    io.emit('update', total)
  })
  socket.on('win-', () =>{
    total.win--
    io.emit('update', total)
  })
  socket.on('lose+', () =>{
    total.lose++
    io.emit('update', total)
  })
  socket.on('lose-', () =>{
    total.lose--
    io.emit('update', total)
  })
  socket.on('reset', () => {
    total.win = 0
    total.lose = 0
    io.emit('update', total)
  })
})

server.listen(PORT, () => console.log(`Server running in port ${PORT}`))