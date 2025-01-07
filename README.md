In order to setup the db tables you should do the following:
 Oracle: 
  docker exec -it oracle-container resetPassword 'ora123'
  navigate to init folder and run docker cp as following: docker cp initOracle.sql oracle-container:/init.sql
  docker exec -it oracle-container bash -c "sqlplus sys/Oradoc_db1@localhost:1521/ORCLCDB as sysdba @/init.sql" --> follow the prompts you might need to enter user: system and password 'ora123'
  More about the image here: https://hub.docker.com/r/gvenzl/oracle-xe

MySql:
  docker cp initMySql.sql mssql-container:/initMySql.sql
  docker exec -it mssql-container bash -c "/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P mSq123!! -C -i initMySql.sql"

Postgres:
  docker cp initPostgres.sql postgres-container:/init.sql
  docker exec -i postgres-container psql -U posadmin -d postgres -f /init.sql

And now dbs should be set up with the correct schemas.
