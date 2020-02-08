/**
 * @description Prevent using 'npm' as package manager.
 */
if (!process.env.npm_execpath.includes('yarn')) {
    console.error('You must use Yarn to install dependencies:');
    console.error('  $ yarn');
    process.exit(1);
}
