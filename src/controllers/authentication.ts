import { Request, Response, NextFunction } from 'express'
import prisma from '../helpers/prisma_initializer'
import { salt_round } from '../helpers/constants'
import converted_datetime from '../helpers/date_time_elements'
import { mobile_redis_auth_store, redis_auth_store, redis_otp_store, redis_value_update } from '../helpers/redis_funtions'
import {generate_otp, generate_referral_code} from '../helpers/generated_entities'
import { CustomRequest } from '../helpers/interface'
import { admin_welcome_mail_messenger, notify_admin_of_new_staff, otp_messanger, staff_account_approval_mail, staff_account_deletion_mail, staff_role_change_mail, staff_welcome_mail_messenger, user_account_suspension_mail, user_account_unsuspension_mail, welcome_mail_messanger } from '../helpers/emails'
const bcrypt = require('bcrypt')

export const admin_signup = async(req: Request, res: Response, next: NextFunction)=>{
    try {

        req.body.password = await bcrypt.hash(req.body.password, salt_round)
        req.body.created_at = converted_datetime()
        req.body.updated_at = converted_datetime()
        req.body.is_staff   = true
        req.body.is_approved = true
        req.body.user_role = 'ADMIN'

        const new_admin = await prisma.user.create({
            data: req.body
        })

        admin_welcome_mail_messenger(new_admin)

        return res.status(201).json({msg: 'Admin created successfully', user: new_admin})
        
    } catch (err:any) {
        console.log(`Error occured while signing in the admin `, err);
        return res.status(500).json({err: 'Error occured while signing in the admin user ', error: err})
    }
}

export const user_signup = async(req: Request, res: Response, next: NextFunction)=>{
    const {last_name, first_name, password, email, user_role} = req.body

    try {
        req.body.password = await bcrypt.hash(password, salt_round);
        req.body.created_at = converted_datetime()
        req.body.updated_at = converted_datetime()
        if (user_role == 'CLIENT'){
            req.body.is_approved = true
            req.body.is_staff = false
        }else if (user_role == 'ADMIN'){
            return res.status(401).json({err: 'Not authorized to select Admin as role'})
        }else{
            req.body.is_approved = false
            req.body.is_staff = true
        }
        
        const [user_signup, admins] = await Promise.all([
            prisma.user.create({ data: req.body  }),
            prisma.user.findMany({ where: {user_role: 'ADMIN'} })
        ]) 

        if (user_role == 'CLIENT'){
            welcome_mail_messanger(user_signup)
        }else{
            staff_welcome_mail_messenger(user_signup )

            admins.forEach((data, ind)=>{
                notify_admin_of_new_staff(user_signup, data.email )
            })
        }

        return res.status(201).json({msg: 'User created successfully.', user: user_signup})
        
    } catch (err:any) {
        console.log('Error during user signup ',err)
        return res.status(500).json({err: 'Error during user signup ', error: err})
    }
}

export const user_login = async(req: Request, res: Response, next: NextFunction)=>{
    const {password, email} = req.body
    try {
        
        const user = await prisma.user.findUnique({where: {email}})

        if (!user){
            console.log('Incorrect email address')
            return res.status(404).json({err: 'Incorrect email address, check email and try again'})
        }

        if (user.is_staff && !user.is_approved){
            return res.status(401).json({err: 'Account still awaiting approval.'})
        }

        const match_password: boolean = await bcrypt.compare(password, user.password)

        if (!match_password) {
            console.log('Incorrect password')
            return res.status(401).json({ err: `Incorrect password.` })
        }

        const x_id_key = await redis_auth_store(user, 60 * 60 * 23)
        
        res.setHeader('x-id-key', x_id_key)

        
        return res.status(200).json({ msg: "Login successful", user_data: user })

    } catch (err:any) {
        console.log('Error during user login',err)
        return res.status(500).json({err: 'Error during user login', error: err})
    }
}

export const approve_staff_account = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    try {
        
        const user_role = req.account_holder.user.user_role

        if (user_role != 'ADMIN'){
            return res.status(401).json({err: 'Not authorized to perform selected operation.'})
        }

        const {user_id}  = req.params

        const staff = await prisma.user.findUnique({ where: {user_id} })        

        if (!staff){
            return res.status(404).json({err: 'Staff\'s account to be approved not found'})
        }

        if (staff.user_role == 'CLIENT'){
            return res.status(400).json({err: 'Client account is already approved.'})
        }

        const approve_staff = await prisma.user.update({ where: {user_id}, data: {
            is_approved: true,
            updated_at: converted_datetime()
        } })

        staff_account_approval_mail(approve_staff)

        return res.status(200).json({msg: 'Staff account approved successfuly'})

    } catch (err:any) {
        console.log('Error occured while approving staff account ', err);
        return res.status(500).json({err: 'Error occured while approving staff account ', error: err})
    }
}

