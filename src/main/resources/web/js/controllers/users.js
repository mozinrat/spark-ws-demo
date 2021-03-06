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
			$scope.user.edit = false;
		}, userService.defaultErrorHandling);
	};
	
	$scope.user = {edit: false};
	
	updateUsers();
	
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
	
	$scope.add = function() {
		$scope.user = {edit: true, create: true};
		$scope.submitLabel = 'Create user';
	};
	
	$scope.edit = function(user) {
		user.edit = true;
		user.originalLogin = user.login;
		$scope.user = user;
		$scope.submitLabel = 'Update user';
	};
	
	$scope.save = function(user) {
		if(user.create) {
			userWs
				.add({'login': null}, user)
				.$promise
				.then(function() {
					alertService.append("success", "User '" + user.login + "' has successfully been created");
					
					updateUsers();
				}, userService.defaultErrorHandling);
		} else {
			userWs
				.update({'login': user.originalLogin}, user)
				.$promise
				.then(function() {
					alertService.append("success", "User '" + user.login + "' has successfully been updated");
					
					updateUsers();
				}, userService.defaultErrorHandling);
		}
	};
	
})
;