// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});

//.controller('HomeTabCtrl', function($scope) {
//  console.log('HomeTabCtrl');
//});

Parse.initialize("VeOAN2nRQDXf2CJ1aypkAeVGIhHbSuI05b1Hwlgd", "BhlQJ6JTZ9mV0kBhViVOKeFPddNKubrz5camfsS8");
Parse.User.enableRevocableSession()

example.controller("ExampleController", function($scope) {

var Post = Parse.Object.extend("Post");

function checkLogin() {
  if (Parse.User.current()){
    console.log("Logged in! "+Parse.User.current().get("username"));
    $("#current-user").html("User: "+Parse.User.current().get("username"));
  } else {
      $("#current-user").html("");
  }
}

checkLogin();

$("#logout").click(function(event) {
  Parse.User.logOut();
  console.log("You are now logged out!");
  checkLogin();
});

$("#login").submit(function(event){
  event.preventDefault();
  // this prevents people from refreshing the browser
  var name = $("#login-name").val();
  var pass = $("#login-password").val();
  //so next we have to send parse the uname and pass
  Parse.User.logIn(name, pass, {
    success: function(user){
      //success passes the user object back with a message
      console.log("You are now logged in!");
      checkLogin();
    }, error: function(user, error){
      console.log("Log in failed!"+error.message);
    }
  });
});

$("#signup").submit(function(event){
  event.preventDefault();

    var name = $("#signup-name").val();
    var pass = $("#signup-password").val();

    var user = new Parse.User();
    user.set("username", name);
    user.set("password", pass);

    user.signUp(null, {
      success: function(user){
        checkLogin();
      }, error: function(user, error){
        console.log("signup error:"+error.message);
      }
    });
  });

function getPosts() {
  var query = new Parse.Query(Post);
  query.find({
    success: function(results){
      var output ="";
      for (var i in results){
          var title = results[i].get("title");
          var content = results[i].get("content");
          output += "<li>";
          output += "<h3>"+title+"</h3>";
          output += "<p>"+content+"</p>";
          output += "</li>";
          //console.log("Title:"+title)
      }
      $("#list-posts").html(output);
    }, error: function(error){
      console.log("Query Error:"+error.message);
    }
  });
}

getPosts();

$("#post-form").submit(function(event){
  event.preventDefault();
    var title = $("#post-title").val();
    var content = $("#post-content").val();

    var newPost = new Post();
    newPost.set("title", title);
    newPost.set("content", content);

    newPost.save({
      success: function(){

      }, error: function(error){
          console.log("Error:" +error.message);
      }
    });
  });
});
