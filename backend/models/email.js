//import { createRequire } from 'module';
import sendGridMail from '@sendgrid/mail';

//const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function getConfirmationEmailHtml(comment, links, mouse)
{
    return `
<div style="font-weight: normal; font-size: 10pt;"><font face="Arial, Verdana" size="2">Message from UCSF Mouselist (<a href="https://mouselist.ucsf.edu">https://mouselist.ucsf.edu</a>)</font></div><div style="font-weight: normal; font-size: 10pt;"><font face="Arial, Verdana" size="2"><br></font></div><div><font size="2"><b>${user}</b> has posted the following comment on your post for <b>${mouse}</b></font></div><div style="font-weight: normal;"><font size="2"><br></font></div><div><font size="2"><b>"${comment}"</b> <a href="${links}"</a></font></div><div style="font-weight: normal;"><font size="2"><br></font></div><div style="font-weight: normal;"><font size="2">If you need to make changes on posts for UCSF Mouselist &nbsp;please contact&nbsp;<a href="http://admin.mousedatabase.ucsf.edu">admin.mousedatabase@ucsf.edu</a>.</font></div><div style="font-weight: normal;"><font size="2"><br></font></div><div style="font-weight: normal;"><font size="2">Be sure to search the <a href="https://mousedatabase.ucsf.edu">UCSF Mouse Inventory</a> to find mutant mice maintained on campus.&nbsp;</font></div><div style="font-weight: normal;"><br></div><div style="font-weight: normal; font-size: 10pt;">Thank you for participating in Mouselist.</div><div style="font-weight: normal; font-size: 10pt;"><br></div><div style="font-weight: normal; font-size: 10pt;"><span style="font-family: Arial, Verdana; font-size: 13.333333015441895px;">_______________________________________________________</span><br style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><span style="font-family: Arial, Verdana; font-size: 13.333333015441895px;">Estelle Wall</span><br style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><span style="font-family: Arial, Verdana; font-size: 13.333333015441895px;">UCSF Mouse Inventory Database Administrator</span><br style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><a href="mailto:admin.mousedatabase@ucsf.edu" style="font-family: Arial, Verdana; font-size: 13.333333015441895px;">admin.mousedatabase@ucsf.edu</a><br style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><div style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><a href="https://mousedatabase.ucsf.edu">https://mousedatabase.ucsf.edu</a></div><div style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><a href="https://mouselist.ucsf">https://mouselist.ucsf</a>.edu</div><div style="font-family: Arial, Verdana; font-size: 13.333333015441895px;"><font color="#009900">@ucsf.edu required for login</font></div></div><div style="font-weight: normal; font-size: 10pt;"><font color="#23476b" face="Helvetica, Arial, sans-serif" size="2"><span style="caret-color: rgb(35, 71, 107);"><br></span></font></div><div style="font-weight: normal; font-size: 10pt;"><font color="#23476b" face="Helvetica, Arial, sans-serif" size="2"><span style="caret-color: rgb(35, 71, 107);"><br></span></font></div>
`;}
function getMessage(user, links, comment, forumEmail, mouse) {
    return {
      to: user, forumEmail,
      from: 'admin.mousedatabase@ucsf.edu',
      subject: `New Comment on UCSF Mouselist post for ${mouse}`,
      text: `${user} has commented on ${forumEmail} Mouselist post.`,
      html: getConfirmationEmailHtml(comment, links, mouse),
    };
  }

//sendEmailConfirmation(user, link, comment, forumEmail);   
export async function sendEmailConfirmation(user, link, comment, forumEmail, mouse) {
    try {
      await sendGridMail.send(getMessage(user, link, comment, forumEmail, mouse));
      return  { message: `Confirmation email sent successfully for ${user}`};
    } catch (error) {
      const message = `Error sending order confirmation email or orderNr: ${user}`;
      console.error(message);
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
      return {message};
    }
  }
  
