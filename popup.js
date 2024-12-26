function changecolor(){
    let color_ = getComputedStyle(document.getElementById("h")).color;
    let colors  = color_.match(/\d+/g).map(color => parseInt(color));
    let hexstring = colors[0].toString(16).padStart(2, '0') + 
                    colors[1].toString(16).padStart(2, '0') + 
                    colors[2].toString(16).padStart(2, '0');
    
    new_color = (parseInt(hexstring, 16) + 1) % (parseInt("FFFFFF", 16) + 1);
    hexstring = new_color.toString(16).padStart(6, '0');
    document.getElementById("h").style.color = "#" + hexstring;
}
function changesize(){
    let width = document.documentElement.style.width ? (parseInt((document.documentElement.style.width))) : 25;
    document.documentElement.style.width = document.getElementById + 'px';
}





// function resize(e){
//     if(!mouseup){
//         document.documentElement.style.width += (x - e.clientX).toString() + 'px'; 
//         document.documentElement.style.height += (e.clientY - y).toString() + 'px'; 
//     }
// }

// var resizetrue = false;
// var mouseup = false;
// let x, y;

// addEventListener('mouseup', function(){
//     mouseup = true
// })

// addEventListener('mousedown', function(e){
//     mouseup = false;
//     if(resizetrue){
//         x = e.clientX;
//         y = e.clientY;
//         this.addEventListener('mousemove',resize(e));
//     }
// });

// addEventListener('mousemove', function(e){
//     if(e.clientX <= 5 && e.clientY >= window.innerHeight - 5){
//         document.getElementById("h").style.backgroundColor = "firebrick";
//         document.body.style.cursor = "sw-resize";
//         resizetrue = true
//     }
//     else{
//         resizetrue = false;
//         document.getElementById("h").style.backgroundColor= "";
//         document.body.style.cursor = "";
//     }
//     document.getElementById("h").textContent = `${e.clientY}, ${e.clientX}`;
// });

// setTimeout(function(){
//     document.body.style.width 
// })

let mouseDown = false;
let resize_dimension = 20;
let oldmouse_xy = [0,0,0,0];

addEventListener('mousedown', function(){
    mouseDown = true;
})

addEventListener('mouseup', function(){
    mouseDown = false;
})

addEventListener('mousemove',function(e){
    console.log((getComputedStyle(document.getElementById("a")).height.slice(0,-2)));
    this.document.getElementById('b').textContent = (parseInt(getComputedStyle(document.getElementById("a")).height.slice(0,-2)) - e.pageY).toString(); 
    this.document.getElementById('h').textContent = (e.pageX).toString() + ' ' + (e.pageY).toString() + ' ' + 
    (oldmouse_xy[0]).toString() + ' ' + (oldmouse_xy[1]).toString();
    if(e.pageX <= resize_dimension && 
       (parseInt(getComputedStyle(document.getElementById("a")).height.slice(0,-2)) - e.pageY) <= resize_dimension){
        this.document.body.style.cursor = "sw-resize";
        if(mouseDown){
            this.document.body.style.height = `${e.pageY + 1}px`;
            this.document.body.style.width = 
            `${parseInt(getComputedStyle(document.getElementById("a")).height.slice(0,-2)) - e.pageX -1}px`;
        }
    }
    else if(oldmouse_xy[0] <= resize_dimension && 
           (parseInt(getComputedStyle(document.getElementById("a")).height.slice(0,-2)) - oldmouse_xy[1]) <= resize_dimension){
            if(mouseDown){
                let mouseVelocity = [oldmouse_xy[0] - oldmouse_xy[2], oldmouse_xy[1] - oldmouse_xy[3]];
                let para = this.document.getElementsByClassName('hello')[1];
                para.textContent = oldmouse_xy.toString() + ' ' + mouseVelocity.toString();
                this.document.body.style.height = `${e.pageY + mouseVelocity*2}px`;
                this.document.body.style.width = 
            `${parseInt(getComputedStyle(document.getElementById("a")).width.slice(0,-2)) - e.pageX - mouseVelocity*2}px`;
            }
    }
    else{this.document.body.style.cursor = "";}
    let mouseVelocity = [oldmouse_xy[2] - oldmouse_xy[0], oldmouse_xy[3] - oldmouse_xy[1]];
                let para = this.document.getElementsByClassName('hello')[1];
                para.textContent = oldmouse_xy.toString() + ' ' + mouseVelocity.toString();
    oldmouse_xy = [e.clientX,e.pageY, oldmouse_xy[0], oldmouse_xy[1]];

})






setInterval(changecolor, 1);
setInterval(changesize, 100);
