<script setup lang="ts">
defineProps<{
  href?: string;
}>();
</script>

<template>
  <NuxtLink
    :href="href"
    class="font-bold text-blue-800 hover:underline dark:text-blue-200"
    v-if="href"
  >
    <slot></slot>
  </NuxtLink>
  <button
    class="font-bold text-blue-800 hover:underline dark:text-blue-200"
    v-else
  >
    <slot></slot>
  </button>
</template>
