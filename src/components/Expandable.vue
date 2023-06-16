<script setup lang="ts">
import type { IProductItem } from '../type/response'

interface Props {
    column: any
    row: IProductItem
}
const props = defineProps<Props>()
</script>

<template>
    <div class="border rounded-md p-3">
        <h1 class="text-center text-2xl my-4">View Details</h1>
        <hr>
        <div class="my-4">
            <h3 class="text-xl">Title: {{ row.title }}</h3>
            <div>Price: {{ row.price }}</div>
            <div>Rating: {{ row.rating }}</div>
            <div>Description: {{ row.description }}</div>
        </div>
    </div>
</template>