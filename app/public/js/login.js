$(document).ready(function() {

	$('#loginButton').on('click', loginValidate);
	$('#registerButton').on('click', registerValidate);
	$('#loginUsername').on('keydown', () => {
		$('#loginUsername').removeClass('invalid');
		$('#loginUsernameError').html("");
	});
	$('#loginPassword').on('keydown', () => {
		$('#loginPassword').removeClass('invalid');
		$('#loginPasswordError').html("");
	});
	$('#loginPassword').on('keydown', () => {
		$('#loginPassword').removeClass('invalid');
	});
	$('#regEmail').on('keydown', () => {
		$('#regEmail').removeClass('invalid');
	});
	$('#regUsername').on('keydown', () => {
		$('#regUsername').removeClass('invalid');
		$('#regUsernameError').html("");
	});
	$('#regPassword').on('keydown', () => {
		$('#regPassword').removeClass('invalid');
		$('#regPasswordError').html("");
	});
	$('#regPasswordConf').on('keydown', () => {
		$('#regPasswordConf').removeClass('invalid');
		$('#regPasswordError').html("");
	});

	$('.parallax').parallax();
});

function registerValidate(event) {
	// make sure every field is filled out
	if (!$('#regEmail').val()) {
		$('#regEmail').addClass('invalid');
		event.preventDefault();
	}
	if (!$('#regUsername').val()) {
		$('#regUsername').addClass('invalid');
		event.preventDefault();
	}
	if (!$('#regPassword').val()) {
		$('#regPassword').addClass('invalid');
		event.preventDefault();
	}
	if (!$('#regPasswordConf').val()) {
		$('#regPasswordConf').addClass('invalid');
		event.preventDefault();
	}

	// Check that passwords match
	if ($('#regPassword').val() != $('#regPasswordConf').val()) {
		$('#regPasswordError').html("<div class='mb-2'>Passwords don\'t match!</div>");
		event.preventDefault();
	}

	// Ensure only alphanumeric and underscores
	var pattern = new RegExp("^[a-zA-Z0-9_]*$");
	if (!pattern.test($('#regUsername').val())) {
		$('#regUsernameError').html("<div class='mb-2'>Invalid username, only characters, numbers, and underscores are allowed.</div>");
		event.preventDefault();
	}
	
	// Ensure password is at least 6 chars
	if ($('#regPassword').val().length < 6) {
	}

}

function loginValidate(event) {
	if ($('#loginUsername').val().length == 0) {
		event.preventDefault();
		$('#loginUsername').addClass('invalid');
		$('#loginUsernameError').html("<div class='mb-2'>Username required!</div>");
	}
	if ($('#loginPassword').val().length == 0) {
		event.preventDefault();
		$('#loginPassword').addClass('invalid');
		$('#loginPasswordError').html("<div class='mb-2'>Password required!</div>");
	}
}
