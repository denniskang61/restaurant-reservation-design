

var Book=require('./models/book');
var User = require('./models/user')
module.exports=function (app) {


    
// get all todos
    app.get('/booking/book', function(req, res) {

        // use mongoose to get all todos in the database
        Book.find(function(err, books) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(books); // return all todos in JSON format
        });
    });    
    
app.delete('/booking/book/:book_id', function(req, res) {
        Book.remove({
            _id : req.params.book_id
        }, function(err, books) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Book.find(function(err, books) {
                if (err)
                    res.send(err)
                res.json(books);
            });
        });
    });
    
    
app.post('/booking/book', function(req, res) {

        Book.create({
            name : req.body.name,
            email : req.body.email,
            tel : req.body.tel,
            size : req.body.size,
            date : req.body.date,
            time : req.body.time
        }, function(err, book) {
            if (err) {
                res.send(err);
            }

                res.json(book);
            
        });

    });
 app.post('/edit/submitcode', function(req, res) {

        Book.find({_id : req.body.code
           
        }, function(err, book) {
            if (err) {
                res.send(err);
            }
            
            Book.find({_id : req.body.code}, function(err, book) {            
               if (err)
                    res.send(err);
                res.json(book);
                console.log(book);
           });
        });

    });

app.post('/edit/cancel', function(req, res) {
        Book.remove({
            _id : req.body.code
        }, function(err, book) {
            if (err){
                res.send(err);
            }
                res.json(book);
        });
    });

app.post('/edit/update', function(req, res){
    Book.update({_id : req.body.code}, 
                {
                 name : req.body.name,
                 email : req.body.email,
                 tel : req.body.tel,
                 size : req.body.size,
                 date: req.body.date,
                 time : req.body.time
                },  
                function(err, book) {
            if (err)
                res.send(err);
        
    Book.find({_id : req.body.code}, function(err, book) {            
               if (err)
                    res.send(err);
                res.json(book);
           });
        })
})

app.post('/login', function(req, res) {
     User.find({email: req.body.email, password: req.body.password
           
        }, function(err, book) {
            if (err) {
                res.send(err);
            }
        
           /*   Book.find(function(err, books) {            
               if (err) {res.send(err);}
                res.json(books);
                console.log(books);
           });*/
        });
    
})

  app.delete('/login/delete/:book_id', function(req, res) {
        Book.remove({
            _id : req.params.book_id
        }, function(err, book) {
            if (err)
                res.send(err);
             
            // get and return all the todos after you create another
            Book.find(function(err, books) {
                if (err)
                    res.send(err)
                res.json(books);
            });
        });
    });

    
// application -------------------------------------------

    app.get('*',function (req,res) {    // all other url is *
        res.sendfile('./public/index.html'); // load the single view file
    });



};









