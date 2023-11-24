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
    id: '1',
    name: "红色多边形hierarchy",
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -115.0,
        37.0,
        -115.0,
        32.0,
        -107.0,
        33.0,
        -102.0,
        31.0,
        -102.0,
        35.0,
      ]),
      material: Cesium.Color.RED,
    },
  });

  viewer.entities.add({
    name: "正方体",
    position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
    box: {
      dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
      material: Cesium.Color.BLUE,
    },
  });


  const grenn = {
    name: "绿色三角polygon",
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -108.0,
        42.0,
        -100.0,
        42.0,
        -104.0,
        40.0,
      ]),
      extrudedHeight: 500000.0,
      material: Cesium.Color.GREEN,
      closeTop: false,        // 上层透视
      closeBottom: false,
    }
  }
  viewer.entities.add(grenn)


  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 100000.0),
    name: "绿色旋转外边框椭圆ellipse",
    ellipse: {
      semiMinorAxis: 150000.0, //椭圆的半长轴的长度（以米为单位）。
      semiMajorAxis: 300000.0,
      // extrudedHeight: 200000.0,
      rotation: Cesium.Math.toRadians(45),
      material: Cesium.Color.BLUE.withAlpha(0.5),
      outline: true,
    },
  });

  viewer.entities.add({
    name: "走廊拐角颜色白色corridor",
    corridor: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        -80.0,
        40.0,
        -85.0,
        40.0,
        -85.0,
        35.0,
      ]),
      height: 200000.0,
      extrudedHeight: 100000.0,
      width: 200000.0,
      cornerType: Cesium.CornerType.BEVELED,
      material: Cesium.Color.BLUE.withAlpha(0.5),
      outline: true, // height or extrudedHeight must be set for outlines to display
      outlineColor: Cesium.Color.WHITE,
    },
  });

  viewer.entities.add({
    name: "圆锥",
    position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 200000.0),
    cylinder: {
      length: 400000.0,
      topRadius: 100000.0,
      bottomRadius: 200000.0,
      // topRadius: 0.0,
      material: Cesium.Color.GREEN.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.DARKGREEN,
    },
  });



  viewer.zoomTo(viewer.entities)

});
</script>
<style lang="scss">

</style>
