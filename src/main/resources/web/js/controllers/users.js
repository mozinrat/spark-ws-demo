'use strict';

app
.controller('users', function ($scope, userService, sessionService, alertService) {
	var userWs = userService.user(sessionService.current()); 
	
	var updateUsers = function() {
		userWs
		.query()
		.$promise
		.then(function(users) {
			$scope.users = users;
		}, userService.defaultErrorHandling);
	};
	
	updateUsers();
	
	$scope.user = {edit: false};
	
	$scope.remove = function(user) {
		userWs
			.remove(user)
			.$promise
			.then(function() {
				alertService.append("success", "User '" + user.login + "' has successfully been deleted");
				
				updateUsers();
			}, userService.defaultErrorHandling);
	};
	
	$scope.cancel = function() {
		$scope.user.edit = false;
	};
	
	$scope.edit = function(user) {
		user.edit = true;
		user.password = null;
		$scope.user = user;
	};
	
})
;