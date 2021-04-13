create schema app;

CREATE TABLE app.user(
   id serial NOT NULL,
   username text NOT NULL,
   email text NOT NULL,
   pswrd text NOT NULL,
   createdAt timestamp default now(),
   accBalanceUSD decimal(12,2) default 0,
   accBalanceGBP decimal(12,2) default 0,
   CONSTRAINT PK_user PRIMARY KEY ( "id" )
);

create table app.operation (
   id serial NOT NULL,
   tradeType text NOT NULL,
   income decimal(12,2) NOT NULL,
   rate decimal(7,5) NOT NULL,
   createdAt timestamp default now(),
   userId integer NOT NULL,
   CONSTRAINT PK_operation PRIMARY KEY ( "id" ),
   CONSTRAINT FK_user FOREIGN KEY ( userId ) REFERENCES app.user( "id" )
);