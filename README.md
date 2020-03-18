<h1 align="center">ambimax/action-docker-build</h1>

<p align="center">
  GitHub Action to build docker images.
</p>

<br>


## Introduction

GitHub Action to build docker images.


## Usage

Example workflow:

```yml
name: Build image

on:
  push:
    branches:
      - master

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: ambimax/action-docker-build@v1
```

With a docker-compose file:

```yaml
    - uses: ambimax/action-docker-build@v1
      with:
        composefile: docker-compose.prod.yml
```


## Available parameters

<!-- region:parameters start -->
| Name | description | required | default |
|-|-|-|-|
| dockerfile | The Dockerfile to build. | false | Dockerfile |
| context | The build context to use. | false | . |
| composefile | The docker-compose file to build. Providing this input will ignore: dockerfile, context | false |  |
<!-- region:parameters end -->



## Development

Clone this repository

```
git clone https://github.com/ambimax/action-docker-build
```

Install all dependencies

```
yarn
```

Build the project

```
yarn build
```

Once done, commit the dist folder to a new feature branch and create a pull request.


## Author Information

- [Tobias Faust](https://github.com/FaustTobias), [ambimax® GmbH](https://ambimax.de)
