from django.contrib import admin

from models import Noun


class NounAdmin(admin.ModelAdmin):
    search_fields = ('word', 'details')
    list_display = ('word', 'gender', 'details', 'latest_update')
    list_filter = ('gender', 'latest_update')


admin.site.register(Noun, NounAdmin)
