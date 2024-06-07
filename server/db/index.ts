import mongoose from "mongoose";

export default async (nitroApp: any) => {
    const config = useRuntimeConfig();
    mongoose
        .connect(config.MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
};
