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
      },
      {
        type: 'input',
        name: 'author',
        message: `What is your full name?`,
        default: 'Drew Stein'
      },
      {
        type: 'input',
        name: 'email',
        message: `What is your email?`,
        default: 'me@example.io'
      }
    ];

    return this.prompt(prompts)
      .then(answers => {
        var { projectName, author, email } = answers;

        self.author = author;
        self.email = email;
        self.projectName = projectName;
        self.projectNameKebab = _kebabCase(projectName.toLowerCase());
      });
  }

  writing() {
    const { projectName, projectNameKebab, email, author } = this;

    this.log(chalk.gray('\nCreating your new OXY-GEN App: ')
      + chalk.magenta(projectName) + chalk.gray('...\n'));

    const context = { projectName, projectNameKebab, email, author };

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

      execSync(`create-react-app ${projectNameKebab}`);
    }
    catch(err) {
      this.log(chalk.red(err));
      return;
    }

    try {
      this.log(chalk.blue('Installing Electron and other dependencies...\n'));

      const { yarn } = this.options;

      if(yarn) {
        execSync(`cd ${projectNameKebab}; yarn add --dev foreman electron-builder electron`);
        execSync(`cd ${projectNameKebab}; yarn add node-sass typeface-roboto`);
      } else {
        execSync(`cd ${projectNameKebab}; npm i --save-dev foreman electron-builder electron`);
        execSync(`cd ${projectNameKebab}; npm i --save node-sass typeface-roboto`);
      }
    } catch(err) {
      this.log(chalk.red(err));
      return;
    }

    try {
      this.log(chalk.yellow('\nWhen prompted to overwrite files, enter `y` to accept.\n'));

      this.log(chalk.blue('Adding scripts and electron config to package.json...\n'));

      let packageJson = `${projectNameKebab}/package.json`;

      this.fs.copy(packageJson, packageJson, {
        process: content => {
          var scriptsRegex = new RegExp(OLD_SCRIPTS, 'g');
          var packageMetaRegex = new RegExp(OLD_META, 'g');

          var newContent = content.toString().replace(scriptsRegex, NEW_SCRIPTS);
          newContent = newContent.replace(packageMetaRegex, NEW_META(projectName, projectNameKebab, author));

          return newContent;
        }
      });
    }
    catch(err) {
      this.log(chalk.red(err));
      return;
    }

    try {
      this.log(chalk.blue('Updating public/index.html and public/manifest.json...\n'));

      let indexHtml = `${projectNameKebab}/public/index.html`;
      let manifest = `${projectNameKebab}/public/manifest.json`;

      this.fs.copy(indexHtml, indexHtml, {
        process: content => {
          var nameRegex = new RegExp('React App', 'g');
          var newContent = content.toString().replace(nameRegex, projectName);
          return newContent;
        }
      });

      this.fs.copy(manifest, manifest, {
        process: content => {
          var nameRegex = new RegExp('React App', 'g');
          var descRegex = new RegExp('Create React App Sample', 'g');

          var newContent = content.toString().replace(descRegex, 'Electron App with React and Rust');
          newContent = newContent.replace(nameRegex, projectName);

          return newContent;
        }
      });
    }
    catch(err) {
      this.log(chalk.red(err));
      return;
    }

    this.log(chalk.blue('Overwriting .gitignore and README.md...\n'));

    this.template('_.gitignore', `${projectNameKebab}/.gitignore`, context);
    this.template('_README.md', `${projectNameKebab}/README.md`, context);

    try {
      this.log(chalk.blue('Removing boilerplate src/...\n'));

      execSync(`cd ${projectNameKebab}; rm -rf src/`);
    }
    catch(err) {
      this.log(chalk.red(err));
      return;
    }

    this.log(chalk.blue('Creating Electron and Rust project files...\n'));

    this.template('_Procfile', `${projectNameKebab}/Procfile`, context);
    this.template('_electron-wait-react.js', `${projectNameKebab}/electron-wait-react.js`, context);
    this.template('_Cargo.toml', `${projectNameKebab}/Cargo.toml`, context);
    this.template('public/_electron.js', `${projectNameKebab}/public/electron.js`, context);
    this.template('assets/_icon.icns', `${projectNameKebab}/assets/icon.icns`, context);
    this.template('assets/_icon.ico', `${projectNameKebab}/assets/icon.ico`, context);
    this.template('assets/_icon.png', `${projectNameKebab}/assets/icon.png`, context);

    this.log(chalk.blue('Creating new src/ with speed test example...\n'));

    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath(`${projectNameKebab}/src`)
    );
  }

  install() {
    const { projectNameKebab } = this;

    try {
      this.log(chalk.blue('Installing the project dependencies...\n'));

      const { yarn } = this._options;

      execSync(`cd ${projectNameKebab}; ${yarn ? 'yarn' : 'npm'} install`);
    }
    catch(err) {
      this.log(chalk.red(err));
      return;
    }
  }

  end() {
    const { projectNameKebab } = this;

    try {
      this.log(chalk.blue('Committing the changes with git...\n'));

      execSync(`cd ${projectNameKebab}; git add .; git commit -m 'generated oxy-gen app'`);
    }
    catch(err) {
      this.log(chalk.red(err));
      return;
    }
  }
};