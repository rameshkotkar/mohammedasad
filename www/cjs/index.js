var kitchenApp = angular.module('kitchenApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
kitchenApp.controller('kitchenController', function ($scope, $http, $window) {

$scope.exportData = function (reportname) {
		
		$scope.pageSize=1000;
		$scope.currentPage=0;
        var blob = new Blob([document.getElementById('exportablenew').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, reportname);
		
    };
    //add data
    $scope.addkitchen = function () {
            $scope.qty =$scope.kitcheneadd.quantity;
            $scope.bal =$scope.kitcheneadd.ctn;
            $scope.sum = ($scope.qty) * ($scope.bal);
            $scope.pridected1 = $scope.kitcheneadd.predicted
            //alert($scope.pridected1);
            if( $scope.sum <= $scope.kitcheneadd.predicted) {
               // alert("name"+ kitcheneadd.name +"ctn" + $scope.kitcheneadd.ctn +"predicted" +kitchenedit.predicted );
        $http({
            method: 'POST',
            url: '/api/addcitymaster/',
            data: $scope.kitcheneadd,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
                if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added kitchen Successfully Add');
                    $window.location.reload();
                } else {
                     alert('Unsuccessful');
                     $window.location.reload(); 
                }
            };
            
        })

    }
    else{

        alert("Predicted Always greater than and equal to Quantity * Ctn");
    }

    };

    //edit data
    $scope.editcitymaster = function () {
        $scope.bal1 = $scope.getcitymasterdata[0].quantity;
        $scope.bal2 = $scope.getcitymasterdata[0].ctn;
        $scope.total = $scope.bal1 * $scope.bal2;
        if ($scope.total <= $scope.getcitymasterdata[0].predicted) {
            $http({
                method: 'POST',
                url: '/api/editcitymaster/',
                data: $scope.getcitymasterdata,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function (data) {
                // console.log(data);
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                     if ($scope.status == 0) {
                        alert('Edit kichen  Successful');
                        $window.location.reload();
                    } else {
                        alert('Unsuccessful');
                        $window.location.reload();
                    }
                }
                ;
            })


        } else
        {
            alert("there is some issue");

        }


    };
   
    $scope.getcitymaster = function (cityid) {
        $http({
            method: 'GET',
            url: '/api/getcitymaster/' + cityid,
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.getcitymasterdata = response.data;
            // console.log($scope.getcitymasterdata);
        });
    };
    $scope.listcitymaster = function () {
        //alert($scope.total);
        $http({
            method: 'GET',
            url: '/api/listcitymaster',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listcitymasterdata = response.data;
            //console.log($scope.listcitymasterdata);
            //$scope.done = [];
            for (i = 0; i < $scope.listcitymasterdata.length; i++) {
                //$scope.listcitymasterdata = {};
                $scope.sum = ($scope.listcitymasterdata[i].quantity) * ($scope.listcitymasterdata[i].ctn);
                //alert($scope.sum);
                if (($scope.sum) == ($scope.listcitymasterdata[i].predicted)) {
                    $scope.done = "done";
                    //$scope.listcitymasterdata[i] = {};
                    $scope.listcitymasterdata[i].done = $scope.done;
                } else {
                    $scope.undone = "undone";
                    $scope.listcitymasterdata[i].undone = $scope.undone;

                }
            }
            $scope.mycountry = $scope.listcitymasterdata;
            $scope.pagedItems = $scope.listcitymasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listcitymasterdata.length / $scope.pageSize);
        });
    };

});