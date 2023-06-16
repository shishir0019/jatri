import type { Component } from 'vue'

export interface IDatatableFilterOption {
    id: number | string
    value: string
    selected?: boolean
}

export interface IDatatableFilter {
    name: string
    key: string
    options?: IDatatableFilterOption[]
}


export interface IDatatableOption {
    id: string
    columns: IDatatableColumn[]
    actions?: IDatatableAction[]
}
export interface IDatatableColumn {
    name: string
    key: string
    type: 'html' | 'expandable-btn'
    modifire?: Function
    method?: Function
    component?: Component
    class?: string
}
export interface IDatatableAction {
    title: string
    methods: Function
}