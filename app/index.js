'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
	    this.pkg = require('../package.json');
	 },

	prompting: function () {
	    var done = this.async();

	    // Have Yeoman greet the user.
	    console.log(this.yeoman);
	    
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
	    		default: this.appName
	    	}
	    ];

	    this.prompt(prompts, function (props) {
	      this.templateName = props.templateName

	      done();
	    }.bind(this));
	  },

	  writing: {

	  	scaffoldFolders: function() {
	  		this.mkdir("leadpages-template");
	  		this.mkdir("leadpages-template/img");
	  		this.mkdir("leadpages-template/css");
	  		this.mkdir("leadpages-template/js");
	  		this.mkdir("leadpages-template/meta");
	  	},

	  	copyFiles: function() {

	  		this.fs.directory('js', "leadpages-template/js");
	  		this.fs.directory('css', "leadpages-template/css");
	  		this.fs.directory('img', "leadpages-template/img");

	  		this.copy("meta/_form.html", "leadpages-template/meta/form.html");

	  		var context = {
	  			site_name: this.templateName;
	  		}
	  		this.template("_index.html", "leadpages-template/index.html", context);
	  		this.template("meta/_template.json", "leadpages-template/meta/template.json", context)
	  	}
	  }

});