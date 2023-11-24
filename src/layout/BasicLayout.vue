<!-- eslint-disable vue/valid-v-for -->
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="state.collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="state.selectedKeys" theme="dark" mode="inline" v-for="item, key in state.myrouters"
        :key="item['path']">

        <a-sub-menu key="sub1" v-if="item['children'] && item['children'][0]['component']">
          <template #title>
            <TeamOutlined v-if="key == 0" />
            <DesktopOutlined v-if="key == 1" />
            <PieChartOutlined v-if="key == 2" />
            <UserOutlined v-if="key == 3" />
            <FileOutlined v-if="key == 4" />
            <span>{{ item['name'] }}</span>
          </template>
          <a-menu-item @click="goRuoter(element)" v-for="element in item['children']" :key="element['path']">{{
              element.meta.title
          }}</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2" v-else>
          <template #title><span>
              <TeamOutlined v-if="key == 0" />
              <DesktopOutlined v-if="key == 1" />
              <PieChartOutlined v-if="key == 2" />
              <UserOutlined v-if="key == 3" />
              <FileOutlined v-if="key == 4" />
              <span>{{ item['name'] }}</span>
            </span>
          </template>
          <div v-for="el, index in item['children']" :key="index">
            <a-sub-menu :key="index" :title="el['name']">
              <a-menu-item @click="goRuoter(element)" v-for="element in el['children']" :key="element['path']">{{
                  element['name']
              }}</a-menu-item>
            </a-sub-menu>
          </div>

        </a-sub-menu>
      </a-menu>

    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0;width: 80px;">
          <a-breadcrumb-item>
            <!-- <div style="float: left;"> -->
            {{ state.routerPath }}
            <!-- </div> -->
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ 'margin-left': '10px', background: '#fff', height: 'calc(100% - 80px)' }">
          <router-view> </router-view>
        </div>
      </a-layout-content>
      <!-- <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { useStore } from 'vuex';
import { reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";


const store = useStore()
const router = useRouter();
const route = useRoute();


const state = reactive({
  myrouters: [],
  selectedKeys: [],
  collapsed: false,
  routerPath: {}
})

watch(() => store.state.routerList.routers, (newValue, oldValue) => {
  // eslint-disable-next-line no-debugger
  state.myrouters = newValue.children
}, { deep: true, immediate: true })

const goRuoter = (item: any) => {
  router.push(item.path);
}

watch(() => route, (newValue, oldValue) => {
  state.routerPath = newValue.path
}, { deep: true, immediate: true })

</script>
<style lang="less">
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout-background {
  background: #fff;
}

.site-layout-background {
  background: #141414;
}
</style>
