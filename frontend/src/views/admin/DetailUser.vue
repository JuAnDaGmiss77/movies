<template>
  <div class="container mx-auto">
    <navbar />

    <div>
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ user.firstName + ' ' + user.lastName}}</div>
          <p class="text-gray-700 text-base">
            <strong>Birthday: </strong>{{user.birthday}}
          </p>
          <p class="text-gray-700 text-base">
            <strong>City: </strong>{{ user.city }}
          </p>
          <p class="text-gray-700 text-base">
            <strong>Email: </strong>{{ user.email }}
          </p>
          <p class="text-gray-700 text-base">
            <strong>Role: </strong>
            <template v-if="user.role == 0">Regular user</template>
            <template v-if="user.role == 1">Creator</template>
            <template v-if="user.role == 2">Admin</template>
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span
            class="
              inline-block
              bg-black
              rounded-full
              px-3
              py-1
              text-sm
              font-semibold
              text-white
              mr-2
              mb-2
              cursor-pointer
            "
            @click="back()"
            >Back</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import axios from "@/axios";
import Swal from "sweetalert2";
export default {
  components: { Navbar },
  name: "DetailUser",
  data() {
    return {
      id: "",
      user: "",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getUser();
  },

  methods: {
    back() {
        this.$router.push({ name:"PanelAdmin" })
    },
    async getUser() {
      try {
        const response = await axios.get("users/" + this.id, {
          withCredentials: true,
        });
        this.user = response.data;
      } catch (error) {
        Swal.fire({
          title: "OPPS",
          text: "Acceso denegado",
          icon: "warning",
        });
        return this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

