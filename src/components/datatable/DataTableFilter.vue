<script setup lang="ts">
import type { IDatatableFilter } from '../../type/datatable'

interface Props {
    filterData: IDatatableFilter[]
}

defineProps<Props>()

const emits = defineEmits(['change'])

const change = (event: Event) => {
    const { value, name } = event.target as HTMLSelectElement
    emits('change', ({ key: name, value }))
}


</script>
<template>
    <div class="flex gap-5">
        <div v-for="(filter, index) in filterData" :key="`filter-item-${index}`">
            <div class="flex gap-x-3">
                <div>{{ filter.name }}</div>
                <select class="border" @change="change" :name="filter.key">
                    <option v-for="(option, index) in filter.options || []" :value="option.id" :key="`${filter.key}-${option.id}-${index}`">
                        {{ option.value }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>