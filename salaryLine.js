var myChart = echarts.init(document.getElementById('main'));
option = {
    // 为图表配置标题和副标题
    title: {
        text: '月度薪酬折线图、柱状图',
        subtext: '副标题'
    },
    // 配置提示信息 begin
    tooltip: {
        trigger: 'axis',
        confine: true,
        // confine是否将 tooltip 框限制在图表的区域内。
        enterable: true,
        // enterable：鼠标是否可进入提示框浮层中，默认false，如需详情内交互、如添加链接、按钮，可设置为 true。
        triggerOn: 'click',
        //triggerOn:将tooltip的Hover事件改为点击事件
        formatter: function (params, ticket, callback) {
            //              数据集 异步回调标识 异步回调
            debugger
            var tipString = params[0].axisValue + "<br />";//周六
            var key = "value";
            // 排序 
            params.sort(function (obj1, obj2) {
                var val1 = obj1[key];
                var val2 = obj2[key];
                if (val1 < val2) {
                    return 1;
                } else if
                    (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }
            })

            var indexColor;
            for (var i = 0, length = params.length; i < length; i++) {
                indexColor = params[i].color;
                debugger;
                tipString += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:' + indexColor + '"></span>';
                tipString += '<span data-type ="lineTip" data-val=' + params[i].value + '>' + params[i].seriesName + '：' + params[i].value + '</span><br />';
            }
            return tipString;
        }
    },
    // 配置提示信息 end

    // 【图例组件】展现不同系列的标记(symbol)(颜色和名字)。可以通过点击图例控制哪些系列不显示。
    legend: {
        /*data: ['2020年', '2019年', '2018年'],
        orient: 'vertical',
        x: 'center',      //可设定图例在左、右、居中
        y: 'top',     //可设定图例在上、下、居中
        padding: [0, 50, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]*/
         selected: {
            '2015年': false, '2016年': false, '2017年': false
        } 
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    // toolbox的功能是折线图和柱状图切换
    calculable: true,
    xAxis: [{
        // 坐标轴类型。
        type: 'category',
        // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
        boundaryGap: false,
        //  数据数组项通常为具体的数据项。
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
        type: 'value',
        axisLabel: { formatter: '{value} °C' }
    }],
    // 系列列表。每个系列通过 type 决定自己的图表类型https://www.echartsjs.com/zh/option.html#series
    series: [
        {
            name: '2020年',
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10, 21, 23, 25, 13, 15],
            // // 图表标注
            // markPoint: { 
            //     data: [{type: 'max',name: '最大值'},
            //             {type: 'min', name: '最小值' }] },
            // // 图表标线
            // markLine: { 
            //     data: [{type:'average', name: '平均值' }] 
            //     } 
        },
        {
            name: '2019年',
            type: 'line',
            data: [12, 32, 22, 15, 23, 22, 20, 12, 13, 10, 22, 19],
            markPoint: { data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }] },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
            // https://www.echartsjs.com/zh/option.html#series-line.markLine
        },
        {
            name: '2018年',
            type: 'line',
            data: [32, 37, 23, 16, 13, 36, 29, 32, 23, 40, 28, 39],
            markPoint: { data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }] },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
        },
        {
            name: '2017年',
            type: 'line',
            data: [32,  13, 36, 29, 32, 23, 40, 28, 23, 22, 13, 39],
            markPoint: { data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }] },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
        },
        {
            name: '2016年',
            type: 'line',
            data: [32, 37, 23, 16, 22, 15, 23, 22, 13, 10, 18, 39],
            markPoint: { data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }] },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
        },
        {
            name: '2015年',
            type: 'line',
            data: [12, 27, 33, 16, 13, 26, 19, 22, 23, 20, 28, 29],
            markPoint: { data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }] },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
        }]

};
// Option结束
myChart.setOption(option)
myChart.on('mousemove', function (params) {
    var val = params.value;
    $("[data-val='" + val + "']").attr("style", "font-size:20px;");
});

/* legend 下拉列表多选*/
$('#sel_search_orderstatus').multiselect({
    onChange: function (option, checked, select) {
        var name = $(option).text();
        console.log("option",option);
        console.log("checked",checked);
        console.log("select",select);

        myChart.dispatchAction({
            type: 'legendToggleSelect',
            name: name
        });
    }
});