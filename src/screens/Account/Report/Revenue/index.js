import React, {useEffect, useState} from 'react';
import {processColor, View} from 'react-native';
import {AppText} from '../../../../components/atoms';
import {container} from '../../../../styles/GlobalStyles';
import {BarChart} from 'react-native-charts-wrapper';
import styles from './styles';
import {trans} from '../../../../utils';
import numeral from 'numeral';
import {Colors} from '../../../../styles';

const Revenue = () => {
  const [legend] = useState({
    enabled: true,
    textSize: 14,
    form: 'SQUARE',
    formSize: 14,
    wordWrapEnabled: false,
  });

  const [data, setData] = useState();

  const [xAxis, setAxis] = useState();

  const [yAxis] = useState({
    left: {
      drawGridLines: true,
      axisMinimum: 1,
    },
    right: {
      enabled: false,
    },
  });

  useEffect(() => {
    const amountArr = [100, 90, 80, 60, 50, 40, 30, 20, 10];
    const valueFormatter = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
    ];

    setData({
      dataSets: [
        {
          values: amountArr,
          label: 'Đơn vị : triệu đồng',
          config: {
            color: processColor(Colors.GREEN_1),
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red'),
            valueFormatter: '#.##',
          },
        },
      ],
      config: {
        barWidth: 0.8,
      },
    });
    setAxis({
      valueFormatter: valueFormatter,
      granularityEnabled: true,
      granularity: 1,
      drawGridLines: false,
      position: 'BOTTOM',
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerChart}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText title style={styles.txtRevenue}>
            {trans('revenue').toUpperCase()}
          </AppText>
          <AppText title style={styles.txtRevenue}>
            {numeral(3420000).format()} đ
          </AppText>
        </View>
        <BarChart
          style={styles.chart}
          data={data}
          xAxis={xAxis}
          yAxis={yAxis}
          animation={{durationY: 1500}}
          legend={legend}
          gridBackgroundColor={processColor('#ffffff')}
          visibleRange={{x: {min: 5, max: 5}}}
          drawBarShadow={false}
          drawValueAboveBar={true}
          drawHighlightArrow={false}
          chartDescription={{text: ''}}
          extraOffsets={{bottom: 10}}
        />
      </View>
      <View style={{flex: 1}} />
    </View>
  );
};

export default Revenue;
