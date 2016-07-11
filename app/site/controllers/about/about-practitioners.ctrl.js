(function(){
  angular
    .module('cwaApp')
    .controller('PractitionersCtrl',PractitionersCtrl)

  function PractitionersCtrl($scope, $state,$location){
    var pracVm = this;
    pracVm.state = $state;

       //Swap
		pracVm.goClinic = goClinic;
		pracVm.goDr		= goDr;
		pracVm.goPrac	= goPrac;

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