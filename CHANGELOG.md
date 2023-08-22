# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

* TBD

## 0.0.1 - 2023-08-21

* Add HexDraw.js file, copied from [redblobgames.com](https://www.redblobgames.com/grids/hexagons/implementation.js?2023-04-18-20-36-24).  Changes were made to support its use with my existing functions.  In particular:
    * I deleted all invocations of drawGrid, i.e. from line 232 on down.
    * I imported my Hex classes from HexGrid.js
    * I labeled each function as exportable.
* The original file notes it is licensed under the [Apache License v2.0](http://www.apache.org/licenses/LICENSE-2.0.html).  As such, I shall note it was Copyright 2015 [Red Blob Games](redblobgames@gmail.com).

## 0.0.0 - 2023-08-21

### Added

* Add class implementations
* Add testing files
