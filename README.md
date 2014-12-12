# Angle JS WP Template

## This is a BETA
Use this under your responsability.

Demo ##
You can see how

Based on this template ##
http://startbootstrap.com/template-overviews/clean-blog/

## Quick Test
bower install
npm install
grunt serve

## Why this?

1) My first reason is progressing with Angular JS
2) Working for years with WP and I do not like the structure of the songs.
3) There is an excellent job of https://wordpress.org/plugins/angularjs-for-wp/ but for me it has the disadvantage that it is an issue, which includes PHP.
4) The rate of improvement and increased page performance.

## How can I make it work?

### Preparing WordPress

1) We start from a clean install of WordPress http://codex.wordpress.org/Installing_WordPress

2) Install the following plugins:

- JSON API: https://wordpress.org/plugins/json-api/
There are other plugins, some more famous even, but this has the advantage that it is very easy to add new options as discussed below.
Copy the file into the plugin angular.php the 'controllers' folder.
Let 'Settings> JSON API "and activate the following controls. Widgets, Core, Respond and Angle (This latter that just uploaded) The screen would look like this:

[json_api_settings.png]

Activate permalinks (not mandatory but is nicer).
Now if we go to the following url https://puchi-cuchi.rhcloud.com//api/get_post/?slug=hello-world should display a JSON. If not, is that something has gone seriously wrong.
If we want to access the API from a different direction to WP have several options. For example, if Apache is used can be added to .htaccess

Header add Access-Control-Allow-Origin "*"
Header add Access-Control-Allow-Headers "origin, x-requested-with, content-type"
Header add Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"

- Social Icons Widget: https://wordpress.org/plugins/social-icons-widget/
This widget will learn how to access your information from the API.
This widget has github wishlist (OMG!). No problem. Let's add in the file wp-content / plugins / social-icons-widget / social-icons-widget.php. A copy of the file in the repository.
From 'Appearance> Widgets' we add the widget to Footer and fill any of the fields, eg Twitter, Facebook and Github.

You can change this easily in the file app / index.html

3) Header Image: from Appearance> Header add a background image.

4) Add a menu to wordpress with the name "main".

[menu_main.png]

5) Contact: create a page called "contact". In the comments of this page you will see shipments from the form.

6) Show the description: this requires creating one custom field called description

[custom_field_description]

7) Show excerp to describe the post.

8) Change in app / scripts / app.js the URL of the API. for example

api_url var = 'https: //puchi-cuchi.rhcloud.com/api';





