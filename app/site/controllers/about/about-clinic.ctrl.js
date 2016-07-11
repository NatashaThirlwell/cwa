(function(){
  angular
    .module('cwaApp')
    .controller('ClinicCtrl',ClinicCtrl)

  function ClinicCtrl($scope, $state,$location, $uibModal){
    var clinicVm = this;
    clinicVm.state = $state;

        // Book Modal
        clinicVm.openBook  = openBook;

        //About States
		clinicVm.goClinic 	= goClinic;
		clinicVm.goDr		= goDr;
		clinicVm.goPrac	    = goPrac;

	//Book Modal
        function openBook(){
            console.log('Book Modal');
            $uibModal.open({
                animation: true,
                templateUrl: 'site/partials/book.html',
                controller: 'BookCtrl as ctrl'
            });
        }

	//About
		function goClinic(){
			$state.go('about-clinic');
			// console.log ('went clinic');
		}
		function goDr(){
			$state.go('about-dr');
			// console.log('went to dr');
		}
		function goPrac(){
			$state.go('about-practitioners');
			// console.log('went to prac');
		}

  }

})();