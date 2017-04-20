REM Set frequency of auto backup
REM Make sure the task exists in scheduler first since it just edits the parameters

schtasks /change /tn "autobackup" /sc weekly /tr \cloudbackup.bat