<?php
/*
Plugin Name: Social Icons Widget
Plugin URI: http://plugins.ten-321.com/social-icons-widget/
Description: Allows site owners to add a widget with a list of their social media links
Version: 0.1a
Author: Curtiss Grymala
Author URI: http://ten-321.com/
License: GPL2
*/
class social_icons_widget extends WP_Widget {
	var $services 		= array();
	var $before_list 	= '<ul class="social-icons-list">';
	var $after_list 	= '</ul>';
	var $before_item	= '<li class="%s">';
	var $after_item		= '</li>';
	
	
	function social_icons_widget() {
		return self::__construct();
	}
	
	/**
	 * Build our widget object
	 * @uses apply_filters() to filter the list of available services
	 * @uses WP_Widget::WP_Widget()
	 */
	function __construct() {
		$default_services = array( 
			'twitter' 	=> __( 'Twitter' ), 
			'facebook' 	=> __( 'Facebook' ), 
			'youtube'	=> __( 'YouTube' ), 
			'linkedin'	=> __( 'LinkedIn' ), 
			'google'	=> __( 'Google+' ), 
			'friendfeed'=> __( 'FriendFeed' ), 
			'flickr'	=> __( 'Flickr' ), 
			'github'	=> __( 'Github' ), 
		);
		$this->services 	= apply_filters( 'social-icons-services', $default_services );
		$this->before_list 	= apply_filters( 'social-icons-before-list', $this->before_list );
		$this->after_list	= apply_filters( 'social-icons-after-list', $this->after_list );
		$this->before_item	= apply_filters( 'social-icons-before-item', $this->before_item );
		$this->after_item	= apply_filters( 'social-icons-after-item', $this->after_item );
		asort( $this->services );
		
		$this->WP_Widget( 'social-icons-widget', __( 'Social Media Icons' ), array( 'classname' => 'social-icons', 'description' => 'A widget to display icons with links to a site\'s social media profiles' ) );
	}
	
	function widget( $args, $instance ) {
		extract( $args );
		
		$title	= apply_filters( 'widget_title', $instance['title'] );
		$links 	= array();
		foreach( $this->services as $s=>$n ) {
			$links[$s] = esc_url( $instance[$s] );
		}
		$links = array_filter( $links );
		if( empty( $links ) )
			return false;
		
		echo $before_widget;
		if( isset( $title ) && !empty( $title ) )
			echo $before_title . $title . $after_title;
		
		echo $this->before_list;
		foreach( $links as $s=>$l ) {
			printf( $this->before_item, esc_attr( $s ) );
			echo '<a href="' . $l . '">' . $this->services[$s] . '</a>';
			echo $this->after_item;
		}
		echo $this->after_list;
		
		echo $after_widget;
	}
	
	function update( $new, $old ) {
		$instance = $old;
		$instance['title'] = !empty( $new['title'] ) ? strip_tags( $new['title'] ) : null;
		foreach( $this->services as $s=>$n ) {
			$instance[$s] = !empty( $new[$s] ) ? esc_url( $new[$s] ) : null;
		}
		
		return $instance;
	}
	
	function form( $instance ) {
		$defaults = array_fill_keys( array_merge( array_keys( $this->services ), array( 'title' ) ), null );
		$instance = wp_parse_args( (array)$instance, $defaults );
?>
	<p><label for="<?php echo $this->get_field_id( 'title' ) ?>"><?php _e( 'Title' ) ?></label>
    	<input type="text" class="widefat" name="<?php echo $this->get_field_name( 'title' ) ?>" id="<?php echo $this->get_field_id( 'title' ) ?>" value="<?php echo $instance['title'] ?>"/></p>
<?php
		foreach( $this->services as $s=>$n ) {
?>
	<p><label for="<?php echo $this->get_field_id( $s ) ?>"><?php echo $n ?></label>
    	<input type="url" class="widefat" name="<?php echo $this->get_field_name( $s ) ?>" id="<?php echo $this->get_field_id( $s ) ?>" value="<?php echo esc_attr( $instance[$s] ) ?>"/></p>
<?php
		}
	}
}
add_action( 'widgets_init', create_function( '', "return register_widget( 'social_icons_widget' );" ) );
?>