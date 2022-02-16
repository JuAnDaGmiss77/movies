<template >
  <div class="container mx-auto"> 
    <navbar/>
    <div class="grid  md:grid-cols-4 sm:grid-cols-min  gap-4 mt-4 " > 
      <div v-for="movie in movies" :key="movie.id">
          <div class="max-w-sm rounded overflow-hidden shadow-lg ">
            <img
              class="w-full"
              :src="movie.imgURL"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{{movie.title}}</div>
              <p class="text-gray-700 text-base">
                {{movie.description}}
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
                >Ver Detalle</span
              >
              
            </div>
          </div>
      </div>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src

import axios from "@/axios";
import Navbar from "../components/Navbar.vue"

export default {
  name: "Home",
  components: {
    Navbar
  },
  data() {
    return {
      movies: "",
    };
  },
  mounted() {
    this.getAllMovies();
  },

  methods: {
    async getAllMovies() {
      try {
        const response = await axios.get("movies/");
        this.movies = response.data.movies;
        console.log(this.movies);
      } catch (error) {}
    },
  },
};
</script>
