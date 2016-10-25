function isPrime(n){
	if (n <= 3) return true;
	for(var i=2; i <= (n/2); i++)
		if (n % i === 0) return false;
	return true;
}

function findPrimeCount(start, end){
	var result = 0;

	for(var i=start; i <= end; i++){
		if (isPrime(i)) ++result;
		var onePercent = (end - start) / 100;
		if (((i-start) % onePercent) === 0){
			var percentCompleted = ((i - start) / (end - start)) * 100;
			self.postMessage({type : 'progress', percentCompleted : percentCompleted});
		} 
	}
	return result;
}

self.addEventListener('message', function(evt){
	var data = evt.data,
		start = parseInt(data.from, 10),
		end = parseInt(data.to, 10);

	var primeCount = findPrimeCount(start, end);
	self.postMessage({ type : 'done', result : primeCount});

})