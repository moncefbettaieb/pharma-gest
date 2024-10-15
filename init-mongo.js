db.createUser(
    {
        user: "myuser",
        pwd: "mypassword",
        roles: [
            {
                role: "readWrite",
                db: "nuxt-crud"
            }
        ]
    }
);
db.createCollection("test");