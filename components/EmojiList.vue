<script setup lang="ts">
const props = defineProps<{
  content: {
    codepoint: string;
    image: string;
    url: string;
    author: string[];
  }[];
}>();

const error = {
  codepoint: "U+1F4A5",
  image: "collision.png",
  url: "https://assets.scratch.mit.edu/get_image/.%2E/ca1561b7c9c545c63146246408279d2a.svg",
  author: ["TheTrillion", "If you see this, then something went wrong."],
  error: true,
};

const unicode: {
  category: string;
  contents: {
    category: string;
    contents: {
      codepoint: string;
      name: string;
      keywords: string[];
    }[];
  }[];
}[] = (await fetch("/resources/unicode-emoji.json").then((r) => r.json()))
  .contents;

const query = ref("");

const search = (stringQuery: string) => {
  query.value = stringQuery;
};
</script>
<template>
  <div>
    <div class="mb-4 flex justify-between">
      <h2 class="inline-block text-2xl font-bold">Emoji</h2>
      <input
        placeholder="Search"
        type="search"
        class="rounded-lg bg-gray-300 px-2 py-1 dark:bg-gray-700"
        :value="query"
        @change="search(($event.target as HTMLInputElement).value)"
      />
    </div>
    <details v-for="category in unicode" open>
      <summary class="cursor-pointer text-lg font-bold">
        {{ category.category }}
      </summary>
      <template v-for="innerCategory in category.contents">
        <Emoji
          v-bind="{
            error: false,
            ...unicodeEmoji,
            ...(content.find(
              (emoji) => emoji.codepoint === unicodeEmoji.codepoint
            ) ?? error),
          }"
          v-model:query="query"
          v-for="unicodeEmoji in innerCategory.contents"
          @search="search"
        >
        </Emoji>
      </template>
    </details>
    <p class="my-14 w-full text-center text-3xl font-bold">
      That's all for now! If you want to add your own, you can find out how in
      the GitHub repository or the forum topic.
    </p>
  </div>
</template>
