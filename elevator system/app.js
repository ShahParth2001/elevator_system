const submit = document.querySelector(".form")
const maxFloor = document.getElementById("floor")
const maxPerson = document.getElementById("person")


const panel = document.querySelector(".panel")
if(panel){
    panel.addEventListener("click", function(e){
        if(!localStorage.getItem("maxPerson")){
            alert("Please go through the configuration first...")
            e.preventDefault()
        }
    })
}

if(submit){
    submit.addEventListener("submit", function(){
        localStorage.setItem("maxFloor", maxFloor.value)
        localStorage.setItem("maxPerson", maxPerson.value)
        alert("Configuration is done successfully...")
    })
}

const config_reset = document.querySelector(".config-reset")
if(config_reset){
    config_reset.addEventListener("click", function(){
        localStorage.removeItem("maxPerson")
        localStorage.removeItem("maxFloor")
    })
}

const value = document.querySelector(".value")
const direction = document.querySelector(".direction")
const personSize = document.querySelector("#personSize")
let flag = 0

const reset = document.querySelector(".reset")
if(reset){
    reset.addEventListener("click", function(){
        state.textContent = "";
        direction.value = 'up'
        clearInterval(timer)
        value.textContent = 0
        flag = 0
    })
}

const state = document.querySelector(".status")
const getMaxFloor = localStorage.getItem("maxFloor")
const getMaxPerson = localStorage.getItem("maxPerson")

if(document.querySelector("#floor"))
    document.querySelector("#floor").value = getMaxFloor
if(document.querySelector("#person"))
    document.querySelector("#person").value = getMaxPerson

let timer = null
const start = document.querySelector(".start")
if(start){
    start.addEventListener("click", function(){
        if(flag == 0){
            if(personSize.value <= 0){
                state.textContent = "Minimum 1 person required to use elevator..."
                return
            }
            else if(personSize.value>getMaxPerson){
                state.textContent = `Maximum person allowed: ${getMaxPerson} `
                return
            }
            else if(value.textContent==0 && direction.value == 'down'){
                state.textContent = "Elevator is already at ground floor..."
                return
            }
            else if(value.textContent == getMaxFloor && direction.value == 'up'){
                    state.textContent = "Elevator is already at top floor..."
                    return
            }   
            else{
                flag = 1
                if(direction.value == 'up'){
                    state.textContent = "going up..."
                    timer = setInterval(() => {
                        value.textContent++
                        if(value.textContent == getMaxFloor){
                            state.textContent = "elevator reached at top floor..."
                            flag = 0
                            clearInterval(timer)}
                    }, 2000);
                }
                else{
                    state.textContent = "going down..."
                    timer = setInterval(() => {
                        value.textContent--
                        if(value.textContent == 0){
                            flag = 0
                            state.textContent = "elevator reached at ground floor..."
                            clearInterval(timer)}
                    }, 2000);
                }
            }
        }
    })
}
const stop = document.querySelector(".stop")
if(stop){
    stop.addEventListener("click", function(){
        state.textContent = "";
        flag = 0
        clearInterval(timer)
    })
}
