import User from "../../models/UserSchema.js";

async function clearUsers() {
    try {
        await User.deleteMany({});

        console.log('The user factory has been successfully completed');
    } catch (error) {
        console.log(error);
    }
}

clearUsers().then(response => {
    process.exit();
});