import * as React from "react";
//@ts-ignore
// import { Button } from "govuk-react-jsx";
// export class WelcomePage extends React.component {
//   render(): JSX.Element {
//     return (
//       <>
//         <div className="govuk-width-container">
//           <main className="govuk-main-wrapper govuk-main-wrapper--l">
//             <div className="govuk-grid-row">
//               <div className="govuk-grid-column-two-thirds">
//                 <h1 className="govuk-heading-xl">Welcome to the form</h1>
//                 <p className="govuk-body-m">
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                 </p>
//               </div>
//             </div>
//             <button disabled>Start now </button>
//             {/* <Button isStartButton disabled>
//             Start now{" "}
//           </Button> */}
//           </main>
//         </div>
//       </>
//     );
//   }
// }
// import React from "react";
// //@ts-ignore
// // import { Button } from "govuk-react-jsx";
export const WelcomePage = (): JSX.Element => {
  return (
    <>
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper govuk-main-wrapper--l">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Welcome to the form</h1>
              <p className="govuk-body-m">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>
            </div>
          </div>
          <button disabled>Start now </button>
          {/* <Button isStartButton disabled>
            Start now{" "}
          </Button> */}
        </main>
      </div>
    </>
  );
};
