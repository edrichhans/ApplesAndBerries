REM Set frequency of auto backup
REM Make sure the task exists in scheduler first since it just edits the parameters

schtasks /delete /tn "autobackupcloud" /f
schtasks /create /tn "autobackupcloud" /sc daily /tr \cloudbackup.bat
schtasks /run /tn "autobackupcloud"