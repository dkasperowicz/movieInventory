# Movie Inventory Project
A simple Movie Inventory application using Angular as the presentation-tier, PHP as the mid-tier, and MySQL as the data-tier.

Live Demo Site: https://movieinventory.dawidk.ca/

*Everything below assumes Windows 10 is being used on a desktop*

## Technical Requirements/Recommendations
*The following technical requirements/recommendations is the environmnet that this application was tested on*

- Apache HTTP Server 2.4.41 (or equivalent)
- PHP 7.3.10 (recommended, but might work with older versions)
	- Must be integrated with Apache HTTP Server
	- pdo_mysql must be uncommended in php.ini
- MySQL 5.7.21 (recommended, but might work with older versions)
- Browsers application tested and working in the latest versions of:
	- Mozilla Firefox: https://www.mozilla.org/en-CA/
	- Microsoft Edge (new one, *not* legacy!): https://www.microsoft.com/en-us/edge
	- Brave: https://brave.com/download/
	- Google Chrome: https://www.google.com/chrome/
	- Opera: https://www.opera.com/

## Installation Instructions
Get a copy of the project on your environment; ensure it is extracted if received in a compressed file.

### Data Tier
The data tier uses MySQL that's accessed via the middle tier.  Setup scripts are provided in the *mysql* folder that will create the necessary tables, data, and stored procedures.  The scripts work on the following assumptions:

- The database name is able to be *dawid_movieinventory*.
	- If this name isn't possible on the environment, you will:
		- need to change all instances of *dawid_movieinventory*, to something that is acceptable for your particular environment, or,
		- create a database schema yourself and delete all instances of ```CREATE DATABASE  IF NOT EXISTS dawid_movieinventory``` from every script that contains it and change all instances of ```USE dawid_movieinventory;``` to that of your manually created database schema.
- The username to access this schema is *dawid_movieinventory* and has at last *delete*, *select*, *insert*, and *update* permissions.
	- If this name isn't possible on th environment, you will need to create your own user account that has the aformentioned permissions.

### Middle Tier
The middle tier is a PHP API and can be found in the *api* folder.  Place this folder in the root director along with the presentation tier files.  In Apache HTTP Server, it would be placed in the *htdocs* folder.

Inside the *api* folder, you will find one PHP files named *index.php* that contains the entire API which the presentation tier will be calling.  This file needs to be modified to work with your particular environment, which can be done with any plaintext editor or IDE.  Open *index.php* and modify lines 4 - 7.  These lines provide the MySQL database connectivity.  The following are descriptions and instructions of how to change the lines:
- ```private const HOST = "localhost:3306";``` - This is the address on which your instance of MySQL server is running.
	- Modify ```localhost``` to that of the address of your MySQL server.
	- Modify ``` 3306``` to that of the port number which your MySQL server is using.
- ```private const DATABASE_NAME = "dawid_movieinventory";``` - This is the database schema name where all the tables and stored procedures are located.
	- Modify ```dawid_movieinventory``` to the name of your database schema you've created in the aformentioned *Data Tier* section.
- ```private const USERNAME = "dawid_movieinventory";``` - The username of the account that has sufficient rights to access the schema.
	- Modify ```dawid_movieinventory``` to the user you've created in the aformentioned *Data Tier* section.
- ```private const PASSWORD = "abc123";``` - This is the password for the username of the account that has sufficient rights to access the schema.
	- Modify ```abc123``` to the password you've created that is associated with the aformentioned username that you've created in the aformentioned *Data Tier* section.
	
Once the necessary changes are made, save the changes.
	 
### Presentation Tier
The presentation tier comes precompiled and ready to be deployed on your environment.  To use the precompiled code, ensure that the contents of the *dist* folder are on root level of your web server; don't put the *dist* folder itself on the root level of your web server.  In the case of Apache HTTP server, this will be right in the *htdocs* folder.  You will be able to access it through the following url once your instance of Apache HTTP server is running with the code placed in the root director: http://localhost/.

A *.htaccess* file is included to help with navigating the presentation layer routing rules and with browser caching.

If you choose to place the code in a subfolder within the root directory, the files will need to be modified to work in a subdirectory; this is beyond the scope of this guide.

Source code for the presentation tier can be found in the *movie-inventory-app* directory; it includes the entire Angular presentation tier source code where you're able to compile it yourself, or run it using the NodeJS development server that comes with Angular CLI (assuming you have it installed).  In the event you opt to run the presentation tier in the development server, the middle tier will still need to exist on a seperate web server that has PHP integrated with it and running on port 80.
