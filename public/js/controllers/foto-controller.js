angular.module('alurapic').controller('FotoController',function($scope,$routeParams,recursoFoto,cadastroDeFotos){

	$scope.foto ={};
	$scope.mensagem = '';


	if($routeParams.fotoId){

		recursoFoto.get({fotoId : $routeParams.fotoId}, function(foto){
			$scope.foto = foto;

		},function(erro){
			console.log(erro);
			$scope.mensagem = "Não foi possível obter a foto de ID: "+$routeParams.fotoId;
		});

		/*
		$http.get('v1/fotos/'+$routeParams.fotoId)
		.success(function(foto){
			$scope.foto = foto;
		})
		.error(function(erro){
			console.log(erro);
			$scope.mensagem = "Não foi possível obter a foto de ID: "+$routeParams.fotoId;
		});
		*/
	}

	$scope.submeter = function(){
		if($scope.formulario.$valid){

			cadastroDeFotos.cadastrar($scope.foto)
			.then(function(dados){
				$scope.mensagem = dados.mensagem;
				if (dados.inclusao) {
					$scope.foto ={};
					$scope.formulario.$setPristine();
				}
			})
			.cath(function(dados){
				$scope.mensagem = dados.mensagem;
			});

			/*if($routeParams.fotoId){
				
				//com $recurso, utilizando um servico criado "recursoFoto"
				recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function(){
					$scope.mensagem = 'Foto '+$scope.foto.titulo+' alterada com sucesso.';
				}, function(erro){
					log.console(erro);
					$scope.mensagem = 'Erro ao tentar alterar a foto!';
				});

				//com $http
				$http.put('v1/fotos/'+$scope.foto._id, $scope.foto)
				.success(function(){
					$scope.mensagem = 'Foto '+$scope.foto.titulo+' alterada com suceso!';
					//$location.url('/fotos/new');
				})
				.error(function(erro){
					$scope.mensagem = 'Erro ao tentar alterar a foto';
				});
			}else{

				recursoFoto.save($scope.foto, function(){
					$scope.foto ={};
					$scope.formulario.$setPristine();
					$scope.mensagem = 'Foto incluida com sucesso.';
				}, function(erro){
					console.log(erro);
					$scope.mensagem = 'Erro ao tentar incluir a foto!';
				});

				/*
				$http.post('v1/fotos', $scope.foto)
				.success(function(){
					$scope.foto ={};
					$scope.formulario.$setPristine();
					$scope.mensagem = 'Foto incluida com suceso';
				})
				.error(function(erro){
					$scope.mensagem = 'Erro ao tentar incluir a foto';
				});
			}*/

		}
	};
});