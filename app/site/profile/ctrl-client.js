(function(){
  angular
    .module('cwaApp')
    .controller('ClientCtrl',ClientCtrl)

    function ClientCtrl($scope, $state, userSrv){
        var userVm = this;
        userVm.state = $state;

        // load the specidic user from api/users/:useId using the id from the route params

        userVm.user = userSrv.user;


		
		console.log(userVm.user);
	}


})();