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

        //Greeting
        this.log(yosay(
            'Welcome to the\n' + chalk.green.bold('LeadPages(TM) ') + chalk.yellow('Template Starter Kit ') + 'generator!'
        ));

        //Cache the repos
        this.log(chalk.green('Caching necessary files...'));

        var done = this.async();

        this.remote('LeadPages', 'LeadPagesBuildSystem', 'yeoman', function() {}, true);
        this.remote('LeadPages', 'LeadPagesTemplateStarterKit', 'yeoman', function() {
            done();
        }, true);


    },

    prompting: function() {
        var done = this.async();

        var prompts = [{
            name: 'templateId',
            message: 'Please give this template an UNIQUE ID (Ex: WEBINAR-01)',
            default: defaults.templateId
        }, {
            name: 'templateName',
            message: 'What is your template\'s name?',
            default: defaults.templateName
        }, {
            name: 'sampleCodes',
            type: 'confirm',
            message: 'Would you like to include the LeadPages(TM) Template Starter Kit?',
            default: false
        }, {
            name: 'gulp',
            type: 'confirm',
            message: 'Include Gulp tasks to make your life easier?',
            default: true
        }, {

            when: function(repsonse) {
                return repsonse.gulp;
            },
            name: 'preprocessors',
            type: 'list',
            message: 'Include the following?',
            choices: [{
                    name: 'SASS',
                    value: 'sass',
                    checked: true
                }, {
                    name: 'LESS',
                    value: 'less',
                    checked: false
                }
     		]

        },
        {
            name: 'vendors',
            type: 'rawlist',
            message: 'Want any of these? (You can select multiple)',
            choices: [
                {
                    name: 'jQuery 1.9.1',
                    value: 'jquery_191',
                    checked: true
                },
                {
                    name: 'jQuery latest',
                    value: 'jquery_latest',
                    checked: false
                },
                {
                    name: 'Bootstrap 3',
                    value: 'boostrap',
                    checked: false
                }
            ]
        },
        {
        	name: 'git',
        	type: 'confirm',
        	message: 'Initialize a Git repository?',
        	default: true
        }];

        this.prompt(prompts, function(props) {

            this.templateId = props.templateId;
            this.templateName = props.templateName;
            this.sampleCodes = props.sampleCodes;
            this.gulp = props.gulp;
            this.git = props.git;

            if (this.gulp) {
                this.preprocessors = props.preprocessors;
            }

            done();
        }.bind(this));
    },

    writing: {

        scaffolding: function() {

            var finish = this.async();

            var templates = {
                template_id: this.templateId,
                template_name: this.templateName
            };

            if (this.sampleCodes) {

                //Copy from cached files
                var cloneSkeleton = this.remote('LeadPages', 'LeadPagesBuildSystem', 'yeoman', function(err, remote) {
                    remote.directory('.', '.');
                }, false);

                //Overwrite Skeleton with sample codes
                var cloneSample = this.remote('LeadPages', 'LeadPagesTemplateStarterKit', 'yeoman', function(err, remote) {
                    remote.directory('leadpages-template', 'leadpages-template');
                    remote.template('leadpages-template/index.html', 'leadpages-template/index.html', templates);
                    remote.template('leadpages-template/meta/template.json', 'leadpages-template/meta/template.json', templates);
                    finish();
                }, false);

            } else {
                var cloneSkeleton = this.remote('LeadPages', 'LeadPagesBuildSystem', 'yeoman', function(err, remote) {
                    remote.directory('.', '.');
                    remote.template('leadpages-template/index.html', 'leadpages-template/index.html', templates);
                    remote.template('leadpages-template/meta/template.json', 'leadpages-template/meta/template.json', templates);
                    finish();
                }, false);
            }

        }
    },

    install: {
        installGulp: function() {
            if (this.gulp) {
                var self = this;

                self.log(chalk.green('\nInstalling Build System packages...\n'));
                self.npmInstall();
            }
        },

        //TODO: Install vendor scripts. jQuery etc...

        cleanUp: function(){
        	var self = this;
            setTimeout(function() {

                exec('rm .DS_store');

                if (!self.gulp) {
                    exec('rm gulpfile.js package.json && rm -rf ./gulp ./scripts ./scss ./less');
                }

                if(!!self.preprocessors){
                	//Remove
                	var removeFolder = self.preprocessors == 'sass' ? './less' : './scss',
                		removeGulpTask = self.preprocessors == 'sass' ? 'less.js' : 'sass.js'
                	exec('rm -rf '+removeFolder+' && rm ./gulp/tasks/'+removeGulpTask);
                }


                if(self.git){
                	exec('echo "\n\n.DS_store" >> .gitignore && git init && git add .');
                } else {
                    exec('rm .gitignore');
                }

            }, 1000);
        },
    },

    end: {

        goodbye: function(){
            var self = this;
            setTimeout(function(){
            	self.log(
            	    yosay(chalk.green("I'm all done! Happy Hacking!"))
            	);
            }, 1000);
        }
    }


});