WP Angular
==========

## Warning: This is a BETA

Use this code under your responsability.

## Demo

You can see a demo here http://wpangular.bdunk.com

## Design based on this template

http://startbootstrap.com/template-overviews/clean-blog/

## Quick Test

Clone repository and then:

```
bower install

npm install

grunt serve
```

## Why this?

1) My first reason is progressing with Angular JS.

2) I have been working for years with WP and I don't like the structure of the themes.

3) There is an excellent job here: https://wordpress.org/plugins/angularjs-for-wp/ but it's a theme which includes PHP.

4) Page goes faster.


## In your own WordPress

### We start from a clean install of WordPress :

http://codex.wordpress.org/Installing_WordPress

### Install the following plugins:

#### JSON API: https://wordpress.org/plugins/json-api/

There are other plugins, some more famous even, but this has the advantage that it's very easy to add new options as discussed below.

Copy this file (https://raw.githubusercontent.com/monchopena/wp-angular/master/wordpress/wp-content/plugins/json-api/controllers/angular.php) into 'controllers' folder.

Let 'Settings> JSON API "and activate the following controls. Widgets, Core, Respond and Angular. The screen would look like this:

![alt json_api_settings](https://raw.githubusercontent.com/monchopena/wp-angular/master/captures/json_api_settings.png)

Activate permalinks (not mandatory but is nicer).

Now if you go to the following url https://yourdomain.com/api/get_post/?slug=hello-world should display a JSON. If not, is that something has gone seriously wrong.

If we want to access the API from a different URL tha WP, we have several options. For example, if Apache is used you can add to .htaccess

```
Header add Access-Control-Allow-Origin "*"
Header add Access-Control-Allow-Headers "origin, x-requested-with, content-type"
Header add Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"
```

#### Social Icons Widget: https://wordpress.org/plugins/social-icons-widget/

With this widget we'll learn how to access to a widget information from the API.

This widget has github wishlist (OMG!). No problem. Let's add in a copy of this file (https://raw.githubusercontent.com/monchopena/wp-angular/master/wordpress/wp-content/plugins/social-icons-widget/social-icons-widget.php).

From 'Appearance> Widgets' we add the widget to Footer and fill any of the fields, eg Twitter, Facebook and Github.

You can change this easily in the file app/index.html.

### Header Image: from Appearance> Header add a background image.

### Add a menu to wordpress with the name "main". Sample:

![alt menu_main](https://raw.githubusercontent.com/monchopena/wp-angular/master/captures/menu_main.png)

### Contact: create a page called "contact". In the comments of this page you will see requests from the form.

### Show the description in page: this requires creating one custom field called description

![alt custom_field_description](https://raw.githubusercontent.com/monchopena/wp-angular/master/captures/custom_field_description.png)

### In posts fill excerp field and you'll see like a description.

### Change in app/scripts/app.js the URL of the API. for example

```js
api_url var = 'https://puchi-cuchi.rhcloud.com/api';
```

## License

[The MIT License (MIT)](https://raw.githubusercontent.com/monchopena/wp-angular/master/LICENSE).