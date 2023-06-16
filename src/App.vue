<script setup lang="ts">
import { reactive, onMounted, ref, markRaw } from 'vue'
import { GET_PRODUCTS } from './api'

import type { IProductItem } from './type/response'
import type { IDatatableFilter, IDatatableOption } from './type/datatable'

// components
import DataTable from './components/datatable/DataTable.vue'
import DataTableFilter from './components/datatable/DataTableFilter.vue'
import DataTableFooter from './components/datatable/DataTableFooter.vue'
import Expandable from './components/Expandable.vue'

// state
const isLoading = ref<boolean>(false)
const filters = reactive<any>({})
const params = reactive({
  limit: 5,
  skip: 0
})

const propductList = ref<IProductItem[]>([])
const options = reactive<IDatatableOption>({
  id: 'products-datatable',
  columns: [
    { name: 'Name', key: 'title', type: 'html' },
    { name: 'Rating', key: 'rating', type: 'html' },
    { name: 'Price', key: 'price', type: 'html' },
    { name: 'Action', key: 'id', type: 'expandable-btn', component: markRaw(Expandable), class: 'text-center' },
  ]
})

const filterData = reactive<IDatatableFilter[]>([
  {
    name: 'Price', key: 'price', options: [
      { id: 'ascending', value: 'Ascending' },
      { id: 'descending', value: 'Descending' },
    ]
  },
  {
    name: 'Rating', key: 'rating', options: [
      { id: 'ascending', value: 'Ascending' },
      { id: 'descending', value: 'Descending' },
    ]
  },
])

const currentPage = ref<number>(1)
const pages = ref<number>(1)

// methods
const getProducts = () => {
  isLoading.value = true
  GET_PRODUCTS({ ...params, ...filters })
    .then(res => {
      const { products, total, skip, limit } = res.data
      propductList.value = products
      pages.value = total / limit
      currentPage.value = (skip / limit) + 1
    }).finally(() => isLoading.value = false)
}

const goPage = (value: number) => {
  if (!isLoading.value) {
    params.skip = (value - 1) * params.limit
    getProducts()
  }
}

const setFilter = (filter: { key: string, value: string }) => {
  filters[filter.key] = filter.value
  getProducts()
}

onMounted(() => {
  getProducts()
})

</script>

<template>
  <div class="p-5">
    <div class="flex justify-between items-center mb-5">
      <h3 class="text-2xl">Products</h3>
      <data-table-filter :filter-data="filterData" @change="setFilter" />
    </div>
    <data-table :option="options" :list="propductList" :loading="isLoading" />
    <data-table-footer class="mt-5" :pages="pages" :active="currentPage" @go="goPage" @previous="goPage" @next="goPage" />
  </div>
</template>
