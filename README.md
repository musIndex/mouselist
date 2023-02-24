# mouselist


## Mouselist is intended for users at an institute to communicate mouse needs and share technical advice.

### This forum enables users to make a post that users can comment on. 

#### Comments will generate an automatic email notification to the user who made original post.


---
---
### This forum was designed using Vue3 framework using Composition API with PrimeVue components. 

#### The app consists of a Vue frontend and Node/Express backend, with the frontend packaged into the backend to be served on a single port.



Requirements: NodeJS, Express JS, MariaDB, SMTP email account (Sendgrid)



The application was tested using Node.js v19.6.1 , mariadb v10.10.3, Express v4.17.1


For Mac users, you can install dependencies using Homebrew

`brew install node`

`brew install mariadb`

## Configuring the MariaDB database

_Using same db as mouseinventory respository_

Database configuration located in backend> config> database.js

_If installed mariadb using brew_

`brew services start mariadb`

`sudo mariadb -u root`

Password: (computer system password)

MariaDB > CREATE DATABASE mouse_inventory;

MariaDB > CREATE USER 'mouseuser'@'localhost' IDENTIFIED BY 'password';

MariaDB > GRANT ALL PRIVILEGES ON mouse_inventory.* TO 'mouseuser'@'localhost';

### Using a database management app (such as Sequel Pro) you can add **forum** and **comment** tables.

_Create the following table_

## forum

Add the following fields using VARCHAR type

|email |holder |mouse |details |actions |needed |comments |posted |links
|------|-------|------|--------|--------|-------|---------|-------|------|



_Create the following table_

## comment

Add the following fields using VARCHAR type
|user_email |user_comment |posted |post_id |links |mouse |email
|--         |-------------|-------|--------|------|------|------

To run the application locally from the backend directory in the terminal

cd backend

node index.js

View in a browser at http://localhost:3000

## _Troubleshooting Errors_


### When serving app

>cd backend

>node index.js

>>Cannot find package 'cors’ error

### Use
**npm install cors**


>>API key does not start with "SG

### Use

**echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env && echo "sendgrid.env" >> .gitignore && source ./sendgrid.env**

### When building frontend

>cd frontend

>npm run build

>vue-cli-service: command not found

### Use
**npm install -g @vue/cli**

**npm install -g @vue/cli-service**

**npm install**


