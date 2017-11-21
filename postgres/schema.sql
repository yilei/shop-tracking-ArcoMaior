-- Comment

CREATE TABLE products (
    id SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT now()
);


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
INSERT into meals values('a','a','a',1,'1998-09-21',1.00);

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

CREATE TABLE shop_products (
    product_id INTEGER REFERENCES products (id),
    sale_id INTEGER REFERENCES shops (id),
    amount  NUMERIC(2),
    price  NUMERIC(2)
);

CREATE TABLE meal_products (
    product_id INTEGER REFERENCES products (id),
    meal_id INTEGER REFERENCES meals (id),
    amount  NUMERIC(2),
    price  NUMERIC(2)
);
