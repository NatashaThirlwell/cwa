(function(){
	angular
		.module('cwaApp')
		.controller('AuthCtrl', AuthCtrl)

	function AuthCtrl($http, $scope, $state, $uibModal, $uibModalInstance, userSrv){
		console.log('login control');
		var authVm = this;

		// AuthCtrl.$inject = ['$http'];

		//buttons
		authVm.register_btn = 'Create Account';
		authVm.auth_btn = "Log In";

		authVm.registered = false;
		authVm.showReg	  = showReg;
		authVm.showLog 	  = showLog;
		
		//Functions
		authVm.register = register;
		authVm.authenticate = authenticate;

		function showReg(){
	  		authVm.registered = true;
	  	}

	  	function showLog(){
	  		authVm.registered = false;
	  	}

		function register(){
			if(!authVm.registered){
				return;
			}
			console.log('registering authVm.email + authVm.password + authVm.repassword')
			$uibModalInstance.close();
			//check passwords
			if(authVm.password == authVm.repassword && authVm.password != ''){
				var user = {
					first_name:authVm.first_name,
					last_name:authVm.last_name,
					email:authVm.email,
					password:authVm.password
				}
				user = JSON.stringify(user);
				$http.post('/api/auth/register',user)
				.then(function(res){
					console.log(res);
					authVm.register_btn = res.data.msg;
					// userSrv.getUser(res.data.user.id)
					// 	.then(function(){
					// 		$state.go('user');
					// 	})
					$uibModalInstance.close();
					$state.go('client',{userId:res.data.id})
				})
			}
			else{
				authVm.register_btn = "Passwords Don't Match";
			}
		}

		function authenticate(){
			if(authVm.registered){
				return;
			}
			console.log('authenticating authVm.email and authVm.password')
			var user = {
				email:authVm.email,
				password:authVm.password
			}

			user = JSON.stringify(user);
			$http.post('/api/auth/authenticate',user)
			.then(function(res){
				console.log(res);
				localStorage.loginEmail = authVm.email;
				authVm.auth_btn = res.data.msg;
				//success callback
				//success code
				if(res.status == 200){
					authVm.auth_btn = "Success";
					// userSrv.getUser(res.data.id);
				
					// toastr.success('Hello user.first_name user.last_name')
					
					$state.go('client',{userId:res.data.id})
					$uibModalInstance.close();

				}
			})
		}
	}
})();