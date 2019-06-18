until mongo --host localhost -u admin -p admin --authenticationDatabase admin --eval "print(\"waited for connection\")"
do
    sleep 5
done
mongo --eval "db.getSiblingDB('heroes').createUser({user: 'app', pwd: 'app', roles: [{role: 'readWrite', db: 'heroes'}]})"