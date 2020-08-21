const { User } = require('../models/User')

let auth = (req, res, next) => {
    //클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;
    console.log('auth token  :', token)
    User.findByToken(token, (err, user) => { //mongoose에서 정의해준 메소드
        console.log('findByToken User  : ', user)
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });//문제가 있으면 튕겨냄

        //req 에 넣어줌으로서 라우터에서 사용할수있다.
        req.token = token;
        req.user = user;
        next();//middle ware다음단계로 갈수있게 만든다.
    })
    //토큰을 복호화 한후 유저를 찾는다.

}

module.exports = { auth }