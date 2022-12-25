import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import exphbs from 'express-handlebars'
import todoRoutes from './routes/todos.js'

const __dirname = path.resolve()
const PORT = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://noley:RxByG4j7sBa6DiFy@cluster0.yy1xmg3.mongodb.net/todos', {
                useNewUrlParser: true
            }
        )
        app.listen(PORT, () => {
            console.log('Server has been started on adress:', `http://localhost:${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()