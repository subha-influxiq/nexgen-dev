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
/*echo "<pre>";
print_r(($result));
echo "</pre>";*/
/*echo date($result->created_at,"Y/m/d H:i:s");*/
//exit;

/*echo date("Y-m-d", strtotime(($result->created_at) ));
exit;*/
$html = '

<div>
	<h2 style="text-align:center;"> SALES CONSULTANTS AGREEMENT </h2>

<p style="font-size:14px; line-height:22px;">THIS SALES CONSULTANTS AGREEMENT (the "Agreement") is made and entered into as of <u> '.$result->created_at.'</u> <span style="width:350px; display:block; border-bottom: solid 3px #000;">'.$result->firstname.' '.$result->lastname.'</span>, 2018, by and between Nex Gen Testing, with its principal place of business at 5006 Largo, Granbury, TX  76049 ("NGT”) and <span style="width:200px; border-bottom:3px solid #000;">2</span>, having a business address at <span style="width:220px; border-bottom:6px solid #000;">3</span>, ("CONSULTANT"). This Agreement supersedes any previous letters, contract(s) or other agreements between the parties hereto.
</p>
<p>The parties hereby agree as follows:</p>

<table style="font-weight:normal;">
    <tr>
        <td style="width:20px; font-size:13px; font-weight:normal;"><strong>1</strong></td>
        <td style="width:100%; font-size:12px; font-weight:normal; line-height:18px;" ><strong> APPOINTMENT AND ACCEPTANCE.</strong>  NGT  appoints the CONSULTANT as its non-exclusive Independent CONSULTANT to promote the solicitation of, and broker orders for respiratory pathology panel testing, UTI, GI and wound (“ID Testing”) received from Hospitals, Laboratories, Distributors and Physician Practices of which are introduced or referred to NGT by CONSULTANT and NGT becomes, through contractual agreement, the “Preferred provider” with our Contracted Affiliate being  “Reference lab” for receiving and processing samples/specimens provided to NGT by Hospitals, Laboratories, Distributors and Physician Practices through introductions or reference by CONSULTANT. Other products and services may be added to this Agreement by written notification by NGT (collectively the “Products and Services”).  The CONSULTANT accepts the appointment and agrees to promote the solicitation of, and broker orders for the Products and Services in accordance with this Agreement.</td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"><strong>2</strong></td>
        <td style="width:100%; font-size:12px; font-weight:normal; line-height:18px;"><strong> TERRITORY. </strong>  CONSULTANT’s “Territory” All States and U.S. Territories, except for the State of New York, are included in “CONSULTANT Territory.” Under no circumstances shall CONSULTANT promote the sale of NGT Products and Services in the State of New York or any other state who may at any time enact any law which prohibits the services to be provided by CONSULTANT described herein.  NGT is responsible for communicating to CONSULTANT in a timely manner any changes in any laws or regulations that would prohibit the sale & promotion of NGT Products and Services.</td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"><strong>3</strong></td>
        <td style="width:100%; font-size:12px; font-weight:normal; line-height:18px; "><strong> COMMISSION. </strong>  NGT will pay CONSULTANT a commission on sales of Products and Services as described in Schedule A, attached hereto and made part of this Agreement by reference, and as may be amended from time to time in NGT’s and the CONSULTANTs mutual agreement.  Commissions are not payable until payment is received by NGT from the Contracted Affiliate company or companies Who receive it from the Customer or third-party payor in good funds. “Customer” means a person or entity that has placed or is placing one or more orders for Products and Services from NGT or one of our contracted affiliates companies.   Commissions are calculated and paid monthly. Commissions will be paid pursuant to Schedule A during the term of the Agreement and for six (6) months following the date of Termination. 
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"><strong>4</strong></td>
        <td style="width:100%; font-size:14px;"><strong> RESPONSIBILITIES. </strong> </td>
    </tr>
    
    <tr>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:30px;">A .</td>
        <td style="width:100%;">  CONSULTANT agrees to the following responsibilities: </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:40px;"> (i)  </td>
        <td style="font-size:12px; font-weight:normal;">CONSULTANT shall comply with all federal, state and local laws in the conduct of the services hereunder, including obtaining all necessary business permits, certificates and licenses required to carry out the services to be performed under this Agreement throughout CONSULTANT’s agreed to territory. In particular, CONSULTANT shall comply with the Medicare and Medicaid Anti-Fraud and Abuse Statute, 42 U.S.C.§ 1320a-7b(b), the “Stark Law,” 42 U.S.C. § 1395nn, and all other applicable laws and regulations and, in this regard, CONSULTANT acknowledges and agrees that no physician or provider shall be provided with or given any form of incentives, rebates or other form of compensation. CONSULTANT shall fully indemnify, defend and hold NGT harmless from and against any claim, demand, action, or liability pertaining to, or arising out of, CONSULTANT’s violation of any federal, state, or local law related to the solicitation or sale of any of NGT’s Products and Services. NGT agrees to fully indemnify, defend and hold CONSULTANT harmless from and against any claim, demand, action, or liability pertaining to, or arising out of, NGT’s violation of any federal, state, or local law related to the solicitation or sale of any of NGT’s Products and Services.</td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"> </td>
        <td style="width:20px;"> </td>
        <td style="width:20px;"> </td>
        <td style="width:40px;"> (ii) </td>
        <td style="font-size:12px; font-weight:normal;">CONSULTANT shall comply with all federal, state and local laws in the conduct of the services hereunder, including obtaining all necessary business permits, certificates and licenses required to carry out the services to be performed under this Agreement throughout CONSULTANT’s agreed to territory. In particular, CONSULTANT shall comply with the Medicare and Medicaid Anti-Fraud and Abuse Statute, 42 U.S.C.§ 1320a-7b(b), the “Stark Law,” 42 U.S.C. § 1395nn, and all other applicable laws and regulations and, in this regard, CONSULTANT acknowledges and agrees that no physician or provider shall be provided with or given any form of incentives, rebates or other form of compensation. CONSULTANT shall fully indemnify, defend and hold NGT harmless from and against any claim, demand, action, or liability pertaining to, or arising out of, CONSULTANT’s violation of any federal, state, or local law related to the solicitation or sale of any of NGT’s Products and Services. NGT agrees to fully indemnify, defend and hold CONSULTANT harmless from and against any claim, demand, action, or liability pertaining to, or arising out of, NGT’s violation of any federal, state, or local law related to the solicitation or sale of any of NGT’s Products and Services.</td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;">  </td>
        <td style="width:20px;"> </td>
        <td style="width:20px;">  </td>
        <td style="width:40px;"> (iii)  </td>
        <td style="font-size:12px; font-weight:normal;">CONSULTANT shall comply with all portions of the Health Insurance Portability and Accountability Act of 1996 “HIPAA RULES” (as reduced to the final rules contained in 45 C.F.R. Parts 160 and 164, et al.) and shall be held to the same standard as a “BUSINESS ASSOCIATE” under the HIPAA RULES.  BUSINESS ASSOCIATE shall generally have the same meaning as defined in 45 C.F.R. 160.103.  Accordingly, CONSULTANT agrees to:  </td>
     </tr>
    <br>
    <tr>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;"> </td>
        <td style="width:30px;"> (a) </td>
        <td style="font-size:12px; font-weight:normal;">Not use or disclose protected health information “PHI” other than as permitted or required by the Agreement or as required by law; </td>
     </tr>
    <br>
    <tr>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:30px;"> (b) </td>
        <td style="font-size:12px; font-weight:normal;">Use appropriate safeguards, and comply with Subpart C of 45 C.F.R. Part 164 with respect to electronic protected health information, to prevent use or disclosure of PHI other than as provided for by this Agreement;  </td>
     </tr>
    <br>
    <tr>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:30px;"> (c)  </td>
        <td style="font-size:12px; font-weight:normal;"> Report to NGT any use or disclosure of PHI not provided for by this Agreement of which it becomes aware, including breaches of unsecured PHI; </td>
     </tr>
    <br>
    <tr>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;"> </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;"> </td>
        <td style="width:30px;"> (d) </td>
        <td style="font-size:12px; font-weight:normal;"> Ensure that any employees of the CONSULTANT that create, receive, maintain, or transmit PHI on behalf of CONSULTANT agree to the same restrictions, conditions, and requirements that apply to CONSULTANT with respect to such information;</td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;"> </td>
        <td style="width:20px;"> </td>
        <td style="width:30px;"> (e)  </td>
        <td style="font-size:12px; font-weight:normal;"> Make available any PHI in a designated record set to NGT.  Any requests for PHI from individual shall be forwarded to NGT within three (3) business days;
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;"> </td>
        <td style="width:30px;"> (f) </td>
        <td style="font-size:12px; font-weight:normal;"> Shall notify NGT of any individual requests for amendment(s) and make any such amendment(s) to PHI in a designated records set as directed or agreed to by NGT; </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"> </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;"> </td>
        <td style="width:20px;"> </td>
        <td style="width:20px;"></td>
        <td style="width:30px;"> (g) </td>
        <td style="font-size:12px; font-weight:normal;"> Maintain and make available the information required to provide an accounting of disclosures to NGT;  </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"> </td>
        <td style="width:20px;"> </td>
        <td style="width:20px;"> </td>
        <td style="width:20px;"> </td>
        <td style="width:20px;"> </td>
        <td style="width:30px;"> (h) </td>
        <td style="font-size:12px; font-weight:normal;"> Make its internal practices, books, and records available to the Secretary for purposes of determining compliance with HIPAA RULES;
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:30px;"> (i)  </td>
        <td style="font-size:12px; font-weight:normal;"> Only use or disclose PHI as required by law and with the express written permission of NGT; and    </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;">  </td>
        <td style="width:20px;"> </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:20px;">  </td>
        <td style="width:30px;"> (j)  </td>
        <td style="font-size:12px; font-weight:normal;"> Upon termination of this Agreement for any reason, return to NGT (or, if agreed to by NGT, destroy) all PHI received from NGT, or created, maintained, or received by CONSULTANT on behalf of NGT, that CONSULTANT still maintains in any form.  CONSULTANT shall retain no copies of PHI after the termination of this Agreement. 
        </td>
    </tr>
    <br>
    
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:40px;">(iv)</td>
        <td style="font-size:12px; font-weight:normal; width: auto;">CONSULTANT shall abide by all NGT policies and procedures, including the NGT Code of Conduct, in effect during the term of this Agreement. CONSULTANT will conduct its business in its own name and in such manner as it sees fit, and CONSULTANT is responsible for payment of its own expenses (except those authorized as reimbursable by NGT) including all expenses associated with anyone it hires or engages, including commissions, salaries, bonuses, benefits, and expenses of its employees and salespersons, and any and all taxes properly and lawfully associated with doing business as an independent contractor. CONSULTANT and NGT shall defend and hold each other harmless from and against any claim, demand, action, or liability pertaining to, or arising out of, claims by any employee or contractor of CONSULTANT against NGT for employee benefits or violation of any state or federal employment laws or of any claims by anyone arising out of any negligent or intentional act or omission by CONSULTANT and any of their officers, employees, or agents. </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:40px;">(v)</td>
        <td style="font-size:12px; font-weight:normal; width: auto;">CONSULTANT shall sign and return this Agreement, and the NGT Code of Conduct, as well as any amendments, to NGT prior to representing NGT.   A copy of the NGT Code of Conduct in effect as of the date hereof is attached hereto as Exhibit A.</td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:40px;">(vi)</td>
        <td style="font-size:12px; font-weight:normal; width: auto;">CONSULTANT has the right to delegate or assign these responsibilities to others to expand coverage through the use of employees of CONSULTANT, Employees are direct or indirect sales CONSULTANTs working for CONSULTANT and assigned to represent NGT or NGT’s contracted Affiliated companies on CONSULTANT’s behalf. Each requirement in this Agreement applied to “CONSULTANT” shall be deemed to apply equally to each EMPLOYEE, and CONSULTANT shall be held fully accountable to NGT with respect to each Consultant and EMPLOYEE’s compliance with such requirements. In particular:
            </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"> </td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(a)</td>
        <td style="font-size:12px; font-weight:normal;"> CONSULTANT shall cause and ensure that each EMPLOYEE will and does comply with all requirements under this Agreement and agrees to be responsible to, indemnify and hold harmless NGT for any matter arising from any Consultant or its EMPLOYEE’s failure to act in accordance with this Agreement;
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(b)</td>
        <td style="font-size:12px; font-weight:normal;"> CONSULTANT shall promptly notify NGT upon its adding any EMPLOYEE to its organization, if that EMPLOYEE will be selling NGT’s Products and Services, and CONSULTANT shall promptly inform NGT of the name of the added EMPLOYEE; </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(c)</td>
        <td style="font-size:12px; font-weight:normal;">With notification of the intent by CONSULTANT to employ a EMPLOYEE to sell the Products and Services of NGT and NGT’s contracted affiliated companies and prior to said EMPLOYEE beginning to sell NGT’s Products and Services, CONSULTANT shall provide NGT with a consent form, executed by the EMPLOYEE to permit NGT to perform a background check on the EMPLOYEE, and shall provide NGT with the full name, address and contact information for the EMPLOYEE.

        </td>
    </tr>
    <br>

    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(d)</td>
        <td style="font-size:12px; font-weight:normal;">CONSULTANT shall ensure that each EMPLOYEE participates in all training and compliance programs offered or required by NGT, as requested by NGT, including an initial training program;
        </td>
    </tr>
    <br>

    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(e)</td>
        <td style="font-size:12px; font-weight:normal;"> Prior to the initial training program for each EMPLOYEE, CONSULTANT will ensure that the EMPLOYEE signs the Code of Conduct and Confidentiality and Solicitation Agreement, as annexed hereto as Exhibits A and B, with any amendments thereto as may be required, prior to selling the Products and Services of NGT and NGT’s contracted Affiliated companies;  </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(f)</td>
        <td style="font-size:12px; font-weight:normal;">At the beginning of the NGT training program for each EMPLOYEE but no later than 15 days after the completion of the NGT training program for each EMPLOYEE, CONSULTANT shall disclose to NGT the employment, sales or other representation agreement between CONSULTANT and EMPLOYEE; </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(g)</td>
        <td style="font-size:12px; font-weight:normal;">CONSULTANT shall not employ and pay or otherwise reimburse any EMPLOYEE to sell the Products and Services of NGT until all the requirements of Section 4(A)(v) are fully completed;
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(h)</td>
        <td style="font-size:12px; font-weight:normal;">CONSULTANT shall ensure that any EMPLOYEE assigned to sell or solicit NGT’s products and services has never been excluded from participation in any federal or state health care program, including without limitation Medicare and Medicaid, and that no action of any type to effect such exclusion is currently pending against the EMPLOYEE. Should a EMPLOYEE become subject to a federal or state investigation relating to healthcare laws, CONSULTANT shall inform NGT of this information in accordance with Sections 14 and 16 of this Agreement.
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(i)</td>
        <td style="font-size:12px; font-weight:normal;">CONSULTANT shall not permit any EMPLOYEE or EMPLOYEE s to form a group that employs subcontractors for the purpose of wholly or partially selling NGT’s Products and Services, unless this subcontracting is previously agreed to, in writing by NGT, subject to NGT’s and NGT’s contracted Affiliated companies Subcontractor Agreement. If CONSULTANT learns that any EMPLOYEE are employing subcontractors as prohibited by this section, CONSULTANT shall immediately inform NGT of the situation and provide the names of all involved EMPLOYEE and subcontractors and all clients with whom they do business. A Consultant’s violation of this subsection shall trigger NGT’s right to demand immediate termination of that Consultant, pursuant to Section 7 herein; provided, however, the foregoing shall not be interpreted to limit CONSULTANT’s ability to make introductions or solicit other sales CONSULTANTs for contracting directly with NGT; and
        </td>
    </tr>
    <br>

    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(j)</td>
        <td style="font-size:12px; font-weight:normal;">In the event this Agreement is terminated pursuant to Section 7(a) NGT may  communicate and contract directly with Clients. CONSULTANT does consent to these communications or contacts, and does not wave or release the EMPLOYEE from any contrary contractual or common law restrictions.
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">(k)</td>
        <td style="font-size:12px; font-weight:normal;">In the event this Agreement is terminated pursuant to Section 7(b) NGT may communicate and contract directly with Consultants. CONSULTANT consents to these communications and contracts, and waives and releases the Consultants from any contrary contractual or common law restrictions. Upon it being proven by NGT that Section 7(b) has been violated.
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:40px;">(vii)</td>
        <td style="font-size:12px; font-weight:normal; width: auto;">CONSULTANT is responsible for paying and distributing payments to EMPLOYEE’s, and for sole management and supervision of the EMPLOYEEs.</td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:40px;">(viii)</td>
        <td style="font-size:12px; font-weight:normal; width: auto;"> CONSULTANT and any Consultants are not employees of NGT for any purpose whatsoever, but are independent contractors with limited authority. CONSULTANT shall have sole control of the manner and means of performing its agreed responsibilities under this Agreement. CONSULTANT agrees that NGT shall not control nor direct the details, manner, nor means by which CONSULTANT carries out the sales or services assigned hereunder. CONSULTANT has no obligation to work any particular hours or days or any particular number of hours or days. NGT shall not have the right to require CONSULTANT to do anything that would jeopardize the relationship of independent contractor between NGT and CONSULTANT. Nothing in this Agreement shall be construed to constitute CONSULTANT as a partner, employee or general agent of NGT, nor shall either have any authority to bind the other in any respect.</td>
    </tr>
    <br>

    <!--4B START-->
     

<tr>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:30px;">B.</td>
    <td style="width:100%;">  NGT agrees to the following responsibilities:</td>
</tr>
<br>
<tr>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:40px;">(a)</td>
    <td style="font-size:12px; font-weight:normal;">NGT shall furnish CONSULTANT, at no expense to CONSULTANT, product literature for the proper promotion and solicitation of orders for its Products and Services.  CONSULTANT shall only use approved product literature produced by NGT or NGT’s contracted Affiliated Companies.</td>
</tr>
<br>
<tr>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:40px;">(b)</td>
    <td style="font-size:12px; font-weight:normal;">	NGT shall provide specialized training to CONSULTANT and its EMPLOYEE about NGT and its Products and Services, by having all EMPLOYEE selling NGT Products and Services in any capacity attend training provided by NGT, which shall involve, among other forms of training, introduction to NGT’s proprietary forms, literature, reports and other documentation, introduction and education in NGT service lines, including toxicology, with scientific education directed by NGT employees, and training on collection and shipping processes.</td>
</tr>
<br>

<tr>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:20px;"><strong> </strong> </td>
    <td style="width:40px;">(c)</td>
    <td style="font-size:12px; font-weight:normal;"> NGT shall make commission payments to CONSULTANT for sales credited to CONSULTANT and its EMPLOYEE as specified in this Agreement. All payments will be made directly to CONSULTANT, who has the responsibility of distributing to its EMPLOYEEs, in accordance with applicable law. </td>
</tr>
<br>

    <tr>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:40px;">(d)</td>
        <td style="font-size:12px; font-weight:normal;"> At all times during the Term of this Agreement and for a period of one (1) year after termination of the Agreement, for any reason, NGT will not directly (on its own) or indirectly (acting through others):  </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:40px;">(e)</td>
        <td style="font-size:12px; font-weight:normal;"> Contact, hire, solicit, influence, or assist in contacting, hiring, soliciting, or influencing any employee, of CONSULTANT, who worked for or was providing services to CONSULTANT, directly as an employee at any time during the last twelve (12) months of CONSULTANT’s association with NGT or any affiliate, or to cease or limit their work for or association with CONSULTANT. </td>
    </tr>
    <br>

    <tr>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:30px;"><strong>5.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong>RESTRICTIVE COVENANTS.</strong>  CONSULTANT hereby agrees to the covenants set forth in Schedule B attached hereto, which Schedule B is incorporated herein and made a part of this Agreement by this reference.
        </td>
    </tr>
    <br>

    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>6.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong>INSURANCE/ INDEMNIFICATION.</strong> </td>
    </tr>
    
    <tr>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:20px;"><strong> </strong> </td>
        <td style="width:30px;">A.</td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> At its own cost, CONSULTANT shall maintain and provide to NGT certificates of insurance or other documentary evidence for the following policies of insurance covering CONSULTANT and Consultants assigned to represent NGT during the term of this Agreement. All insurance required hereunder shall be affected by valid and enforceable policies issued by insurers of financial responsibility and authorized to do business in all necessary states. CONSULTANT shall notify NGT in writing at least 30 days prior to expiration or termination of or any change in the coverage provided: </td>     
    </tr>
    <br>
    <tr>
        <td style="width:20px;">  </td>
        <td style="width:20px;"></td>
        <td style="width:20px;"> </td>
        <td style="width:20px;"> </td>
        <td style="width:30px;">(i)</td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> Business Automobile Liability Insurance covering all owned, hired, and non-owned vehicles and equipment used by CONSULTANT or it’s Employee with a minimum combined single limit of liability of $1,000,000 for injury and/or death and/or property damage. </td>     
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> Before commencing any work under this Agreement, CONSULTANT shall provide NGT with proof of this insurance within fourteen (14) business days of the signing date of this Agreement. </td>
    </tr>
    <br>

    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">B.</td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> CONSULTANT shall indemnify and hold NGT harmless from any loss or liability arising from performing services under this Agreement, including any claim for injuries and damages caused by CONSULTANT while traveling in CONSULTANT’S or it’s EMPLOYEE’S automobiles, or performing services under this Agreement. </td>     
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">C.</td>
        <td style="width:auto; font-weight:normal; font-size:12px;">  CONSULTANTS shall before commencing any work under this Agreement, CONSULTANT shall provide NGT with proof of this insurance within fourteen (14) business days of the signing date of this Agreement.
        </td>     
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">D.</td>
        <td style="width:auto; font-weight:normal; font-size:12px;">CONSULTANTS shall indemnify and hold NGT and NGT’s contracted Affiliated companies harmless from any loss or liability arising from performing services under this Agreement, including any claim for injuries and damages caused by NGT representative or its contracted Affiliated Companies employee while traveling in CONSULTANT’S automobiles, or performing services under this Agreement.
        </td>     
    </tr>
    <br>

    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>7.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong>TERM OF AGREEMENT AND TERMINATION.</strong>   This Agreement will become effective when it is signed by both parties and remain in effect for one (1) year with annual automatic renewal unless terminated by either party prior to the renewal date. Either party may terminate this Agreement at any time by giving Thirty (30) days’ advance written notice to the other party last know address of the intent to terminate.  NGT may terminate this Agreement with immediate effect in the event that NGT provides documents that CONSULTANT to have engaged or to be engaged in any conduct which is in violation of this Agreement or any law or regulation, ("For Cause Termination") or in the event CONSULTANT fails to contact NGT for three months or more ( "Termination for Absenteeism" ). 
        </td>
    </tr>
    <br>

    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>8.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong>ENTIRE AGREEMENT; MODIFICATION. </strong>  This is the entire Agreement between CONSULTANT and NGT and supersedes any previous agreements between CONSULTANT and NGT. Any modification of this Agreement must be in writing and by mutual consent of the Parties; however, further consideration for any such modification shall not be deemed necessary. The Schedules attached hereto may be modified by NGT and upon mutual agreement with CONSULTANT, with the exception of Schedule A (A), which may be modified only upon the mutual consent of the Parties. Both Parties agree that NGT has the right to immediate modifications of any part of this Agreement, to respond to changes in any Federal or applicable state law, affecting clinical laboratories, their administration or reimbursement for the services they provide, including but not limited to the Medicare and Medicaid laws. 
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>9.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong> REMEDIES. </strong>  CONSULTANT and NGT agrees that the remedy at law for any breach by either party of any provision of Sections 4 and/or 6 (including Schedule B) will be by independent Mediation/Arbitration  (pursuant to Section 11 and 12 below). The covenants in this Agreement are independent, and the existence of any claim or cause of action of CONSULTANT against NGT, whether predicated on this Agreement or otherwise, shall not constitute a defense to the enforcement of these covenants by NGT.
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>10.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong> WAIVER TO RIGHT OF TRIAL BY JURY. </strong> WAIVER TO RIGHT OF TRIAL BY JURY.  All parties waive the right to trial by jury in any action arising out of or related to this Agreement. 
        </td>
    </tr>
    <br>

    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>11.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong>Choice of MEDITATION/ARBITRATOR.</strong>  Both parties choose independent mediation or arbitrator. Each party shall be responsible for their own attorneys’ fees and legal cost at all levels.
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>12.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong> APPLICABLE LAWS / VENUE. </strong>   This Agreement will be governed by the laws of the State of Texas and exclusive jurisdiction for any dispute shall lie solely in the state courts of Hood County, Texas, or the federal courts in the district in which Hood County sits, to whose jurisdiction CONSULTANT and NGT irrevocably submits itself and waives any objections to venue. 
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>13.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong>WAIVER.</strong>  The failure of either party to enforce, at any time or for any period of time, any provisions of this Agreement shall not be construed as a waiver of such provisions or the right of such party thereafter to enforce such provisions.
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>14.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong>WAIVER.</strong>  The failure of either party to enforce, at any time or for any period of time, any provisions of this Agreement shall not be construed as a waiver of such provisions or the right of such party thereafter to enforce such provisions.
        </td>
    </tr>
    <br>

    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>15.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong>HEALTH CARE PROGRAM PARTICIPATION.</strong>   CONSULTANT represents and warrants that CONSULTANT has never been excluded from participation in any federal or state health care program, including without limitation Medicare and Medicaid, and that no action of any type to effect such exclusion is currently pending against CONSULTANT or it’s EMPLOYEE. CONSULTANT shall immediately notify NGT of any investigation or any circumstances which may result in CONSULTANT or any of its Employees being excluded from participating in any federal or state health care program. If CONSULTANT or one of its Employees is excluded from participating in any federal or state health care program, NGT shall have the option of immediately terminating this Agreement.
        </td>
    </tr>
    <br>

    
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>16.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong> SEVERABILITY. </strong>   If any term, clause or provision hereof is held invalid or unenforceable by a court of competent jurisdiction, such invalidity shall not affect the validity or operation of any other term, clause or provision and such invalid term, clause or provision shall be deemed to be severed from the Agreement.
        </td>
    </tr>
    <br>
    <tr>
    <td style="width:20px;"></td>
    <td style="width:20px;"></td>
    <td style="width:30px;"><strong>17.</strong></td>
    <td style="width:auto; font-weight:normal; font-size:12px;"> <strong> NOTICES.</strong>  All notices, consents, requests, claims, demands, instructions or other communications given or made hereunder by NGT or CONSULTANT shall be in writing and personally delivered or transmitted by registered or certified mail, postage prepaid, return receipt requested, or by express mail to the parties at the following addresses:
    </td>
</tr>
<br>
</table>
<br>
<br>
    <table>
        <tr>
         <td style="width:100px; font-size:14px;"> If to NGT:</td>
         <td style="width:200px; font-size:14px;" >Nex Gen Testing</td>
         <td style="width:150px; font-size:14px;">If to CONSULTANT:</td>
         <td style="width:220px; font-size:14px;"><p  style="width:300px;"><u>_________________________</u> </p></td>
        </tr>
        <tr>
        <td style="width:100px;"> </td>
        <td style="width:200px; font-size:14px;" >5006 Largo </td>
        <td style="width:150px;"> </td>
        <td style="width:220px; font-size:14px;"><p  style="width:300px;"><u> _________________________</u> </p></td>
       </tr>
       <tr>
       <td style="width:100px;">  </td>
       <td style="width:200px; font-size:14px;" >Granbury, Texas  76049</td>
       <td style="width:150px;"> </td>
       <td style="width:220px; font-size:14px;"><p  style="width:300px;"> <u> _________________________</u> </p></td>
      </tr>
      <tr>
      <td style="width:100px;"> </td>
      <td style="width:200px; font-size:14px;" >Attn: Legal</td>
      <td style="width:150px; font-size:14px;"> </td>
      <td style="width:220px; font-size:14px;"><p  style="width:300px;">Attn: <u> _________________________</u> </p></td>
     </tr>
        <br>
     <tr>
          <td style="width:auto; font-size:13px;">or to such other person or address as a party may from time to time designate by notice to the other. All such notices, consents, requests, claims, demands, instructions and other communications shall be deemed to have been received on the date of personal delivery, telex or facsimile or on the day of receipt if mailed.</td>
    </tr>
    <br>
    <tr>
        <td style="width:auto; font-size:13px;"><b>IN WITNESS WHEREOF</b>, the parties hereto have executed or caused a duly authorized CONSULTANT to execute this Agreement on the dates specified below.</td>
    </tr>
    <br>
    <br>
    <br>

    <tr>
        <td style="width:50%;"> Thomas Willis d/b/a NexGenTesting</td>
        <td style="width:50%;" ><p  style="width:300px; margin-bottom:0;"> Name: <u> _________________________</u> </p></td>
    </tr>
    <br>

    <tr>
        <td style="width:50%;">  By: <u> _________________________</u> </td>
        <td style="width:50%;" >By: <u> '.$result->firstname.' '.$result->lastname.'</u> </td>
    </tr>
    <br>

    <tr>
        <td style="width:50%;">  By: <u>  _________________________</u> </td>
        <td style="width:50%;" > By: <u> '.$result->firstname.' '.$result->lastname.'</u> </td>
    </tr>
    <br>
   
    </table>

<br>
<br>
<br>
<!--SCHEDULE A start-->

        <p style="text-align:center; margin-bottom:0px;">SCHEDULE A</p>
        <h4 style="text-align:center; margin-bottom:0px;">COMPENSATION</h4>

        <table>
            <tr>
                <td style="width:20px;"></td>
                <td style="width:20px;"></td>
                <td style="width:30px;"><strong>A.</strong></td>
                <td style="width:auto; font-weight:normal; font-size:12px;"> <strong>COMMISSION REQUIREMENTS.</strong> CONSULTANT shall be entitled to a “Commission Payment” based on the size and effectiveness of the CONSULTANT’s business, pursuant to the following determiners and definitions: </td>
            </tr>
            <br>
            <tr>
            <td style="width:40px;"></td>
            <td style="width:20px;"></td>
            <td style="width:20px;"></td>
            <td style="width:30px;"><strong>1.</strong></td>
            <td style="width:auto; font-weight:normal; font-size:12px;"><strong>This section pertains to NGT’s contracted Affiliated Company HealthTraxRx “ Infectious Diesease LAB”</strong></td>
        </tr>
        <br>

        <tr>
            <td style="width:30px;"></td>
            <td style="width:20px;"></td>
            <td style="width:30px;"><strong>a.</strong></td>
            <td style="width:auto; font-weight:normal; font-size:12px;"><strong>For each ID Testing Specimen</strong>(orders for respiratory pathology panel testing, UTI, GI, wound and Nail & Paronychia (“ID Testing”) received from Hospitals, Laboratories, Distributors and Physician Practices) submitted to NGT for testing arising from the sales and marketing efforts of CONSULTANT, NGT shall pay a Commission payment of 15% per Specimen for sales and marketing services performed by CONSULTANT.  Specimen for this section (i) only shall be defined as a sample submitted to NGT for ID Testing, which is (1) accompanied with all reasonably necessary information required for NGT to appropriately perform and billed for the services rendered, (2) is reimbursed by a third-party payor (Insurance, Medicare, Medicaid).  </td>
        </tr>
        <br>


        <tr>
            <td style="width:30px;"></td>
            <td style="width:20px;"></td>
            <td style="width:30px;"><strong>b.</strong></td>
            <td style="width:auto; font-weight:normal; font-size:12px;">A commission rate of 12% shall be paid for LC/MS/MS Testing of Specimens, including qualitative presumptive screen and definitive confirmation, arising from Customers through a direct client bill arrangement for Products and Services for Specimens billed at a rate of equal to or greater than $125.00 per Specimen; or   </td>
        </tr>
        <br>

        
        <tr>
            <td style="width:30px;"></td>
            <td style="width:20px;"></td>
            <td style="width:30px;"><strong>c.</strong></td>
            <td style="width:auto; font-weight:normal; font-size:12px;">A commission rate of 5% shall be paid for LC/MS/MS Testing of specimens, including qualitative presumptive screen and definitive confirmation, arising from Customers through a direct client bill arrangement for Products and Services for Specimens billed at a rate of less than $125.</td>
        </tr>
        <br>

        <tr>
        <td style="width:40px;"></td>
            <td style="width:20px;"></td>
            <td style="width:20px;"></td>
            <td style="width:30px;"><strong>2.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"><strong> DEFINITIONS AND EXCEPTIONS. </strong>  </td>
    </tr>
    <br>

    <tr>
        <td style="width:30px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">a.</td>
        <td style="width:auto; font-weight:normal; font-size:12px;">Subject to exception as agreed to between the parties in writing, a Specimen shall not include any patient specimen sent by an account using NGT contracted Lab for testing in the six (6) months prior to CONSULTANT’s involvement.
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:30px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">b.</td>
        <td style="width:auto; font-weight:normal; font-size:12px;">In the event NGT or contracted LAB engages legal counsel to collect any amounts owed by a Customer through a client bill arrangement for Products and Services, the cost of such counsel shall be deducted prorate from the applicable commissions due in connection with such client bill arrangement.
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:30px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">c.</td>
        <td style="width:auto; font-weight:normal; font-size:12px;">CONSULTANT shall only be entitled to Commission Payments when the client has: i) when required by NGT’s or the contracted LAB policies, a signed the Lab’s Provider Acknowledgment Form (“PAF”) and all other paper work necessary to “on board” an account; and ii) submitted samples to Contracted LAB.
        </td>
    </tr>
    <br>
    <tr>
        <td style="width:30px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;">d.</td>
        <td style="width:auto; font-weight:normal; font-size:12px;">No Commission Payment of any kind shall be paid in the event CONSULTANT has engaged in any conduct which is in violation of this Agreement, including, but not limited to, the Code of Conduct, or any law or regulation.
        </td>
    </tr>
    <br>

    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>B.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> <strong>Commission Requirements For future contracted affiliated companies.</strong> </td>
    </tr>
    <br>
    <tr>
        <td style="width:20px;"></td>
        <td style="width:20px;"></td>
        <td style="width:30px;"><strong>C.</strong></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"><strong>Commission Requirements For future contracted affiliated companies.</strong> Commission payments shall be made in the month after the qualifying Specimen is received.  In the event of any material change in the method of reimbursement by Medicare for clinical laboratory services rendered which affects the financial terms of this Agreement in any adverse material way, to the detriment of either party during the term of this Agreement, CONSULTANT and NGT, upon written notice to the other party ("Material Change Notice"), agree to enter into negotiations for a period of sixty (60) days following receipt of such Material Change Notice ("Negotiation Period") to amend this Agreement. During the Negotiation Period, CONSULTANT and NGT will mutually assess the financial impact of the change in reimbursement and will negotiate in good faith a mutually agreeable amendment or modification to this Agreement. If an amendment or modification to this Agreement cannot be agreed upon within the Negotiation Period, then upon notice from either party to the other, this Agreement shall terminate sixty (60) days from the date such notice is received.
        </td>
    </tr>
    <br>
           

