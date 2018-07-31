
window.onload = function() {

  window.workchewConnector = {

    init: function() {

      var {token} = this.getQueryParams();

      if (token) {
        this.loginWithToken(token)

          .then((loginResponse) => {

            console.log("login response", loginResponse)


          })
      }

    },

    loginWithToken: function(token) {

      return fetch("https://app.workchew.com/orderslogin", {

        method: "POST",
        headers: {
          "content-type": "application/json",

        },
        body: JSON.stringify({
          token
        })
      })
        .then((res) => res.json())

    },
    getQueryParams: function() {

      var url = window.location.href;
      console.log('url', url)

      var queryString = url.substring(url.indexOf('?') + 1)

      if (url.indexOf('?') > -1) {

        var splits = queryString.split('&')

        var queryParams = splits

          .map(split => split.split('='))

          .map(([name, value]) => {

            return {

              [name]: value
            }

          })

          .reduce((params, splitItem) => {

            return {
              ...params,
              ...splitItem
            }

          }, {})

        console.log('queryParams', queryParams)

        return queryParams

      }

    }

  }

  var workchewConnector = window.workchewConnector


  workchewConnector.init()


}