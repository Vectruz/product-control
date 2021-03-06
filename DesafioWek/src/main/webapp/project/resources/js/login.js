/**
* Arquivo controller Login em angular.
* @author Samael Pereira Simões
*/

app.controller('LoginController', [ '$scope', '$rootScope', '$location', 'toastr', 'LoginService',
								  function( $scope,  $rootScope,  $location, toastr, LoginService ) {
	
	$rootScope.activetab = $location.path();
	
	$scope.auth = function( user ) {		
		if ( user == undefined) {
			toastr.warning("Login ou senha invalido");
			window.setTimeout(function() {
		    	$('#modal').modal('close');
		    }, 2000);
		}else if (user != undefined ) {
			
			//LoginService.query(user, function(success){	 QUANDO TIVER REQUISIÇÃO PARA LOGIN 
				
				toastr.success("entrando");										
				//$cookies.putObject('return', {'Status': success.Status, 'oidUser': success.oidUser, 'user': success.user});
				
			    window.setTimeout(function() {
			    	$('#search').addClass('custom-search');
			    	$('#modal').modal('close');
			    }, 2000);		   			
				
				window.setTimeout(function() {	
				    clearInterval(window.setInterval(function() {	}, 50));
						$(location).attr('href', '/DesafioWek/project/private/home.html#!/cdsGridProdutos');
				}, 2000);
				
			/*}, function(err){
				toastr.warning(err.data.msg);
				
			})*/
		}
	}	
}]);

