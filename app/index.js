'use strict';

var yeoman = require('yeoman-generator'),
	util = require('util'),
	path = require('path'),
	chalk = require('chalk'),
	yosay = require('yosay'),
	fs = require('fs'),
	exec = require('child_process').exec,
	replace = require('replace');

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
	    		default: 'LP-TSK-01'
	    	},
	    	{
	    		name: 'templateName',
	    		message: 'What is your template\'s name?',
	    		default: 'LeadPages Template Starter Kit'
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
						name: 'LESS',
						value: 'less',
						checked: false
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

	  	scaffolding: function() {

	  		if(!this.sampleCodes){

	  			this.log('Templating...');

	  			//scaffold the folders
	  			this.mkdir("leadpages-template");
	  			this.mkdir("leadpages-template/css");
	  			this.mkdir("leadpages-template/fonts");
	  			this.mkdir("leadpages-template/img");
	  			this.mkdir("leadpages-template/js");

	  			this.mkdir("leadpages-template/meta");

	  			//Copy files
	  			this.directory('css', "leadpages-template/css");
	  			this.directory('img', "leadpages-template/img");
	  			this.directory('js', "leadpages-template/js");

	  			this.log('Finished scaffolding skeleton folders!');
	  		}

	  	},

	  	templating: function() {
	  		var context = {
	  			template_id: this.templateId,
	  			template_name: this.templateName
	  		};

	  		if(this.sampleCodes){
	  			var obj = this;

	  			this.log('Cloning from repo...');

	  			var repo = 'git@github.com:LeadPages/template-starter-kit.git';

	  			var clone = exec('git clone '+repo+' ./',
	  				function (error, stdout, stderr) {
  				    	console.log('Cloning from '+repo);

	  				    if (error !== null) {
	  				      console.log('Uh oh: '+ error);
	  				    } else {

	  				    	var cleanup = exec('rm -rf .gitignore .git LICENSE');

	  				    	//Insert template tags
	  				    	var replaceHtmlTitle = replace({
	  				    	    regex: "Template Starter Kit",
	  				    	    replacement: context.template_name,
	  				    	    paths: ['./leadpages-template/index.html'],
	  				    	    recursive: true,
	  				    	    silent: true,
	  				    	});
	  				    	var replaceJsonId = replace({
	  				    	    regex: "LP-TSK-01",
	  				    	    replacement: context.template_id,
	  				    	    paths: ['./leadpages-template/meta/template.json'],
	  				    	    recursive: true,
	  				    	    silent: true,
	  				    	});
	  				    	var replaceJsonTitle = replace({
	  				    	    regex: "LeadPages Template Starter Kit",
	  				    	    replacement: context.template_name,
	  				    	    paths: ['./leadpages-template/meta/template.json'],
	  				    	    recursive: true,
	  				    	    silent: true,
	  				    	});

	  						var i;
	  						if(typeof obj.extras !== 'undefined'){
	  							obj.log("Generating "+obj.extras.join(', ')+" folders!");
	  							for ( i=0; i < obj.extras.length; i++ ){
	  								obj.mkdir(obj.extras[i]);
	  							}
	  						}
	  				    }
	  				}
	  			);

	  		} else {
	  			this.template("_index.html", "leadpages-template/index.html", context);
  				this.template("meta/_template.json", "leadpages-template/meta/template.json", context);
	  		}

	  	}
	  }

});