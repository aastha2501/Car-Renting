using MimeKit;
using Org.BouncyCastle.Tls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
namespace BAL.Helpers
{
    public class EmailHelper
    {
        public bool SendEmail(string userEmail, string confirmationLink)
        {
            //MailMessage mailMessage = new MailMessage();
            //mailMessage.From = new MailAddress("aastha252001@gmail.com");
            //mailMessage.To.Add(new MailAddress(userEmail));

            //mailMessage.Subject = "Confirm your Email";
            //mailMessage.IsBodyHtml = true;
            //mailMessage.Body = confirmationLink;

            //SmtpClient client = new SmtpClient();
            //client.Port = 587;
            //client.UseDefaultCredentials = false;
            //client.EnableSsl = true;
            //client.Host = "smtpout.secureserver.net";
            //client.Credentials = new NetworkCredential("aastha252001@gmail.com", "qsmddyhkdushzndr");
            //try
            //{
            //    client.Send(mailMessage);
            //    return true;
            //}
            //catch(Exception ex) { }
            //return false;

            MailMessage msg = new MailMessage();

            msg.From = new MailAddress("aastha252001@gmail.com");
            msg.To.Add(userEmail);
            msg.Subject = "Confirm your Email";
            msg.Body = confirmationLink;
            //msg.Priority = MailPriority.High;


            using (SmtpClient client = new SmtpClient())
            {
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("aastha252001@gmail.com", "qsmddyhkdushzndr");
                client.Host = "smtp.gmail.com";
                client.Port = 587;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                try
                {
                    client.Send(msg);
                    return true;
                } catch(Exception ex)
                {

                }
                return false;
            }
            
        }
    }
}
