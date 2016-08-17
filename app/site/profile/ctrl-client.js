(function(){
  angular
    .module('cwaApp')
    .controller('ClientCtrl',ClientCtrl)

    function ClientCtrl($scope, $state, client, userSrv,seminars,seminarSrv){
        var userVm = this;
        if($state == 'client'){
            $state.go('client.home')
        }


        userVm.user = client;
		console.log(userVm.user);
        userVm.seminars = seminars;

        if($stateParams.seminarId){
            seminarSrv.getSeminar($stateParams.seminarId)
                .then(function(res){
                    console.log(res)
                    userVm.seminar = res;
                })   
        }

        //function bindings
        userVm.goTo = goTo;

        function goTo(state,params){
            if(params){
                $state.go(state,{id:params})
            }
            else {
                $state.go(state)
            }
        }
	}


})();