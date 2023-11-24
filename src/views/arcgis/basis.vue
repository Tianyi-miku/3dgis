<template>
  <div>
    <div id="viewDiv"></div>
  </div>
</template>
<script lang="ts" setup>
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import { onMounted } from "vue";

onMounted(() => {
  const map = new Map({
    basemap: "satellite",
    ground: "world-elevation"
  });
  const view = new SceneView({
    container: document.getElementById('viewDiv') as any, // Reference to the scene div created in step 5
    map: map, // Reference to the map object created before the scene
    scale: 50000000, // Sets the initial scale to 1:50,000,000
    center: [-101.17, 21.78] // Sets the center point of view with lon/lat
  });
  console.log(view);

})


</script>
<style lang="less" scoped>

</style>