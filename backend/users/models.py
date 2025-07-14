from django.db import models
from django.core.validators import EmailValidator
from django.utils import timezone

# Create your models here.
class Member(models.Model):
    BANK_CHOICES = [
        ('Access', 'Access Bank'),
        ('First', 'First Bank'),
        ('GTB', 'Guaranty Trust Bank'),
        ('Zenith', 'Zenith Bank'),
        ('UBA', 'United Bank for Africa'),
        ('Ecobank', 'Ecobank'),
        ('Fidelity', 'Fidelity Bank'),
        ('Stanbic', 'Stanbic IBTC'),
        ('Union', 'Union Bank'),
        ('Other', 'Other'),
    ]

    STAGE_CHOICES = [
        ('1', 'Stage 1'),
        ('2', 'Stage 2'),
        ('3', 'Stage 3'),
        ('4', 'Stage 4'),
        ('5', 'Stage 5'),
    ]

    # Personal Information
    full_name = models.CharField(max_length=255)
    code_id = models.CharField(max_length=50, unique=True)
    email = models.EmailField(validators=[EmailValidator()])
    phone = models.CharField(max_length=20)
    whatsapp = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    stage = models.CharField(max_length=1, choices=STAGE_CHOICES, default='1')
    registration_date = models.DateTimeField(default=timezone.now)

    # Banking Information
    bank_name = models.CharField(max_length=50, choices=BANK_CHOICES, blank=True, null=True)
    bank_account_no = models.CharField(max_length=20, blank=True, null=True)

    # Referral Information
    no_referrals = models.IntegerField(default=0, blank=True, null=True)
    referral_phone = models.CharField(max_length=20, blank=True, null=True)
    referral_code_id = models.CharField(max_length=50, blank=True, null=True)

    # Next of Kin Information
    next_of_kin_name = models.CharField(max_length=255, blank=True, null=True)
    next_of_kin_phone = models.CharField(max_length=20, blank=True, null=True)
    next_of_kin_email = models.EmailField(blank=True, null=True, validators=[EmailValidator()])
    next_of_kin_address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.full_name} ({self.code_id})"
    
    class Meta:
        ordering = ['-registration_date']
    