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
	

    <!--Exhibit B-->
    
    <table>
         <tr>
            <td></td>
         </tr>
        <tr>
            <td style="text-align:center;"> Exhibit B <br>CONFIDENTIALITY AND NON-SOLICITATION AGREEMENT
            </td>
        </tr>
        <br>
        
        <tr>
            <td style="text-align:center;"> I, <u>'.$result->firstname.' '.$result->lastname.'</u>  (“Consultant) acknowledge that, as an independent consultant for Nex Gen Testing( “NGT”), and in consideration for my right to commission payments by Nex Gen Testing (“NGT”).
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
        <td style="font-size:12px; font-weight:normal; width:50%;"><u>____________</u> </td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width:50%;"> By: <u>____________</u> </td>
        <td style="font-size:12px; font-weight:normal; width:50%;"> By: <u>____________</u> </td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Print Name: <u>____________</u> </td>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Print Name: <u>'.$result->firstname.' '.$result->lastname.'</u> </td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Title: <u>____________</u> </td>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Title: <u>'.$result->firstname.' '.$result->lastname.'</u> </td>
    </tr>
    <br>
    <tr>
        <td style="font-size:12px; font-weight:normal; width:50%;"> Date: <u>____________</u> </td>
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
$pdf->Output('nexgen-exhibit-a.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
