const mix = require('laravel-mix');
const { exec } = require('child_process');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
  resolve: {
    alias: {
      ziggy: path.resolve('vendor/tightenco/ziggy/dist'),
    },
  },
});

mix
  .extend('ziggy', function() {
    if (mix.inProduction()) return;

    const command = () => exec(
      'php artisan ziggy:generate resources/js/ziggy.js',
      (error, stdout, stderr) => console.log(stdout)
    );

    command();

    if (Mix.isWatching()) {
      ((require('chokidar')).watch(['routes/**/*.php', 'config/ziggy.php']))
        .on('change', (path) => {
          console.log(`${path} changed...`);
          command();
        });
    }
  })
  .options({
    processCssUrls: false,
  })
  .ziggy()
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css');
//  .vue() - vue-loader package required
