<template>
    <div class="container mx-auto">
        <list-movies/>
    </div>
</template>

<script>
import ListMovies from '../../components/creator/ListMovies.vue'
export default {
  components: { ListMovies },
    name :'PanelCreator'
}
</script>