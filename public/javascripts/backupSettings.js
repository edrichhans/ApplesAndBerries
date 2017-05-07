document.getElementById('backup-menu-cancel-button').onclick = function(){
	location.assign('/backup');
};
document.getElementById('save-settings-button').onclick = function(){
	var local_choice = $('#local-backup-freq').val();
	var cloud_choice = $('#cloud-backup-freq').val();

	if (local_choice == 1) location.assign('/backup/setmonthlylocal');
	else if (local_choice == 2) location.assign('/backup/setweeklylocal');
	else if (local_choice == 3) location.assign('/backup/setdailylocal');
	else if (local_choice == 4) location.assign('/backup/sethourlylocal');
	else if (local_choice == 5) location.assign('/backup/deletelocalbackup');

	if (cloud_choice == 1) location.assign('/backup/setmonthlycloud');
	else if (cloud_choice == 2) location.assign('/backup/setweeklycloud');
	else if (cloud_choice == 3) location.assign('/backup/setdailycloud');
	else if (cloud_choice == 4) location.assign('/backup/sethourlycloud');
	else if (cloud_choice == 5) location.assign('/backup/deletecloudbackup');

	location.assign('/')
}
