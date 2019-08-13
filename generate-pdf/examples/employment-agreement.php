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
require_once('tcpdf_include.php');

//require_once('tcpdf_include.php');
class MYPDF extends TCPDF {
    // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
        $this->SetY(290);
        $this->SetX(0);
        //Set font
        $this->SetFont('helvetica', 9);
        //Page number
       $this->Cell(0, 0, 'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
       //$this->Cell(0, 10, $this->getAliasNumPage(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        $this->SetY(285);
        $this->SetX(0);
        $this->Cell(0, 0, 'Beto Paredes LLC – Independent Associate Director Agreement.', 0, false, 'C', 0, '', 0, false, 'T', 'M');
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



$html = '
<table width="100%">
<tr><td>&nbsp;</td></tr>
<tr>
<td style="text-align: center; "><img src="betologo.png" alt="#" style=" display: block; width: 300px;"></td>
</tr>
<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="margin: 0; padding: 0 0 0 0; text-align: center;  font-size: 25px; text-transform: uppercase;   color: #010101;">BETO PAREDES LLC <br/>
<span  style="margin: 0; padding: 5px 0 0 0; text-align: center;  font-size: 18px; text-transform: capitalize;  color: #010101; font-weight: normal;">Associate Director Program (Beto Paredes Family Of Companies Rep)</span></h2>
</td></tr>
<tr><td>&nbsp;</td></tr>
<tr><td>
<p style="font-size: 14px; line-height: 20px; color: #333;">This agreement (hereinafter referred to as “Agreement”) dated on [date], by and between Beto Paredes LLC (hereinafter referred to as “Company” and/or Company and participating partner companies), an Idaho LLC, and 
<span style="background-color: #e9ee63;"><u>Test Company</u>,</span>

 (hereinafter referred to as “Associate”), an individual or business with their primary location at 
 
 <span style="background-color: #e9ee63;"><u>Test Company</u></span>
 
 . Both Company and Associate may collectively be referred to as (“Parties”).</p>
 
 

</td></tr>

<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">1. AGREEMENT</h2>

<span style="font-size: 14px; line-height: 20px; color: #333;">1.1. Accordingly, in consideration of the mutual covenants contained herein, the Parties agree as follows:</span>
</td></tr>


<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">2. RECITALS</h2>

<span style="font-size: 14px; line-height: 20px; color: #333;">2.1. Whereas, Company is engaged in the business of providing internally offered software, branding, web design, custom engineering, consulting and marketing related services. And in as much the company is contracted directly with additional companies that are engaged in their sales platform through the Beto Paredes Family of Companies rep portal.</span>
<br/><br/>
<span style="font-size: 14px; line-height: 20px; color: #333;">2.2. Whereas, Associate is an independent entity who seeks to receive a Commission (“Commission”) from Company on occasion in exchange for making a personal introduction between potential customers and Company (“Referral”).</span>
<br/><br/>
<span style="font-size: 14px; line-height: 20px; color: #333;">2.3. Whereas, all monies referred to are in USD (“$”).</span>

</td></tr>

<tr><td>&nbsp;</td></tr>

<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">3. INDEPENDENT ASSOCIATE RELATIONSHIP</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">3.1. The Parties acknowledge that Associate will perform their obligations hereunder as an independent contractor or Associate and shall not be an employee of Company. It is also expressly understood that Associate\'s employees and agents, if any, are not Company\'s employees or agents, and have no authority to bind Company by contract or otherwise.</span>
<br/><br/>
<span style="font-size: 14px; line-height: 20px; color: #333;">3.2. Associate agrees they are solely responsible for understanding their rights and obligations as an Associate in their geographic area.</span>
<br/><br/>
<span style="font-size: 14px; line-height: 20px; color: #333;">3.3. Company shall not be liable for taxes, worker\'s compensation, unemployment insurance, employers\' liability, employer\'s FICA, social security, withholding tax, or other taxes or withholding for or on behalf of Associate or any other person consulted or employed by the Associate in performing Services under this Agreement. All such costs shall be Associate\'s responsibility.</span>
</td></tr>


<tr><td>&nbsp;</td></tr>
<tr><td>

<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">4. REFERRALS AND COMMISSIONS</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">4.1. Referral contacts (“Referral Contact”, “Referral Contacts”) are only eligible for Commissions if the Associate introduces the Referral Contact to Company either in person or on the phone with all 3 parties present (Company, Associate, and Referral Contact). Or if entered as an official lead in the appropriate back office provided by Company.</span>
<br/><br/>
<span style="font-size: 14px; line-height: 20px; color: #333;">4.2. Commissions will be paid only after the Company has received payment for the sale which commission is to be paid for either directly or through partner companies in the sales programs. Company will not be held liable to pay Commissions on any funds that are uncollected or refunded.</span>
<br/><br/>
<span style="font-size: 14px; line-height: 20px; color: #333;">4.3. Commissions will be paid Monthly Net 7 for all payments collected directly and collected from partner companies in the sales platform. All received commissions within the full month period will be calculated, with a full report of each earnings, and mailed with a check within 7 days in the beginning of the following month. Earnings will also be reflected in the commission report in the rep portal.</span>
<br/><br/>
<span style="font-size: 14px; line-height: 20px; color: #333;">4.4. Commission amounts and percentages will be set specifically for each product or service based on the exact commission rates found in this agreement under section 5 “Commission Schedule”.</span>

</td></tr>


<tr><td>&nbsp;</td></tr>
<tr><td>

<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">SALES COMMISSIONS OFFERED PER CURRENT PRODUCT OPPORTUNITIES:</h2>

</td></tr>
<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">a)&nbsp;&nbsp;InfluxIQ Marketing Platform Sales:</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">$750 a close<br/>
5% of all Monthly Residual for Presence Management
</span>
</td>

</tr></table></td>

</tr>

<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">b)&nbsp;&nbsp;Auto Search AutoStrada Platform</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">$750 a close<br/>
5% of all Monthly Residual for Presence Management
</span>
</td>

</tr></table></td>

</tr>

<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">c)&nbsp;&nbsp;ApogeeInvent TitanMLM</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">$4,500 a close<br/>
5% of all Monthly Residual based on number of active users
</span>
</td>

</tr></table></td>

</tr>


<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">d)&nbsp;&nbsp;SalesVert Master System Sales</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">$4,500 a close<br/>
5% of all Monthly Residual based on number of active users
</span>
</td>

</tr></table></td>

</tr>


<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">e)&nbsp;&nbsp;Beto Paredes Joint Venture Contract Agreements</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">$50,000 a close (10% of initial engagement up to 500k)<br/>
5% of all negotiated percentage of equity and revenue generated
</span>
</td>

</tr></table></td>

</tr>



<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">f)&nbsp;&nbsp;Nex Medical NMS 100 Sales</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">$750 a close<br/>
$200 a month for all open accounts (90-day grace)
</span>
</td>

</tr></table></td>

</tr>

<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">g)&nbsp;&nbsp;Harvest a Seed Shelf Corporation Sales</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">10% of the total cost of the corporation
</span>
</td>

</tr></table></td>

</tr>


<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">h)&nbsp;&nbsp;GEOFenceDSP Platform</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">10% for a direct advertiser of DSP side revenue <br/>(to GEO direct or White label such as LocalCarOwer.com)<br/>
2.5% of all Agency DSP side revenue
</span>
</td>

</tr></table></td>

</tr>


<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">i)&nbsp;&nbsp;LocalCarOwner.com</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">(See GEOFEnceDSP for Platform commissions)<br/>
15% of all emailing services costs<br/>
15% of all data purchasing costs<br/>
15% of all net revenue in any traditional marketing
</span>
</td>

</tr></table></td>

</tr>

<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">j)&nbsp;&nbsp;Apogee Results</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">15% of all contract costs for the first 9 months of engagement
</span>
</td>

</tr></table></td>

</tr>

<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">k)&nbsp;&nbsp;Priority Commercial Payments</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">For all Standard Transactions for End Users, Aspire shall pay AGENT a Revenue Share of .10% (10 BPS) for each such transaction where client is paid no more than 1.5% (150 BPS). This amount would be reduced in the event that a client is to be paid more than 1.5% (150 BPS).
</span>
</td>

</tr></table></td>

</tr>

<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">l)&nbsp;&nbsp;Universal Tech Associates</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">10% of engagement period contracts (Avg. 5k to 10k)<br/>
5% of all negotiated percentage of equity and revenue generated
</span>
</td>

</tr></table></td>

</tr>

<tr><td>&nbsp;</td></tr>
<tr>
<td><table style="width: 100%;"><tr>

<td style="width: 5%;">&nbsp;</td>
<td style="width: 95%;">

<h2 style="color: #000;   font-size: 14px; font-weight: bold; margin: 0px; padding: 0px;">m)&nbsp;&nbsp;The DNA of Success</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">10% of all sales generated through the traffic partners you generate as affiliates.</span>
</td>

</tr></table></td>

</tr>



<tr><td>&nbsp;</td></tr>
<tr><td>

<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">SELLING RIGHTS</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">i. The associate shall clearly identify himself as a duly authorized sales agent in the course of his efforts to sell the products on behalf of the Beto Paredes Family of Companies and partner sales program companies and may not sell the products in his/her own name.</span>
<br/><br/>
<span style="font-size: 14px; line-height: 20px; color: #333;">ii. Commissions are paid on the initial proposal amount and amount invoiced for that proposal.</span>
<br/><br/>
<span style="font-size: 14px; line-height: 20px; color: #333;">iii. If the client cancels commissions are no longer paid.</span>
 
