import nodemailer from 'nodemailer'
import { email_passowrd, email_username } from './constants';


export const admin_welcome_mail_messenger = (admin:any) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_username,
            pass: email_passowrd
        }
    });

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Credit Mend - Admin</title>
            <style>
                body {
                    text-align: center;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: inline-block;
                    text-align: left;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin: 0 0 20px 0;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
                ul {
                    padding-left: 20px;
                }
                li {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Credit Mend, ${admin.first_name}!</h1>
                <p>We're excited to have you as an admin on Credit Mend. As an admin, you have the tools to manage and support our users effectively.</p>
                
                <p>Here are some important things you can do as an admin:</p>
                <ul>
                    <li>Monitor user activities and manage user accounts from the admin dashboard.</li>
                    <li>Oversee the credit repair process and ensure compliance with regulations.</li>
                    <li>Access detailed reports and analytics to track the platform's performance.</li>
                </ul>
                
                <p>If you have any questions or need assistance, don't hesitate to contact our support team at <a href="mailto:support@creditmend.com">support@creditmend.com</a>.</p>
                
                <p>Welcome aboard!</p>
                <p>The Credit Mend Team</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "Credit Mend",
            address: 'support@creditmend.com'
        },
        to: admin.email,
        subject: "Credit Mend: Welcome Admin",
        html: htmlContent,
        text: 'Welcome Admin'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent to ${admin.email}`.cyan.bold);
        }
    });

}

export const staff_welcome_mail_messenger = (staff:any) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_username,
            pass: email_passowrd
        }
    });

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Credit Mend - Staff</title>
            <style>
                body {
                    text-align: center;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: inline-block;
                    text-align: left;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin: 0 0 20px 0;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
                ul {
                    padding-left: 20px;
                }
                li {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Credit Mend, ${staff.first_name}!</h1>
                <p>We're pleased to have you on the Credit Mend team. Your role is vital in helping our clients manage and improve their credit health.</p>
                
                <p>As a new staff member, here are some things you can start with:</p>
                <ul>
                    <li>Familiarize yourself with our tools and resources to assist clients effectively.</li>
                    <li>Access our <a href="#">Staff Training Resources</a> for best practices and guidance.</li>
                    <li>Contact our support team if you have any questions or need further assistance.</li>
                </ul>
                
                <p>If you have any questions or need assistance, please reach out to our support team at <a href="mailto:support@creditmend.com">support@creditmend.com</a>.</p>
                
                <p>Welcome to the team!</p>
                <p>The Credit Mend Team</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "Credit Mend",
            address: 'support@creditmend.com'
        },
        to: staff.email,
        subject: "Credit Mend: Welcome to the Team",
        html: htmlContent,
        text: 'Welcome'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent to ${staff.email}`.cyan.bold);
        }
    });

}

export const notify_admin_of_new_staff = (staff:any, adminEmail:string) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_username,
            pass: email_passowrd
        }
    });

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Staff Registration Notification</title>
            <style>
                body {
                    text-align: center;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: inline-block;
                    text-align: left;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin: 0 0 20px 0;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>New Staff Member Registered</h1>
                <p>Hello Admin,</p>
                
                <p>A new staff member has registered and requires your approval:</p>
                
                <ul>
                    <li><strong>Name:</strong> ${staff.first_name} ${staff.last_name}</li>
                    <li><strong>Email:</strong> ${staff.email}</li>
                    <li><strong>Role:</strong> ${staff.user_role}</li>
                </ul>
                
                <p>Please review their details and approve their account from the admin dashboard.</p>
                
                <p>If you have any questions, please contact our support team at <a href="mailto:support@creditmend.com">support@creditmend.com</a>.</p>
                
                <p>Thank you,</p>
                <p>The Credit Mend Team</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "Credit Mend",
            address: 'support@creditmend.com'
        },
        to: adminEmail,
        subject: "Credit Mend: New Staff Registration",
        html: htmlContent,
        text: 'New Staff Registration'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Notification email sent to admin ${adminEmail}`.cyan.bold);
        }
    });

}

export const welcome_mail_messanger = (user:any,) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_username,
            pass: email_passowrd
        }
    });

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Credit Mend</title>
            <style>
                body {
                    text-align: center;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: inline-block;
                    text-align: left;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin: 0 0 20px 0;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
                ul {
                    padding-left: 20px;
                }
                li {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Credit Mend, ${user.first_name}!</h1>
                <p>Thank you for joining Credit Mend. We're thrilled to help you on your journey to improve your credit health!</p>
                
                <p>As a new user, you now have access to a comprehensive suite of tools designed to help you resolve credit issues, dispute errors, and enhance your credit score.</p>
                
                <p>Here are some quick tips to get you started:</p>
                <ul>
                    <li>Visit your dashboard for an overview of your credit status and actionable insights.</li>
                    <li>Explore our <a href="#">Credit Education Resources</a> to learn more about credit management and best practices.</li>
                    <li>If you have any questions or need support, our <a href="#">Help Center</a> is just a click away, or you can contact our support team.</li>
                </ul>
                
                <p>We're here to support you every step of the way. If you have any questions or need assistance, don't hesitate to contact us at <a href="mailto:support@creditmend.com">support@creditmend.com</a>.</p>
                
                <p>Welcome aboard!</p>
                <p>The Credit Mend Team</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "Credit Mend",
            address: 'support@creditmend.com'
        },
        to: user.email,
        subject: "Credit Mend: Welcome",
        html: htmlContent,
        text: 'Welcome'
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent to ${user.email}`.cyan.bold);
        }
    });

}

