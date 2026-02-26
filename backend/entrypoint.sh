#!/bin/sh

set -e

echo "Waiting for database..."
python manage.py wait_for_db

echo "Running migrations..."
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
gunicorn app.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers 3