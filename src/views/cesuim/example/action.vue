<template>
  <div>
    <div class="control">
      <div>设备</div>
      <a-radio-group v-model:value="state.value1" button-style="solid">
        <a-radio-button value="saomiao">扫码雷达</a-radio-button>
        <a-radio-button value="bo">发送波</a-radio-button>
      </a-radio-group>
    </div>
    <div class="home" id="cesiumContainer"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import * as Cesium from "cesium";
// import scan from "../types/scan";
import { addscan } from "../types/circle";
import { setRadarScanEffect } from "../types/cirlceScan";

let viewer: Cesium.Viewer

type State = {
  value1: string,
}
const state = reactive<State>({
  value1: '',
});

onMounted(() => {
  viewer = new Cesium.Viewer('cesiumContainer', {
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
  viewer.scene.sun.show = false;
  viewer.scene.moon.show = false;
  viewer.scene.fxaa = true;
  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.scene.undergroundMode = false;
  viewer.scene.terrainProvider.isCreateSkirt = false;
  viewer.scene.skyAtmosphere.show = false;
  viewer.scene.globe.showGroundAtmosphere = false
  viewer.scene.globe.enableLighting = true
  viewer.scene.fog.enabled = false
  viewer.cesiumWidget.creditContainer.style.display = "none";
  const elementui = viewer.cesiumWidget.creditContainer as HTMLElement
  elementui.style.display = "none";

  const tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url: './model/building/tileset.json',
    })
  );

  tileset.readyPromise
    .then(function (tileset: any) {
      viewer.scene.primitives.add(tileset);
      tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            ["${height} >= 300", "rgba(0, 149, 251, 0.3)"],
            ["${height} >= 200", "rgb(0, 149, 251, 0.3)"],
            ["${height} >= 100", "rgb(0, 149, 251, 0.3)"],
            ["${height} >= 50", "rgb(0, 149, 251, 0.3)"],
            ["${height} >= 25", "rgb(0, 149, 251, 0.3)"],
            ["${height} >= 10", "rgb(0, 149, 251, 0.3)"],
            ["${height} >= 5", "rgb(0, 149, 251, 0.3)"],
            ["true", "rgb(0, 149, 251, 0.3)"],
          ],
        },
      });
      viewer.flyTo(tileset)
    })
    .catch(function (error: any) {
      console.log(error);
    });
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((movement: any) => {
    if (state.value1) {
      if (state.value1 === 'bo') {
        var position = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        bodong(position, viewer)
      }
      if (state.value1 === 'saomiao') {
        var position = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        saomiao(position, viewer)
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

})

function bodong(position: any, viewer: any) {
  const point: any = {
    id: new Date().getTime(),
    position: position,
    color: Cesium.Color.MEDIUMTURQUOISE.withAlpha(0.5),
    duration: 5000,
    border: 10,
    radius: 2000,
    circleMode: 'CircleScan'
  };
  addscan(point, viewer)
}

function saomiao(position: any, viewer: any) {
  const point: any = {
    id: new Date().getTime(),
    position: position,
    color: Cesium.Color.MEDIUMTURQUOISE.withAlpha(0.8),
    duration: 5000,
    border: 10,
    radius: 2000,
    circleMode: 'CircleScan'
  };
  setRadarScanEffect(point, viewer)

}

</script>
<style lang="less" scoped>
.control {
  position: absolute;
  color: white;
  z-index: 1;
  margin: 26px;

  .controlItme {
    margin: 10px 0px;
  }
}
</style>