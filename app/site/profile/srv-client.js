(function(){
    
    angular
        .module('cwaApp')
        .service('userSrv', UserService);

    function UserService($http, $state) {
        var self = this;
        //In a real application this would be loaded from a server
        self.user = {};
        self.users = [];

        //function bindings
        self.getUser  = getUser;
        self.getUsers = getUsers;
        self.addUser  = addUser;
        self.updateUser = updateUser;
        self.updateUserList = updateUserList;
        self.removeUser = removeUser;
        self.deleteUser = deleteUser;

        
        function getUser(userId){
          return $http.get('api/users/'+userId)
            .then(function(res){
              self.user = res.data.user;
              return res.data.user
            })
        }

        function getUsers(){
          return $http.get('api/users',{})
          .then(function(res){
            //success callback
            console.log(res);
            self.users = res.data.users;
            return res.data.users;
          },function(res){
            //error callback
            console.log(res);
            return;
          })
        }

      function addUser(user){
        console.log('addSrv')
        api.request('/users',user,'POST')
        .then(function(res){
          console.log(res);
          if(res.status === 200){
            //product was added successfully
            self.users.push(res.data.user);
            $state.go('admin.dash');
          }
        })
      }

      function updateUser(user,userId){
        api.request('/users/'+userId,user,'PUT')
        .then(function(res){
          console.log(res);
          if(res.status === 200){
            //product was updated successfully
            self.updateUserList(user,userId);
            $state.go('admin.dash');
          }
        })
      }

      function updateUserList(user,userId){
        for(var i=0;i < self.users.length;i++){
          if(self.users[i].id == userId){
            self.users[i].name = user.name;
            self.users[i].image = user.image;
            self.users[i].description = user.description;
            self.users[i].category = user.category;
            self.users[i].price = user.price;
            self.users[i].quantity = user.quantity;
          }
        }
      }

      function deleteUser(userId){
        api.request('/users/'+userId,{},'DEL')
        .then(function(res){
          console.log(res);
          if(res.status === 200){
            //product was deleted successfully
            self.removeUser(userId);
            self.getUsers();
            $state.go('admin.dash');
          }
        })
      }


      function removeUser(userId){
        for(var i=0;i < self.users.length;i++){
          if(self.users[i].id == userId){
            delete self.users[i];
          }
        }
      }



    }
})();
