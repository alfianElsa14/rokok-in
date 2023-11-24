# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* sequelize
* mySql
* cors
* jsonwebtoken
* multer
* midtrans

### DOTENV CONFIGURATION
```
JWT_SECRET_KEY = "rahasia"
SERVER_KEY_MIDTRANS = 'SB-Mid-server-4-lfGto43qBv8JfHyBuIc2Uc'
```
---

## URL
_Server_

```
http://localhost:3300/api
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints


### GET /users

> Get all users

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1,
        "username": "alfian",
        "email": "alfian@gmail.com",
        "password": "$2a$10$ovSht3NEdqF0J4HfvbmmMukhKMqetn3zwXCl/6u9/xichYfD2ODzW",
        "image": "http://localhost:3300/public\\assets\\profile-picture-icon-27.jpg",
        "role": "admin",
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T04:21:56.000Z"
    },
    {
        "id": 2,
        "username": "kuya",
        "email": "kuya@gmail.com",
        "password": "$2a$10$bBSxBnzaTLPIBA0cJRGvYuR31vq/OOddakCiVUDGrEjUaY1ME5DhW",
        "image": "http://localhost:3300/public\\assets\\pngtree-muslim-boy-profile-photo-png-image_8973295.png",
        "role": "user",
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T05:56:01.000Z"
    },
]
```

---

### GET /users/detail/:id

 > Get users by id

_Request Params_

```
/<user_id>/

```

_Request Header_

```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 2,
    "username": "kuya",
    "email": "kuya@gmail.com",
    "password": "$2a$10$bBSxBnzaTLPIBA0cJRGvYuR31vq/OOddakCiVUDGrEjUaY1ME5DhW",
    "image": "http://localhost:3300/public\\assets\\pngtree-muslim-boy-profile-photo-png-image_8973295.png",
    "role": "user",
    "createdAt": "2023-11-22T01:55:01.000Z",
    "updatedAt": "2023-11-24T05:56:01.000Z"
}
```

_Response (404 - Error Not Found)_
```
{
    "status": "Error",
    "message": "User tidak ditemukan"
}
```

---

### PUT /users/edit/:id

 > Edit users

_Request Params_

```
/<user_id>/

```

_Request Header_

```
not needed
```

_Request Body_
```
{
  "username" : "<username>",
  "email" : "<email>",
  "password" : "<password>",
  "image" : <image>,
}
```

_Response (200)_
```
{
    "message": "success",
    "result": [
        1
    ]
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"username\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_
```
{
    "status": "Error",
    "message": "User tidak ditemukan"
}
```

---

### POST /users/registerUser

> Register for role user

_Request Params_

```
not needed

```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username" : "<username>",
  "email" : "<email>",
  "password" : "<password>",
}
```


_Response (201)_
```
{
    "message": "success",
    "result": {
        "id": 8,
        "username": "mun",
        "email": "mun@gmail.com",
        "password": "$2a$10$0A1dPyoZqChsY5fpQ0kDp.IiVhdSqyWtNSE/coBVvs/k4ohRULiUq",
        "image": "https://png.pngtree.com/png-clipart/20230305/original/pngtree-muslim-boy-profile-photo-png-image_8973295.png",
        "role": "user",
        "updatedAt": "2023-11-24T06:50:06.592Z",
        "createdAt": "2023-11-24T06:50:06.592Z"
    }
}

```
_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"username\" is not allowed to be empty"
}
```
```
{
    "status": "Error",
    "message": "Email sudah terdaftar, coba ganti dengan nama lain"
}
```
---


### POST /users/login

 > Login user

_Request Header_

```
not needed
```

_Request Body_
```
{
  "email" : "<email>",
  "password" : "<password>",
}
```

_Response (201)_
```
{
    "id": 1,
    "userEmail": "alfian@gmail.com",
    "role": "admin",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGZpYW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwODA4ODMwfQ.8Vo3dOPYE_hLhTxhnZX5t-fj2fsc53Ucs9JtKBUBBI4"
}
```
_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"username\" is not allowed to be empty"
}
```
_Response (404 - Error Not Found)_
```
{
    {
    "status": "Error",
    "message": "User tidak ditemukan"
}
}
```

---
### GET /rokoks

> Get all rokoks

_Request Params_

