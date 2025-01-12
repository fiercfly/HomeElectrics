const express= require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const dotenv= require("dotenv").config()
const Stripe = require('stripe')

const app= express()

app.use(cors())
app.use(express.json({limit: "10mb"}))

const PORT= process.env.PORT || 8080
//Mongoose connection
// console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log(err))

//schema
const userSchema= mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
})


//Model
const userModel= mongoose.model("user", userSchema)//(Name of collection, Schema)


//API
app.get("/", (req,res)=>{
    res.send("server is running")
})

app.post("/signup", async (req,res)=>{
    try{
        // console.log(req.body);
        const {email}= req.body;

        const existingUser= await userModel.findOne({email});
        if(existingUser){
            return res.send({message: "Email is already registered", alert: false});
        }
        else{
            const newUser= new userModel(req.body);
            await newUser.save();
            res.send({message: "Successfully registered", alert: true});
        }
    }
    catch(err){
        console.log("Error during signup", err);
    }
})

//API login
app.post("/login", async(req, res)=>{
    try{
        const {email}= req.body;
        const {password}= req.body;
        //Have to add password authentication here..
        const result= await userModel.findOne({email});
        if(result){
            const dataSend= {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            };

            console.log(result.password);
            console.log({password});

            if(result.password === password){
                res.send({message: "Login successfull", alert: true, data: dataSend});
            }
            
            else{
                res.send({message: "Wrong Password", alert: false})
            }

            
            // console.log(dataSend)
            
        }
        else{
            res.send({message: "Email not available", alert: false})
        }
    }
    catch(err){
        console.log("error during login ",err)
    }
});

//Product section: Schemas and all

const schemaProduct= mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

const productModel= mongoose.model("product", schemaProduct)

//Save product in database
//API
app.post("/uploadProduct", async(req, res)=>{
    const data= await productModel(req.body)
    const datasave = await data.save()
    // console.log(datasave)
    res.send({message: "Upload successfully"})
})

app.get("/product", async (req,res)=>{
    const data= await productModel.find({})
    // console.log(data)
    res.send(JSON.stringify(data))
})


// ***********Payment gateway*********

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/checkout-payment",async(req, res)=>{
    // console.log(req.body)
    try {
        const params= {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types : ['card'],
            billing_address_collection : "auto",
            shipping_options: [{shipping_rate : "shr_1QfkfUATwX0fkeUvcIx7W9Mg"}],

            line_items : req.body.map((item)=>{
                return{
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                            // images: [item.image]
                        },
                        unit_amount: item.price*100,
                    },
                    adjustable_quantity:{
                        enabled:true,
                        minimum: 1,
                    },
                        quantity: item.qty
                }
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url:  `${process.env.FRONTEND_URL}/cancel`,
        }
        const session= await stripe.checkout.sessions.create(params)
        res.status(200).json(session.id)
    }
    
    catch (err) {
        res.status(err.statusCode || 500).json(err.message)
    }
})


app.listen(PORT, ()=>console.log("Server is running at port : " + PORT))