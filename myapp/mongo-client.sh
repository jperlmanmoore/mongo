FOLDER=$PWD PUID=$(id -u) PGID=$(id -g) docker-compose run --rm client mongo 'mongodb://mongo-server:27017/test?authSource=admin'
