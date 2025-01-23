"""
URL configuration for calorieTracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.x/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from calories.views import RegisterEmailView
from calories.views import RegisterPasswordView
from calories.views import RegisterPersonalInfoView
from calories.views import LoginView
from calories.views import CheckPasswordView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register_email/', RegisterEmailView.as_view(), name="register_email"),
    path('api/register_details/', RegisterPasswordView.as_view() ),
    path('api/register_profile/', RegisterPersonalInfoView.as_view(), name = "register"),
    path('api/login/', LoginView.as_view(), name = "login"),
    path("api/validate_user/", CheckPasswordView.as_view(), name = "login" ),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
