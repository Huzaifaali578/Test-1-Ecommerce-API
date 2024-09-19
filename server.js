import app from "./app.js";
import connectToDB from "./srv/config/config.js";

const port = process.env.PORT || 3200
app.listen(port, () => {
    console.log("Server is listning on PORT 3200")
    connectToDB();
});