import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import logoOrange from "../../assets/images/logo-orange.png";

const PrivacyPolicy = () => {
  const classes = useStyles();

  return (
    <div className={classes.privacyPolicyContainer}>
      <div className={classes.logoContainer}>
        <img alt={"logo"} src={logoOrange} className={classes.logo} />
      </div>
      <Typography
        variant="h4"
        gutterBottom
        className={classes.privacyPolicyTitle}
      >
        Privacy Policy for Mrmart
        <div className={classes.stylizedUnderline}></div>
      </Typography>
      <div className={classes.privacyPolicyBody}>
        <Typography variant="body1" gutterBottom className={classes.content}>
          At Mrmart, accessible from Mrmart.co, one of our main priorities is
          the privacy of our visitors. This Privacy Policy document contains
          types of information that is collected and recorded by Mrmart and how
          we use it.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website and app with regards to the information
          that they shared and/or collect in Mrmart. This policy is not
          applicable to any information collected offline or via channels other
          than this website.
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>Consent</span>:
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          By using our website and app, you hereby consent to our Privacy Policy
          and agree to its terms.
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>Information we collect</span>:
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          If you contact us directly, we may receive additional information
          about you such as your name, email address, phone number, the contents
          of the message and/or attachments you may send us, and any other
          information you may choose to provide.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          When you register for an Account, we may ask for your contact
          information, including items such as name, company name, address,
          email address, and telephone number.
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>How we use your information</span>
          :
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            We use the information we collect in various ways, including to:
          </li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>Provide, operate, and maintain our website and app</li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>Improve, personalize, and expand our website and app</li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>Understand and analyze how you use our website and app</li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>Develop new products, services, features, and functionality</li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website and app, and
            for marketing and promotional purposes
          </li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>Send you emails</li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>Find and prevent fraud</li>
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>Log Files</span>:
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Mrmart follows a standard procedure of using log files. These files
          log visitors when they visit websites and app. All hosting companies
          do this and a part of hosting services' analytics. The information
          collected by log files include internet protocol (IP) addresses,
          browser type, Internet Service Provider (ISP), date and time stamp,
          referring/exit pages, and possibly the number of clicks. These are not
          linked to any information that is personally identifiable. The purpose
          of the information is for analyzing trends, administering the site and
          app, tracking users' movement on the website and app, and gathering
          demographic information.
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>Cookies and Web Beacons</span>:
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Like any other website and app, Mrmart uses 'cookies'. These cookies
          are used to store information including visitors' preferences, and the
          pages on the website that the visitor accessed or visited. The
          information is used to optimize the user's experience by customizing
          our web page content based on visitors' browser type and/or other
          information.
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>
            Advertising Partners Privacy Policies
          </span>
          :
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          You may consult this list to find the Privacy Policy for each of the
          advertising partners of Mrmart.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on Mrmart, which are sent
          directly to users' browser. They automatically receive your IP address
          when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Note that Mrmart has no access to or control over these cookies that
          are used by third-party advertisers.
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>
            Third Party Privacy Policies
          </span>
          :
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Mrmart's Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers'
          respective websites.
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>
            CCPA Privacy Rights (Do Not Sell My Personal Information)
          </span>
          :
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Under the CCPA, among other rights, California consumers have the
          right to:
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Request that a business that collects a consumer's personal data
          disclose the categories and specific pieces of personal data that a
          business has collected about consumers.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            Request that a business delete any personal data about the consumer
            that a business has collected.
          </li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            Request that a business that sells a consumer's personal data, not
            sell the consumer's personal data.
          </li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            If you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </li>
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>GDPR Data Protection Rights</span>
          :
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          We would like to make sure you are fully aware of all of your data
          protection rights. Every user is entitled to the following:
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            The right to access – You have the right to request copies of your
            personal data. We may charge you a small fee for this service.
          </li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            The right to rectification – You have the right to request that we
            correct any information you believe is inaccurate. You also have the
            right to request that we complete the information you believe is
            incomplete.
          </li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            The right to erasure – You have the right to request that we erase
            your personal data, under certain conditions.
          </li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            The right to restrict processing – You have the right to request
            that we restrict the processing of your personal data, under certain
            conditions.
          </li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            The right to object to processing – You have the right to object to
            our processing of your personal data, under certain conditions.
          </li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          <li>
            The right to data portability – You have the right to request that
            we transfer the data that we have collected to another organization,
            or directly to you, under certain conditions.
          </li>
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please contact us.
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>Children's Information</span>:
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Mrmart does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </Typography>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

const useStyles = makeStyles((theme) => ({
  privacyPolicyContainer: {
    width: "85%",
    maxWidth: "1635px",
    margin: "1rem auto",
    paddingTop: "10vh",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "18vh",
    },
  },
  logoContainer: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: "2vh",
  },
  logo: {
    height: "10vh",
    objectFit: "contain",
  },
  privacyPolicyTitle: {
    fontFamily: "Zen Dots, cursive",
  },
  stylizedUnderline: {
    width: "3rem",
    height: "0.5rem",
    borderRadius: "1rem",
    background: "#D81B60",
  },
  privacyPolicyBody: {
    padding: "1rem 0",
  },
  space: {
    display: "block",
    height: "0.6rem",
  },
  subTitles: {
    letterSpacing: "0.1rem",
  },
  underline: {
    textDecoration: "underline",
    paddingRight: "0.2rem",
  },
  content: {
    color: "#292929",
    padding: "0 1rem ",
    fontSize: "1.1rem",
  },
  email: {
    textDecoration: "underline",
    color: "#2196F3",
  },
}));
