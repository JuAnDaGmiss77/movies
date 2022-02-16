<template>
    <nav class="flex items-center justify-between bg-gray-800 h-20 shadow-2xl">
      <div class="logo">
        <h1 class="text-white ml-4 cursor-pointer text-2xl">Movie</h1>
      </div>
      <ul class="flex">
        <li>
          <a class="text-white cursor-pointer mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" ><i class="fas fa-home"></i> Home</a>
        </li>
        <li>
          <a class="text-white cursor-pointer mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" @click="goLogin()"><i class="fas fa-question"></i> Login</a>
        </li>
        <li>
          <a class="text-white cursor-pointer mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" @click="goSignup()"><i class="fas fa-reply"></i> Signup</a>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        goLogin() {
            this.$router.push({ name: "Login" });
        },
        goSignup() {
            this.$router.push({ name: "Register" });
        },
    },
}
</script>