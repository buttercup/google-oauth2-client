# Google OAuth2 Client changelog

## v2.0.0
_2023-02-01_

 * **Major Version**
   * ESM
   * `fetch` replaces `XMLHttpRequest`

## v1.0.0
_2022-01-16_

 * Typescript
 * Wrapped error for refresh token failure

## v0.3.0
_2020-08-29_

 * Upgrade `cowl` - remove buffer dependency

## v0.2.1
_2019-11-07_

 * **Bugfix**:
   * ([#1](https://github.com/buttercup/google-oauth2-client/pull/1)) Encoded Auth codes would sometimes break authentication procedure

## v0.2.0
_2019-08-25_

 * **Breaking**:
   * Rename `OAuth2Client` methods to fix naming conflict

## v0.1.1
_2019-07-20_

 * **Bugfix**:
   * Fix `generateAuthUrl` not sending `client_id` and `redirect_uri` parameters

## v0.1.0
_2019-07-20_

 * Initial release
