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
    imageryProvider: Cesium.createWorldImagery({
      style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
    }),
  });
  const elementui = viewer.cesiumWidget.creditContainer as HTMLElement;
  elementui.style.display = "none";

  viewer.entities.add({
    name: "Purple polyline",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -75,
        43,
        500000,
        -125,
        43,
        500000,
      ]),
      width: 10,
      arcType: Cesium.ArcType.NONE,
      material: new Cesium.PolylineArrowMaterialProperty(
        Cesium.Color.PURPLE
      ),
    },
  });

  viewer.entities.add({
    name: "polyline",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -75,
        45,
        500000,
        -125,
        45,
        500000,
      ]),
      width: 4,
      material: new Cesium.PolylineDashMaterialProperty({
        color: Cesium.Color.CYAN,
      }),
    },
  });


  viewer.entities.add({
    name: "折线,有体积polylineVolume",
    polylineVolume: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -90.0,
        32.0,
        0.0,
        -90.0,
        36.0,
        100000.0,
        -94.0,
        36.0,
        0.0,
      ]),
      shape: [
        new Cesium.Cartesian2(-50000, -50000),
        new Cesium.Cartesian2(50000, -50000),
        new Cesium.Cartesian2(50000, 50000),
        new Cesium.Cartesian2(-50000, 50000),
      ],
      cornerType: Cesium.CornerType.BEVELED,
      material: Cesium.Color.GREEN.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.BLACK,
    },
  });

  viewer.entities.add({
    name: "矩形rectangle",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(
        -110.0,
        20.0,
        -80.0,
        25.0
      ),
      material: Cesium.Color.RED.withAlpha(0.5),
      height: 100000.0,
      extrudedHeight: 300000.0,
    },
  });

  viewer.entities.add({
    name: "墙wall",
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -115.0,
        44.0,
        200000.0,
        -90.0,
        44.0,
        200000.0,
      ]),
      minimumHeights: [100000.0, 100000.0],
      material: Cesium.Color.RED,
    },
  });


  viewer.zoomTo(viewer.entities);
});
</script>
<style lang="scss">

</style>
