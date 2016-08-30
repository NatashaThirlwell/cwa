(function(){
  angular
    .module('cwaApp')
    .controller('ClientCtrl',ClientCtrl)

    function ClientCtrl($scope, $state, $stateParams,$http, client, userSrv,seminars,seminarSrv){
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
        userVm.uploadFile = uploadFile;
        userVm.updateUser = updateUser;

        function goTo(state,params){
            if(params){
                $state.go(state,{id:params})
            }
            else {
                $state.go(state)
            }
        }

        function uploadFile(){
            console.log('uploading')
            var file = userVm.file;
            var formData = new FormData();
            formData.append('file', file);

            $http.post('/api/users/upload/'+userVm.user._id,formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .then(function(){
                //update page with uploaded photo here
                console.log('successfully uploaded file!');
            })
            .catch(function(err){
                console.log(err);
            });
        };

        function updateUser(){
            var __user = userVm.user;
            userSrv.editUser(__user, userVm.user._id);
        }
	}


})();