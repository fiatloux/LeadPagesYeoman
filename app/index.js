'use strict';

var yeoman = require('yeoman-generator');
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var gitclone = require('nodegit').Clone;

function hasFeature(feat, features) {
	return features.indexOf(feat) !== -1;
};

function insertTemplateLang(fileName, strToReplace, replaceStr) {

	fs.readFile(fileName, 'utf8', function (err,data) {
	  if (err) {
	    return this.log(err);
	  }

	  var result = data.replace(strToReplace, replaceStr);

	  fs.writeFile(fileName, result, 'utf8', function (err) {
	     if (err) return this.log(err);
	  });
	});
};

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
	    		default: 'LP-TEMP-01'
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

	  		if(this.sampleCodes){
	  			this.log('Cloning from repo...');

	  			gitclone.clone('ssh://LeadPages@github.com/template-starter-kit', './temp/', null).then(function(repo) {
				        var r = repo;
				        this.log('Cloning from: '+r);
				    },
				    function(err){
				        var e = err;
				        this.log(yosay(chalk.red("uh oh... can't clone repo...")));
				    }
				);
	  			//this.directory("template-starter-kit/leadpages-template", "leadpages-template");

	  		} else {

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

	  			this.log('Finished scaffolding!');
	  		}

	  		this.log("Extra extra!");

	  		console.log(this.extras);

	  		var i;
	  		if(typeof this.extras !== 'undefined'){
	  			for ( i=0; i < this.extras.length; i++ ){
	  				console.log('hmm: '+this.extras[i]);
	  				this.mkdir(this.extras[i]);
	  			}
	  		}
	  		
	  	},

	  	templating: function() {
	  		var context = {
	  			template_id: this.templateId,
	  			template_name: this.templateName
	  		};

	  		// if(this.sampleCodes){
	  		// 	this.template("template-starter-kit/leadpages-template/index.html", "leadpages-template/index.html", context);
  			// 	this.template("template-starter-kit/leadpages-template/meta/template.json", "leadpages-template/meta/template.json", context);
	  		// } else {
	  		// 	this.template("_index.html", "leadpages-template/index.html", context);
  			// 	this.template("meta/_template.json", "leadpages-template/meta/template.json", context);
	  		// }

  			this.log(yosay(chalk.green("I'm done! Let's code!")));
	  	}
	  }

});