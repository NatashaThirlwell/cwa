(function(){
  angular
    .module('cwaApp')
    .controller('BookCtrl', BookCtrl)

    function BookCtrl($scope, $state, $uibModalInstance){
        var bookVm = this;
        bookVm.state = $state;

        //Book
        bookVm.openBook		= openBook;
        bookVm.closeBook	=closeBook;

        //Swap
		bookVm.goSwap		= goSwap;
		bookVm.goSleep		= goSleep;
		bookVm.goHarmony 	= goHarmony;
		bookVm.goLaser		= goLaser;

	// Modal
		function openBook(){
			$state.go('book');
		}
		function closeBook(){
			console.log('close clicked')
			$uibModalInstance.close();
		}

	// Change States
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