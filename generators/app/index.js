let chalk        = require('chalk');
const execSync   = require('child_process').execSync;
const Generator  = require('yeoman-generator');
const _kebabCase = require('lodash.kebabcase');
// local imports
const template = require('./template');
const {
  OLD_SCRIPTS,
  NEW_SCRIPTS,
  OLD_META,
  NEW_META
} = require('./scripts.js');

// set global background color to black for text since we use white
chalk = chalk.bgBlack;

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.template = template.bind(this);

    // define options
    this.option('yarn');

    // define help text
    this.desc(chalk.magenta('\tOXY-GEN App Generator')
      + chalk.white('\n\n\tCreate an Electron app with create-react-app'
      + '\n\tand Rust (Web Assembly in Web Workers) all set'
      + '\n\tup and ready to go with simple speed test example.'));
    this._options.yarn.description = 'Installs dependencies with yarn instead of npm';
  }

  prompting() {
    var self = this;

    this.log(chalk.magenta(`
     .d88b.  db    db db    db          d888b  d88888b d8b   db 
    .8P  Y8. \`8b  d8' \`8b  d8'         88' Y8b 88'     888o  88 
    88    88  \`8bd8'   \`8bd8'          88      88ooooo 88V8o 88 
    88    88  .dPYb.     88    C8888D  88  ooo 88~~~~~ 88 V8o88 
    \`8b  d8' .8P  Y8.    88            88. ~8~ 88.     88  V888 
     \`Y88P'  YP    YP    YP             Y888P  Y88888P VP   V8P 
    `));

    this.log(chalk.white('\nWelcome to ') + chalk.magenta('OXY-GEN')
      + chalk.white(`! Let's get started!!\n`));

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

    this.log(chalk.gray('\nCreating your new OXY-GEN App: ')
      + chalk.magenta(projectName) + chalk.gray('...\n'));

    const context = { projectName, projectNameKebab };

    try {
      execSync('create-react-app --version');
    }
    catch(err) {
      this.log(chalk.red('Please install create-react-app and try again...'));
      this.log(chalk.cyan('\nnpm i -g create-react-app'));
      return;
    }

    try {
      this.log(chalk.blue('Generating your create-react-app base project: ')
        + chalk.gray(`${projectNameKebab}\n`));

      execSync(`create-react-app ${this.projectNameKebab}`);
    }
    catch(err) {
      this.log(chalk.red('Something went wrong creating your react app.'));
      this.log(chalk.red('\nMake sure you are using create-react-app v2.1.0 or newer'));
      return;
    }

    try {
      this.log(chalk.blue('Installing Electron and other dependencies...\n'));

      const { yarn } = this.options;

      if(yarn) {
        execSync(`cd ${this.projectNameKebab}; yarn add --dev foreman electron-builder electron`);
        execSync(`cd ${this.projectNameKebab}; yarn add node-sass typeface-roboto`);
      } else {
        execSync(`cd ${this.projectNameKebab}; npm i --save-dev foreman electron-builder electron`);
        execSync(`cd ${this.projectNameKebab}; npm i --save node-sass typeface-roboto`);
      }
    } catch(err) {
      this.log(chalk.red('Something went wrong installing dependencies.\n'));
      return;
    }

    try {
      this.log(chalk.blue('Adding scripts and electron config to package.json...'));
      this.log(chalk.yellow('When prompted to overwrite package.json, enter `y` to accept.\n'));

      let packageJson = `${this.projectNameKebab}/package.json`;

      this.fs.copy(packageJson, packageJson, {
        process: content => {
          var scriptsRegex = new RegExp(OLD_SCRIPTS, 'g');
          var packageMetaRegex = new RegExp(OLD_META, 'g');

          var newContent = content.toString().replace(scriptsRegex, NEW_SCRIPTS);
          newContent = newContent.replace(packageMetaRegex, NEW_META(this.projectName, this.projectNameKebab));

          return newContent;
        }
      });
    }
    catch(err) {
      this.log(chalk.red('Something went wrong overwriting package.json\n'));
      return;
    }

    this.log(chalk.blue('Creating important files!\n'));

    this.template('_package.json', `${this.projectNameKebab}/another-package.json`, context);
  }
};