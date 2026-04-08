# Database Layout of MongoDB
# Database: fakeflix
## Collection: useracconts
```
[
    {
        _id: ObjectID("..."),
        username: "john_doe",
        password_sha256: "...",
        role: "viewer",
    },
    {
        ...
    },
]
```

## Collection: videos
```
[
    {
        _id: ObjectID("..."),
        title: "A Trip to The Moon",
        type: "movie",
        director: "Georges Méliès",
        relese_year: 1902,
        date_added: in unix time,
        file_name: "a_trip_to_the_moon_1902.webm",
        active: true
    },
    {
        ...
    },
]
```
