<template>
  <div
    class="flex flex-row flex-no-wrap bg-teal-200 p-3 m-2 overflow-x-auto min-w-full max-w-xl rounded text-gray-700"
  >
    <h1 class="font-bold mr-2">{{ paramKey }}:</h1>
    <span class="inline">{{ paramValue }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private paramKey!: string;
  @Prop() private paramValue!: string;
}
</script>
