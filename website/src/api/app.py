from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from models import (Movie, Series, Actor, User, Admin, UserProfile, TransactionHistory, Report, ConnectedDevice, Favorite, Voted)
from models import (movie_Pydantic, movie_PydanticIn,
                    series_Pydantic, series_PydanticIn,
                    actor_Pydantic, actor_PydanticIn,
                    user_Pydantic, user_PydanticIn,
                    admin_Pydantic, admin_PydanticIn,
                    userProfile_Pydantic, userProfile_PydanticIn,
                    transactionHistory_Pydantic, transactionHistory_PydanticIn,
                    report_Pydantic, report_PydanticIn,
                    connectedDevice_Pydantic, connectedDevice_PydanticIn,
                    favorite_Pydantic, favorite_PydanticIn,
                    voted_Pydantic, voted_PydanticIn)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# adding core urls
origins = [
    'http://localhost:3000',
]

# adding middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins, 
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get('/')
def index():
    return {"Msg" : "go to docs"}

@app.post('/movie')
async def add_movie(movie_info: movie_PydanticIn):
    movie_obj = await Movie.create(**movie_info.dict(exclude_unset=True))
    response = await movie_Pydantic.from_tortoise_orm(movie_obj)
    return {"status": "ok", "data" : response}

@app.get('/movie')
async def get_all_movies():
    response = await movie_Pydantic.from_queryset(Movie.all())
    return {"status": "ok", "data" : response}

@app.put('/movie/{movie_id}')
async def update_movie(movie_id: int, update_info: movie_PydanticIn):
    movie = await Movie.get(id=movie_id)
    update_info = update_info.dict(exclude_unset=True)
    movie.name = update_info['name']
    movie.image = update_info['image']
    movie.description = update_info['description']
    movie.genre = update_info['genre']
    movie.rating = update_info['rating']
    await movie.save()
    response = await movie_Pydantic.from_tortoise_orm(movie)
    return {"status": "ok", "data" : response}

@app.delete('/movie/{movie_id}')
async def delete_movie(movie_id: int):
    await Movie.get(id=movie_id).delete()
    return {"status": "ok"}

@app.post('/series')
async def add_series(serie_info: series_PydanticIn):
    serie_obj = await Series.create(**serie_info.dict(exclude_unset=True))
    response = await series_Pydantic.from_tortoise_orm(serie_obj)
    return {"status": "ok", "data" : response}

@app.get('/series')
async def get_all_series():
    response = await series_Pydantic.from_queryset(Series.all())
    return {"status": "ok", "data" : response}

@app.put('/series/{serie_id}')
async def update_serie(serie_id: int, update_info: series_PydanticIn):
    serie = await Series.get(id=serie_id)
    update_info = update_info.dict(exclude_unset=True)
    serie.name = update_info['name']
    serie.image = update_info['image']
    serie.description = update_info['description']
    serie.genre = update_info['genre']
    serie.rating = update_info['rating']
    await serie.save()
    response = await series_Pydantic.from_tortoise_orm(serie)
    return {"status": "ok", "data" : response}

@app.delete('/series/{serie_id}')
async def delete_serie(serie_id: int):
    await Series.get(id=serie_id).delete()
    return {"status": "ok"}

@app.post('/actor')
async def add_actor(actor_info: actor_PydanticIn):
    actor_obj = await Actor.create(**actor_info.dict(exclude_unset=True))
    response = await actor_Pydantic.from_tortoise_orm(actor_obj)
    return {"status": "ok", "data": response}

@app.get('/actor')
async def get_all_actors():
    response = await actor_Pydantic.from_queryset(Actor.all())
    return {"status": "ok", "data": response}

@app.put('/actor/{actor_id}')
async def update_actor(actor_id: int, update_info: actor_PydanticIn):
    actor = await Actor.get(id=actor_id)
    update_info = update_info.dict(exclude_unset=True)
    for key, value in update_info.items():
        setattr(actor, key, value)
    await actor.save()
    response = await actor_Pydantic.from_tortoise_orm(actor)
    return {"status": "ok", "data": response}

@app.delete('/actor/{actor_id}')
async def delete_actor(actor_id: int):
    await Actor.get(id=actor_id).delete()
    return {"status": "ok"}

