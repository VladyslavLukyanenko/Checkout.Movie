#!/bin/bash
cd ../src/Checkout.Movie.Profiles.Infra && \
 dotnet ef migrations add Initial --startup-project ../Checkout.Movie.Profiles.WebApi/