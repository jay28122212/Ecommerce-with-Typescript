import express from 'express'


import userRouter from '../src/routes/user'
import itemRouter from '../src/routes/item'
import cartRouter from '../src/routes/cart'
import orderRouter from '../src/routes/order'


require('../src/db/database')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(itemRouter)
app.use(cartRouter)
app.use(orderRouter)
// app.use(stripeRoute)



var port:Number =  3000;
app.listen(port, function () {
console.log(`Server Has Started! ${port}`);
});