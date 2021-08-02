//import { createRequire } from 'module';
import sendGridMail from '@sendgrid/mail';

//const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function getConfirmationEmailHtml(user, comment, forumEmail, links, mouse)
{
    return `
<div style="font-weight: normal; font-size: 10pt;"><font face="Arial, Verdana" size="4">Message from UCSF Mouselist (<a href="https://mouselist.ucsf.edu">https://mouselist.ucsf.edu</a>)</font></div><div style="font-weight: normal; font-size: 10pt;"><font face="Arial, Verdana" size="2"><br></font></div><div><font size: 10pt><b>${user}</b> has posted the following comment on ${forumEmail} post for <b>${mouse}</b></font></div><div style="font-weight: normal;"><font size: 10pt><br></font></div><div><font size: 10pt><b>"${comment}"</b><div <a href="${links}">${links}</a></div></font></div><div style="font-weight: normal;"><font size: 10pt><br></font></div><div style="font-weight: normal;"><font size: 10pt>If you need to make changes on posts for UCSF Mouselist &nbsp;please contact&nbsp;<a href="mailto:admin.mousedatabase@ucsf.edu">admin.mousedatabase@ucsf.edu</a>.</font></div><div style="font-weight: normal;"><font size: 10pt><br></font></div><div style="font-weight: normal;"><font size: 10pt>Be sure to search the <a href="https://mousedatabase.ucsf.edu">UCSF Mouse Inventory</a> to find mutant mice maintained on campus.&nbsp;</font></div><div style="font-weight: normal;"><br></div><div style="font-weight: normal; font-size: 10pt;">Thank you for participating in Mouselist.</div><div style="font-weight: normal; font-size: 10pt;"><br></div><div style="font-weight: normal; font-size: 10pt;"><span style="font-family: Arial, Verdana; font-size: 13.333333015441895px;">_______________________________________________________</span><br style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><span style="font-family: Arial, Verdana; font-size: 13.333333015441895px;">Estelle Wall</span><br style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><span style="font-family: Arial, Verdana; font-size: 13.333333015441895px;">UCSF Mouse Inventory Database Administrator</span><br style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><a href="mailto:admin.mousedatabase@ucsf.edu" style="font-family: Arial, Verdana; font-size: 13.333333015441895px;">admin.mousedatabase@ucsf.edu</a><br style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><div style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><a href="https://mousedatabase.ucsf.edu">https://mousedatabase.ucsf.edu</a></div><div style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><font color="#009900">@ucsf.edu required for login</font></div></div><div style="font-weight: normal; font-size: 10pt;"><font color="#23476b" face="Helvetica, Arial, sans-serif" size="2"><span style="caret-color: rgb(35, 71, 107);"><br></span></font></div><div style="font-weight: normal; font-size: 10pt;"><font color="#23476b" face="Helvetica, Arial, sans-serif" size="2"><span style="caret-color: rgb(35, 71, 107);"><br></span></font></div>
`;}
function getMessage(user, links, comment, forumEmail, mouse) {
    return {
      to: forumEmail,
      cc: user,
      from: 'admin.mousedatabase@ucsf.edu',
      subject: `New Comment on UCSF Mouselist post for ${mouse}`,
      text: `${user} has commented on ${forumEmail} Mouselist post.`,
      html: getConfirmationEmailHtml(user, comment, forumEmail, links, mouse),
    };
  }

//sendEmailConfirmation(user, link, comment, forumEmail);   
export async function sendEmailConfirmation(user, links, comment, forumEmail, mouse) {
    try {
      await sendGridMail.send(getMessage(user, links, comment, forumEmail, mouse));
      return  { message: `Confirmation email sent successfully for ${user}`};
    } catch (error) {
      const message = `Error sending order confirmation email: ${user}`;
      console.error(message);
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
      return {message};
    }
  }
  
