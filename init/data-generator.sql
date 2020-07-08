Create or replace function generate_data() returns void as
$$
declare
  flower_names text[] := '{Aconitum, African Daisy, Agapanthus, Ageratum houstonianum, Alchemilla, 
  Allium roseum, Alstroemeria, Alyssum, Amaranthus, Amaryllis, Anemone, Angelonia, Anthurium, 
  Antirrhinum majus, Aquilegia, Asclepias syriaca, Aster, Astilbe, Astrantia, Aubreita deltoidea}';
  flower_images_urls text[] := '{
  https://image.shutterstock.com/image-photo/aconitum-napellus-known-monkshood-wolfs-600w-1585928404.jpg,
  https://image.shutterstock.com/image-photo/african-daisy-osteospermum-purple-flowering-600w-693424501.jpg,
  https://image.shutterstock.com/image-photo/blooming-agapanthus-lily-nile-queensland-600w-788677519.jpg,
  https://image.shutterstock.com/image-photo/ageratum-houstonianum-floss-flower-many-600w-1205670433.jpg,
  https://image.shutterstock.com/image-photo/alchemilla-mollis-blooms-summer-600w-1472698688.jpg,
  https://image.shutterstock.com/image-photo/flowers-wild-rosy-garlic-plant-600w-692528383.jpg,
  https://image.shutterstock.com/image-photo/alstroemeria-flower-red-bouquet-flowers-600w-1410819227.jpg,
  https://image.shutterstock.com/image-photo/sweet-alyssum-genus-about-many-260nw-1126114622.jpg,
  https://image.shutterstock.com/image-photo/amaranthus-field-natural-superfood-plant-600w-1204631977.jpg,
  https://image.shutterstock.com/image-photo/red-amaryllis-flower-blooms-garden-260nw-1681353739.jpg,
  https://image.shutterstock.com/image-photo/beautiful-blossom-purple-anemone-flowers-600w-1103807177.jpg,
  https://image.shutterstock.com/image-photo/angelonia-angustifolia-summer-snapdragon-purple-600w-1330376501.jpg,
  https://image.shutterstock.com/image-photo/red-anthurium-flowes-tailflower-flamingo-600w-1214810737.jpg,
  https://image.shutterstock.com/image-photo/pink-flowers-asclepias-syriaca-commonly-600w-724696462.jpg,
  https://image.shutterstock.com/image-photo/snapdragon-flowers-garden-600w-760749961.jpg,
  https://image.shutterstock.com/image-photo/late-spring-early-summer-aquilegia-260nw-1596977443.jpg,
  https://image.shutterstock.com/image-photo/purple-flowers-italian-asters-michaelmas-600w-787095415.jpg,
  https://image.shutterstock.com/image-photo/astilbe-saxifragaceae-flower-no-glitter-600w-625864373.jpg,
  https://image.shutterstock.com/image-photo/close-astrantia-flower-260nw-445104292.jpg,
  https://image.shutterstock.com/image-photo/purple-aubrieta-flowers-aubretia-deltoidea-600w-301357049.jpg}';
  prices decimal[] := '{2.00, 2.50, 4.00, 5.5, 10.00}';
  flower_name text := '';
  i integer := 0;
  stock integer := 0;
  price numeric := 0.00;
  flower_image_url text := null;
  order_time timestamp := null;
  quantity_ordered integer := 0;
  order_ids integer := 0;
  order_subtotal_generated numeric := 0.00;
  order_total_generated numeric := 0.00;
  var varchar := '';
  orders_rec RECORD;
begin
  DELETE FROM "order_lines";
  DELETE FROM "products";
  DELETE FROM "orders";
  -- inserts values into products
  for i in 1..20 loop
    flower_name := flower_names[i];
	flower_image_url := flower_images_urls[i];
	stock := floor(random() * 100 + 50)::int;
	price := prices[1+random()*(array_length(prices, 1)-1)];
	INSERT INTO "products" ("name", "stock", "price", "image_url") Values (flower_name, stock, price, flower_image_url);
  end loop;
  -- inserts defined id and order_time into orders
  for i in 1..50 loop
    order_time := NOW() + (random() * (NOW()+'90 days' - NOW())) + '30 days';
  	INSERT INTO "orders" ("order_time", "order_subtotal", "order_total")
	VALUES (order_time, order_subtotal_generated, order_total_generated);
	flower_name := flower_names[1+random()*(array_length(flower_names, 1)-1)];
  end loop;
  -- inserts at least one value into order_lines for each order id
  FOR orders_rec IN SELECT "orders"."id" 
	       FROM "orders"
	loop
	  for i in 1..floor(random() * 3 + 1)::int loop
	    flower_name := flower_names[1+random()*(array_length(flower_names, 1)-1)];
	    order_ids := orders_rec."id";
	    quantity_ordered := floor(random() * 10 + 5)::int;
        INSERT INTO "order_lines" ("products_name", "orders_id", "quantity_ordered")
	    VALUES (flower_name, order_ids, quantity_ordered);
	  end loop;
	end loop;
  -- inserts defined order_subtotal and order_total into orders
  FOR orders_rec IN SELECT "orders"."id" 
	       FROM "orders"
	loop
	  order_subtotal_generated := SUM("products"."price" * "order_lines"."quantity_ordered") FROM "order_lines" 
	  INNER JOIN "products" ON ("order_lines"."products_name" = "products"."name")
	  WHERE "order_lines"."orders_id" = orders_rec."id";
	  UPDATE "orders" SET "order_subtotal" = order_subtotal_generated WHERE "orders"."id" = orders_rec."id";
	  order_total_generated := order_subtotal_generated * 1.05;
	  UPDATE "orders" SET "order_total" = order_total_generated WHERE "orders"."id" = orders_rec."id";
	end loop;
end;
$$ language plpgsql;

select generate_data();