const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10; //10자리인 salt를 생성

const userSchema = mongoose.Schema({ //스키마 명세
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function (next) { //저장하기 전에 무엇인가 한다 - 몽구스 기능
    try {
        let user = this; //위에 있는 모델의 함수이기에 this를 할경우 body로 들어온 정보의 스키마를 가리킨다
        if (!user.isModified('password')) {//비밀번호 변경시에만
            console.log('no')
            next();
        }
        bcrypt.genSalt(saltRounds, (err, salt) => {//위에서 만든 Rounds로 salt를 만들어준다,
            if (err) return next(err); //에러 나면 바로 넘기기
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash //기존의 plain password를 hash된 비밀번호로 바꿔줌
                next();//완료되면 돌려준다.
            });
        });

    } catch (error) {
        console.error(error)
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {//사용자 정의 methid생성
    console.log(`plainPassword : ${plainPassword}`)
    console.log(`this.password  : ${this.password}`)
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) { //compare : 같은지를 검사해준다
        //userSchema에서 만들어 주는것이니 this.password면 model의 password를 뜻하는거임
        console.log(2)
        if (err) {
            console.error(err)
            return cb(err);
        }
        console.log(`isMatch  : ${isMatch}`)
        cb(null, isMatch);//err가 아니면 true, false를 return 
    })
}

userSchema.methods.generateToken = function (cb) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    console.log('gen token : ', token)
    user.token = token;
    user.save((err, user) => {//DB에 save한다음에 변경된 user model을 return 해줘야한다.
        if (err) return cb(err);
        return cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) { //token을 복호화한다
    const user = this;
    console.log('finded token  : ', token)
    jwt.verify(token, 'secretToken', (err, decoded) => {//token 복호화
        if (err) return cb(err);
        user.findOne({ "_id": decoded, "token": token }, (err, user) => {
            if (err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema) //User : 이 모델의 이름


module.exports = { User };