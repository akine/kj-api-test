import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";

export const RadarChart = () => {
  if (typeof Highcharts === "container") {
    HighchartsMore(Highcharts);
  }
  const options = {
    chart: {
      polar: true,
      type: "line",
    },

    title: {
      text: "小城がよく眠れてるか",
    },

    subtitle: {
      text: 'Source: 小城がつけてるouraring',
    },

    yAxis: {
      title: {
        text: '体重'
      }
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017'
      }
    },

    legend: {
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: [{
      name: 'Hoge',
      data: [53, 53, 53, 53, 53, 53, 33, 35]
    }, {
      name: 'Sleep',
      data: [49, 64, 74, 85, 20, 32, 21, 44]
    }, {
      name: 'Documental',
      data: [44, 77, 16, 11, 85, 27, 32, 37]
    }, {
      name: 'Null',
      data: [null, null, 79, 12, 12, 22, 30, 37]
    }, {
      name: 'Other',
      data: [81, 85, 54, 48, 41, 16, 44, 11]
    }],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default RadarChart;
