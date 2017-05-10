REM Create a file name for the database output which contains the date and time. Replace any characters which might cause an issue.
set thisdate=%date:~4,10%
set thistime=%time:~0,-6%
set filename=Date_%thisdate%_Time%thistime%
set filename=%filename:/=-%
set filename=%filename: =_%
set filename=%filename:.=_%
set filename=%filename::=-%

REM Export the database locally
mongodump --db ApplesAndBerries --gzip -o C:\MongoBackup\%filename%

REM Export the database to mlab cloud
mongorestore -h ds149700.mlab.com:49700 --gzip -d applesandberries -u jbead192 -p hellolenlen C:\MongoBackup\%filename%\ApplesAndBerries