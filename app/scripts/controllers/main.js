'use strict';

/**
 * @ngdoc function
 * @name wpAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wpAngularApp
 */
angular.module('wpAngularApp')
  .controller('MainCtrl', function ($scope, $sce, $routeParams, Restangular) {
    
    //init vars
    $scope.previous='';
    $scope.next='';
    $scope.author_name='';
    var go_previous=0;
    var go_next=0;
    
    
    var url_get_posts='get_posts/';
    var actual_page=1;
    
    if (typeof $routeParams.page!=='undefined' && $routeParams.page>0) {
	    url_get_posts=url_get_posts+'?page='+$routeParams.page;
	    actual_page=parseInt($routeParams.page);
    }
    
    if (typeof $routeParams.author!=='undefined' && $routeParams.author!=='') {
	    url_get_posts='get_author_posts/?page='+$routeParams.page+'&slug='+$routeParams.author;
	    $scope.author_name=$routeParams.author;
    }
    
    Restangular.one(url_get_posts).get().then(
	 function(result) {
		if (result.status==='ok') {
			
			angular.forEach(result.posts, function(post, key) {
			 	 result.posts[key].content=$sce.trustAsHtml(post.content);
			 	 result.posts[key].excerpt=$sce.trustAsHtml(post.excerpt);
			});
			
			$scope.posts=result.posts;
			
			if (actual_page>1) {
				go_previous=actual_page-1;
				$scope.previous='/#/home/'+go_previous;
			}
			
			if (actual_page<result.pages) {
				go_next=actual_page+1;
				$scope.next='/#/home/'+go_next;
			}
			
			if (typeof $routeParams.author!=='undefined' && $routeParams.author!=='') {
				
				if (actual_page>1) {
					$scope.previous=$scope.previous+'/'+$routeParams.author;
				}
				
				if (actual_page<result.pages) {
					$scope.next=$scope.next+'/'+$routeParams.author;
				}
				
			}
			
		} else {
			console.log('TODO: control errors');
		}
	 }   
    );
    
  });
