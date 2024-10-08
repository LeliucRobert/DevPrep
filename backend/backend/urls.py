
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, get_user_details
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/user/<int:user_id>/', get_user_details, name='get_user_details'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/' , include("rest_framework.urls")),
    path('api/' , include("api.urls")),
     path('summernote/', include('django_summernote.urls')),
]
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)