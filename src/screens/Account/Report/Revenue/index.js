import React, {useEffect, useState} from 'react';
import {processColor, View} from 'react-native';
import {AppLoading, AppText} from '../../../../components/atoms';
import {BarChart} from 'react-native-charts-wrapper';
import styles from './styles';
import {Const, trans} from '../../../../utils';
import numeral from 'numeral';
import {Colors} from '../../../../styles';
import {get} from '../../../../services/ServiceHandle';
import moment from 'moment';
import PeriodModal from '../component/PeriodModal';
import SimpleToast from 'react-native-simple-toast';
import {sum} from 'lodash';

const Revenue = () => {
  const [startDate, setStartDate] = useState(
    moment().startOf('month').format(),
  );

  const [type, setType] = useState('date');

  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const params = {
      startDate: startDate,
      endDate: moment().format(),
      type,
    };
    get(Const.API.baseURL + Const.API.Revenue, params).then(res => {
      if (res.ok) {
        const amountArr = res.data.data
          .map(elm => {
            return Number(elm.value) / 1000;
          })
          .reverse();
        const timeArr = res.data.data
          .map(elm => {
            return elm.date;
          })
          .reverse();
        setTotalPrice(sum(amountArr) * 1000);
        console.log('amountArr', amountArr);

        setData({
          dataSets: [
            {
              values: amountArr,
              label: 'Đơn vị : trăm nghìn đồng',
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
          valueFormatter: timeArr,
          granularityEnabled: true,
          granularity: 1,
          drawGridLines: false,
          position: 'BOTTOM',
        });
        setLoading(false);
      } else {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  }, [startDate, type]);

  return (
    <View style={styles.container}>
      <AppLoading isVisible={loading} />
      <View style={{marginBottom: 12, alignSelf: 'center'}}>
        <PeriodModal
          onPress={time => {
            setStartDate(time.date);
            setType(time.type);
          }}
        />
      </View>
      <View style={styles.containerChart}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText title style={styles.txtRevenue}>
            {trans('revenue').toUpperCase()}
          </AppText>
          <AppText title style={styles.txtRevenue}>
            {numeral(totalPrice).format()} đ
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
