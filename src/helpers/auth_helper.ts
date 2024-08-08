import { Request, Response, NextFunction } from 'express'
import prisma from '../helpers/prisma_initializer'
import { CustomRequest } from './interface'
import redis_client from './redis_initializer'
import { jwt_secret } from './constants'
const jwt = require('jsonwebtoken')

export const email_exist = async(req: Request, res: Response, next: NextFunction)=>{
    const {email} = req.body
    try {
        
        const user = await prisma.user.findFirst({
            where: {email}
        })

        if (user){
            return res.status(409).json({ err: 'Email already taken' })
        }

        return next()
    } catch (err:any) {
        console.log('Error occured while checking if email exist ', err)
        return res.status(500).json({err: 'Error occured while checking if email exist ', error: err})
        
    }
}

export const verify_user_otp = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const {email,otp} = req.body
    
    try 
    {
        if (!(await redis_client).isOpen) {
            console.log('Redis client not connected, attempting to reconnect...');
            await (await redis_client).connect();
        }

        const value: any = await (await redis_client).get(`${email}`)
        if (!value){
            return res.status(401).json({err: "Session has expired, kindly login again to continue..."})
        }
        const otp_data = await jwt.verify(value, jwt_secret)

        const stored_otp = otp_data.sent_otp

        if (stored_otp != otp){
            return res.status(401).json({err: 'Incorrect otp provided.'})
        }

        return res.status(200).json({msg: 'Verification successful'})

    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            return res.status(410).json({ err: `jwt token expired, generate and verify OTP`, error:err })
        }

        console.log('Error in verify otp status funciton', err)
        return res.status(500).json({ err: 'Error in verify otp status function ', error:err })
    }
}

export const verify_auth_id = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const auth_id = req.headers['x-id-key'];

        if (!auth_id) {
            return res.status(401).json({ err: 'x-id-key is missing' })
        }   

        if (!(await redis_client).isOpen) {
            console.log('Redis client not connected, attempting to reconnect...');
            await (await redis_client).connect();
        }

        const value = await (await redis_client).get(`${auth_id}`)

        if (!value) {
            return res.status(401).json({ err: `auth session id expired, please generate otp`})
        }

        const decode_value = await jwt.verify(value, jwt_secret)
        
        const user_id = decode_value.user.user_id || null        
        
        if (user_id == null){ 
            return res.status(401).json({err: 'Please enter the correct x-id-key'}) 
        }
        
        req.account_holder = decode_value
        
        return next()

    } catch (err: any) {

        if (err.name === 'TokenExpiredError') {

            return res.status(410).json({ err: `jwt token expired, regenerate OTP` })

        }
        console.error('Error in verify auth id function : ', err)

        throw new Error(err);
    }
}