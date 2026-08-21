# Project Nilgiri Tahr — Requirements Schedule

**Subject:** Payment gateway setup (Razorpay), merchandise store completion, and compliance
**Prepared for:** Project lead
**Date:** 9 August 2026
**Status:** Awaiting decisions and documents — development is blocked on the items below

---

## 1. Purpose

Two things are outstanding before this website can handle money:

1. **No payment gateway account exists yet.** Everything currently runs on Razorpay's
   free test keys. No real payment has ever been processed, and no money can be received
   until an account is opened, verified and approved.
2. **The merchandise store cannot place an order.** The shopping side is built, but
   checkout is not connected to anything.

Neither is primarily a coding problem. Both are blocked on decisions and documents that
only the department or the project's parent entity can provide. The Razorpay account is
the longer of the two — approval time is outside our control and should be started first.

This document covers payment setup, the store, and money-handling compliance. It does not
cover site content, design, or the technical security review.

---

## 2. Present position

### Built and working

| Feature | Detail |
|---|---|
| Donation flow | Complete in **test mode** — form, payment screen, record-keeping and an automatic PDF receipt by email |
| Product catalogue | Customers can browse products and open a product page |
| Sizes and stock display | Per-size stock is shown; out-of-stock sizes cannot be selected |
| Shopping cart | Add, remove, change quantity; the cart survives a page refresh |
| Admin product management | Add, edit and delete products, upload a photo, set price and per-size stock |
| Checkout form | Collects email, name, full address, state, pincode and phone |
| Admin dashboard | View donations, contact messages and volunteer registrations |

**Note on "test mode":** Razorpay supplies fake card numbers so the flow can be
demonstrated. **No real money has been collected, and none can be.** Donation records
presently in the system are demonstration data.

### Not working

| Gap | Effect |
|---|---|
| **No live payment account** | Nothing on the site can accept real money. Blocks everything below. |
| **Store checkout** | "Confirm & Proceed Securely" does nothing — no payment, nothing saved, no email |
| Order records | Nowhere for an order to be stored, so no order history exists |
| Order confirmation email | Nothing sent to the customer or to the department |
| Admin sales screen | Dashboard menu has a "Sales" link leading nowhere, as there are no orders |
| Stock deduction | A purchase would not reduce the stock count |
| Delivery charge | Fixed at ₹50 per order regardless of destination, weight or order size |
| Donation receipt | Carries no tax-exemption or entity registration details (R7) |

---

## 3. How to read the requirement schedule

Each requirement carries a reference number (R1–R20). Please respond against these
numbers using the response sheet in Section 8.

- **Mandatory** — the project cannot go live without it. The requiring authority is named
  in each case (Razorpay activation rules, tax law, or a technical dependency).
- **Recommended** — not legally required, but omitting it creates avoidable operational
  risk. Marked explicitly so you can distinguish the two.

---

## 4. Section A — Payment gateway and KYC

| Ref | Requirement | Reason | Why it is mandatory |
|---|---|---|---|
| **R1** | Written confirmation that Razorpay may be used for this project — or the name of the government gateway that must be used instead | Some government departments are required to collect public money through an approved government channel or nominated bank rather than a private payment provider | **Mandatory.** If a different gateway is mandated, the entire payment integration must be rebuilt for that provider. Confirming this after development would waste the whole effort. Answer this before all others. |
| **R2** | The legal entity that will own the payment account — department, registered society, trust, foundation or Section 8 company | A payment account must belong to a legal entity holding its own PAN and bank account. A department often cannot open one directly | **Mandatory.** Razorpay cannot open an account without a named entity. No other item in this section can proceed until it is settled. Also determines the name appearing on receipts and on customers' bank statements. |
| **R3** | Decision on whether donations and merchandise sales use one payment account or two | Donations attract a charitable merchant category with concessional charges; sale of goods attracts standard retail rates | **Recommended (two accounts).** Not legally required. A single mixed account complicates settlement, makes donation income harder to separate from sales revenue for audit, and forfeits concessional donation pricing. |
| **R4** | The complete KYC document set for the chosen entity (itemised in Section 7) | Razorpay must verify who is receiving the money before releasing any funds | **Mandatory.** Required under RBI know-your-customer norms. Account activation is refused without it and no settlement can be made. |
| **R5** | Settlement bank account in the entity's name — account number, IFSC, account holder name exactly as per bank records | Collected funds are transferred into this account | **Mandatory.** A personal account, or any name mismatch against the entity's PAN, is rejected at verification. |
| **R6** | Named authorised signatory, and the official who will hold the dashboard login after handover | The account requires an accountable owner within the department | **Mandatory.** Razorpay requires a signatory with documented authority. Equally important, it prevents the payment account remaining tied to a contractor after handover. |
| **R7** | 12A and 80G registration numbers, entity PAN and validity dates. FCRA certificate and designated FCRA account if donations from outside India are to be accepted | Donors require tax-exemption details on their receipt; foreign contributions are separately regulated | **Mandatory** where donations are solicited. 80G details must appear on the receipt for a donor to claim deduction under the Income Tax Act. Accepting foreign contributions without FCRA registration is a legal offence, not a paperwork gap. |
| **R8** | Instruction on clearing test donation records before launch | The database holds demonstration transactions created during testing | **Recommended.** Not legally required, but retaining test records alongside real ones corrupts financial reporting and reconciliation from the first day of operation. |

