'use strict';

/**
 * @ngdoc overview
 * @name wpAngularApp
 * @description
 * # wpAngularApp
 *
 * Main module of the application.
 */
angular
  .module('wpAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home/:page?/:author?', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/post/:slug', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl'
      })
      .when('/page/:slug', {
        templateUrl: 'views/page.html',
        controller: 'PageCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/error', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }).config(function(RestangularProvider) {
	var api_url='https://puchi-cuchi.rhcloud.com/api';
  	RestangularProvider.setBaseUrl(api_url);
  	RestangularProvider.setResponseExtractor(function(response) {
	  var newResponse = response;
	  if (angular.isArray(response)) {
	    angular.forEach(newResponse, function(value, key) {
	      newResponse[key].originalElement = angular.copy(value);
	    });
	  } else {
	    newResponse.originalElement = angular.copy(response);
	  }
	  return newResponse;
	});
  }).run(function($rootScope, $location, Restangular) {
  
    Restangular.one('angular/basic/').get().then(
	 function(result) {
		if (result.status==='ok') {
			$rootScope.info=result;
			//console.log($rootScope.info);	
		} else {
			//TODO: go out
			console.log('Bad API Request');
			
		}
		
	 }, function (error) {
		 console.log(error);
		 $location.path('/error');
	 }
    );
    
    Restangular.one('widgets/get_sidebar/?sidebar_id=sidebar-3').get().then(
	 function(result) {
		if (result.status==='ok') {
			$rootScope.social=result.widgets[0].instance;
			//console.log($rootScope.social);	
		} else {
			//TODO: go out
			console.log('Bad API Request');
		}
		
	 }   
    );
    
    Restangular.one('angular/menu/').get().then(
	 function(result) {
		if (result.status==='ok') {
			//console.log(result);
			$rootScope.menus=result.menu;
			//console.log($rootScope.menus);	
		} else {
			//TODO: go out
			console.log('Bad API Request');
		}
		
	 }   
    );
    
    $rootScope.date = new Date();
    
    $rootScope.goCategory = function(slug) {
	  	if (typeof slug!=='undefined' && slug!=='') {
	  		$location.path('/blog/'+slug);
	  	}  	  
    };
    
  }).filter('htmlToPlaintext', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '');
    };
  }).filter('onlySlug', function() {
    return function(text) {
	  var path=text.split('/');
	  //console.log(path[3]);
      return path[3];
    };
  });