export const staff_account_approval_mail = (staff:any) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_username,
            pass: email_passowrd
        }
    });

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Approved - Credit Mend</title>
            <style>
                body {
                    text-align: center;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: inline-block;
                    text-align: left;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin: 0 0 20px 0;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
                ul {
                    padding-left: 20px;
                }
                li {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Account Approved, ${staff.first_name}!</h1>
                <p>We're excited to inform you that your account on Credit Mend has been approved. You now have full access to the platform and can start assisting our clients with their credit needs.</p>
                
                <p>Here are some steps to get started:</p>
                <ul>
                    <li>Log in to your account using the credentials you provided during registration.</li>
                    <li>Explore the dashboard and familiarize yourself with the tools and resources available.</li>
                    <li>Check out our <a href="#">Staff Resources</a> for guidance and support materials.</li>
                </ul>
                
                <p>If you encounter any issues or have questions, please reach out to our support team at <a href="mailto:support@creditmend.com">support@creditmend.com</a>.</p>
                
                <p>Welcome to the Credit Mend team!</p>
                <p>The Credit Mend Team</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "Credit Mend",
            address: 'support@creditmend.com'
        },
        to: staff.email,
        subject: "Credit Mend: Account Approved",
        html: htmlContent,
        text: 'Account Approved'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Approval email sent to ${staff.email}`.cyan.bold);
        }
    });

}

export const staff_account_deletion_mail = (staff:any) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_username,
            pass: email_passowrd
        }
    });

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Deletion - Credit Mend</title>
            <style>
                body {
                    text-align: center;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: inline-block;
                    text-align: left;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin: 0 0 20px 0;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Account Deletion Notice</h1>
                <p>Dear ${staff.first_name},</p>
                
                <p>We regret to inform you that your account with Credit Mend has been deleted. This means you will no longer have access to the platform and its features.</p>
                
                <p>If you believe this action was taken in error or if you have any questions, please contact our support team at <a href="mailto:support@creditmend.com">support@creditmend.com</a> for assistance.</p>
                
                <p>We thank you for your time and contributions to Credit Mend.</p>
                
                <p>Best regards,</p>
                <p>The Credit Mend Team</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "Credit Mend",
            address: 'support@creditmend.com'
        },
        to: staff.email,
        subject: "Credit Mend: Account Deletion Notice",
        html: htmlContent,
        text: 'Account Deletion Notice'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Account deletion email sent to ${staff.email}`.cyan.bold);
        }
    });

}

