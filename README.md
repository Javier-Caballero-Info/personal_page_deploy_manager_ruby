# Personal Page Deploy Manager - Ruby

> 

## Table of Contents

-   [Overview](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master/README.md#overview)
-   [API Description](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master/README.md#api_description)
-   [Clone](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master/README.md#clone)
- [Requirements](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#requirements)
- [Installation](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#installation)
	- [ruby](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#ruby)
	- [Dependencies](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#dependencies)
- [Environment](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#environment)
- [Run test](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#run-test)
- [Run the background taks](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#run-the-background-taks)
- [Run the cron jobs](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#run-the-cron-jobs)
- [Build](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#build)
- [Running with Docker](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#running-with-docker)
	- [Building the image](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#building-the-image)
	- [Starting up a container](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#starting-up-a-container)
- [Contributing](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#contributing)
- [Author](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#author)
- [License](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/tree/master#license)

## Overview


## API Description

For more information about the endpoints of the API please check the [apiary doc](https://personalpagedeploymanagerruby.docs.apiary.io).

## Clone

```bash
git clone https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby.git
git remote rm origin
git remote add origin <your-git-path>
```

## Requirements

* **Ruby:** 2.3.0 or above

## Installation

1. ### Ruby

    - Debian / Ubuntu

        ```Bash
        sudo apt install ruby-full
        ```
        
    - MacOS
    
        - Brew
            ```bash
            brew install ruby
            ```

    - Windows

        - Installer

            Download the msi installer [https://rubyinstaller.org/](https://rubyinstaller.org/).


2. ### Dependencies

    ```Bash
    bundle install
    ```

## Environment

Export the following environment variables:

```bash
PORT=3000

# Portainer
PORTAINER_USER=username
PORTAINER_PASSWORD=password

# MongoDB
MONGOHQ_URL=conection_path_string
```

## Run test

Without test for the momment


## Run the background taks

```bash
rails runner 'Delayed::Backend::Mongoid::Job.create_indexes'
rails generate delayed_job
bin/delayed_job start
```

## Run the cron jobs

```bash
# Run cron jobs
```

## Build


```bash
rake assets:precompile
```

## Running with Docker

To run the server on a Docker container, please execute the following from the root directory:

### Building the image


```bash
docker build -t personal_page_deploy_manager_ruby .
```
 
### Starting up a container

```bash
docker run -p 3000:3000 -d \
-e PORTAINER_USER="user" \
-e PORTAINER_PASSWORD="passwrod" \
-e MONGOHQ_URL="conection_path_string" \
--name deploy_manager \
personal_page_deploy_manager_ruby
```


## Contributing

Contributions welcome! See the  [Contributing Guide](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/blob/master/CONTRIBUTING.md).

## Author

Created and maintained by [Javier Hernán Caballero García](https://javiercaballero.info)).

## License

GNU General Public License v3.0

See  [LICENSE](https://github.com/Javier-Caballero-Info/personal_page_deploy_manager_ruby/blob/master/LICENSE)
