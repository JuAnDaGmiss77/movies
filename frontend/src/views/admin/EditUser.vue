<template>
    <div class="container mx-auto">
        <navbar/>
        <!-- Container -->
        <div class="mt-4 flex flex-col h-screen">
            <!-- Auth Card Container -->
            <div class="grid place-items-center mx-2 my-20 sm:my-auto">
            <!-- Auth Card -->
            <div
                class="
                w-11/12
                p-12
                sm:w-8/12
                md:w-6/12
                lg:w-5/12
                2xl:w-4/12
                px-6
                py-10
                sm:px-10 sm:py-6
                bg-white
                rounded-lg
                shadow-md
                lg:shadow-lg
                "
            >
                <!-- Card Title -->
                <h2
                class="text-center font-semibold text-3xl lg:text-4xl text-gray-800"
                >
                Signup
                </h2>

                <div class="mt-10">
                <!-- FirstName Input -->
                <label
                    for="firstName"
                    class="block text-xs font-semibold text-gray-600 uppercase"
                    >first Name</label
                >
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="first Name"
                    autocomplete="first Name"
                    class="
                    block
                    w-full
                    py-3
                    px-1
                    mt-2
                    text-gray-800
                    appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-600
                    "
                    v-model="user.firstName"
                    required
                />

                <!-- LastName Input -->
                <label
                    for="lastName"
                    class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >last Name</label
                >
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    autocomplete="Last Name"
                    class="
                    block
                    w-full
                    py-3
                    px-1
                    mt-2
                    text-gray-800
                    appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-600
                    "
                    v-model="user.lastName"
                    required
                />

                <!-- Email Input -->
                <label
                    for="email"
                    class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >E-mail</label
                >
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="e-mail address"
                    autocomplete="email"
                    class="
                    block
                    w-full
                    py-3
                    px-1
                    mt-2
                    text-gray-800
                    appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-600
                    "
                    v-model="user.email"
                    required
                />

                 <!-- Birthday Input -->
          <label
            for="birthday"
            class="block text-xs font-semibold text-gray-600 uppercase"
            >Birthday</label
          >
          <input
            id="birthday"
            type="date"
            name="birthday"
            autocomplete="birthday"
            class="
              block
              w-full
              py-3
              px-1
              mt-2
              text-gray-800
              appearance-none
              border-b-2 border-gray-100
              focus:text-gray-500 focus:outline-none focus:border-gray-200
            "
            v-model="user.birthday"
            required
          />

                <!-- City Input -->
                <label
                    for="city"
                    class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >City</label
                >
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="city"
                    autocomplete="city"
                    class="
                    block
                    w-full
                    py-3
                    px-1
                    mt-2
                    mb-2
                    text-gray-800
                    appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-600
                    "
                    v-model="user.city"
                    required
                />

                <!-- Auth Buttton -->
                <button
                    @click="updateUser()"
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
                    update
                </button>

                <button
                    @click="back()"
                    class="
                    w-full
                    py-3
                    mt-4
                    bg-gray-800
                    rounded-sm
                    font-medium
                    text-white
                    uppercase
                    focus:outline-none
                    hover:bg-gray-700 hover:shadow-none
                    "
                >
                    Back
                </button>
                </div>
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
    async updateUser() {
        try {
        const response = await axios.put("users/" + this.id, this.user, {
          withCredentials: true,
        });
        Swal.fire("Updated!", "user has been updated.", "success");
        return this.$router.push({ name: "PanelAdmin" });
      } catch (error) {
        Swal.fire({
          title: "OPPS",
          text: "fill in the fields",
          icon: "warning",
        });
        
      }
    },
  },
};
</script>
