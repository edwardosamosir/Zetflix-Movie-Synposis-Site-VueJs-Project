<script>
    export default {
        emits: ['patchMovieStatus', 'changePage', 'setGenreToEdit','setMovieToEdit', 'deleteGenre'],
        props: ['movie', 'genre','history', 'idx', 'tableId', 'role', 'genreToEdit'],
        methods: {
            patchMovieStatus(value){
                this.$emit('patchMovieStatus', value)
            },
            changePage(value){
                this.setMovieToEdit(this.movie)
                this.setGenreToEdit(this.genre)
                this.$emit('changePage', value)
            },
            setGenreToEdit(value){
                this.$emit('setGenreToEdit', value)
            },
            setMovieToEdit(value){
                this.$emit('setMovieToEdit', value)
            },
            deleteGenre(){
                this.$emit('deleteGenre', this.genre)
            }
        },
    }
</script>
<template>
    <template v-if="tableId === 'moviesTable'">
        <tr>
            <td>{{idx+1}}</td>
            <td>{{movie.title}}</td>
            <td><img :src="movie.imgUrl" alt="" width="200" height="290"/></td>
            <td>{{movie.Genre.name }}</td>
            <td><a :href="movie.trailerUrl">{{movie.title}}</a></td>
            <td>{{movie.synopsis}}</td>
            <td>{{movie.rating}}</td>
            <td>{{movie.author.email}}</td>
            <td v-if="this.role === 'Staff'">{{movie.status}}</td>
            <td v-else>
                <select style="width: 100px;" v-model="movie.status" class="form-control" @change="(event) => patchMovieStatus({movieId: movie.id, status: event.target.value})">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Archived">Archived</option>
                </select>
            </td>
            <td>
                <a  @click.prevent="changePage('edit-movies')"
                    class="ms-3"><i class="bi bi-pencil-fill" style="color: white; font-size: 1.25rem;"></i>
                </a>
            </td>
        </tr>
    </template>
    <template v-if="tableId === 'genresTable'">
        <tr>
            <td>{{idx+1}}</td>
            <td>{{genre.name}}</td>
            <td>
                <a  @click.prevent="changePage('edit-genres')"
                    class="ms-3"><i class="bi bi-pencil-fill" style="color: white; font-size: 1.25rem;"></i>
                </a>
            </td>
            <td>
                <a @click.prevent="deleteGenre()"
                    class="ms-3"><i class="bi bi-trash-fill" style="color: #fe0002; font-size: 1.25rem;"></i>
                </a>
            </td>
        </tr>
    </template>
    <template v-if="tableId === 'historiesTable'">
        <tr>
            <td>{{idx+1}}</td>
            <td>{{history.title}}</td>
            <td>{{history.description}}</td>
            <td>{{history.createdAt}}</td>
            <td>{{history.updatedBy}}</td>
        </tr>
    </template>
</template>