<script>
    import TableRow from './TableRow.vue'

    export default {
        components: {
            TableRow
        },
        props: ['histories', 'role'],
        emits: ['changePage',"fetchHistories"],
        methods: {
            fetchHistories(){
                this.$emit('fetchHistories')
            }
        },
        created(){
            this.fetchHistories()
        },
    }
</script>
<template>
    <section class="logs-section" style="margin-top: 200px;">
      <div class="container mt-5 pt-4 d-flex flex-column" style="background-color: #191919; margin-bottom: 100px;">
          <div class="row justify-content-center">
              <h1 class="text-white text-center">History Logs</h1>
          </div>
          <div class="d-flex justify-content-center gap-3">
              <table id="logs-table" class="table">
                  <thead class="text-white">
                      <tr>
                          <th scope="col">No</th>
                          <th scope="col">Movie Title</th>
                          <th scope="col">Description</th>
                          <th scope="col">Created At</th>
                          <th scope="col">Updated By</th>
                      </tr>
                  </thead>
                  <tbody class="text-white">
                        <TableRow :tableId="'historiesTable'"
                            v-for="(history, idx) in histories" :key="history.id"
                            :history="history" :idx="idx"
                        />
                  </tbody>
              </table>
          </div>
      </div>
  </section> 
</template>