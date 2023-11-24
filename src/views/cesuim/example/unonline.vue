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
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: '/maps/{z}/{x}/{y}.png',
    }),
    terrainProvider: new Cesium.CesiumTerrainProvider({
      url: '/terrain'
    })
  });
  const elementui = viewer.cesiumWidget.creditContainer as HTMLElement;
  elementui.style.display = "none";

  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(104.5, 30.5),
    point: {
      show: true, // default
      color: Cesium.Color.SKYBLUE, // default: WHITE
      pixelSize: 10, // default: 1
      outlineColor: Cesium.Color.YELLOW, // default: BLACK
      outlineWidth: 3, // default: 0
    },
  });

  viewer.zoomTo(viewer.entities);
});
</script>
<style lang="scss">

</style>
