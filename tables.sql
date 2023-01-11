CREATE TABLE "clients" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(255) NOT NULL,
"address" VARCHAR(255) NOT NULL,
"phone" VARCHAR(255) NOT NULL 
);

CREATE TABLE "cakes" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(255) NOT NULL,
"price" NUMERIC NOT NULL,
"image" VARCHAR(255) NOT NULL,
"description" TEXT,
"flavourid" INTEGER NOT NULL REFERENCES "flavours"("id")
);


CREATE TABLE "orders" (
"id" SERIAL PRIMARY KEY,
"clientid" INTEGER NOT NULL REFERENCES "clients"("id"),
"cakeid" INTEGER NOT NULL REFERENCES "cakes"("id"),
"quantity" INTEGER NOT NULL,
"createdat" TIMESTAMP NOT NULL ,
"totalprice" NUMERIC NOT NULL,
"isDelivered" BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE "flavours" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(255) NOT NULL
);
