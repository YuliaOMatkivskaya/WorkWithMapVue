<template>
  <span>Поиск по:</span>
  <select v-model="searchField">
    <option value=status>Статус</option>
    <option value=address>Адрес</option>
    <option value=name>Название</option>
  </select>
  
  <br/>

  <span>Для фильтрации по выбранному полю введите значение: </span>
  <input type="text" v-model="searchValue">

  <EasyDataTable id="summary-table"
    :headers="headers"
    :items="items"
    :search-field="searchField"
    :search-value="searchValue"
    :rows-per-page="12"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Header, Item } from "vue3-easy-data-table";
import { useDataStore } from '@/stores/dataStore'

const store = useDataStore()
const { data,typeState } = store

const searchField = ref("status");
const searchValue = ref("");

const headers: Header[] = [
  { text: "ID статуса", value: "status_id", sortable: true },
  { text: "Статус", value: "status" },
  { text: "Наименование", value: "name"},
  { text: "Адрес", value: "address"},
  { text: "Координаты", value: "coordinates"}
];

const items: Item[] = [
 ];
 
data?.forEach((element) => {
  const item={} 
  item["status_id"]=element.status_id
  item["status"]=typeState.filter((item)=>item.id===element.status_id)[0]?.name??'статус не определен'
  item["name"]=element.name
  item["address"]=element.attrs.address
  item["coordinates"]=element.geom.coordinates
  items.push(
        item
  )
  });
</script>


<style scoped>


</style>
