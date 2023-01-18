import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { CustomFooter } from ".";
const expectedHrefs = [
  "https://www.gov.uk/help",
  "https://www.gov.uk/help/privacy-notice",
  "https://www.gov.uk/help/cookies",
  "https://www.gov.uk/help/accessibility-statement",
  "https://www.gov.uk/contact",
  "https://www.gov.uk/help/terms-conditions",
  "https://www.gov.uk/cymraeg",
  "https://www.gov.uk/government/organisations/government-digital-service",
  "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  "https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/",
];
const expectedLinkText = [
  "Help",
  "Privacy",
  "Cookies",
  "Accessibility statement",
  "Contact",
  "Terms and conditions",
  "Rhestr o Wasanaethau Cymraeg",
  "Government Digital Service",
  "Open Government Licence v3.0",
  "© Crown copyright",
];
describe("CustomFooter", () => {
  beforeEach(() => {
    render(<CustomFooter />);
  });
  test("render correctly", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });
  test("renders correct amount of links ", () => {
    const links = screen.getAllByRole("link");
    const numberOfLinks = 10;
    expect(links).toHaveLength(numberOfLinks);
  });
  test("renders correct amount of links ", () => {
    const links = screen.getAllByRole("link");
    const numberOfLinks = 10;
    expect(links).toHaveLength(numberOfLinks);
  });
  test("renders correct link text", () => {
    const links = screen.getAllByRole("link");
    const linkText = links.map((link) => link.textContent);
    expect(linkText).toEqual([expectedLinkText]);
  });
  test("renders licence svg logo", () => {
    const { container } = render(<CustomFooter />);
    const svgLogo = container.querySelector(".govuk-footer__licence-logo");
    expect(svgLogo).toBeInTheDocument();
  });
  test("renders the correct licence description", () => {
    const licenceDescription = screen.getByText(
      /all content is available under the , except where otherwise stated/i
    );
    expect(licenceDescription).toBeInTheDocument();
  });
  test("renders correct link hrefs", () => {
    const { container } = render(<CustomFooter />);
    const links = Array.from(container.querySelectorAll("a"));
    const linkHrefs = links.map((link) => link.getAttribute("href"));
    expect(linkHrefs).toEqual(expectedHrefs);
  });
  test("renders the crown copyright", () => {
    const crownCopyRight = screen.getByRole("link", {
      name: /© crown copyright/i,
    });

    expect(crownCopyRight).toBeInTheDocument();
  });
});
