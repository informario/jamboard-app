<script setup>
import {ref, onMounted} from "vue"
const mouse_x = ref(0)
const mouse_y = ref(0)
const clicked = ref(false)
const tool = ref("") //freehand, square, circle
const color = ref("blue")
const SAVES = 10

let coordinates = []
let canvas
let ctx
let imagedata = []
let elements = []

const drawFreeHand = function(color, coordinates, ctx){
  ctx.beginPath(); // Start a new path
  ctx.strokeStyle = color
  ctx.moveTo(coordinates[0][0], coordinates[0][1])
  for(let i=1; i < coordinates.length; i++){
    ctx.lineTo(coordinates[i][0], coordinates[i][1])
  }
  ctx.stroke(); // Render the path
}
const drawSquare = function(color, coordinates, ctx){
  const l = coordinates.length-1
  ctx.fillStyle = color
  if(l>=1){
    ctx.putImageData(imagedata[imagedata.length-1],0,0)
    const x = coordinates[0][0]
    const y = coordinates[0][1]
    const w = coordinates[l][0] - x
    const h = coordinates[l][1] - y
    ctx.fillRect(x,y,w,h)
  }
}
const drawCircle = function(color, coordinates, ctx){
  const l = coordinates.length-1
  ctx.fillStyle = color
  if(l>=1){
    ctx.putImageData(imagedata[imagedata.length-1],0,0)
    const x = coordinates[0][0]
    const y = coordinates[0][1]
    const w = coordinates[l][0] - x
    const h = coordinates[l][1] - y
    ctx.beginPath();
    ctx.ellipse(x,y, Math.abs(w), Math.abs(h),0,0,2 * Math.PI)
    ctx.fill();
  }
}

const drawElement = function(element){
  if(element.tool==='freehand'){
    drawFreeHand(element.color, element.coordinates, ctx)
  }
  else if(element.tool==='square'){
    drawSquare(element.color, element.coordinates, ctx)
  }
  else if(element.tool==='circle'){
    drawCircle(element.color, element.coordinates, ctx)
  }
}



const mouse_position = function(){
  mouse_x.value = event.clientX
  mouse_y.value = event.clientY
  if(clicked.value===true){
    if (tool.value==='freehand'){
      coordinates.push([mouse_x.value, mouse_y.value])
      //drawFreeHand(color.value, coordinates, ctx)
    }
    if (tool.value==='square'){
      coordinates.push([mouse_x.value, mouse_y.value])
      //drawSquare(color.value, coordinates, ctx)
    }
    if (tool.value==='circle'){
      coordinates.push([mouse_x.value, mouse_y.value])
      //drawCircle(color.value, coordinates, ctx)
    }
  }
}
const mousedown = function (){
  if (mouse_x.value <canvas.width && mouse_y.value <canvas.height){
    clicked.value = true
    saveImageData()
  }
}

const saveImageData = function(){
  if(imagedata.length < SAVES){
    imagedata.push(ctx.getImageData(0,0, canvas.width, canvas.height))
  }
  else{
    for(let i=0; i<SAVES-1; i++){
      imagedata[i]=imagedata[i+1]
    }
    imagedata[SAVES-1]=ctx.getImageData(0,0, canvas.width, canvas.height)
  }
}

const mouseup = function (){
  clicked.value = false
  if (mouse_x.value <canvas.width && mouse_y.value <canvas.height && tool.value!==""){
    let coords = []
    if (tool.value==='freehand'){
      coords = coordinates
    }
    else{
      coords.push(coordinates[0])
      coords.push(coordinates[coordinates.length-1])
    }
    elements.push({
      color:color.value,
      tool:tool.value,
      coordinates:coords,
    })
    console.log(elements[elements.length - 1])
    //sendElement
  }
  coordinates = []
}

const undo = function(){
  if(imagedata.length > 0){
    ctx.putImageData(imagedata[imagedata.length-1],0,0)
    imagedata.pop()
  }
}

const setTool = function(t){
  tool.value = t
}



window.onload = function (){
  canvas = document.getElementById("canvas")
  ctx = canvas.getContext("2d")
  ctx.width = 1000
}

window.addEventListener('mousemove', mouse_position)
window.addEventListener('mousedown', mousedown)
window.addEventListener('mouseup', mouseup)





</script>

<template>
  <div class="container">
    <canvas id="canvas" width="1920" height="1080"> </canvas>
  </div>
  <button @click="undo">UNDO</button>
  <button @click='setTool("freehand")'>Freehand</button>
  <button @click='setTool("square")'>Square</button>
  <button @click='setTool("circle")'>Circle</button>
</template>

<style scoped>
.container {
  font-size: 50px;
}
canvas{
   top: 0;
   left: 0;
   background-color: white;
 }
</style>
