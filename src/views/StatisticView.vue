<script setup>
import { useDataStore } from '@/stores/dataStore'
import * as XLSX from 'xlsx/xlsx.mjs';

const store = useDataStore()

const {data,typeState}=store
//console.log("store.data",data)

const chartOptions= {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [],
        },
      }
const  series= [
        {
          name: "количество",
          data: []
        },
      ]

let countElemType=0

const dataSortableByStatus=[]
let selectedData=[]

typeState.forEach((element,index) => {
  chartOptions.xaxis.categories[index]=element.name
  dataSortableByStatus[index]=[]
  selectedData=data.filter((el)=>el.status_id===element.id)
  dataSortableByStatus[index]=selectedData
  countElemType=selectedData.length
  series[0].data[index]=countElemType??0

});   

console.log('dataSortableByStatus',dataSortableByStatus)

let obj = {
  "Me": 11,
  "Children": {
    "Mike": {
      "Tom": 12
    },
    "Sister": {
      "Mary": 15
    }
  }
};


//преобразование вложенностей для сохранения в XLSX
const MergeForSaveXLSX=(data)=> {
  let res = [];
  data?.forEach(elem=>{
    let obj={}
    for (const [key, value] of Object.entries(elem)) {
      if(key!=='attrs'&&key!=='geom') obj[key]=value
     
    }
    for (const [key, value] of Object.entries(elem.attrs)) {
      obj['attr '+key]=value
    }
    for (const [key, value] of Object.entries(elem.geom)) {
      if(key==='coordinates') obj['geom '+key]=value[0] + ':'+ value[1]
      else obj['geom '+key]=value
    }

    res.push(obj)
  })
   return res

}

//сохранениe в XLSX
const  ExportDataForSaveXLSX= (data,file_name)=>
    {
      let dataForXLSX=MergeForSaveXLSX(data)
      let filename=file_name+'.xlsx';
      let ws = XLSX.utils.json_to_sheet(dataForXLSX);
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFile(wb,filename);
     }

//функция-обработчик клика по столбцу для получения детализации в XLSX     
const clickHandler=(event, chartContext, config)=>{
        //console.log("click")
        if((config.dataPointIndex||config.dataPointIndex===0)&&config.dataPointIndex!==-1)ExportDataForSaveXLSX(dataSortableByStatus[config.dataPointIndex],'детализация')
        
    }

</script>

<template>
  <div >
    <name-page title ="Статистика"></name-page>
    <h3>Распределение светофоров по категориям</h3>
    <div class="statistic">
      
      <div class="center-element">
            <apexchart id="vuechart-exampl"
      width="1250"
      height="450"
      type="bar"
      :options=chartOptions
      :series=series
      @click="clickHandler"
    ></apexchart>
    <span>*Для сохранения в XLSX детальной информации по каждой категории кликните по соответствующему столбцу</span>
      </div>

    </div>

  </div>
</template>

<style>

  .statistic {
    min-height: 75vh;
    display: flex;
  align-items: center;
  justify-content: center;

  }

</style>
