import React from "react";
import {
  footerStyles,
  footerBackgroundStyles,
  contactIconGradients,
  iconColors,
  footerCustomStyles,
} from "../assets/dummyStyles";
import {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Shield,
  HandHelping,
} from "lucide-react";
import {
  socialIcons,
  quickLinks,
  supportLinks,
  contactInfo,
} from "../assets/dummyFooter";
import logo from "../assets/logo.png";
const iconMap = {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Shield,
  HandHelping,
};

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      {/* Background */}
      <div className={footerBackgroundStyles.backgroundContainer}>
        <div className={footerBackgroundStyles.floatingOrb1} />
        <div className={footerBackgroundStyles.floatingOrb2} />
        <div className={footerBackgroundStyles.floatingOrb3} />
        <div className={footerBackgroundStyles.floatingOrb4} />
        <div className={footerBackgroundStyles.gridOverlay}>
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* CONTENT (this must be relative & visible) */}
      <div className={footerStyles.container}>
        <div className={footerStyles.grid}>
          <div className={footerStyles.brandTransform}>
            <div className={footerStyles.brandContainer}>
              <div className={footerStyles.brandGradient}></div>
              <div className="relative flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-12 h-12" />
                <h3 className={footerStyles.brandTitle}>StudyHub</h3>
              </div>
            </div>

            <p className={footerStyles.brandDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          {/* Socials */}
          <div>
            <h4 className={`${footerStyles.sectionHeader} ${iconColors.cyan}`}>
              <ArrowRight className={footerStyles.sectionIcon} />
              Quick Links
            </h4>
            <ul className={footerStyles.linksList}>
              {quickLinks.map((link, index) => {
                const Icon = iconMap[link.iconKey] || <ArrowRight />;
                return (
                  <li key={index}>
                    <a
                      href={link.href}
                      target="_blank"
                      style={{ transitionDelay: `${index * 100}ms` }}
                      className={`${footerStyles.linkItem} ${iconColors.cyan} `}
                    >
                      <Icon
                        className={`${footerStyles.linkIcon} ${iconColors.cyan}`}
                      />
                      <span className={`truncate`}>{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* support */}
          <div>
            <h4
              className={`${footerStyles.sectionHeader} ${iconColors.purple}`}
            >
              <HandHelping className={footerStyles.sectionIcon} />
              Support
            </h4>
            <ul className={footerStyles.linksList}>
              {supportLinks.map((link, index) => {
                const Icon = iconMap[link.iconKey] || <HelpCircle />;
                return (
                  <li key={index}>
                    <a
                      href={link.href}
                      target="_blank"
                      style={{ transitionDelay: `${index * 100}ms` }}
                      className={`${footerStyles.linkItem} ${iconColors.purple} `}
                    >
                      <Icon
                        className={`${footerStyles.linkIcon} ${iconColors.purple}`}
                      />
                      <span className={`truncate`}>{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* contact */}
          <div>
            <h4
              className={`${footerStyles.sectionHeader} ${iconColors.emerald}`}
            >
              <Phone className={footerStyles.sectionIcon} />
              Contact Us
            </h4>
            <div className={footerStyles.contactSpace}>
              <div className={footerStyles.contactItem}>
                <div
                  className={`${footerStyles.contactIconContainer} ${contactIconGradients.address}`}
                >
                  <MapPin
                    className={`${footerStyles.contactIcon} ${iconColors.cyan600}`}
                  />
                </div>

                <div className={`${footerStyles.contactTextContainer} `}>
                  <p className={`${footerStyles.contactTextPrimary} `}>
                    {contactInfo.addressLine1}
                  </p>
                  <p className={`${footerStyles.contactTextSecondary} `}>
                    {contactInfo.city}
                  </p>
                </div>
              </div>

              <div className={footerStyles.contactItem}>
                <div
                  className={`${footerStyles.contactIconContainer} ${contactIconGradients.phone}`}
                >
                  <Phone
                    className={`${footerStyles.contactIcon} ${iconColors.purple600}`}
                  />
                </div>

                <div className={`${footerStyles.contactTextContainer} `}>
                  <p className={`${footerStyles.contactTextPrimary} `}>
                    {contactInfo.phone}
                  </p>
                  <p className={`${footerStyles.contactTextSecondary} `}>
                    {contactInfo.phoneHours}
                  </p>
                </div>
              </div>

              <div className={footerStyles.contactItem}>
                <div
                  className={`${footerStyles.contactIconContainer} ${contactIconGradients.email}`}
                >
                  <Mail
                    className={`${footerStyles.contactIcon} ${iconColors.emerald600}`}
                  />
                </div>

                <div className={`${footerStyles.contactTextContainer} `}>
                  <p className={`${footerStyles.contactTextPrimary} `}>
                    {contactInfo.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* social icons */}

        <div className={footerStyles.socialSection}>
          <div className={footerStyles.socialContainer}>
            <div className={footerStyles.socialIconsContainer}>
              {socialIcons.map((social, index) => {
                const IconComponent = iconMap[social.iconKey] || Twitter;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    aria-label={social.name}
                    className={footerStyles.socialIconLink}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {/* subtle hover overlay only matters on pointer devices */}
                    <div
                      className={`${footerStyles.socialIconContainer} ${social.bgColor}`}
                    >
                      <div className={footerStyles.socialIconInner}>
                        <IconComponent className={footerStyles.socialIcon} />
                      </div>

                      {/* small tooltip on hover for pointer devices; hidden on touch by default */}
                      <div className={footerStyles.socialTooltip}>
                        {social.name}
                        <div className={footerStyles.socialTooltipArrow} />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          <div className={footerStyles.designCredit}>
            <div className={footerStyles.designCreditContainer}>
              <div className={footerStyles.designCreditGradient} />

              <p className={footerStyles.designCreditText}>
                Designed and Developed by{" "}
                <a
                  href={contactInfo.website}
                  target="_blank"
                  className={footerStyles.designCreditLink}
                >
                  {contactInfo.designBy}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{footerCustomStyles}</style>
    </footer>
  );
};

export default Footer;
