import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addCredential, getCredential, listCredentials } from './utils/storage.js';

yargs(hideBin(process.argv))
  .command('add', 'Add a new credential', (yargs) => 
    {
      return yargs
      .option('site', { type: 'string', demandOption: true })
      .option('username', { type: 'string', demandOption: true })
      .option('password', { type: 'string', demandOption: true });
    }, (argv) => {
    addCredential(argv.site, argv.username, argv.password);
  })

  .command('get', 'Get stored credential', (yargs) => 
  {
    return yargs.option('site', { type: 'string', demandOption: true });
  }, (argv) => {
    getCredential(argv.site);
  })

  .command('list', 'List all stored credentials', () => {}, () => 
  {
    listCredentials();
  })

  .help()
  .parse();