@app.post('/user')
async def add_user(user_info: user_PydanticIn):
    user_obj = await User.create(**user_info.dict(exclude_unset=True))
    response = await user_Pydantic.from_tortoise_orm(user_obj)
    return {"status": "ok", "data": response}

@app.get('/user')
async def get_all_users():
    response = await user_Pydantic.from_queryset(User.all())
    return {"status": "ok", "data": response}

@app.put('/user/{user_id}')
async def update_user(user_id: int, update_info: user_PydanticIn):
    user = await User.get(id=user_id)
    update_info = update_info.dict(exclude_unset=True)
    for key, value in update_info.items():
        setattr(user, key, value)
    await user.save()
    response = await user_Pydantic.from_tortoise_orm(user)
    return {"status": "ok", "data": response}

@app.delete('/user/{user_id}')
async def delete_user(user_id: int):
    await User.get(id=user_id).delete()
    return {"status": "ok"}

@app.post('/admin')
async def add_admin(admin_info: admin_PydanticIn):
    admin_obj = await Admin.create(**admin_info.dict(exclude_unset=True))
    response = await admin_Pydantic.from_tortoise_orm(admin_obj)
    return {"status": "ok", "data": response}

@app.get('/admin')
async def get_all_admins():
    response = await admin_Pydantic.from_queryset(Admin.all())
    return {"status": "ok", "data": response}

@app.put('/admin/{admin_id}')
async def update_admin(admin_id: int, update_info: admin_PydanticIn):
    admin = await Admin.get(id=admin_id)
    update_info = update_info.dict(exclude_unset=True)
    for key, value in update_info.items():
        setattr(admin, key, value)
    await admin.save()
    response = await admin_Pydantic.from_tortoise_orm(admin)
    return {"status": "ok", "data": response}

@app.delete('/admin/{admin_id}')
async def delete_admin(admin_id: int):
    await Admin.get(id=admin_id).delete()
    return {"status": "ok"}

@app.post('/userprofile')
async def add_user_profile(user_profile_info: userProfile_PydanticIn):
    user_profile_obj = await UserProfile.create(**user_profile_info.dict(exclude_unset=True))
    response = await userProfile_Pydantic.from_tortoise_orm(user_profile_obj)
    return {"status": "ok", "data": response}

@app.get('/userprofile')
async def get_all_user_profiles():
    response = await userProfile_Pydantic.from_queryset(UserProfile.all())
    return {"status": "ok", "data": response}

@app.put('/userprofile/{userprofile_id}')
async def update_user_profile(userprofile_id: int, update_info: userProfile_PydanticIn):
    user_profile = await UserProfile.get(id=userprofile_id)
    update_info = update_info.dict(exclude_unset=True)
    for key, value in update_info.items():
        setattr(user_profile, key, value)
    await user_profile.save()
    response = await userProfile_Pydantic.from_tortoise_orm(user_profile)
    return {"status": "ok", "data": response}

@app.delete('/userprofile/{userprofile_id}')
async def delete_user_profile(userprofile_id: int):
    await UserProfile.get(id=userprofile_id).delete()
    return {"status": "ok"}

@app.post('/transactionhistory')
async def add_transaction_history(transaction_history_info: transactionHistory_PydanticIn):
    transaction_history_obj = await TransactionHistory.create(**transaction_history_info.dict(exclude_unset=True))
    response = await transactionHistory_Pydantic.from_tortoise_orm(transaction_history_obj)
    return {"status": "ok", "data": response}

@app.get('/transactionhistory')
async def get_all_transaction_histories():
    response = await transactionHistory_Pydantic.from_queryset(TransactionHistory.all())
    return {"status": "ok", "data": response}

@app.put('/transactionhistory/{transactionhistory_id}')
async def update_transaction_history(transactionhistory_id: int, update_info: transactionHistory_PydanticIn):
    transaction_history = await TransactionHistory.get(id=transactionhistory_id)
    update_info = update_info.dict(exclude_unset=True)
    for key, value in update_info.items():
        setattr(transaction_history, key, value)
    await transaction_history.save()
    response = await transactionHistory_Pydantic.from_tortoise_orm(transaction_history)
    return {"status": "ok", "data": response}

