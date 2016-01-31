PY?=./env/bin/python
PIP?=./env/bin/pip

install:
	npm install
	virtualenv env
	$(PIP) install -r requirements.txt
all: install

run-webapp:
	npm start
run-api:
	$(PY) api/manage.py runserver 0.0.0.0:8000
update-api-db:
	$(PY) api/manage.py migrate
