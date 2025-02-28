CREATE USER oraadmin IDENTIFIED BY ora123;
GRANT CONNECT, RESOURCE TO oraadmin;

ALTER SESSION SET CURRENT_SCHEMA = oraadmin;

CREATE TABLE orders (
    id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name VARCHAR2(100),
    product_id NUMBER,
    user_id NUMBER,
    quantity NUMBER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER USER ORAADMIN QUOTA UNLIMITED ON USERS;
ALTER USER ORAADMIN QUOTA 50M ON USERS;
