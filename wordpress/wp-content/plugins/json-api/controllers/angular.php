<?php

/*
Controller name: Angular
Controller description: Basic tools for Angular Template
*/

class JSON_API_Angular_Controller {

  public function basic() {
	
	$name=get_bloginfo();  
	$description=get_bloginfo('description'); 
	$version=get_bloginfo('version'); 
	$header_image=get_header_image();
	
    return array(
      "blog_title" => $name, 
      "blog_description" => $description, 
      "blog_version" => $version,
      "blog_header_image" => $header_image,
    );
  }
  
  
  public function menu() {
	
	$menu_items = wp_get_nav_menu_items('main');
	
    return array(
      "menu" => $menu_items, 
    );
  }


}

?>