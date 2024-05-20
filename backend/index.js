require("dotenv").config()
const express = require("express")

const dbConnect = require("./dbConnect")
const taskRouter = require("./routes/task.route")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/api/tasks", taskRouter)

dbConnect().then(() => {
    app.listen(process.env.PORT || 80, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })

}).catch((err) => {
    console.log("Error from database: ", err)
    process.exit(1)
})

