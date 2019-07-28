const gulp = require('gulp');
const pug = require('gulp-pug');
const electron = require('electron-connect').server.create();
const packager = require('electron-packager');
const electronInstaller = require('electron-winstaller');

const config = require('./config.json')

const packageOption = {
  dir: './',
  appVersion: config.APP_VERSION,
  arch: 'x64',
  asar: true,
  buildVersion: config.APP_VERSION,
  name: config.APP_NAME,
  overwrite: true,
  out: './dist'
}

function pugCompile() {
  return gulp.src(
    ['./pug/browser.pug']
  )
  .pipe(pug({
    pretty: true,
    locals: {
      'APP_NAME': config.APP_NAME,
      'WEBVIEW_URL': config.WEBVIEW_URL,
    }
  }))
  .pipe(gulp.dest('./'))
};

function electronStart() {
  return electron.start();
};

function buildMac() {
  return packager({
    ...packageOption,
    icon: './icon.icns',
    platform: 'darwin',
  });
}

function buildWin() {
  return packager({
    ...packageOption,
    icon: './icon.ico',
    platform: 'win32',
    appCopyright: '',
  })
    .then(() => {
      resultPromise = electronInstaller.createWindowsInstaller({
        appDirectory: `./dist/${config.APP_NAME}-win32-x64`,
        outputDirectory: `./dist/windows/${config.APP_NAME}-installer64`,
        authors: 'My App Inc.',
        name: config.APP_NAME,
        exe: `${config.APP_NAME}.exe`,
        setupExe: `${config.APP_NAME}.exe`
      });
      resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
    });
}

exports.start = gulp.series(pugCompile, electronStart);
exports.build = gulp.series(pugCompile, buildMac, buildWin);
exports.buildMac = buildMac;
exports.buildWin = buildWin;
