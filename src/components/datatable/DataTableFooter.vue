<script setup lang="ts">
interface Props {
    pages: number
    active: number
}

const emits = defineEmits(['previous', 'next', 'go'])

const props = defineProps<Props>()

// methods
const previous = () => {
    if (props.active > 1) {
        emits('go', props.active - 1)
    }
}
const next = () => {
    if (props.active < props.pages) {
        emits('next', props.active + 1)
    }
}

const goPage = (page: number) => {
    emits('go', page)
}
</script>
<template>
    <div class="flex justify-end">
        <div class="flex items-center gap-x-3">
            <button class="w-8 h-8 bg-blue-500 text-white hover:bg-blue-900 disabled:bg-blue-300" @click="previous" :disabled="active === 1">{{ `<<` }} </button>
            <button v-for="(page, index) in pages" :class="{ 'text-blue-500': active === page }" @click="goPage(page)"
                :key="`tabel-footer-paginator-${index}`">
                {{ page }}
            </button>
            <button class="w-8 h-8 bg-blue-500 text-white hover:bg-blue-900 disabled:bg-blue-300" @click="next" :disabled="active === pages">{{ `>>` }}</button>
        </div>
    </div>
</template>