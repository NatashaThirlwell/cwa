(function(){
  angular
    .module('cwaApp')
    .controller('AdminCtrl',AdminCtrl)

    function AdminCtrl($scope, $state, admin, userlist, seminars,userSrv){
        var adminVm = this;
        adminVm.state = $state;

        // load the specific user from api/users/:useId using the id from the route params

        adminVm.user = admin;
        adminVm.userlist = userlist;
        adminVm.seminars = seminars.seminars;

		
		console.log(adminVm.user);
        console.log(adminVm.userlist);
        console.log(adminVm.seminars)

        adminVm.goTo = goTo;

        function goTo(state){
            $state.go(state)
        }
	}


})();