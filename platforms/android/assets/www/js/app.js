
var resumeApp = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

resumeApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

resumeApp.config(function($stateProvider, $urlRouterProvider) {

  
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'LinkedInCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
resumeApp.controller("LinkedInCtrl", function($scope,$http, $state){
     var ifrm = document.getElementById('someFrame');
        ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
        ifrm.document.open();
        
   $scope.linked= function() {
       
       
       
    $http.get('https://api.linkedin.com/v1/people/~:(id,first-name,last-name,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)?oauth2_access_token= AQW4q0fpYUEBvtd_Y1Cs56E8pvZhczhYzb9OAfveBubH6JwzUpHN_egcoVRVga0nPdMUTLjDlDnHujZv58Kf5j0xhwbJYWM71Q6H4R1B-AUopQzRofXHow4A6nh6bLqBQ3tP5XBw1oPiV99-xQdvabRan6p-ADnuOu6D2Q0Ku8j3L8mTn6c&format=json').success(function(data){
        
        $scope.items = [];
       
      $scope.items.push("Firstname", data.firstName,"LastName",data.lastName,"Industry", data.industry,"Headline", data.headline,"Summary",data.summary);
       
        ifrm.document.write('<img src='+data.pictureUrl+'>');
                ifrm.document.write("<br><br><br>");
                  ifrm.document.write("<button style=\"width:500px;height:40px;background-color: #4CAF50;color: white;font-size: 16px\"> Personal Information  </button><br><br>" );
        for (var i=0; i<$scope.items.length; i=i+2) {
  ifrm.document.write( $scope.items[i] + "   :  ");
  ifrm.document.write($scope.items[i+1] );
           ifrm.document.write("<br>");
           
}
       ifrm.document.write("<br><button style=\"width:500px;height:40px;background-color: #4CAF50;color: white;font-size: 16px\"> Professional Experience  </button><br><br>" );
    for(i=0;i<data.positions._total ;i++){
       
         ifrm.document.write("Job Title  : ");
         ifrm.document.write("<strong>"+data.positions.values[i].title+"</strong>");
        ifrm.document.write("<br>");
        ifrm.document.write("Company Name  : ");
         ifrm.document.write(data.positions.values[i].company.name);     
        ifrm.document.write("<br>");
        ifrm.document.write("Industry  : ");
         ifrm.document.write(data.positions.values[i].company.industry);
        ifrm.document.write("<br>");
        ifrm.document.write("Type  : ");
         ifrm.document.write(data.positions.values[i].company.type);
        ifrm.document.write("<br>");
        ifrm.document.write("Start Date  : ");
         ifrm.document.write(data.positions.values[i].startDate.month+"-"+data.positions.values[i].startDate.year);
        ifrm.document.write("<br>");
        ifrm.document.write("Job Description  : ");
         ifrm.document.write("<div style=\"width:500px;\"> " +data.positions.values[i].summary +"</div>");
      
             ifrm.document.write("---------------------------------------------------------------------------------------------<br><br>");
         
    }

               
    });
    }
   
    $scope.gitget= function() { 
   var gitbutton = document.getElementById('gitbutton').value;
        ifrm.document.write("<br><button style=\"width:500px;height:40px;background-color: #4CAF50;color: white;font-size: 16px\"> Project Information  </button><br><br>" );
        console.log(gitbutton);
        
         $http.get('https://api.github.com/users/'+gitbutton+'/repos').success(function(data){
             ifrm.document.write("<ul>");
             for(i=0;i<data.length;i++){
                 if(data[i].language == null)
                     data[i].language = "";
                 ifrm.document.write("<li>" +data[i].name + "   : " + data[i].language+"</li>" ); 
                 ifrm.document.write("<br>");
                };
                 
             ifrm.document.write("</ul>");
             
             ifrm.document.close();
                             
         });
       
    }
    
    $scope.download= function() { 
       
  window.frames["someFrame"].focus();
  window.frames["someFrame"].print();


        
    }
});