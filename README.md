In order to setup the db tables you should do the following:
 Oracle: 
   - docker exec -it oracle-container resetPassword 'ora123'
   - navigate to init folder and run docker cp as following: docker cp initOracle.sql oracle-container:/init.sql
   - docker exec -it oracle-container bash -c "sqlplus -s system/ora123@//localhost/FREEPDB1 @/init.sql"
   - More about the image here: https://hub.docker.com/r/gvenzl/oracle-xe

MySql:
   - docker cp initMySql.sql mssql-container:/initMySql.sql
   - docker exec -it mssql-container bash -c "/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P mSq123!! -C -i initMySql.sql"

Postgres:
   - docker cp initPostgres.sql postgres-container:/init.sql
   - docker exec -i postgres-container psql -U posadmin -d postgres -f /init.sql

And now dbs should be set up with the correct schemas.
