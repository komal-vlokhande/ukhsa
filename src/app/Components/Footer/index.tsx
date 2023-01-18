import * as React from "react";
import { Footer } from "govuk-react-jsx";

export class CustomFooter extends React.Component {
  render(): JSX.Element {
    return (
      <Footer
        meta={{
          items: [
            {
              children: "Help",
              href: "https://www.gov.uk/help",
            },
            {
              children: "Privacy",
              href: "https://www.gov.uk/help/privacy-notice",
            },
            {
              children: "Cookies",
              href: "https://www.gov.uk/help/cookies",
            },
            {
              children: "Accessibility statement",
              href: "https://www.gov.uk/help/accessibility-statement",
            },
            {
              children: "Contact",
              href: "https://www.gov.uk/contact",
            },
            {
              children: "Terms and conditions",
              href: "https://www.gov.uk/help/terms-conditions",
            },
            {
              children: "Rhestr o Wasanaethau Cymraeg",
              href: "https://www.gov.uk/cymraeg",
            },
            {
              children: "Government Digital Service",
              href: "https://www.gov.uk/government/organisations/government-digital-service",
            },
          ],
        }}
      />
    );
  }
}
