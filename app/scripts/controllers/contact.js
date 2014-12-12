'use strict';

/**
 * @ngdoc function
 * @name wpAngularApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the wpAngularApp
 */
angular.module('wpAngularApp')
  .controller('ContactCtrl', function ($scope, $rootScope, $sce, $http, Restangular) {
    
    //init vars
    $scope.show_error=false;
    $scope.show_thanks=false;
    $scope.show_form=true;
    
    //this is a special case
    //TODO: a services file
    $scope.page_contact_name='contact';
    
    Restangular.one('get_page/?slug=' + $scope.page_contact_name).get().then(
		 function(result) {
		 	if (result.status==='ok') {
			 	
			 	result.page.content=$sce.trustAsHtml(result.page.content);
				
				//result.page.url=result.page.thumbnail_images.full.url;
				
				result.page.url=result.page.attachments[0].url;
				
				$rootScope.id_page_contact=result.page.id;
				
				$scope.page=result.page;
				
				//console.log($scope.page);
				
				//console.log($scope.page.url);
				
			} else {
				//TODO: go out
				console.log('Bad API Request');
			}
		 	
		 }   
	);
    
    
    $scope.sendContact = function (contact) {
	    
	    //console.log(contact);
	    
	    //control
	    if (
		    typeof contact!=='undefined' &&  contact!=='' &&
	    	typeof contact.name!=='undefined' &&  contact.name!=='' &&
	        typeof contact.email!=='undefined' &&  contact.email!=='' &&
			//typeof contact.subject!=='undefined' &&  contact.subject!=='' &&
			typeof contact.message!=='undefined' &&  contact.message!==''
	    ) {
		    
		    console.log('Goooo');
		    $scope.show_error=false;
		    
		    var params = {
			      post_id: $rootScope.id_page_contact, //this is post contact number
			  	  name: contact.name,
			  	  email: contact.email,
			  	  message: contact.message
		    };
		    
		    
		    //respond/submit_comment/?post_id=23&name=Moncho&email=moncho@moncho.com&content=no%20puedor
		    
		    Restangular.one('respond/submit_comment/?post_id='+params.post_id+'&name='+params.name+'&email='+params.email+'&content='+params.message).get().then(
				 function(result) {
					 
				 	if (result.status==='pending') {
					 	
						console.log('Thanks');
						$scope.show_error=false;
						$scope.show_thanks=true;
						$scope.show_form=false;
						
					} else {
						//TODO: go out
						console.log('Bad API Request');
						
					}
				 	
				 }   
			);

		     
		   		    
	    } else {
		    
		    $scope.show_error=true;
		    
	    }
	    
	    
    };
    
  });
