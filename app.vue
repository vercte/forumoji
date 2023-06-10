<script setup lang="ts">
const dark = ref(localStorage.getItem("dark") === "true" ?? false);
effect(() => {
  localStorage.setItem("dark", dark.value.toString());
});
</script>

<template>
  <Html :class="{ dark }" lang="en"></Html>
  <Body class="dark:bg-gray-900 dark:text-white"></Body>
  <div>
    <header
      class="sticky top-0 z-50 mb-4 flex justify-between bg-orange-500 px-4 py-2 dark:bg-orange-800 dark:text-white"
    >
      <div>
        <h1 class="inline-block text-3xl font-semibold">
          Forum<img
            class="pixelated inline-block h-8 w-8"
            alt="o"
            src="/resources/forumoji/grinning-face.png"
          />ji
        </h1>
        <nav class="ml-4 inline-block">
          <Url href="/">Main</Url>
          •
          <Url href="https://github.com/lopste/forumoji">GitHub</Url>
          •
          <Url href="https://scratch.mit.edu/discuss/topic/557083/"
            >Forum Topic</Url
          >
        </nav>
      </div>
      <div class="flex items-end">
        <button type="button" @click="dark = !dark">
          <img
            :src="
              dark
                ? '/resources/forumoji/first-quarter-moon-face.png'
                : '/resources/forumoji/sun-with-face.png'
            "
            :alt="dark ? 'Light mode' : 'Dark mode'"
            class="pixelated h-8 w-8"
          />
        </button>
      </div>
    </header>
    <main class="mx-3">
      <NuxtPage></NuxtPage>
    </main>
  </div>
</template>
