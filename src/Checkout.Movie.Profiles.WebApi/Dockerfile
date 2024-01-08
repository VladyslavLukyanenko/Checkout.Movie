FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS profiles-dotnet-build-env
WORKDIR /profiles
COPY ./src ./
WORKDIR Checkout.Movie.Profiles.WebApi
RUN dotnet restore && dotnet publish -c Release -o ../dist

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=profiles-dotnet-build-env /profiles/dist .
ENTRYPOINT ["dotnet", "Checkout.Movie.Profiles.WebApi.dll"]
EXPOSE 443
EXPOSE 80
