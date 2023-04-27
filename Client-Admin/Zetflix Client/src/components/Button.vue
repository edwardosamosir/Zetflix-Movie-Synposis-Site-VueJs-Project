<script>
export default {
    name : 'MyButton',
    props : ['buttonName','buttonId'],
}
</script>

<template>
    <template  v-if="buttonId === 'addButton'">
        <button type="button" class="btn"><i class="bi bi-plus-lg" style="font-size: 17px;"></i>{{buttonName}}</button>
    </template>
    <template v-else>
        <button class="btn">{{buttonName}}</button>
    </template>
</template>