 <br/><br/>
<span style="font-size: 14px; line-height: 20px; color: #333;">iv. Associate shall hold the Confidential Information in strict confidence, and shall not copy, reproduce, sell, assign, license, market, transfer or otherwise disclose any Confidential Information to any other company that provides competing Services of their own or would share with such, without the prior written consent of Beto Paredes Family of Companies and participating partner companies.</span>

</td></tr>


<tr><td>
<table style="width: 100%">
  <tr>
  <td style="width: 10%;">&nbsp;</td>
  <td style="width: 90%;"><span style="font-size: 14px; line-height: 20px; color: #333;">i. Associate acknowledges that the Confidential Information is unique property of value to Beto Paredes Family of Companies and their participating partner companies and is highly confidential and proprietary, and that the unauthorized use or disclosure thereof may cause irreparable harm that could not be compensated by monetary damages.</span>
   <br/><br/>
  <span style="font-size: 14px; line-height: 20px; color: #333;">ii. Compensation is subject to change, with notice, due to market conditions or other reasons beyond Beto Paredes Family of Companies and their participating companies control.</span>
  </td>
</tr>

 

</table>

</td></tr>
 
<tr><td>&nbsp;</td></tr>
<tr><td>
<span style="font-size: 14px; line-height: 20px; color: #333;">4.5. Commissions will not be due or paid for any period in which Associate does not have an accurate and up-to-date federal w­9 form on file with Company.</span> <br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">4.6. The Associate shall be paid Commissions for all Referrals made during the Term of this Agreement. Any referral sent to Company during the term of this agreement will be considered a permanent referral of Associate whether this agreement remains in place or not. Each referral is tied to paying the Associate based on section 5 “Commission Schedule” for the life of the relationship of the Referral to the Company.</span> <br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">4.7. Associate understands and agrees that the Company may have other Associates who are referring Referral Contracts to Company and a Referral is only eligible for Commission if Associates is the first entity to introduce the Referral Contact to Company. Associates also agrees that the Company may have established prior relationship with a Referral Contact previous to the Referral of the Referral Contact and in that case no Commission are required to be paid by Company for the Referral. In such cases proof will be provided.</span> <br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">4.8. Referral Contract. A (“Referral Contract(s)”) is a successfully executed agreement between Client and a Referral Contact who is referred to Company by Associate. The term Referral Contact includes both the Initial Contract and Successive Contracts which are defined below.</span> <br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">4.9. Initial Contract. The (“Initial Contract”) is defined as the first Referral Contract agreement established with a client who is referred to Company by Associate. A new contract with a client will only considered Initial Contract if it is the first contract in which Company has established with client. “Successive Contracts” are the Referral Contract’s following the Initial Contract with a Referral Contact and do not include the Initial Contract.</span>  

 
</td></tr>

<tr><td>&nbsp;</td></tr>
<tr><td>

<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">5. COMMISSION SCHEDULE</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">5.1 All commission schedule may be altered by Company at any time, with or without notice, please contact Company for an updated commission schedule if one is required. All Contracts closed will follow this schedule Commission will be paid out based upon Company’s current commission schedule during the establishment of each Referral Contact’s contract.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">5.2 Any commission that closed during the time that this schedule remains in place will be paid at this schedule and the permanent lifetime residuals listed unaltered by any change to this schedule. Changes will only affect new Referral contracts closed after the change date.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">5.3 Commissions may be based on divisions of work to be done for Referral Contract. Associates will be given full disclosure of payment schedule paid by Referral Contract.</span>

</td></tr>


<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">6. TERM OF AGREEMENT</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">6.1. The term of this Agreement (referred to as “Term”) shall commence as of the effective date hereof and-shall continue thereafter until Terminated (referred to as “Terminate”, “Terminated”, “Termination”) in writing by either party hereto.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">6.2. Company has the exclusive right to modify this agreement at any time, provided Company serves a 30-day Notice to Associate.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">6.3. The Parties have the right to terminate this agreement by providing a 30-day Notice of termination to the other party.</span> 

</td></tr>

<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">7. NON­DISCLOSURE</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">7.1. The Associate agrees to not disclose any of the details in this agreement either implicitly, explicitly, or indirectly to any competing entity, employee of Company or subsidiary, contractor of Company or subsidiary, and client of Company or subsidiary without permission explicitly given by Company. The Associate agrees not to disclose details of compensation with any entity without the explicit permission of Company.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">7.2. Associate agrees not to disclose or otherwise reveal to any third party the identities, addresses, telephone numbers, facsimile numbers, email address, telex numbers, bank codes, account number, financial reference, or any other entities introduced by Company to the Associate without the specific written permission of Company.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">7.3. Confidential Information. The Associate agrees that they shall not, directly or indirectly, disclose, disseminate, use for personal benefit, lecture or write articles with respect to, or otherwise publish “confidential information”. For purposes of this Agreement, the term “confidential information” means information and know­how disclosed to or known by the Associate which relates to the Company or any business idea under development or research by the Company or that constitutes a corporate opportunity of the Company and which information is not generally known in the relevant trade or industry, including without limitation, any document, information, website or other data requiring passcode or password access, trade secrets, proprietary data, customer lists, contractual arrangements, and product and service development. “Confidential information” shall also include any other document or information (whether of the Company or of any supplier or customer of the Company or of any other person with which the Company has an agreement with respect to the confidentiality of information) labeled “confidential”, “proprietary”, or words of similar import. Upon Termination of the Term hereof, the Associate shall return to or leave with the Company, without making or retaining copies thereof, all documents, records, notebooks and similar repositories containing “confidential information”.</span> 
</td></tr>

<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">8. NON­CIRCUMVENTION</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">8.1. Company agrees not to intentionally circumvent Associate and seek Associate\'s Referral Contacts with intention to avoid paying the Commissions as established in this Agreement.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">8.2. The Associate agrees that once a client is introduced to the Company and the first Referral Commission is paid, that the new referral is now a Client if said Company. Associate agrees not to try and sell, promote, enlist or in any way refer other companies to said Client besides Company for the listed services that are available in the Media of the Company. If at first pass Client does not have any intention of using Company, Company may grant Associate from time to time the right to refer other solutions and opportunities to referred client. This is at the discretion of the Company to do so.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">8.3. This non circumvention agreement may stand separately or combined with this contract and is agreed upon to be in force during the Term of this Agreement and for a period no less than 3 years after the Term of this Agreement regardless of the status of any other section in this Agreement. The only remedy to the violation of this non-circumvention agreement as outlined above is a complete forfeiture of all forms of compensation obtained, past and future, by Associate from any corporation, partnership, proprietorships, trust, individuals, or other entities directly or indirectly introduced to Associate by Company, subsidiary, or client thereof, or any individual associated with Company, subsidiary, or client thereof, without specific written permission of the Company.</span> 

</td></tr>

<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">9. INDEMNIFICATION</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">9.1. Associate shall not be liable for any claim or demand made against Company by any third party. Company shall indemnify Associate against all claims, liabilities and costs, including reasonable attorney fees, of defending any third-party claim or suit arising out of the use of the software provided under this agreement. However, the Associate hereby agrees to indemnify and hold Company harmless from any and all liability, damage, loss, cost, expense or other charge resulting directly or indirectly from any act or omission of the Associate.</span>
</td></tr>

<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">10. STANDARDS AND ETHICS</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">10.1. Associate agrees that all advertising and marketing materials must receive prior written approval by Company before usage.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">10.2. Associate will adhere to simple truth and integrity and will not engage in any deceptive or misleading sales practices.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">10.3. Associate will not in any way demean or speak negatively of Company, Company\'s Clients, Company\'s Potential Clients, Any member of Company, Company\'s Competition, or Associate\'s Competition.</span><br/><br/>

<span style="font-size: 14px; line-height: 20px; color: #333;">10.4. Associate will maintain the confidentiality of information provided by any prospect or client of Company and will not reveal any such information without the proper consent or exemption of Company.</span> 
</td></tr>

<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">11. GOVERNING LAW AND FORUM</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">11.1. This Agreement shall be governed, construed and enforced exclusively in accordance with the laws of the State of Idaho and the laws of the United States of America, without regard to choice of laws or conflict of law provisions thereof that would result in the application of the laws of a different jurisdiction. Any arbitration or litigation between the Parties shall be conducted exclusively in Idaho, and the Parties hereby submit to such exclusive jurisdiction and venue and agree that venue shall be proper in Idaho. Each Party hereby irrevocably waives, to the fullest extent permitted by law, any objection that it may have, whether now or in the future, to the laying of venue in, or to the jurisdiction of, any and each of such courts for the purpose of any such suit, action, proceeding or judgment and further waives any claim that any such suit, action proceeding or judgment has been brought in an inconvenient forum, and each Party hereby submits to such jurisdiction.</span>

</td></tr>
<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">12. ENTIRE AGREEMENT</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">12.1. This agreement contains the entire understanding of the Parties and supersedes any and all previous verbal and written agreement or understandings. There are no other agreements, representations or warranties not set forth in this agreement. This agreement will bind, and inure to the benefit of, the Parties and their respective successors and assigns. Any modification, amendment, or waiver of any provision of this agreement may be made only in writing and signed by both Parties. The failure by any party to exercise any rights granted herein upon the occurrence of any event set forth in this agreement shall not constitute a waiver of any such rights upon the occurrence of any such event. In the event any provision of this agreement is held to be in violation of any law, statue, regulation, ordinance, or court order, this agreement shall be deemed modified accordingly and to the extent necessary to comply therewith and shall otherwise continue in full force and effect.</span>
</td></tr>

<tr><td>&nbsp;</td></tr>
<tr><td>
<h2 style="color: #000; text-transform: uppercase; font-size: 16px; font-weight: bold; margin: 0px; padding: 0px;">13. AGREEMENT EXECUTION</h2>
<span style="font-size: 14px; line-height: 20px; color: #333;">13.1. The Parties hereto agree to all aspects of this Agreement and that facsimile/email signatures shall be as effective as if originals. This agreement may be executed in several counterparts, each of which shall constitute one and the same instrument. Section or paragraph headings in the agreement are for convenience of reference only.</span>
</td></tr>

<tr><td>&nbsp;</td></tr>
<tr><td>
<span style="font-size: 14px; line-height: 20px; color: #333;">In witness whereof, the Parties hereto have caused this Agreement to be duly executed and entered into as of the date first above written.</span>
</td></tr>



</table>


<table width="50%">
<tr><td colspan="2">&nbsp;</td></tr>
<tr>
<td colspan="2"><span style="font-size: 17px; color: #000; line-height: 35px;">Associate:</span></td>
</tr>
<tr>
<td colspan="2" style="border-bottom: solid 1px #000;">
<span style="font-size: 16px; color: #7a7a7a;  line-height: 35px;">(Please Print):</span><br/> 
<span style="font-size: 14px; color: #333;  line-height: 25px;">Second Test</span>
</td>

</tr>

<tr><td colspan="2">&nbsp;</td></tr>

<tr>
<td colspan="2" style="border-bottom: solid 1px #000;">
<span style="font-size: 16px; color: #7a7a7a;  line-height: 35px;">Signature:</span><br/> <br/> <br/>   
</td>

</tr>

<tr><td colspan="2">&nbsp;</td></tr>
<tr>
<td style="width: 50px;">
<span style="font-size: 14px; color: #333;  ">Date:</span>
</td>
<td style="width: 100px; border-bottom: solid 1px #000;">
<span style="font-size: 14px; color: #333;  ">07/31/2019</span>
</td>

</tr>

</table>







';

