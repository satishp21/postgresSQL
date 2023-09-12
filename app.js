const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const DBemp = require('./employee')
const PORT = 5000
app.use(express.json())

app.post('/add', DBemp.createEmployee)

app.get('/all',DBemp.getEmployees)

app.get("/one:id", DBemp.getOneEmployee);

app.put("/updateone:id", DBemp.updateOneEmployee);

app.delete("/deleteone:id", DBemp.deleteOneEmployee);

app.listen(PORT,()=> {
    console.log('server running on 5000')
})