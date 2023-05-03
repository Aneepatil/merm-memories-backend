// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/userMod.js";

// export const signin = async (req, res) => {

//     const {email,password} = req.body;

//     try {
//         const existingUser = await User.findOne({email});
//         //Checking the user exist or not
//         !existingUser && res.status(404).json({message:'User Does not exist..'})

//         const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
//         // matching the password
//         !isPasswordCorrect && res.status(400).json({message:'Invalid Password..'})

//         const token = jwt.sign({email:existingUser.email, id:existingUser._id},process.env.JWT_TOKEN, { expiresIn:'1h' })

//         res.status(200).json({result:existingUser, token})

//     } catch (error) {
//         res.status(500).json(error.message)
//         console.log('------------>',error)
//     }

// };

// export const signup = async (req, res) => {

//     const {email,password,firstName,lastName,confirmPassword} = req.body
//     console.log('------>1',req.body)

//     try {

//         const existingUser = await User.findOne({email});
//         //Checking the user exist or not
//         existingUser &&  res.status(400).json({message:'User Already exist..'})

//         (password !== confirmPassword) && res.status(400).json({message:'Verify Confirm Password...'})

//         const hashedPassword = await bcrypt.hash(password,12)

//         const createdUser = await User.create({email, password:hashedPassword, name:`${firstName} ${lastName}`})


//         const token = jwt.sign({email:createdUser, id:createdUser._id}, process.env.JWT_TOKEN, { expiresIn:'1h' })

//         res.status(201).json({ result: createdUser, token });
        
        
//     } catch (error) {
//         res.status(200).json({message:error})
//         console.log(error);
        
//     }

// };


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/userMod.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModal.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials.." });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_TOKEN, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await UserModal.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, process.env.JWT_TOKEN, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json( error);
    
    // console.log(error);
  }
};