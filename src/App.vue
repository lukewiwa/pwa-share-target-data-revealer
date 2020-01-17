<template>
  <div
    id="app"
    class="container mx-auto flex flex-col items-stretch align-center max-w-2xl"
  >
    <div
      class="bg-white flex flex-col items-stretch align-center p-6 m-8 border border-teal-500 rounded-lg"
    >
      <h1 class="text-2xl font-bold mt-4 mb-6 self-center text-teal-700">
        PWA Share Target Data Revealer
      </h1>
      <div class="text-teal-800 my-4" v-if="emptyParams">
        Install this app as a PWA to your android phone and then share from any
        other app to PWA Share Target Revealer to show the data transferred
      </div>
      <div class="my-4" v-else>
        <h2 class="text-xl text-teal-700 py-4">Parameter Values</h2>
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
