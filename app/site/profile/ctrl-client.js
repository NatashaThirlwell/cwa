(function(){
  angular
    .module('cwaApp')
    .controller('ClientCtrl',ClientCtrl)

    function ClientCtrl($scope, $state, client, userSrv){
        var userVm = this;
        userVm.state = $state;

        // load the specidic user from api/users/:useId using the id from the route params

        userVm.user = client;


		
		console.log(userVm.user);
	}


})();