```
not needed
```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1,
        "title": "Gudang Garam",
        "price": 25000,
        "isi": 12,
        "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-9355434/gudang_garam_rokok_gudang_garam_filter_full02_nqbhq59o.jpg",
        "stock": 0,
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T06:00:19.000Z"
    },
    {
        "id": 2,
        "title": "Magnum Filter",
        "price": 23000,
        "isi": 12,
        "image": "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/1/24/661b1919-51d1-4261-934c-c3483c1c2572.jpg",
        "stock": 18,
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T05:53:29.000Z"
    },
    {
        "id": 3,
        "title": "Sampoerna Mild",
        "price": 32000,
        "isi": 16,
        "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//104/MTA-28564727/sampoerna_rokok_sampoerna_mild_16_full01_ix94s02m.jpg",
        "stock": 1,
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T02:07:28.000Z"
    },
    {
        "id": 4,
        "title": "Envio Kretek",
        "price": 12000,
        "isi": 12,
        "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//105/MTA-38445927/envio_envio_kretek_-_bks_full01_i4ko9mz1.jpg",
        "stock": 13,
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T04:25:06.000Z"
    },
    {
        "id": 5,
        "title": "Lucky Strike Switch",
        "price": 30000,
        "isi": 20,
        "image": "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/2/2/0cbbc24c-db1d-4401-b27f-de696dca894a.jpg",
        "stock": 10,
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T02:09:54.000Z"
    },
]
```

_Response (403 - Error Forbidden)_
```
{
    "message": "Invalid Token"
}
```

---

### GET /rokoks/detail/:id

> Get rokok by id
_Request Params_

```
/<rokok_id>/

```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 1,
    "title": "Gudang Garam",
    "price": 25000,
    "isi": 12,
    "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-9355434/gudang_garam_rokok_gudang_garam_filter_full02_nqbhq59o.jpg",
    "stock": 0,
    "createdAt": "2023-11-22T01:55:01.000Z",
    "updatedAt": "2023-11-24T06:00:19.000Z"
}
```

_Response (404 - Not Found)_
```
{
    "status": "Error",
    "message": "Rokok tidak ditemukan"
}
```
_Response (403 - Error Forbidden)_
```
{
    "message": "Invalid Token"
}
```

---

### POST /rokoks/addRokok

> Add new Rokok

_Request Params_
```
not needed
```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
{
  "title" : "<title>",
  "price" : <price>,
  "isi" : <isi>,
  "image" : <image>,
}
```

_Response (201)_
```
{
    "message": "Rokok telah ditambahkan",
    "result": {
        "id": 28,
        "title": "Juarai",
        "price": "17500",
        "isi": "16",
        "image": "http://localhost:3300/public\\assets\\juara.jpg",
        "stock": 10,
        "updatedAt": "2023-11-24T07:07:23.745Z",
        "createdAt": "2023-11-24T07:07:23.745Z"
    }
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"title\" is not allowed to be empty"
}
```

```
{
    "status": "Error",
    "message": "Rokok ini sudah tersedia."
}
```


_Response (403 - Error Forbidden)_
```
{
    "message": "akses tidak di izinkan, anda bukan admin"
}
```

---

### PATCH /rokoks/addStock/:rokokId

> Add stock rokok

_Request Params_

```
/<rokok_id>/

```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
{
  "stock" : <stock>,
}
```

_Response (200)_
```
{
    "message": "Stock rokok telah di tambahkan",
    "updatedDataRokok": {
        "id": 1,
        "title": "Gudang Garam",
        "price": 25000,
        "isi": 12,
        "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-9355434/gudang_garam_rokok_gudang_garam_filter_full02_nqbhq59o.jpg",
        "stock": 1,
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T07:12:26.000Z"
    }
}
```
_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"stock\" must be a number"
}
```
_Response (403 - Error Forbidden)_
```
{
    "message": "akses tidak di izinkan, anda bukan admin"
}
```
_Response (404 - Error Not Found)_
```
{
    "status": "Error",
    "message": "Rokok tidak ditemukan"
}
```

---

### PATCH /rokoks/reduceStock/:rokokId

> Reduce -1 stock rokok by id

_Request Params_

```
/<rokok_id>/

```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Stock rokok Magnum Filter telah berkurang",
    "newData": {
        "id": 2,
        "title": "Magnum Filter",
        "price": 23000,
        "isi": 12,
        "image": "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/1/24/661b1919-51d1-4261-934c-c3483c1c2572.jpg",
        "stock": 17,
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T07:19:19.000Z"
    }
}
```

