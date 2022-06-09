class ApiPhotographer {

    /**
     * @param {string} url
     */
  
     constructor(url) {
        this._url = url
     }
  
    async get() {
        return fetch(this._url)

        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        })
        .then(function(data) {
            return data['photographers']
        })
        .catch(function(err){
            console.log('an error occurs', err);
        })
    }
  }

  class ApiMedia {

    /**
     * @param {string} url
     */
  
     constructor(url) {
        this._url = url
     }
  
    async get() {
        return fetch(this._url)

        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        })
        .then(function(data) {
            return data['medias']
        })
        .catch(function(err){
            console.log('an error occurs', err);
        })
    }
  }

