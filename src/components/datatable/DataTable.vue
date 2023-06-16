<script setup lang="ts">
import { IDatatableOption } from '../../type/datatable'

// components
import Loader from '../Loader.vue'
import DataTableRow from './DataTableRow.vue'

interface Props {
    option: IDatatableOption
    list: any[]
    loading?: boolean
}

defineProps<Props>()

</script>

<template>
    <div class="relative">
        <loader v-if="loading" />
        <table class="w-full min-h-[200px]">
            <thead>
                <tr>
                    <td class="border px-3 py-2 font-bold" v-for="(column, index) in option.columns" :class="column.class" :key="`${option.id}-column-${index}`">
                        <span>{{ column.name }}</span>
                    </td>
                </tr>
            </thead>
            <tbody>
                <data-table-row v-for="(row, index) in list" :row="row" :options="option" :key="`${option.id}-item-${index}-${row.id || 0}`" />
            </tbody>
        </table>
    </div>
</template>