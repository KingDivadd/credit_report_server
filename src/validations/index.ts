import { Request, Response, NextFunction } from 'express';
import Joi from 'joi'


export const admin_signup_validation = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const schema = Joi.object({
            last_name: Joi.string().trim().required(),
            first_name: Joi.string().trim().required(),
            email: Joi.string().trim().email().required(),
            password: Joi.string().trim().required()
        })

        const { error: validation_error } = schema.validate(req.body)

        if (validation_error) {
            const error_message = validation_error.message.replace(/"/g, '');
            return res.status(400).json({ err: error_message });
        }
        return next()
    } catch (err:any) {
        console.log('Error occured in signup validation function ',err)
        return res.status(422).json({err: 'Error occured in signup validation funtion ', error: err})
        
    }
}

export const user_signup_validation = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const schema = Joi.object({
            last_name: Joi.string().trim().required(),
            first_name: Joi.string().trim().required(),
            email: Joi.string().trim().email().required(),
            user_role: Joi.string().trim().required(),
            password: Joi.string().trim().required()
        })

        const { error: validation_error } = schema.validate(req.body)

        if (validation_error) {
            const error_message = validation_error.message.replace(/"/g, '');
            return res.status(400).json({ err: error_message });
        }
        return next()
    } catch (err:any) {
        console.log('Error occured in signup validation function ',err)
        return res.status(422).json({err: 'Error occured in signup validation funtion ', error: err})
        
    }
}

export const create_client_validation = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const schema = Joi.object({
            last_name: Joi.string().trim().required(),
            first_name: Joi.string().trim().required(),
            email: Joi.string().trim().email().required(),
            password: Joi.string().trim().required()
        })

        const { error: validation_error } = schema.validate(req.body)

        if (validation_error) {
            const error_message = validation_error.message.replace(/"/g, '');
            return res.status(400).json({ err: error_message });
        }
        return next()
    } catch (err:any) {
        console.log('Error occured in create client validation function ',err)
        return res.status(422).json({err: 'Error occured in create client validation funtion ', error: err})
        
    }
}

export const login_validation = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const schema = Joi.object({
            email: Joi.string().trim().email().required(),
            password: Joi.string().trim().required()
        })

        const { error: validation_error } = schema.validate(req.body)

        if (validation_error) {
            const error_message = validation_error.message.replace(/"/g, '');
            return res.status(400).json({ err: error_message });
        }
        return next()
    } catch (err:any) {
        console.log('Error occured in login validation function ',err)
        return res.status(422).json({err: 'Error occured in login validation funtion ', error: err})
        
    }
}

export const generate_otp_validation = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const schema = Joi.object({
            email: Joi.string().trim().email().required(),
        })

        const { error: validation_error } = schema.validate(req.body)

        if (validation_error) {
            const error_message = validation_error.message.replace(/"/g, '');
            return res.status(400).json({ err: error_message });
        }
        return next()
    } catch (err:any) {
        console.log('Error occured in generate otp validation function ',err)
        return res.status(422).json({err: 'Error occured in generate otp validation funtion ', error: err})
        
    }
}

export const verify_otp_validation = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const schema = Joi.object({
            email: Joi.string().trim().email().required(),
            otp: Joi.string().trim().required()
        })

        const { error: validation_error } = schema.validate(req.body)

        if (validation_error) {
            const error_message = validation_error.message.replace(/"/g, '');
            return res.status(400).json({ err: error_message });
        }
        return next()
    } catch (err:any) {
        console.log('Error occured in otp validation function ',err)
        return res.status(422).json({err: 'Error occured in otp validation funtion ', error: err})
        
    }
}

export const edit_staff_role_validation = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const schema = Joi.object({
            user_role: Joi.string().trim().valid("TEAM_MEMBER", "CLIENT_MANAGER", "AFFILIATE").required()
        })

        const { error: validation_error } = schema.validate(req.body)

        if (validation_error) {
            const error_message = validation_error.message.replace(/"/g, '');
            return res.status(400).json({ err: error_message });
        }
        return next()
    } catch (err:any) {
        console.log('Error occured in edit staff role validation ',err)
        return res.status(422).json({err: 'Error occured in edit staff role validation ', error: err})
        
    }
}

export const reset_password_validation = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const schema = Joi.object({
            email: Joi.string().trim().email().required(),
            password: Joi.string().trim().required()
        })

        const { error: validation_error } = schema.validate(req.body)

        if (validation_error) {
            const error_message = validation_error.message.replace(/"/g, '');
            return res.status(400).json({ err: error_message });
        }
        return next()
    } catch (err:any) {
        console.log('Error occured in password reset function ',err)
        return res.status(422).json({err: 'Error occured in password reset funtion ', error: err})
        
    }
}

export const create_lead_validation = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            company_name: Joi.string().trim().allow('').optional(),
            phone_number: Joi.string().trim().allow('').optional(),
            email: Joi.string().trim().email().required(),
            assigned_to: Joi.string().trim().required()
        })

        const { error: validation_error } = schema.validate(req.body)

        if (validation_error) {
            const error_message = validation_error.message.replace(/"/g, '');
            return res.status(400).json({ err: error_message });
        }
        return next()
    } catch (err:any) {
        console.log('Error occured in create lead validation function ',err)
        return res.status(422).json({err: 'Error occured in create lead validation funtion ', error: err})
        
    }
}