<!-- ChatContainer.vue -->
<template>
  <div class="ChatContainer">
    <div v-for="(message, index) in messages" :key="index" class="message">
      <template v-if="message.type === 'text'">
        <span v-if="message.nickname" class="nickname">{{ message.nickname }}:</span>
        <span class="message-text">{{ message.content }}</span>
      </template>
      <template v-else-if="message.type === 'image'">
        <div>
          <span v-if="message.nickname" class="nickname">{{ message.nickname }}:</span>
          <img :src="message.content" alt="Sent Image" class="sent-image" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
//экспорт компонента Vue
export default {
  //определение параметров
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
    nickname: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
@import 'styles.css';
</style>
