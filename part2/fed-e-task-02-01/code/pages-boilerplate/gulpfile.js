// 实现这个项目的构建任务
const {src, dest, series, parallel, watch} = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();
const del = require('del');
const browserSync = require('browser-sync');
const bs = browserSync.create()
const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
}
let config = {
    build: {
        src: 'src',
        public: 'public',
        dist: 'dist',
        temp: 'temp',
        path: {
            styles: 'assets/styles/*.scss',
            scripts: 'assets/scripts/*.js',
            pages: '**/*.html',
            images: 'assets/images/**',
            fonts: 'assets/fonts/**',
        }
    },
    data
}
// 删除文件 插件 del
const clean = () => {
    return del(['dist', 'temp'])
}
// 读取scss 转化为css 并输出至temp目录 并在监听到样式变化并更新浏览器
const styles = () => {
    return src(config.build.path.styles, {base: config.build.src, cwd: config.build.src})
        .pipe(plugins.sass({outputStyle: 'expanded'})) //转化为css
        .pipe(dest(config.build.temp))
        .pipe(bs.reload({ stream: true }))
}

// 读取js 转化为降级es5 并输出至temp目录 并在监听到js变化并更新浏览器
const scripts = () => {
    return src(config.build.path.scripts, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.babel({ presets: ['@babel/preset-env']})) // 转化为es5
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

// 读取html 传入数据，关掉缓存 并输出至temp目录 并在监听到html变化并更新浏览器
const pages = () => {
    return src(config.build.path.pages, {base: config.build.src, cwd: config.build.src})
        .pipe(plugins.swig({data: config.data, defaults: { cache: false }})) // 传入数据
        .pipe(dest(config.build.temp))
        .pipe(bs.reload({ stream: true }))
}
// 读取 图片 压缩 输出值dist 目录
const images = () => {
    return src(config.build.path.images, {base: config.build.src, cwd: config.build.src})
        .pipe(plugins.imagemin()) // 压缩图片
        .pipe(dest(config.build.dist))
}
// 读取 字体 输出至dist
const fonts = () => {
    return src(config.build.path.fonts, {base: config.build.src, cwd: config.build.src})
        .pipe(plugins.imagemin())
        .pipe(dest(config.build.dist))
}

// 输出public文件夹
const extra = () => {
    return src('**', {base: config.build.public, cwd: config.build.public})
        .pipe(dest(config.build.dist))
}

// 开启服务， watch监听需热更新文件
const serve = () => {
    watch(config.build.path.styles, {cwd: config.build.src}, styles)
    watch(config.build.path.scripts, {cwd: config.build.src}, scripts)
    watch(config.build.path.pages, {cwd: config.build.src}, pages)
    watch([
        config.build.path.images,
        config.build.path.fonts
    ], 
    {cwd: config.build.src},
    bs.reload)
    bs.init({
        notify: false, //是否开启提示
        server: {
            baseDir: [config.build.temp, config.build.src, config.build.public], // 设置根目录
            routes: {
                '/node_modules': 'node_modules' // 重定向路径 优先级高于baseDir
            }
        },
        port: 2090, // 指定端口号
        open: true, // 自动打开浏览器
        // files: 'temp/**'
    })
}

// 使用useref对文件进行引用，在使用压缩插件对输出至temp临时目录文件进行压缩
const useref = () => {
    return src('temp/**/*.html', { base: config.build.temp})
        .pipe(plugins.useref({searchPath: [config.build.temp, '.']}))
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/, plugins.htmlmin( {
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
        } )))
        .pipe( dest('dist') )
}

// 编译 并行执行需要编译文件
const complie = parallel(styles, scripts, pages);
// 打包 将编译后文件进行压缩处理，并打包到dist目录
const build = series(clean ,parallel(series(complie, useref), extra, images, fonts));
// 启动服务器
const start = series(complie, serve);
module.exports = {
    build,
    clean,
    serve,
    start
}