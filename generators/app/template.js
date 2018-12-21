/**
 * Template function for copying files
 **/
module.exports = function template(input, output, context) {
  this.fs.copyTpl(
    this.templatePath(input),
    this.destinationPath(output),
    context
  );
};