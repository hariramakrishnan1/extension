const slider = document.getElementById("speed_slider");
const slider_value = document.getElementById("speed_slider_value");

slider_value.textContent = (parseInt(slider.value)/100).toString();

slider.addEventListener('input',() => {
    slider_value.textContent = (parseInt(slider.value)/100).toString();
})

addEventListener('mousemove',e => {
    document.getElementById('a').innerHTML = `${e.clientX} ${e.clientY}`
})