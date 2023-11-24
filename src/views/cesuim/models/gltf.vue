<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home" id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";

onMounted(() => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false,
  });
  const elementui = viewer.cesiumWidget.creditContainer as HTMLElement;
  elementui.style.display = "none";

  const heading = Cesium.Math.toRadians(135)
  const pitch = 0
  const roll = 0
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)

  const entity = viewer.entities.add({
    name: 'CesiumDrone', // 模型的名称
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    orientation: Cesium.Transforms.headingPitchRollQuaternion(
      Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
      hpr
    ), // 模型的观察视角
    model: {
      uri: './model/abby.glb',
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  })

  viewer.trackedEntity = entity
})

</script>
<style lang="less" scoped>

</style>