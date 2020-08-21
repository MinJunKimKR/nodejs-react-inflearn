# 인프런에서 node react 공부 필기




# 9

보안이 필요한 부분은 git ignore로 분리 시켜줘야한다.

환경에 따라 분기를 해줘야한다.

```jsx
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}
```
ddd
key.js

```jsx
module.exports = {
    mongoURI: "mongodb+srv://mj:****@boilerplate.zh9xo.mongodb.net/<dbname>?retryWrites=true&w=majority"
}
```

dev.js

```jsx
module.exports = {
    mongoURI: process.env.MONGO_URI
}
```

prod.js

위의 3개의 파일로 mongoDB 계정 정보를 환경에 따라 분리해서 분리할수 있게되었다

```jsx
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const { User } = require('./models/User');
const config = require('./config/key')
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('hello world');
})

app.post('/register', (req, res) => {
    const user = new User(req.body)//body parser 가 있어서 req.body에 데이터가 들어가는거임
    user.save((err, userInfo) => {//UserModel에 저장
        if (err) return res.json({ success: false, err })
        return res.status(200).json({//res.json() -> 응답을 json형태로 줄수있다. 여기서 200은 정상응답 200을 뜻함
            success: true
        })
    });
})

app.listen(port, () => {
    console.log(`port : ${port}`);
})
```

index.js

위의 소스로 몽고를 분리하였다

---

# 8

npm install nodemon --save-dev

-dev 를 붙이면 local에서만 쓰겠다 라는 의미임

```jsx
{
  "name": "boiler-plate",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "backend": "nodemon index.js" //script 추가
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "mongoose": "^5.10.0"
  },
  "devDependencies": { //-dev 옵션
    "nodemon": "^2.0.4"
  }
}
```

---

# 7

```jsx
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { User } = require('./models/User');

//application/x-www-form-urlencoded를 해석
app.use(bodyParser.urlencoded({ extended: true }));
//application/json를 해석
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mj:****@boilerplate.zh9xo.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('hello world');
})

app.post('/register', (req, res) => {
    const user = new User(req.body)//body parser 가 있어서 req.body에 데이터가 들어가는거임
    user.save((err, userInfo) => {//UserModel에 저장
        if (err) return res.json({ success: false, err })
        return res.status(200).json({//res.json() -> 응답을 json형태로 줄수있다. 여기서 200은 정상응답 200을 뜻함
            success: true
        })
    });
})

app.listen(port, () => {
    console.log(`port : ${port}`);
})
```

> index.js

---

# 6

깃허브 사용 → 패스

---

# 5

git rm —cached noce_modules -r → git 정보를 지워줌

git commit -m "123456789"

git status

---

# 4

모델은 스키마를 감싸주는 역할을 한다.

```jsx
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ //스키마 명세
    nmae: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //띄워쓰기 없애줌
        unique: 1, //1개만 사용
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
        default: 0 //디폴트값
    },
    image: String,
    toekn: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

const User = mongoose.model('User', userSchema) //User : 이 모델의 이름

module.exports = { User };
```

---

# 3

## 클러스터 만들기

→ 클라우드 상에서 디비 만들기

### 유저생성

유저 만들어야함 → 대시보드에서 클러스터 → connect

ID : mj

pw : ****

### connection your application 선택

mongodb+srv://mj:<password>@boilerplate.zh9xo.mongodb.net/<dbname>?retryWrites=true&w=majority

→ <password> 부분은 실제 비밀번호로 바꿔서 타이핑 해준다.

### mongoose?

npm install mongoose —save

```jsx
const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mj:****@boilerplate.zh9xo.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err))
app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log(`port : ${port}`);
})
```

> index.js

---

# 2

npm install []  —save : package.json의 dependencies 에 표시해서 다른사람이 봤을때 어떤 모듈을 설치했는지 알수있게 해준다.