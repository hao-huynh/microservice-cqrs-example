# cqrs-orders
Serverless CQRS example using API gateway, Lambda, DynamoDB, SNS, Serverless Framework

# Install and configure serverless framework
> npm i serverless -g

# Install and configure AWS client
https://docs.aws.amazon.com/es_es/cli/latest/userguide/installing.html
https://serverless.com/framework/docs/providers/aws/guide/credentials/

# Payment example

## Install dependencies
>yarn install

## Running on local
>serverless dynamodb install
>yarn start

## Upload to AWS
> serverless deploy

## Test de API
> ./seed.sh

## Remove from AWS
> serverless remove
