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
        relese_year: 1902,
        date_added: in unix time,
        file_name: "a_trip_to_the_moon_1902",
    },
    {
        ...
    },
]
```

## Collection: marketing_messages
[
  {
    _id: ObjectId('69f69f856577fc2a096bafc9'),
    timedate: '05/02/2026, 17:06:09',
    subject: 'Test',
    message: 'This is a comment'
  },
  {
    ...
  },
]
