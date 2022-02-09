<template>
  <div class="flex">
    <div class="md:flex w-2/5 md:w-1/4 h-screen bg-white border-r hidden">
      <div class="mx-auto py-10">
        <h1
          class="
            text-2xl
            font-bold
            mb-10
            cursor-pointer
            text-[#EC5252]
            duration-150
          "
        >
          {{ userData.firstName }}
        </h1>
        <button
          @click="logout()"
          class="
            w-full
            py-3
            mt-10
            bg-gray-800
            rounded-sm
            font-medium
            text-white
            uppercase
            focus:outline-none
            hover:bg-gray-700 hover:shadow-none
          "
        >
          Logout
        </button>
      </div>
    </div>

    <div>
      <h3>lista de usuarios:</h3>
      <div v-for="user in users" :key="user.id">
        <small>{{user.firstName}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      userData: "",
      users: "",
    };
  },
  created() {
    this.getUsers();
    this.getDataUser();
  },
  // mounted() {
  //   
    
  // },
  methods: {
    getDataUser() {
      if (localStorage.getItem("dataUser")) {
        this.userData = JSON.parse(localStorage.getItem("dataUser"));
      }
    },
    async logout() {
      try {
        const response = await axios.post("auth/logout/", this.user, {
          withCredentials: true,
        });

        if (response.data.loggedOut == true) {
          this.$router.push({ name: "Login" });
          localStorage.removeItem("dataUser");
        }
      } catch (error) {
        Swal.fire({
          title: "OPPS",
          text: "Algo ha ocurrido en el servidor",
          icon: "error",
        });
      }
    },
    async getUsers() {

      try {
        const response = await axios.get("users/", {
          withCredentials: true,
        });
        this.users = response.data;
        
      } catch (error) {
        Swal.fire({
            title: "OPPS",
            text: "Acceso denegado",
            icon: "warning",
          });
        return this.$router.push({ name: 'Login'})
      }        
      
    },
  },
};
</script>
