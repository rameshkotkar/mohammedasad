var citymaster = require('./models/citymaster');
var jwt = require('jsonwebtoken');

module.exports = {
    configure: function (app) {

        

        app.get('/api/getcitymaster/:cityid', function (req, res) {
            // console.log(req +"asad"+ cityid);
            citymaster.getcitymaster(req.params.cityid, res);
        });
        app.post('/api/addcitymaster/', function (req, res) {
			console.log("hii asad"+req);
            citymaster.addcitymaster(req.body,res);
        });
        app.post('/api/editcitymaster/', function (req, res) {
            citymaster.editcitymaster(req.body, res);
        });
        app.delete('/api/deletecitymaster/:cityid', function (req, res) {
            citymaster.deletecitymaster(req.params.cityid, res);
        });
        app.get('/api/listcitymaster/', function (req, res) {
            citymaster.listcitymaster(res);
        });

       
    }
};