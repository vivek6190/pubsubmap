from django.shortcuts import render
from django.conf import settings
# Create your views here.

def home(request):
    return render(request, 'index.html', {'PUB_KEY': settings.PUBNUB_PUB_KEY,
                                            'SUB_KEY': settings.PUBNUB_SUB_KEY,
                                            'MAPS_KEY': settings.GEOPOSITION_GOOGLE_MAPS_API_KEY })
