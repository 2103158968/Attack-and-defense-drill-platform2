/**
 *  echarts tooltip 自动轮播
 *  @param myChart   //初始化echarts的实例
 *  @param option//指定图表的数据
 *  @param time      //轮播间隔时长
 */
export function autoHover(myChart, option, time) {

    let app = {
        currentIndex: -1
    };
    var timeTicket = setInterval(function () {
        let dataLen = option.datas.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,//要展示的series数据索引
            dataIndex: app.currentIndex
        });
        app.currentIndex = (app.currentIndex + 1) % dataLen;
        //console.log(app.currentIndex);
        // 高亮当前图形
        myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: app.currentIndex
        });
        // 显示 tooltip
        myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: app.currentIndex
        });
    }, time);

    myChart.on("mouseover", function (params) {
        //停止并显示当前的高亮和tooltip
        clearInterval(timeTicket);
        myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0
        });
        myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: params.dataIndex
        });
        myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: params.dataIndex
        });
    });
    // 鼠标移出后继续
    myChart.on("mouseout", function () {
        timeTicket && clearInterval(timeTicket);
        timeTicket = setInterval(function () {
            // let dataLen =option.series[0].data.length;
            let dataLen = option.datas.length;
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            app.currentIndex = (app.currentIndex + 1) % dataLen;
            //console.log(app.currentIndex);
            // 高亮当前图形
            myChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            // 显示 tooltip
            myChart.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });

        }, time);
    });
}
export default {
    autoHover
}