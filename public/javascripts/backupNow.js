script.
	document.getElementById('back-up-to-cloud').onclick = function() {
		$('#alert-backup-modal').modal('show');
		$('#update-alert').click(function(){
			window.location.assign('/backup/localbackup');
		}
	};
	document.getElementById('back-up-to-cloud').onclick = function() {
		$('#alert-backup-modal').modal('show');
		$('#update-alert').click(function(){
			window.location.assign('/backup/cloudbackup');
		};
	};
