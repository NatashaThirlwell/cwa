(function(){
    angular
        .module('cwaApp')
        .service('seminarSrv', SeminarService);

    function SeminarService($http, $state) {
        var self = this;

        self.seminars = [];

        self.getSeminars    = getSeminars;
        self.getSeminar     = getSeminar;
        self.addSeminar     = addSeminar;
        self.updateSeminar  = updateSeminar;
        self.register       = register;
        self.getAdminSeminars = getAdminSeminars;


        function getSeminars(){
        	return $http.get('api/seminars')
        		.then(function(res){
        			console.log('all seminars',res.data)
        			self.seminars = res.data;
        			return res.data
        		})
        		.catch(function(err){
        			console.log(err)
        		})
        }

        function getSeminar(id){
            return $http.get('api/seminars/'+id)
                .then(function(res){
                    console.log('getting one seminar',res);
                    return res.data;
                })
                .catch(function(err){
                    console.log(err);
                })
        }

        function addSeminar(seminar){
            console.log('creating new seminar',seminar);
            return $http.post('api/seminars',seminar)
                .then(function(res){
                    console.log('response from seminar creation',res);
                    return res.data
                })
                .catch(function(err){
                    console.log(err);
                })
        }

        function register(){
            //send user info, seminar id, promo codes, and payment info
            // need to find out how stripe handles payment
        }

        function updateSeminar(seminar){
            console.log('updating seminar',seminar);
            return $http.put('api/seminars/'+seminar._id)
                .then(function(res){
                    console.log('response from seminar update',res)
                    return res.data
                })
                .catch(function(err){
                    console.log(err);
                })
        }

        function getAdminSeminars(){
            return $http.get('api/seminars/full')
                .then(function(res){
                    console.log('all seminars',res.data)
                    self.seminars = res.data;
                    return res.data
                })
                .catch(function(err){
                    console.log(err)
                })
        }

    }
})();