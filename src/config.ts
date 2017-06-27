const config = {
  API_KEY: '',
  API_URL: function() {
    return (this.API_KEY !== '') ? 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=' + this.API_KEY : 'https://www.googleapis.com/qpxExpress/v1/trips/search'
	}
  };

export {config}


