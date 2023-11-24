<template>
  <div id="container" class="container"></div>
</template>
<script lang="ts" setup>
import * as THREE from "three";
import { onMounted } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene: any,
  camera: {
    position: { set: (arg0: number, arg1: number, arg2: number) => void };
  },
  render: {
    setPixelRatio: (arg0: number) => void;
    setSize: (arg0: number, arg1: number) => void;
    domElement: any;
    outputEncoding: any;
    render: (arg0: any, arg1: any) => void;
  },
  group: any,
  mesh: any,
  controls: { update: () => void };

onMounted(() => {
  inteErah();
  load();
  intlight();
  animate();
});

function intlight() {
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(50, 50, 50);
  scene.add(light);
}

function load() {
  const geometry = new THREE.SphereGeometry(15, 32, 16);

  const texture = new THREE.TextureLoader().load(
    "/img/gy/world.topo.bathy.200401.jpg"
  );
  const material = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 1,
    depthWrite: false,
  });
  mesh = new THREE.Mesh(geometry, material);
  group = new THREE.Group();

  const moongeometry = new THREE.SphereGeometry(5, 32, 16);
  const sprite = new THREE.Mesh(moongeometry, material);
  sprite.position.set(20, 20, 20);
  group.add(sprite);

  material.map = texture;

  scene.add(mesh);
  scene.add(group);
}

function inteErah() {
  const content = document.getElementById("container") as HTMLElement;
  const width = content.clientWidth;
  const height = content.clientHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  render = new THREE.WebGLRenderer();
  render.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
  render.setSize(width, height); // 设置THREE场景大小为整个页面
  content.appendChild(render.domElement); // 添加场景到DOM中

  render.outputEncoding = THREE.sRGBEncoding;
  camera.position.set(100, 0, 0); // 摄像头摆放位置
  scene.background = new THREE.Color(0x020924);
  // 鼠标控件
  controls = new OrbitControls(camera, render.domElement); // 创建控件对象
}

const animate = () => {
  controls.update();
  group.rotation.y += 0.005;
  mesh.rotation.y -= 0.003;

  render.render(scene, camera);
  window.requestAnimationFrame(animate);
};
</script>
<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>
