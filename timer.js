function Timer(callback, timeInterval, options) {
    //Create time interval in properties to use later
    this.timeInterval = timeInterval;

    //Method to start timer
    this.start = () => {
        //Expected time 
        this.expected = Date.now() + this.timeInterval;

        if(options.immediate){
            callback();
        }

        this.timeout = setTimeout(this.round, this.timeInterval);
        console.log('Started!');
    }
    
    //Stop timer
    this.stop = () => {
        clearTimeout(this.timeout);
        console.log("Stopped!")
    }

    //Mathod to run callback function and adjust the interval
    this.round = () => {
        let drift = Date.now() - this.expected;
        
        //Check if drift is too big. And run error function if it so
        if(drift > this.timeInterval){
            //Check if error callback is provided
            if(options.errorCallback){
                errorCallback();
            }
        }

        callback();
        this.expected += this.timeInterval;
        //console.log(drift)
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
}

