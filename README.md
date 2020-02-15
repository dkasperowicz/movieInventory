# movieInventory Project
A simple Movie Inventory application using Angular as the presentation-tier, PHP as the mid-tier, and MySQL as the data-tier.

*Everything below assumes Windows 10 is being used*

## Technical Requirements
- Apache HTTP Server 2.4.41 (or equivalent)
- PHP 7.3.10 (recommended, but might work with older versions)
	- Must be integrated with Apache HTTP Server
	- pdo_mysql must be uncommended in php.ini
- MySQL 5.7.21 (recommended, but might work with older versions)

## Installation Instructions
1. Download or fork project
	 1. If downloaded, extract compressed file to director
	 
### Presentation Tier
The presentation tier comes precompiled and ready to be deployed.  Source code for the presentation tier can be found in the *movie-inventory-app* directory.

If you're looking to install the presentation tier and compile it yourself, please follow the below instructions:

1. Open command prompt by pressing the "Windows Key" on the keyboard
2. Type ```cmd``` when the start menu opens.
3. Press the "Enter Key" on your keyboard.
4. In the window that opens, navigate to the location of where your either forked or extracted the project.  Example command: ```cd Desktop\movieInventory```
5. Install Angular CLI by entering the following command: ```npm install -g @angular/cli```

### Middle Tier
The middle tier uses PHP using an API.

### Data Tier
The data tier uses MySQL that's accessed via the middle tier.
