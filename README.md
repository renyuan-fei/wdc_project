## **WDC Group Project**

### - Social Event Planning Web System


Github URL: https://github.com/renyuan-fei/wdc_project.git


### **Group Members**

----

#### Renyuan Fei(a1810111)

#### Yuanchen Xiang(a1815395)

#### Xuhui Wang(a1809872)

#### ~~Weihao Xia(a1791563)~~


----

### **Environmental Setup**

#### Install
```
npm install
```
#### Start
```
npm start
```

#### MySql Setup
```
sql start
cd conf
mysql --host=127.0.0.1 < project.sql
```



### **Design Document**

1.   User

    1. Add Personal Event
    2. Drop Personal Event
    3. Add public Event to personal event list
    4. Drop Public Event from personal event list
    5. Check Calendar
    6. Reset Password

2.  Administrator


    1. Add public Event to public event list
    2. Drop public Event from public event list
    3. Notify by email if one user's public event is cancelled
    4. promote user to Administrator
    5. Reset Password



3. Advanced function:


    1.Check conflict Time
    2. Email Login
    3. Change Calendar display by Month/Week/Day

### **Dependency Review**
    1. Fronted
        <1>Vue 3.x Vue-router, Vuex</1>
        <2>Axios -- Ajax Request</2>
        <3>Element UI 2.x -- UI Framework</3>

    2. Backend
        <1>nodemon - Auto Reload</1>
        <2>cookie-parser ~1.4.4</2>
        <3>jade ~1.11.0</3>
        <4>nodemailer ^6.7.5</4>
        <5>node-schedule ^2.1.0</5>
        <6>express ~4.16.1</6>

    3. Development environment
        <1>Mysql 8.0.25</1>
        <2>Node</2>
        <3>npm</3>
        <4>JetBrain Webstorm</4>
        <5>VSCODE for CS50</5>



### **Customize configuration**
See [Configuration Reference](https://cli.vuejs.org/config/).
