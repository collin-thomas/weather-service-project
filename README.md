# Weather Service Project

## Prompt

Write an http server that uses the Open Weather API that exposes an endpoint that takes in lat/long coordinates.

This endpoint should return what the weather condition is outside in that area (snow, rain, etc), whether it’s hot, cold, or moderate outside (use your own discretion on what temperature equates to each type), and whether there are any weather alerts going on in that area, with what is going on if there is currently an active alert.

The API can be found here: <https://openweathermap.org/api>. The one-call api returns all of the data while the other apis are piece-mealed sections. You may also find the <https://openweathermap.org/faq> useful.

### Summary of Response

- Weather Condition (Snow, Rain, etc)
- Temperature (Hot, Moderate, Cold)
- Weather alerts and description of each alert

## Usage

### Route Syntax

`GET /weather?lat={lat}&lon={lon}&api_key={api_key}`

## Environment Variables

Copy `.env` to create `.env.development` and `.env.production`. Then enter the `OPEN_WEATHER_API_KEY`.

If we had CI/CD we would have the environment variables securely stored in the cloud and create the `.env.*` file or k8s ConfigMap as part of the pipeline.

### Obtaining an API Key

1. Sign up for OpenWeather
2. Get your key from here: <https://home.openweathermap.org/api_keys>
3. Subscribe to `One Call API` here: <https://openweathermap.org/api>

## Test

```sh
npm test
```

```sh
npm run test:watch
```

## Run without Docker

First, setup Environment Variables.

```sh
npm install

npm run development
# or
npm run production
```

## Docker

### Build Locally

```sh
docker build --target development -t weather-service-project:1.0.0-development .
docker build --target production -t weather-service-project:1.0.0-production .
```

### Run Development

Docker will take care of all dependencies, you don't even need node installed on your machine. This is using `nodemon` and exposes the debugger port to connect to VSCode.

```sh
docker run \
    --rm \
    -p 3000:3000 \
    -p 9299:9299 \
    -v `pwd`/src:/app/src \
    -v `pwd`/package.json:/app/package.json \
    -v `pwd`/.env.development:/app/.env.development \
    --name weather-service-project \
    weather-service-project:1.0.0-development
```

### Run Production

```sh
docker run \
    --rm \
    -p 3000:3000 \
    --env-file .env.production \
    --name weather-service-project \
    weather-service-project:1.0.0-production
```
