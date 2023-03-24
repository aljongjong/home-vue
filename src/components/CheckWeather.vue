<template>
    <div>
        날씨 API
        <br>
        {{ weather }}
    </div>
</template>

<script>
import WeatherService from '@/services/weather.service'

export default {
    name: "check-weather",
    data() {
        return {
            weather: "",
        }
    },
    beforeMount() {
        // WeatherService.init({
        //     serviceKey: "l2ovK%2BTcDK47hKakRh5j7Yl%2BsyoSHp2mEmfOzoF2BS5ET%2BUxnVJpblVMuHM7MZNAkNlRuTv2zI2nMJsgCsYssw%3D%3D",
        //     pageNo: '1',
        //     numOfRows: '1000',
        //     dataType: 'json',
        //     base_date: '20230320',
        //     base_time: '1200',
        //     nx: '61',
        //     ny: '121'
        // })
        // .then((response) => {
        //     console.log("날씨 데이터 ::: ", response);
        // })

        WeatherService.initTest()
        .then((response) => {
            this.weather = response.data;
        });
    },
}
</script>