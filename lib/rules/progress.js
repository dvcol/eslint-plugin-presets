const ora = require('ora');
const chalk = require('chalk');

const start = Date.now();
const rootPath = `${process.cwd()}/`;
const spinner = ora();

let files = 0;
let bindExit = false;

const exitCallback = exitCode => {
  const elapsed = chalk.blue((Date.now() - start) / 1000);
  const nbFiles = chalk.blue(files);
  if (exitCode === 0) {
    spinner.succeed(`Lint ${chalk.green('finished')} after processing '${nbFiles}' files in '${elapsed}' seconds.`);
  } else {
    spinner.fail(`Lint ${chalk.red('failed')} after processing '${nbFiles}' files in '${elapsed}' seconds.`);
  }
};

const create = context => {
  files += 1;
  if (!bindExit) {
    process.on('exit', exitCallback);
    bindExit = true;
  }

  spinner.text = `${chalk.blue('Processing')}: ${chalk.whiteBright(context.getFilename().replace(rootPath, ''))} \n`;
  spinner.render();

  return {};
};

const progress = {
  name: __filename,
  meta: {
    type: 'layout',
    description: 'Print progress indicator while linting.',
    category: 'Layout & Formatting',
    url: 'https://github.com/dvcol/eslint-plugin-dvcol',
    schema: [],
  },
  create,
};

module.exports = progress;
