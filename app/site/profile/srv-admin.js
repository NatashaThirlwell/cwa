(function(){
    
    angular
        .module('cwaApp')
        .service('adminSrv', AdminService);

    function AdminService($http, $state) {
        var self = this;

        //function bindings
        self.getSeminars = getSeminars;


        function getSeminars(){
          return $http.get('/api/seminars/full')
            .then(function(res){
                return res.data;
            })
        }
        
    }
})();
