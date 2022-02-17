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
          @click="createUser()"
          >Create User
        </span>
        <h2 class="font-semibold text-gray-800">User list</h2>
        
      </header>
      <div class="p-3">
        <div class="overflow-x-auto">
          <table class="table-auto w-full">
            <thead
              class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
            >
              <tr>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-left">First Name</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-left">Last Name</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-left">Birthday</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-center">City</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-center">Email</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-center">Role</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-100">
              <tr v-for="user in users" :key="user._id">
                <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-800">
                      {{ user.firstName }}
                    </div>
                  </div>
                </td>

                <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-800">
                      {{ user.lastName }}
                    </div>
                  </div>
                </td>

                <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-800">
                      {{ user.birthday }}
                    </div>
                  </div>
                </td>

                <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-800">{{ user.city }}</div>
                  </div>
                </td>

                <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-800">
                      {{ user.email }}
                    </div>
                  </div>
                </td>

                <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-800">
                      <template v-if="user.role == 0">Regular user</template>
                      <template v-if="user.role == 1">Creator</template>
                      <template v-if="user.role == 2">Admin</template>
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
                        @click="deleteUser(user._id)"
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
                        @click="editUser(user._id)"
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
                        @click="detailUser(user._id)"
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
  name: "ListUsers",
  data() {
    return {
      users: "",
    };
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    createUser(id) {
      this.$router.push({ name: "CreateUser"});
    },
    detailUser(id) {
      this.$router.push({ name: "DetailUser", params: { id: id } });
    },
    editUser(id) {
      this.$router.push({ name: "EditUser", params: { id: id } });
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
        return this.$router.push({ name: "Login" });
      }
    },

    deleteUser(id) {
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
        this.getUsers();
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