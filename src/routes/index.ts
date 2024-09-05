import express from 'express'

import {navigation_content} from "../controllers/general"

import { signup_validation, business_validation, login_validation, reset_password_validation, profile_validation } from '../validations'

import { email_exist, verify_auth_id, verify_otp,  } from '../helpers/auth_helper'

import { add_new_business, change_profile_active_status, create_profile, edit_profile, generate_verification_otp, reset_password, signup, user_login, verify_email_otp } from '../controllers/authentication'

const router = express.Router()


// Authentication 

router.route('/signup').post(email_exist, signup_validation, signup )

router.route('/add-business').post(verify_auth_id, business_validation, add_new_business)

router.route('/login').post(login_validation, user_login)

router.route('/generate-otp').post(generate_verification_otp)

router.route('/verify-otp').patch(verify_otp, verify_email_otp)

router.route('/reset-password').patch(verify_auth_id, reset_password_validation, reset_password )

router.route('/change-profile-status/:status/:profile_id').patch(verify_auth_id, change_profile_active_status )

router.route('/create-profile').post(verify_auth_id, profile_validation, create_profile)

router.route('/edit-profile/:profile_id').patch(verify_auth_id, profile_validation, edit_profile  )

// General 

router.route('/navigation').get(verify_auth_id, navigation_content )




export default router