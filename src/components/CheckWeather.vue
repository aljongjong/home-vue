<template>
    <div>
        <br>
        <h3>{{ weather.city.name }}</h3>

        <div>
            <h5 style="font-weight: bolder;">주간예보</h5>
            <div>
                <ul class="week_list">
                    <li class="week_item" v-for="(w, index) in week" :key="index">
                        <div class="day_data">
                            <div class="cell_date">
                                <span class="date_inner">
                                    <strong class="day">{{ getDay(w.date) }}</strong>
                                    <span class="date">{{ w.date.substr(5) }}</span>
                                </span>
                            </div>
                            <div class="cell_weather">
                                <!-- 오전 09:00 기준 -->
                                <span class="weather_inner" data-wetr-cd="22" :data-wetr-txt="w.am.description ? w.am.description : ''">
                                    <strong class="inner_text left">
                                        <span class="timeslot">오전</span>
                                        <span class="rainfall "><span class="blind">강수확률</span>{{ w.am.pop }}%</span>
                                    </strong>
                                    <i class="ico _cnLazy ico_wt22" :data-ico="w.icon"><span class="blind">{{ w.am.weather }}</span></i>
                                </span>
                                <!-- 오후 18:00 기준 -->
                                <span class="weather_inner" data-wetr-cd="22" :data-wetr-txt="w.pm.description">
                                    <i class="ico _cnLazy ico_wt22" :data-ico="w.icon"><span class="blind">{{ w.pm.weather }}</span></i>
                                    <strong class="inner_text">
                                        <span class="timeslot">오후</span>
                                        <span class="rainfall "><span class="blind">강수확률</span>{{ w.pm.pop }}%</span>
                                    </strong>
                                </span>
                            </div>
                            <div class="cell_temperature">
                                <span class="temperature_inner">
                                    <strong class="temperature">
                                        <span class="lowest">
                                            <span class="blind">{{ w.temp_min }}°</span>
                                        </span>
                                        <span class="bar">/</span>
                                        <span class="highest">
                                            <span class="blind">{{ w.temp_max }}°</span>
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
    </div>
</template>

<script>
import WeatherService from '@/services/weather.service'
import { lastIndexOf } from 'lodash';

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
            week: [],
        }
    },
    methods: {
        getDay(date) {
            const week = ['일', '월', '화', '수', '목', '금', '토'];
            return week[new Date(date).getDay()]
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
            // 요일, 날짜 / 오전(날씨, 강수확률) / 오후(날씨, 강수확률) / 최저온도, 최고온도
            let date = "";
            let index = 0;
            response.data.list.forEach((obj, idx) => {
                if (date !== new Date(obj.dt * 1000).toLocaleDateString("ko-KR")) {
                    date = new Date(obj.dt * 1000).toLocaleDateString("ko-KR");
                    
                    let o = new Object();
                    o.date = date;
                    o.temp_min = obj.main.temp_min;                 // 최저기온
                    o.temp_max = obj.main.temp_max;                 // 최고기온
                    o.humidity = obj.main.humidity;                 // 습도

                    /// am, pm이 없는 첫번째날, 마지막날 임시방편
                    let amo = new Object();
                    amo.weather = obj.weather[0].main;                // 날씨
                    amo.description = obj.weather[0].description;     // 날씨상세
                    amo.icon = obj.weather[0].icon;                   // 아이콘 코드
                    amo.pop = obj.pop;                                // 강수확률
                    o.am = amo;

                    let pmo = new Object();
                    pmo.weather = obj.weather[0].main;                // 날씨
                    pmo.description = obj.weather[0].description;     // 날씨상세
                    pmo.icon = obj.weather[0].icon;                   // 아이콘 코드
                    pmo.pop = obj.pop;                                // 강수확률
                    o.pm = pmo;
                    ///
                    
                    this.week.push(o);
                    index++;
                } else {
                    this.week[index-1].temp_min = obj.main.temp_min < this.week[index-1].temp_min ? obj.main.temp_min : this.week[index-1].temp_min;
                    this.week[index-1].temp_max = obj.main.temp_max > this.week[index-1].temp_max ? obj.main.temp_max : this.week[index-1].temp_max;

                    if (new Date(obj.dt * 1000).getHours() === 9) {
                        // 오전 09:00 날씨, 강수확률 pop
                        let amo = new Object();
                        amo.weather = obj.weather[0].main;                // 날씨
                        amo.description = obj.weather[0].description;     // 날씨상세
                        amo.icon = obj.weather[0].icon;                   // 아이콘 코드
                        amo.pop = obj.pop;                                // 강수확률
                        this.week[index-1].am = amo;

                    } else if (new Date(obj.dt * 1000).getHours() === 18) {
                        // 오후 18:00 날씨, 강수확률 pop
                        let pmo = new Object();
                        pmo.weather = obj.weather[0].main;                // 날씨
                        pmo.description = obj.weather[0].description;     // 날씨상세
                        pmo.icon = obj.weather[0].icon;                   // 아이콘 코드
                        pmo.pop = obj.pop;                                // 강수확률
                        this.week[index-1].pm = pmo;
                    }

                }
            })
            console.log("this.week :: ", this.week);
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