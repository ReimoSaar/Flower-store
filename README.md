# Flower-store
My first dockerized full stack application. Created with ReactJS, PostgreSQL, Spring Boot and NGINX.

## preview:
### Adding items to cart
![flower-store-adding](https://user-images.githubusercontent.com/63605374/89740352-86cdc700-da90-11ea-953d-a24dd2a23a7b.gif)
### Menu
![flower-store-menu](https://user-images.githubusercontent.com/63605374/89739459-85e56700-da89-11ea-8be1-d2a49194baa2.gif)
### Buying
![flower-store-buying](https://user-images.githubusercontent.com/63605374/89739721-c1813080-da8b-11ea-8bab-f9fbde306575.gif)
### Filter
![flower-store-filter](https://user-images.githubusercontent.com/63605374/89739978-e24a8580-da8d-11ea-9d3c-576c50161d66.gif)

## Features:
- Simple buying system.
- Inserts generated values into database on first initialization.
- Cart system of adding and removing products.
- Easy to run.
- Each product shows top three products that people have bought with it.
- Fits all types of resolutions (including 4k).

## Start the application:
- Go to frontend/src/Tools/getBackendDomainAndPort.js and change the ip according to where you plan on running the docker-compose command.
- Run "docker-compose up" while in the same folder with docker-compose.yml file.
- Write docker host machine ip into web browser address bar with http protocol. (http://&lt;ip&gt;).

## Regenerate values in database
docker exec -it &lt;database container name&gt; psql -U user -d Store -f docker-entrypoint-initdb.d/03-data-generator.sql

## Possible problems:
- Frontend might not be able to send requests to backend, since Spring Boot is using https protocol, then web browser might look at it as a threat.
To fix it, you have to open network tab in web browser, reload the page, find the address marked with port 8443, click on it so it opens new page. Then it asks if you want to proceed and then you should click the button accordingly, so that it redirects you to the address.
