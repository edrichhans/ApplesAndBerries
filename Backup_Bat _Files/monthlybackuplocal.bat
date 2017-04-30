REM Set frequency of auto backup
REM Make sure the task exists in scheduler first since it just edits the parameters

schtasks /delete /tn "autobackuplocal" /f
schtasks /create /tn "autobackuplocal" /sc monthly /tr \localbackup.bat
schtasks /run /tn "autobackuplocal"