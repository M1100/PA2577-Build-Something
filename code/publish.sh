docker build -t m1100/$1-service ./$1-service
docker push m1100/$1-service:latest
