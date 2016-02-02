from django.conf.urls import url
from django.contrib import admin
from django.views.static import serve
from german.views import nouns_json
from german.views import index_html
from german.views import offline_appcache
from django.conf import settings


urlpatterns = [
    url(r'^$', index_html),
    url(r'^nouns.json', nouns_json),
    url(r'^offline.appcache', offline_appcache),
    url(r'^admin', admin.site.urls),
    url(r'^(?P<path>.*)$', serve, {
        'document_root': settings.WEBAPP_DIR
    })
]
