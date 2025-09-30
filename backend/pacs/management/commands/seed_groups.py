from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = "Create default groups: client, coordinator, doctor"

    def handle(self, *args, **options):
        for g in ["client", "coordinator", "doctor"]:
            Group.objects.get_or_create(name=g)
        self.stdout.write(self.style.SUCCESS("Groups ensured."))
