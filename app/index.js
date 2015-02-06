'use strict';

var generators = require('yeoman-generator'),
	util = require('util'),
	path = require('path'),
	chalk = require('chalk'),
	yosay = require('yosay'),
	fs = require('fs'),
	exec = require('child_process').exec,
	defaults = require('./configs/defaults');


module.exports = generators.Base.extend({

	initialize: function() {

		this.log(chalk.green('Caching necessary files...'));
		
		var done = this.async();
		this.remote('LeadPages', 'LeadPagesBuildSystem', 'yeoman', function(){}, true);

		//Overwrite Skeleton with sample codes
		this.remote('LeadPages', 'LeadPagesTemplateStarterKit', 'yeoman', function (){ done();}, true);


	},

	prompting: function () {
	    var done = this.async();

	    // Have Yeoman greet the user.
	    
	    this.log(yosay(
	      'Welcome to the\n' + chalk.green.bold('LeadPages(TM) ') + chalk.yellow('Template Starter Kit ') + 'generator!'
	    ));

	    var prompts = [
	    	{
	    		name: 'templateId',
	    		message: 'Please give this template an UNIQUE ID (Ex: WEBINAR-01)',
	    		default: defaults.templateId
	    	},
	    	{
	    		name: 'templateName',
	    		message: 'What is your template\'s name?',
	    		default: defaults.templateName
	    	},
	    	{
	    		type: 'confirm',
	    		name: 'sampleCodes',
	    		message: 'Would you like to include the LeadPages(TM) Template Starter Kit?',
	    		default: true
	    	},
	    	{
	    		type: 'confirm',
	    		name: 'gulp',
	    		message: 'Include Gulp tasks to make your life easier?',
	    		default: true
	    	},
	    	{

	    		when: function (repsonse) {
	    			return repsonse.gulp;
	    		},
	    		name: 'extras',
	    		message: 'Include the following?',
	    		type: 'checkbox',
	    		choices: [
					{
						name: 'SASS',
						value: 'sass',
						checked: true

					}

	    		]

	    	}
	    ];

	    this.prompt(prompts, function (props) {

	    	this.templateId = props.templateId;
	      	this.templateName = props.templateName;
	      	this.sampleCodes = props.sampleCodes;
	      	this.gulp = props.gulp;
	      	
	      	if(this.gulp){
	      		this.extras = props.extras;
	      	}

	      	done();
	     }.bind(this));
	}, //prompting

	writing: {

		scaffolding: function(){
			
			var finish = this.async();
			var self = this;

			var templates = {
				template_id: this.templateId,
				template_name: this.templateName
			};
			
			if(this.sampleCodes){

				var cloneSkeleton = this.remote('LeadPages', 'LeadPagesBuildSystem', 'yeoman', function (err, remote){
					remote.directory('.', '.');
				}, false);

				//Overwrite Skeleton with sample codes
				var cloneSample = this.remote('LeadPages', 'LeadPagesTemplateStarterKit', 'yeoman', function (err, remote){
					remote.directory('leadpages-template', 'leadpages-template');
					remote.template('leadpages-template/index.html', 'leadpages-template/index.html', templates);
					remote.template('leadpages-template/meta/template.json', 'leadpages-template/meta/template.json', templates);
					finish();
				}, false);

			}  else {
				var cloneSkeleton = this.remote('LeadPages', 'LeadPagesBuildSystem', 'yeoman', function (err, remote){
					remote.directory('.', '.');
					remote.template('leadpages-template/index.html', 'leadpages-template/index.html', templates);
					remote.template('leadpages-template/meta/template.json', 'leadpages-template/meta/template.json', templates);
					finish();
				}, false);
			}

		},

		cleanUp: function(){
			var self = this;

			setTimeout(function(){
				if(!self.gulp){
					exec('rm -v gulpfile.js package.json readme.md && rm -rfv ./gulp ./scripts ./scss');
				}

				exec('rm -v .DS_store .gitignore');

			}, 1000);
		}
	},

	install: function(){
		installGulp: {
			if(this.gulp){
				var self = this;
				//setTimeout(function(){
					self.log(chalk.green('\nInstalling Build System packages...\n'));
					self.npmInstall();
				//}, 1000);
			}
		}
	},

	end: function(){
		goodbye: {
			this.log(
				yosay(chalk.green("I'm all done! Happy Hacking!"))
			);
		}
	}



});