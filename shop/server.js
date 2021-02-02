var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://127.0.0.1:27017/shop", { useUnifiedTopology: true,useNewUrlParser: true });

var Product = require('./model/product');
var WishList = require('./model/wishlist');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.post('/product',function(request,response){
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
    product.save(function(err,saveProduct){
        if(err){
            response.status(500).send({error:"Could not saved product"});
        }
        else{
            response.send(saveProduct);
        }
    });
});


app.get('/product',function(request,response){
   Product.find({},function(err,products){
       if(err){
             response.status(500).send({error:"Could not return product"});
       }
       else
           response.send(products);
   });
});

app.get('/wishlist',function(request,response){
   WishList.find({}).populate({path:'products',model:'Product'}).exec(function(err,efgh){
       if(err){
             response.status(500).send({error:"Could not return product"});
       }
       else
           response.status(200).send(efgh);
   });
});    

app.post('/wishlist',function(request,response){
    var wishlist = new WishList();
    wishlist.title = request.body.title;
    wishlist.save(function(err,dfg){
        if(err){
            response.status(500).send({error:"Could not saved wishlist"});
        }
        else{
            response.send(dfg);
        }
    });
});



//app.post('/wishadd',function(request,response){
//    var wishlist = new WishList();
//    wishlist.title = request.body.title;
//    wishlist.products =request.body.products;
//    
//    wishlist.save(function(err,dfg){
//        if(err){
//            response.status(500).send({error:"Could not saved wishlist"});
//        }
//        else{
//            response.send(dfg);
//        }
//    });
//});

app.put('/wishlist/add',function(request,response){
    Product.findOne({_id:request.body.productId},function(err,producta){
        if(err){
             response.status(500).send({error:"Could not return product"});
       }
       else
       {
           WishList.update({_id:request.body.wishlistId},{$addToSet:{products:producta._id}},function(err,wishlista){
                if(err){
                     response.status(500).send({error:"Could not return product"});
                }
                else
                    response.send(wishlista);  
           });
       }
    });
});


app.listen(3004, function(){
    console.log("app running on port 3004");
});