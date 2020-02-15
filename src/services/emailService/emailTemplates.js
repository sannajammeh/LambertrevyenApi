import { formatToNOK } from '../../../../client/src/utils/format';

export const ticketReserved = ({
  ticketId = '',
  fullName = '',
  seats = '',
  total = 0,
  date = '',
}) => /*html */ `

<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Billett reservert | Lambertrevyen</title>
    <style>
      /* -------------------------------------
        INLINED WITH htmlemail.io/inline
    ------------------------------------- */
      /* -------------------------------------
        RESPONSIVE AND MOBILE FRIENDLY STYLES
    ------------------------------------- */
      @media only screen and (max-width: 620px) {
        table[class='body'] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }
        table[class='body'] p,
        table[class='body'] ul,
        table[class='body'] ol,
        table[class='body'] td,
        table[class='body'] span,
        table[class='body'] a {
          font-size: 16px !important;
        }
        table[class='body'] .wrapper,
        table[class='body'] .article {
          padding: 10px !important;
        }
        table[class='body'] .content {
          padding: 0 !important;
        }
        table[class='body'] .container {
          padding: 0 !important;
          width: 100% !important;
        }
        table[class='body'] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }
        table[class='body'] .btn table {
          width: 100% !important;
        }
        table[class='body'] .btn a {
          width: 100% !important;
        }
        table[class='body'] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }

      /* -------------------------------------
        PRESERVE THESE STYLES IN THE HEAD
    ------------------------------------- */
      @media all {
        .ExternalClass {
          width: 100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
        .btn-primary table td:hover {
          background-color: #34495e !important;
        }
        .btn-primary a:hover {
          background-color: #34495e !important;
          border-color: #34495e !important;
        }
      }
    </style>
  </head>
  <body
    class=""
    style="background-color: #f7f8f9; color: #46494C; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="body"
      style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"
    >
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        <td
          class="container"
          style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"
        >
          <div
            class="content"
            style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"
          >
            <!-- START CENTERED WHITE CONTAINER -->
            <span
              class="preheader"
              style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;"
              >Billet er reservert</span
            >
            <table
              class="main"
              style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"
            >
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td
                  class="wrapper"
                  style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"
                  >
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                        <h1
                          style="font-family: sans-serif; font-size: 24px; font-weight: bold; margin: 0; Margin-bottom: 15px;"
                        >
                          Din billet
                        </h1>
                        <p
                          style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;"
                        >
                          Reservasjon opprettet! Din billett er reservert, men ikke betalt. Betaling
                          gjøres gjennom vipps ved luka før forestillingen. Beløpet kan også
                          forhåndsbetales.
                        </p>
                        <h3>
                          Status: <span style="font-weight: normal;">Reservert (Ikke betalt)</span>
                        </h3>
                        <ul style="list-style: none;">
                          <li><b>Billettkode:</b> ${ticketId}</li>
                          <li><b>Navn:</b> ${fullName}</li>
                          <li><b>Antall seter:</b> ${seats}</li>
                          <li><b>Dato:</b> ${date} <br /></li>
                          <li><b>Sum:</b> ${formatToNOK(total)}</li>
                        </ul>
                        <hr style="border: 0; border-bottom: 1px solid #D8DCFF" />
                        <h2 style="text-decoration: underline;">Forhåndsbetale</h2>
                        <h3 style="margin: 0; margin-bottom: 6px;">
                          VIPPS ${formatToNOK(total)} TIL
                          <span
                            style="vertical-align: middle; margin-bottom: 3px; border: 1.5px solid #D8DCFF; background: #ffffff; color:#46494C; padding: 2px 4px; border-radius: 4px; text-align: center; font-size: 16px; font-weight: normal;"
                          >+47 45513326</span>
                        </h3>
                        <p>
                          Husk å inkludere <b>billettkode!</b>
                          <span
                            style="vertical-align: middle; margin-bottom: 3px; border: 1.5px solid #D8DCFF; background: #ffffff; color:#46494C; padding: 2px 4px; border-radius: 4px; text-align: center; font-size: 16px; font-weight: normal;"
                          >${ticketId}</span>
                        </p>
                        <hr style="border: 0; border-bottom: 1px solid #D8DCFF" />
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="btn btn-primary"
                          style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"
                        >
                          <tbody>
                            <tr>
                              <td
                                align="left"
                                style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #32325d; border-radius: 5px; text-align: center;"
                                      >
                                        <!-- <a
                                          href="http://htmlemail.io"
                                          target="_blank"
                                          style="display: inline-block; color: #ffffff; background-color: #32325d; border: solid 1px #32325d; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #32325d;"
                                          >Call To Action</a
                                        > -->
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p
                          style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;"
                        >
                          <b>Addresse:</b> Cecilie Thoresens vei 6, 1153 OSLO <br />
                          <b>Dato:</b> ${date} <br />
                          <b>Klokkeslett</b>: 19.00
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div
              class="footer"
              style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"
              >
                <tr>
                  <td
                    class="content-block"
                    style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; font-weight: bold; color: #999999; text-align: center;"
                  >
                    <span
                      class="apple-link"
                      style="color: #999999; font-size: 12px; text-align: center;"
                      >Lambertrevyen 2020</span
                    >
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

            <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
`;
