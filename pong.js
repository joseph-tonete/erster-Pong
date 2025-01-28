// Componentes atualizáveis:
const b1 = document.getElementById("bar1")
const b2 = document.getElementById("bar2")
const text1 = document.getElementById("score1")
const text2 = document.getElementById("score2")
const bola = document.getElementById("bola")
// Componentes estáticos:
const title = document.getElementById("titulo")
// Componentes sonóros:
const lose1 = new Audio('audio/lose1.mp3')
const lose2 = new Audio('audio/lose2.mp3')

let vel_bar = 0.12 // velocity of the movement of the bars
let vel_xy = 0.15 // velocity of the ball in the hipotenusa of the yx triangle
let vel_y = 0 // velocity of the ball in y
let vel_x = 1 // direction of the ball in the x axis
let pos_b1 = 45 // initial position of bar1
let pos_b2 = 45 // initial position of bar2
let ball_x = 49 // initial position of ball in x
let ball_y = 49 // initial position of ball in y
let pos_max = 10 // margin of the player
let pos_min = -2 // margin of the player
let pontuation1 = 0
let pontuation2 = 0
let key_up = 0 //key pressed up
let key_down = 0 //key pressed down
let variation = 0 // Position of the bar
let start = false
let start2 = true
let seg = 0
let encostar_dir = false
let encostar_esq = false
let musica = [

    'Fa','Do','La','Do',
    'Fa','Do','La','Do',
    'Mi','Do','La','Do',
    'Mi','Do','La','Do',
    'Re','Sib','Sol','Sib',
    'Re','Sib','Sol','Sib',
    'Re','Sib','Dog','Sib',
    'Sol','Mig'
    
]

let w = false //87
let s = false // 83
let o = false // 79
let l = false // 76
let esq1 = false // 27
let esq2 = false

// The code in the coment below gets and shows any key pressed in the keybord
//let alert_key = document.addEventListener("keydown", (e) => alert(e.keyCode))

let up = document.addEventListener("keyup", (e) => key_up = e.keyCode)
let down = document.addEventListener("keydown", (e) => key_down = e.keyCode)





var loop = setInterval(function Loop(){
       
    // Identificação dos inputs
    
    Teclagem()
    // Movimentação das barras
    if (start == true)
    {

    if(esq1 == true)
    {
        start = false
        start2 = false
        document.getElementById("start").innerHTML = "Pause"
        document.getElementById("filter").style.backdropFilter = "grayscale(100%)"    
        esq2 = true
    }

    if (pos_b1 <= 86 && s == true) {pos_b1 += vel_bar}
    if (pos_b1 >= 4 && w == true) {pos_b1 -= vel_bar}
    if (pos_b2 <= 86 && l == true) {pos_b2 += vel_bar}
    if (pos_b2 >= 4 && o == true) {pos_b2 -= vel_bar}

    // Cálculo da velocidade

    seg += 1
    if(seg > 100)
    {
        seg = 0
        if(vel_xy > 0 && vel_xy <= 0.3) {vel_xy = (0.001) + vel_xy}
        if(vel_xy < 0 && vel_xy >= -0.3) {vel_xy = -(0.001) + vel_xy}       
    }
    
    b1.style.margin = pos_b1 + "vh auto 0px 1vw"
    b2.style.margin = pos_b2 + "vh 1vw 0px auto"

    }

    if(start2 == true)
    {

    bola.style.margin = ball_y + "vh 0px 0px " + ball_x + "vw"

    let hip = vel_xy ** 2 - vel_y ** 2
    if (hip < 0) {hip = -hip}
    ball_y += vel_y
    ball_x += hip ** 0.5 * vel_x

    //detecção das bordas do y

    if (ball_y <= 4) {vel_y = -vel_y
    musiquinha()}
    if (ball_y >= 95) {vel_y = -vel_y
    musiquinha()}


    // Verificar direita:
    if (ball_x >= 97 && ball_x <= 98 && ball_y < pos_b2 + pos_max && ball_y > pos_b2 + pos_min)
    {
        if (encostar_dir == false)
        {

        let variation = ball_y - pos_b2 - 4
        if (variation < 0) {vel_y += ((variation) / 5) * vel_xy / 2}
        else if (variation > 0) {vel_y += (variation) / 5 * vel_xy / 2}
        if (vel_y >= vel_xy / 2) {vel_y = vel_xy / 2}

        vel_x = -vel_x

        encostar_dir = true
        encostar_esq = false
        if(start == true){musiquinha()}
        }
    }
    else if (ball_x >= 99)
    {
        lose1.play()
        reset_()
        vel_x = -1
        pontuation1 += 1
        text1.innerHTML = pontuation1
    }

    // Verificar esquerda:
    if (ball_x <= 2 && ball_x >= 1 && ball_y < pos_b1 + pos_max && ball_y > pos_b1 + pos_min)
    {
        if (encostar_esq == false)
        {

        let variation = ball_y - pos_b1 - 4
        if (variation < 0) {vel_y += ((variation) / 5) * vel_xy / 2}
        else if (variation > 0) {vel_y += (variation) / 5 * vel_xy / 2}
        if (vel_y >= vel_xy / 2) {vel_y = vel_xy / 2}

        vel_x = -vel_x

        encostar_esq = true
        encostar_dir = false
        if(start == true){musiquinha()}
        }
    }
    else if (ball_x <= 0)
    {
        lose2.play()
        reset_()
        vel_x = 1
        pontuation2 += 1
        text2.innerHTML = pontuation2
    }

    }

}, 0)

function Teclagem(){
    
    if(key_down == 87){
        w = true
    } 
    if(key_up == 87){
        w = false
        key_down = 0
        key_up = 0
    }

    if(key_down == 83){
        s = true
    } 
    if(key_up == 83){
        s = false
        key_down = 0
        key_up = 0
    }

    if(key_down == 79){
        o = true
    } 
    if(key_up == 79){
        o = false
        key_down = 0
        key_up = 0
    }

    if(key_down == 76){
        l = true
    } 
    if(key_up == 76){
        l = false
        key_down = 0
        key_up = 0
    }

    if(key_down == 32){
        startclick()
    }
    if(key_up == 32){
        key_down = 0
        key_up = 0
    }
    
    if(key_down == 27){
        esq1 = true
    }
    if(key_up == 27){
        esq1 = false
        key_down = 0
        key_up = 0
    }
}

function startclick() {
    start = true
    start2 = true
    document.getElementById("start").innerHTML = ""
    document.getElementById("filter").style.backdropFilter = "none"
    document.getElementById("button").style.display = "none"
}

function reset_() {
    vel_y = 0
    vel_xy = 0.1
    pos_b1 = 45
    pos_b2 = 45
    ball_x = 49
    ball_y = 49
    encostar_dir = false
    encostar_esq = false
    ordem_notas = 0
}

let ordem_notas = 0
function musiquinha()
{
    if(musica.length < ordem_notas + 1)
    {
        ordem_notas = 0
    }
    let nota = new Audio('audio/'+musica[ordem_notas]+'.m4a')
    nota.play()
    ordem_notas += 1
}
