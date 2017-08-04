var base = '.';
$(function() {
	$('#result').diffpage({
		'oldUrl' : base + '/old.html',
		'newUrl' : base + '/new.html'
	});
	$('input[name="mode"]').click(function() {
		var mode = $(this).val();
		$('#result').diffpage('mode', mode);
	});
});
