'use strict';

/**
 * @ngdoc function
 * @name wpAngularApp.controller:PageCtrl
 * @description
 * # PageCtrl
 * Controller of the wpAngularApp
 */
angular.module('wpAngularApp')
  .controller('PageCtrl', function ($scope, $rootScope, $routeParams, $sce, Restangular) {
    if (typeof $routeParams.slug!=='undefined' && $routeParams.slug!=='') {
	    
	    //console.log($routeParams.slug);

	    Restangular.one('get_page/?slug=' + $routeParams.slug).get().then(
		 function(result) {
		 	if (result.status==='ok') {
			 	result.page.content=$sce.trustAsHtml(result.page.content);
			 	
			 	result.page.url=result.page.thumbnail_images.full.url;
			 	//result.page.url=result.page.attachments[0].url;
				$scope.page=result.page;
				
				//console.log($scope.page.url);
				
			} else {
				//TODO: go out
				console.log('Bad API Request');
			}
		 	
		 }   
	    );
    }

  });
