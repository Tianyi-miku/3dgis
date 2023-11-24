<template>
  <div class="body">
    <div class="item">
      <a-select ref="select" v-model:value="state.value" style="width: 120px" @change="handleChange">
        <a-select-option value="Point">Point</a-select-option>
        <a-select-option value="LineString">LineString</a-select-option>
        <a-select-option value="Polygon">Polygon</a-select-option>
        <a-select-option value="Circle">Circle</a-select-option>
        <a-select-option value="None">None</a-select-option>
      </a-select>
      <a-button type="primary" @click="undo">undo</a-button>
    </div>
    <div id="map" class="content">
    </div>
  </div>
</template>
<script lang="ts" setup>
import "ol/ol.css";
import { onMounted, reactive } from "vue";
import { Map, View } from "ol";//地图,视图
import OSM from "ol/source/OSM"; //可以理解为数据源,就是一张图片
// import { BingMaps } from "ol/source"; //可以理解为数据源,就是一张图片
import TileLayer from "ol/layer/Tile"; //可以理解为图层
import Draw from 'ol/interaction/Draw';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';


let map: any
const source = new VectorSource({ wrapX: false });
const raster = new TileLayer({
  source: new OSM({
    url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
  })
});

const vector = new VectorLayer({
  source: source,
});
let draw: any;

const state = reactive({
  value: 'Point'
})


onMounted(() => {
  map = new Map({
    layers: [raster, vector],
    view: new View({
      center: [0, 0],    // 定义地图显示中心于经度0度，纬度0度处
      zoom: 2,            // 并且定义地图显示层级为2
      projection: "EPSG:4326"
    }),
    // 让id为map的div作为地图的容器
    target: 'map'
  })

  addInteraction();
})

function handleChange(value: string) {
  map.removeInteraction(draw);
  addInteraction();
}

function addInteraction() {
  const value = state.value;
  if (value !== 'None') {
    draw = new Draw({
      source: source,
      type: state.value,
    });
    map.addInteraction(draw);
  }
}

function undo() {
  draw.removeLastPoint();
}
</script>
<style lang="less" scoped>
.content {
  height: 100%;
  width: 100%;
}

.body {
  height: 100%;
  width: 100%;
}

.item {
  position: absolute;
  z-index: 1;
  margin-top: 60px;
}
</style>