(function(){
  angular
    .module("cwaApp")
    .directive("connected", function(){
      return{
        scope:true,
        controller: "ConnectedCtrl",
        controllerAs: "ctrl",
        templateUrl: "/site/partials/connected.html"

      };
  });

  angular
    .module("cwaApp")
    .controller("ConnectedCtrl", ConnectedCtrl);


  function ConnectedCtrl($scope, $state,$location){
    var connectVm = this;
    connectVm.is_admin = false;
    // console.log($state.current.name)
    // console.log($location)
    if($state.current.name.search('admin') != -1){
      connectVm.is_admin=true;
    }

    $scope.$watch($state.current.name,function(){
      // console.log($state.current.name)
      if($state.current.name.search('admin') != -1){
        connectVm.is_admin=true;
      }
    })
    // console.log(connectVm.is_admin)
  }
})();