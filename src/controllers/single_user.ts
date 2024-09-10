import { Request, Response, NextFunction } from 'express'
import prisma from '../helpers/prisma_initializer'
import { salt_round } from '../helpers/constants'
import converted_datetime from '../helpers/date_time_elements'
import { mobile_redis_auth_store, redis_auth_store, redis_otp_store, redis_value_update } from '../helpers/redis_funtions'
import {generate_otp, generate_referral_code} from '../helpers/generated_entities'
import { CustomRequest } from '../helpers/interface'
import { admin_welcome_mail_messenger, otp_messanger } from '../helpers/emails'
const bcrypt = require('bcrypt')

export const user_managment = async(req: CustomRequest, res: Response)=>{
    try {
        const user_id = req.account_holder.user.user_id

        const profile = await prisma.user.findFirst({
            where: {
                user_id, user_role:"single_user",
            },
            include:{
                profiles: {
                    include: {
                        credit_reports: true
                    }
                }
            }

        })

        return res.status(200).json({
            msg: 'User Profile',
            profile: profile
        })

    } catch (err:any) {
        console.log('Error occured while fetching user managment ', err)
        return res.status(500).json({err: 'Error occured while fetching user managment ', error:err})
    }
}