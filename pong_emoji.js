const titulo = document.getElementById("titulo")

let emoji = 0
var intervalo = setInterval( function Emoji()

{
    
    if (emoji == 0) {
        titulo.innerHTML = "Ping-pong! -■---"}
    else if (emoji == 1){
        titulo.innerHTML = "Ping-pong! --■--"}
    else if (emoji == 2){
        titulo.innerHTML = "Ping-pong! ---■-"}
    else if (emoji == 3){
        titulo.innerHTML = "Ping-pong! ----■"}
    else if (emoji == 4){
        titulo.innerHTML = "Ping-pong! ■----"
        emoji = -1}
    emoji += 1
    
}, 1000)    
