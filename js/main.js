var fs = require('fs');

var path = require('path');
var cwd = path.dirname( process.execPath );

var fileName = cwd.substr(0,3) + 'settings.ini';
var config = parseIni(fileName);

console.log(config);


$(document).ready(function() {
	
    $('a.menu').click(function(){
	    $('a.menu').removeClass("active-menu");
	    $(this).addClass("active-menu");

	    $('#page-content-wrapper').load($(this).data('link')+'.html', function() {
			setupContentListeners();
	    });
	});
	
	// Select Active menu item
	$('.active-menu').click();
	
	// Only unfocus/blur selected item on enter (do not submit/refresh)
	$(window).keydown(function(event){
	    if(event.keyCode == 13) {
	      event.preventDefault();
	      $(':focus').blur();
	      return false;
	    }
	});

	showScreen();
		
});

$(window).resize(function() {
	
	
});


function setupContentListeners() {
	
	var newFileName = fileName;
	
	
	/// GENERAL \\\
	
   	$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
    });

    $('#main-name').val((config.main.name !== undefined ? config.main.name : ''));
    $('.main-name-ref').text((config.main.name !== undefined ? config.main.name : ''));
	$('#main-name').change(function(evt) {
		config.main.name = $(this).val();
		writeIni(config, newFileName);
	});
	
	$('#main-enable').attr('checked', config.main.enable!=0?true:false);
	$('#main-enable-label').text(config.main.enable!=0?'Active':'Inactive');
	$('#main-enable').change(function(evt) {
		config.main.enable = +$(this).is(':checked');
		$('#main-enable-label').text(config.main.enable!=0?'Active':'Inactive');
		writeIni(config, newFileName);
	});
	
    $('#main-keepalivetime').timepicker({
        minuteStep: 15,
        showSeconds: false,
        showMeridian: false,
        defaultTime: config.main.keepalivetime
    });
    $('#main-keepalivetime').timepicker().on('changeTime.timepicker', function(ui) {
	    config.main.keepalivetime = ui.time.value;
	    writeIni(config, newFileName);
	});
	
	config.main.keepaliveinterval = (config.main.keepaliveinterval !== undefined ? config.main.keepaliveinterval : 0);
	$('#main-keepaliveinterval-slider').slider({
		min : 1,
		max : 255,
		animate : true,
		step : 1,
		value : config.main.keepaliveinterval,
		slide : function(event, ui) {
			$('#main-keepaliveinterval').val(ui.value);
		},
		change : function(event, ui) {
			$('#main-keepaliveinterval').val(ui.value);
			config.main.keepaliveinterval = ui.value;
			writeIni(config, newFileName);
		}
	});
	$('#main-keepaliveinterval-slider').slider('value', config.main.keepaliveinterval);
	$('#main-keepaliveinterval').change(function() {
		$('#main-keepaliveinterval-slider').slider('value', $(this).val());
	});
	
	$('#main-keepalivesms').html(new EJS({
		url : 'views/sms_options.ejs'
	}).render({
		sms : $.map(config.sms,function(v){return v;})
	}));
	$('#main-keepalivesms').change(function() {
		config.main.keepalivesms = $(this).val();
		writeIni(config, newFileName);
	});

	$('#main-header-1').val((config.main.header_1 !== undefined ? config.main.header_1 : ''));
	$('#main-header-1').change(function(evt) {
		config.main.header_1 = $(this).val();
		writeIni(config, newFileName);
	});
	
	$('#main-header-2').val((config.main.header_2 !== undefined ? config.main.header_2 : ''));
	$('#main-header-2').change(function(evt) {
		config.main.header_2 = $(this).val();
		writeIni(config, newFileName);
	});
	
	$('#main-excvolt').val(config.main.excvolt);
	$('#main-excvolt').change(function(evt) {
		config.main.excvolt = $(this).val();
		writeIni(config, newFileName); 
	});
	
	$('#main-events').attr('checked', config.main.events!=0?true:false);
	$('#main-events-label').text(config.main.events!=0?'Active':'Inactive');
	$('#main-events').change(function(evt) {
		config.main.events = +$(this).is(':checked');
		$('#main-events-label').text(config.main.events!=0?'Active':'Inactive');
		writeIni(config, newFileName);
	});
	
	$('#main-debug').attr('checked', config.main.debug!=0?true:false);
	$('#main-debug-label').text(config.main.events!=0?'Active':'Inactive');
	$('#main-debug').change(function(evt) {
		config.main.debug = +$(this).is(':checked');
		$('#main-debug-label').text(config.main.debug!=0?'Active':'Inactive');
		writeIni(config, newFileName);
	});

	$('#main-buttonstatus').val(config.main.buttonstatus);
	$('#main-buttonstatus').change(function(evt) {
		config.main.buttonstatus = $(this).val();
		writeIni(config, newFileName);
		(($(this).val() == 3 || $('#main-buttonstatus').val() == 7) ? $('#main-buttonsms-wrap').show() : $('#main-buttonsms-wrap').hide());
	});
	
	(($('#main-buttonstatus').val() == 3 || $('#main-buttonstatus').val() == 7) ? $('#main-buttonsms-wrap').show() : $('#main-buttonsms-wrap').hide());	
	$('#main-buttonsms').html(new EJS({
		url : 'views/sms_options.ejs'
	}).render({
		sms : $.map(config.sms,function(v){return v;})
	}));
	$('#main-buttonsms').change(function() {
		config.main.buttonsms = $(this).val();
		writeIni(config, newFileName);
	});
	
	
	/// GSM \\\
	
	$('#gsm-smsrecv').attr('checked', config.gsm.smsrecv!=0?true:false);
	$('#gsm-smsrecv-label').text(config.gsm.smsrecv!=0?'Active':'Inactive');
	$('#gsm-smsrecv').change(function(evt) {
		config.gsm.smsrecv = +$(this).is(':checked');
		$('#gsm-smsrecv-label').text(config.gsm.smsrecv!=0?'Active':'Inactive');
		writeIni(config, newFileName);
	});
	
	
	$('#gsm-debug').attr('checked', config.gsm.debug!=0?true:false);
	$('#gsm-debug-label').text(config.gsm.debug!=0?'Active':'Inactive');
	$('#gsm-debug').change(function(evt) {
		config.gsm.debug = +$(this).is(':checked');
		$('#gsm-debug-label').text(config.gsm.debug!=0?'Active':'Inactive');
		writeIni(config, newFileName);
	});
	
	$('#gsm-cmd').val((config.gsm.cmd !== undefined ? config.gsm.cmd : ''));
	$('#gsm-cmd').change(function(evt) {
		config.gsm.cmd = $(this).val();
		writeIni(config, newFileName);
	});
	
	config.gsm.gsmontime = (config.gsm.gsmontime !== undefined ? config.gsm.gsmontime : 0);
	$('#gsm-gsmontime-slider').slider({
		min : 0,
		max : 600,
		animate : true,
		step : 1,
		value : config.gsm.gsmontime,
		slide : function(event, ui) {
			$('#gsm-gsmontime').val(ui.value);
		},
		change : function(event, ui) {
			$('#gsm-gsmontime').val(ui.value);
			config.gsm.gsmontime = ui.value;
			writeIni(config, newFileName);
		}
	});
	$('#gsm-gsmontime-slider').slider('value', config.gsm.gsmontime);
	$('#gsm-gsmontime').change(function() {
		$('#gsm-gsmontime-slider').slider('value', $(this).val());
	});	

	$('#gsm-apn').val((config.gsm.apn !== undefined ? config.gsm.apn : ''));
	$('#gsm-apn').change(function(evt) {
		config.gsm.apn = $(this).val();
		writeIni(config, newFileName);
	});
	
	$('#gsm-login').val((config.gsm.login !== undefined ? config.gsm.login : ''));
	$('#gsm-login').change(function(evt) {
		config.gsm.login = $(this).val();
		writeIni(config, newFileName);
	});
	
	$('#gsm-password').val((config.gsm.password !== undefined ? config.gsm.password : ''));
	$('#gsm-password').change(function(evt) {
		config.gsm.password = $(this).val();
		writeIni(config, newFileName);
	});
	
	$('#gsm-daytimeserver').val((config.gsm.daytimeserver !== undefined ? config.gsm.daytimeserver : ''));
	$('#gsm-daytimeserver').change(function(evt) {
		config.gsm.daytimeserver = $(this).val();
		writeIni(config, newFileName);
	});	

	config.gsm.utc = (config.gsm.utc !== undefined ? config.gsm.utc : 0);
	$('#gsm-utc-slider').slider({
		min : -12,
		max : 14,
		animate : true,
		step : 1,
		value : config.gsm.utc,
		slide : function(event, ui) {
			$('#gsm-utc').val(ui.value);
		},
		change : function(event, ui) {
			$('#gsm-utc').val(ui.value);
			config.gsm.utc = ui.value;
			writeIni(config, newFileName);
		}
	});
	$('#gsm-utc-slider').slider('value', config.gsm.utc);
	$('#gsm-utc').change(function() {
		$('#gsm-utc-slider').slider('value', $(this).val());
	});
	
	
	/// FTP \\\
		
    $('#ftp-abs-time').timepicker({
        minuteStep: 15,
        showSeconds: false,
        showMeridian: false,
        defaultTime: config.ftp.time
    });
    $('#ftp-abs-time').timepicker().on('changeTime.timepicker', function(ui) {
	    config.ftp.time = ui.time.value;
	    writeIni(config, newFileName);
	});	
	$('#ftp-time').change(function(evt) {
		var time = $(this).val();
		if (time == 'min' || time == 'work' || time == 'hour') {
			$('.abs-time').hide();
			if (time == 'min') {
				$('#ftp-interval-unit').text('Minutes');
			} else {
				$('#ftp-interval-unit').text('Hours');
			}
		} else {
			$('.abs-time').show();
			$('#ftp-interval-unit').text('Days');
			time = $('#ftp-abs-time').data("timepicker").getTime();
			$(this).val('abs');
		}
		config.ftp.time = time;
		writeIni(config, newFileName);
	}).val(config.ftp.time).trigger('change');

	config.ftp.interval = (config.ftp.interval !== undefined ? config.ftp.interval : 0);
	$('#ftp-interval-slider').slider({
		min : 1,
		max : 10,
		animate : true,
		step : 1,
		value : config.ftp.interval,
		slide : function(event, ui) {
			$('#ftp-interval').val(ui.value);
		},
		change : function(event, ui) {
			$('#ftp-interval').val(ui.value);
			config.ftp.interval = ui.value;
			writeIni(config, newFileName);
		}
	});
	$('#ftp-interval-slider').slider('value', config.ftp.interval);
	$('#ftp-interval').change(function() {
		$('#ftp-interval-slider').slider('value', $(this).val());
	});
	
	$('#ftp-passive').attr('checked', config.ftp.passive!=0?true:false);
	$('#ftp-passive-label').text(config.ftp.passive!=0?'Passive':'Active');
	$('#ftp-passive').change(function(evt) {
		config.ftp.passive = +$(this).is(':checked');
		$('#ftp-passive-label').text(config.ftp.passive!=0?'Passive':'Active');
		writeIni(config, newFileName);
	});
	
	$('#ftp-nobackup').attr('checked', config.ftp.nobackup!=0?false:true);
	$('#ftp-nobackup-label').text(config.ftp.nobackup!=0?'Inactive':'Active');
	$('#ftp-nobackup').change(function(evt) {
		config.ftp.nobackup = +!($(this).is(':checked'));
		$('#ftp-nobackup-label').text(config.ftp.nobackup!=0?'Inactive':'Active');
		writeIni(config, newFileName);
	});
	
	$('#ftp-getsettings').attr('checked', config.ftp.getsettings!=0?true:false);
	$('#ftp-getsettings-label').text(config.ftp.getsettings!=0?'Active':'Inactive');
	$('#ftp-getsettings').change(function(evt) {
		config.ftp.getsettings = +$(this).is(':checked');
		$('#ftp-getsettings-label').text(config.ftp.getsettings!=0?'Active':'Inactive');
		writeIni(config, newFileName);
	});	
	
	$('#ftp-sendsettings').attr('checked', config.ftp.sendsettings!=0?true:false);
	$('#ftp-sendsettings-label').text(config.ftp.sendsettings!=0?'Active':'Inactive');
	$('#ftp-sendsettings').change(function(evt) {
		config.ftp.sendsettings = +$(this).is(':checked');
		$('#ftp-sendsettings-label').text(config.ftp.sendsettings!=0?'Active':'Inactive');
		writeIni(config, newFileName);
	});	
	
	$('#ftp-getfirmware').attr('checked', config.ftp.getfirmware!=0?true:false);
	$('#ftp-getfirmware-label').text(config.ftp.getfirmware!=0?'Active':'Inactive');
	$('#ftp-getfirmware').change(function(evt) {
		config.ftp.getfirmware = +$(this).is(':checked');
		$('#ftp-getfirmware-label').text(config.ftp.getfirmware!=0?'Active':'Inactive');
		writeIni(config, newFileName);
	});		
	
	
	/// SMS \\\
	
	var numbers = $.map(config.sms,function(v){return v;});
	$('#sms').html(new EJS({
		url : 'views/sms.ejs'
	}).render({
		numbers : numbers
	}));
	$('input.sms').change(function() {
		config.sms['sms_'+$(this).data('nr')] = $(this).val();
		writeIni(config, newFileName);
	});
	
	
	/// Channels \\\
	
	
	var CHANNELS = [1,2,3,5];
	
	$('#channels-wrap').html(new EJS({
		url : 'views/channels.ejs'
	}).render({
		channels : CHANNELS
	}));
	
	// Iterate over all channels
	$.each(CHANNELS, function(key, val) {
		
		
		$('#channel-'+val+'-name').val((config['channel_'+val].name !== undefined ? config['channel_'+val].name : ''));
		$('#channel-'+val+'-name').change(function(evt) {
			config['channel_'+val].name = $(this).val();
			writeIni(config, newFileName);
		});
	
		$('#channel-'+val+'-tagname').val((config['channel_'+val].tagname !== undefined ? config['channel_'+val].tagname : ''));
		$('#channel-'+val+'-tagname').change(function(evt) {
			config['channel_'+val].tagname = $(this).val();
			writeIni(config, newFileName);
		});
	
		$('#channel-'+val+'-enable').attr('checked', config['channel_'+val].enable!=0?true:false);
		$('#channel-'+val+'-enable-label').text(config['channel_'+val].enable!=0?'Active':'Inactive');
		$('#channel-'+val+'-enable').change(function(evt) {
			config['channel_'+val].enable = +$(this).is(':checked');
			$('#channel-'+val+'-enable-label').text(config['channel_'+val].enable!=0?'Active':'Inactive');
			writeIni(config, newFileName);
		});

		$('#channel-'+val+'-inputtype').val(config['channel_'+val].inputtype);
		$('#channel-'+val+'-inputtype').change(function(evt) {
			config['channel_'+val].inputtype = $(this).val();
			writeIni(config, newFileName); 
		});
		
		
		config['channel_'+val].measuretime = (config['channel_'+val].measuretime !== undefined ? config['channel_'+val].measuretime : 0);
		$('#channel-'+val+'-measuretime-slider').slider({
			min : 1,
			max : 255,
			animate : true,
			step : 1,
			value : config['channel_'+val].measuretime,
			slide : function(event, ui) {
				$('#channel-'+val+'-measuretime').val(ui.value);
			},
			change : function(event, ui) {
				$('#channel-'+val+'-measuretime').val(ui.value);
				config['channel_'+val].measuretime = ui.value;
				writeIni(config, newFileName);
			}
		});
		$('#channel-'+val+'-measuretime-slider').slider('value', config['channel_'+val].measuretime);
		$('#channel-'+val+'-measuretime').change(function() {
			$('#channel-'+val+'-measuretime-slider').slider('value', $(this).val());
		});
		
		
		
		config['channel_'+val].measureinterval = (config['channel_'+val].measureinterval !== undefined ? config['channel_'+val].measureinterval : 0);
		$('#channel-'+val+'-measureinterval-slider').slider({
			min : 1,
			max : 255,
			animate : true,
			step : 1,
			value : config['channel_'+val].measureinterval,
			slide : function(event, ui) {
				$('#channel-'+val+'-measureinterval').val(ui.value);
			},
			change : function(event, ui) {
				$('#channel-'+val+'-measureinterval').val(ui.value);
				config['channel_'+val].measureinterval = ui.value;
				writeIni(config, newFileName);
			}
		});
		$('#channel-'+val+'-measureinterval-slider').slider('value', config['channel_'+val].measureinterval);
		$('#channel-'+val+'-measureinterval').change(function() {
			$('#channel-'+val+'-measureinterval-slider').slider('value', $(this).val());
		});			
		
		
		
		config['channel_'+val].logtime = (config['channel_'+val].logtime !== undefined ? config['channel_'+val].logtime : 0);
		$('#channel-'+val+'-logtime-slider').slider({
			min : 1,
			max : 255,
			animate : true,
			step : 1,
			value : config['channel_'+val].logtime,
			slide : function(event, ui) {
				$('#channel-'+val+'-logtime').val(ui.value);
			},
			change : function(event, ui) {
				$('#channel-'+val+'-logtime').val(ui.value);
				config['channel_'+val].logtime = ui.value;
				writeIni(config, newFileName);
			}
		});
		$('#channel-'+val+'-logtime-slider').slider('value', config['channel_'+val].logtime);
		$('#channel-'+val+'-logtime').change(function() {
			$('#channel-'+val+'-logtime-slider').slider('value', $(this).val());
		});			
		

		config['channel_'+val].debouncetime = (config['channel_'+val].debouncetime !== undefined ? config['channel_'+val].debouncetime : 0);
		$('#channel-'+val+'-debouncetime-slider').slider({
			min : 1,
			max : 255,
			animate : true,
			step : 1,
			value : config['channel_'+val].debouncetime,
			slide : function(event, ui) {
				$('#channel-'+val+'-debouncetime').val(ui.value);
			},
			change : function(event, ui) {
				$('#channel-'+val+'-debouncetime').val(ui.value);
				config['channel_'+val].debouncetime = ui.value;
				writeIni(config, newFileName);
			}
		});
		$('#channel-'+val+'-debouncetime-slider').slider('value', config['channel_'+val].debouncetime);
		$('#channel-'+val+'-debouncetime').change(function() {
			$('#channel-'+val+'-debouncetime-slider').slider('value', $(this).val());
		});

		$('#channel-'+val+'-validlow').val((config['channel_'+val].validlow !== undefined ? config['channel_'+val].validlow : '0.000'));
		$('#channel-'+val+'-validlow').change(function(evt) {
			var floatVal = parseFloat($(this).val()).toFixed(config['channel_'+val].precisionlog);
			$(this).val(floatVal);
			config['channel_'+val].validlow = floatVal;
			writeIni(config, newFileName);
		});
		$('#channel-'+val+'-validhigh').val((config['channel_'+val].validhigh !== undefined ? config['channel_'+val].validhigh : '1.000'));
		$('#channel-'+val+'-validhigh').change(function(evt) {
			var floatVal = parseFloat($(this).val()).toFixed(config['channel_'+val].precisionlog);
			$(this).val(floatVal);
			config['channel_'+val].validhigh = floatVal;
			writeIni(config, newFileName);
		});
		
		$('#channel-'+val+'-units').val((config['channel_'+val].units !== undefined ? config['channel_'+val].units : ''));
		$('#channel-'+val+'-units').change(function(evt) {
			config['channel_'+val].units = $(this).val();
			writeIni(config, newFileName);
		});
			
		$('#channel-'+val+'-logging').attr('checked', config['channel_'+val].logging!=0?true:false);
		$('#channel-'+val+'-logging-label').text(config['channel_'+val].logging!=0?'Active':'Inactive');
		$('#channel-'+val+'-logging').change(function(evt) {
			config['channel_'+val].logging = +$(this).is(':checked');
			$('#channel-'+val+'-logging-label').text(config['channel_'+val].logging!=0?'Active':'Inactive');
			writeIni(config, newFileName);
		});
		
		config['channel_'+val].precisionlog = (config['channel_'+val].precisionlog !== undefined ? config['channel_'+val].precisionlog : 0);
		$('#channel-'+val+'-precisionlog-slider').slider({
			min : 0,
			max : 4,
			animate : true,
			step : 1,
			value : config['channel_'+val].precisionlog,
			slide : function(event, ui) {
				$('#channel-'+val+'-precisionlog').val(ui.value);
			},
			change : function(event, ui) {
				$('#channel-'+val+'-precisionlog').val(ui.value);
				config['channel_'+val].precisionlog = ui.value;
				writeIni(config, newFileName);
				$('#channel-'+val+'-validlow').trigger('change');
				$('#channel-'+val+'-validhigh').trigger('change');

			}
		});
		$('#channel-'+val+'-precisionlog-slider').slider('value', config['channel_'+val].precisionlog);
		$('#channel-'+val+'-precisionlog').change(function() {
			$('#channel-'+val+'-precisionlog-slider').slider('value', $(this).val());
		});		
		
	});// End of: Each CHANNELS iteration
	

};


