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
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    day DATE NOT NULL ,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products (id) ,
    amount INTEGER ,
    price NUMERIC(2),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

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



CREATE TABLE shop_products (
  sale_id INTEGER REFERENCES shops (id) on delete cascade,
    product_id INTEGER REFERENCES products (id) on delete cascade,
    amount  NUMERIC(2),
    price  NUMERIC(2)
);
