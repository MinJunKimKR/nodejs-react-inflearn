import { LOGIN_USER } from '../_action/types'
export default function (state = {}, action) {
    //각각 다른 type마다 다른 조치를 취해줘야 하니까

    switch (action.type) {//action type이 키가 된다.
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }//spread operator
            break;

        default:
            break;
    }
}