<template>
  <div class="chat-input">
    <input v-model="username" placeholder="Your Name" />
    <input v-model="message" @keyup.enter="sendMessage" placeholder="Type a message..." />
    <button @click="sendMessage">Send Message</button>
    <input type="file" ref="fileInput" @change="uploadImage" accept="image/*" />
    <button @click="sendImage">Send Image</button>
  </div>
</template>

<script>
export default {
  name: "ChatInput",
  data() {
    return {
      username: "", // Добавили поле для имени пользователя
      message: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== "") {
        this.$emit("message-sent", { name: this.username, message: this.message });
        this.message = "";
      }
    },
    sendImage() {
      const file = this.$refs.fileInput.files[0];
      if (file) {
        this.$emit("image-uploaded", file);
        this.$refs.fileInput.value = ""; // Сброс поля выбора файла
      }
    },
    uploadImage() {
      const file = this.$refs.fileInput.files[0];
      if (file) {
        this.convertImageToBase64AndSend(file);
        this.$refs.fileInput.value = "";
      }
    },
    openImageDialog() {
      this.$refs.fileInput.click();
    },
    convertImageToBase64AndSend(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        this.$emit("image-uploaded", { type: "image", image: base64Image });
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>


<style scoped>
.chat-input {
  display: flex;
  flex-direction: column; /* Для вертикального расположения элементов */
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.input-field {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
}

.button {
  margin: 5px;
  padding: 8px 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Добавим фон за именем пользователя */
.user-name {
  background-color: #f8f8f8; /* Цвет фона для имени пользователя */
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
}.send-button {
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