_Response (404 - Not Found)_
```
{
    "status": "Error",
    "message": "Rokok tidak ditemukan"
}
```
---

### DELETE /rokoks/deleteRokok/:rokokId

> Delete rokok by id

_Request Params_

```
/<rokok_id>/

```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "rokok berhasil d delete",
    "dataRokok": {
        "id": 28,
        "title": "Juarai",
        "price": 17500,
        "isi": 16,
        "image": "http://localhost:3300/public\\assets\\juara.jpg",
        "stock": 10,
        "createdAt": "2023-11-24T07:07:23.000Z",
        "updatedAt": "2023-11-24T07:07:23.000Z"
    }
}
```
_Response (403 - Error Forbidden)_
```
{
    "message": "akses tidak di izinkan, anda bukan admin"
}
```

_Response (404 - Not Found)_
```
{
    "status": "Error",
    "message": "Rokok tidak ditemukan"
}
```
---

### POST /myRokok/add/:rokokId

> Add my Rokok

_Request Params_

```
/<rokok_id>/

```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (201)_
```
{
    "status": "sukses",
    "result": {
        "id": 54,
        "userId": 2,
        "rokokId": "2",
        "status": "Pending",
        "updatedAt": "2023-11-24T07:28:32.607Z",
        "createdAt": "2023-11-24T07:28:32.607Z"
    }
}
```
_Response (403 - Error Forbidden)_
```
{
    "message": "Invalid Token"
}
```

_Response (404 - Not Found)_
```
{
    "status": "Error",
    "message": "Rokok tidak ditemukan"
}
```
---

### GET /myRokok

> Get all my rokok

_Request Params_

```
not needed
```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 54,
        "userId": 2,
        "rokokId": 2,
        "status": "Pending",
        "createdAt": "2023-11-24T07:28:32.000Z",
        "updatedAt": "2023-11-24T07:28:32.000Z",
        "Rokok": {
            "id": 2,
            "title": "Magnum Filter",
            "price": 23000,
            "isi": 12,
            "image": "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/1/24/661b1919-51d1-4261-934c-c3483c1c2572.jpg",
            "stock": 17,
            "createdAt": "2023-11-22T01:55:01.000Z",
            "updatedAt": "2023-11-24T07:19:19.000Z"
        }
    }
]
```

---
### POST /myRokok/midtransToken/:rokokId

> create token for payment with midtrans

_Request Params_

```
/<rokok_id>/
```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (201)_
```
{
    "token": "da3089a7-275a-46ac-80af-3441cabbda60",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/da3089a7-275a-46ac-80af-3441cabbda60"
}
```
_Response (403 - Error Forbidden)_
```
{
    "message": "Invalid Token"
}
```
```
{
    "message": "akses tidak di izinkan"
}
```

_Response (404 - Not Found)_
```
{
    "status": "Error",
    "message": "Rokok tidak ditemukan"
}
```
---

### PATCH /myRokok/status/:myRokokId

> Update status myRokok to "Completed"

_Request Params_

```
/<myRokok_id>/
```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
{
    "message": "sukses update status",
    "myList": {
        "id": 54,
        "userId": 2,
        "rokokId": 2,
        "status": "Pending",
        "createdAt": "2023-11-24T07:28:32.000Z",
        "updatedAt": "2023-11-24T07:28:32.000Z"
    }
}
_Response (403 - Error Forbidden)_
```
{
    "message": "Invalid Token"
}
```
```
{
    "message": "akses tidak di izinkan"
}
```

_Response (404 - Not Found)_
```
{
    "status": "Error",
    "message": "Rokok tidak ditemukan"
}
```
---

### DELETE /myRokok/delete/:myRokokId

> Delete my rokok

_Request Params_

```
/<myRokok_id>/
```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
{
    "message": "sukses delete",
    "myList": {
        "id": 54,
        "userId": 2,
        "rokokId": 2,
        "status": "Completed",
        "createdAt": "2023-11-24T07:28:32.000Z",
        "updatedAt": "2023-11-24T07:40:59.000Z"
    }
}

_Response (403 - Error Forbidden)_
```
{
    "message": "Invalid Token"
}
```
```
{
    "message": "akses tidak di izinkan"
}
```

_Response (404 - Not Found)_
```
{
    "status": "Error",
    "message": "Rokok tidak ditemukan"
}
```
---





