var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mime = require('mime');

//load companies route
var companies = require('./routes/companies');
var candidates = require('./routes/candidates');
var schedules = require('./routes/schedules');

var app = express();


// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());


app.use(express.static(path.join(__dirname, 'client')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.use(express.static('uploads'));
app.get('/companies/get/:id', companies.get);
app.get('/companies/:page', companies.list);
app.get('/companies', companies.list);
app.post('/companies/find', companies.find);
app.get('/companies/find/:page/:company_name', companies.find);
app.get('/companies/add', companies.add);
app.post('/companies/add', companies.save);
app.get('/companies/delete/:id', companies.delete_company);
app.get('/companies/edit/:id', companies.edit);
app.post('/companies/edit/:id',companies.save_edit);


app.get('/candidates/add', candidates.add);
app.post('/candidates/add', candidates.save);
app.get('/candidates/edit/:id', candidates.edit);
app.get('/candidates/get/:id', candidates.get);
app.get('/candidates', candidates.list);
app.get('/candidates/:page', candidates.list);
app.post('/candidates/edit/:id',candidates.save_edit);
app.get('/candidates/delete/:id', candidates.delete_candidate);
app.post('/candidates/upload', candidates.cv_upload);
app.post('/candidates/find', candidates.find);
app.post('/candidates/find/', candidates.find);
app.get('/candidates/find/:page/:candidate_name', candidates.find);
app.get('/schedules/add', schedules.add);
app.get('/schedules/get/:id', schedules.get);
app.post('/schedules/add', schedules.save);
app.get('/schedules/edit/:id', schedules.edit);
app.post('/schedules/edit/:id',schedules.save_edit);
app.get('/schedules', schedules.list);
app.get('/schedules/:page', schedules.list);
app.post('/schedules/find', schedules.find);
app.get('/schedules/find/:page/:schedule_name', schedules.find);
app.get('/schedules/delete/:id', schedules.delete_schedule);

var clientDir = path.join(__dirname, 'client')

app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/download', candidates.download);

app.get('/download/:fileName', function(req, res){
var fileName = req.params.fileName;
  var file = __dirname + '/uploads/'+fileName;

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});






app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
