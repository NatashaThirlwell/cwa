(function(){
    
    angular
        .module('cwaApp')
        .service('adminSrv', AdminService);

    function AdminService($http, $state) {
        var self = this;
        //In a real application this would be loaded from a server
        self.user = {};
        self.users = [];

        //function bindings
        self.getUser  = getUser;
        self.getUsers = getUsers;
        self.addUser  = addUser;
        self.updateUser = updateUser;
        self.updateUserList = updateUserList;
        self.removeUser = removeUser;
        self.deleteUser = deleteUser;
        
    }
})();
