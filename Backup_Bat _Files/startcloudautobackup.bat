schtasks /create /sc weekly /tn "autobackupcloud" /tr \cloudbackup.bat
schtasks /run /tn "autobackupcloud"