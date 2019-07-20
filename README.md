# Google OAuth2 Client
> Minimal compatibility-first Google OAuth2 client implementation

[![npm version](https://badge.fury.io/js/%40buttercup%2Fgoogle-oauth2-client.svg)](https://www.npmjs.com/package/@buttercup/google-oauth2-client) [![Build Status](https://travis-ci.org/buttercup/google-oauth2-client.svg?branch=master)](https://travis-ci.org/buttercup/google-oauth2-client)

## About

This library is a minimal implementation of the [`google-auth-library`](https://github.com/googleapis/google-auth-library-nodejs) project, designed to be compatible with NodeJS, the browser and React Native. The `google-auth-library` package has had [problems with compatibility](https://github.com/googleapis/google-auth-library-nodejs/issues/150) in this regard and rather than wait for that to get sorted, this library was released to solve the exact problem without the overhead of project politics, wait times and package excess (extra features not needed that are causing the incompatibilities in the first place).

This library is targeted at NodeJS but should work everywhere.

## Usage

Install by running `npm install @buttercup/google-oauth2-client --save`.

Import the `OAuth2Client` class to get started, similarly to the original implemenation:

```javascript
import { OAuth2Client } from "@buttercup/google-oauth2-client";

const client = new OAuth2Client(
    "my-client-id",
    "my-client-secret",
    "http://redirect.uri"
);

const authURL = client.generateAuthUrl(/* ... */);
```

### Implemented features

The following methods are implemented:

| Method                | Example                           | Description                               |
|-----------------------|-----------------------------------|-------------------------------------------|
| `generateAuthUrl`     | `generateAuthUrl({ access_type: "offline", prompt: "consent", scope: "profile" })` | Generate an authorisation URL |
| `getToken`            | `await getToken(authCode)`        | Get the tokens for an authorisation code  |
| `refreshToken`        | `await refreshToken(refreshToken`)| Refresh the tokens                        |