 $html2=' <span style="font-size: 40px; color: #333;">Signature Text</span>';

$html3=' <table width="100%">
<tr><td colspan="2">&nbsp;</td></tr>
<tr>
<td colspan="2"><span style="font-size: 17px; color: #000; line-height: 35px;">By: Beto Paredes</span><br/>
<span style="font-size: 13px; color: #333;  ">CEO | Managing Partner Heriberto (Beto) Paredes</span>
</td>
</tr>


<tr>
<td colspan="2" style="border-bottom: solid 1px #000;">
<span style="font-size: 16px; color: #7a7a7a;  line-height: 35px;">Signature:</span><br/> <br/>   <br/> 
</td>

</tr>

<tr><td colspan="2">&nbsp;</td></tr>
<tr>
<td style="width: 50px;">
<span style="font-size: 14px; color: #333;  ">Date:</span>
</td>
<td style="width: 100px; border-bottom: solid 1px #000;">
<span style="font-size: 14px; color: #333;  ">07/31/2019</span>
</td>

</tr>

</table>';

$html4=' <span style="font-size: 40px; color: #333;">Beto Paredes</span>';

// output the HTML content
$pdf->SetY(0);
//$pdf->SetX(0);
//$pdf->writeHTML($html.$html2.$html3, true, 0, true, true);
//$pdf->writeHTML($html, true, false, true, false, '');



//$pdf->SetFont('helvetica');
$pdf->writeHTML($html, true, false, true, false, '');


$pdf->SetY(242);
$pdf->SetLeftMargin(0);
$pdf->SetFont('Notera_PersonalUseOnly');

$pdf->writeHTML($html2, true, false, true, false, '');


$pdf->SetY(198);
$pdf->SetLeftMargin(114);
$pdf->SetFont('helvetica');
$pdf->writeHTML($html3, true, false, true, false, '');

$pdf->SetY(225);
$pdf->SetLeftMargin(114);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->writeHTML($html4, true, false, true, false, '');


/*$fontname = TCPDF_FONTS::addTTFfont('includes/plugins/html2pdf/tcpdf/fonts/Notera_PersonalUseOnly.ttf', 'TrueTypeUnicode', '', 30);

$pdf->SetFont($fontname, '', 25, '', false);
$pdf->writeHTML($html2, true, 0, true, true);

//$pdf->SetFont('helvetica');
$pdf->writeHTML($html3, true, false, true, false, '');*/

// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('employment-agreement.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
