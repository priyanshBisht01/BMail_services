import bcrypt from 'bcrypt'

export const hashPassword = async(password)=>{
try{
    //no. of salt round ofheo
const salt = 10
//hashing of password
const hashedPassword = await bcrypt.hash(password,salt)
return hashedPassword
}
catch(err){
console.log(err);
}
}

export const comparePassword = async(password,hashedPassword)=>{
   
    return bcrypt.compare(password,hashedPassword)
}