(function(){
	angular
		.module('cwaApp')
		.directive('navbar', function(){
			return{
				scope:true,
				controller:'NavbarCtrl',
				controllerAs:'ctrl',
				templateUrl:'/site/main/navbar/partial-nav.html'
			};
		});

	angular
		.module('cwaApp')
		.controller('NavbarCtrl', NavbarCtrl);
		
	function NavbarCtrl($uibModal, $scope, $state,toastr){
		var navVm = this;
	
		
		navVm.logged 	= false;
		navVm.is_admin 	= false;
		// navVm.cartCount; 
		// cartTotal();
		if(localStorage.authToken){
			navVm.logged = true;
			navVm.username = localStorage.loginEmail;
		}

		navVm.goTo		= goTo;
	//States
		navVm.goHome 	= goHome;
	//About
		navVm.goClinic 	= goClinic;
		navVm.goDr		= goDr;
		navVm.goPrac	= goPrac;
	//Swap
		navVm.goSwap	= goSwap;
		navVm.goSleep	= goSleep;
		navVm.goHarmony = goHarmony;
		navVm.goLaser	= goLaser;
	// Seminars
		navVm.goAllSem	= goAllSem;
		navVm.goCpapSem	= goCpapSem;
		navVm.goLaserSem= goLaserSem;
	
	// Book
		navVm.openBook 	= openBook;

	// Login
		navVm.openLogin = openLogin;
	// Nam
		navVm.logout    = logout;


	//watch id user or admin is logged in
		// if(localStorage.authToken){
		// 	navVm.logged = true;
		// }

		function goTo(state){
			if(state == 'client'){
				$state.go('client',{userId:localStorage.loginId})
			}else{
				$state.go(state);
			}
		}

	//Home
		function goHome(){
			$state.go('home');
			// console.log ('went home');
		}
	//About
		function goClinic(){
			$state.go('about-clinic');
			// console.log ('went clinic');
		}
		function goDr(){
			$state.go('about-dr');
			// console.log('went to dr');
		}
		function goPrac(){
			$state.go('about-practitioners');
			// console.log('went to prac');
		}
	//SWAP
		function goSwap(){
			$state.go('swap-info');
		}
		function goSleep(){
			$state.go('sleep');
		}
		function goHarmony(){
			$state.go('harmony');
		}
		function goLaser(){
			$state.go('laser');
		}
	// Seminars
		function goAllSem(){
			$state.go('all');
		}
		function goCpapSem(){
			$state.go('cpap');
		}
		function goLaserSem(){
			$state.go('laser-sem');
		}

	//Book 
		function openBook(){
	  		console.log('Book Modal');
	  		$uibModal.open({
	  			animation: true,
          		templateUrl: 'site/main/book/partial-book.html',
          		controller: 'BookCtrl as ctrl'
	  		});
	  	}

	// Login
		function openLogin(){
	  		console.log('Login Modal');
	  		$uibModal.open({
	  			animation: true,
          		templateUrl: 'site/main/login/partial-auth.html',
          		controller: 'AuthCtrl as ctrl'
	  		});
	  	}

	//Logout
		function logout(){
	    	localStorage.removeItem('authToken');
	    	localStorage.removeItem('loginEmail');
	    	localStorage.removeItem('loginId');
	    	toastr.success('Logged out succesfully.')
	    	navVm.logged = false;
	    	$state.go('home');
    	}

	}

})();

		//check for cart changes
	// 	$scope.$watch(function(){
 //        	return productSrv.cart;
 //    	}, function (newValue) {
 //          		navVm.cart = productSrv.cart;
 //          		cartTotal();
 //    	},true);

	// 	if(localStorage.authToken){
	// 		navVm.logged = true;
	// 	}

	// 	console.log($state.current.name)
	// 	if($state.current.name.search('admin') != -1)
	// 	{
	// 		navVm.is_admin=true;
	// 	}

	// 	//public methods
	// 	navVm.openLogin = openLogin;
	// 	navVm.loginForm = loginForm;

	//   	function openLogin(){
	//   		console.log('Modal');
	//   		$uibModal.open({
	//   			animation: true,
 //          		templateUrl: 'site/partials/cart.html',
 //          		controller: 'CartCtrl as ctrl'
	//   		});
	//   	}

	//   	function cartTotal(){
	//   		navVm.cartCount = 0;
	//   		// console.log(navVm.cart);
	//   		for(var i in navVm.cart){
	//   			// console.log(navVm.cart[i].quantity)
	//   			navVm.cartCount += navVm.cart[i].quantity;
	//   			// console.log(navVm.cartCount)
	//   		}
	//   	}

	// 	function loginForm(){
	// 		$location.path('/auth');
	// 	}

	// }
