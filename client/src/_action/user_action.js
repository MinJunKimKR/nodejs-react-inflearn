import axios from 'axios';
import { LOGIN_USER } from './types'
export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', body) //server에서 받은 data 를 request에 저장한다
        .then(response => {
            response.data
        })
    //reducer로 retun을 보내준다
    //왜냐면 reducer가 현재의 state와 action을 조합해서 새로운 state를 만들기 떄문이다
    return {
        type: LOGIN_USER,
        payload: request
    }
}