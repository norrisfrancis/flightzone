const config = {
  API_KEY: 'AIzaSyBqTZ2HyMgcydjoyKMFxietijA8LizY11c',
  API_URL: function() {
    return (this.API_KEY !== '') ? 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=' + this.API_KEY : 'https://www.googleapis.com/qpxExpress/v1/trips/search'
	}
  };

export {config}


