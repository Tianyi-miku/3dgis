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
  const tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url: './model/Tileset/tileset.json',
    })
  );

  tileset.readyPromise
    .then(function (tileset: any) {
      viewer.scene.primitives.add(tileset);
      viewer.zoomTo(
        tileset,
        new Cesium.HeadingPitchRange(
          0.0,
          -0.5,
          tileset.boundingSphere.radius * 2.0
        )
      );
    })
    .catch(function (error: any) {
      console.log(error);
    });


})

</script>
<style lang="less" scoped>

</style>