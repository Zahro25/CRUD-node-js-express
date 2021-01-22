const path = require('path');
const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'expresscrud'
});
connection.connect(function(error){
    if(error) console.log(error);
    else console.log('database terkoneksi');
});

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',(req, res)=>{

    let sql = "SELECT * FROM user";
    let query = connection.query(sql, (err, rows)=>{
        if(err) throw err;
        res.render('user_index', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            users : rows
        });
    });
});

app.get('/add',(req, res)=>{
    res.render('user_add', {
        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
    });
});

app.post('/save',(req, res)=>{
    let data = { nama : req.body.nama, email: req.body.email, telp: req.body.telp};
    let sql = "INSERT INTO user SET ?";
    let query = connection.query(sql, data, (err, results)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

//edit
app.get('/edit/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from user where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('user_edit', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            user : result[0]
        });
    });
});

app.post('/update',(req, res) => {
    const userId = req.body.id;
    let sql = "update user SET nama='"+req.body.nama+"',  email='"+req.body.email+"',  telp='"+req.body.telp+"' where id ="+userId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

///delete
app.get('/delete/:userId',(req,res) => {
    const userId = req.params.userId;
    let sql = `DELETE from user where id = ${userId}`;
    let query = connection.query(sql,(err,result) => {
        if(err) throw err;
        res.redirect('/');
    });
});


app.listen(3000, ()=>{
    console.log('server running at port 3000' )
});



