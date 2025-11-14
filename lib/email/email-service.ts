/**
 * Email service for sending notifications
 * Integrate with SendGrid, Resend, or other email service providers
 */

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Send email notification
 * Replace with actual email service integration (SendGrid, Resend, etc.)
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  // TODO: Integrate with email service provider
  // Example with SendGrid:
  /*
  import sgMail from '@sendgrid/mail'
  
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
  
  await sgMail.send({
    to: options.to,
    from: process.env.FROM_EMAIL!,
    subject: options.subject,
    html: options.html,
    text: options.text,
  })
  */

  // For now, just log (replace with actual implementation)
  console.log('Email would be sent:', options)
}

/**
 * Send download link email
 */
export async function sendDownloadLinkEmail(
  email: string,
  formName: string,
  downloadLink: string,
  isPremium: boolean
): Promise<void> {
  const subject = `Your ${formName} is Ready - FormEase`
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Form is Ready!</h1>
          </div>
          <div class="content">
            <p>Dear User,</p>
            <p>Your ${formName} has been generated successfully.</p>
            <p>Click the button below to download your PDF:</p>
            <div style="text-align: center;">
              <a href="${downloadLink}" class="button">Download PDF</a>
            </div>
            <p><strong>Important Notes:</strong></p>
            <ul>
              <li>This download link is valid for 7 days</li>
              ${isPremium ? '<li>This is a premium version without watermark</li>' : '<li>Free version includes watermark</li>'}
              <li>Review all information before submitting</li>
            </ul>
            <p>Thank you for using FormEase!</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} FormEase. All rights reserved.</p>
            <p>If you did not request this email, please ignore it.</p>
          </div>
        </div>
      </body>
    </html>
  `

  const text = `
    Your ${formName} is Ready!
    
    Download your PDF: ${downloadLink}
    
    This link is valid for 7 days.
    
    Thank you for using FormEase!
  `

  await sendEmail({
    to: email,
    subject,
    html,
    text,
  })
}

/**
 * Send payment confirmation email
 */
export async function sendPaymentConfirmationEmail(
  email: string,
  formName: string,
  amount: number,
  transactionId: string
): Promise<void> {
  const subject = `Payment Confirmation - ${formName}`
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #10b981; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Successful!</h1>
          </div>
          <div class="content">
            <p>Dear User,</p>
            <p>Your payment for ${formName} has been processed successfully.</p>
            <div class="info-box">
              <p><strong>Amount:</strong> ₹${amount}</p>
              <p><strong>Transaction ID:</strong> ${transactionId}</p>
              <p><strong>Form:</strong> ${formName}</p>
            </div>
            <p>Your premium PDF is being generated and you will receive a download link shortly.</p>
            <p>Thank you for using FormEase!</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} FormEase. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  await sendEmail({
    to: email,
    subject,
    html,
  })
}

