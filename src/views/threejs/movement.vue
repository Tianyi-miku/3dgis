<template>
  <div id="container" class="content">

  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import * as THREE from "three";
import { addLightHelper, addsceneHelper } from "./helper";
import { nextTick } from 'process';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'


let scene: any
let camera: any
let render: any
let controls: any
onMounted(async () => {
  await nextTick
  init()
  addLight()
  addCube()
})

function addGui(mesh: any) {
  const gui = new GUI({ // 可接收参数
    name: 'My GUI',
    width: 300,
    closed: true
  })
  gui
    .add(mesh.position, 'x')
    .min(-100)
    .max(100)
    .step(0.01)
    .name('mesh的x')
}

function addCube() {
  const geometry = new THREE.SphereGeometry(15, 32, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    raduis: 10
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  animate()
  addGui(geometry)

}

const animate = () => {
  controls.update()
  render.render(scene, camera)
  window.requestAnimationFrame(animate)
}


function addLight() {
  const pointLight = new THREE.PointLight(0xff0000, 1, 100);
  pointLight.position.set(100, 10, 10);
  scene.add(pointLight);

  addLightHelper(scene, pointLight)
}

function init() {
  const container = document.getElementById('container')
  const width = container?.clientWidth || 0
  const height = container?.clientHeight || 0

  scene = new THREE.Scene()
  addsceneHelper(scene)

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  scene.add(camera);

  render = new THREE.WebGLRenderer()
  render.setPixelRatio(window.devicePixelRatio) // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊

  render.setSize(width, height) // 设置THREE场景大小为整个页面
  container?.appendChild(render.domElement) // 添加场景到DOM中

  render.outputEncoding = THREE.sRGBEncoding
  camera.position.set(100, 0, 0) // 摄像头摆放位置
  controls = new OrbitControls(camera, render.domElement) // 创建控件对象

}

</script>
<style scoped lang="less">
.content {
  height: 100%;
  width: 100%;
}
</style>