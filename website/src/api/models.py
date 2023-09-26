from tortoise.models import Model
from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator

class Movie(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255, nullable=False)
    image = fields.CharField(max_length=255)
    description = fields.CharField(max_length=255)
    genre = fields.CharField(max_length=255)
    rating = fields.FloatField()

class Series(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255, nullable=False)
    image = fields.CharField(max_length=255)
    description = fields.CharField(max_length=255)
    genre = fields.CharField(max_length=255)
    rating = fields.FloatField()

class Actor(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255, nullable=False)
    image = fields.CharField(max_length=255)
    description = fields.CharField(max_length=255)

class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=255, nullable=False)
    email = fields.CharField(max_length=255)
    password = fields.CharField(max_length=255)

class Admin(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=255, nullable=False)
    email = fields.CharField(max_length=255)
    password = fields.CharField(max_length=255)

class UserProfile(Model):
    id = fields.IntField(pk=True)
    user_id = fields.IntField()
    first_name = fields.CharField(max_length=255)
    last_name = fields.CharField(max_length=255)
    profile_photo = fields.CharField(max_length=255)

class ConnectedDevice(Model):
    id = fields.IntField(pk=True)
    user_id = fields.IntField()
    device_name = fields.CharField(max_length=255)

class TransactionHistory(Model):
    id = fields.IntField(pk=True)
    user_id = fields.IntField()
    payment_amount = fields.FloatField()
    payment_time = fields.CharField(max_length=255)

class Favorite(Model):
    id = fields.IntField(pk=True)
    user_id = fields.IntField()
    video_id = fields.IntField()

class Voted(Model):
    id = fields.IntField(pk=True)
    user_id = fields.IntField()
    movie_id = fields.IntField()
    user_rating = fields.FloatField()

class Report(Model):
    id = fields.IntField(pk=True)
    user_id = fields.IntField()
    comment = fields.CharField(max_length=255)

# Create Pydantic models for each class model
movie_Pydantic = pydantic_model_creator(Movie, name="Movie")
series_Pydantic = pydantic_model_creator(Series, name="Series")
actor_Pydantic = pydantic_model_creator(Actor, name="Actor")
user_Pydantic = pydantic_model_creator(User, name="User")
admin_Pydantic = pydantic_model_creator(Admin, name="Admin")
userProfile_Pydantic = pydantic_model_creator(UserProfile, name="UserProfile")
connectedDevice_Pydantic = pydantic_model_creator(ConnectedDevice, name="ConnectedDevice")
transactionHistory_Pydantic = pydantic_model_creator(TransactionHistory, name="TransactionHistory")
favorite_Pydantic = pydantic_model_creator(Favorite, name="Favorite")
voted_Pydantic = pydantic_model_creator(Voted, name="Voted")
report_Pydantic = pydantic_model_creator(Report, name="Report")

# Create Pydantic models for input data (excluding read-only fields)
movie_PydanticIn = pydantic_model_creator(Movie, name="MovieIn", exclude_readonly=True)
series_PydanticIn = pydantic_model_creator(Series, name="SeriesIn", exclude_readonly=True)
actor_PydanticIn = pydantic_model_creator(Actor, name="ActorIn", exclude_readonly=True)
user_PydanticIn = pydantic_model_creator(User, name="UserIn", exclude_readonly=True)
admin_PydanticIn = pydantic_model_creator(Admin, name="AdminIn", exclude_readonly=True)
userProfile_PydanticIn = pydantic_model_creator(UserProfile, name="UserProfileIn", exclude_readonly=True)
connectedDevice_PydanticIn = pydantic_model_creator(ConnectedDevice, name="ConnectedDeviceIn", exclude_readonly=True)
transactionHistory_PydanticIn = pydantic_model_creator(TransactionHistory, name="TransactionHistoryIn", exclude_readonly=True)
favorite_PydanticIn = pydantic_model_creator(Favorite, name="FavoriteIn", exclude_readonly=True)
voted_PydanticIn = pydantic_model_creator(Voted, name="VotedIn", exclude_readonly=True)
report_PydanticIn = pydantic_model_creator(Report, name="ReportIn", exclude_readonly=True)
