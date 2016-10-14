/************************* Project Setting *****************************/
fis.set('project.md5Length', 7);
fis.set('project.md5Connector ', '.');
fis.set('project.name', 'yhtml5');
fis.set('project.static', '/static');
fis.set('project.ignore', ['*.test.*', '*.psd', '.git/**', '/**/demo.*','/dist/**']);
fis.set('project.files', [
    'fis-conf.js', 'index.html', 'map.json',
    '/components/**', '/server/*', '/view/**',
    '/bower_components/bootstrap/dist/**/{bootstrap{.,.min.}{css,js},glyphicons-halflings-regular.*}',
    '/bower_components/fullpage.js/dist/jquery.fullpage{.,.min.}{css,js}',
    '/bower_components/jquery/dist/jquery{.,.min.}{css,js}',
    '/bower_components/echarts/dist/{echarts,}{.,.min.}{css,js}'
]);
/************************* 目录规范 *****************************/

fis.match('/bower_components/{bootstrap,echarts,fullpage.js,jquery}/dist/(**)', {
    release: '/vendor/bootstrap/$1'
});
fis.match('/components/**', {
    release: '/vendor/$0'
});
fis.match('/{components,bower_components,view}/**/(*.{png,gif,jpg,jpeg,svg})', {
    release: '${project.static}/img/$1'
});
fis.match('/**/({glyphicons-halflings-regular.*,iconfont.{eot, svg, ttf, woff}})', {
    release: '${project.static}/iconfont/$1',
    url: '/iconfont/$1'
});
fis.match('/{map.json,fis-conf.*,bower.json}', {
    release: '/config/$0'
});
fis.match('/server/(**)', {
    release: '/config/$1'
});
/************************* 打包规范 *****************************/
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    })
});
/*** public resourse ***/
fis.match('/bower_components/{bootstrap/dist/js/bootstrap,fullpage.js/dist/jquery.fullpage,jquery/dist/jquery,echarts/dist/echarts}.js', {
    packTo: '${project.static}/yhtml5.js',
});
fis.match('/bower_components/jquery/dist/jquery.js', {
    packOrder: -99
});
fis.match('/bower_components/fullpage.js/dist/jquery.fullpage.js', {
    packOrder: -97
});
fis.match('/bower_components/bootstrap/dist/js/bootstrap.js', {
    packOrder: -95
});
fis.match('/bower_components/echarts/dist/echarts.js', {
    packOrder: -89
});
fis.match('/bower_components/{bootstrap/dist/css/bootstrap,fullpage.js/dist/jquery.fullpage}.min.css', {
    packTo: '${project.static}/yhtml5.css'
});
fis.match('/bower_components/bootstrap/dist/css/bootstrap.min.css', {
    packOrder: -95
});
fis.match('/bower_components/fullpage.js/dist/jquery.fullpage.min.css', {
    packOrder: -89
});
/*** custom resourse ***/
fis.match('{/server/author.js, /components/**/*.js}', {
    packTo: '${project.static}/index.js'
});
fis.match('/server/author.js', {
    packOrder: -89
});
fis.match('/components/js/chart.js', {
    packOrder: -78
});
fis.match('/components/js/init.js', {
    packOrder: -77
});
fis.match('{/server/author.css,/components/**/*.css}', {
    packTo: '${project.static}/index.css'
});
fis.match('/server/author.css', {
    packOrder: -89
});
fis.match('/components/iconfont/iconfont.css', {
    packOrder: -79
});
fis.match('/components/css/main.css', {
    packOrder: -77
});
fis.match('/components/css/base.css', {
    packOrder: -75
});
/************************* Pro规范 *****************************/

fis.media('pro')
    .match('/{static/**,{components,bower_components,view}/**/*.{png,gif,jpg,jpeg,eot,ttf,woff,woff2,svg}}', {
        useHash: true,
        domain: '.'
    })
    //html 去除注释
    .match('{/index.html,/view/*.html}', {
        optimizer: function (content) {
            return content.replace(/<!--([\s\S]*?)-->/g, '');
        }
    })
    //css 自动补充兼容性 https://github.com/ai/browserslist#queries
    .match('/components/**/*.css', {
        preprocessor: fis.plugin('cssprefixer', {
            "browsers": ["FireFox > 1", "Chrome > 1", "ie >= 8"],
            "cascade": true
        })
    })
    .match('/{{components,view}/**/*.{html,css},index.html}', {
        optimizer: fis.plugin('htmlminify', {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        })
    })
    .match('/{components,view}/**/init.js', {
        optimizer: fis.plugin('htmlminify', {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true
        })
    })
// 自动雪碧图
// .match('::package', {
//     packager: fis.plugin('map'),
//     spriter: fis.plugin('csssprites', {
//         layout: 'matrix',
//         margin: '15'
//     })
// })
// .match('*.css', {
//     optimizer: fis.plugin('clean-css', {
//         'keepBreaks': false,
//         useSprite: true
//     })
// })
// .match('*.js', {
//     optimizer: fis.plugin('uglify-js', {
//         mangle: {
//             expect: ['require', 'define', 'some string']
//         }
//     })
// })