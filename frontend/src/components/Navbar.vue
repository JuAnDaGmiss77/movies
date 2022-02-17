<template>
    <nav class="flex items-center justify-between bg-gray-800 h-20 shadow-2xl">
      <div class="logo">
        <h1 class="text-white ml-4 cursor-pointer text-2xl">Movie</h1>
      </div>
      <ul class="flex">
        <li>
          <a class="text-white cursor-pointer mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" @click="home()"><i class="fas fa-home"></i> Home</a>
        </li>
        <li>
          <a v-if="validarEstado == false" class="text-white cursor-pointer mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" @click="goLogin()"><i class="fas fa-question"></i>Login</a>
          <a v-if="userData.role == 1 & userData != ''" class="text-white cursor-pointer mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" @click="goLogin()"><i class="fas fa-question"></i>My Movies</a>
          <a v-if="userData.role == 2 & userData != ''" class="text-white cursor-pointer mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" @click="goPanelAdmin()"><i class="fas fa-question"></i>Panel Admin</a>

          
        </li>
        <li>
          <a v-if="validarEstado == false" class="text-white cursor-pointer mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" @click="goSignup()"><i class="fas fa-reply"></i>Signup</a>
          <a v-if="validarEstado == true" class="text-white cursor-pointer mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" @click="logout()"><i class="fas fa-reply"></i>LogOut</a>

        </li>
      </ul>
    </nav>
</template>

<script>
import axios from "../axios"
import Swal from "sweetalert2"
export default {
    name: 'Navbar',
    data() {
      return {
        userData: '',
        validarEstado: false
      }
    },
    mounted() {
      this.getDataUser()
    },
    methods: {
        getDataUser() {
          if (localStorage.getItem("dataUser")) {
            this.userData = JSON.parse(localStorage.getItem("dataUser"));
            this.validarEstado = true
          }
        },
        goLogin() {
          this.$router.push({ name: "Login" });
        },
        goSignup() {
          this.$router.push({ name: "Register" });
        },
        goPanelAdmin() {
          this.$router.push({ name: "PanelAdmin"})
        },
        home() {
          this.$router.push({ name: "Home" })
        },
        async logout() {
          try {
            const response = await axios.post("auth/logout/", this.user, {
              withCredentials: true,
            });

            if (response.data.loggedOut == true) {
              this.$router.push({ name: "Home" });
              localStorage.removeItem("dataUser");
              this.validarEstado = false
              this.userData = ''
            }
          } catch (error) {
            Swal.fire({
              title: "OPPS",
              text: "Algo ha ocurrido en el servidor",
              icon: "error",
            });
          }
        },
    },
    
}
</script>