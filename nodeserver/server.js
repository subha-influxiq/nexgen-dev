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
app.set('superSecret', config.secret); // secret variable

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

var tokenstatus='';
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

app.post('/leadsignup', function (req, resp) {
    var collection = db.collection('users');
    collection.insert([{
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneno: req.body.phoneno,
        city: req.body.city,
        state: req.body.state,
        lead_step: req.body.lead_step,
        type: req.body.type
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            var tokenis = createjwttoken();
            if(tokenis!=null){
    /*            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id,token:createjwttoken()})); return;*/
                var o_id = new mongodb.ObjectID(result.ops[0]._id);
                collection.find({_id:o_id}).toArray(function(err, items) {
                    if (err) {
                        resp.send(JSON.stringify({'status':'error','id':0}));
                        return;
                    } else {
                        resitem = items[0];
                        resp.send(JSON.stringify({'status':'success','item':resitem,token:createjwttoken()}));
                      //  resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id,token:createjwttoken()}));
                        return;
                    }
                });
            }else{
                resp.send(JSON.stringify({'status':'error','msg':'Contact to site administrator for further information!'}));
                return;
            }
        }
    });
});


app.post('/leadsignupquestionnaireupdate',function (req,resp) {
    var collection = db.collection('users');
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    verifytoken(token);
    console.log('tokenstatus');
    console.log(tokenstatus);
    if(tokenstatus!=true){
        resp.send(JSON.stringify({'status':'error',token:token,errormessage:tokenstatus}));
        return;
    }
    else{
        var o_id = new mongodb.ObjectID(req.body.data.id);
        var crypto = require('crypto');
        if(typeof(req.body.data)!='undefined' && typeof(req.body.data.password)!='undefined')  req.body.data.password = crypto.createHmac('sha256', req.body.data.password)
            .update('password')
            .digest('hex');
        if(typeof(req.body.data)!='undefined' && typeof(req.body.data.id)!='undefined')  req.body.data.id = null;
        collection.update({_id:o_id}, {$set: req.body.data}, true, true);
        resp.send(JSON.stringify({'status':'success',update:1}));
        return;
    }
});

app.post('/togglestatus',function(req,resp){

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    verifytoken(token);
    console.log('tokenstatus');
    console.log(tokenstatus);
    if(tokenstatus!=true){
        resp.send(JSON.stringify({'status':'error',token:token,errormessage:tokenstatus}));
        return;
    }
    req.query=req.body;
    var collection = db.collection(req.query.source.toString());
    var o_id = new mongodb.ObjectID(req.query.id);     //[we use ObjectId to convert the data otherwise we could not get it]
    collection.update({_id:o_id}, {$set: {status:req.query.status}}, true, true);  //[_id defined that in database it is defined  _id so we used _id here to match field]

    resp.send(JSON.stringify({'status':'success'}));
});


/*COMMON FUNCTIONS*/
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
            var tokenis = createjwttoken();
            if(tokenis!=null){
                resp.send(JSON.stringify({'status':'success','item':items,token:createjwttoken()}));
                return;
            }else{
                resp.send(JSON.stringify({'status':'error','msg':'Contact to site administrator for further information!'}));
                return;
            }

        }
    });
});

app.post('/datalist',function (req,resp) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    verifytoken(token);
    console.log('tokenstatus');
    console.log(tokenstatus);
    if(tokenstatus!=true){
        resp.send(JSON.stringify({'status':'error',token:token,errormessage:tokenstatus}));
        return;
    }
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
    var added_time= new Date().getTime();
    if(typeof(req.body.data)!='undefined' && typeof(req.body.data.password)!='undefined')  req.body.data.password = crypto.createHmac('sha256', req.body.data.password)
        .update('password')
        .digest('hex');
    for(var i in req.body.sourceobj){
        req.body.data[req.body.sourceobj[i]] = new mongodb.ObjectID(req.body.data[req.body.sourceobj[i]]);
    }
    if(typeof(req.body.data)!='undefined' && typeof(req.body.data.confirmpassword)!='undefined')  req.body.data.confirmpassword = null;
    var collection = db.collection(req.body.source.toString());
    if(typeof(req.body.data.id)=='undefined'){
        req.body.data['created_at']=added_time;
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
        req.body.data['updated_at']=added_time;
        var o_id = new mongodb.ObjectID(req.body.data.id);
        collection.update({_id:o_id}, {$set: req.body.data}, true, true);
        resp.send(JSON.stringify({'status':'success',update:1}));
        return;
    }
});

app.post('/deletesingledata',function(req,resp) {
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

function createjwttoken(){
    var older_token = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)}, app.get('superSecret'));
    /*const payload = {
        admin: true     };
    var token = jwt.sign(payload, app.get('superSecret'), {
        //expiresInMinutes: 1440 // expires in 24 hours
    });*/
    //resp.send(JSON.stringify({'status':'success',token:token,oldtoken:older_token}));
    return older_token;
};

function verifytoken(token){
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        console.log('token');
        console.log(token);
        if (err) {
            //resp.send(JSON.stringify({'status':'success',error:err}));
            console.log('in error');
            tokenstatus= err.message;
        }
        else{
            console.log('in success !!');
            tokenstatus= true;
        }
    });
};


https.createServer(options, app).listen(6027);


app.get('/createtoken',function(req,resp) {
    var older_token = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3)}, app.get('superSecret'));

    const payload = {
        admin: true     };
    var token = jwt.sign(payload, app.get('superSecret'), {
        //expiresInMinutes: 1440 // expires in 24 hours
    });
    resp.send(JSON.stringify({'status':'success',token:token,oldtoken:older_token}));
    return;
});
app.get('/checktoken',function(req,resp) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
            resp.send(JSON.stringify({'status':'success',error:err}));
            return;
        }
        else{
            resp.send(JSON.stringify({'status':'success',token:'success'}));
        }
    });

    return;
});


