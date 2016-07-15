(function(){
  angular
    .module('cwaApp')
    .controller('HomeCtrl',HomeCtrl)

    function HomeCtrl($scope, $state, $location, $uibModal){
        var homeVm = this;
        homeVm.state = $state;

    //Modals
        // Login
        homeVm.openLogin = openLogin;
        // Book
        homeVm.openBook  = openBook;

    //Change States
        // About Page
        homeVm.goClinic  = goClinic;
        // SWAP Page
        homeVm.goSwap    = goSwap;
        homeVm.goSleep   = goSleep;
        homeVm.goHarmony = goHarmony;
        homeVm.goLaser   = goLaser;
        //Seminars
        homeVm.goAllSem  = goAllSem;


        //TODO #3 Capture resolved products for view
        // shopVm.products;
        // shopVm.categories = productSrv.categories;
        // console.log(shopVm.categories)

        // shopVm.openCart = openCart;
        // shopVm.goToCategories = goToCategories;


        // //watch for any changes to model data
        // $scope.$watch(function(){
        //     return productSrv.products;
        // }, function (newValue) {
        //     shopVm.products = productSrv.products;
        // });

        //Book 
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
        }
        //Swap
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
        //Seminars
        function goAllSem(){
            $state.go('all');
        }

        // Login
        function openLogin(){
            console.log('Login Modal');
            $uibModal.open({
                animation: true,
                templateUrl: 'site/partials/login/auth.html',
                controller: 'AuthCtrl as ctrl'
            });
        }

        function bookConsult(){
            // if (logged in === true) { then go to book consult page}
            // else if (logged-in === false){ open Login/create account modal}

            // ask how you would direct the state change after loging/sign up w/out user having to click again

        }

    }

})();
