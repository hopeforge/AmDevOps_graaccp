const express = require('express')
const port = 8080
const app = express();
const path = require('path');
const router = express.Router();

router.get('*',function(req,res){
  res.sendFile(path.join(__dirname+'/dist/index.html')); 
});

//add the router
app.use(express.static(__dirname + '/dist'));

app.use('*', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))