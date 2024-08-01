import express from 'express'
import { generate_otp_validation, login_validation, admin_signup_validation, user_signup_validation, verify_otp_validation, reset_password_validation, edit_staff_role_validation } from '../validations'
import { admin_signup, approve_staff_account, delete_staff_account, edit_staff_role, generate_user_otp, reset_password, user_login, user_signup } from '../controllers/authentication'
import { email_exist, verify_auth_id, verify_user_otp } from '../helpers/auth_helper'


const router = express.Router()

router.route('/admin-signup').post(admin_signup_validation,  email_exist,  admin_signup)

router.route('/user-signup').post(user_signup_validation,  email_exist, user_signup)

router.route('/user-login').post(login_validation, user_login )

router.route('/change-staff-role/:user_id').patch(verify_auth_id, edit_staff_role_validation, edit_staff_role )

router.route('/approve-staff-account/:user_id').patch(verify_auth_id, approve_staff_account )

router.route('/delete-staff-account/:user_id').delete(verify_auth_id, delete_staff_account )

router.route('/generate-otp').post(generate_otp_validation, generate_user_otp )

router.route('/verify-otp').post(verify_otp_validation, verify_user_otp )

router.route('/reset-password').patch(reset_password_validation, reset_password )


export default router