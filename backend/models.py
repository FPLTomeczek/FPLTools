from django.db import models

# Create your models here.
# class UserTeam(models.Model):
#     element = models.IntegerField(max=10000)
#     position = models.IntegerField()
#     is_captain = models.BooleanField()
#     is_vice_captain = models.BooleanField()

class Player(models.Model):
    web_name = models.CharField(max_length = 40)
    goals_scored = models.IntegerField()
    assists = models.IntegerField()
    team_code = models.IntegerField()
    total_points = models.IntegerField()

class UserFplPicks(models.Model):
    p1 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick1')
    p1_pos = models.IntegerField()
    p1_cpt = models.BooleanField()
    p1_vcpt = models.BooleanField()
    p2 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick2')
    p2_pos = models.IntegerField()
    p2_cpt = models.BooleanField()
    p2_vcpt = models.BooleanField()
    p3 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick3')
    p3_pos = models.IntegerField()
    p3_cpt = models.BooleanField()
    p3_vcpt = models.BooleanField()
    p4 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick4')
    p4_pos = models.IntegerField()
    p4_cpt = models.BooleanField()
    p4_vcpt = models.BooleanField()
    p5 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick5')
    p5_pos = models.IntegerField()
    p5_cpt = models.BooleanField()
    p5_vcpt = models.BooleanField()
    p6 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick6')
    p6_pos = models.IntegerField()
    p6_cpt = models.BooleanField()
    p6_vcpt = models.BooleanField()
    p7 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick7')
    p7_pos = models.IntegerField()
    p7_cpt = models.BooleanField()
    p7_vcpt = models.BooleanField()
    p8 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick8')
    p8_pos = models.IntegerField()
    p8_cpt = models.BooleanField()
    p8_vcpt = models.BooleanField()
    p9 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick9')
    p9_pos = models.IntegerField()
    p9_cpt = models.BooleanField()
    p9_vcpt = models.BooleanField()
    p10 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick10')
    p10_pos = models.IntegerField()
    p10_cpt = models.BooleanField()
    p10_vcpt = models.BooleanField()
    p11 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick11')
    p11_pos = models.IntegerField()
    p11_cpt = models.BooleanField()
    p11_vcpt = models.BooleanField()
    p12 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick12')
    p12_pos = models.IntegerField()
    p12_cpt = models.BooleanField()
    p12_vcpt = models.BooleanField()
    p13 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick13')
    p13_pos = models.IntegerField()
    p13_cpt = models.BooleanField()
    p13_vcpt = models.BooleanField()
    p14 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick14')
    p14_pos = models.IntegerField()
    p14_cpt = models.BooleanField()
    p14_vcpt = models.BooleanField()
    p15 = models.ForeignKey(Player, null=True, on_delete=models.SET_NULL, related_name='pick15')
    p15_pos = models.IntegerField()
    p15_cpt = models.BooleanField()
    p15_vcpt = models.BooleanField()