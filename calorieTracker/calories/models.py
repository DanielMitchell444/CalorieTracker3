from django.db import models
from django.core.validators import EmailValidator

# Create your models here.


from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class UserProfile(models.Model):

    email = models.EmailField(validators=[EmailValidator()], blank=False, unique=True)
    password = models.CharField(max_length=16, blank=True, unique=False,null=True)
    height = models.CharField(max_length=2, blank=True, unique=False)
    weight = models.CharField(max_length=3, blank=True, unique=False, null = True)
    gender = models.CharField(max_length=12, blank=True, unique=False)
    age = models.CharField(max_length=2, unique=False, blank=True)
    preferences = models.CharField(max_length=15, unique=False, blank=True)
    is_active = models.BooleanField(),


    def __str__(self):
     return f"{self.first_name} {self.last_name}"

class CalorieEntry(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="calorie_entries")
    date = models.DateField()  # Date for the calorie entry
    calories = models.PositiveIntegerField(default=0)  # Total calories consumed
    goal = models.PositiveIntegerField(default=2000)  # Optional: Daily calorie goal
    
    def __str__(self):
        return f"{self.user.username} - {self.date}: {self.calories} calories"
    


class UserToken(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='user_token')
    refresh_token = models.TextField()

    def __str__(self):
        return f"Token for {self.user.username}"