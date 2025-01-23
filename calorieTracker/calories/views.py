from django.shortcuts import render

from rest_framework.views import APIView
from .models import UserProfile
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from django.db import IntegrityError
from django.contrib.auth.password_validation import validate_password
from rest_framework import status
from django.contrib.auth import authenticate, login as django_login
from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist


# Create your views here.


class RegisterEmailView(APIView):
    def post(self, request):
        # Get the email from the request data
        email = request.data.get("email")

        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the email already exists in the UserProfile model
        if UserProfile.objects.filter(email=email).exists():
            return Response({"error": "Email is already in use."}, status=status.HTTP_400_BAD_REQUEST)

        # Save email in session if it's valid
        request.session["email"] = email
        request.session.save()  # Persist the session data

        return Response({"message": "Data has been successfully saved."}, status=status.HTTP_201_CREATED)


class RegisterPasswordView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if email or password is missing
        if not email or not password:
            return Response({"error": "Email or password missing."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if email is already in use
        if UserProfile.objects.filter(email=email).exists():
            return Response({"error": "Email is already in use."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate the password
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Continue with the rest of the logic (e.g., creating user profile or saving data)
        return Response({"message": "Password valid, registration successful"}, status=status.HTTP_200_OK)


class RegisterPersonalInfoView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        age = request.data.get('age')
        gender = request.data.get('gender')
        weight = request.data.get('weight')
        height = request.data.get('height')
        preferences = request.data.get('preferences')

        # Check if all required fields are provided
        if not age or not gender or not height:
            return Response({"error": "Please enter your age, gender, and height"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the email is already in use
        if UserProfile.objects.filter(email=email).exists():
            return Response({"error": "Email is already in use."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user profile
        try:
            user_profile = UserProfile(
                email=email,
                password=password,
                age=age,
                gender=gender,
                height=height,
                weight=weight,
                preferences=preferences
            )

            user_profile.save()
        except IntegrityError as e:
            return Response({"error": f"Database error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"An unexpected error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
    
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')

        # Check if email and password are provided
        if not email:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        if UserProfile.objects.filter(email = email).exists():
            # Successful login: return user data or token
            return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
        else:
            # Invalid credentials
            return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)



class CheckPasswordView(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"message": "email and password is required"}, status=status.HTTP_400_BAD_REQUEST )
        
        user = authenticate(request, email = email, password =password)

        if not user:
            
            
            return Response({"message": "Succesfully logged in"})
            
        
        django_login(request, user)

        user.is_active = True

        user.save()

