from django.shortcuts import render
from .models import Project, Achievement

def home(request):
    projects = Project.objects.all()
    achievements = Achievement.objects.all()
    context = {
        'projects': projects,
        'achievements': achievements,
    }
    return render(request, 'main/home.html', context)