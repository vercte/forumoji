<script setup lang="ts">
const content: {
  codepoint: string;
  image: string;
  url: string;
  author: string[];
}[] = (await fetch("/resources/forumoji.json").then((r) => r.json())).emoji;
</script>

<template>
  <Title>forumoji-www</Title>
  <EmojiList :content="content"></EmojiList>
</template>
