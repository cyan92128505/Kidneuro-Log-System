var neurosky_data = {
	timestamp: 0,
	attention: 0,
	meditation: 0,
	delta: 0,
	theta: 0,
	lowAlpha: 0,
	highAlpha: 0,
	lowBeta: 0,
	highBeta: 0,
	lowGamma: 0,
	highGamma: 0,
	poorSignalLevel: 0
};

var get_neurosky_data = function(number){
	var neurosky_data_array = [
	neurosky_data.timestamp,
	neurosky_data.attention,
	neurosky_data.meditation,
	neurosky_data.delta,
	neurosky_data.theta,
	neurosky_data.lowAlpha,
	neurosky_data.highAlpha,
	neurosky_data.lowBeta,
	neurosky_data.highBeta,
	neurosky_data.lowGamma,
	neurosky_data.highGamma,
	neurosky_data.poorSignalLevel,
	];
	console.log(neurosky_data_array);
	console.log(neurosky_data_array[number]);
	if(number > -1){
		return neurosky_data_array[number];
	}else{
		return Math.floor(Math.random()*100)+1;
	}
	
};
var main = angular.module('kidneuro', []);
main.controller('kidneuro_controller',function($scope,$http){
	$http.get('/getData').success(function(data){
		$scope.nsdata = data;
		neurosky_data = data;
		anime_chart(1);
		anime_chart(2);
	});
	setInterval(function(){
		$scope.$apply( function() {
			$http.get('/getdata').success(function(data){
				$scope.nsdata = data;
				neurosky_data = data;
				//anime_chart();
				//console.log(data);
			});
		});
  	}, 1000);
});

var kid_name = angular.module('kid_name',[]);
kid_name.controller('kid_name_controller',function($scope){
});