schtasks /create /sc weekly /tn autobackuplocal /tr \localbackup.bat
schtasks /run /tn "autobackuplocal"