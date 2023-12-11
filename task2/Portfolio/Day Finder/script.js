const date = document.getElementById("date");
const month = document.getElementById("month");
const year = document.getElementById("year");
const getDay = document.getElementById("getDay");
const result = document.getElementById("result");

getDay.addEventListener("click",()=>{
    let day = new Date(`${date.value} ${month.value} ${year.value}
    `);
    let kam = day.toString();
    kam = kam.slice(0,3);
    result.innerHTML = kam;
})