-- Comment

CREATE TABLE products (
    id SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
INSERT into products values (DEFAULT,'Bacalhau','Pingo Doce');
INSERT into products values (DEFAULT,'Bacalhau','Pesca nova');
INSERT into products values (DEFAULT,'Massa','Cotovelos');
INSERT into products values (DEFAULT,'Sal','Marinho');
INSERT into products values (DEFAULT,'Vinho','Do bom');
INSERT into products values (DEFAULT,'Batata','Do Sr. Manuel');
INSERT into products values (DEFAULT,'Peixe','Robalo fresco');


CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    type TEXT NOT NULL,
    people INTEGER,
    day DATE NOT NULL ,
    price_per_person NUMERIC(2),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
INSERT into meals values(DEFAULT,'Bacalhau com broa','Dia do Juiz','Peixe',30,'2017-09-21');
INSERT into meals values(DEFAULT,'Peixe Assado','Ferias','Peixe',12,'2017-09-21');
INSERT into meals values(DEFAULT,'Massa de Bacalhau','Visita de Estudo','Peixe',8,'2017-09-21');

CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL DEFAULT '',
    day DATE NOT NULL ,
    product_id INTEGER REFERENCES products (id) ,
    amount  NUMERIC(2),
    price  NUMERIC(2),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
INSERT into shops values(DEFAULT,'Maria foi as compras','2017-09-22',1,1,5);
INSERT into shops values(DEFAULT,'Maria foi as compras','2017-09-22',6,10,9);
INSERT into shops values(DEFAULT,'Pedro foi as compras','2017-09-23',2,2,5);
INSERT into shops values(DEFAULT,'Pedro foi as compras','2017-09-23',3,10,7);
INSERT into shops values(DEFAULT,'Ines foi as compras','2017-09-21',2,7,5);
INSERT into shops values(DEFAULT,'Ines foi as compras','2017-09-21',4,10,5);


CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products (id) ,
    amount INTEGER ,
    price NUMERIC(2),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
INSERT into stocks values(DEFAULT,1,1,5);
INSERT into stocks values(DEFAULT,2,10,5);
INSERT into stocks values(DEFAULT,3,2,5);
INSERT into stocks values(DEFAULT,4,0,9);
INSERT into stocks values(DEFAULT,5,7,5);
INSERT into stocks values(DEFAULT,6,0,7);


CREATE TABLE meal_products (
  meal_id INTEGER REFERENCES meals (id) on delete cascade,
  product_id INTEGER REFERENCES products (id) on delete cascade,
  amount  NUMERIC(2),
  price  NUMERIC(2)
);
INSERT into meal_products values(1,1,1,5);
INSERT into meal_products values(1,5,10,5);
INSERT into meal_products values(2,7,2,5);
INSERT into meal_products values(2,6,10,9);
INSERT into meal_products values(3,1,7,5);
INSERT into meal_products values(3,3,10,7);
