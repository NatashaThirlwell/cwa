(function(){
  angular
    .module("cwaApp")
    .directive("footer", function(){
      return{
        scope:true,
        controller: "footerCtrl",
        controllerAs: "ctrl",
        templateUrl: "/site/partials/footer.html"

      };
  });

  angular
    .module("cwaApp")
    .controller("footerCtrl", footerCtrl);


  function footerCtrl($scope, $state, $uibModal){
    var footerVm = this;

    // Change State
    footerVm.goClinic = goClinic;
    footerVm.goSwap = goSwap;
    footerVm.goCpap = goCpap;

    footerVm.openBook = openBook;

    function goClinic(){
      $state.go('about-clinic');
    }
    function goSwap(){
      $state.go('swap-info');
    }
    function goCpap(){
      $state.go('all');
    }

    function openBook(){
        console.log('Book Modal');
        $uibModal.open({
          animation: true,
              templateUrl: 'site/partials/book.html',
              controller: 'BookCtrl as ctrl'
        });
      }




    footerVm.is_admin = false;
    // console.log($state.current.name)
    // console.log($location)
    if($state.current.name.search('admin') != -1){
      footerVm.is_admin=true;
    }

    $scope.$watch($state.current.name,function(){
      // console.log($state.current.name)
      if($state.current.name.search('admin') != -1){
        footerVm.is_admin=true;
      }
    })
    // console.log(this.is_admin)
  }
})();
