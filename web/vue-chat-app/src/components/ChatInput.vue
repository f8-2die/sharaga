<!-- ChatInput.vue -->
<template>
  <div class="chat-input">
    <input v-model="nickname" placeholder="никнейм" @input="updateNickname" class="nickname-input" />
    <input v-model="message" @keyup.enter="sendMessage" placeholder="Введите сообщение" class="text-input"/>
    <label for="file-input" class="custom-file-upload"> </label>
    <input id="file-input" type="file" ref="fileInput" @change="handleFileChange" class="file-input" />
    <button @click="sendImage">Отправить изображение</button>
  </div>
</template>

<script>
export default {
  props: ['initialNickname'],

  data() {
    return {
      nickname: this.initialNickname,
      message: '',
      selectedImage: null,
    };
  },

  methods: {
    sendMessage() {
      if (this.nickname.trim() !== '' && this.message.trim() !== '') {
        //генерация пользовательского события
        this.$emit('message', { type: 'text', nickname: this.nickname, content: this.message });
        this.message = '';
      } else {
        alert('Введите никнейм и сообщение');
      }
    },

    updateNickname() {
      this.$emit('update:nickname', this.nickname); // Передаем обновленный nickname в родительский компонент
    },
    handleFileChange(event) {
      if (event.target.files && event.target.files.length > 0) {
        this.selectedImage = event.target.files[0];
      }
    },
    sendImage() {
      if (this.nickname.trim() !== '' && this.selectedImage) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target.result; //чтение файла
          this.$emit('message', { type: 'image', nickname: this.nickname, content: imageData });
        };
        reader.readAsDataURL(this.selectedImage);
        this.selectedImage = null;
        this.$refs.fileInput.value = '';
      } else {
        alert('Введите никнейм и выберите изображение');
      }
    },
  },
};
</script>

<style scoped>
@import 'styles.css';
</style>
