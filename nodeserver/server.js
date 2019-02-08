/**
 * Created by InfluxIQ09 on 2/7/2019.
 */
var fs = require("fs"),
    readline = require("readline");

var express = require('express');
var app = express();
var port = process.env.PORT || 3027;
var request = require('request');
var cheerio = require('cheerio');
var mailer = require("nodemailer");
var moment = require('moment');
var http = require('http').Server(app);

/*SSL*/
var https = require('https');
var keyval=fs.readFileSync('./nodessl.key','utf8');
var certval=fs.readFileSync('./4c4389f06e6cdbf.crt','utf8');
var options = {
    key: keyval,
    cert:certval
};
/*SSL*/



/*Access token JWT Verification*/

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./models/user'); // get our mongoose model

/*Access token JWT Verification*/



var bodyParser = require('body-parser');
app.use(
    bodyParser.json({
        parameterLimit: 10000000,
        limit: '90mb'
    })
);
app.use(
    bodyParser.urlencoded({
        parameterLimit: 10000000,
        limit: '90mb',
        extended: false})
);
var EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();
emitter.setMaxListeners(0)
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(function(req, res, next) {
    //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var mongodb = require('mongodb');
var db;
var url = 'mongodb://localhost:27017/nexgen';
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url, function (err, database) {
    if(err){
        console.log(err);
    }else{
        db=database;
        console.log("connected");
    }
});

app.get('/test1',function(req,resp){
    console.log('etgggggggggggeset');
    var collection= db.collection('test');

    collection.insert([{

        added_time: moment().unix(),
        user_id:  'rr',
        linkid:  22
    }], function (err, result) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','msg':'Database error occured. Try again!'}));
        } else {
            resp.send(JSON.stringify({'status':'success','msg':'Database no error found. Try again!'}));
        }
    });
});

var server = app.listen(port,'nodessl.influxiq.com', function () {
    var host = server.address().address;
    var port = server.address().port;
});

app.post('/login', function (req, resp) {
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    var collection = db.collection('users');
    collection.find({ email:req.body.email}).toArray(function(err, items){
        if(items.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Email id is invalid...'}));
            return;
        }
        if(items.length>0 && items[0].password!=hash){
            resp.send(JSON.stringify({'status':'error','msg':'Password Doesnot match'}));
            return;
        }
        if(items.length>0 && items[0].status==0){
            resp.send(JSON.stringify({'status':'error','msg':'This is Inactive User'}));
            return;
        }
        if(items.length>0 && items[0].password==hash){
            resp.send(JSON.stringify({'status':'success','item':items}));
            return;
        }
    });
});


app.post('/datalist',function (req,resp) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if(typeof (req.body.condition) !='undefined' && typeof (req.body.condition._id)!='undefined' ){
                req.body.condition._id=new mongodb.ObjectID(req.body.condition._id);
            }
            var cond=req.body.condition;
            var collection = db.collection(req.body.source.toString());
            collection.find(cond).sort({_id:-1}).toArray(function(err, items) {
                if (err) {
                    console.log(err);
                    resp.send(JSON.stringify({'res':[]}));

                } else {
                    resp.send(JSON.stringify({'res':items,'resc':items.length}));
                }
            });
        });
    } else {
         resp.send(JSON.stringify({success: false, message: 'No token provided.'}));
    }
});

app.post('/datalist1',function (req,resp) {
    if(typeof (req.body.condition) !='undefined' && typeof (req.body.condition._id)!='undefined' ){
        req.body.condition._id=new mongodb.ObjectID(req.body.condition._id);
    }
    var cond=req.body.condition;
    var collection = db.collection(req.body.source.toString());
    collection.find(cond).sort({_id:-1}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));

        } else {
            resp.send(JSON.stringify({'res':items,'resc':items.length}));
        }
    });
});


app.post('/addorupdatedata', function (req, resp) {
    var crypto = require('crypto');
    if(typeof(req.body.data)!='undefined' && typeof(req.body.data.password)!='undefined')  req.body.data.password = crypto.createHmac('sha256', req.body.data.password)
        .update('password')
        .digest('hex');
    for(var i in req.body.sourceobj){
        req.body.data[req.body.sourceobj[i]] = new mongodb.ObjectID(req.body.data[req.body.sourceobj[i]]);
    }
    if(typeof(req.body.data)!='undefined' && typeof(req.body.data.confirmpassword)!='undefined')  req.body.data.confirmpassword = null;
    var collection = db.collection(req.body.source.toString());

    if(typeof(req.body.data.id)=='undefined'){
        collection.insert([req.body.data], function (err, result) {
            if (err) {
                resp.send(JSON.stringify({'status':'failed','id':0}));
            } else {
                resp.send(JSON.stringify({'status':'success','res':result.ops[0]._id}));
                return;
            }
        });
    }

    if(typeof(req.body.data.id)!='undefined'){
        var o_id = new mongodb.ObjectID(req.body.data.id);
        collection.update({_id:o_id}, {$set: req.body.data}, true, true);
        resp.send(JSON.stringify({'status':'success',update:1}));
        return;
    }
});


app.get('/deletesingledata',function(req,resp) {
    var collection = db.collection(req.body.source.toString());
    var o_id = new mongodb.ObjectID(req.body.id);
    // collection.remove({_id:o_id}, true);
    collection.remove({_id:o_id}, function(err, results) {
        if(err){
            resp.send(JSON.stringify({'status':'failed'}));
        }else{
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});
https.createServer(options, app).listen(6027);