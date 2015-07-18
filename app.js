/**
 * Created by Sathish.G on 7/18/15.
 */

var express= require('express');
var http=require('http');
var path=require('path');
var bodyParser= require('body-parser');


var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use(express.static(path.join(__dirname,'public')));

var port=process.env.PORT || 8080;
app.set('port',port);

app.get('/',function(req,res){
    res.render('home');
});

var server=http.createServer(app);

var io=require('socket.io')(server);
io.on('connection',function(socket){
//    console.log(socket);
//    console.log('use connection');

    socket.on('sMeg',function(data){
        console.log(data);
        socket.broadcast.emit('sMeg',data);
    });

    setInterval(function(){
        socket.broadcast.emit('date',new Date().toLocaleString());
    },1000);

});

server.listen(port,function(){
    console.log('server is listening at '+port);
});