---

## 5. Section B — Store operations

| Ref | Requirement | Reason | Why it is mandatory |
|---|---|---|---|
| **R9** | GST registration status, GSTIN, applicable rate and HSN code for apparel, and confirmation of whether displayed prices include tax | Tax treatment changes the price shown on the product page, the cart total and the invoice | **Mandatory** if the entity is GST-registered. Collecting tax without a GSTIN, or failing to collect where liable, creates a tax exposure for the entity. |
| **R10** | Confirmation of whether a tax invoice is issued per order, with invoice numbering series and the seller's registered address | Purchasers of goods are normally entitled to an invoice | **Mandatory** where GST applies. Requires a numbering series separate from the donation receipt series, so the two cannot be confused in audit. |
| **R11** | Delivery charge structure and the geographic areas served | The present ₹50 flat charge is a placeholder and does not reflect actual postage | **Mandatory.** Order totals cannot be calculated correctly without it, and the Shipping Policy required at R17 cannot be published. |
| **R12** | Fulfilment arrangement — who packs and posts, expected delivery timeframe, and whether tracking is provided | Determines what the customer is promised and what the dashboard must record | **Mandatory.** The delivery timeframe must be stated in the Shipping & Delivery Policy that Razorpay checks at activation. |
| **R13** | Returns, refund and cancellation policy — time window, acceptable condition, refund or replacement, and who bears return postage | Purchasers must know their rights before buying | **Mandatory.** Razorpay requires a published refund and cancellation policy before activating a live account. |
| **R14** | Instruction on out-of-stock handling — block the sale at zero stock, or accept the order and resolve manually | Stock is not reduced automatically when an item sells | **Mandatory.** Without a defined rule the site will sell items it does not hold, producing refunds, complaints and reputational damage. |
| **R15** | Official support email address and telephone number for customers and for order notifications | Notifications presently go to a personal Gmail address, and receipts are sent from a non-departmental domain | **Mandatory.** Razorpay requires genuine published contact details. A personal email address on a government project is not acceptable at launch, and an official domain materially improves the chance receipts reach the inbox rather than the spam folder. |
| **R16** | Purchase limits — maximum quantity per order, minimum order value, and whether cash on delivery is offered | The store currently applies no limits of any kind | **Recommended.** Not legally required, but protects against bulk and fraudulent ordering. Donations are already capped at ₹10–₹1,00,000 per transaction; the store is uncapped. |

---

## 6. Section C — Policy pages and data handling

| Ref | Requirement | Reason | Why it is mandatory |
|---|---|---|---|
| **R17** | Approved text for: Terms & Conditions; Privacy Policy; Refund and Cancellation Policy; Shipping & Delivery Policy; and a Contact page carrying a genuine postal address and telephone number — or written authority for us to draft them for departmental review | These pages constitute the contract between the site and the public | **Mandatory.** Razorpay verifies these URLs during merchant activation, and missing or placeholder pages are the most common cause of rejection. Government wording will likely require departmental approval, so this has a long lead time and should begin immediately. |
| **R18** | Instruction for interrupted payments — automatic refund or manual daily reconciliation — and the officer responsible | A payment can succeed at the bank while the website fails to record it | **Mandatory.** Without a defined process a member of the public can be charged with no order and no record against their name. This is the highest-risk failure mode in any payment system. |
| **R19** | Donation refund policy and the approving authority | Donors occasionally pay twice or enter an incorrect amount | **Mandatory.** The only present route is manual action inside the Razorpay dashboard, which leaves the site's records permanently out of step with the bank. |
| **R20** | Retention period for customer and donor personal data, and the list of persons permitted to view or export it | The site stores names, postal addresses, telephone numbers and email addresses | **Mandatory.** Personal data of members of the public held under a government project requires a defined retention period and controlled access. |

---

## 7. Supporting detail for R4 — KYC document checklist

The exact list depends on the entity chosen at R2. Below is what is normally requested;
please confirm the final list with Razorpay at onboarding, as their requirements change.

**Required in all cases:**

| Document | Note |
|---|---|
| PAN card of the entity | The entity's own PAN, not a personal one |
| Bank account proof | Cancelled cheque or bank statement, in the entity's name |
| Address proof of the entity | Utility bill, registration certificate or equivalent |
| Authorised signatory's PAN and Aadhaar | The individual signing on the entity's behalf |
| Authorisation letter or board resolution | Confirming that individual may open and operate the account |
| Live website with policy pages | Verified by Razorpay at activation — see R17 |

