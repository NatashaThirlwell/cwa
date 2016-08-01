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
            	templateUrl: 'site/main/home/partial-home.html',
            	controller:'HomeCtrl as ctrl'
            	})

		// ABOUT
			.state('about-clinic',{
				url:'/about/clinic',
				templateUrl:'site/main/about/clinic/partial-clinic.html',
				controller:'ClinicCtrl as ctrl',
			})

			.state('about-dr',{
				url:'/about/dr-celeste-thirlwell',
				templateUrl:'site/main/about/dr/partial-dr.html',
				controller:'DrCtrl as ctrl'
			})

			.state('about-practitioners',{
				url:'/about/practitioners',
				templateUrl:'site/main/about/practitioners/partial-prac.html',
				controller:'PractitionersCtrl as ctrl'
			})


		// SWAP
			.state('swap-info',{
				url:'/swap',
				templateUrl:'site/main/swap/partial-swap_info.html',
				controller:'SwapCtrl as ctrl'
			})

			.state('sleep',{
				url:'/swap/sleep-therapy',
				controller:'SwapCtrl as ctrl',
				templateUrl:'site/main/swap/partial-sleep.html',
			})

			.state('harmony',{
				url:'/swap/harmony',
				controller:'SwapCtrl as ctrl',
				templateUrl:'site/main/swap/partial-harmony.html',
			})

			.state('laser',{
				url:'/swap/laser-therapy',
				controller:'SwapCtrl as ctrl',
				templateUrl:'site/main/swap/partial-laser.html',
			})

		// Seminars
			.state('all',{
				url:'/seminars',
				templateUrl:'site/main/seminars/partial-all.html',
				controller:'SeminarsCtrl as ctrl',	
			})
			.state('cpap',{
				url:'/seminars/cpap',
				templateUrl:'site/main/seminars/partial-cpap.html',
				controller:'SeminarsCtrl as ctrl',	
			})

			.state('laser-sem',{
				url:'/seminars/laser',
				templateUrl:'site/main/seminars/partial-laser.html',
				controller:'SeminarsCtrl as ctrl',	
			})

		// SCHEDUALISTA
			.state('book',{
				url:'/book',
				templateUrl:'site/main/book/partial-book.html',
				controller:'BookCtrl as ctrl',	
			})

		// USER PROFILES
			.state('client',{
					url:'/client/:userId',
					templateUrl:'site/profile/partial-client.html',
					controller:'ClientCtrl as ctrl',
					resolve:{
						client:function(userSrv,$stateParams,$state){
							console.log($stateParams)
							return userSrv.getUser($stateParams.userId)
								.then(function(res){
									console.log('client',res)
									return res
								},function(err){
									console.log('err');
									$state.go('home');
								})
						}
					}
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

