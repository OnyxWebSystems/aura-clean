/**
 * Resend Email Service Configuration
 * 
 * This file sets up Resend for sending transactional emails.
 * Make sure to set your Resend API key in your .env file.
 */

import { Resend } from 'resend';

// Initialize Resend client
const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;

if (!resendApiKey) {
  console.warn(
    'Resend API key not found. Email functionality will be disabled. Set VITE_RESEND_API_KEY in your .env file.'
  );
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Email configuration
export const EMAIL_CONFIG = {
  from: import.meta.env.VITE_RESEND_FROM_EMAIL || 'Pristine & Co. <noreply@pristineco.com>',
  replyTo: import.meta.env.VITE_RESEND_REPLY_TO || 'hello@pristineco.com',
};

/**
 * Email Templates
 */
export const emailTemplates = {
  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmation(data: {
    to: string;
    customerName: string;
    serviceName: string;
    scheduledDate: string;
    scheduledTime: string;
    address: string;
    bookingId: string;
  }) {
    if (!resend) {
      console.warn('Resend not configured. Email not sent.');
      return null;
    }

    const { to, customerName, serviceName, scheduledDate, scheduledTime, address, bookingId } = data;

    try {
      const { data: emailData, error } = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: [to],
        replyTo: EMAIL_CONFIG.replyTo,
        subject: `Booking Confirmed - ${serviceName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Booking Confirmed</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">Booking Confirmed!</h1>
              </div>
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px;">Hi ${customerName},</p>
                <p style="font-size: 16px;">Thank you for choosing Pristine & Co. Your booking has been confirmed!</p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                  <h2 style="margin-top: 0; color: #1a1a2e;">Booking Details</h2>
                  <p><strong>Service:</strong> ${serviceName}</p>
                  <p><strong>Date:</strong> ${scheduledDate}</p>
                  <p><strong>Time:</strong> ${scheduledTime}</p>
                  <p><strong>Address:</strong> ${address}</p>
                  <p><strong>Booking ID:</strong> ${bookingId}</p>
                </div>
                
                <p style="font-size: 16px;">Our team will arrive at the scheduled time. If you need to make any changes, please contact us at <a href="tel:1-800-PRISTINE" style="color: #10b981;">1-800-PRISTINE</a> or reply to this email.</p>
                
                <p style="font-size: 16px;">We look forward to serving you!</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                  Best regards,<br>
                  <strong>The Pristine & Co. Team</strong>
                </p>
              </div>
              <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
                <p>© ${new Date().getFullYear()} Pristine & Co. All rights reserved.</p>
              </div>
            </body>
          </html>
        `,
        text: `
          Booking Confirmed!
          
          Hi ${customerName},
          
          Thank you for choosing Pristine & Co. Your booking has been confirmed!
          
          Booking Details:
          Service: ${serviceName}
          Date: ${scheduledDate}
          Time: ${scheduledTime}
          Address: ${address}
          Booking ID: ${bookingId}
          
          Our team will arrive at the scheduled time. If you need to make any changes, please contact us at 1-800-PRISTINE.
          
          We look forward to serving you!
          
          Best regards,
          The Pristine & Co. Team
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        throw error;
      }

      return emailData;
    } catch (error) {
      console.error('Failed to send booking confirmation email:', error);
      throw error;
    }
  },

  /**
   * Send booking status update email
   */
  async sendBookingStatusUpdate(data: {
    to: string;
    customerName: string;
    serviceName: string;
    status: string;
    scheduledDate: string;
    scheduledTime: string;
  }) {
    if (!resend) {
      console.warn('Resend not configured. Email not sent.');
      return null;
    }

    const { to, customerName, serviceName, status, scheduledDate, scheduledTime } = data;

    const statusMessages: Record<string, string> = {
      confirmed: 'Your booking has been confirmed!',
      in_progress: 'Our team has started your cleaning service.',
      completed: 'Your cleaning service has been completed!',
      cancelled: 'Your booking has been cancelled.',
    };

    try {
      const { data: emailData, error } = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: [to],
        replyTo: EMAIL_CONFIG.replyTo,
        subject: `Booking Update - ${serviceName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">Booking Update</h1>
              </div>
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px;">Hi ${customerName},</p>
                <p style="font-size: 16px;">${statusMessages[status] || 'Your booking status has been updated.'}</p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Service:</strong> ${serviceName}</p>
                  <p><strong>Date:</strong> ${scheduledDate}</p>
                  <p><strong>Time:</strong> ${scheduledTime}</p>
                  <p><strong>Status:</strong> ${status.replace('_', ' ').toUpperCase()}</p>
                </div>
                
                <p style="font-size: 16px;">If you have any questions, please contact us at <a href="tel:1-800-PRISTINE" style="color: #10b981;">1-800-PRISTINE</a>.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                  Best regards,<br>
                  <strong>The Pristine & Co. Team</strong>
                </p>
              </div>
            </body>
          </html>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        throw error;
      }

      return emailData;
    } catch (error) {
      console.error('Failed to send status update email:', error);
      throw error;
    }
  },

  /**
   * Send contact form confirmation email
   */
  async sendContactConfirmation(data: {
    to: string;
    name: string;
    subject: string;
  }) {
    if (!resend) {
      console.warn('Resend not configured. Email not sent.');
      return null;
    }

    const { to, name, subject } = data;

    try {
      const { data: emailData, error } = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: [to],
        replyTo: EMAIL_CONFIG.replyTo,
        subject: 'Thank you for contacting Pristine & Co.',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">Thank You!</h1>
              </div>
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px;">Hi ${name},</p>
                <p style="font-size: 16px;">Thank you for reaching out to Pristine & Co. We've received your message regarding "${subject}" and will get back to you within 24 hours.</p>
                <p style="font-size: 16px;">If you need immediate assistance, please call us at <a href="tel:1-800-PRISTINE" style="color: #10b981;">1-800-PRISTINE</a>.</p>
                <p style="font-size: 16px; margin-top: 30px;">
                  Best regards,<br>
                  <strong>The Pristine & Co. Team</strong>
                </p>
              </div>
            </body>
          </html>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        throw error;
      }

      return emailData;
    } catch (error) {
      console.error('Failed to send contact confirmation email:', error);
      throw error;
    }
  },

  /**
   * Send admin notification for new booking
   */
  async sendAdminBookingNotification(data: {
    adminEmail: string;
    customerName: string;
    serviceName: string;
    scheduledDate: string;
    scheduledTime: string;
    bookingId: string;
  }) {
    if (!resend) {
      console.warn('Resend not configured. Email not sent.');
      return null;
    }

    const { adminEmail, customerName, serviceName, scheduledDate, scheduledTime, bookingId } = data;

    try {
      const { data: emailData, error } = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: [adminEmail],
        replyTo: EMAIL_CONFIG.replyTo,
        subject: `New Booking: ${serviceName} - ${customerName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #1a1a2e; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">New Booking Received</h1>
              </div>
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px;">A new booking has been received and requires your attention.</p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1a1a2e;">
                  <h2 style="margin-top: 0; color: #1a1a2e;">Booking Details</h2>
                  <p><strong>Customer:</strong> ${customerName}</p>
                  <p><strong>Service:</strong> ${serviceName}</p>
                  <p><strong>Date:</strong> ${scheduledDate}</p>
                  <p><strong>Time:</strong> ${scheduledTime}</p>
                  <p><strong>Booking ID:</strong> ${bookingId}</p>
                </div>
                
                <p style="font-size: 16px;">Please review and confirm this booking in the admin dashboard.</p>
              </div>
            </body>
          </html>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        throw error;
      }

      return emailData;
    } catch (error) {
      console.error('Failed to send admin notification email:', error);
      throw error;
    }
  },
};

