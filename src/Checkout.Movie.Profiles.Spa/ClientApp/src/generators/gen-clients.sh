#!/usr/bin/env bash

mv "../app/profiles-api" "../app/profiles-api_tmp"
java -jar ./openapi-generator-cli-4.2.3.jar generate -i "http://localhost:5000/swagger/v1/swagger.json" -g typescript-angular -c codegen-clients-config.json -o "../app/profiles-api"
rm -r "../app/profiles-api_tmp"
