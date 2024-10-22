const { src, dest, parallel, watch } = require('gulp');
const rename = require('gulp-rename');
const minifyJS = require('gulp-uglify');
const minifyCSS = require('gulp-uglifycss');
const browserSync = require('browser-sync').create();

// Tarefas
function html() {
  return src('src/**/*.html') // Mudança: Captura todos os arquivos .html, inclusive em subpastas
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

function javaScript() {
  return src('src/js/*.js')
    .pipe(minifyJS())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/js/'))
    .pipe(browserSync.stream());
}

function css() {
  return src('src/css/**/*.css') // Mudança: Captura todos os arquivos .css, inclusive em subpastas
    .pipe(minifyCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream());
}

function assets() {
  return src('src/assets/**/*')
    .pipe(dest('dist/assets/'))
    .pipe(browserSync.stream());
}

// Iniciar o servidor
function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });

  // Monitorar arquivos e executar tarefas
  watch('src/**/*.html', html); // Mudança: Monitora todos os .html
  watch('src/js/*.js', javaScript);
  watch('src/css/**/*.css', css); // Mudança: Monitora todos os .css
}

// Tarefa padrão
exports.default = parallel(html, javaScript, css, assets);

// Tarefa de monitoramento com live reload
exports.watch = serve;
