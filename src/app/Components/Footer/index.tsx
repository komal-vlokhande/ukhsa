import * as React from "react";
import { Footer } from "govuk-react-jsx";
const links = {
  Help: "https://www.gov.uk/help",
  Privacy: "https://www.gov.uk/help/privacy-notice",
  Cookies: "https://www.gov.uk/help/cookies",
  "Accessibility statement": "https://www.gov.uk/help/accessibility-statement",
  Contact: "https://www.gov.uk/contact",
  "Terms and conditions": "https://www.gov.uk/help/terms-conditions",
  "Rhestr o Wasanaethau Cymraeg": "https://www.gov.uk/cymraeg",
  "Government Digital Service":
    "https://www.gov.uk/government/organisations/government-digital-service",
  "Open Government Licence v3.0":
    "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  "© Crown copyright":
    "https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/",
};
const mapLinks = (links) => {
  return Object.entries(links).map(([children, href]) => {
    return { children, href };
  });
};
export class CustomFooter extends React.Component {
  render(): JSX.Element {
    const footerLinks = mapLinks(links);
    return (
      <Footer
        meta={{
          items: footerLinks,
        }}
      />
    );
  }
}
