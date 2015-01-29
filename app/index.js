'use strict';

var yeoman = require('yeoman-generator'),
	util = require('util'),
	path = require('path'),
	chalk = require('chalk'),
	yosay = require('yosay'),
	fs = require('fs'),
	exec = require('child_process').exec,
	defaults = require('./configs/defaults');

module.exports = yeoman.generators.Base.extend({



	prompting: function () {
	    var done = this.async();

	    // Have Yeoman greet the user.
	    
	    this.log(yosay(
	      'Welcome to the cool' + chalk.red('LeadPages Template Starter Kit') + ' generator!'
	    ));

	    var prompts = [
	    	{
	    		name: 'templateId',
	    		message: 'Please give this template an UNIQUE Id (Ex: WEBINAR-01)',
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
	    		message: 'Would you like to include template sample codes?',
	    		default: false
	    	},
	    	{
	    		type: 'confirm',
	    		name: 'gulp',
	    		message: 'Include Gulp tasks to make your life easier?',
	    		default: false
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

					},
					{
						name: 'Modernizr',
						value: 'modernizr',
						checked: false
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
	  },

	  writing: {

	  	gettingstuff: function (){
	  		this.log('Cloning... ');
	  		//Clone build system and skeleton template files
	  		this.remote('supawaza', 'LeadPagesBuildSystem', 'yeoman', function (err, remote) {
				remote.directory('.', './tmp');
			}, false);
	  	},

	  	scaffolding: function() {

	  		this.log('Scaffolding...');

	  		if(!this.sampleCodes && fs.existsSync('./tmp')){

	  			this.directory('./tmp/leadpages-template', './leadpages-template');

	  		} else {
	  			this.remote('LeadPages', 'template-starter-kit', 'yeoman', function (err, remote){
	  				remote.directory('./leadpages-template', './leadpages-template');
	  			});
	  		}

	  		if(this.gulp && fs.existsSync('./tmp')){
				this.directory('./tmp/gulp', './gulp');
	  		}

	  	},

	  	templating: function() {
	  		var context = {
	  			template_id: this.templateId,
	  			template_name: this.templateName
	  		};

	  		if(fs.existsSync('./tmp')){
  				this.template("./tmp/leadpages-template/index.html", "leadpages-template/index.html", context);
				this.template("./tmp/leadpages-template/meta/template.json", "leadpages-template/meta/template.json", context);
			}

	  	}

	  }

});