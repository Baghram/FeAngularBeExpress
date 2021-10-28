# Setup

1.Setelah Clone dari Github buat file .env di root(satu level dengan app.js)

2.isi file .env dengan variable di envlist(PORT=3000 contohnya)

3.ketik npm install

4.rubah window.\_\_env.BEURL di FE/lib/env.js sesuai keperluan(misalnya http://localhost:3001 untuk nembak ke BE jika env PORT 3001)

5.ketik npm run start

6.buka localhost:3000 di browser maka akan keluar halaman depan nya untuk register / login

---

# API

1.  [Login](#login)
2.  [Register](#register)
3.  [Get Balance](#getbalance)
4.  [Add Balance](#addbalance)
5.  [Get Balance History](#gethistory)

---

## <a id="login">Login</a>

### Url

<code>"/login"</code>

### Method:

<b> POST</b>

### URL Params:

None

### Required:

-

### Optional:

-

### Data Params

<pre><code>
  Body : {
   email : String,
   password : String
  }</code></pre>

### Success Response:

<pre><code>
Code 200 OK
Content: {
    "message": "Login Success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc5NzczNjUxMWI3MTg0NTBhODJlNTMiLCJpYXQiOjE2MzUzOTkxNTB9.t1YR3tkNPG_YpNBIzMq7Os5eMXLvbqUOMEd5IhpSE3s"
}
</code></pre>

### Error Response:

<pre><code>
Code 400 Bad Request
Content: {
    "message": "Login Failed",
    "error": "Wrong Email / Password"
}
</code></pre>

---

## <a id="register">Register</a>

### Url

<code>"/register"</code>

### Method:

<b> POST</b>

### URL Params:

None

### Required:

-

### Optional:

-

### Data Params

<pre><code>
  Body : {
   email : String,
   password : String,
   phoneNumber: String,
   name: String
  }</code></pre>

### Success Response:

<pre><code>
Code 201 Created
Content: {
    "message": "Register Success",
    "emailRegistered": "test123@mail.com"
}
</code></pre>

### Error Response:

<pre><code>
Code 400 Bad Request
Content: {
    "message": "Register Failed",
    "error": "User validation failed: phoneNumber: Error, expected `phoneNumber` to be unique. Value: `14022`, email: Error, expected `email` to be unique. Value: `test123@mail.com`"
}
</code></pre>

---

## <a id="getbalance">Get Balance</a>

### Url

<code>"/balance"</code>

### Method:

<b> GET</b>

### URL Params:

None

### Required:

-

### Optional:

-

### Data Params

<pre><code>
  headers : {
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc5NzczNjUxMWI3MTg0NTBhODJlNTMiLCJpYXQiOjE2MzU0MDA4NDB9.LJhE-QIdm0fr0x5MdmKru7N6ulj0qtAVVYr3oftP2vU
  }
  </code></pre>

### Success Response:

<pre><code>
Code 200 Ok
Content: {
    "message": "Get Balance Success",
    "data": {
        "name": "asdf",
        "phoneNumber": "14045",
        "balance": 27000
    }
}
</code></pre>

### Error Response:

<pre><code>
Code 400 Bad Request
Content: {
    "message": "Get Balance Failed",
    "error": "User Does Not Exist"
}
</code></pre>

---

## <a id="addbalance">Add Balance</a>

### Url

<code>"/balance"</code>

### Method:

<b> POST</b>

### URL Params:

None

### Required:

-

### Optional:

-

### Data Params

<pre><code>
  headers : {
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc5NzczNjUxMWI3MTg0NTBhODJlNTMiLCJpYXQiOjE2MzU0MDA4NDB9.LJhE-QIdm0fr0x5MdmKru7N6ulj0qtAVVYr3oftP2vU
  }
  </code></pre>

### Success Response:

<pre><code>
Code 200 Ok
Content: {
    "message": "Add Balance Success",
    "data": {
        "email": "test@mail.com",
        "balance": 33000
    }
}
</code></pre>

### Error Response:

<pre><code>
Code 400 Bad Request
Content: {
    "message": "Add BalanceFailed",
    "error": "User Does Not Exist"
}
</code></pre>

---

## <a id="gethistory">Get Balance History</a>

### Url

<code>"/history"</code>

### Method:

<b> GET</b>

### URL Params:

None

### Required:

-

### Optional:

-

### Data Params

<pre><code>
  headers : {
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc5NzczNjUxMWI3MTg0NTBhODJlNTMiLCJpYXQiOjE2MzU0MDA4NDB9.LJhE-QIdm0fr0x5MdmKru7N6ulj0qtAVVYr3oftP2vU
  }
  </code></pre>

### Success Response:

<pre><code>
Code 200 Ok
Content: {
    "message": "Get History Success",
    "data": {
        "_id": "617a522d8dc910b837756042",
        "balanceHistory": [
            {
                "date": "2021-10-28T07:35:00.758Z",
                "amount": "3000",
                "__v": 0
            }
        ]
    }
}
</code></pre>

### Error Response:

<pre><code>
Code 400 Bad Request
Content: {
    "message": "Get History Failed",
    "error": "User Does Not Exist"
}
</code></pre>
