@echo off
REM Create a file name for the database output which contains the date and time. Replace any characters which might cause an issue.
set filename=database Date_%date%_Time_%time%
set filename=%filename:/=-%
set filename=%filename: =__%
set filename=%filename:.=_%
set filename=%filename::=-%

REM Export the database locally
echo Running backup "%filename%"
mongodump --db applesandberries --gzip --out C:\MongoBackup\"%filename%"

REM Export the database to mlab cloud
mongorestore -h ds149557.mlab.com:49557 --gzip --db applesandberries C:\MongoBackup\"%filename%"\applesandberries
echo BACKUP COMPLETE