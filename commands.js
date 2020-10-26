const program = require('commander');
const { prompt } = require('inquirer');
const { addCustomer, findCustomer } = require('./index');

// Customer questions
const questions = [
  {
    type: 'input',
    name: 'firstname',
    message: 'Customer First Name: ',
  },
  {
    type: 'input',
    name: 'lastname',
    message: 'Customer Last Name: ',
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Customer Phone Number: ',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Customer Email Adress: ',
  },
];

program.version('1.0.0').description('Client Management System');

program
  .command('add')
  .alias('a')
  .description('Add a customer')
  .action(() => {
    prompt(questions).then((answers) => addCustomer(answers));
  });

program
  .command('find <name>')
  .alias('f')
  .description('Find a customer')
  .action((name) => {
    findCustomer(name);
  });

program.parse(process.argv);
