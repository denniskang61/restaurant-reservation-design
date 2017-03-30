/**
 * Created by wuzhe on 2/1/2017.
 */
var app = angular.module('main', ['ngRoute']);
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/',
                {
                    templateUrl: 'home.html',
                })
            .when('/home',
                {
                    templateUrl: 'home.html',
                })
            .when('/booking', {
                templateUrl: 'booking.html',
                controller: 'bookController'
            })
            .when('/edit', {
                templateUrl: 'edit.html',
                controller: 'editController'
            })
            .when('/login', {
                templateUrl: 'login.html',
                controller: 'loginController'
            })
            .when('/manage', {
                templateUrl: 'manage.html',
                controller: 'manageController'
            })

           /* .otherwise({
                template: "<h1>Nothing</h1><p>Nothing has been selected</p>"
            });*/
    });


app.controller('bookController', function ($scope, $http) {
    $scope.reservation = {};
    $scope.createReservation=function () {
        if(Object.keys($scope.reservation).length != 6) {alert('Please fill out all the forms')}
        else {
            /*$scope.reservation.time.setDate($scope.reservation.date.getDate());*/
            console.log($scope.reservation);
            $http.post('/booking/book',$scope.reservation)
            .success(function (data) {
                $scope.reservation={};
                console.log(data);
                $scope.confirmation = data._id;
                alert('Welcome! Please remember your confirmation code.');
            })
            .error(function (error) {
                console.log('Error'+ error)
            });
        }
        };
        
});
app.controller('editController', function($scope, $http){
    $scope.reservation = {};
    $scope.confirmationcode = {};
    console.log($scope.confirmationcode);
    $scope.submitCode = function(){
         if (Object.keys($scope.confirmationcode).length == 0) alert('Empty')
         else if ($scope.confirmationcode.code.length != 24 ) alert('Invalid code')
         else {
        $http.post('/edit/submitcode', $scope.confirmationcode)
        .success(function(data){
            /*$scope.confirmationcode = {};*/
           /* $scope.reservation = {};*/
            console.log(data);
            if(data.length == 0){alert('No such booking')}
            /*else if(data.message != undefined) {alert('No such booking')}*/
            else {
                $scope.reservation.name = data[0].name;
                $scope.reservation.email = data[0].email;
                $scope.reservation.size = data[0].size;
                $scope.reservation.tel = data[0].tel;
                $scope.reservation.date = new Date(data[0].date);
                $scope.reservation.time = new Date(data[0].time);
            }
        })
             }
    }
    $scope.cancelBooking = function(){
        
        if(Object.keys($scope.confirmationcode).length == 0) {alert('Empty')}
        else if ($scope.confirmationcode.code.length != 24 ) alert('Invalid code')
        else{
          $http.post('/edit/cancel', $scope.confirmationcode)
            .success(function (data) {
              $scope.reservation = {};
              $scope.confirmationcode = {};
              console.log(data);
            if (data.n == 1) alert('Success')
            else alert('No such booking')
            
            })
            .error(function (error) {
                console.log('Error'+ error)
            });
        }
    };
    $scope.updateBooking = function(){
        if(Object.keys($scope.reservation).length != 6) {alert('please fill out all the form')}
        else {
             /*$scope.reservation.time.setDate($scope.reservation.date.getDate());*/
             $scope.reservation.code = $scope.confirmationcode.code;

            $http.post('/edit/update', $scope.reservation)
            .success(function(data){
            $scope.confirmationcode = {};
            $scope.reservation = {};
         /*   $scope.confirmation = data[0]._id;*/
            alert('Success updated')
                });
        }
    }
})

app.controller('loginController', function($scope, $http) {
    $scope.user = {};
    $scope.logIn = function() {
        /*console.log($scope.user);
        $http.post('/login', $scope.user)
        .success(function(data) {
            $scope.user.password = null;
            $scope.books = data;
        })*/
        alert('Welcome Kang!');
    };
    
    $scope.deleteBook=function (id) {
        $http.delete('/login/delete/'+id)
            .success(function (data) {
             /*   $scope.todos=data;*/
                $scope.books = data;
            })
            .error(function (error) {
                console.log('Error'+ error)
            });
    };
})

app.controller('manageController', function ($scope, $http) {
   

    // when landing on the page, get all todos and show them
    $http.get('/booking/book')
        .success(function (data) {
            $scope.books=data;
            console.log(data);
        })
        .error(function (error) {
            console.log('Error'+error);
        });

    $scope.deleteBook=function (id) {
        $http.delete('/booking/book/'+id)
            .success(function (data) {
                $scope.books=data;
                console.log(data);
            })
            .error(function (error) {
                console.log('Error'+ error)
            });
    };
        
});