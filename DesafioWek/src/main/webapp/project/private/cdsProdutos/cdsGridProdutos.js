app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.controller('CdsGridProdutosCrtl', ['$scope', '$http', '$log','$rootScope', '$location', 'toastr', 'CdsProdutosService', '$timeout','uiGridConstants',
	function($scope, $rootScope, $location, $http, $log, toastr, CdsProdutosService, timeout, uiGridConstants) {
	
	$scope.rows = [];
	
	$scope.gridOptions = {
			 
		rowHeight: 35,    
		maxWidth: 9000,
		selectionRowHeaderWidth: 35,
		enableRowSelection: true,
		enableSelectAll: true,
		showGridFooter:false,
		paginationPageSize: 10,
		selectedItems: $scope.mySelections,
		enablePaginationControls: false,
	    enableFiltering : false,
	    
		columnDefs: [		 
			 { 
				field: 'descricao', 
				width: 300,
				displayName: 'Descrição do Produto', 
				enableCellEdit: false
			 },
		]
	};
	
	/* --- Server --- */ // Service
	$scope.load = function() { // load all		
		CdsProdutosService.query(function( produtos ) {	

			$scope.produtos = produtos;
			$scope.gridOptions.data = produtos;	
			 		
		}, function( error ) {			 
			toastr.error( error );
		});
	};
	//-- end load 
	
	// ---- ROWS checkeds or unchecked	
	$scope.gridOptions.onRegisterApi = function ( gridApi ) {		
			
		$scope.gridApi = gridApi;
		$scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 ); // FILTER GRID
		
		gridApi.selection.on.rowSelectionChanged( $scope, function( row ) {
			
			var msg = row.isSelected; //one selected true or false
			if ( msg ) {
				$scope.rows.push( row );
			} else {				
				$scope.rows.splice( $scope.rows.indexOf ( row ));
			}
		});
	};
	// --- end rows --
	
	// --- Edit ---
	$scope.editProduct = function( produtos, i ) {
		var row = $scope.rows[0].entity;
		$scope.update( row );		
    };  
    // --- end edit
   
  	//---- row update grid
	$scope.update = function ( row ) {
    	CdsProdutosService.update(row._id, function(response) {  
    		
    		toastr.success(response.message);
			$scope.load();
    	}), function(err) {    		
    		toastr.error('Erro' + err.message);
    	}
	};
    
	$scope.aceptdelet = function () {
    	
    	var rows = $scope.gridApi.selection.getSelectedRows();
    	var daterowsid = [];
    	
        for (var i=0; i < rows.length; i++) {
        	daterowsid.push(rows[i]._id);
        }
    	$scope.deletrows( daterowsid );
    };
    
    // ---=== Delet rowsw
    $scope.deletrows = function( _id ) {
    	var t = _id;
    	CdsProdutosService.remove({id: t}, function(response) {  
    		
			toastr.success("Excluido com sucesso!");
			$scope.load();
    	}), function(err) {    		
    		toastr.error('Erro' + err.message);
    	}
    };
	
    $scope.filter = function() {
    	$scope.gridApi.grid.refresh();
	};
	
	$scope.singleFilter = function( renderableRows ) {
		var matcher = new RegExp( $scope.filterValue );
		renderableRows.forEach( function( row ) {
			var match = false;
			[ 'descricao'].forEach(function( field ) {
				if ( row.entity[field].toString().match(matcher) ) {
					match = true;
				}
			});
			if ( !match ) {
				row.visible = false;
			}
	    });		
	  return renderableRows;
	};    	
	$scope.load();
}])
