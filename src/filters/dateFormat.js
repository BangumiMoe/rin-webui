import moment from 'moment';

// TODO auto setup locale
moment.locale('zh-cn');

function MomentForamt(attr) {
  return moment(attr).calendar(null, {
    lastDay: '昨天 HH时',
    sameDay: '今天 HH时',
    nextDay: '明日 HH时',
    lastWeek: 'dddd HH时',
    nextWeek: 'dddd HH时',
    sameElse: 'L',
  });
}

module.exports = MomentForamt;
