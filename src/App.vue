<template>
  <div
    id="app"
    class="container mx-auto flex flex-col items-stretch align-center min-w-min max-w-5xl"
  >
    <div
      class="bg-white flex flex-col items-stretch align-center p-10 m-8 border border-teal-500 rounded-lg"
    >
      <h1 class="text-2xl font-bold mb-6 self-center text-teal-700">
        PWA Share Target Data Revealer
      </h1>
      <div class="text-teal-800" v-if="emptyParams">
        Install this app as a PWA to your android phone and then share from any
        other app to PWA Share Target Revealer to show the data transferred.
        <div class="install-images">
          <img :src="pwaContextScreen" class="p-4" />
          <img :src="pwaConfirmScreen" class="p-4" />
        </div>
      </div>
      <div v-else>
        <h2 class="text-xl text-teal-700 my-3">Parameter Values</h2>
        <ParamView
          v-for="(value, key) in params"
          :key="key"
          :paramKey="key"
          :paramValue="value"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import ParamView from "./components/ParamView.vue";

export default defineComponent({
  components: { ParamView },
  setup() {
    const pwaContextScreen = require("./assets/pwa_install_screen_context.png");
    const pwaConfirmScreen = require("./assets/pwa_install_screen_confirm.png");

    const currentUrl = new URL(location.href);
    let params = new URLSearchParams(currentUrl.search);
    for (const [key, value] of params.entries()) {
      params = { ...params, [key]: value };
    }

    const emptyParams = computed(() => {
      return Object.entries(params).length === 0;
    });

    return { params, emptyParams, pwaContextScreen, pwaConfirmScreen };
  }
});
</script>

<style scoped>
.install-images {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, 350px);
  justify-content: center;
}
</style>
