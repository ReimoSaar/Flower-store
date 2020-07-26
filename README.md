# Flower-store
My first dockerized full stack application. Created with ReactJS, PostgreSQL, Spring Boot and NGINX.

## Features:
- Simple buying system
- Inserts generated values into database on first initialization
- Cart system of adding and removing products
- Easy to run
- Each product shows top three products that people have bought with it

## Start the application:
- Go to frontend/src/Tools/getBackendDomainAndPort.js and change the ip according to where you plan on running the docker-compose command
- Run "docker-compose up" while in the same folder with docker-compose.yml file
- Write docker host machine ip into web browser address bar with http protocol. (http://&lt;ip&gt;)

## Possible problems:
- Frontend might not be able to send requests to backend, since Spring Boot is using https protocol, then web browser might look at it as a threat.
To fix it, you have to open network tab in web browser, reload the page, find the address marked with port 8443, click on it so it opens new page. Then it asks if you want to proceed and then you should click the button accordingly, so that it redirects you to the address.
