<template>
  <div class="flex flex-col justify-center h-full mt-4">
    <!-- Table -->
    <div
      class="
        w-full
        max-w-2
        mx-auto
        bg-white
        shadow-lg
        rounded-sm
        border border-gray-200
      "
    >
      <header class="px-5 py-4 border-b border-gray-100">
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
          @click="createMovie()"
          >Create User
        </span>
        <h2 class="font-semibold text-gray-800">Movie list</h2>
      </header>
      <div class="p-3">
        <div class="overflow-x-auto">
          <table class="table-auto w-full">
            <thead
              class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
            >
              <tr>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-left">Title</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-left">Description</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-left">Date</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-100">
              <tr v-for="movie in movies" :key="movie._id">
                <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-800">
                      {{ movie.title }}
                    </div>
                  </div>
                </td>

                <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-800">
                      {{ movie.description }}
                    </div>
                  </div>
                </td>

                <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-800">
                      {{ movie.date }}
                    </div>
                  </div>
                </td>

                <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-800">
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
                        @click="deleteMovie(movie._id)"
                        >delete
                      </span>

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
                        @click="editMovie(movie._id)"
                        >edit
                      </span>
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
                        @click="detailMovie(movie._id)"
                        >details
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import Swal from "sweetalert2";
export default {
  name: "ListMovies",
  data() {
    return {
      movies: "",
      userData: '',
      _id: ''
    };
  },

  mounted() {
    this.getDataUser();
    
  },

  methods: {
    async getDataUser() {
      if (localStorage.getItem("dataUser")) {
        this.userData = await JSON.parse(localStorage.getItem("dataUser"));
        this._id = this.userData._id
        this.getMovies();
        

      }
    },
    createMovie() {
      this.$router.push({ name: "CreateMovie" });
    },
    detailMovie(id) {
      this.$router.push({ name: "DetailMovie", params: { id: id } });
    },
    editMovie(id) {
      this.$router.push({ name: "EditMovie", params: { id: id } });
    },
    async getMovies() {
      try {
        const response = await axios.get("movies/creatormovie/"+this._id , {
          withCredentials: true,
        });
        this.movies = response.data.movie
      } catch (error) {
        Swal.fire({
          title: "OPPS",
          text: "Acceso denegado",
          icon: "warning",
        });
        return this.$router.push({ name: "Login" });
      }
    },

    deleteMovie(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete(id);

          Swal.fire("Deleted!", "user has been deleted.", "success");
        }
      });
    },

    async delete(id) {
      try {
        const response = await axios.delete("users/" + id, {
          withCredentials: true,
        });
        this.getMovies();
      } catch (error) {
        Swal.fire({
          title: "OPPS",
          text: "Error!!!",
          icon: "error",
        });
      }
    },
  },
};
</script>