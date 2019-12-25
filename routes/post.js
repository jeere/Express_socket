var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    //Get the parameters send from the HTML post
    var name = req.body.name;
    var data = req.body.data;
    console.log("Received from:"+ name + ", data:"+data);
    //Create socket message object that will be broadcaster
    var msgObj = {name: name , data: data};
    //Emit the data to all registered clients
    req.app.io.emit('broadcast data', msgObj);
    //Something needs to render back - set same URL
    res.render('post', { title: 'Post data' });
});

router.get('/', function(req, res, next) {
    //Render the post example page
    res.render('post', { title: 'Post datax' });
});
  
module.exports = router;