var memo = {};
function valid(n,k,input){
	for(var i=0;i<input.length;i++){
		k -= input[i];
	}
	return k == 0 && n == input.length;
}
function checkAnswer(){
	var n = document.getElementById("n").value;
	var k = document.getElementById("k").value;
	var input = document.getElementById("raw_input").value.trim().split(/\D+/).slice(0,n);
	document.getElementById("result").innerHTML = getResult(n,k,input);
	return false;
}
function getAnswer(n,k){
	if(n == 0){
		return [];
	}
	if(typeof memo[[n,k]] != "undefined"){
		return memo[[n,k]];
	}
	var recursiveAnswer = getAnswer(n-1,k);
	var answer = [k];
	for(var i=1;i<n;i++){
		answer.push(0);
	}
	var votes = 1;
	for(var buy=0;votes<=n/2;buy++){
		for(var i=1;i<n;i++){
			if(recursiveAnswer[i-1] == buy - 1){
				answer[i] = buy;
				answer[0] -= buy;
				votes++;
				if(votes > n/2){
					break;
				}
			}
		}
	}
	memo[[n,k]] = answer;
	return answer;
}
function getResult(n,k,input){
	if(valid(n,k,input)){
		var recursiveAnswer = getAnswer(n-1,k);
		var answer = getAnswer(n,k)[0];
		if(answer < 0){
			return "impossible to survive with n = " + n + " and k = " + k;
		}
		else{
			var votes = 1;
			var maximum = false;
			for(var i=0;i<recursiveAnswer.length;i++){
				if(input[i+1] > recursiveAnswer[i]){
					votes++;
				}
			}
			if(votes > n/2){
				if(input[0] == answer){
					return "correct!";
				}
				else{
					return "you survive, but you could have gotten more gold";
				}
			}
			else{
				return "you get executed";
			}
		}
	}
	else{
		return "invalid input";
	}
}
