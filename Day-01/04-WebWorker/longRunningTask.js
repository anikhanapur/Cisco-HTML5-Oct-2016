function doWork(){
	for(var i=0; i < 10000; i++)
		for(var j=0; j < 10000; j++)
			for(var k=0; k < 100; k++){

			}
	
}

self.addEventListener("message", function(evt){
	if (evt.data === 'start') {
		console.log('Initiating doWork()');
		doWork();
		console.log('Completing doWork()');	
	
		self.postMessage('done');
	} else {
		console.log('Unknown message received');
	}
})

console.log('longRunningTask is loaded successfully');