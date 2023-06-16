<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'
import type { IDatatableColumn, IDatatableOption } from '../../type/datatable'

// components
import DynamicComponent from './DynamicComponent.vue'

interface Props {
    options: IDatatableOption
    row: any
}

interface IExpandableColumn {
    row: any
    column: IDatatableColumn
}

defineProps<Props>()

const expandedColumn = ref<IExpandableColumn | null>(null)

const expand = (column: IDatatableColumn, row: any) => {
    if ((expandedColumn.value?.column.key !== column.key)) {
        expandedColumn.value = { row, column }
    } else expandedColumn.value = null
}

</script>
<template>
    <tr>
        <template v-for="(column, index) in options.columns" :key="`${options.id}-item-${index}`">
            <td v-if="column.type === 'html'" class="border px-3 py-2" :class="column.class">
                <span v-html="column.modifire ? column.modifire(row[column.key], row) : row[column.key]"></span>
            </td>
            <td v-if="column.type === 'expandable-btn' && !!column.component" class="border px-3 py-2" :class="column.class">
                <div class="d-flex align-items-center">
                    <button class="rounded-md px-3 text-white py-1"
                        :class="(expandedColumn?.column.key === column.key) ? 'bg-red-500' : ' bg-green-500'"
                        @click="expand(column, row)">
                        {{ expandedColumn?.column.key === column.key ? 'Close' : 'Show' }}
                    </button>
                </div>
            </td>
        </template>
    </tr>
    <!-- expandable column row -->
    <tr v-if="!!expandedColumn?.column">
        <td :colspan="options.columns.length + (options.actions?.length ? 1 : 0)" class="border px-3 py-2">
            <dynamic-component :component-is="(expandedColumn.column.component as Component)" :row="expandedColumn.row"
                :column="expandedColumn.column" @method="expandedColumn?.column.method" />
        </td>
    </tr>
</template>