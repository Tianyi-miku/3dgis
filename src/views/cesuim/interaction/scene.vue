<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="control">
      <div>
        <div class="controlItme">
          <span> 左键 </span>
          <a-radio-group v-model:value="state.value1" button-style="solid">
            <a-radio-button value="piont">点</a-radio-button>
            <a-radio-button value="billboard">广告牌</a-radio-button>
          </a-radio-group>
        </div>
        <div class="controlItme">
          <span> 右键 </span>
          <a-radio-group v-model:value="state.value1" button-style="solid">
            <a-radio-button value="piont1">点</a-radio-button>
            <a-radio-button value="billboard1">广告牌</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div>
        <a-button style="float: right;" @click="clean">清除</a-button>
      </div>
    </div>
    <div class="home" id="cesiumContainer"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import * as Cesium from "cesium";
interface State {
  value1: any,
}
const state = reactive<State>({
  value1: 'piont',
});

let viewer: any;
onMounted(() => {
  viewer = new Cesium.Viewer("cesiumContainer", {
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
  const scene = viewer.scene;
  const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

  handler.setInputAction((movement: any) => {

    var position = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
    if (state.value1 === "piont") {
      addPoint(position);
    }
    if (state.value1 === "billboard") {
      addBillboard(position);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  handler.setInputAction((movement: any) => {
    // position中包含一个Cartesian2对象

    var position = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
    if (state.value1 === "piont1") {
      addPoint(position);
    }
    if (state.value1 === "billboard1") {
      addBillboard(position);
    }
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
});
const addBillboard = (position: any) => {
  const board = {
    position: position,
    billboard: {
      image: "./img/gy/tx.jpg",
      show: true, // default
      width: 25, // default: undefined
      height: 25, // default: undefined
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 相对高度
    },
  };
  viewer.entities.add(board);
};
const addPoint = (position: any) => {
  const point = {
    position: position,
    point: {
      color: Cesium.Color.RED, // 颜色
      outlineColor: Cesium.Color.PINK, // 轮廓线颜色
      outlineWidth: 5, // 轮廓线宽度
      pixelSize: 20, // 点的大小
      show: true, // default
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 相对高度
    },
  };
  viewer.entities.add(point);

};
const clean = () => {
  state.value1 = ''
  viewer.entities.removeAll();
};
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
