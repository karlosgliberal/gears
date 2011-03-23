/**
 * Gears ManagedResourceStore/jQuery.ManagedResourceStore
 * Copyright (c) 2008 Karlos g liberal Investic / Beatriz ausucua & investic people
 - karlos(at)investic(dot)net | http://www.investic.net
 * Licensed under GPL.
 * Date: 01/06/2008
 *
 * 	
 * This plugin is based on other projects.
 * The method online is based on the rss gears proyect
 * Part of init method is based on gears_init.js copyrighted by google
 *
 * @projectDescription JS .Gears is an open source project that enables more powerful web applications,
 * by adding new features to web browsers.
 * @feature Localserver Cache and serve application resources (HTML, JavaScript, images, etc.) locally
 * this plugin work whith drupal 
 * http://www.investic.net/gears
 *
 * @author Karlos g liberal investic
 * @version 0.9
 * 
 * @param gears
 * @param Object defaults (optional) Customize your gears
 *
 *  * @TODO Improve Documentation
 * The Factory class is used to instantiate all other Gears objects.
 * Using the create method, an application specifies the interface version it uses.
 * Use gears way to create a Factory object. 
 * The script defines google.gears.factory to refer to a Factory object 
 * 
 * @param Init Method  By class factory and create method create the object LocalServer
 * @param boolean getPermission([siteName], [imageUrl], [extraMessage]) 
 *               siteName  - Optional. Friendly name of the site requesting permission.
 *               imageUrl - Optional. URL of a .png file to display in the dialog.
 *               extraMessage - Optional. Site-specific text to display to users in the security dialog.
 *               
 * @param options [title, image, description] get by default settings in $.fn.gears.perm or recive the parameter for init.js to generate
 * permission window.
 *              title: 'Gears Drupal'
 *              image: 'path_image'
 *              description: 'Esta es la descriptiocion'
 *          
 * @param storename provides name to ManagedStore 
 *
 * @param createStore Method  The ManagedResourceStore class is designed to cache a set of inter-dependent resources
 * The contents of a ManagedResourceStore are determined by the URLs listed in a manifest file
 * @param manifest  path file provider by drupal
 * 
 * @param removeStore this metod whith storename argument remove cache file in localserver.
 * @param creteIcon The Desktop module provides an interface for accessing
 * desktop related functionality, such as creating shortcuts.
 *
 * @param onLine private method State reports
 * 
 */
if (Drupal.jsEnabled) {
  (function($){
    var forceOffline;
  var movida = 'sites/gears.castillo.taz/modules/gears/network.txt';
  //call the private method every 3 seconds and return the state of online / offline
  //etInterval("$.onLine()", 3000);
    
    $.fn.gears = {
      init : function(options){
        var setting = $.extend({}, $.fn.gears.setting, options);
        var setting_image = setting['module_path']+'/images/128.png';
        if (window.google && google.gears) {
          return;
        }
        var factory = null;
        // Firefox
        if (typeof GearsFactory != 'undefined') {
          factory = new GearsFactory();
        } else {
          // IE
          try {
            factory = new ActiveXObject('Gears.Factory');
          } catch (e) {
            // Safari
            if (navigator.mimeTypes["application/x-googlegears"]) {
              factory = document.createElement("object");
              factory.style.display = "none";
              factory.width = 0;
              factory.height = 0;
              factory.type = "application/x-googlegears";
              document.documentElement.appendChild(factory);
            }
          }
        }
        if (!factory) {
         return;
        }
        if (!window.google) {
          window.google = {};
        }
        if (!google.gears) {
          google.gears = {factory: factory};
        }
        if (!window.google || !google.gears) {
           $('#gearsinfo').html("<b>NOTE: Esto es una movida.</b>");
        } else {
          //create google factory object and configurate options of getpermission
          google.gears.factory.getPermission( setting['title'], setting_image, setting['description']);
          //localserver object
          localServer = google.gears.factory.create("beta.localserver","1.0");
          //create store whith storename parameter.
          store = localServer.createManagedStore(setting['storename']);
        }
        if(!store.currentVersion){
          $('.gears').html('<em><s>remove</s></em>');
          $('.gears_delete').hide();
        }
      },
      
      
      createStore : function(manifest){

        var sto = $.extend({}, $.fn.gears.setting, manifest);
        if (!window.google || !google.gears) {
           $('#gearsinfo').css({width:100+'%', background:'white'});
           //put install info in gerasinfo div
           $('#gearsinfo').html('<b>You need install Google Gears<a href="http://gears.google.com/?action=install&message=Google gears for Drupal"> install</a>.</b>' );
                return;
        }
        forceOffline = true;
        $('.gears_create').click(function(){
          //var funciones = function(data){
          //var result = Drupal.parseJson(data);
         $.getJSON(this.href, function(json){
          var path ='/'+json.path+'/';
          var filename =json.filename;
          
          store.manifestUrl = path+filename;
          store.checkForUpdate();
          store.onprogress = function(e){
            var porcen = Math.round((100 * e.filesComplete)/e.filesTotal);
            $('#gearsinfo').css({width:porcen+'%'});
            $('#gearsinfo').html("Download:<em>"+porcen+"%</em>");
          };
          store.onerror = function(err){
            $('#gearsinfo').html("<em>"+store.lastErrorMessage+"</em>");
          };
          store.oncomplete = function(){
             $('#gearsinfo').html("<em>Complet</em>");
          };
        });
        //$.get(this.href, null, funciones);
         return false;
        });
      },
      
      removeStore : function(options){
        var settings = $.extend({}, $.fn.gears.setting, options);
        $('.gears_delete').click(function(){
          var funciones = function(){
          localServer.removeManagedStore(settings['storename']);          
          $('#gearsinfo').html("<em>Borrado</em>");
        }
        $.get(this.href, null, funciones);
         return false;
        });       
      },
      
      createIcon : function(options){
        var url = options.url;
        var path = options.path;
        var desktop = google.gears.factory.create("beta.desktop");
        var description = "este es un ejemplo de acceso directo.";
        var icons = {
          "16x16": path+"/images/16.png",
          "32x32": path+"/images/32.png",
          "48x48": path+"/images/48.png",
          "128x128": path+"/images/128.png"
        };
        /*
        desktop.createShortcut("Conectate",  // name
                             url,  // url
                             icons,  // icons (must specify at least one)
                             description);  // description (optional)*/
      }
    };
    
    $.fn.gears.onLine = function(options) {
      var setting_network = '/'+options+'/network.txt';
      $.ajax({
        type: "POST",
        url: setting_network,
        timeout: 5000,
        cache: false,
        success: function(msg){
        if (forceOffline != true) {
         IS_USER_ONLINE = true;
        } else {
         IS_USER_ONLINE = false;
        }
        $('#gearsonline').html("Status: <b style='color:blue'>Online</b>");
        },
         error:function (XMLHttpRequest, textStatus, errorThrown) {
         // typically only one of textStatus or errorThrown
         // will have info
          IS_USER_ONLINE = false;
          $('#gearsonline').html("Status: <b style='color:red'>Offline</b>");
        }
      });
    }
      
    
    $.fn.gears.setting = {
      title: 'Gears Drupal',
      image: '/imgaes/128.png',
      description: 'Esta es la descriptiocion',
      storename: 'Drupal',
      path: '/files/manifest/',
      filename: 'manifest_view_pages.json'
    }
   
    })(jQuery);
}
