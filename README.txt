Gears ManagedResourceStore/jQuery.ManagedResourceStore
Copyright (c) 2008 Karlos g liberal Investic / Beatriz ausucua & investic people
karlos(at)investic(dot)net | http://www.investic.net

Test en el doc
Nuevo test en el doc

Gears is an open source project that enables more powerful web applications, by adding new features to web browsers.
This gears.modulo integrates with drupal part of the functionalities of google gears

The LocalServer module allows a web application to cache and server its HTTP resources locally, without a network connection.

The LocalServer module is a specialized URL cache that the web application controls. 
Requests for URLs in the LocalServer's cache are intercepted and served locally from the user's disk.
	
For the cache application we used the option ManagedResourceStore: for capturing a related set of URLs that are declared in a manifest file, 
and are updated automatically. The ManagedResourceStore allows the set of resources needed to run a web application to be captured.
The module integrates with different types of content created. It also integrates with the views module. 
Being able to cache a web application of a specific view.

To work with google gears we have created a plugin jquery with different methods for the management of localserver.
This module is a development version, Google gears is a beta version and that makes it may be unstable

Feature
- Block for managing google gear 
- It creates the cache of view or node
- Clears the store created by google gears of view or node
- Report of state online / offline
- It creates an icon on the desktop to access the application


INSTALLATION

- Copy files to your module directory
- Turn the module on at admin/modules
- In the settings / gears select the type of content or view
- After the block for active management gears, the block will be accessible from the view or content type set in the settings / gears.


TODO
- Improving downloading images and attachments
- Solving poblemas overlooking filters and exposed or arguments
- Improved controls in offline mode
- Remove or improve the relationship with the plug jquery and init.js
- Support BBDD
- Drupal6
