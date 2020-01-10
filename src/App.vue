<template>
  <div
    id="app"
    class="container mx-auto p-4 flex flex-col items-center min-w-full"
  >
    <div class="flex-col items-center align-center content-center max-w-2xl">
      <h1 class="text-2xl font-bold mb-4">PWA Share Target Data Revealer</h1>
      <div v-if="emptyParams">
        Install this app as a PWA to your android phone and then share from any
        other app to PWA Share Target Revealer to show the data transferred
      </div>
      <div v-else>
        <h2 class="text-xl">Parameter Values</h2>
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
import { Component, Vue } from "vue-property-decorator";
import ParamView from "./components/ParamView.vue";

@Component({
  components: {
    ParamView
  }
})
export default class App extends Vue {
  params = {};
  get emptyParams() {
    return Object.entries(this.params).length === 0;
  }
  created() {
    const currentUrl = new URL(location.href);
    const params = new URLSearchParams(currentUrl.search);
    for (const [key, value] of params.entries()) {
      this.params = { ...this.params, [key]: value };
    }
  }
}
</script>