**Additional, by entity type:**

| If the entity is | Also required |
|---|---|
| Registered Society | Society Registration Certificate, memorandum and rules, list of office bearers |
| Trust | Registered Trust Deed, trustee list |
| Section 8 company | Certificate of Incorporation, MOA and AOA, CIN |
| Accepting donations | 12A and 80G certificates (R7) |
| Government body | Departmental authorisation or Government Order sanctioning collection, and sanctioned bank account details |
| Receiving foreign donations | FCRA registration certificate and designated FCRA bank account |

Documents are uploaded in the Razorpay dashboard during activation. Please assemble them
as one complete set — piecemeal submission is the usual cause of delay.

---

## 8. Sequence of work

| Step | Depends on | Notes |
|---|---|---|
| 1. Confirm gateway is permitted | R1 | Everything else depends on this |
| 2. Fix entity and account structure | R2, R3 | |
| 3. Assemble and submit KYC | R4, R5, R6 | **Longest lead time.** Outside our control — start immediately |
| 4. Draft and approve policy pages | R17 | Required for step 3 approval; runs in parallel |
| 5. Add tax-exemption details to receipts | R7 | Independent of all else; actionable as soon as numbers exist |
| 6. Correct pricing and delivery calculation | R9, R10, R11 | |
| 7. Build order storage; connect checkout to Razorpay | Steps 1–2, 6 | Principal development work |
| 8. Order status tracking and stock deduction | R12, R14 | |
| 9. Confirmation emails and invoices | R10, R15 | |
| 10. Build admin sales screen | Step 7 | |
| 11. Refund handling | R13, R18, R19 | |
| 12. Switch to live keys, clear test data, verify with one small real transaction | R8, step 3 | Before any public announcement |

**Priority:** R1, R2, R4 and R17. These four determine whether the project can accept
money at all and carry the longest lead times. All other items can follow.

---

## 9. Response sheet

| Ref | Requirement | Response | Owner | Target date |
|---|---|---|---|---|
| R1 | Razorpay permitted, or mandated government gateway | | | |
| R2 | Legal entity holding the account | | | |
| R3 | One account or two | | | |
| R4 | KYC document set | | | |
| R5 | Settlement bank account | | | |
| R6 | Authorised signatory and post-handover owner | | | |
| R7 | 12A, 80G, PAN, FCRA | | | |
| R8 | Clear test donation records | | | |
| R9 | GST status, rate, price inclusive or exclusive | | | |
| R10 | Tax invoice per order | | | |
| R11 | Delivery charge and areas served | | | |
| R12 | Fulfilment, timeframe, tracking | | | |
| R13 | Returns and refund policy | | | |
| R14 | Out-of-stock handling | | | |
| R15 | Official support email and phone | | | |
| R16 | Purchase limits and payment methods | | | |
| R17 | Policy page text or authority to draft | | | |
| R18 | Interrupted payment handling | | | |
| R19 | Donation refunds and approving authority | | | |
| R20 | Data retention and access | | | |

---

## Appendix A — Technical notes

For whoever handles the department's accounts, Razorpay onboarding or IT. Not required
reading for the response sheet.

| Ref | Note |
|---|---|
| R1 | A change of provider requires rewriting order creation, signature verification and the webhook listener. Nothing else in the codebase is affected. |
| R2 | Determines merchant category code, pricing tier, and the name rendered on receipt PDFs and customer card statements. |
| R3 | Donations typically sit under a charitable MCC with concessional pricing; merchandise under standard retail. Two accounts means two key pairs and two webhook endpoints. |
| R5 | Confirm the settlement schedule; Razorpay's default is T+2 working days. |
| R6 | Developer access is needed during integration only. Change the password and enable two-factor authentication at handover. |
| R7 | The receipt PDF layout already exists; adding registration fields is a small change. If FCRA is not held, the donation form should restrict foreign-issued cards. |
| R9 | Affects the product page price, cart total and invoice line items. Confirm whether stored prices are tax-inclusive before any data entry. |
| R11 | Supply either a fixed figure, a rate slab table, or a courier API to integrate. Serviceable pincodes needed if delivery is restricted. |
| R12 | Determines whether the dashboard needs order status stages (new → packed → shipped → delivered) and a tracking number field. |
| R14 | Determines whether stock is reserved at checkout or decremented on payment confirmation, and whether overselling is permitted. |
| R15 | Requires a departmental sending domain with SPF and DKIM records configured for receipt deliverability. |
| R18 | The webhook listener exists but does not currently write to the database. This answer defines whether reconciliation is automatic or manual. |
| R20 | Affects retention rules and export permissions in the admin dashboard. |

---

*Please do not send passwords, PAN scans or payment API keys by email or chat. A secure
method will be arranged separately.*
