;/*!server/author.js*/
/*=====================================================================
 * Author:Kyle && qichao
 * Website:http://yhtml5.com
 * Gihub:https://github.com/yhtml5
 * Description: We work hard to contribute our work back
 *              to the web, mobile, server, & new technology.
 *====================================================================*/
 'use strict';
;/*!components/js/fn.js*/
/*
 * @require ../../../server/author.js
 */
/***************  fn  ***************/
function initGithubCharts() {
    var t = echarts.init($("#github-line-chart")[0]);
    t.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['HTML5', 'CSS3', 'JavaScript', 'brower', 'NodeJS', 'Debug Tools', 'Git/SVN', 'Framework', 'HTTP', 'SEO', 'Grunt/Gulp/FIS3', 'bower/npm', 'Performance']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '40%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 1, name: 'HTML5', selected: true},
                    {value: 1, name: 'CSS3'},
                    {value: 1, name: 'JavaScript'}
                ]
            },
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],

                data: [
                    {value: 1, name: 'Brower'},
                    {value: 3, name: 'NodeJS'},
                    {value: 1, name: 'Debug Tools'},
                    {value: 1, name: 'Git/SVN'},
                    {value: 3, name: 'Framework'},
                    {value: 1, name: 'HTTP'},
                    {value: 1, name: 'SEO'},
                    {value: 1, name: 'Grunt/Gulp/FIS3'},
                    {value: 1, name: 'bower/npm'},
                    {value: 1, name: 'MySQL/MongoDB'},
                    {value: 3, name: 'Performance'}

                ]
            }
        ]
    }), $(window).resize(function () {
        t.resize()
    })
}
function performanceAnalysis() {
    var t = echarts.init($("#performance-analysis")[0]);
    t.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Stalled/Blocking', 'Proxy Negotiation', 'DNS', 'Initial Connection/Connecting', 'SSL', 'queueing', 'Request Sent/Sending', 'TTFB', 'Content Download']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['jubaopay-old', 'jubaobar', 'facebook', 'jubaopay-new']
        },
        series: [
            {
                name: 'Stalled/Blocking',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [20, 20, 1, 20]
            },
            {
                name: 'Proxy Negotiation',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [20, 20, 1, 20]
            },
            {
                name: 'DNS',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [1000, 800, 300, 400]
            },
            {
                name: 'Initial Connection/Connecting',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [50, 50, 20, 40]
            },
            {
                name: 'SSL',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [200, 200, 100, 100]
            },
            {
                name: 'queueing',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [50, 50, 30, 20]
            },

            {
                name: 'Request Sent/Sending',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [1000, 600, 200, 100]
            },
            {
                name: 'TTFB',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [100, 100, 50, 50]
            },
            {
                name: 'Content Download',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [7000, 4000, 2000, 500]
            }
        ]
    }), $(window).resize(function () {
        t.resize()
    })
}

function drawCanvasOne() {
    var t = document.getElementById("wave"),
        e = echarts.init(t),
        i = e.getZr(),
        a = e.getWidth(),
        c = e.getHeight(),
        o = new echarts.graphic.Group;
    i.add(o);
    var n = 3;
    800 > a && (n = 2);
    for (var r = 0; 3 > r; r++) {
        for (var s = [], l = 0; n + 1 >= l; l++) {
            var h = c / 10 * r + c / 6,
                d = Math.random() * c / 8 + h,
                g = c - Math.random() * c / 8 - h,
                m = [
                    [2 * l * a / n / 2, r % 2 ? d : g],
                    [(2 * l + 1) * a / n / 2, r % 2 ? g : d]
                ];
            s.push(m[0], m[1])
        }
        var u = new echarts.graphic.Polyline({
                shape: {
                    points: s,
                    smooth: .4
                },
                style: {
                    stroke: "#fff",
                    opacity: 1 / (r + 1),
                    lineWidth: 1.2 / (r + 1) + .8
                },
                silent: !0,
                position: [-r * a / 8, 35 * -(r - .5)]
            }),
            y = new echarts.graphic.Rect({
                shape: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: c
                },
                position: [r * a / 8, 0]
            });
        o.add(u), y.animateTo({
            shape: {
                width: a
            }
        }, 2e3, 800 * Math.random()), u.setClipPath(y), n += 1
    }
    $(window).on("resize", function () {
        var t = e.getWidth(),
            i = e.getHeight();
        e.resize();
        var a = e.getWidth(),
            c = e.getHeight();
        y.setShape({
            width: a,
            height: c
        });
        var n = a / t,
            r = c / i;
        o.eachChild(function (t) {
            t.position[0] *= n, t.position[1] *= r, t.shape.points.forEach(function (t) {
                t[0] *= n, t[1] *= r
            }), t.dirty(!0)
        })
    })
}
var gb = {
    colors: {
        white: "#FFF",
        whiteLight: "rgba(255, 255, 255, 0.2)",
        whiteLighter: "rgba(255, 255, 255, 0.1)",
        primary: "#556fb5",
        primaryLight: "#889acb"
    },
    homeData: [0, 0, 0, 0, 200, 449, 675, 723, 724, 655, 792, 846, 840, 927, 687, 1148, 1172, 1332, 1370, 1730, 1786, 1820, 1920, 3200, 2200, 2400]
};
;/*!components/js/do.js*/
/*
 * @require components/js/fn.js
 * @require shape-shifter.js
 */
/***************  do  ***************/
$(function () {
    document.getElementById('nav-index').className = 'active';
    var defaultEle = $('.navbar-default');
    defaultEle.addClass('navbar-bg');
    $(document).ready(function () {
        drawCanvasOne();
        setInterval(function () {
            drawCanvasOne()
        }, 4000);
        $('body').click(function () {
            drawCanvasOne()
        });
        initGithubCharts();
        performanceAnalysis();
        $('#fullpage').fullpage({
            navigation: true,
            resize: true,
            sectionsColor: ['#fff', '#f0f4fa', '#fff', '#fff', '#f0f4fa', '#fff', '#f0f4fa', '#fff', '#f0f4fa'],
            onLeave: function (index, nextIndex, direction) {
                if ($('.navbar-toggle').attr('aria-expanded') === 'true') {
                    $('.navbar-toggle').trigger('click');
                }
                $('.dropdown-toggle').each(function () {
                    var $toggleBtn = $(this);
                    if ($toggleBtn.attr('aria-expanded') === 'true') {
                        $toggleBtn.parent().removeClass('open');
                        $toggleBtn.trigger('click');
                    }
                });
                if (nextIndex === 4) {
                    $('.section-four').find('.text-wrap').addClass('text-wrap-animate')
                        .end().find('.device-wrap').addClass('device-wrap-animate');
                }
                defaultEle.toggleClass('navbar-bg', nextIndex === 1);
            }
        });
        var container = $('.container-five');
        container.on('mouseenter', 'img', function () {
            var target = $(this);
            if (target.hasClass('cur-item')) {
                return;
            }
            var index = +target.data('index');
            container.find('.cur-item').removeClass('cur-item');
            target.addClass('cur-item');
        });
    });
});




;/*!server/console.js*/
/*
 * @require server/author.js
 */
console.log("%c 凡伟科技 %c Copyright \xa9 2010-%s", 'font-family: "microsoft yahei", Helvetica, Arial, sans-serif;font-size:64px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;', "font-size:12px;color:#999999;", (new Date).getFullYear())
console.log("%c " + "We work hard to contribute our work back to the web, mobile, big data, && new Front-End technology.", "color:#333;font-size:16px;margin:4px;");