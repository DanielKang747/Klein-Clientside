# Generated by Django 3.0.8 on 2020-07-31 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('klein', '0003_auto_20200731_1601'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answerkey',
            name='questionID',
            field=models.CharField(max_length=20, verbose_name='ID'),
        ),
    ]
