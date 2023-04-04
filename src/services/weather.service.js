import api from "./api";

class WeatherService {
    init(paramObj) {
        console.log("paramObj ::: ", paramObj);
        return api
            .get("/getUltraSrtNcst", paramObj)
            .then((response) => {
                return response;
            })
    }

    initTest() {
        /* 공공데이터
        return api.get("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst", {
            params: {
                serviceKey: decodeURIComponent('l2ovK%2BTcDK47hKakRh5j7Yl%2BsyoSHp2mEmfOzoF2BS5ET%2BUxnVJpblVMuHM7MZNAkNlRuTv2zI2nMJsgCsYssw%3D%3D'),
                pageNo: '1',
                numOfRows: '1000',
                dataType: 'json',
                base_date: '20230404',
                base_time: '0600',
                nx: '55',
                ny: '127'
            }
        });
        */

        /* OpenWeatherMap */
        return api.get("https://api.openweathermap.org/data/2.5/forecast", {
            params: {
                // 초기 위치 : 수원시 장안구 영화동
                lat: '37.29275',
                lon: '127.01361',
                appid: '39ef6db81d706884a34065462b28da4b'
            }
        });

        // 1. 먼저 대한민국 시,군 단위 이상의 위도, 경도 정보를 constants.js에 저장
        // 2. 그다음 더욱 자세한 검색을 위해 OpenWeathermap의 Geocoding API를 연동시켜 사용
        // 3. 같은 이름의 지역이름이 Geocoding API를 통해 검색되었을 경우 constants.js에 저장되어있는 위도, 경도와 비교하여 lat와 lon을 추출
    }

    test() {

    }
}

export default new WeatherService();