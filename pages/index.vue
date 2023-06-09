<script setup lang="ts">
const content: {
  codepoint: string;
  image: string;
  url: string;
  author: string[];
}[] = (
  await fetch(
    "https://raw.githubusercontent.com/lopste/forumoji/main/resources/forumoji.json"
  ).then((r) => r.json())
).emoji;
</script>

<template>
  <Title>forumoji-www</Title>
  <EmojiList :content="content"></EmojiList>
</template>
