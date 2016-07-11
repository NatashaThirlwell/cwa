(function(){
  angular
    .module('cwaApp')
    .controller('DrCtrl',DrCtrl)

  function DrCtrl($scope, $state,$location){
    var drVm = this;
    drVm.state = $state;

       //Swap
		drVm.goClinic 	= goClinic;
		drVm.goDr		= goDr;
		drVm.goPrac		= goPrac;

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