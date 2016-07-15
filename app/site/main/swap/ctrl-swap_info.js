(function(){
  angular
    .module('cwaApp')
    .controller('SwapCtrl', SwapCtrl)

    function SwapCtrl($scope, $state, $uibModal){
        var swapVm = this;
        swapVm.state = $state;

        //Book
        swapVm.openBook		= openBook;

        //Swap
		swapVm.goSwap		= goSwap;
		swapVm.goSleep		= goSleep;
		swapVm.goHarmony 	= goHarmony;
		swapVm.goLaser		= goLaser;

		function openBook(){
			console.log('Book Modal');
	  		$uibModal.open({
	  			animation: true,
          		templateUrl: 'site/partials/book.html',
          		controller: 'BookCtrl as ctrl'
	  		});
		}

		function goSwap(){
			$state.go('swap-info');
		}
		function goSleep(){
			$state.go('sleep');
		}
		function goHarmony(){
			$state.go('harmony');
		}
		function goLaser(){
			$state.go('laser');
		}

    }

})();
