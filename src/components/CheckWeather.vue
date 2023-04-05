<template>
    <div>
        <br>
        <h3>{{ weather.city.name }}</h3>
        <!-- <table border=1 style="width:100%;">
            <tr>
                <th class='backslash' style='width:60px'><div>날짜</div>시간</th>
                <td>2023. 04. 05</td>
                <td>2023. 04. 06</td>
                <td>2023. 04. 07</td>
                <td>2023. 04. 08</td>
                <td>2023. 04. 09</td>
            </tr>
            <tr>
                <td>03:00</td>
                <td>
                </td>
            </tr>
            <tr>
                <td>06:00</td>
            </tr>
            <tr>
                <td>09:00</td>
            </tr>
            <tr>
                <td>12:00</td>
            </tr>
            <tr>
                <td>15:00</td>
            </tr>
            <tr>
                <td>18:00</td>
            </tr>
            <tr>
                <td>21:00</td>
            </tr>
            <tr>
                <td>24:00</td>
            </tr>
        </table> -->

        <div v-for="(list, index) in weather.list" :key="index">
            <span v-for="(obj, idx) in list" :key="idx">
                <span v-if="obj.dt_txt">{{ obj.dt_txt }}</span> :: {{ obj.main.temp }} <br>
            </span>
        </div>


    </div>
</template>

<script>
import WeatherService from '@/services/weather.service'

export default {
    name: "check-weather",
    data() {
        return {
            weather: {
                cod: "",
                message: "",
                list: [],
                city: {}
            },
        }
    },
    mounted() {
        WeatherService.initTest()
        .then((response) => {
            console.log(response.data);
            this.weather.cod = response.data.cod;
            this.weather.message = response.data.message;
            this.weather.list.push(response.data.list);
            this.weather.city = response.data.city;
        })
    },
}
</script>

<style scoped>
.slash {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>');
}
.backslash {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" /></svg>');
}
.slash, .backslash { text-align: left; }
.slash div, .backslash div { text-align: right; }
table {
	border-collapse: collapse;
	border: 1px solid gray;
}  
th, td {
	border: 1px solid gray;
	padding: 5px;
	text-align: center;
}
</style>