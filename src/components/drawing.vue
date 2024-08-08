<script setup>
import {deleteAll, deleteElement, getElement, postElement, restartCounting, update} from "@/services/api.js";
import {onMounted, ref} from "vue"

let coordinates = []
let imagedata = []
const mouse_x = ref(0)
const mouse_y = ref(0)
const clicked = ref(false)
const tool = ref("") //freehand, square, circle
const color = ref("#000000")
const thickness = ref(1)


let canvas
let ctx

const drawFreeHand = function(color, c, ctx, internal, thickness){
  if(c==null || color==null || ctx==null){
    console.log(color, c, ctx)
    return
  }
  ctx.beginPath(); // Start a new path
  ctx.strokeStyle = color
  ctx.lineWidth = thickness;
  ctx.moveTo(c[0][0], c[0][1])
  for(let i=1; i < c.length; i++){
    ctx.lineTo(c[i][0], c[i][1])
  }
  internal && ctx.putImageData(imagedata,0,0)
  ctx.stroke(); // Render the path
}
const drawSquare = function(color, c, ctx, internal){
  if(c==null || color==null || ctx==null){
    console.log("error null")
    return
  }
  const l = c.length-1
  ctx.fillStyle = color
  if(l>=1){
    internal && ctx.putImageData(imagedata,0,0)
    const x = c[0][0]
    const y = c[0][1]
    const w = c[l][0] - x
    const h = c[l][1] - y
    ctx.fillRect(x,y,w,h)
  }
}
const drawCircle = function(color, c, ctx, internal){
  if(c==null || color==null || ctx==null){
    console.log("error null")
    return
  }
  const l = c.length-1
  ctx.fillStyle = color
  if(l>=1){
    internal && ctx.putImageData(imagedata,0,0)
    const x = c[0][0]
    const y = c[0][1]
    const w = c[l][0] - x
    const h = c[l][1] - y
    ctx.beginPath();
    ctx.ellipse(x,y, Math.abs(w), Math.abs(h),0,0,2 * Math.PI)
    ctx.fill();
  }
}

const drawElement = function(element){
  if(element.tool==='freehand'){
    drawFreeHand(element.color, element.coordinates, ctx, false, element.thickness)
  }
  else if(element.tool==='square'){
    drawSquare(element.color, element.coordinates, ctx, false)
  }
  else if(element.tool==='circle'){
    drawCircle(element.color, element.coordinates, ctx, false)
  }
  else{
    //console.log("errorrrrrrrrr")
  }
}

const mouse_position = function(){
  mouse_x.value = event.clientX
  mouse_y.value = event.clientY
  if(clicked.value===true){
    if (tool.value==='freehand'){
      coordinates.push([mouse_x.value, mouse_y.value])
      drawFreeHand(color.value, coordinates, ctx, true, thickness.value)
    }
    if (tool.value==='square'){
      coordinates.push([mouse_x.value, mouse_y.value])
      drawSquare(color.value, coordinates, ctx, true)
    }
    if (tool.value==='circle'){
      coordinates.push([mouse_x.value, mouse_y.value])
      drawCircle(color.value, coordinates, ctx, true)
    }
  }
}

const mousedown = function (){
  if (mouse_x.value <800 && mouse_y.value <600){
    clicked.value = true
    saveImageData()
  }
}
const saveImageData = function(){
  imagedata=ctx.getImageData(0,0, canvas.width, canvas.height)
}

const mouseup = async function () {
  clicked.value = false
  if (tool.value !== "" && coordinates.length > 2) {
    let coords = []
    if (tool.value === 'freehand') {
      coords = coordinates
    } else {
      coords.push(coordinates[0])
      coords.push(coordinates[coordinates.length - 1])
    }
    ctx.putImageData(imagedata, 0, 0)
    await postElement({
      color: color.value,
      tool: tool.value,
      coordinates: coords,
      thickness: thickness.value,
    })
    //console.log("elementPosted")
  }
  else{
    console.log("click")
  }
  coordinates = []
}

const undo = async function () {
  await deleteElement()
  //ctx.clearRect(0, 0, canvas.width, canvas.height)
  restartCounting()
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const setTool = function(t){
  tool.value = t
}

const clearAll = async function () {
  await deleteAll()
}

const setColor = function(t){
  color.value = t
}

const fetchElement = async function (){
  try{
    const e = await getElement()
    //console.log(e)
    if (e===false){
    }
    else{
      for (let i in e){
        drawElement(e[i])
      }
    }
  }
  catch (err){
    console.log('error fetch'+err)
  }

}
const download = function(){
  window.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
}

const setUpdate = async function () {

  let response = await update()
  if (response ==="deleteOccurred"){
    restartCounting()
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  else if (response ==="newelementOccurred"){
  }
  setUpdate()
  await fetchElement()

}

window.addEventListener('mousemove', mouse_position)
window.addEventListener('mousedown', mousedown)
window.addEventListener('mouseup', mouseup)

onMounted(()=>{
  canvas = document.getElementById("canvas")
  ctx = canvas.getContext("2d")
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
})

setUpdate()

</script>

<template>

  <div class="container">
    <canvas id="canvas" width="800" height="600"> </canvas>
  </div>
  <div class="function-buttons">
    <button @click="undo">UNDO</button>
    <button @click='setTool("freehand")'>S</button>
    <button @click='setTool("square")'>ם</button>
    <button @click='setTool("circle")'>O</button>
    <button @click="clearAll">CLEAR ALL</button>
    <button @click="download">Download</button>
  </div>
  <div class="color-buttons">
    <div>
      <button style="background-color:#FF3366;" @click='setColor("#FF3366")'></button>
      <button style="background-color:#FF9966;" @click='setColor("#FF9966")'></button>
      <button style="background-color:#FFFF66;" @click='setColor("#FFFF66")'></button>
      <button style="background-color:#99FF66;" @click='setColor("#99FF66")'></button>
      <button style="background-color:#99FFCC;" @click='setColor("#99FFCC")'></button>
      <button style="background-color:#99EEFF;" @click='setColor("#99EEFF")'></button>
      <button style="background-color:#9999FF;" @click='setColor("#9999FF")'></button>
    </div>
    <div>
      <button style="background-color:#CC3366;" @click='setColor("#CC3366")'></button>
      <button style="background-color:#CC6666;" @click='setColor("#CC6666")'></button>
      <button style="background-color:#CCCC66;" @click='setColor("#CCCC66")'></button>
      <button style="background-color:#99CC66;" @click='setColor("#99CC66")'></button>
      <button style="background-color:#66CCCC;" @click='setColor("#66CCCC")'></button>
      <button style="background-color:#6699CC;" @click='setColor("#6699CC")'></button>
      <button style="background-color:#6666CC;" @click='setColor("#6666CC")'></button>
    </div>
  </div>
  <input v-model="thickness" type="range" id="fht" name="fht" min="1" max="20" value="15" step="1" />
  <label for="fht">Freehand thickness</label>

</template>

<style scoped>
label {
  font-family: sans-serif;
}
.container {
  font-size: 50px;
}
canvas{
   top: 0;
   left: 0;
   //background-color: #fff;
}
.color-buttons{
  button{
    border-style: solid;
    border-color: gray;
    border-width: 1px;
    border-radius: 3px;
    height: 15px
  }
  button:hover{
    border-color: dimgray;
  }
}
</style>
