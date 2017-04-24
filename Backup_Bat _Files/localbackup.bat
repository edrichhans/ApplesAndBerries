REM Create a file name for the database output which contains the date and time. Replace any characters which might cause an issue.
set filename=Date_%date%_Time_%time%
set filename=%filename:/=-%
set filename=%filename: =__%
set filename=%filename:.=_%
set filename=%filename::=-%

REM Export the database locally
mongodump --db ApplesAndBerries --gzip -o C:\MongoBackup\%filename%