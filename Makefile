PY?=./env/bin/python
PIP?=./env/bin/pip
MOB_DIR?=./germanArticlesApp/


install:
	npm install
	virtualenv env
	$(PIP) install -r requirements.txt
all: install

# Static server by Express
run-webapp:
	npm start

# Django API app
run-api:
	$(PY) api/manage.py runserver 0.0.0.0:8000
update-api-db:
	$(PY) api/manage.py migrate

# Cordova app
build-mobile:
	cd $(MOB_DIR) && cordova build
run-mobile-ios:
	cd $(MOB_DIR) && cordova run ios --debug
run-mobile-android:
	cd $(MOB_DIR) && cordova run android --debug
