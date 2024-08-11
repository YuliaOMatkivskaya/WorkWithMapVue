<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css'
import { Map, NavigationControl } from 'maplibre-gl'
import { onMounted } from 'vue'

import { useDataStore } from '@/stores/dataStore'

const store = useDataStore()
const { data,typeState } = store

onMounted(() => {
  const map = new Map({
    container: 'map',
    style:  'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [ 40.25,56.08],
    zoom: 10
  })

  map.addControl(
    new NavigationControl({
      visualizePitch: true
    })
  )

  const geojsonData= []
  data.forEach((element) => {
    geojsonData.push(
        {
                        type: 'Feature',
                        geometry: element.geom,
                        properties: {
                            color: typeState.filter((item)=>item.id===element.status_id)[0]?.color??'255,255,255'
                        }
    }
)
  });

 console.log(geojsonData)


  map.on('load', () => {
        map.addSource('data-add', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': geojsonData
            }
        });

        map.on('styleimagemissing', (e) => {
        const id = e.id; // id of the missing image

        // check if this missing icon is one this function can generate
        const prefix = 'square-rgb-';
        if (id.indexOf(prefix) !== 0) return;

        // extract the color from the id
        const rgb = id.replace(prefix, '').split(',').map(Number);

        const width = 10; // The image will be 64 pixels square
        const bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
        const data = new Uint8Array(width * width * bytesPerPixel);

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < width; y++) {
                const offset = (y * width + x) * bytesPerPixel;
                data[offset + 0] = rgb[0]; // red
                data[offset + 1] = rgb[1]; // green
                data[offset + 2] = rgb[2]; // blue
                data[offset + 3] = 255; // alpha
            }
        }

        map.addImage(id, {width, height: width, data});
    });

        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'data-add',
            'layout': {
                'icon-image': ['concat', 'square-rgb-', ['get', 'color']]
            }
        });



})
})
</script>

<template>
   <div id="container-legend" style="display:flex">
     <div class="legend" v-for="item of typeState">
        <div class="item-color" :style="{ backgroundColor: item.colorBG }"></div>
        <div>{{ item.name }}</div>
        
    </div>  
   </div> 
  <div id="map"></div>
</template>

<style scoped>

#container-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;

  }
.legend {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;

  }
  
.item-color{
    width:10px;
    height:10px;
}
#map {
  height: 80vh;
}
</style>