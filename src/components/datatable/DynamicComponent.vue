<script setup lang="ts">
import type { IDatatableColumn } from '../../type/datatable'
import type { Component } from 'vue'
interface Props {
    componentIs: Component,
    column: IDatatableColumn,
    row: any
}
const props = defineProps<Props>()
</script>

<template>
    <component :is="componentIs" :row="row" :column="column.modifire ? column.modifire(row[column.key], row) : row[column.key]" />
</template>