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
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1
      - uses: ambimax/action-docker-build@v1
```

<!-- region:examples start -->
### [dockerfile](test/01-dockerfile)

Build a single docker file in the root of the repository.

```yml
      - uses: ambimax/action-docker-build@v1
```

### [dockerfile-custom](test/02-dockerfile-custom)

Build a dockerfile from a custom directory.

```NOTE``` The build context will still be the root of the repository.


```yml
      - uses: ambimax/action-docker-build@v1
        with:
          dockerfile: docker/Dockerfile
```

### [dockerfile-context](test/03-dockerfile-context)

Build a dockerfile from a custom context.


```yml
      - uses: ambimax/action-docker-build@v1
        with:
          context: packages/hello-world
          dockerfile: packages/hello-world/Dockerfile
```

### [dockercompose](test/04-dockercompose)

Build a docker-compose.yml.


```yml
      - uses: ambimax/action-docker-build@v1
        with:
          composefile: docker-compose.yml
          tag: hello-world
```
<!-- region:examples end -->


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
