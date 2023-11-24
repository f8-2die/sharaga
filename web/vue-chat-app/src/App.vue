<!-- App.vue -->
<template>
  <div id="app">
    <chat-container :messages="messages" />
    <chat-input @message="sendMessage" :initialNickname="nickname" @update:nickname="updateNickname($event)" />
  </div>
</template>

<script>
import ChatContainer from './components/ChatContainer.vue';
import ChatInput from './components/ChatInput.vue';

export default {
  data() {
    return {
      messages: [],
      ws: null,
      nickname: '', 
    };
  },
  methods: {
    sendMessage(message) {
      if (this.nickname.trim() !== '' && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message));
      } else {
        alert('Введите никнейм');
      }
    },

    updateNickname(newNickname) {
      this.nickname = newNickname; // Обновляем nickname в родительском компоненте
    },

  },
  created() {
    // Инициализация WebSocket соединения при создании компонента
    this.ws = new WebSocket('ws://localhost:8080');
    
    // Обработчик входящих сообщений по WebSocket
    this.ws.onmessage = async (event) => {
      const parsedMessage = JSON.parse(event.data);
      if (parsedMessage.type === 'text' || parsedMessage.type === 'image') {
        this.messages.push({ type: parsedMessage.type, content: parsedMessage.content, nickname: parsedMessage.nickname });
      }
    };
  },
  components: {
    ChatContainer,
    ChatInput,
  },
};
</script>

<style>
@import 'components/styles.css';
</style>


