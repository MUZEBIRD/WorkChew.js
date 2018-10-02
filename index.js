

window.onload = function() {

  window.workchewConnector = {

    init: function() {

      var {token} = this.getQueryParams();

      console.log("Membee token", token)

      this.initFirebaseConfig()

      if (token) {


        this.exchangeToken(token).then((data) => {
          console.log(data)
        })

      }

    },

    initFirebaseConfig: () => {

      var config = {
        apiKey: "AIzaSyDrql8_CPnvotXoTT4PxINVK46_p9yXG1w",
        authDomain: "work-chew-forms.firebaseapp.com",
        databaseURL: "https://work-chew-forms.firebaseio.com",
        projectId: "work-chew-forms",
        storageBucket: "work-chew-forms.appspot.com",
        messagingSenderId: "480936302656"
      };

      firebase.initializeApp(config);

      const firestore = firebase.firestore();

      const settings = {

        timestampsInSnapshots: true
      };

      firestore.settings(settings);


      if (window.quickFormer) {
        console.log("init quick former");

        quickFormer.onSave = event => {
          console.log("onSave local page", event);

          firebase
            .firestore()
            .collection("corpForms")
            .add(event)
            .then(event => {
              console.log("form saved", event);
            });
        };

      }

    },

    storeLocalWorkchewUser: function(userInfo) {

      localStorage.setItem("LocalWorkchewUser", JSON.stringify(userInfo))

    },

    getLocalWorkchewUser: function(userInfo) {

      var local = localStorage.getItem("LocalWorkchewUser");

      var localUser = JSON.parse(local);

      return localUser

    },

    checkLogin: function(token) {

      var checkLoginUrl = "https://memberservices.membee.com/feeds/login/LoginCheck.aspx" +
        "?" +
        "clientid=501" +
        "&" +
        "appid=2086" +
        "&" +
        "destURL=https://www.workchew.com/"

      window.loaction.href = checkLoginUrl

    },

    logout: function(token) {

      var logoutUrl = "https://memberservices.membee.com/feeds/login/Logout.aspx" +
        "?" +
        "clientid=501" +
        "&" +
        "appid=2086" +
        "&" +
        "destURL=https://www.workchew.com/"

      window.loaction.href = logoutUrl

    },

    exchangeToken: function(token) {

      var exchangeTokenUrl = "https://memberservices.membee.com/feeds/Profile/ExchangeTokenForID" +
        "?" +
        "APIKEY=ba9fae31-e8c4-47ba-971c-4567bd5593eb" +
        "&" +
        "clientid=501" +
        "&" +
        "appid=2086" +
        "&" +
        `Token=${token}`

      console.log("exchangeTokenUrl", exchangeTokenUrl)

      return fetch(exchangeTokenUrl, {

        method: "GET",

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