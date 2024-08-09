import { Request, Response, NextFunction } from 'express'
import prisma from '../helpers/prisma_initializer'
import { salt_round } from '../helpers/constants'
import converted_datetime from '../helpers/date_time_elements'
import { mobile_redis_auth_store, redis_auth_store, redis_otp_store, redis_value_update } from '../helpers/redis_funtions'
import {generate_otp, generate_referral_code} from '../helpers/generated_entities'
import { CustomRequest } from '../helpers/interface'
import { account_activation_mail, account_deactivation_mail, admin_welcome_mail_messenger, notify_admin_of_new_staff, otp_messanger, staff_account_approval_mail, staff_account_deletion_mail, staff_role_change_mail, staff_welcome_mail_messenger, user_account_suspension_mail, user_account_unsuspension_mail, welcome_mail_messanger } from '../helpers/emails'
const bcrypt = require('bcrypt')


export const all_leads = async(req: CustomRequest, res: Response)=>{
    try {
        
        const {page_number} = req.params

        const [number_of_leads, leads] = await Promise.all([
            prisma.lead.count({ }),

            prisma.lead.findMany({
                include: {assigned_to: true},

                skip: (Math.abs(Number(page_number)) - 1) * 15,

                take: 15,

                orderBy: { created_at: 'desc' }
                
            })
        ])

        const number_of_pages = (number_of_leads <= 15) ? 1 : Math.ceil(number_of_leads/15)

        return res.status(200).json({ message:'All Leads', data: {total_number_of_leads: number_of_leads, total_number_of_pages: number_of_pages, leads} })

    } catch (err:any) {
        console.log('Error occured while fetching all leads ', err);
        return res.status(500).json({err: 'Error occured while fetching all leads', error: err})
    }
}

export const create_lead = async(req: CustomRequest, res: Response, )=>{
    const {name, email, phone_number, company_name, assigned_to} = req.body
    try {

        const user_role = req.account_holder.user.user_role

        if (user_role !== 'ADMIN'){
            return res.status(401).json({err: 'Not authorized to create lead.'})
        }

        const [email_exist, lead_exist] = await Promise.all([
            prisma.user.findUnique({where: {email}}),
            prisma.lead.findUnique({where: {email}})
        ])

        if (email_exist){
            return res.status(400).json({err: 'Email already registered to a user'})
        }

        if (lead_exist){
            return res.status(400).json({err: 'Email already assiged to a lead'})
        }

        const new_lead = await prisma.lead.create({
            data: {
                name, email, phone_number, company_name, assigned_to_id: assigned_to,

                created_at: converted_datetime(),
                updated_at: converted_datetime()
            }
        })

        if (!new_lead){
            return res.status(500).json({err: 'Error occured while creating lead '})
        }

        return res.status(200).json({msg: 'Lead created successfully', lead: new_lead})
        
    } catch (err:any) {
        console.log('Error occured while creating lead ', err);
        return res.status(500).json({err: 'Error occured while creating lead ', error: err})
    }
}

export const update_lead = async(req: CustomRequest, res: Response, )=>{
    const {name, email, phone_number, company_name, assigned_to} = req.body
    try {

        const {lead_id} = req.params

        const user_role = req.account_holder.user.user_role

        if (user_role !== 'ADMIN'){
            return res.status(401).json({err: 'Not authorized to create lead.'})
        }

        const update_lead = await prisma.lead.update({
            where: {lead_id},
            data: { name, email, phone_number, company_name, assigned_to_id: assigned_to, updated_at: converted_datetime() }
        })


        if (!update_lead){
            return res.status(500).json({err: 'Error occured while updating lead '})
        }

        return res.status(200).json({msg: 'Lead updated successfully', lead: update_lead})
        
    } catch (err:any) {
        console.log('Error occured while updating lead ', err);
        return res.status(500).json({err: 'Error occured while updating lead ', error: err})
    }
}

export const delete_lead = async(req: CustomRequest, res: Response, )=>{
    try {

        const {lead_id} = req.params

        const user_role = req.account_holder.user.user_role

        if (user_role !== 'ADMIN'){
            return res.status(401).json({err: 'Not authorized to create lead.'})
        }

        const lead = await prisma.lead.findUnique({where: {lead_id}})

        if (!lead){
            return res.status(404).json({err: 'Lead not found. '})
        }

        const del_lead = await prisma.lead.delete({where: {lead_id}})

        return res.status(200).json({msg: 'Lead deleted successfully', })
        
    } catch (err:any) {
        console.log('Error occured while deleting lead ', err);
        return res.status(500).json({err: 'Error occured while deleting lead ', error: err})
    }
}