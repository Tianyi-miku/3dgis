<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home" id="cesiumContainer">
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import * as Cesium from "cesium";


onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false,
  })
  const elementui = viewer.cesiumWidget.creditContainer as HTMLElement
  elementui.style.display = "none";


  const point2 = {
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
      show: true, // default
      color: Cesium.Color.SKYBLUE, // default: WHITE
      pixelSize: 10, // default: 1
      outlineColor: Cesium.Color.YELLOW, // default: BLACK
      outlineWidth: 3, // default: 0
    },
  }

  const point3 = {
    position: Cesium.Cartesian3.fromDegrees(-75.29777, 39.53883),
    point: {
      show: true, // default
      color: Cesium.Color.SKYBLUE, // default: WHITE
      pixelSize: 20, // default: 1
      outlineColor: Cesium.Color.YELLOW, // default: BLACK
      outlineWidth: 3, // default: 0
    },
  }
  // 点
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
    point: {
      pixelSize: 5,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2
    },
    label: {
      text: '公园point',
      font: '14pt monospace',
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      pixelOffset: new Cesium.Cartesian2(0, 32)
    }
  })

  viewer.entities.add(point2)
  viewer.entities.add(point3)

  viewer.zoomTo(viewer.entities)
})

</script>
<style lang="scss">

</style>