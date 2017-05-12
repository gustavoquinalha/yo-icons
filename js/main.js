  var iconApp = angular.module('iconApp', ['ngRoute']);
  iconApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'icons-list.html',
        controller: 'IconsListCtrl'
      }).
      when('/:countryName', {
        templateUrl: 'icon-detail.html',
        controller: 'IconsDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
      
       $locationProvider.html5Mode(true);
  });
  iconApp.factory('icons', function($http){

      var icons = {
          getJson : getJson,
          data : []
      }
      return icons;
      
      function getJson() {
          return $http.get('icons.json')
                .then(function(res) {
              return res;
          })
      }
      
  });

    iconApp.controller('IconsListCtrl', function($scope, icons) {
        
        $scope.icons = []; 
        
        icons.getJson().then(function(res) {
            var aux = res.data;
            for (x in aux) {
                $scope.icons.push(aux[x]);
            }
            console.log(JSON.stringify($scope.icons));
        })         
    })
    
    iconApp.controller('IconsDetailCtrl', function($scope, $routeParams, icons) {
        $scope.icons = icons.aux;
    })

//  iconApp.controller('IconsListCtrl', function ($scope, icons){
//    icons.list(function(icons) {
//      $scope.icons = icons.icon;
//        console.log(JSON.stringify($scope.icons));
//    });
//  });
//  iconApp.controller('IconsDetailCtrl', function ($scope, $routeParams, icons){
//    icons.find($routeParams.countryName, function(icons) {
//      $scope.icons = icons.icon;
//    });
//  });
  iconApp.filter('encodeURI', function(){
    return window.encodeURI;
  });
