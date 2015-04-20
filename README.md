### What is the LeadPages Yeoman Generator? ###

Yeoman helps kickstart new projects. The LeadPages&trade; [Yeoman](http://yeoman.io) generator allows you to quickly scaffold out new projects, taking the manual setup out of the process. In a single command, you can build out the file & folder structure for a LeadPages template. Toggle on a few options, and you can have powerful, robust tools at your fingertips. All in less than a minute.

### What you need: ###

* Install [NodeJS](http://nodejs.org) and install [Xcode](https://developer.apple.com/xcode/downloads/) (Mac)
* Install [NodeJS](http://nodejs.org) and install [GitSCM](http://git-scm.com/download/win) (Windows)

### How to install?
* Fire up your Terminal and install yeoman, [GulpJS](http://gulpjs.com), and LeadPages&trade; Template Generator `npm install -g yo generator-leadpages gulp`
  * If you receive an error relating to permissions, here are some additional options:
    - Run `sudo chown -R 'whoami' ~/.npm` to fix a potential permission issue. (Note: ' around whoami are the grave accent `), then try `npm install -g yo generator-leadpages` again
    - If that still doesn't work, try `sudo chown -R 'whoami' /usr/local/lib/node_modules` (Note: ' around whoami are the grave accent `), then try `npm install -g yo generator-leadpages`
	- If that still doesn't work, try `sudo npm install -g yo generator-leadpages` in front and enter your password.
	- If you're still having problems, submit an issue [here](https://github.com/LeadPages/LeadPagesYeoman/issues).

### How to run it? ###

* Fire up your terminal or GitSCM's Bash Terminal (Windows)
* Create a new folder at your desired location and change directory into it: `mkdir <folderName>`, then `cd <folderName>`
* Type `yo leadpages` and follow the prompts
  * If you are using **Gulp**, type: `gulp start` to start it (See [LeadPages&trade; Build System](https://github.com/LeadPages/LeadPagesBuildSystem) for documentations)
* Start coding!

### How to update? ###

* In your favorite terminal, type `yo` and select `Update your generators` at the bottom
* Use the `space` bar to select/deselect the generator(s) that you want to update then hit `enter`

### How to uninstall? ###

`npm uninstall -g generator-leadpages`

## What does it include? ###

* A copy of the [LeadPages&trade; Template Starter Kit](https://github.com/LeadPages/template-starter-kit)
* OR just a barebones LeadPages&trade; template with required files/folders structure
* [LeadPages&trade; Build System](https://github.com/LeadPages/LeadPagesBuildSystem) for workflow automation using [GulpJS](http://gulpjs.com). Visit the [LeadPages Build System](https://github.com/LeadPages/LeadPagesBuildSystem) repository for available tasks.

## Questions/Comments/Feature Request/Bugs? ##

Open an issue [here](https://github.com/LeadPages/LeadPagesYeoman/issues).


## Contributing ##

1. Fork [a branch](https://github.com/LeadPages/LeadPagesYeoman)
2. Code
3. Submit a Pull Request
4. Thank you for helping out! You're awesome!