import { ref } from 'vue'
import { defineStore } from 'pinia'
import dataFromJson from '@/data/data.json'
import typeStateFromJson from '@/data/typeState.json'
export const useDataStore = defineStore('data', () => {
  const data=ref([...dataFromJson])
  const typeState=ref([...typeStateFromJson])
  return { data, typeState }
})
