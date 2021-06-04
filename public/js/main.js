$(document).ready(function(e) {
	$('#demoForm').submit(function(event) {
		$.ajax({
			url: 'https://dil-linkshorten.herokuapp.com/shorten/' + $('#url').val(),
			method: 'POST',
			success: function(res) {
				$('#demoResponse').html(JSON.stringify(res));
			},
			error: function(res) {
				$('#demoResponse').html(res['responseText']);
			}

		})
		event.preventDefault();
	});
});