<template>
  <div class="login-box">
    <erath class="erath"></erath>
    <a-form
      layout="horizontal"
      :model="state.formInline"
      @submit.prevent="handleSubmit"
      class="form"
    >
      <a-form-item>
        <dv-decoration-11
          html-type="submit"
          style="height: 60px; width: 200px; margin: auto; margin-bottom: 100px"
          >欢迎！
        </dv-decoration-11>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          :loading="state.loading"
          block
        >
          进入
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { Store, useStore } from "vuex";
import erath from "../components/erath.vue";

const state = reactive({
  loading: false,
  captcha: "",
  formInline: {
    username: "",
    password: "",
  },
});

// const route = useRoute();
const router = useRouter();

const store: Store<any> = useStore();

const handleSubmit = async () => {
  state.formInline = { username: "1", password: "1" };
  // if (username.trim() == "" || password.trim() == "") {
  //   return message.warning("用户名或密码不能为空！");
  // }

  // message.loading("登录中...", 0);
  // state.loading = true;
  // // params.password = md5(password)

  await store.commit("SET_User", state.formInline);
  // if (err) {
  //   Modal.error({
  //     title: () => '提示',
  //     content: () => err.message,
  //   });
  // } else {
  //   message.success('登录成功！');
  //   setTimeout(() => router.replace((route.query.redirect as string) ?? '/'));
  // }
  message.success("进入成功！");
  // setTimeout(() => router.replace((route.query.redirect as string) ?? "/"));
  router.push("/vue/thisop");
  state.loading = false;
  message.destroy();
};
</script>

<style lang="less" scoped>
.erath {
  position: absolute;
}

.form {
  padding-top: 300px;
}
.login-box {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: url("~@/assets/login.svg");
  background-size: 100%;
  flex-direction: column;
  align-items: center;

  .login-logo {
    display: flex;
    margin-bottom: 30px;
    align-items: center;

    .svg-icon {
      font-size: 48px;
    }
  }

  :deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }

    .ant-form-item-label {
      padding-right: 6px;
    }
  }
}
</style>
