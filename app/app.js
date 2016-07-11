(function(){
	'use strict';

	angular
		.module('cwaApp',['ui.router', 'angular-jwt', 'ui.bootstrap','ngMessages','toastr']);


	angular
		.module('cwaApp')
		.config(function($stateProvider,$httpProvider,$urlRouterProvider){
			
			$urlRouterProvider.otherwise('/');

			$stateProvider

		// HOME
			.state('home',{
				url:'/',
            	templateUrl: 'site/partials/home.html',
            	controller:'HomeCtrl as ctrl'
            	})

		// ABOUT
			.state('about-clinic',{
				url:'/about/clinic',
				templateUrl:'site/partials/about/about-clinic.html',
				controller:'ClinicCtrl as ctrl',
			})

			.state('about-dr',{
				url:'/about/dr-celeste-thirlwell',
				templateUrl:'site/partials/about/about-dr.html',
				controller:'DrCtrl as ctrl'
			})

			.state('about-practitioners',{
				url:'/about/practitioners',
				templateUrl:'site/partials/about/about-practitioners.html',
				controller:'PractitionersCtrl as ctrl'
			})


		// SWAP
			.state('swap-info',{
				url:'/swap',
				templateUrl:'site/partials/swap/swap-info.html',
				controller:'SwapCtrl as ctrl'
			})

			.state('sleep',{
				url:'/swap/sleep-therapy',
				controller:'SwapCtrl as ctrl',
				templateUrl:'site/partials/swap/sleep.html',
			})

			.state('harmony',{
				url:'/swap/harmony',
				controller:'SwapCtrl as ctrl',
				templateUrl:'site/partials/swap/harmony.html',
			})

			.state('laser',{
				url:'/swap/laser-therapy',
				controller:'SwapCtrl as ctrl',
				templateUrl:'site/partials/swap/laser.html',
			})

		// Seminars
			.state('all',{
				url:'/seminars',
				templateUrl:'site/partials/seminars/all.html',
				controller:'SeminarsCtrl as ctrl',	
			})
			.state('cpap',{
				url:'/seminars/cpap',
				templateUrl:'site/partials/seminars/cpap.html',
				controller:'SeminarsCtrl as ctrl',	
			})

			.state('laser-sem',{
				url:'/seminars/laser',
				templateUrl:'site/partials/seminars/laser.html',
				controller:'SeminarsCtrl as ctrl',	
			})

		// SCHEDUALISTA
			.state('book',{
				url:'/book',
				templateUrl:'site/partials/book.html',
				controller:'BookCtrl as ctrl',	
			})

		// USER PROFILES
			.state('user',{
					url:'/client/:userId',
					templateUrl:'site/partials/users/user.html',
					controller:'UserCtrl as ctrl',
			})

		// ADMIN PROFILES
			.state('admin',{
					url:'/client',
					templateUrl:'site/partials/users/user.html',
					controller:'UserCtrl as ctrl',
			})


			$httpProvider.interceptors.push(function(){
		       return {
		           request: function(config) {
		               return config;
		           },
		           response: function(response) {
		               var auth_token = response.headers('authentication');
		               if(localStorage.authToken == undefined && auth_token != null){
		               		localStorage.authToken = auth_token;
		               }
		               return response;
		           }
		       }
		   	});

			
		});

	angular.module('cwaApp')
		.run(function($rootScope) {
    		$rootScope.$on('$stateChangeSuccess', function() {
	   			document.body.scrollTop = document.documentElement.scrollTop = 0;
			});
		})

	angular
	    .module('cwaApp')
	    .config(function(toastrConfig) {
	      angular.extend(toastrConfig, {
	        positionClass: 'toast-bottom-right'
	    	});
	    });


 
})();

