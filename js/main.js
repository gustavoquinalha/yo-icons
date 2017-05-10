  var iconApp = angular.module('iconApp', ['ngRoute']);
  iconApp.config(function($routeProvider) {
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
  });
  iconApp.factory('icons', function($http){
    function getData(callback){
      $http({
        method: 'GET',
        url: 'icons.json',
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
    icons.find($routeParams.countryName, function(icons) {
      $scope.icons = icons;
    });
  });
  iconApp.filter('encodeURI', function(){
    return window.encodeURI;
  });
