var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
var upload = multer({storage : _storage});
var fs = require('fs');
var app = express();

app.locals.pretty = true; //jade pretty

app.use(bodyParser.urlencoded({ extended: false})); //body-parser 사용
app.use('/user',express.static('uploads'));
app.set('views','./views_file');
app.set('view engine','jade');  //jade 사용

app.get('/upload',function(req, res){
  res.render('upload');
})

app.post('/upload', upload.single('userfile'), function(req, res){
  console.log(req.file);
  res.send('Uploaded : '+req.file.originalname);
})

app.get('/topic/new',function(req, res){
  fs.readdir('data',function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });
});

// app.get('/topic/:id',function(req, res){
//   fs.readdir('data',function(err, files){
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//     fs.readFile('data/'+id,'utf-8',function(err,data){
//       if(err){
//         res.status(500).send('Internal Server Error');
//       }
//       res.render('view',{topics:files, title:id, description:data});
//     });
//   });
// });

app.get(['/topic','/topic/:id'],function(req, res){
  fs.readdir('data',function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      // id값이 있을때
      fs.readFile('data/'+id,'utf-8',function(err,data){
        if(err){
          res.status(500).send('Internal Server Error');
        }
        res.render('view',{topics:files, title:id, description:data});
      });
    }else{
      // id 값이 없을때
      res.render('view',{topics:files,title:'Welcome', description:'Hello, Javascript for server.'});
    }
  })
})

app.post('/topic',function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
        res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
});

app.listen(3000, function(){
  console.log('Connected, 3000 Port');
});
