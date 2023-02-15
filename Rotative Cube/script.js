
const COLOR_CUBE = 'green';
const FPS_VEL = 0.05;


//Function to create square vertices
const POINTS = function (x, y, z) { this.x = x, this.y = y, this.z = z }


//take window dimensions
let height = $(window).height();
let width = $(window).width();


//create canvas inside page-wrapper

let canvas = document.createElement('canvas')
canvas.width = width;
canvas.height = height
$('.page-wrapper').append(canvas)
let ctx = canvas.getContext('2d')

ctx.strokeStyle = COLOR_CUBE
ctx.fillStyle = 'black'
ctx.lineWidht = width / 100;
ctx.lineCap = 'round';

//Cube parameters
let cx = width / 2
let cy = height / 2
let cz = 0
let size = height / 4


//

let vertices = [
    new POINTS(cx - size, cy - size, cz - size),//(0)
    new POINTS(cx + size, cy - size, cz - size),//(1)
    new POINTS(cx + size, cy + size, cz - size),//(2)
    new POINTS(cx - size, cy + size, cz - size),//(3)
    new POINTS(cx - size, cy - size, cz + size),//(4)
    new POINTS(cx + size, cy - size, cz + size),//(5)
    new POINTS(cx + size, cy + size, cz + size),//(6)
    new POINTS(cx - size, cy + size, cz + size) //(7)
]

//array for vertex links

let edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
]


let timeDelta, timeLast = 0;
requestAnimationFrame(loop)

/*
    x′=x*cos(θ)
    y′=x*sin(θ)
*/

function loop(timeNow) {

    timeDelta = timeNow - timeLast;
    timeLast = timeNow;

    ctx.fillRect(0, 0, width, height)


    //moving x and y axis
    let angle = timeDelta * 0.001 * FPS_VEL * Math.PI * 2;
    for (let v of vertices) {

        let dx = v.x - cx;
        let dy = v.y - cy;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);

        v.x = x + cx;
        v.y = y + cy;

    }

    angle = timeDelta * 0.001 * FPS_VEL * Math.PI * 2;

    //moving y and z axis
    for (let v of vertices) {
        let dz = v.z - cz;
        let dy = v.y - cy;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);

        v.y = y + cy;
        v.z = z + cz;


    }
    
    //drawing cube on the window 

    for (let edge of edges) {

        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y)
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y)
        ctx.stroke();

    }

    requestAnimationFrame(loop)

}