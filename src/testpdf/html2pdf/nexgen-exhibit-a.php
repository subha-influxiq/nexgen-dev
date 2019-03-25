<?php
//============================================================+
// File name   : example_003.php
// Begin       : 2008-03-04
// Last Update : 2013-05-14
//
// Description : Example 003 for TCPDF class
//               Custom Header and Footer
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: Custom Header and Footer
 * @author Nicola Asuni
 * @since 2008-03-04
 */

// Include the main TCPDF library (search for installation path).
require_once('tcpdf/examples/tcpdf_include.php');
//require_once('tcpdf_include.php');
class MYPDF extends TCPDF {
    // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
        $this->SetY(30);
        $this->SetX(28);
        // Set font
        //$this->SetFont('helvetica', 8);
        // Page number
        //$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        //$this->Cell(0, 10, $this->getAliasNumPage(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        //$this->Cell(0, 10, 'Confidentiality Agreement', 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }
}


$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);


// create new PDF document
//$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
/*$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('TCPDF Example 021');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');*/

// set default header data
/*$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 021', PDF_HEADER_STRING);*/

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);

$pdf->SetLeftMargin(8);
$pdf->SetRightMargin(8);

//$pdf->SetY(50);


$pdf->setPrintHeader(false);
//$pdf->setPrintFooter(false);

$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);






// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
//$pdf->SetFont('helvetica', '', 9);
//$pdf->SetFont('helvetica');



// add a page
$pdf->AddPage();

// create some HTML content
/*$html = '<h1>Example of HTML text flow</h1>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. <em>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</em> <em>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</em><br /><br /><b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i><br /><br /><b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u>';*/


$id = $_GET['id'];
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "http://api.nexgentesting.com:7001/getcontractdetailsforpdf?id=".$id,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
));
$headers = [];
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
$result=json_decode($response);
$result = $result->res;

$html = '

