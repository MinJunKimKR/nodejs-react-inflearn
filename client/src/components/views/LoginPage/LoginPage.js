import React, { useState } from 'react'
import Axios from 'axios';
import { useDispatch } from 'react-redux';

function LoginPage() {
    const dispatch = useDispatch();
    //컴포넌트 내부에서 변환되는 값을 표시하기 위해서는 state를 사용햐야한다.
    //initialState : 처음에 무슨 값으로 나오는지
    //typing 을 할떄 state를 같이 바꿔줘야함. 그렇게 해줘야지 화면이 변경이 된다.
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    /*
        useState는 무엇을 반환할까요? state 변수, 해당 변수를 갱신할 수 있는 함수 이 두 가지 쌍을 반환합니다. 
        이것이 바로 const [count, setCount] = useState()라고 쓰는 이유입니다
        서버에 보내고자 하는 값을 state가 가지고 있는것이다.
    */
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();//preventDefault를 해서 기본동작을 막아줘야한다.

        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))//redux 사용 
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
