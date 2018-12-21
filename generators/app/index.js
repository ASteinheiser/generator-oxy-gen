const chalk      = require('chalk');
const execSync   = require('child_process').execSync;
const Generator  = require('yeoman-generator');
const _kebabCase = require('lodash.kebabcase');
// local imports
const template = require('./template');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.template = template.bind(this);

    // define help text
    this.desc(chalk.yellow('\tOXY-GEN App Generator'
      + '\n\n\tCreate an Electron app with create-react-app'
      + '\n\tand Rust (Web Assembly in Web Workers) all set'
      + '\n\tup and ready to go with simple speed test example.'));
  }

  prompting() {
    var self = this;

    this.log(chalk.cyan(`\nLet's get started!!\n`));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: `What is your project's name?`,
        default: 'OXY-GEN Demo'
      }
    ];

    return this.prompt(prompts)
      .then(answers => {
        var { projectName } = answers;

        self.projectName = projectName;
        self.projectNameKebab = _kebabCase(projectName.toLowerCase());
      });
  }

  writing() {
    const { projectName, projectNameKebab } = this;

    this.log(chalk.gray('\nCreating your new') + chalk.blue(' OXY-GEN App: ')
      + chalk.green(projectName) + chalk.gray('...\n'));

    const context = { projectName, projectNameKebab };

    try {
      execSync('create-react-app --version');
    } catch(err) {
      this.log(chalk.red('Please install create-react-app and try again...'));
      this.log(chalk.blue('\nnpm i -g create-react-app'));
      return;
    }

    try {
      this.log(chalk.blue('Generating your create-react-app base project...\n'));
      execSync(`create-react-app ${this.projectNameKebab}`);
    } catch(err) {
      this.log(chalk.red('Something went wrong creating your react app.'));
      this.log(chalk.red('\nMake sure you are using create-react-app v2.1.0 or newer'));
      return;
    }

    this.log(chalk.blue('Creating important files!\n'));

    this.template('_package.json', `${this.projectNameKebab}/another-package.json`, context);
  }
};