# Generated by Django 4.0.3 on 2022-12-07 03:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='time',
            field=models.TimeField(null=True),
        ),
    ]