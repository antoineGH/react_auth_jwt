# React Auth JWT

# Table of contents

1. [Project description](#description)
2. [Installation instructions](#installation)
3. [Project structure](#structure)
4. [Screenshots](#screenshots)

## 1. Project description<a name="description"></a>

> Disclaimer This project is a way to understand authorization. I DON'T RECOMMEND TO USE THIS IN PRODUCTION, because it may cause security issues as storing auth tokens in the local storage is not safe. Any JavaScript code on the page has access to the local storage what makes your app vulnerable to XSS attacks

React Auth JWT is the implementatin of the library react-token-auth that handle the auth process from the front end perspective. It includes forms to emit POST requests to your backend API (registration and login functionalities)

## 2. Installation instructions<a name="installation"></a>

Versions:

-   Node: 14.15.1
-   Npm: 6.14.8
-   React: 17.0.1

Download code from Github:

```shell
git clone https://github.com/antoineratat/react_auth_jwt.git
```

Navigate to project directory.

```shell
cd react_auth_jwt
```

Install node modules.

```shell
npm install
```

Run the app in development mode. Open http://localhost:3000 to view it in the browser.

```shell
npm start
```

## 3. Project structure<a name="structure"></a>

-   src
    -   App.js
    -   App.css
    -   components
        -   Login.js
        -   Navigation.js
        -   Profile.js
        -   UserForm.js
        -   Users.js
    -   auth
        -   index.js

## 5. Screenshots<a name="screenshots"></a>

![Auth Screenshot](https://templars.guru/app/github/react_auth_jwt/1.PNG)
