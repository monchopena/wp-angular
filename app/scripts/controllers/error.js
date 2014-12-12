'use strict';

/**
 * @ngdoc function
 * @name wpAngularApp.controller:ErrorCtrl
 * @description
 * # ErrorCtrl
 * Controller of the wpAngularApp
 */
angular.module('wpAngularApp')
  .controller('ErrorCtrl', function ($scope) {
    $scope.msg_error='There\'s a problem with your API. Maybe you have to change some configuration';
  });
