app.controller('cont', ['$scope', function ($scope) {
  $scope.title = "Get the interact.io";
}]);

app.controller('formCont', ['$scope', 'auth', 'stats', 'drawChart', '$filter', function($scope, auth, stats, drawChart, $filter){

    $scope.user = {};

    $scope.labels = [];
    $scope.series = [];
    $scope.data = [];
    $scope.options = {
      skipXLabels: 10
    };

    $scope.view;

    $scope.showMe = false;
    $scope.disMich = false;
    $scope.disSeb = false;
    $scope.michael;
    $scope.sebastian;
    $scope.showMich = false;
    $scope.showSeb = false;
    $scope.showDraw = false;

    var userdata = [];
    var Label;
    var Data = [];
 
    $scope.userLogin = function(user){

        $scope.user = user;
        auth.login($scope.user).success(function(data){
          
            if(user.username === 'michael@interact.io'){
                $scope.disMich = true;
                $scope.series.push('Michael');
                $scope.michael = "Michael called";
                $scope.showMich = true;
              }else if(user.username === 'sebastian@interact.io'){
                $scope.disSeb = true;
                $scope.series.push('Sebastian');
                $scope.sebastian = "Sebastian called";
                $scope.showSeb = true;
              }
            
            
            var authkey = data.token.authToken;
            var userId = data.user.id;
            //console.log(data.user);

            stats.getData(authkey).success(function(data){
              
              $scope.showDraw = true;

              console.log(data.stats);
              var inters = data.stats;

              var results = drawChart.draw(inters);              

              console.log(results);
              Label = results.toLabels;
              Data.push(results.toData);
              });
          });
        };

    $scope.draw = function(){
      console.log(Label.length + ' ' + Data.length);
      $scope.labels = Label.slice(151,266);
      for(var i = 0; i < $scope.labels.length; i++){
        $scope.labels[i] = $filter('date')(Date.parse($scope.labels[i]), 'mediumDate');
      }
      $scope.data = [];
      $scope.data.push(Data[0].slice(151,266));
      carryValue[0] = Data[0].slice(151,266);

      if(Data.length === 2){
        $scope.data.push(Data[1].slice(151,266));
        carryValue[1] = Data[1].slice(151,266);
      }

      carryDate = $scope.labels;
      $scope.view = "4 Months view";
      $scope.showMe = true;
      $scope.active = false;
      $scope.activeM = false;
    }

    //Do vamo sve radi



    var carryDate;
    var carryValue = [];


    $scope.sum = function(){
      var sumedData = [];
      for(var i = 0; i < $scope.data[0].length; i++){
        sumedData.push($scope.data[0][i] + $scope.data[1][i]);
      }
      $scope.data.push(sumedData);
      if($scope.series.length == 2){
        $scope.series.push('Michael & Sebastian');
      };

      $scope.active = true;  
      $scope.activeM = true;               
    };


    $scope.weekPeriod = function(){
      $scope.labels = Label.slice(200,207);
      $scope.data = [];
      
      $scope.data.push(Data[0].slice(200,207));
      carryValue[0] = Data[0].slice(200,207);

      if(Data.length === 2){
        $scope.data.push(Data[1].slice(200,207));
        carryValue[1] = Data[1].slice(200,207);
      }


      $scope.view = "Weekly view";
      $scope.options.skipXLabels = 7;
      carryDate = $scope.labels;   
      $scope.active = false; 
      $scope.activeM = true;              
    }

    $scope.monthPeriod = function(){
      $scope.labels = Label.slice(181,211);
      $scope.data = [];

      $scope.data.push(Data[0].slice(181,211));
      carryValue[0] = Data[0].slice(181,211);

      if(Data.length === 2){
        $scope.data.push(Data[1].slice(181,211));
        carryValue[1] = Data[1].slice(181,211);
      }

      $scope.view = "Monthly view";
      $scope.options.skipXLabels = 4;
      carryDate = $scope.labels;
      $scope.active = false;
      $scope.activeM = false; 
    }

    $scope.threeMPeriod = function(){
      $scope.labels = Label.slice(154,244);
      $scope.data = [];

      $scope.data.push(Data[0].slice(154,244));
      carryValue[0] = Data[0].slice(154,244);

      if(Data.length === 2){
        $scope.data.push(Data[1].slice(154,244));
        carryValue[1] = Data[1].slice(154,244);
      }

      $scope.view = "3 Months view";             
      $scope.options.skipXLabels = 12;         
      carryDate = $scope.labels;  
      $scope.active = false;
      $scope.activeM = false; 
    }

    $scope.yearPeriod = function(){
      $scope.labels = Label.slice(0,366);
      $scope.data = [];

      $scope.data.push(Data[0].slice(0,366));
      carryValue[0] = Data[0].slice(0,365);

      if(Data.length === 2){
        $scope.data.push(Data[1].slice(0,366));
        carryValue[1] = Data[1].slice(0,366);
      }

      $scope.view = "Yearly view";
      $scope.options.skipXLabels = 12;
      carryDate = $scope.labels; 
      $scope.active = false; 
      $scope.activeM = false;                        
    }


    $scope.dayView = function(){
      $scope.labels = carryDate;
      for(var i = 0; i < $scope.labels.length; i++){
        $scope.labels[i] = $filter('date')(Date.parse($scope.labels[i]), 'EEEE, d MMM y');        
      }
      
    }

    $scope.weekView = function(){
      $scope.labels = carryDate;
      for(var i = 0; i < $scope.labels.length; i++){
        $scope.labels[i] = $filter('date')(Date.parse($scope.labels[i]), 'longDate');        
      }

      $scope.data[0] = carryValue[0];
      if(carryValue.length === 2){
        $scope.data[1] = carryValue[1];
      }

      var avg1 = 0;
      var avgArr1 = [];
      for(var i = 1; i < $scope.labels.length+1; i++){
        avg1 += $scope.data[0][i-1];
        if(i % 7 === 0){
          avgArr1.push(avg1);
          avg1 = 0;
        }
      }

      var j = 0;
      for(var i = 1; i < $scope.labels.length+1; i++){
        $scope.data[0][i-1] = avgArr1[j];
        if(i % 7 === 0){
          j++;
        }
      }

      if($scope.data.length === 2){
        var avg2 = 0;
        var avgArr2 = [];
        for(var i = 1; i < $scope.labels.length+1; i++){
          avg2 += $scope.data[1][i-1];
          if(i % 7 === 0){
            avgArr2.push(avg2);
            avg2 = 0;
          }
        }

        var j = 0;
        for(var i = 1; i < $scope.labels.length+1; i++){
          $scope.data[1][i-1] = avgArr2[j];
          if(i % 7 === 0){
            j++;
          }
        }
      }

      if($scope.data.length === 3){
        var avg2 = 0;
        var avgArr2 = [];
        for(var i = 1; i < $scope.labels.length+1; i++){
          avg2 += $scope.data[2][i-1];
          if(i % 7 === 0){
            avgArr2.push(avg2);
            avg2 = 0;
          }
        }

        var j = 0;
        for(var i = 1; i < $scope.labels.length+1; i++){
          $scope.data[2][i-1] = avgArr2[j];
          if(i % 7 === 0){
            j++;
          }
        }
      }


      $scope.active = true;
      $scope.activeM = true;
    }

    $scope.monthView = function(){
      $scope.labels;
      for(var i = 0; i < $scope.labels.length; i++){
        $scope.labels[i] = $filter('date')(Date.parse($scope.labels[i]), 'MMMM');        
      }

      $scope.data[0] = carryValue[0];
      if(carryValue.length === 2){
        $scope.data[1] = carryValue[1];
      }


      var avg = 0;
      var avgArr = [];
      for(var i = 1; i < $scope.labels.length+1; i++){
        avg += $scope.data[0][i-1];
        if(i % 30 === 0){
          avgArr.push(avg);
          avg = 0;
        }
      }

      var j = 0;
      for(var i = 1; i < $scope.labels.length+1; i++){
        $scope.data[0][i-1] = avgArr[j];
        if(i % 30 === 0){
          j++;
        }
      }

      if($scope.data.length === 2){
        var avg2 = 0;
        var avgArr2 = [];
        for(var i = 1; i < $scope.labels.length+1; i++){
          avg2 += $scope.data[1][i-1];
          if(i % 30 === 0){
            avgArr2.push(avg2);
            avg2 = 0;
          }
        }

        var j = 0;
        for(var i = 1; i < $scope.labels.length+1; i++){
          $scope.data[1][i-1] = avgArr2[j];
          if(i % 30 === 0){
            j++;
          }
        }
      }

      if($scope.data.length === 3){
        var avg2 = 0;
        var avgArr2 = [];
        for(var i = 1; i < $scope.labels.length+1; i++){
          avg2 += $scope.data[2][i-1];
          if(i % 30 === 0){            
            avgArr2.push(avg2);
            avg2 = 0;
          }
        }

        var j = 0;
        for(var i = 1; i < $scope.labels.length+1; i++){
          $scope.data[2][i-1] = avgArr2[j];
          if(i % 30 === 0){
            j++;
          }
        }
      }

      $scope.active = true;
      $scope.activeM = true;
      
    }
}]);