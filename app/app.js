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
					//this resolve adds the user
					client:function(userSrv,$stateParams,$state,$q){
						console.log($stateParams)
						if($stateParams.userId == ""){
							if(localStorage.loginId){
								console.log('going to client')
								$state.go('client.home',{userId:localStorage.loginId})
							}
							else{
								console.log('going home')
								$state.go('home');
							}
						}
						else{
							return userSrv.getUser($stateParams.userId)
								.then(function(res){
									console.log('client',res)
									if(res.client_type == 'admin'){
										setTimeout(function(){
											$state.go('admin',{userId:res._id})
										},0)
										return $q.reject();
									}
									return res
								},function(err){
									console.log('err');
									$state.go('home');
								})
						}
					},
					seminars:function(seminarSrv){
						return seminarSrv.getSeminars()
					}
				}
			})
			.state('client.home',{
				url:'/home',
				templateUrl:'site/profile/partial-client-home.html'
			})
			.state('client.articles',{
				url:'/articles',
				templateUrl:'site/profile/partial-client-articles.html'
			})
			.state('client.register',{
				url:'/register/:seminarId',
				templateUrl:'site/profile/partial-client-register.html'
			})
			.state('client.edit',{
				url:'/edit',
				templateUrl:'site/profile/partial-client-edit.html'
			})

		// ADMIN PROFILES
			.state('admin',{
					url:'/admin/:userId',
					templateUrl:'site/profile/partial-admin.html',
					controller:'AdminCtrl as ctrl',
					resolve:{
						admin:function(userSrv,$stateParams,$state){
							console.log($stateParams)
							// if($stateParams.userId == ""){
							// 	if(localStorage.loginId){
							// 		$state.go('client',{userId:localStorage.loginId})
							// 	}
							// 	else{
							// 		$state.go('home');
							// 	}
							// }
							// else{
								return userSrv.getUser($stateParams.userId)
									.then(function(res){
										console.log('client',res)
										if(res.client_type != 'admin'){
											$state.go('client',{userId:res._id})
										}
										return res;
									},function(err){
										console.log('err');
										$state.go('home');
									})
							// }
						},
						userlist:function(userSrv){
							return userSrv.getUsers()
						},
						seminars:function(seminarSrv){
							return seminarSrv.getAdminSeminars()
						}
					}
			})
			.state('admin.users',{
				url:'/users',
				templateUrl:'site/profile/partial-admin-users.html',
				// controller:'AdminCtrl as ctrl',
			})
			.state('admin.seminars',{
				url:'/seminars',
				templateUrl:'site/profile/partial-admin-seminars.html',
				// controller:'AdminCtrl as ctrl'
			})
			.state('admin.editUser',{
				user:'/editUser/:id',
				templateUrl:'site/profile/partial-admin-editUser.html',
			})
			.state('admin.addSeminar',{
				user:'/addSeminar',
				templateUrl:'site/profile/partial-admin-addSeminar.html',
			})
			.state('admin.editSeminar',{
				user:'/editSeminar/:id',
				templateUrl:'site/profile/partial-admin-editSeminar.html',
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