@app.delete('/transactionhistory/{transactionhistory_id}')
async def delete_transaction_history(transactionhistory_id: int):
    await TransactionHistory.get(id=transactionhistory_id).delete()
    return {"status": "ok"}

@app.post('/report')
async def add_report(report_info: report_PydanticIn):
    report_obj = await Report.create(**report_info.dict(exclude_unset=True))
    response = await report_Pydantic.from_tortoise_orm(report_obj)
    return {"status": "ok", "data": response}

@app.get('/report')
async def get_all_reports():
    response = await report_Pydantic.from_queryset(Report.all())
    return {"status": "ok", "data": response}

@app.put('/report/{report_id}')
async def update_report(report_id: int, update_info: report_PydanticIn):
    report = await Report.get(id=report_id)
    update_info = update_info.dict(exclude_unset=True)
    for key, value in update_info.items():
        setattr(report, key, value)
    await report.save()
    response = await report_Pydantic.from_tortoise_orm(report)
    return {"status": "ok", "data": response}

@app.delete('/report/{report_id}')
async def delete_report(report_id: int):
    await Report.get(id=report_id).delete()
    return {"status": "ok"}

@app.post('/connecteddevice')
async def add_connected_device(connected_device_info: connectedDevice_PydanticIn):
    connected_device_obj = await ConnectedDevice.create(**connected_device_info.dict(exclude_unset=True))
    response = await connectedDevice_Pydantic.from_tortoise_orm(connected_device_obj)
    return {"status": "ok", "data": response}

@app.get('/connecteddevice')
async def get_all_connected_devices():
    response = await connectedDevice_Pydantic.from_queryset(ConnectedDevice.all())
    return {"status": "ok", "data": response}

@app.put('/connecteddevice/{connecteddevice_id}')
async def update_connected_device(connecteddevice_id: int, update_info: connectedDevice_PydanticIn):
    connected_device = await ConnectedDevice.get(id=connecteddevice_id)
    update_info = update_info.dict(exclude_unset=True)
    for key, value in update_info.items():
        setattr(connected_device, key, value)
    await connected_device.save()
    response = await connectedDevice_Pydantic.from_tortoise_orm(connected_device)
    return {"status": "ok", "data": response}

@app.delete('/connecteddevice/{connecteddevice_id}')
async def delete_connected_device(connecteddevice_id: int):
    await ConnectedDevice.get(id=connecteddevice_id).delete()
    return {"status": "ok"}

@app.post('/favorite')
async def add_favorite(favorite_info: favorite_PydanticIn):
    favorite_obj = await Favorite.create(**favorite_info.dict(exclude_unset=True))
    response = await favorite_Pydantic.from_tortoise_orm(favorite_obj)
    return {"status": "ok", "data": response}

@app.get('/favorite')
async def get_all_favorites():
    response = await favorite_Pydantic.from_queryset(Favorite.all())
    return {"status": "ok", "data": response}

@app.delete('/favorite/{favorite_id}')
async def delete_favorite(favorite_id: int):
    await Favorite.get(id=favorite_id).delete()
    return {"status": "ok"}

@app.post('/voted')
async def add_voted(voted_info: voted_PydanticIn):
    voted_obj = await Voted.create(**voted_info.dict(exclude_unset=True))
    response = await voted_Pydantic.from_tortoise_orm(voted_obj)
    return {"status": "ok", "data": response}

@app.get('/voted')
async def get_all_voted():
    response = await voted_Pydantic.from_queryset(Voted.all())
    return {"status": "ok", "data": response}

@app.put('/voted/{voted_id}')
async def update_voted(voted_id: int, update_info: voted_PydanticIn):
    voted = await Voted.get(id=voted_id)
    update_info = update_info.dict(exclude_unset=True)
    for key, value in update_info.items():
        setattr(voted, key, value)
    await voted.save()
    response = await voted_Pydantic.from_tortoise_orm(voted)
    return {"status": "ok", "data": response}

@app.delete('/voted/{voted_id}')
async def delete_voted(voted_id: int):
    await Voted.get(id=voted_id).delete()
    return {"status": "ok"}

register_tortoise(
    app,
    db_url="sqlite://database.sqlite3",
    modules={"moduls": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True
)