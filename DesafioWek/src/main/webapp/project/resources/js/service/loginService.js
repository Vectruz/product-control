
/**
* Arquivo service Login em angular Services.
* @author Samael Pereira Simões
*/
app.factory('LoginService', function($resource) {
	return $resource('/***********/LoginServlet', null, {
		query:{
			method: 'GET'
		}
	});
});