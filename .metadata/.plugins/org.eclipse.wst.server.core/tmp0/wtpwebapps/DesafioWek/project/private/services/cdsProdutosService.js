/**
 * Arquivo service user em angular.
 * @author Samael Pereira Simões
 */
app.factory('CdsProdutosService', function($resource) {
	return $resource('http://169.57.156.62:3003/api/produtos/:id', null, {
		update: {
			method: 'PUT'
		},
		remove: {
			method: 'DELETE'
		}
	});
});