var connection = require('../connection');
function citymaster() {
	
    this.addcitymaster = function (addcitymaster, res) {
		console.log(addcitymaster);
        connection.acquire(function (err, con) {
            con.query('insert into order_name(name,quantity,ctn,predicted) values (?,?,?,?)', [addcitymaster.name, addcitymaster.quantity, addcitymaster.ctn,addcitymaster.predicted], function (err, result) {
                con.release();
                if (err) {
                    res.send({
                        status: 1,
                        message: 'citymaster creation failed'
                    });
                } else {
                    res.send({
                        status: 0,
                        message: 'citymaster created successfully'
                    });
                }
            });
        });
    };




    this.editcitymaster = function (editcitymaster, res) {
        // console.log(editcitymaster);
        connection.acquire(function (err, con) {
            con.query('update order_name set name=?,quantity=?,ctn=?,predicted=? where order_name.id = ?', [editcitymaster[0].name,editcitymaster[0].quantity,editcitymaster[0].ctn,editcitymaster[0].predicted,editcitymaster[0].id], function (err, result) {
                // console.log(err);
                con.release();
                console.log(result);
                if (err) {
                    res.send({
                        status: 1,
                        message: 'order_name update failed'
                    });
                } else {
                    res.send({
                        status: 0,
                        message: 'order_name updatesuccessfully'
                    });
                }
            });
        });
    };

   
    this.getcitymaster = function (cityid, res) {
        connection.acquire(function (err, con) {
            con.query('select * from order_name where id =?', [cityid], function (err, result) {
                con.release();
                 // console.log(err); 
                 // console.log(result); 
                res.send(result);
            });
        });
    };
    this.listcitymaster = function (res) {
        connection.acquire(function (err, con) {
            con.query('select * from order_name order by id desc', function (err, result) {
                con.release();
                // console.log(err); 
                //  console.log(result); 
                res.send(result);
            });
        });
    };
};
module.exports = new citymaster();