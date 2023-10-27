<template>
  <div class="user-list">
    <h3>User List</h3>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "UserList",
  props: {
    users: Array, // Принимаем массив пользователей
  },
};
</script>

<style scoped>
.user-list {
  background-color: #f0f0f0; /* Цвет фона для блока с пользовательским списком */
  padding: 10px;
  border-radius: 5px;
  width: 200px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>