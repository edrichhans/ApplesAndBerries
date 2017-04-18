REM Create auto backup schedule in scheduler

schtasks /create /tn "autobackup" /sc weekly /tr \procbackup.bat