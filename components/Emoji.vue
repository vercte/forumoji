<script setup lang="ts">
const props = defineProps<{
  codepoint: string;
  image: string;
  url: string;
  author: string[];
  name: string;
  keywords: string[];
  error: boolean;
  query: string;
}>();
defineEmits(["update:query"]);

const needToLoad = ref(false);
const copy = (text: string) => {
  navigator.clipboard.writeText(text);
};

const card = ref<HTMLElement>();
const main = ref<HTMLElement>();

const width = ref(innerWidth);
addEventListener("resize", () => {
  width.value = innerWidth;
});

const alignRight = computed(() => {
  if (!card.value || !main.value) {
    return;
  }
  return main.value.getBoundingClientRect().x >= width.value / 2;
});
const titleName = computed(() => {
  return props.name[0].toUpperCase() + props.name.slice(1);
});
const emoji = computed(() => {
  return props.codepoint
    .split(" ")
    .map((codePoint) => String.fromCodePoint(parseInt(codePoint.slice(2), 16)))
    .join("");
});

const emojiImageFrom = (url: string) => {
  return `/resources/forumoji/${url}`;
};

const emojiImage = computed(() => {
  return emojiImageFrom(props.image);
});
</script>

<template>
  <div
    class="group relative inline-block"
    ref="main"
    @mouseover="needToLoad = true"
    v-if="!error"
    v-show="
      [name, image, emoji, ...keywords, ...author].some((el) =>
        el.includes(query)
      )
    "
  >
    <div class="m-1 rounded-full bg-gray-300 p-1 dark:bg-gray-700">
      <img
        :src="emojiImage"
        :title="titleName"
        :alt="titleName"
        lazy
        class="pixelated inline-block h-10 w-10 cursor-pointer transition-transform group-hover:scale-150"
      />
    </div>
    <div
      class="absolute z-10 flex w-max max-w-sm scale-0 flex-col gap-2 rounded-lg bg-gray-300 px-2 py-1 shadow-lg shadow-gray-400 transition-transform group-hover:scale-100 dark:bg-gray-700 dark:shadow-gray-600"
      :class="{ 'right-0': alignRight }"
      ref="card"
      v-if="needToLoad"
    >
      <div>
        <img :src="emojiImage" role="presentation" class="inline-block" lazy />
        {{ emoji }}
        {{ titleName }}
        <small class="text-xs"
          >{{ codepoint }} <code>{{ image }}</code></small
        >
      </div>
      <div>
        <Url @click="copy(url)">
          <img
            :src="emojiImageFrom('clipboard.png')"
            role="presentation"
            class="inline-block"
          />
          Copy from assets</Url
        >
        •
        <Url @click="copy(emojiImage)">
          <img
            :src="emojiImageFrom('clipboard.png')"
            role="presentation"
            class="inline-block"
          />
          Copy from GitHub</Url
        >
      </div>
      <div>
        <span v-for="keyword in keywords" class="mx-0.5">
          <Url @click="$emit('update:query', keyword)"
            ><img
              :src="emojiImageFrom('right-magnifying-glass.png')"
              role="presentation"
              class="inline-block"
            />&nbsp;{{ keyword }}</Url
          >
        </span>
      </div>
      <ul>
        <li v-for="individual in author">
          <Url :href="`https://scratch.mit.edu/users/${individual}`">
            <img
              :src="emojiImageFrom('person.png')"
              role="presentation"
              class="inline-block"
              lazy
            />&nbsp;{{ individual }}</Url
          >
        </li>
      </ul>
    </div>
  </div>
</template>
