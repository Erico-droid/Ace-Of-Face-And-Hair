from django import forms
from .models import Project

class ProjectForm(forms.ModelForm):
    widget =forms.ClearableFileInput(attrs={"allow_multiple_selected": True, "required": False})
    name = forms.CharField(required = False, widget=forms.TextInput(attrs={'name': 'projectName'}))
    brief_description = forms.CharField(required = False, widget=forms.Textarea(attrs={'name': 'projectDescription'}))
    
    class Meta:
        model = Project
        fields = ['name', 'brief_description', 'images']