</table>

    <!--table for Restrictive Covenants-->

<table>
    <p style="text-align:center;">Restrictive Covenants</p>

    <tr>
        <td style="width:auto; font-weight:normal; font-size:12px; margin-bottom: 15px;"> In consideration of the promises and the terms and conditions set forth in this Agreement, the parties agree as follows:</td>
    </tr>
    
    <tr>
        <td></td>
    </tr>
 
    <tr>
        <td style="width:30px;"><b>1.</b></td>
        <td style="width:auto; font-weight:normal; font-size:12px;">CONFIDENTIAL INFORMATION. </td>
    </tr>
    <br>
    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; (a)&nbsp;&nbsp;&nbsp; &nbsp;   For purposes of this paragraph, the term “Company” shall include subsidiaries and affiliates of NGT and it’s contracted Companies or Lab’s..  CONSULTANT expressly acknowledges that these Company’s trade secrets and confidential and proprietary information, including but not limited to business, marketing or sales plans or strategies; operating procedures; design formulas; business methods; intellectual property, including patents and copyrights; know-how and processes; computer programs, software, and source codes; inventories; discoveries and improvements of any kind; Customer lists, sales histories, business volumes or usage, and other information compiled about Customers, prospects, vendors, suppliers, and referral sources; product development plans and processes; financial information, sales projections, and pricing information; and other confidential information pertaining to the operations, methods, procedures and business affairs of Company, as the same may exist from time to time (collectively, the “Confidential Information”) as well as any other material marked “confidential” or proprietary to Company, are valuable, special, and unique assets of the Companies, and CONSULTANT agrees that such information shall remain strictly confidential and that he/she shall not disclose, divulge or communicate in any manner, either directly or indirectly (except pursuant to the order of a court or governmental agency, in which case CONSULTANT shall notify NGT of the request for information with sufficient advance notice for NGT and the Company to seek protection from disclosure of same), any such Confidential Information to any person, firm, corporation, association or other entity, for any reason or purpose except as authorized by Company in its business interests. The information received from Customers and suppliers of Company, including patient information, shall be referred to as “Third Party Information” and shall be deemed Confidential Information under this Agreement.
    </td>
    </tr>
    <tr><td></td></tr>

    <tr>
        <td style="width:30px;"> </td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; (b)&nbsp;&nbsp;&nbsp; &nbsp;CONSULTANT acknowledges his/her legal and ethical obligation to protect and preserve the confidentiality of any Confidential Information or Third Party Information that constitutes “Protected Health Information” under the Health Insurance Portability and Accountability Act of 1996, Public Law 104-191, Title XIII of the American Recovery and Reinvestment Act of 2009, Public Law 111-005, and regulations promulgated thereunder by the U. S. Department of Health & Human Services, as amended (“HIPAA”).

    </td>
    </tr>
    <tr><td></td></tr>

    
    <tr>
        <td style="width:30px;"> </td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; (c)&nbsp;&nbsp;&nbsp; &nbsp; This Section 1 of Schedule B shall survive the termination or expiration for a period of 1 year from Termination or expiration of CONSULTANT’s contract with NGT, whether pursuant to this Agreement or otherwise.  NGT and CONSULTANT agree that the invalidity or unenforceability of any part of this Section 1 of Schedule B shall not affect the validity or enforceability of any other Section or provision of this Agreement.  Upon any termination of this Agreement, CONSULTANT shall surrender and turn over to NGT any and all forms of Confidential Information that may be in CONSULTANT’s possession, including all computer files, documents, records and notes, copies, summaries and compilations. Except those documents, computer files, records and notes, copies, summaries and compilations that are needed or required to pay Consultants the surviving and vested compensation. 
    </td>
    </tr>
    <tr><td></td></tr>
    <tr>
        <td style="width:auto; font-weight:normal; font-size:12px;"><b>(II)</b>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  <b>NON-SOLICITATION.</b> CONSULTANT acknowledges and agrees that, even in complete good faith, it would be impossible for CONSULTANT to provide services in a similar capacity for a competitor of NGT without a conflict of interest and without drawing upon and utilizing trade secrets or Confidential Information gained through the business relationship described in this Agreement with NGT. Accordingly, CONSULTANT agrees it is reasonable that: </td>
    </tr>
    <tr><td></td></tr>
        
    <tr>
        <td style="width:30px;"> </td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; <b>(a)</b>&nbsp;&nbsp;&nbsp; &nbsp; At all times during the Term of this Agreement with NGT and for a period of one (1) year after termination of the Agreement, for any reason, CONSULTANT will not directly (on its own) or indirectly (acting through others): 
        </td>
    </tr>
    <tr><td></td></tr>
    
    <tr>
        <td style="width:30px;"> </td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; (i)&nbsp;&nbsp;&nbsp; &nbsp; Contact, call upon, solicit, divert, take away or attempt to contact, call upon, solicit, divert, take away, provide services to, or otherwise engage in a business transaction with actual or prospective customers, clients, business or accounts of NGT or any contracted affiliate of NGT with whom CONSULTANT worked, serviced, contacted, called upon, met or communicated, or about whom CONSULTANT received trade secrets or Confidential Information, during the last twelve (12) months of CONSULTANT’s association with NGT under this Agreement in any way that would interfere with NGT’s business relationship with the actual or prospective client, unless such client or customer was a prior client or customer of CONSULTANT;

        </td>
    </tr>
    <tr><td></td></tr>
    <tr>
        <td style="width:30px;"> </td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; (ii)&nbsp;&nbsp;&nbsp; &nbsp; Contact, hire, solicit, influence, or assist in contacting, hiring, soliciting, or influencing any employee, of NGT or any contracted affiliate, who worked for or was providing services to NGT or any contracted affiliate, directly as an employee at any time during the last twelve (12) months of CONSULTANT’s association with NGT or any contracted affiliate, to cease or limit their work for or association with NGT or any contracted; and


        </td>
    </tr>
    <tr><td></td></tr>

    <tr>
        <td style="width:30px;"> </td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; <b>(b)</b>&nbsp;&nbsp;&nbsp; &nbsp; At all times during the Term of this Agreement and afterwards, NGT retains all rights to the names “NGT,” “Nex Gen Testing,” or any other trade names, trademarks, or service marks theretofore used by NGT, or its affiliate companys for their business, products or services (collectively the “Marks”), or any trade names, trademarks or service marks confusingly similar to the Marks.  
        </td>
    </tr>
    <tr><td></td></tr>
    <tr>
        <td style="width:30px;"> </td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; <b>(c)</b>&nbsp;&nbsp;&nbsp; &nbsp; During the Term of this Agreement the CONSULTANT may conduct business under, or use in any legal manner,  to sell NGT Products and Services in furtherance of this Agreement and any subsequent Agreements between NGT and CONSULTANT.  
        </td>
    </tr>
    <tr><td></td></tr>
    <tr>
        <td style="width:30px;"> </td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; <b>(d)</b>&nbsp;&nbsp;&nbsp; &nbsp; Upon Termination of the Agreement the CONSULTANT may not conduct business under, or use in any manner, NGT,” “Nex Gen Testing,” or any other trade names, trademarks, or service marks theretofore used by NGT, or its contracted affiliates for their business, products or services (collectively the “Marks”), or any trade names, trademarks or service marks confusingly similar to the Marks.  
        </td>
    </tr>
    <tr><td></td></tr>

    <tr>
        <td style="width:30px;"> </td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; <b>(e)</b>&nbsp;&nbsp;&nbsp; &nbsp;  At all times during the Term of this Agreement and for two years following the date of the termination of the Agreement, CONSULTANT shall not make critical, negative, disparaging or damaging remarks about NGT or its contracted affiliates or their officers, directors, CONSULTANTS, including but not limited to comments about any of their products, services, businesses, business condition, or business practices, in any way or to anyone who could make these statements public, based on information learned through CONSULTANT’s association with NGT or its contracted affiliates.
 
        </td>
    </tr>
    <tr><td></td></tr>
    
    <tr>
        <td style="width:30px;"></td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; <b>(f)</b>&nbsp;&nbsp;&nbsp; &nbsp;  In the event that any of the provisions of this Schedule B shall be held to be invalid or unenforceable, the remaining provisions thereof shall nevertheless continue to be valid and enforceable as though the invalid or unenforceable parts had not been included therein.
 
        </td>
    </tr>
    <tr><td></td></tr>
    <tr>
        <td style="width:30px;"></td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; <b>(g)</b>&nbsp;&nbsp;&nbsp; &nbsp;   NGT and CONSULTANT agree that the invalidity or unenforceability of any part of this Schedule B shall not affect the validity or enforceability of any other Section or provision of this Agreement.

        </td>
    </tr>
    <tr><td></td></tr>

    <tr>
        <td style="width:30px;"></td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; <b>(h)</b>&nbsp;&nbsp;&nbsp; &nbsp;CONSULTANT represents and covenants with NGT and it contracted affiliates that CONSULTANT is not bound by any agreement with any third party which would restrict or prohibit CONSULTANT from entering into this Agreement with NGT.
        </td>
    </tr>
    <tr><td></td></tr>
