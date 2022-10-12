# Top 10 crypto exchanges

This React SPA displays the currently listed top 10 cryptocurrency centralized exchanges from the [Coingecko API](https://www.coingecko.com/en/api). Additional information about each exchange can be seen by clicking and navigating to their respective routes (or directly accessing the route i.e: http://localhost:3000/exchange/binance ).

## Running the code

### Requirements

- Locally installed Node (v16 recommended)
- npm globally installed

Only development mode has been tested. Build probably works but is untested.

### Development mode:

```
$ cd ./exchanges_directory
$ npm i
$ npm start
```

Project should now be available in http://localhost:3000

### E2E tests

**Requires project to be running in localhost:3000 (see above)**

```
$ cd ./exchanges_directory
$ npm run test:e2e
```
