'use strict';

var yeoman = require('yeoman-generator');
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');

function insertTemplateLang(fileName, strToReplace, replaceStr) {

	fs.readFile(fileName, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }

	  var result = data.replace(strToReplace, replaceStr);

	  fs.writeFile(fileName, result, 'utf8', function (err) {
	     if (err) return console.log(err);
	  });
	});
}

module.exports = yeoman.generators.Base.extend({

	prompting: function () {
	    var done = this.async();

	    // Have Yeoman greet the user.
	    
	    this.log(yosay(
	      'Welcome to the cool' + chalk.red('LeadPages Template') + ' generator!'
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
	    		message: 'Would you like to include a template sample codes?',
	    		default: false
	    	}
	    ];

	    this.prompt(prompts, function (props) {
	    	this.templateId = props.templateId;
	      	this.templateName = props.templateName;
	      	this.sampleCodes = props.sampleCodes;

	      done();
	    }.bind(this));
	  },

	  writing: {

	  	scaffolding: function() {

	  		if(this.sampleCodes){
	  			this.directory("template-starter-kit/leadpages-template", "leadpages-template");
	  		} else {

	  			//scaffold the folders
	  			this.mkdir("leadpages-template");
	  			this.mkdir("leadpages-template/img");
	  			this.mkdir("leadpages-template/css");
	  			this.mkdir("leadpages-template/js");
	  			this.mkdir("leadpages-template/meta");

	  			//Copy files
	  			this.directory('js', "leadpages-template/js");
	  			this.directory('css', "leadpages-template/css");
	  			this.directory('img', "leadpages-template/img");

	  			this.copy("meta/_form.html", "leadpages-template/meta/form.html");
	  		}
	  	},

	  	templating: function() {
	  		var context = {
	  			template_id: this.templateId,
	  			template_name: this.templateName
	  		};

	  		if(this.sampleCodes){
	  			var indexFile = "leadpages-template/index.html",
	  				templateJSON = "leadpages-template/meta/template.json";

	  			insertTemplateLang(indexFile, 'Template Starter Kit', '<%= template_name %>');
	  			insertTemplateLang(templateJSON, 'LeadPages Template Starter Kit', '<%= template_name %>');
	  		}

  			this.template("_index.html", "leadpages-template/index.html", context);
  			this.template("meta/_template.json", "leadpages-template/meta/template.json", context);
	  	}
	  }

});