const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;
const { User } = require('./models/User');
const { auth } = require('./middleware/auth')
const config = require('./config/key')
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());//쿠키 파서 사용
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err))

app.get('/api/users', (req, res) => {
    res.send('hello world');
})

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)//body parser 가 있어서 req.body에 데이터가 들어가는거임

    user.save((err, userInfo) => {//UserModel에 저장
        if (err) return res.json({ success: false, err: err })
        return res.status(200).json({//res.json() -> 응답을 json형태로 줄수있다. 여기서 200은 정상응답 200을 뜻함
            success: true
        })
    });
})

app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {//mongo에서 제공해 주는 funciton
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) => { //method를 User Model에서 만들어주면된다.
            if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
            user.generateToken((err, user) => {//비밀번호가 맞다면 토큰생성한다음 user의 token에 update를 해준다
                if (err) return res.status(400).send(err);
                res.cookie("x_auth", user.token).status(200).json({ loginSuccess: "success", userId: user._id })
            })
        })
    })
})
app.get('/api/users/auth', auth, (req, res) => {
    //여기까지면 auth가 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})//auth ->리퀘스트를 받고 cb실행전에 실행해주는 middle ware


app.get('/api/users/logout', auth, (req, res) => {
    //토큰값을 없애 줌으로서 자동적으로 login이 풀리는 효과가 있다.
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {//1개를 찾고 난다음 업데이트 해준다
        if (err) return req.json({ success: false, err });
        return res.status(200).send({ success: true });
    })
})


app.listen(port, () => {
    console.log(`port : ${port}`);
})