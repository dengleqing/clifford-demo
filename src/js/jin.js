// proA.directive("scopetest",function(){
// 	return {
// 		restrict: "E",
// 		replace: true,
// 		scope:{
// 			geet:"&"
// 		},
// 		template: "<div><input type='text' ng-model='flavomodel'>"+
// 					"<button ng-click='geet({name:flavomodel})'>geet</button>
// 					</div>"
// 	}
// });

proA.directive("hello",function(){
	return {
		restrict: "E",
		transclude: true,
		replace: true,
		templateUrl: "tpl/hello.html",
		controller:function($scope){
			$scope.ability = [];
			this.addnode = function(){
				$scope.ability.push("node");
			}
		},
		link:function(scope,ele,attr){
			ele.bind("click",function(){
				console.log(scope.ability);
			})
		}
	}
});

proA.directive("node",function(){
	return {
		require: "^hello",
		link:function(scope,ele,attr,parentCtrl){
			parentCtrl.addnode();
		}
	}
});