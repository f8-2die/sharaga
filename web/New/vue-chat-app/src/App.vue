<template>
  <div id="app">
    <ChatWindow :messages="messages" />
    <ChatInput @message-sent="sendMessage" @image-uploaded="sendImage" />
  </div>
</template>

<script>
import ChatWindow from "./components/ChatWindow.vue";
import ChatInput from "./components/ChatInput.vue";

export default {
  name: "App",
  components: {
    ChatWindow,
    ChatInput,
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    sendMessage(message) {
      this.messages.push({ type: "text", ...message });
      this.updateLocalStorage();
    },
    sendImage(image) {
      this.messages.push({ type: "image", ...image });
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem('chatMessages', JSON.stringify(this.messages));
      // Добавьте это обновление для уведомления других вкладок о изменениях
      window.dispatchEvent(new Event('storage'));
    },
  },
  created() {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      this.messages = JSON.parse(storedMessages);
    }

    // Добавьте слушатель события storage для обновления сообщений в реальном времени
    window.addEventListener('storage', () => {
      const storedMessages = localStorage.getItem('chatMessages');
      if (storedMessages) {
        this.messages = JSON.parse(storedMessages);
      }
    });
  },
};
</script>