</table>

    <!--EXHIBIT A START-->
    <span style="text-align:center; margin-bottom:0px; font-size:12px; display:block;"> EXHIBIT A <br><br><b>SALES AND MARKETING CODE OF CONDUCT OF<br>
    NEX GEN TESTING, INC.</span>
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
                <td style="font-size:12px; font-weight:normal;width:50%;"> <u>_________________</u>
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


    <!--Exhibit B-->
    
    <table>
        <tr>
            <td style="text-align:center;"> Exhibit B <br>CONFIDENTIALITY AND NON-SOLICITATION AGREEMENT
            </td>
        </tr>
        <br>
        
        <tr>
            <td style="text-align:center;"> I, <u>'.$result->firstname.' '.$result->lastname.'</u>  (print name)(“Consultant) acknowledge that, as an independent consultant for Nex Gen Testing( “NGT”), and in consideration for my right to commission payments by Nex Gen Testing (“NGT”).
            I agree to the following restrictive covenants, which shall be for the benefit of Nex Gen Testing :           
            </td>
        </tr>
        <br>

        <tr>
            <td style="width:30px;"><b>1.</b></td>
            <td style="width:auto; font-weight:normal; font-size:12px;">CONFIDENTIAL INFORMATION. </td>
        </tr>
        <br>
    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; (b)&nbsp;&nbsp;&nbsp; &nbsp; Consultant acknowledges his/her legal and ethical obligation to protect and preserve the confidentiality of any Confidential Information or Third Party Information that constitutes “Protected Health Information” under the Health Insurance Portability and Accountability Act of 1996, Public Law 104-191, Title XIII of the American Recovery and Reinvestment Act of 2009, Public Law 111-005, and regulations promulgated thereunder by the U. S. Department of Health & Human Services, as amended (“HIPAA”) and act in accordance with Title XIII of the American Recovery and Reinvestment Act of 2009 (“ARRA”), called the Health Information Technology for Economic and Clinical Health (“HITECH”) Act.
    </td>
    </tr>
    <br>
    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:auto; font-weight:normal; font-size:12px;">&nbsp;&nbsp; &nbsp; &nbsp; (c)&nbsp;&nbsp;&nbsp; &nbsp;This Section shall survive the termination or expiration of Consultant’s affiliation with Company, whether pursuant to this Agreement or otherwise.  Company and Consultant agree that the invalidity or unenforceability of any part of this Section shall not affect the validity or enforceability of any other Section or provision of this Agreement.  Upon any termination of this Agreement, Consultant shall surrender and turn over to Company any and all forms of Confidential Information that may be in Consultant’s possession, including all computer files, documents, records and notes, copies, summaries and compilations. 
    </td>
    </tr>
    <br>

    <tr>
        <td style="width:30px;"><b>2.</b></td>
        <td style="width:auto; font-weight:normal; font-size:12px;">SOLICITATION. </td>
    </tr>
    <br>
    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> Consultant acknowledges that the services he/she is to render give Consultant unique access to Customers, suppliers, referral sources, and Confidential Information with a unique value to NGT.  Therefore, based on the consideration provided by Nex Gen Testing “NGT”, including compensation and training, as a material inducement to enter into this Agreement, Consultant covenants and agrees as follows: 
            </td>
    </tr>
    <br>

    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:30px;">(i)</td>
        <td style="width:auto; font-weight:normal; font-size:12px;">At all times during Consultant’s affiliation with Nex Gen Testing “NGT”,, while engaged in sales for the Nex Gen Testing or NGT, Consultant shall act as a Consultant of Nex Gen Testing “NGT”,. </td>
    </tr>
    <br>

    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:30px;">(ii)</td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> Consultant may use title of “Independent Consultant” Representing Nex Gen Testing on Company approved and/or provided marketing material. Consultant may also use title on company approved Business Cards. </td>
    </tr>
    <br>

    <tr>
        <td style="width:30px;"><b>3.</b></td>
        <td style="width:auto; font-weight:normal; font-size:12px;">Consultant Restrictions </td>
    </tr>
    <br>
     
    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:30px;">(i)</td>
        <td style="width:auto; font-weight:normal; font-size:12px;">At all times during Consultant’s affiliation with Company and for twelve (12) months after Consultant ceases to be affiliated with Company for any reason, Consultant shall not directly (on Consultant’s own) or indirectly (acting through others): </td>
    </tr>
    <br>

    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:30px;">(ii)</td>
        <td style="width:auto; font-weight:normal; font-size:12px;">Solicit, refer, induce, advise, request, divert, take away, influence or attempt to solicit, refer, induce, advise, request, divert, take away, or provide services to, or otherwise engage in a business transaction with Customers, prospective Customers, or Customer referral sources of Company or any subsidiary or affiliate of Company with whom Consultant worked or about whom Consultant received trade secrets, Confidential Information or Third Party Information, during the last twelve (12) months of affiliation with Company; or </td>
    </tr>
    <br>
    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:30px;">(iii)</td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> Solicit the employment of, divert, retain or hire, or attempt to solicit the employment of, divert, retain or hire, any salesperson, independent contractor, agent, employee, advisor, or consultant of Company, who worked for or was providing services to Company, directly as an salesperson or indirectly as an independent contractor, agent, employee, advisor, or consultant, at any time during the last twelve (12) months of Consultant’s affiliation with NGT or its contracted Affiliated Companies. Not foregoing any additional rights or claims NGT may have, Consultant doing this will forfeit vesting and surviving right of any and all commissions.
        </td>
    </tr>
    <br>

    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:30px;">(iv)</td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> Conduct a business under, or use in any manner, the names “NGT,” “Nex Gen Testing” or any other trade names, trademarks, or service marks heretofore used by<b> Nex Gen Testing “NGT”,</b> or its subsidiaries or affiliates for their business, products or services (collectively the <span style="font-style:italic;">“Marks”</span>), or any trade names, trademarks or service marks confusingly similar to the Marks, except as provided by this Agreement and in furtherance of the business concerns of <b>Nex Gen Testing “NGT”;</b> or

        </td>
    </tr>
    <br>

    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:30px;">(v)</td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> Make disparaging, derogatory or damaging remarks about <b>Nex Gen Testing “NGT”,</b>, its subsidiaries and affiliates, or their respective owners, shareholders, members, directors, managers, officers, joint venturers, trustees, salespersons, independent contractors, agents, employees, advisors, or consultants, including but not limited to comments about the Business or any of their products, services, businesses, business condition, or employment practices, in any way or to anyone who could make these statements public, based on information Consultant learned as a consultant of Nex Gen Testing “NGT”,. Not foregoing any additional rights or claims NGT may have, Consultant doing this will forfeit vesting and surviving right of any and all commissions.


        </td>
    </tr>
    <br>
    <tr>
        <td style="width:30px;"><b> </b></td>
        <td style="width:30px;">(vi)</td>
        <td style="width:auto; font-weight:normal; font-size:12px;"> Consultant has carefully read and considered the provisions of this Agreement, and having done so, agrees that the restrictions set forth in this Agreement, including, but not limited to, the time period of restriction and geographical areas of restriction, are fair and reasonable and are reasonably required for the protection of the interest of Nex Gen Testing “NGT”, and will not prevent Consultant from obtaining gainful occupation.


        </td>
    </tr>
    <br>

    <tr>
        <td style="width:auto; font-weight:normal; font-size:12px;"> &nbsp; &nbsp; &nbsp; (b) &nbsp;&nbsp;&nbsp; In the event that, notwithstanding the foregoing, any of the provisions of Agreement shall be held invalid or unenforceable by a court of competent jurisdiction, the remaining provisions thereof shall nevertheless continue to be valid and enforceable as though the invalid or unenforceable parts had not been included therein.  In the event that any provision of this Agreement relating to the time period and/or the geographical areas of restriction is deemed by a court of competent jurisdiction to exceed the maximum restrictiveness such court deems reasonable and enforceable, the time period and/or geographical areas of restriction and/or related aspects deemed reasonable and enforceable by the court shall become and thereafter be the maximum restriction in such regard, and the restriction shall remain enforceable to the fullest extent deemed reasonable by such court.
        </td>
    </tr>
    <br>

    <tr>
        <td style="width:auto; font-weight:normal; font-size:12px;"> &nbsp; &nbsp; &nbsp; (b) &nbsp;&nbsp;&nbsp;<b> Nex Gen Testing “NGT”,</b> and Consultant agree that the invalidity or unenforceability of any part of this Agreement shall not affect the validity or enforceability of any other Section or provision of this Agreement.
        </td>
    </tr>
    <br>

    <tr>
        <td style="width:30px;"><b>4.</b></td>
        <td style="width:auto; font-weight:normal; font-size:12px;">REMEDIES.</td>
    </tr>
    <br>

    <tr>
        <td style="width:auto; font-weight:normal; font-size:12px;"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Consultant agrees that the remedy at law for any breach of any provision of this Agreement will be inadequate and that, in addition to any other remedies Nex Gen Testing “NGT”, may have, Nex Gen Testing “NGT”, shall be entitled to temporary and permanent injunctive relief to prevent Consultant’s violation hereof, without the necessity of proving actual damage or posting a bond.  Consultant shall irrevocably submit and consent to the jurisdiction of the Courts of Texas located in Hood County for resolution of the remedies in this Agreement.  Notwithstanding the duration of such covenants in this Agreement, in the event that Company shall be entitled to an injunction, Consultant agrees that Nex Gen Testing “NGT”,, in connection with such legal proceedings, additionally shall be entitled to obtain an order enforcing the prohibition contained herein against Consultant for a period equal to the period of time during which Consultant violated this Agreement or such other period of time as determined by the legal authority conducting said legal proceeding.  The covenants in this Agreement are independent, and the existence of any claim or cause of action of Consultant against Nex Gen Testing or “NGT”,, whether predicated on this Agreement or otherwise, shall not constitute a defense to the enforcement of these covenants by Nex Gen Testing “NGT”. The prevailing party in any action related to or arising out of this Agreement shall be entitled to recover its reasonable attorneys’ fees at all levels including on appeal. </td>
    </tr>
    <br>

    <tr>
        <td style="width:auto; font-weight:normal; font-size:12px;"> IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first set forth above. </td>
    </tr>
    <br>
    <tr>
        <td style="width:auto; font-weight:normal; font-size:12px;">  </td>
    </tr>
    <br>
    
    </table>
    <!--last Part-->
    <table>
    <tr>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Nex Gen Testing  </td>
        <td style="font-size:12px; font-weight:normal; width:50%;"><u>_________________</u> </td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width:50%;"> By: <u>_________________</u> </td>
        <td style="font-size:12px; font-weight:normal; width:50%;"> By: <u>_________________</u> </td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Print Name: <u>_________________</u> </td>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Print Name: <u>'.$result->firstname.' '.$result->lastname.'</u> </td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Title: <u>_________________</u> </td>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Title: <u>'.$result->firstname.' '.$result->lastname.'</u> </td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Date: <u>_________________</u> </td>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Date: <u>'.$result->created_at.'</u> </td>
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
$pdf->Output('nexgenpdf.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
