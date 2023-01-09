const enddate = document.querySelector(".enddate")
const clock = document.querySelector(".clock")
let timeInterval;
let timestop = true;
const savedvalue = localStorage.getItem("countdown") || false
if(savedvalue){
    startClock(savedvalue);
    let inputvalue = new Date(savedvalue)
    enddate.valueAsDate = inputvalue
}
enddate.addEventListener("change", function(e){
    e.preventDefault()
    clearInterval(timeInterval)
    const temp = new Date(enddate.value)
    localStorage.setItem("countdown",temp)
    startClock(temp)
    timestop = true
})
function startClock(t){
    function updatecounter(){
        let tl = (timeleft(t))
        if(tl.total <= 0){
            timestop = false
        }
        for(let pro in tl){
            let el = clock.querySelector("." + pro)
            if(el){
                el.innerHTML = tl[pro]
            }
        }
    }
    updatecounter()
    if(timestop){
        timeInterval = setInterval(updatecounter,1000)
    }
    else{
        clearInterval(timeInterval)
    }
}

function timeleft(t){
    let currentdate = new Date()
    let d = Date.parse(t) - Date.parse(currentdate)
    let seconds = Math.floor((d/1000) % 60)
    let minutes = Math.floor((d/1000/60) % 60)
    let hours = Math.floor((d/ (1000*60*60)) % 24)
    let days = Math.floor(d/(1000*60*60*24))

    return{
"total" : d,
"days" : days,
"hours" : hours,
"minutes" : minutes,
"seconds" : seconds
     }
}