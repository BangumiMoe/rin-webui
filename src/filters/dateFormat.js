/*
 * 日期格式化

 * 使用说明：
 * <p>{{data | date 'yyyy-MM-dd HH:mm'}}</p>   //2015-10-21 16:38
 * <p>{{data | date 'MM-dd'}}</p>   			 //10-21
 * <p>{{data | date 'w'}}</p>   				 //三    //星期三
 * <p>{{data | date 'eM d,yyyy'}}</p>   		 //Oct 10,2015
*/
	var _$encode = function(_map,_content){
	    _content = ''+_content;
	    if (!_map||!_content){
	        return _content||'';
	    }
	    return _content.replace(_map.r,function($1){
	        var _result = _map[!_map.i?$1.toLowerCase():$1];
	        return _result!=null?_result:$1;
	    });
	};
	var dateFormat = (function(){
	    var _map = {i:!0,r:/\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et|lately\b/g},
	        _12cc = ['上午','下午'],
	        _12ec = ['A.M.','P.M.'],
	        _week = ['日','一','二','三','四','五','六'],
	        _cmon = ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
	        _emon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
	    var _fmtnmb = function(_number){
	        _number = parseInt(_number)||0;
	        return (_number<10?'0':'')+_number;
	    };
	    var _fmtclc = function(_hour){
	        return _hour<12?0:1;
	    };
	    var getDate = function(_date,num){
	    	//num = 0，返回当天，= -1 返回昨天，以此类推
			var date = new Date(Date.parse(_date) + (86400000 * num));
			return date.getFullYear() +''+ date.getMonth()+''+date.getDate();
	    }
	    return function(_time,_format,_12time){
	        if (!_time||!_format)
	            return '';
	        _time = new Date(_time);
	        _map.yyyy = _time.getFullYear();
	        _map.yy   = (''+_map.yyyy).substr(2);
	        _map.M    = _time.getMonth()+1;
	        _map.MM   = _fmtnmb(_map.M);
	        _map.eM   = _emon[_map.M-1];
	        _map.cM   = _cmon[_map.M-1];
	        _map.d    = _time.getDate();
	        _map.dd   = _fmtnmb(_map.d);
	        _map.H    = _time.getHours();
	        _map.HH   = _fmtnmb(_map.H);
	        _map.m    = _time.getMinutes();
	        _map.mm   = _fmtnmb(_map.m);
	        _map.s    = _time.getSeconds();
	        _map.ss   = _fmtnmb(_map.s);
	        _map.ms   = _time.getMilliseconds();
	        _map.w    = _week[_time.getDay()];
	        var _cc   = _fmtclc(_map.H);
	        _map.ct   = _12cc[_cc];
	        _map.et   = _12ec[_cc];

	        //判断今天/昨天/前天
	        switch(getDate(_time,0))
	        {
	        	case getDate(new Date(),0):
		        	//今天
		        	_map.lately = '今天';
		        	break;
	        	case getDate(new Date(),-1):
		        	//昨天
		        	_map.lately = '昨天';
		        	break;
	        	case getDate(new Date(),-2):
		        	//前天
		        	_map.lately = '前天';
		        	break;
	        	default:
	        		_format = 'lately';
	        		_map.lately = _map.yyyy+'/'+_map.MM+'/'+_map.dd+' '+_map.HH+':'+_map.mm;
	        }

	        if (!!_12time){
	            _map.H = _map.H%12;
	        }
	        return _$encode(_map,_format);
	    };
	})();
module.exports = dateFormat;