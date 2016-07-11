(function(){
  angular
    .module('cwaApp')
    .controller('UserCtrl',UserCtrl)

    function UserCtrl($scope, $state, userSrv){
        var userVm = this;
        userVm.state = $state;

        // load the specidic user from api/users/:useId using the id from the route params

        userVm.user = userSrv.user;


		
		console.log(userVm.user);
	}


})();