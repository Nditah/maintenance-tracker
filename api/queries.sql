DROP DATABASE IF EXISTS maintenance;
CREATE DATABASE maintenance;

-- user table;

CREATE TABLE tbl_user (
  ID SERIAL PRIMARY KEY,
  uTYPE VARCHAR,
  uemail VARCHAR(50) NOT NULL ,
  upassword VARCHAR(200) NOT NULL ,
  ufirstName VARCHAR,
  ulastName VARCHAR,
  uphone VARCHAR,
  uaddress VARCHAR,
  ucreatedOn DATE DEFAULT Now()
);

INSERT INTO tbl_user (utype, uemail, upassword, ufirstName, ulastName, uphone, uaddress )
  VALUES ('admin', 'admin@andela.com', 'pass', 'Scott', 'Tiger', '123-456-777', 'Upper Str.' );


-- Request table;

CREATE TABLE tbl_request (
  ID SERIAL PRIMARY KEY,
  userId VARCHAR(10) NOT NULL ,
  rsubject VARCHAR NOT NULL,
  rdescription VARCHAR,
  rstatus VARCHAR,
  rpriority VARCHAR,
  rcreatedOn DATE DEFAULT Now()
);

INSERT INTO requests (userId, rsubject, rdescription, rstatus, rpriority)
  VALUES (1, 'Ravepay', 'Faulty Api', 'Payment error resulting from faulty api', 'pending', 'low' );