export const user_account_suspension_mail = (user:any) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_username,
            pass: email_passowrd
        }
    });

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Suspension - Credit Mend</title>
            <style>
                body {
                    text-align: center;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: inline-block;
                    text-align: left;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin: 0 0 20px 0;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Account Suspension Notice</h1>
                <p>Dear ${user.first_name},</p>
                
                <p>We regret to inform you that your account with Credit Mend has been temporarily suspended. This suspension means you will not be able to access the platform and its services until further notice.</p>
                
                <p>For more information about this action or to discuss the next steps, please contact our support team at <a href="mailto:support@creditmend.com">support@creditmend.com</a>.</p>
                
                <p>We apologize for any inconvenience this may cause and are here to assist you with any questions you may have.</p>
                
                <p>Best regards,</p>
                <p>The Credit Mend Team</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "Credit Mend",
            address: 'support@creditmend.com'
        },
        to: user.email,
        subject: "Credit Mend: Account Suspension Notice",
        html: htmlContent,
        text: 'Account Suspension Notice'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Suspension email sent to ${user.email}`.cyan.bold);
        }
    });

}

export const user_account_unsuspension_mail = (user:any) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_username,
            pass: email_passowrd
        }
    });

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Unsuspension - Credit Mend</title>
            <style>
                body {
                    text-align: center;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: inline-block;
                    text-align: left;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin: 0 0 20px 0;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Account Unsuspension Notice</h1>
                <p>Dear ${user.first_name},</p>
                
                <p>We are pleased to inform you that your account with Credit Mend has been reinstated. You can now access all features and services on the platform.</p>
                
                <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:support@creditmend.com">support@creditmend.com</a>.</p>
                
                <p>Thank you for your patience and understanding.</p>
                
                <p>Best regards,</p>
                <p>The Credit Mend Team</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "Credit Mend",
            address: 'support@creditmend.com'
        },
        to: user.email,
        subject: "Credit Mend: Account Unsuspension Notice",
        html: htmlContent,
        text: 'Account Unsuspension Notice'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Unsuspension email sent to ${user.email}`.cyan.bold);
        }
    });

}

export const staff_role_change_mail = (staff:any, newRole:string) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_username,
            pass: email_passowrd
        }
    });

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Role Change Notification - Credit Mend</title>
            <style>
                body {
                    text-align: center;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: inline-block;
                    text-align: left;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin: 0 0 20px 0;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Role Change Notification</h1>
                <p>Dear ${staff.first_name},</p>
                
                <p>We wanted to inform you that your role within Credit Mend has been updated. Your new role is: <strong>${newRole.replace(/_/g, " ")}</strong>.</p>
                
                <p>This change may affect your access and responsibilities on the platform. If you have any questions about your new role or need further clarification, please do not hesitate to contact us at <a href="mailto:support@creditmend.com">support@creditmend.com</a>.</p>
                
                <p>Thank you for your continued dedication and hard work.</p>
                
                <p>Best regards,</p>
                <p>The Credit Mend Team</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "Credit Mend",
            address: 'support@creditmend.com'
        },
        to: staff.email,
        subject: "Credit Mend: Role Change Notification",
        html: htmlContent,
        text: 'Role Change Notification'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Role change email sent to ${staff.email}`.cyan.bold);
        }
    });

}

export const otp_messanger = (user:any, otp: string) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_username,
            pass: email_passowrd
        }
    });

    const htmlContent = `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Credit Mend</title>
        <style>
            body {
                text-align: center;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                display: inline-block;
                text-align: left;
                margin: 3px auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                max-width: 600px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
                text-align: center;
                margin: 0 0 20px 0;
            }
            p {
                color: #555;
                line-height: 1.6;
            }
            a {
                color: #0066cc;
                text-decoration: none;
            }
            ul {
                padding-left: 20px;
            }
            li {
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
        <h1>Email Verification</h1>
            <p>Hello, ${user.first_name},</p>
            <p>Please use the verification code below to verify your email. You can complete your login with the OTP below.</p>
            
            <strong>One Time Password (OTP)</strong>
            <p><b>${otp}</b></p>
            <p>This code expires in 20 minutes and should only be used in-app. Do not click any links or share with anybody.</p>
            <p>If you didn’t attempt to register on Credit Repair App, please change your password immediately to protect your account. For further assistance, contact us at <a href="mailto:iroegbu.dg@gmail.com">iroegbu.dg@gmail.com</a>.</p>
            <p>Need help, or have questions? Please visit our <a href="#">contact us page</a> or reply to this message.</p>
        </div>
    </body>
    </html>
    `
    const mailOptions = {
        from: {
            name: "crm",
            address: 'iroegbu.dg@gmail.com'
        },
        to: user.email,
        subject: "Credit Mend: Verify your account",
        html: htmlContent,
        text: 'Welcome'
    };
    

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent to ${user.email} `.cyan.bold);
        }
    });

}
