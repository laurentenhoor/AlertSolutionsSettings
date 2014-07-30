
$(document).ready(function() {
	
	setupContentListeners();
	
});


function setupContentListeners() {
	
	$('#main-keepaliveinterval-slider').slider({
		min : 1,
		max : 255,
		animate : true,
		step : 1,
		value : 1,
		slide : function(event, ui) {
			$('#main-keepaliveinterval').val(ui.value);
		}
	});
	$('#main-keepaliveinterval').change(function() {
		$('#main-keepaliveinterval-slider').slider({value: $(this).val()});
	});
    
};