export const delete_staff_account = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    try {
        const user_role = req.account_holder.user.user_role

        if (user_role != 'ADMIN'){
            return res.status(401).json({err: 'Not authorized to perform selected operation.'})
        }

        const {user_id}  = req.params

        const staff = await prisma.user.findUnique({ where: {user_id} })        

        if (!staff){
            return res.status(404).json({err: 'Staff to be deleted not found or already deleted'})
        }

        const delete_staff = await prisma.user.delete({ where: {user_id} })

        staff_account_deletion_mail(delete_staff)

        return res.status(200).json({msg: 'Staff account deleted successfuly'})

    } catch (err:any) {
        console.log('Error occured while deleting staff account ', err);
        return res.status(500).json({err: 'Error occured while deleting staff account', error:err})
    }
}

export const edit_staff_role = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    const {user_role} = req.body
    try {
        
        const old_user_role = req.account_holder.user.user_role

        if (old_user_role != 'ADMIN'){
            return res.status(401).json({err: 'Not authorized to perform selected operation.'})
        }

        const {user_id}  = req.params

        const staff = await prisma.user.findUnique({ where: {user_id} })        

        if (!staff){
            return res.status(404).json({err: 'Staff not found'})
        }

        if (staff.user_role == 'CLIENT'){
            return res.status(400).json({err: 'You cannot assign a role to a client'})
        }

        if (user_role == 'ADMIN'){
            return res.status(401).json({err: `You are not authorized to assign ADMIN roles`})
        }

        const update_staff = await prisma.user.update({
            where: {user_id},
            data: {user_role, updated_at: converted_datetime()}
        })

        staff_role_change_mail(update_staff, user_role)

        return res.status(200).json({err: 'Staff role updated successfully'})
        
    } catch (err:any) {
        console.log('Error occured while changing staff role ', err);
        return res.status(500).json({err: 'Error occured while changing staff role ', error: err})
    }
}

export const generate_user_otp = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    const {email} = req.body
    try {

        const otp = generate_otp()

        const user = await prisma.user.findUnique({where: {email}})

        await redis_otp_store(email, otp, 'unverified', 60 * 60 * 1/6) // otp valid for 10min

        otp_messanger(user, otp)
        
        return res.status(201).json({ msg: `A six digit unique code has been sent to ${email}, and it's only valid for 10min`})

    } catch (err:any) {
        console.log('Error occured while generating otp ',err)
        return res.status(500).json({err: 'Error occured while genrating otp ', error: err})
    }
}

export const reset_password = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    try {

        const new_encrypted_password = await bcrypt.hash(req.body.password, salt_round)

        const user = await prisma.user.update({
            where: {email: req.body.email},
            data: { password: new_encrypted_password, updated_at: converted_datetime() }
        })

        const x_id_key = await redis_auth_store(user_signup, 60 * 60 * 23)
        
        res.setHeader('x-id-key', x_id_key)

        return res.status(200).json({msg: 'Password update successful'})
        
    } catch (err:any) {
        console.log('Error occured while reseting user password ', err);
        return res.status(500).json({err: 'Error occured while reseting user password ', error: err})
    }
}

export const update_user_active_status = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    try {
        
        const user_role = req.account_holder.user.user_role

        if (user_role != 'ADMIN'){
            return res.status(401).json({err: 'Not authorized to perform selected operation.'})
        }

        const {user_id}  = req.params

        const user = await prisma.user.findUnique({ where: {user_id} })        

        if (!user){
            return res.status(404).json({err: 'Incorred user id provided'})
        }

        const update_user_status = await prisma.user.update({
            where: {user_id},
            data: {
                active_status: false,
                updated_at: converted_datetime()
            }
        })
        
        if (!update_user_status){
            return res.status(404).json({err: 'Selected user not found'})
        }

        if (req.body.active_status == true){
            user_account_unsuspension_mail(update_user_status)
        }else{
            user_account_suspension_mail(update_user_status)
        }

        return res.status(200).json({msg: `User's status updated successfully`, user: update_user_status})

    } catch (err:any) {
        console.log('Error occured while updating active user status ', err);
        return res.status(500).json({err: 'Error occured while update active user status ', error:err})
    }
}

export const all_users = async(req: CustomRequest, res: Response)=>{
    try {
        
        const user_id = req.account_holder.user.user_id

        const {page_number} = req.params

        const [number_of_users, users] = await Promise.all([
            prisma.user.count({ where: {user_id: {not: user_id}}}),

            prisma.user.findMany({
                where: {user_id: {not: user_id}},

                skip: (Math.abs(Number(page_number)) - 1) * 15,

                take: 15,

                orderBy: { created_at: 'desc' }
                
            })
        ])

        const number_of_pages = (number_of_users <= 15) ? 1 : Math.ceil(number_of_users/15)

        return res.status(200).json({ message:'All Users', data: {total_number_of_users: number_of_users, total_number_of_pages: number_of_pages, users} })

    } catch (err:any) {
        console.log('Error occured while fetching all users ', err);
        return res.status(500).json({err: 'Error occured while fetching all users', error: err})
    }
}