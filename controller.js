var myApp = angular.module('myApp',[]);
myApp.controller('assginmentController', function ($scope, $http, $interval) {
    
                var url = 'https://user-33949.firebaseio.com/User.json';
                var myDataRef = new Firebase('https://user-33949.firebaseio.com/');
                var weather = 'https://api.wunderground.com/api/96d1c5baf995855f/conditions/q/HK/Central District.json';
                
                var dataArray = [];
                var arrayLength = 0;
                
                
                var isrepeated = false;
                var allow = true;
                
                var stop;
                var location;
                var currenttime;
                var tempc;
                var tempf;
                var weatherg;
                
                stop = $interval(function() {
                    getCurrentWeath();
                    console.log('ggop')
                }, 4000);
                
                getCurrentWeath();
                
                function getCurrentWeath() {
                    $http.get(weather).success(function(data) {
                        if(data != null) {
                            location = data.current_observation.display_location.country;
                            currenttime = data.current_observation.observation_time;
                            tempc = data.current_observation.temp_c;
                            tempf = data.current_observation.temp_f;
                            weatherg = data.current_observation.weather;
                            $scope.weatherdata = 'Coutry:' + location +  '　　'+'Time:' + currenttime + '　　'+'Temperature:' + tempc + '°C' +'　'+ tempf + ' °F' +'　　'+ 'Weather:' + weatherg;
                        }
                    });
                }
                
                $http.get(url).success(function(data) {
                    if(data != null){
                        dataArray = Object.keys(data).map(function(k){return data[k]});
                        $scope.users = dataArray;
                    }
                    });
                    
                    
                $scope.register = function(){
                    $http.get(url).success(function(data) {
                        console.log(data);
                        
                    if(data != null){
                        dataArray = Object.keys(data).map(function(k){return data[k]});
                        $scope.users = dataArray;
                    }
                    });
                     if(!$scope.username || !$scope.name || !$scope.password  || !$scope.age || !$scope.email ){
                        alert("You need to input all value");
                     }else if(!checkDuplicates(dataArray, $scope.username)){
                        
                        
                        if(dataArray.length != 0){
                            arrayLength = dataArray.length;
                        }    
                        var registerData  = {username: $scope.username, Name: $scope.name, Email_Address: $scope.email, Password: $scope.password, Age: $scope.age, ID: parseInt(arrayLength + 1)};
                        myDataRef.child('User').push(registerData);
                        alert("Register Success. Username is :" + $scope.username)
                        
                        
                     
                     }else{
                         alert ("Username already use. Please try again");
                     }
                };
                $scope.average = function(){
                    $http.get(url).success(function(data) {
                        console.log(data);
                    if(data != null){
                        dataArray = Object.keys(data).map(function(k){return data[k]});
                        $scope.users = dataArray;
                    }
                    });
                    showAverage(dataArray);
                }
                
                $scope.filtering = function(prop, val){
                    return function(item){
                            if($scope.filtertype == 'lessthan') {
                               if (item[prop] <= val){
                                   return true;
                               } 
                            } else if($scope.filtertype == 'greaterthan') {
                                if(item[prop] >= val){
                                  return true;  
                                } 
                            } else {
                                return true;
                            }
                   }
                }
                
                $scope.$watch('filtertype', function(newValue, oldValue) {
                    //console.log(newValue); 
                    if(newValue == undefined || newValue == 'clear') {
                        $scope.checked = false;
                    } else {
                        $scope.checked = true;
                    }
                });
                
                $scope.sortbyage = function(){
                    sortByAge(dataArray);
                }
                $scope.sortbyname = function(){
                    sortByName(dataArray);
                    
                }

function sortByAge(array) {
    if(array.length == 0){
        alert("isempty cannot sort the list!");
    }else{
        array.sort(comparebyage);
    }
}

function sortByName(array) {
    if(array.length == 0){
        alert("isempty cannot sort the list!");
    }else{
        array.sort(comparebyname);
    }
}

function sortByAge(array) {
    if(array.length == 0){
        alert("isempty cannot sort the list!");
    }else{
        array.sort(comparebyage);
    }
}


function sortByName(array) {
    if(array.length == 0){
        alert("isempty cannot sort the list!");
    }else{
        array.sort(comparebyname);
    }
}

         
function checkDuplicates(array,item){
  
    for (var i=0, count = array.length; i < count; i++) {
        if (item == array[i].username){
            return true;
        }
    }
    return false;
    
}

function showAverage(array){
    var totalAge = 0;
    if(array.length == 0){
        alert("isempty cannot show average age");
    }else{
        for (var i=0;i<array.length;i++){
            totalAge += parseInt(array[i].Age);
        }
        var averageAge = totalAge / array.length;
        alert("Users Average Age : "+averageAge);
    }
}




function comparebyname(a,b) {
  if (a.username < b.username)
    return -1;
  else if (a.username > b.username)
    return 1;
  else 
    return 0;
}



function comparebyage(a,b) {
  if (parseInt(a.Age) < parseInt(b.Age))
    return -1;
  else if (parseInt(a.Age) > parseInt(b.Age))
    return 1;
  else 
    return 0;
}

});
