gameApp.controller('GameController', function ($scope) {

	const img_unknown = "img/back.png";
	const img_found = "img/white.png";
	const img_urls = ["img/circle.png", "img/cool.png", "img/heart.png", "img/hexagon.png", "img/octagn.png", "img/square.png", "img/star.png", "img/triangle.png"];

	var gameState = [];
	var founds = [];
	var revealed = [];
	$scope.win = false;

	$scope.startGame = function () {
		founds = [];
		revealed = [];
		$scope.win = false;

		var nums = [];
		for (var i = 0; i < 8; ++i) {
			nums.push(i);
			nums.push(i);
		}
		shuffle(nums);

		for (var i = 0; i < 16; ++i) {
			gameState[i] = { id: nums[i], found: false, reveal: false };
		}

		updateModel();
	};

	function unreveal(){

		for(var i = 0; i < revealed.length; ++i)
		{
			gameState[revealed[i]].reveal = false;
		}
		revealed = [];
	}

	function newReveal(id){
		gameState[id].reveal = true;
		revealed.push(id);
	}

	function newFound(id)
	{
		founds.push(gameState[id].id);
		gameState[id].found = true;
		gameState[revealed[0]].found = true;
		unreveal();
	}

	$scope.click = function (row, col) {

		if (col == 0 || col == 5) return;

		var cur = toId(row, col - 1);

		if (gameState[cur].found) return;

		for (var i = 0; i < revealed.length; ++i) {
			if (cur == revealed[i]) return;
		}

		if (revealed.length == 0) {
			newReveal(cur);
		} else if (revealed.length == 1) {

			if (gameState[cur].id == gameState[revealed[0]].id) {
				newFound(cur);
			}
			else {
				newReveal(cur);
			}

		} else if (revealed.length == 2) {
			unreveal();
			newReveal(cur);
		}

		updateModel();
		if(founds.length == 8) $scope.win = true;
	}

	function updateModel() {
		
		var rows = [];
		for (var i = 0; i < 4; ++i) {
			var cols = [];
			for (var j = 0; j < 4; ++j) {
				var cur = toId(i, j);
				if (gameState[cur].found) {
					cols[j + 1] = { url: img_found };
				} else if (gameState[cur].reveal) {
					cols[j + 1] = { url: img_urls[gameState[cur].id] };
				} else {
					cols[j + 1] = { url: img_unknown };
				}

			}
			rows[i] = cols;
		}

		for (var i = 0; i < 8; ++i) {
			var x, y, img_url;
			if (i < 4) {
				x = i;
				y = 0;
			}
			else {
				x = i - 4;
				y = 5;
			}

			if (i < founds.length) {
				img_url = img_urls[founds[i]];
			}
			else {
				img_url = img_found;
			}

			rows[x][y] = { url: img_url };
		}

		$scope.rows = rows;
	}
	function init() {
		for (var i = 0; i < 8; ++i) {
			founds[i] = i;
		}

		for (var i = 0; i < 16; ++i) {
			gameState[i] = { id: 0, found: true, reveal: false };
		}
		revealed = [];
	}

	init();
	updateModel();
});