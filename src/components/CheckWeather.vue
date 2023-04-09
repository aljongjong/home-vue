<template>
    <div>
        <br>
        <h3>{{ weather.city.name }}</h3>

        <div>
            <h2>주간예보</h2>
            <div>
                <ul class="week_list">
                    <li class="week_item">
                        <div class="day_data">
                            <div class="cell_date">
                                <span class="date_inner">
                                    <strong class="day">{{ day }}</strong>
                                    <span class="date">{{ date }}</span>
                                </span>
                            </div>
                            <div class="cell_weather">
                                <span class="weather_inner" data-wetr-cd="22" data-wetr-txt="흐리고 한때 비">
                                    <strong class="inner_text left">
                                        <span class="timeslot">오전</span>
                                        <span class="rainfall "><span class="blind">강수확률</span>60%</span>
                                    </strong>
                                    <i class="ico _cnLazy ico_wt22" data-ico="ico_wt22"><span class="blind">흐리고 한때 비</span></i>
                                </span>
                                <span class="weather_inner" data-wetr-cd="22" data-wetr-txt="구름많고 한때 비">
                                    <i class="ico _cnLazy ico_wt22" data-ico="ico_wt22"><span class="blind">구름많고 한때 비</span></i>
                                    <strong class="inner_text">
                                        <span class="timeslot">오후</span>
                                        <span class="rainfall "><span class="blind">강수확률</span>60%</span>
                                    </strong>
                                </span>
                            </div>
                            <div class="cell_temperature">
                                <span class="temperature_inner">
                                    <strong class="temperature">
                                        <span class="lowest">
                                            <span class="blind">{{ lowest_temperature }}</span>
                                        </span>
                                        <span class="bar">/</span>
                                        <span class="highest">
                                            <span class="blind">{{ highest_temperature }}</span>
                                        </span>
                                    </strong>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


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
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td class="time-03">03:00</td>
                    <!-- <span v-for="(list, index) in weather.list" :key="index">
                        <td v-for="(obj, idx) in list" :key="idx">
                            {{ obj.main.temp }}
                        </td>
                    </span> -->
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td class="time-06">06:00</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td class="time-09">09:00</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td class="time-12">12:00</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
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

        <!-- <div v-for="(list, index) in weather.list" :key="index">
            <span v-for="(obj, idx) in list" :key="idx">
                <span v-if="obj.dt_txt">{{ obj.dt_txt }}</span> :: {{ obj.main.temp }} <br>
            </span>
        </div> -->
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
            week: {
                list: []
            }
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

        // 주간예보
        WeatherService.initTest()
        .then((response) => {
            // 날짜 비교해서 weekly 날짜 객체 만들고, 같은 날짜일때 해당 날짜 객체에 아래 데이터들 넣기
            // 요일, 날짜 / 오전(날씨, 최저온도, 강수확률) / 오후(날씨, 최고온도, 강수확률)
            let date = "";
            response.data.list.forEach((obj) => {
                if (date !== new Date(obj.dt * 1000).toLocaleDateString("ko-KR")) {
                    date = new Date(obj.dt * 1000).toLocaleDateString("ko-KR");
                    console.log("date", date, new Date(obj.dt * 1000).toLocaleTimeString("ko-KR"));
                    console.log("d", new Date(obj.dt * 1000).toLocaleString("ko-KR"));
                    
                    this.week.list.push(date);
                } else {
                    console.log("time", new Date(obj.dt * 1000).toLocaleTimeString("ko-KR"));
                }
                
            })
            console.log(this.week);
            var s = new Date(1681074000 * 1000).toLocaleTimeString("ko-KR"); // '오전 6:00:00'
            var d = new Date(1681074000 * 1000).toLocaleDateString("ko-KR"); // '2023. 4. 10.'
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