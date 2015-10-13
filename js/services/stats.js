app.service('stats', ['$http', function ($http) {
	this.getData = function(authToken){
		return $http.get('https://app-staging.mycontacts.io/api/v2/contacts/stats/interactions', {headers: { 'authToken': authToken}})
		.success(function(data){
			console.log("Primljeno: " + data);
			return data;
		})
		.error(function(err){
			return err;
		});	
	}	
}]);