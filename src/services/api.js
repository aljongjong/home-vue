import axios from "axios";

const instance = axios.create({
    // baseURL: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0",
    // headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //     "Accept": "*/*;"
    // },
});

export default instance;