<template>
    <div class="container mx-auto">
        <navbar/>
        <list-users/>
    </div>
</template>

<script>
import ListUsers from '../../components/admin/ListUsers.vue'
import Navbar from '../../components/Navbar.vue'
export default {
    components: {
        ListUsers,
        Navbar
    }
}
</script>

