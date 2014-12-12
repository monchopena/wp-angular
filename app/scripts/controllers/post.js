'use strict';

/**
 * @ngdoc function
 * @name wpAngularApp.controller:PostCtrl
 * @description
 * # PostCtrl
 * Controller of the wpAngularApp
 */
angular.module('wpAngularApp')
  .controller('PostCtrl', function ($scope, $rootScope, $routeParams, $sce, $filter, Restangular) {
    
    if (typeof $routeParams.slug!=='undefined' && $routeParams.slug!=='') {
	    
	    //console.log($routeParams.slug);

	    Restangular.one('get_post/?slug=' + $routeParams.slug).get().then(
		 function(result) {
		 	if (result.status==='ok') {
			 	result.originalElement.post.content=$sce.trustAsHtml(result.originalElement.post.content);
			 	
			 	result.originalElement.post.url=result.originalElement.post.thumbnail_images.full.url;
			 	
			 	//result.originalElement.post.url=result.originalElement.post.attachments[0].url;
			 	
				$scope.post=result.originalElement.post;
				
				//console.log($scope.post.url);
				
				if (typeof result.originalElement.previous_url!=='undefined' && result.originalElement.previous_url!=='') {
					//$filter('filtername')(arg1,arg2);
					$scope.previous='/#/post/'+$filter('onlySlug')(result.originalElement.previous_url);
				} else {
					$scope.previous='';
				}
				
				if (typeof result.originalElement.next_url!=='undefined' && result.originalElement.next_url!=='') {
					//$filter('filtername')(arg1,arg2);
					$scope.next='/#/post/'+$filter('onlySlug')(result.originalElement.next_url);
				} else {
					$scope.next='';
				}
				
				//console.log($scope.previous);
				//console.log($scope.next);
				//console.log($scope.post);
				
			} else {
				//TODO: go out
				console.log('Bad API Request');
			}
		 	
		 }   
	    );
    }
    
  });
