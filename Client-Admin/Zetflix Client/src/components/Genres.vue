<script>
    import TableRow from './TableRow.vue'
    import MyButton from './Button.vue'

    export default {
        components: {
            MyButton, TableRow,
        },
        props: ['genres', 'genreToEdit'],
        emits: ['changePage',"fetchGenres", "setGenreToEdit", "deleteGenre"],
        methods: {
            changePage(value) {
                this.$emit('changePage', value)
            },
            fetchGenres(){
                this.$emit('fetchGenres')
            },
            setGenreToEdit(value){
                this.$emit('setGenreToEdit', value)
            },
            deleteGenre(value){
                this.$emit('deleteGenre', value)
            }
        },
        created(){
            this.fetchGenres()
        },
    }
</script>
<template>
    <section class="movies-section" style="margin-top: 200px;">
        <div class="container mt-5 pt-4 d-flex flex-column" style="background-color: #191919; margin-bottom: 100px;">
            <div class="row justify-content-center">
                <h1 class="text-white text-center">Movie Genres</h1>
            </div>
            <div class="d-flex justify-content-end mb-3">
                <MyButton :buttonId="'addButton'" class="btn btn-danger" style="background-color: #fe0002;" :buttonName="'Add Movie Genres'" @click.prevent="changePage('add-genres')" />
            </div>
            <div class="d-flex justify-content-center gap-3">
                <table id="movies-table" class="table">
                    <thead class="text-white">
                        <tr>
                            <th scope="col" width="200px">No</th>
                            <th scope="col">Movie Genre</th>
                            <th scope="col" width="50px"></th>
                            <th scope="col" width="50px"></th>
                        </tr>
                    </thead>
                    <tbody class="text-white">
                        <TableRow :tableId="'genresTable'" @changePage="changePage" @setGenreToEdit="setGenreToEdit" @deleteGenre="deleteGenre"
                            v-for="(genre, idx) in genres" :key="genre.id"
                            :genre="genre" :idx="idx" 
                        />
                    </tbody>
                </table>
            </div>
        </div>
    </section> 
</template>