function showScreen() {
	
	var ngui = require('nw.gui');
	var nwin = ngui.Window.get();
	
	onload = function() {
		
	    nwin.maximize();
	    nwin.showDevTools();
	    
	};
};


function parseIni(fileName) {
	
	var data;
	var config = {};
	
	try {
	  data = fs.readFileSync(fileName, 'ascii');
	} catch (e) {
		var gui = require('nw.gui');
		var win = gui.Window.get();
		alert('No config file found.\nPlease create: ' + fileName);
		win.close();
		return;
	}
		
	var lines = data.split(/[\r\n]+/g);
	
	for (var i = 0;i < lines.length;i++) {
		var line = lines[i];
			
		var matches = line.match(/\[(.*?)\]/);
		var subject = '';
		
		if (matches) {
			
		    subject = matches[1];
			line = line.replace(matches[0], "");
			
			currentSubject = config[subject] || {};
			
			variable = line.split('=')[0];
			value = line.substring(line.indexOf('=')+1);
			
			currentSubject[variable] = value;
			config[subject] = currentSubject;
		}
	}

	return config;
};


function writeIni(config, fileName) {
    
    console.log('Writing File...');
    
    lines = [];
    
    $.each(config, function(subject, object) {

	    $.each(object, function(variable, value) {
	    	lines.push('[' + subject + ']' + variable + '=' + value);
	    });
	    
	    lines.push('\r\n');
	    
	});

	var content = lines.join('\r\n');

    fs.writeFile(fileName, content, function(err) {
        if (err) throw err;
    });

};