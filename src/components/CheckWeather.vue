<template>
    <div>
        <br>
        <h3>{{ weather.city.name }}</h3>
        <table border=1 style="width:100%;">
            <thead>
                <tr>
                    <th class='backslash' style='width:60px'><div>날짜</div>시간</th>
                    <td v-for="(date, idx) in initDate" :key="idx" class="date" :class="date">
                        {{ date }}
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="time-00">00:00</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td class="time-03">03:00</td>
                    <!-- <span v-for="(list, index) in weather.list" :key="index">
                        <td v-for="(obj, idx) in list" :key="idx">
                            {{ obj.main.temp }}
                        </td>
                    </span> -->
                    <span v-for="(list, index) in weather.list" :key="index">
                        
                    </span>
                </tr>
                <tr>
                    <td class="time-06">06:00</td>
                </tr>
                <tr>
                    <td class="time-09">09:00</td>
                </tr>
                <tr>
                    <td class="time-12">12:00</td>
                </tr>
                <tr>
                    <td class="time-15">15:00</td>
                </tr>
                <tr>
                    <td class="time-18">18:00</td>
                </tr>
                <tr>
                    <td class="time-21">21:00</td>
                </tr>
            </tbody>
        </table>

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
            initDate: new Set(),
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

            response.data.list.forEach((obj) => {
                this.initDate.add(obj.dt_txt.substr(0, 10));
            });
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
  font-size: 10px;
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