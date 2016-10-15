/*=====================================================================
 * 配置说明:
 *
 * 监听文件: 选择你需要监听的文件, 已经有了对应的demo写法(Glob/正则)
 * 目录规范: 提供默认demo写法
 * 配置data:
 *    name  --项目名
 *    path  --静态资源目录
 *    viewType  view--单页应用, page--多页应用
 *    framework  可配置项 jquery,angular,vue,(react)
 * 依赖关系:
 *    基于整个系统,自己的开发模块,定义依赖关系即可
 *    基于整个系统,属于第三包的,请指定打包顺序
 *    基于单个页面,定义依赖关系,通过allInOne打包
 *
 *====================================================================*/
var yhtml5Data = {
    version: 1.2,
    name: "yhtml5",
    viewType: "page",
    domain: ".",
    path: "/static",
    framework: "jquery",
    isStart: false
}
console.log('Powerd by YHTML5-Seed, enjoying yourself...')
/************************* Project Setting *****************************/
fis.set('project.md5Length', 7);
fis.set('project.md5Connector ', '.');
fis.set('project.name', 'yhtml5');
fis.set('project.static', '/static');
fis.set('project.ignore', ['*.test.*', '*.psd', '.git/**', '/**/demo.*']);
fis.set('project.files', [
    'fis-conf.js', 'index.html', '/htmlElement.html', 'map.json',
    '/components/**', '/server/*', '/' + yhtml5Data.viewType + '/**',
    '/bower_components/bootstrap/dist/**/bootstrap.min.{css,js}',
    '/bower_components/jquery/dist/jquery.min.js',
    '/bower_components/fullpage.js/dist/jquery.fullpage.min.{css,js}',
    '/bower_components/echarts/dist/echarts.min.js'
]);

/************************* Directory Standard *****************************/
fis.match('/bower_components/(**)', {
    release: '/vendor/$1'
});
fis.match('/components/**', {
    release: '/vendor/$0'
});
if (yhtml5Data.viewType === 'page') {
    fis.match('/page/(*.html)', {
        release: '/$1'
    })
    console.log('PG Mode...')
}
if (yhtml5Data.isStart === true) {
    fis.match('/page/start/(index.html)', {
        release: '/$1'
    })
    console.log('release start.html...')
}
fis.match('/**/(*.design.*)', {
    release: '/vendor/design/$1'
});
fis.match('/{map.json,fis-conf.*}', {
    release: '/config/$0'
});
fis.match('/pkg/page/(**)', {
    release: '${project.static}/$1'
});
fis.match('/{view,components,bower_components,page}/**/(*.{png,gif,jpg,jpeg,svg})', {
    release: '${project.static}/img/$1'
});
fis.match('/**/({glyphicons-halflings-regular.*,iconfont.{eot, svg, ttf, woff}})', {
    release: '${project.static}/iconfont/$1',
    url: '/iconfont/$1',
    domain: '.'
});
/************************* Package Standard *****************************/
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true,
        allInOne: true,
    })
});
/*** public js ***/
fis.match('/{server,components/jquery,bower_components}/{*,**/*}.js', {
    packTo: '${project.static}/yhtml5.js'
});
fis.match('/server/author.js', {
    packOrder: -999
});
fis.match('/bower_components/jquery/dist/*', {
    packOrder: -299
});
fis.match('/bower_components/bootstrap/dist/js/*', {
    packOrder: -297
});
fis.match('/bower_components/fullpage.js/dist/jquery.fullpage.min.js', {
    packOrder: -295
});
fis.match('/server/console.js', {
    packOrder: 2
});

/*** public css ***/
fis.match('/{server,components,bower_components}/{*,**/*}.css', {
    packTo: '${project.static}/yhtml5.css'
});
fis.match('/server/author.css', {
    packOrder: -999
});
fis.match('/bower_components/bootstrap/dist/css/bootstrap.min.css', {
    packOrder: -299
});
fis.match('/bower_components/fullpage.js/dist/jquery.fullpage.min.css', {
    packOrder: -89
});
fis.match('/components/iconfont/iconfont.css', {
    packOrder: -99
});
/************************* Pro Standard *****************************/

fis.media('pro')
    .match('/{pkg/page/**,static/**,{components,bower_components,page,view}/**/*.{png,gif,jpg,jpeg,eot,ttf,woff,woff2,svg}}', {
        useHash: true,
        domain: '.'
    }, console.log("building pro..."))
    .match('/{index,{view,page,components}/{*,**/*}}.html', {
        optimizer: function (content) {
            return content.replace(/<!--([\s\S]*?)-->/g, '');
        }
    })
    .match('/{' + yhtml5Data.viewType + ',components}/{*,**/*}.css', {
        preprocessor: fis.plugin('cssprefixer', {
            "browsers": ["FireFox > 1", "Chrome > 1", "ie >= 8"],
            "cascade": true
        })
    })
    .match('/{' + yhtml5Data.viewType + ',components}/{*,**/*}.html', {
        optimizer: fis.plugin('htmlminify', {
            removeComments: true,
            collapseWhitespace: true,
        })
    })
    .match('/{' + yhtml5Data.viewType + ',components}/{*,**/*}.css', {
        optimizer: fis.plugin('clean-css', {
            // target:false
            // keepSpecialComments:0
            // rebase:false
            // keepBreaks: true,
            // compatibility:'ie7'
        })
    })
    .match('/{components,view}/**/init.js', {
        optimizer: fis.plugin('htmlminify', {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
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