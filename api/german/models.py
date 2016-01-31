from __future__ import unicode_literals

from django.db import models


class Noun(models.Model):
    class Meta:
        unique_together = (
                ('word', 'gender'),
                )

    GENDERS = (
        ('m', 'Maskulin'),
        ('f', 'Feminin'),
        ('n', 'Neutrum'),
        ('p', 'Plural'),
    )

    word = models.CharField(max_length=100)
    gender = models.CharField(max_length=1,
                              choices=GENDERS)
    details = models.TextField(blank=True)
    latest_update = models.DateTimeField(auto_now=True,
                                       db_index=True)

    def __unicode__(self):
        return self.word
