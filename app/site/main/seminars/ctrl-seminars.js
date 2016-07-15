(function(){
  angular
    .module('cwaApp')
    .controller('SeminarsCtrl', SeminarsCtrl)

  function SeminarsCtrl($scope, $state, $uibModal){
    var semVm = this;
    semVm.state = $state;

    //Book Modal
    semVm.openBook 	 = openBook;

    // Change States
 	semVm.goAllSem 	 = goAllSem;
 	semVm.goCpapSem	 = goCpapSem;
	semVm.goLaserSem = goLaserSem;

	function openBook(){
		console.log('Book Modal');
  		$uibModal.open({
  			animation: true,
      		templateUrl: 'site/partials/book.html',
      		controller: 'BookCtrl as ctrl'
  		});
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