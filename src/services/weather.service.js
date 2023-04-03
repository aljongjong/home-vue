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
        return api.get("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst", {
            params: {
                serviceKey: "l2ovK%2BTcDK47hKakRh5j7Yl%2BsyoSHp2mEmfOzoF2BS5ET%2BUxnVJpblVMuHM7MZNAkNlRuTv2zI2nMJsgCsYssw%3D%3D",
                pageNo: '1',
                numOfRows: '1000',
                dataType: 'json',
                base_date: '20230321',
                base_time: '0800',
                nx: '61',
                ny: '121'
            }
        });
    }

    test() {

    }
}

export default new WeatherService();