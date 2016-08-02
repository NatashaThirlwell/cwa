(function(){
    angular
        .module('cwaApp')
        .controller('SeminarsCtrl', SeminarsCtrl)

    function SeminarsCtrl($scope, $state, $uibModal, seminarSrv){
        var semVm = this;
        
        semVm.seminars      = seminarSrv.getSeminars();

        //Book Modal
        semVm.openBook 	    = openBook;

        // Change States
        semVm.goTo          = goTo;
        semVm.goAllSem 	    = goAllSem;
        semVm.goCpapSem	    = goCpapSem;
        semVm.goLaserSem    = goLaserSem;

        function openBook(){
            console.log('Book Modal');
            $uibModal.open({
                animation: true,
                templateUrl: 'site/partials/book.html',
                controller: 'BookCtrl as ctrl'
            });
        }

        function goTo(state){
            $state.go(state);
        }

        function goAllSem(){
            $state.go('all');
        }

        function goCpapSem(){
            $state.go('cpap');
        }

        function goLaserSem(){
            $state.go('laser-sem');
        }

    }

})();