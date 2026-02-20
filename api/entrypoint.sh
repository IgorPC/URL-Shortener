#!/bin/bash

if [ ! -d "vendor" ]; then
    composer install --no-interaction --optimize-autoloader
fi

echo "Waiting project to start..."

sleep 10

php artisan migrate --force

php artisan config:clear
php artisan route:clear

echo "Starting queues..."
php artisan queue:listen --verbose --tries=3 --timeout=90 &

echo "Running server..."
php artisan serve --host=0.0.0.0 --port=8000
