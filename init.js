if (Drupal.jsEnabled) {
  $(document).ready(function(){
    var data = Drupal.settings.gears_var
    var data_url = data['url'];
    var data_path = data['path'];
    var data_title = data['title'];
    var data_description = data['description'];
    var data_storename = data['storename'];
    $(this).gears.init({url:data_url, module_path:data_path, title:data_title, description:data_description, storename:data_storename});
    
    $(this).gears.createStore();
    $(this).gears.removeStore({storename:data['storename']});
    $(this).gears.createIcon({url:data_url, path:data_path});
 
    setInterval(function(){$(this).gears.onLine(data_path)}, 3000);

  });
}
