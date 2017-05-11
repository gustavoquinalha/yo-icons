  var iconApp = angular.module('iconApp', ['ngRoute']);
  iconApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'icons-list.html',
        controller: 'IconsListCtrl'
      }).
      when('/:iconName', {
        templateUrl: 'icon-detail.html',
        controller: 'IconsDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });

       $locationProvider.html5Mode(true);
  });
  iconApp.factory('icons', function($http){
    function getData(callback){
      $http({
        method: 'GET',
        url: 'icons.json',
        // url: 'http://quinalha.me/yo-icons/icons.json',
        cache: true
      }).success(callback);
    }
    return {
      list: getData,
      find: function(name, callback){
        getData(function(data) {
          var icons = data.filter(function(entry){
            return entry.name === name;
          })[0];
          callback(icons);
        });
      }
    };
  });
  iconApp.controller('IconsListCtrl', function ($scope, icons){
    icons.list(function(icons) {
      $scope.icons = icons;
    });
  });
  iconApp.controller('IconsDetailCtrl', function ($scope, $routeParams, icons){
    icons.find($routeParams.iconName, function(icons) {
      $scope.icons = icons;
    });
  });
  iconApp.filter('encodeURI', function(){
    return window.encodeURI;
  });
