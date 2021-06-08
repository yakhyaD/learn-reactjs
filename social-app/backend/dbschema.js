const db = {
    users: [
        {
            userId: '',
            email: 'paul@test.com',
            handle: "paul",
            createdAt: "2021",
            imageUrl: "",
            bio: "Hello there, i'm using scream",
            website: "https://google.com",
            location: "Manchester, UK"
        }
    ],
    screams: [
        {
            userHandle: "paul",
            body: "Hello there",
            createdAt: "2020",
            likeCount: 5,
            commentCount: 3
        }
    ],
    comments: [
        {
            handle: "paul",
            screamId: 'Qvwvf5bvwlGyB0ZXDW5Y',
            body: 'First Comment',
            createdAt: '2021-03-15T10:59:54.56'
        }
    ]
}
const userData = {
    credentials: {
        userId: 'Egqz7myBt6ZTRuMyHw1GigluCfV2',
        email: 'paul@test.com',
        handle: "paul",
        createdAt: "2021",
        imageUrl: "",
        bio: "Hello there, i'm using scream",
        website: "https://google.com",
        location: "Manchester, UK"
    },
    likes: [
        {
            userHandle: 'paul',
            screamId: 'fefe'
        }
    ]
}
const notifications = [
    {
        recipient: '',
        sender: '',
        read: true|false,
        screamId: '',
        type: 'like'|'comment',
        createdAt: ''
    }
]