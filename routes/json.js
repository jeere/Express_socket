var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    //Get the parameters send from the HTML post
    var name = req.body.name;
    var data = req.body.data;
    console.log("Received from:"+ name + ", data:"+data);
    //Create socket message object that will be broadcaster
    var msgObj = {name: name , data: data};
    //Emit the data to all registered clients
    req.app.io.emit('broadcast data', msgObj);
    //Send response back to sender that it succeed
    res.json({"status" : "success"});
});

module.exports = router;