const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const amorpm = document.getElementById("amorpm");

function kamal(){
    const date = new Date();
    let hoursp = date.getHours();
    let minutesp = date.getMinutes();
    let secondsp = date.getSeconds();
    let amorpms;
    
    hours.textContent = hoursp;
    minutes.textContent = minutesp;
    seconds.textContent = secondsp;

    if(hours>=0||hours<=12){
        amorpms = "AM"
    }
    else{
        amorpms = "PM"
    }
    amorpm.textContent = amorpms;

}
setInterval(kamal,1000);