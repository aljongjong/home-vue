<template>
    <div>
        날씨 API
        <br>
        <!-- <h3>{{ weather.city.name }} 날씨</h3>
        <h4>일출시간 : {{ weather.city.sunrise }}</h4>
        <h4>일몰시간 : {{ weather.city.sunset }}</h4> -->
        <table border=1 style="width:100%;">
            <tr>
                <td>날짜</td>
            </tr>
            <tr>
                <td>시간별 온도</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
        </table>
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
    mounted() {
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
            console.log(response.data);
            this.weather = response.data;
        });
    },
}
</script>