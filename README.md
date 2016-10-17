# Zija API
---

#### Contents

* [Authentication](#authentication)
* [User Endpoints](#user)
* Cart Endpoints
* Wishlist Endpoints
* Products
* Categories
* Invoice Endpoints


#### Version History

* **Version 1**


## Authentication

JSON Web Tokens (JWT) are used to lock down authentication for the shop. We are using [this](https://github.com/tymondesigns/jwt-auth/wiki) library to configure
and create tokens for users. In order to authenticate with the API, a `POST` request is sent to `/auth/sign-in` with the email and password of the user. The
response will contain the user's information, as well as a JWT token that should be used in all subsequent requests as an Authorization header. More examples on
that later.


#### Sign-in

| Method | URL             |
|--------|:---------------:|
| POST   | `/auth/sign-in` |

**Parameters:**

| Name     | Type           |
|----------|:---------------|
| Email    | String         |
| Password | String         |

**Example:**

```
curl -X POST -d '{"email": "test69@example.com", password: "meo123"}' http://localhost:8000/auth/sign-in
```

**Returns:**

HTTP `201` created on success, along with user data and JWT token, or `{"error": "Error message"}` in case something went wrong.


#### Register

| Method | URL              |
|--------|:-----------------|
| POST    | `/auth/register`|

**Parameters:**

| Name        | Type       |
|-------------|:-----------|
| username    | String     |
| first       | String     |
| last        | String     |
| email       | Email      |
| password    | String     |
| country     | String     |
| shipcountry | String     |
| sendEmail   | Boolean    |

**Example:**

```
curl -X POST -d '{"username": "testuser123", "first": "test", "last": "user", "email": "test@example.com", "password": "Test123", "country": "US", "shipcountry": "US", "sendEmail": false}' http://localhost:8000/auth/sign-in
```

**Returns:**

`201` created on success. Validation or uniqueness error on failure: `{error: "Username is already in use"}`.


#### Check Email Uniqueness

| Method | URL                 |
|--------|:--------------------|
| POST   | `/user/check-email` |

**Params:**

| Name   | Type   |
|--------|:-------|
| email  | String |

**Returns:**

A boolean `success` key with a `message` of `Email exists` or `Email is unique`.


#### Check Username Uniqueness

| Method | URL                    |
|--------|:-----------------------|
| POST   | `/auth/check-username` |

**Params:**

| Name      | Type   |
|-----------|:-------|
| username  | String |

**Returns:**

A key of `No one is using this username` or `In Use`.

## User
---

#### Retrieve user

> Note: this is used to fetch the currently authenticated user, as you will need a JWT token to request this route.

| Method | URL              |
|--------|:-----------------|
| GET    | `/user/me`       |

**Example:**

```
curl -X POST -H 'Authorization: Bearer jwt_token' localhost:8000/user/me
```

**Returns:**

```
{
  "email": "",
  "distid": "",
  "shipaddress": "",
  "city": "",
  "state": "",
  "zip": "",
  ...
}
```


#### Update user shipping address

| Method | URL                      |
|--------|:-------------------------|
| POST   | `/user/shipping-address` |

**Parameters:**

| Name         | Type       |
|--------------|:-----------|
| address1     | String     |
| address2     | String     |
| city         | String     |
| state        | String     |
| zip          | String     |
| shipaddress1 | String     |
| shipaddress2 | String     |
| shipcity     | String     |
| shipstate    | String     |
| shipzip      | String     |

**Returns:**

`200 OK` with a `message` containing all the user data.


#### Add credit card

| Method | URL          |
|--------|:-------------|
| POST   | `/user/card` |

**Parameters:**

| Name      | Type       |
|-----------|:-----------|
| ccno      | String     |
| ccexp     | String     |
| ccname    | String     |
| ccaddr    | String     |
| ccaddr2   | String     |
| cccity    | String     |
| ccstate   | String     |
| cczip     | String     |
| cccountry | String     |

**Returns:**

`200 OK`, and a `result` key explaining that the card was successfully added. Or, a `400` with validation errors.

#### Retrieve user's credit cards

| Method | URL               |
|--------|:------------------|
| GET    | `/user/get-cards` |

**Returns:**

```
{
  "credit_cards": [
  	{
  	  "credit_card": "",
  	  "name_on_card": "",
  	  "billing_city": "",
  	  "billing_state": "",
  	  "billing_address": "",
  	  "billing_zip": "",
  	  "card_desc": "",
  	  "expiration": ""
  	}
  ]
}
```


#### Charge credit card

| Method | URL                 |
|--------|:--------------------|
| POST   | `/user/charge-card` |

**Parameters:**

| Name      | Type       |
|-----------|:-----------|
| inv       | String     |
| ccno      | String     |
| ccname    | String     |
| ccexp     | String     |
| ccaddr    | String     |
| cccity    | String     |
| ccstate   | String     |
| cczip     | String     |


