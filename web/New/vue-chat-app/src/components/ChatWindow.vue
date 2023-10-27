<template>
  <div class="chat-window">
    <div v-for="message in messages" :key="message.id">
      <p v-if="message.type === 'text'" class="message">
        <span class="user-name">{{ message.name }}:</span> {{ message.message }}
      </p>
      <img v-else-if="message.type === 'image'" :src="message.image" alt="User Image" class="message-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatWindow",
  props: {
    messages: Array,
  },
};
</script>
<style scoped>

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Высота 100% видимой области браузера */
}

.chat-container {
  width: 50%; /* Ширина контейнера 50% от родительского */
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}
.chat-window {
  max-height: 900px;
  overflow-y: scroll;
}

.message {
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 5px;
  margin: 5px 0;
}

.user-name {
  font-weight: bold;
  background-color: #afe5e7; /* Цвет фона для имени пользователя */
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.text-message {
  margin-top: 5px; /* Добавим небольшой верхний отступ для текстовых сообщений */
}

.message-image {
  max-width: 200px; /* Максимальная ширина для изображения */
  max-height: 200px; /* Максимальная высота для изображения */
  border-radius: 5px; /* Добавим закругленные углы */
}
.send-button {
  padding: 5px 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}
</style>
