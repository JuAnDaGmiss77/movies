<template>
    <div class="container mx-auto">
    <navbar />
    <div class="flex flex-col h-screen mt-4">
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
            Create Movie
          </h2>

          <div class="mt-10">
            <!-- FirstName Input -->
            <label
              for="title"
              class="block text-xs font-semibold text-gray-600 uppercase"
              >Title</label
            >
            <input
              id="title"
              type="text"
              name="title"
              placeholder="title"
              autocomplete="title"
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
              v-model="movie.title"
              required
            />

            <!-- LastName Input -->
            <label
              for="lastName"
              class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >Descriptiom</label
            >
            <input
              id="description"
              type="text"
              name="description"
              placeholder="description"
              autocomplete="description"
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
              v-model="movie.description"
              required
            />

            <!-- City Input -->
            <label
              for="date"
              class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >Date</label
            >
            <input
              id="date"
              type="date"
              name="date"
              placeholder="date"
              autocomplete="date"
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
              v-model="movie.date"
              required
            />

            <!-- Birthday Input -->
            <label
              for="imgURL"
              class="block text-xs font-semibold text-gray-600 uppercase"
              >URL image</label
            >
            <input
              id="imgURL"
              type="text"
              name="imgURL"
              autocomplete="imgURL"
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
              v-model="movie.imgURL"
              required
            />
            <!-- Auth Buttton -->
            <button
              @click="saveMovie()"
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
              Save
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
  name: 'CreateMovie',
  components: { Navbar },
  data() {
    return {
      movie: {
        title: "",
        description: "",
        date: "",
        imgURL: "",
        email: "",

      }
    };
  },

  mounted() {
      this.getDataUser()
  },

  methods: {
    getDataUser() {
          if (localStorage.getItem("dataUser")) {
            const userData = JSON.parse(localStorage.getItem("dataUser"));
            this.movie.email = userData.email
          }
    },
    async saveMovie() {
      try {
        const response = await axios.post("movies",this.movie, {
          withCredentials: true,
        });
        Swal.fire("Created!", "movie has been Created.", "success");
        return this.$router.push({ name: "PanelCreator" });
    
      } catch (error) {
        Swal.fire({
          title: "OPPS",
          text: "Complete todos los campos",
          icon: "warning",
        });
      }
    },
  },
};
</script>
