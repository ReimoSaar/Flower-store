# Flower-store
My first dockerized full stack application. Created with ReactJS, PostgreSQL, Spring Boot and NGINX.

## Images:
![flower-store](https://user-images.githubusercontent.com/63605374/88483653-e779e180-cf71-11ea-8451-4cc19997db84.jpg)

![flower-store-2](https://user-images.githubusercontent.com/63605374/88484225-bb605f80-cf75-11ea-9c26-35df59ac67b6.jpg)

![flower-store-3](https://user-images.githubusercontent.com/63605374/88484230-be5b5000-cf75-11ea-9838-054abb329932.jpg)

![flower-store-4](https://user-images.githubusercontent.com/63605374/88484231-c0251380-cf75-11ea-9314-e142db935a95.jpg)

![flower-store-5](https://user-images.githubusercontent.com/63605374/88484234-c2876d80-cf75-11ea-9e54-e511ad0f5263.jpg)

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
sudo docker exec -it &lt;database container name&gt; psql -U user -d Store -f docker-entrypoint-initdb.d/03-data-generator.sql

## Possible problems:
- Frontend might not be able to send requests to backend, since Spring Boot is using https protocol, then web browser might look at it as a threat.
To fix it, you have to open network tab in web browser, reload the page, find the address marked with port 8443, click on it so it opens new page. Then it asks if you want to proceed and then you should click the button accordingly, so that it redirects you to the address.
