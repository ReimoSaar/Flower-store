CREATE TABLE IF NOT EXISTS "products" (
    "name" character varying(30) NOT NULL,
    "stock" integer NOT NULL,
    "price" numeric NOT NULL,
	"image_url" text NOT NULL,
    PRIMARY KEY ("name")
);

CREATE TABLE IF NOT EXISTS "orders"
(
    "id" serial NOT NULL,
    "order_time" timestamp without time zone NOT NULL,
    "order_subtotal" numeric NOT NULL,
    "order_total" numeric NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "order_lines" (
    "id" serial NOT NULL,
    "products_name" character varying(30) NOT NULL REFERENCES products ("name") MATCH SIMPLE,
    "orders_id" serial NOT NULL REFERENCES orders ("id") MATCH SIMPLE,
    "quantity_ordered" integer NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE public.cart
(
    id serial NOT NULL,
    products_name character varying(30) NOT NULL UNIQUE,
    quantity integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (products_name)
        REFERENCES public.products (name) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE public.cart
    OWNER to "user";