window.onload = function() {

  window.workchewConnector = {

    init: function() {

      var {token} = this.getQueryParams();

      if (!token) {

        var localUser = this.getLocalWorkchewUser()

        if (localUser && localUser.token) {

          token = localUser.token

        }

        console.log("found local token")
      }

      if (token) {
        this.loginWithToken(token)

          .then((loginResponse) => {

            console.log("login response", loginResponse)
            var {user} = loginResponse

            if (user && user.token) {

              this.storeLocalWorkchewUser(user)

              this.showDiscountElement()

            } else {

              this.hideDiscountElement()

            }

          })
      } else {

        this.hideDiscountElement()

      }

    },

    goToLocationProfilePage: function(fileName) {

      var user = this.getLocalWorkchewUser();

      window.location.href = "http://www.workchew.com" + fileName + "?token=" + user.token
    },

    storeLocalWorkchewUser: function(userInfo) {

      localStorage.setItem("LocalWorkchewUser", JSON.stringify(userInfo))

    },

    getLocalWorkchewUser: function(userInfo) {

      var local = localStorage.getItem("LocalWorkchewUser");

      var localUser = JSON.parse(local);

      return localUser

    },

    showDiscountElement: function(userInfo) {

      var memberperks = document.getElementById('memberperks')
      if (memberperks) {

        memberperks.style.display = "block"
      }
    },

    hideDiscountElement: function(userInfo) {

      var memberperks = document.getElementById('memberperks')

      if (memberperks) {
        memberperks.style.display = "none"

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

      } else {

        return {};

      }

    }

  }

  var workchewConnector = window.workchewConnector


  workchewConnector.init()


}