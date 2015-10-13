app.service('auth', ['$http', function ($http) {
	this.login = function(user){
		return $http.post('https://app-staging.mycontacts.io/api/v2/login', { username: user.username, password: user.password})
		.success(function(data){
			return data;
		})
		.error(function(err){
			return err;
		});
	};
}]);