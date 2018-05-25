DROP DATABASE IF EXISTS maintenance;
CREATE DATABASE maintenance;

-- user table;

CREATE TABLE tbl_user (
  ID SERIAL PRIMARY KEY,
  uTYPE VARCHAR(20),
  uemail VARCHAR(100) NOT NULL ,
  upassword VARCHAR(200) NOT NULL ,
  ufirstName VARCHAR(200),
  ulastName VARCHAR(200),
  uphone VARCHAR(15),
  uaddress VARCHAR(500),
  ucreatedOn DATE DEFAULT Now()
);

INSERT INTO tbl_user (utype, uemail, upassword, ufirstName, ulastName, uphone, uaddress )
  VALUES ('admin', 'admin@andela.com', 'pass', 'Scott', 'Tiger', '123-456-777', 'Upper Str.' );


-- Request table;

CREATE TABLE tbl_request (
  ID SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL ,
  rsubject VARCHAR (200) NOT NULL,
  rdescription VARCHAR(1000),
  rstatus VARCHAR(20),
  rpriority VARCHAR(20),
  rcreatedOn DATE DEFAULT Now()
);

INSERT INTO tbl_request (userId, rsubject, rdescription, rstatus, rpriority)
VALUES (1, 'Ravepay Error', 'Payment error resulting from faulty api', 'pending', 'low' );

