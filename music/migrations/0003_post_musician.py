# Generated by Django 4.2.8 on 2023-12-11 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0002_post_alter_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='musician',
            field=models.CharField(default='Unknown', max_length=100),
        ),
    ]
