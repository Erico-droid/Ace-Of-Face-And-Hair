from typing import Any
from django.utils import timezone
from .models import DailyVisit, Visitor
from django.contrib.sessions.models import Session

class RecordVisitMiddleWare:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.session.exists(request.session.session_key):
            request.session.create()
            request.session['dark_mode'] = False

        session_key = request.session.session_key

        try:
            user = Visitor.objects.get(visitorSessionName=session_key)
        except Visitor.DoesNotExist:
            user = Visitor.objects.create(visitorSessionName=session_key)
        except Visitor.MultipleObjectsReturned:
            user = Visitor.objects.filter(visitorSessionName=session_key).first()

        today = timezone.now().date()
        DailyVisit.objects.get_or_create(user=user, visit_date=today)
        response = self.get_response(request)
        # print("CXsxxxx: ", request.session['dark_mode'])
        # Update 'dark_mode' in the session after processing the request

        return response