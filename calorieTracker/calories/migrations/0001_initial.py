# Generated by Django 5.1.4 on 2025-01-18 21:29

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True, validators=[django.core.validators.EmailValidator()])),
                ('password', models.CharField(blank=True, max_length=16, null=True)),
                ('height', models.CharField(blank=True, max_length=2)),
                ('weight', models.CharField(blank=True, max_length=3)),
                ('gender', models.CharField(blank=True, max_length=12)),
                ('age', models.CharField(blank=True, max_length=2)),
                ('preferences', models.CharField(blank=True, max_length=15)),
            ],
        ),
    ]
