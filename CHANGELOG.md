# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0] - 2026-11-05
### Changed
- Preset drawings are stored in Supabase instead of Airtable (`supabase/schema.sql`).
- Build moved from Create React App and craco to Vite.
- Upgraded to React 19 and React Router 7.
- Deploys to pixelo.juleshwar.dev with pnpm and Node 22.

### Fixed
- `/play` could render an empty template when drawings were requested twice at once.

### Removed
- Airtable client and its API key, which was bundled into the public site.

## [3.0.0] - 2023-05-23
## Changed
- Upgraded all dependencies to latest in package.json & made corresponding file changes
- Switched from yarn to pnpm

## Removed
- Removed explicit tailwind dev dependency as it is implicitly supported by react-scripts v5

## [2.1.4] - 2021-07-17
## Added
- "type: module" in `package.json`

## [2.1.3] - 2021-07-17
## Changed
- Loading app using Bootstrapper
- Exposing bootstrapping API to window object

## [2.1.2] - 2021-06-13
### Added
- A page tour in `GameView`
## [2.0.3] - 2021-06-13
### Added 
- Added *./build* folder to git repo
## [2.0.2] - 2021-05-29
### Changes
- Removed a critical bug in `FireworkCanvas` which caused major performance hit

## [2.0.1] - 2021-05-26
### Added 
- Octocat to my github added to `LandingPage`

## [2.0.0] - 2021-05-25
### Added
- Added a logo for Pixelo
- Added a loading screen
- Fun `<noscript>` content
- Updated favicons and manifest
### Changed
- Added a CHANGELOG.md file.
- Fully customized the look of Pixelo
  - Moved from a tabular look to a refined look.
  - Handled responsiveness for different layouts much better than before
- 