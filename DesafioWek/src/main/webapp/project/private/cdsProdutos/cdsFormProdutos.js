app.controller('CdsFormProdutos', [ '$scope', '$rootScope', '$location', 'toastr', 'CdsProdutosService',
					      function( $scope,  $rootScope,  $location, toastr, CdsProdutosService ){
	
	$rootScope.activetab = $location.path();
	$scope.selected = [];
	  	
	$scope.save = function(us) {
		if ( us == undefined || us== "" ){
			
			toastr.warning("Gentileza preencher os campos obrigatório");	
		}else if( us != undefined || us != "" ) {
			console.log(us);
			CdsProdutosService.save(us, function(response) {				
				toastr.success("Cadastrado com sucesso!");
				$scope.load();
				$scope.product = null;
			}, function(err){			
				toastr.error( 'Erro ' + err.data);
			})
		}
	}
}]);