<div>


    <!--EXHIBIT A START-->
    <p style="text-align:center; margin-bottom:0px; font-size:12px; display:block;"> EXHIBIT A <br><br><b>SALES AND MARKETING CODE OF CONDUCT OF<br>
    NEX GEN TESTING, INC.</p>
    </p>
    <table>
        <tr>
            <td style="  font-size:12px; font-weight:normal;" > <b>Nex Gen Testing,</b> Inc. (NGT) will conduct its business honestly and ethically wherever we operate in the world. We will constantly improve the quality of our services, products and operations and will create a reputation for honesty, fairness, respect, responsibility, integrity, trust and sound business judgment.  No illegal or unethical conduct on the part of officers, directors, employees or affiliates will be tolerated.   NGT will not compromise its principles for short-term advantage. The ethical performance of this company is the sum of the ethics of the men and women who work for NGT. Thus, we are all expected to adhere to high standards of personal integrity.</td>
        </tr>
        <br>
        <tr>
            <td style="font-size:12px; font-weight:normal;" ><b>Written Procedures and Policies:</b> </td>
        </tr>
        <br>
        <tr>
            <td style="font-size:12px; font-weight:normal;" >NGT has adopted written policies that promote our commitment to compliance and that address specific areas of potential fraud, such as billing, marketing and claims processing. These policies have been developed under the supervision and direction of NGT’s Chief Compliance Officer and has been provided to all individuals who are affected by the specific policy at issue.</td>
        </tr>
        <br>
        <tr>
            <td style="font-size:12px; font-weight:normal;" ><b>Standards of Conduct:</b> </td>
        </tr>
        <br>
        <tr>
            <td style="font-size:12px; font-weight:normal;" > NGT has developed this Sales and Marketing Standard of Conduct for all its employees and affiliates (including independent sales CONSULTANTs and companies providing sales CONSULTANT services to NGT) to clearly delineate the policies of NGT with respect to sales and marketing and to assure adherence to all guidelines and regulations governing federally funded health care programs. This Sales and Marketing Standard of Conduct will be made available to and understandable by all employees and affiliates involved in sales and marketing, and will be regularly updated as the policies and regulations of these programs are modified. Strict adherence to compliance policies and applicable legal requirements is a condition of employment or contractual engagement. </td>
        </tr>
        <br>
        <tr>
            <td style="font-size:12px; font-weight:normal;" >NGT WILL TAKE DISCIPLINARY ACTION, UP TO AND INCLUDING TERMINATION, FOR VIOLATION OF THESE POLICIES AND PROCEDURES.
            </td>
        </tr>
        <br>
            <tr>
                <td style="font-size:12px; font-weight:normal;" ><b>Sales and Marketing: </b>
                </td>
            </tr>
            <br>
            <tr>
            <td style="font-size:12px; font-weight:normal;" > NGT requires honest, straightforward, fully informative and non-deceptive marketing. NGT believes that it is in the best interest of patients, physicians, Medicare and NGT alike that physicians fully understand the services offered by NGT, the services that will be provided when tests are ordered, and the financial consequences for Medicare, as well as other payers, for the tests ordered. Accordingly, all of NGT’s marketing information will be clear, correct, non-deceptive and fully informative. Officers, directors, employees and affiliates will refrain from gathering competitor intelligence by illegitimate means and refrain from acting on knowledge or information which has been gathered in such a manner. The officers, directors, employees and affiliates of NGT will seek to avoid exaggerating or disparaging comparisons of the services and competence of their competitors.
                </td>
            </tr>
            <br>

        <tr>
            <td style="font-size:12px; font-weight:normal;" ><b>Medical Necessity:</b></td>
        </tr>
         <br>
        <tr>
            <td style="font-size:12px; font-weight:normal;" >NGT will only submit claims to federally funded health care programs for services that NGT has reason to believe are medically necessary. While NGT does not and cannot treat patients or make medical necessity determinations, NGT is in a unique position to educate our physician clients regarding the requirement of medical necessity for each test ordered. NGT’s requisition forms will emphasize physician choice and encourage physicians to order, to the extent possible, only those tests that they believe are appropriate for each patient. When NGT creates a custom profile for a physician, the requesting physician will be required to sign an acknowledgement that the physician has requested the custom profile; has been provided Medicare reimbursement amount for each test; has been told to order medically necessary tests only; understands that some tests may not be reimbursed; and has the right to not use the custom profile and order tests differently for any patient.
            </td>
        </tr>
        <br>

    <tr>
      <td style="font-size:12px; font-weight:normal;" ><b> Conflicts of Interest:</b></td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal;" > Officers, directors, employees and affiliates of the company must never permit their personal interests to conflict, or appear to conflict, with the interests of NGT, its clients or affiliates. Officers, directors, employees and affiliates must be particularly careful to avoid representing NGT in any transaction with others with whom there is any outside business affiliation or personal or family relationship. Officers, directors, employees and affiliates shall avoid using their company contacts to advance their private business or personal interests at the expense of NGT, its clients or affiliates. Officers, directors, employees and affiliates will avoid conflicts of interests which could interfere with their ability to deliver quality products or services to the company and its clients. Officers, directors, employees and affiliates involved in sales and marketing activities must annually report any actual or potential conflicts of interest by completing a Conflict of Interest Disclosure form.  In addition, any time a potential conflict arises, a new Conflict of Interest Disclosure must be completed. In addition, when an officer, director, employee or affiliate is faced with a potential conflict of interest, he or she should seek guidance from the Chief Compliance Officer before proceeding. Whenever an officer, director, employee or affiliate has a question about whether a situation presents a conflict, he or she should contact the Chief Compliance Officer.
        </td>
    </tr>
    <br>
    
    <tr>
      <td style="font-size:12px; font-weight:normal;" ><b> Kickbacks and Gifts:</b></td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal;" >Federal and State Anti-Kickback statutes are violated when payment is given or received in exchange for the referral of patients who are covered under federal health care programs, such as Medicare, unless a statutory exception applies.  Harsh criminal, civil and monetary penalties can result.  A kick back is considered any item of value, or compensation of any kind, to improperly obtain or reward favorable treatment. Consistent with Federal and State law, NGT does not permit bribes, kickbacks or other similar remuneration or consideration to be given to any person or organization in order to attract or influence business activity. Officers, directors, employees and affiliates shall avoid gifts, gratuities, fees, bonuses, or excessive entertainment to attract or influence business activity. Excessive entertainment is defined as any amount in excess of guidelines determined annually by Medicare/CMS.  Officers, directors, employees and affiliates shall refrain from using offers of equipment, computer hardware, computer software, support staff and other non-monetary gifts that deviate from accepted business practices authorized by NGT and incorporated into company sponsored sales training. It is NGT’s policy that non-monetary gifts to physicians must meet exceptions defined in the Stark Law:

        </td>
    </tr>
    <br>

    <tr>
        <td style="font-size:12px; font-weight:normal; width: 10px;" ><div style="background-color:#000; width:5px; height:1px; "></div> </td>
        <td style="font-size:12px; font-weight:normal;" >&nbsp;&nbsp;&nbsp; The compensation is not determined in any manner that takes into account the volume or value of referrals or other business generated by the referring physician.</td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width: 10px;" ><div style="background-color:#000; width:5px; height:1px; "></div> </td>
        <td style="font-size:12px; font-weight:normal;" >&nbsp;&nbsp;&nbsp; The compensation may not be solicited by the physician or the physician.s practice (including employees and staff members).</td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width: 10px;" ><div style="background-color:#000; width:5px; height:1px; "></div> </td>
        <td style="font-size:12px; font-weight:normal;" >&nbsp;&nbsp;&nbsp;  The compensation arrangement does not violate the Anti-Kickback statute or any Federal or State law or regulation governing billing or claims submission.</td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width: 10px;" ><div style="background-color:#000; width:5px; height:1px; "></div> </td>
        <td style="font-size:12px; font-weight:normal;" >&nbsp;&nbsp;&nbsp;  The compensation arrangement does not violate the Anti-Kickback statute or any Federal or State law or regulation governing billing or claims submission.</td>
    </tr>
    <br>

    <tr>
        <td style="font-size:12px; font-weight:normal; width:100%;" > Officers, directors, employees and affiliates cannot attempt to control or improperly influence a physician’s decision as to which clinical laboratory to use for the testing of patient specimens. The decision as to which clinical laboratory to use is to be made solely by the referring physician.

        </td>
    </tr>
    <br>
    
    <tr>
        <td style="font-size:12px; font-weight:normal;width:100%;" > ANY ATTEMPT TO CONTROL OR IMPROPERLY INFLUENCE A REFERRAL TO NGT WILL RESULT IN DISCIPLINARY ACTION, UP TO AND INCLUDING TERMINATION.
        </td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal;width:100%;" >In order to effectively monitor compliance with all applicable federal and state laws, NGT also prohibits CONSULTANTs, working under an Independent Contractor Group who is subject to a Representation Agreement with NGT, from employing any regular employees or independent contractors for the solicitation and sales of NGT products and services.

        </td>
    </tr>
    <br>
    <tr>
    <td style="font-size:12px; font-weight:normal;" ><b> Excluded Individuals and Companies:</b></td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal;" >NGT will not employ or contract with individuals or companies who have been convicted of a criminal offense related to health care or who are listed by a Federal agency as debarred, excluded or otherwise ineligible for participation in federally funded health care programs. In addition, until resolution of such criminal charges or proposed debarment or exclusion, individuals who are charged with criminal offenses related to health care or proposed for exclusion or debarment will be removed from direct responsibility for or involvement in any federally funded health care program. If resolution results in conviction, debarment or exclusion of the individual, NGT will immediately terminate its employment of that individual or company.

        </td>
    </tr>
  <br>

  <tr>
    <td style="font-size:12px; font-weight:normal;" ><b> Confidentiality:</b></td>
  </tr>
  <br>
  <tr>
    <td style="font-size:12px; font-weight:normal;">Officers, directors, employees and affiliates of NGT will often come into contact with, or have possession of, trade secret, proprietary, confidential or business-sensitive information and must take appropriate steps to ensure that such information is strictly safeguarded. This information – whether it is on behalf of our company or any of our clients, referral sources, suppliers, vendors or affiliates – could include strategic business plans, operating results, marketing strategies, customer lists, personnel records, upcoming acquisitions and divestitures, new investments, and manufacturing costs, processes and methods. Trade secrets, proprietary, confidential and sensitive business information about this company, other companies, individuals and entities should be treated with sensitivity and discretion and only be disseminated on a need-to-know basis. Officers, directors, employees and affiliates will refrain from using or disclosing the trade secrets or confidential, proprietary information of third parties, unless such information is in the public domain or was disclosed by someone who was authorized to disclose such information to NGT. Officers, directors, employees and affiliates will comply with the Health Insurance Portability and Accountability Act of 1996 (referred to as HIPAA) with respect to the use and disclosure of patient health information (PHI).

        </td>
    </tr>
    <br>

    <tr>
    <td style="font-size:12px; font-weight:normal;" ><b> Reporting:</b></td>
  </tr>
  <br>
  <tr>
    <td style="font-size:12px; font-weight:normal;">Officers, directors, employees and affiliates will seek to report all information accurately and honestly, and as otherwise required by applicable reporting requirements. Officers, directors, employees and affiliates agree to timely disclose or report unethical, dishonest, fraudulent and illegal behavior, or the violation of company policies and procedures, directly to management or the Chief Compliance Officer. In addition, NGT has a hotline telephone number that can be used to anonymously report suspected misconduct.   NGT has an open door, complete anonymity, non-retribution policy available to all officers, directors, employees and affiliates to encourage communication and reporting of suspected misconduct.

        </td>
    </tr>
    <br>
    <tr>
    <td style="font-size:12px; font-weight:normal;" ><b>  Disciplinary Action::</b></td>
  </tr>
  <br>
  <tr>
    <td style="font-size:12px; font-weight:normal;">Violation of this Code of Conduct can result in discipline, including possible termination or termination of contractual agreements to represent NGT. The degree of discipline may relate in part to whether there was a voluntary disclosure of any ethical violation and whether or not the violator cooperated in any subsequent investigation.
        </td>
    </tr>
    <br><br>

    <tr>
        <td style="font-size:12px; font-weight:normal; text-align:center;"><b>NGT SALES AND MARKETING CODE OF CONDUCT CERTIFICATION</b></td>
    </tr>
    <br>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal;  ">I, <u>'.$result->firstname.' '.$result->lastname.'</u> , certify to having read the NGT Sales and Marketing Code of Conduct (Code) and agree to perform my job duties in accordance with the Code and NGT’s Compliance Plan. I understand the principles and requirements set forth in the Code and understand that violation of the Code or the Compliance Plan can result in termination of the Agreement and/or legal action to recover damages.  I understand my responsibilities to disclose fraudulent or unethical business practices to NGT’s management and will honestly and accurately complete surveys performed by NGT to document continuing compliance with the Code and the Compliance Plan.
        </td>
    </tr>
    <br>
    <tr> <td></td></tr>
    <br><br> 
    </table>
    
    <table>
            <tr>
                <td style="font-size:12px; font-weight:normal;width:50%;"> <u>__________________________</u>
                <br>
                SIGNATURE OF CONSULTANT
                </td>
                <td style="font-size:12px; font-weight:normal; width:50%;"><u>'.$result->created_at.'</u> <br>
                DATE</td>
            </tr>
            <tr>
                <td></td>
            </tr>

    </table>

    
</div>

';
/*$html3 ='






';*/

// output the HTML content
$pdf->SetY(0);
//$pdf->SetX(0);
//$pdf->writeHTML($html.$html2.$html3, true, 0, true, true);
//$pdf->writeHTML($html, true, false, true, false, '');


//$pdf->SetFont('helvetica');
$pdf->writeHTML($html, true, false, true, false, '');


/*$fontname = TCPDF_FONTS::addTTFfont('includes/plugins/html2pdf/tcpdf/fonts/Notera_PersonalUseOnly.ttf', 'TrueTypeUnicode', '', 30);

$pdf->SetFont($fontname, '', 25, '', false);
$pdf->writeHTML($html2, true, 0, true, true);

//$pdf->SetFont('helvetica');
$pdf->writeHTML($html3, true, false, true, false, '');*/

// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('nexgen-exhibit-a.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
