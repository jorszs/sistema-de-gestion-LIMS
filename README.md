# LIMS SIRIUS - Papers Project

# Introduction

This project is carried out as a degree project of the Technological University of Pereira under the LIMS architecture in order to manage and administer the resources and spaces of the laboratories within the Sirius research group.


## Get started

Clone the Project with ` git clone https://gitlab.com/jorszs/LIMS.git`

## Run project 

Note: The first user created once the deployment is complete will be admin and active

On the client side install packages.
`yarn install`
and run.
`yarn dev`

On the server side install packages
`yarn install`
 and run
`yarn start`


# Deploy with DOCKER

This project is designed to run on top of docker containers.

Install docker compose https://docs.docker.com/compose/install/

Note: The first user created once the deployment is complete will be admin and active

1. Before running the containers, we must install packages and do a client-side build.

`yarn install` and `yarn build`

Note: in file _cliente/src/api/config.js_ changes `http://localhost:3977/api` by `http://localhost/api`

2. Run project 
`docker-compuse up`

Note: if you want to make changes and want to see them reflected in an optimal way, we recommend you delete the containers and deploy again

3. To remove the containers
`docker-compuse down`


# Access to mongo 

To access the database by console you can execute the following command

`docker exec -it db_mongo bash`










