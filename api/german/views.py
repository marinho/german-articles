import os
import json
import datetime
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

from models import Noun


def nouns_json(request):
    nouns = Noun.objects.order_by('word')

    since = request.GET.get('since', None)
    if since:
        since = datetime.datetime.strptime(since, '%Y-%m-%dT%H:%M:%S')
        nouns = nouns.filter(latest_update__gte=since)

    ret = {
        'Nouns': [{
            'word': noun.word,
            'gender': noun.gender,
            'details': noun.details
        } for noun in nouns]
    }
    return HttpResponse(json.dumps(ret),
                        content_type="application/json")


def index_html(request):
    path = os.path.join(settings.WEBAPP_DIR, 'index.html')
    fp = file(path)
    content = fp.read()
    fp.close()
    return HttpResponse(content)