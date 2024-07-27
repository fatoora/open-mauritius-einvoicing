# Stage 1: Build React + Vite frontend
FROM node:20 AS frontend-build

WORKDIR /app

# Copy frontend dependencies
COPY mauritius.einvoicing.client/package.json mauritius.einvoicing.client/yarn.lock ./
RUN yarn install
RUN yarn add date-fns
# Copy and build the frontend application
COPY mauritius.einvoicing.client .
RUN yarn build


# Stage 2: Build .NET backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build

WORKDIR /app

# Copy and restore backend dependencies
COPY Mauritius.EInvoicing.Server/Mauritius.EInvoicing.Server.csproj Mauritius.EInvoicing.Server/

RUN dotnet restore Mauritius.EInvoicing.Server/Mauritius.EInvoicing.Server.csproj

# Copy the rest of the backend code
COPY Mauritius.EInvoicing.Server Mauritius.EInvoicing.Server


# Publish the backend application
RUN dotnet publish Mauritius.EInvoicing.Server/Mauritius.EInvoicing.Server.csproj -c Release -o /app/publish

# Stage 3: Final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app
EXPOSE 8080
EXPOSE 5173

# Copy built frontend and published backend into final image
COPY --from=frontend-build /app/dist wwwroot/
COPY --from=backend-build /app/publish .

ENTRYPOINT ["dotnet", "Mauritius.EInvoicing.Server.dll"]
