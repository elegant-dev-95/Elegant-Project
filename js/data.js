/*
 * Sample data for the prototype.
 * In production, replace each block with an API call to the backend
 * (e.g. GET /api/dashboard, GET /api/assets, GET /api/assets/:id, GET /api/subscriptions).
 * All amounts are BDT.
 */
window.DATA = {
  dashboard: {
    kpis: [
      { label: 'Registered assets', value: '1,284', note: '+36 this quarter', tone: 'good' },
      { label: 'IT spend this month', value: '৳18.6 L', note: '▲ 6% vs October, ৳1.6 L over budget', tone: 'bad' },
      { label: 'Renewals in 30 days', value: '7', note: '৳2.9 L falling due', tone: '' },
      { label: 'Unused license seats', value: '42', note: 'About ৳1.1 L a month wasted', tone: 'bad' }
    ],
    monthlySpend: {
      labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      values: [15.2, 14.8, 16.1, 15.5, 17.9, 16.4, 15.8, 16.9, 17.2, 16.5, 17.5, 18.6],
      budget: 17
    },
    spendByConcern: [
      ['Garments', 5.8], ['Head office', 3.9], ['Hotels', 2.7], ['Retail chain', 2.2],
      ['Real estate', 1.6], ['Financial services', 1.2], ['Trading', 0.7], ['Power & energy', 0.5]
    ],
    assetsByCategory: [
      ['Computer / laptop', 612, '#1F3A5F'], ['CCTV camera / NVR', 214, '#1F8A7A'],
      ['Network device', 146, '#C98A1B'], ['Printer / scanner', 118, '#4F86C6'],
      ['UPS / power', 78, '#7458A6'], ['Access & attendance', 52, '#8795AA'],
      ['IP phone / conference', 40, '#7D8F4E'], ['Server / storage', 24, '#B5525B']
    ],
    lifecycle: [
      ['Assigned', 1102, '#1F8A7A'], ['In stock', 61, '#4F86C6'], ['Under repair', 27, '#C98A1B'],
      ['Retired', 90, '#8795AA'], ['Lost', 4, '#B42318']
    ],
    verification: { value: 82, target: 95, verified: 1053, total: 1284 },
    alerts: [
      { level: 'High', title: 'Core switch, AJ Heights', detail: 'Repairs have reached 62% of replacement cost. Replacing is likely cheaper.', action: 'Review asset', href: 'asset-detail.html' },
      { level: 'High', title: '3 leavers still hold laptops', detail: 'Offboarding not closed: Garments (2), Hotels (1).', action: 'Open offboarding', href: '#' },
      { level: 'Medium', title: '14 warranties end within 30 days', detail: 'Mostly laptops bought in December 2023.', action: 'See assets', href: 'assets.html?filter=warranty' },
      { level: 'Medium', title: '৳0.8 L unpaid for over 30 days', detail: 'Two vendors: internet (Hotels) and AMC (Head office).', action: 'View bills', href: '#' },
      { level: 'Low', title: 'Verification overdue at Garments factory 2', detail: '96 assets not checked since May.', action: 'Schedule check', href: '#' }
    ],
    renewals: [
      { name: 'Microsoft 365 Business', company: 'Garments', cost: '৳1.4 L', days: 12 },
      { name: 'elegant.com.bd domain', company: 'Head office', cost: '৳2.5 k', days: 18 },
      { name: 'Wildcard SSL certificate', company: 'Head office', cost: '৳18 k', days: 25 },
      { name: 'Endpoint antivirus', company: 'All companies', cost: '৳3.8 L', days: 41 }
    ]
  },

  assets: [
    { tag: 'EG-IT-0418', model: 'Dell Latitude 5440', category: 'Laptop', serial: '7HX2Q93', company: 'Garments', person: 'Farzana Akter', dept: 'Merchandising', site: 'Garments factory 1', status: 'Assigned', warranty: '14 Dec 2026', warrantyDays: 22, value: 62400 },
    { tag: 'EG-IT-0142', model: 'Cisco Catalyst 9300 core switch', category: 'Network device', serial: 'FOC2318X0LM', company: 'Head office', person: 'IT department', dept: 'Infrastructure', site: 'AJ Heights', status: 'Under repair', warranty: 'Expired', warrantyDays: -1, value: 185000 },
    { tag: 'EG-IT-0731', model: 'HP LaserJet M607', category: 'Printer', serial: 'PHBQK22041', company: 'Hotels', person: 'Front office', dept: 'Shared device', site: 'Hotel site', status: 'Assigned', warranty: '03 Mar 2027', warrantyDays: 101, value: 48900 },
    { tag: 'EG-IT-0905', model: 'Hikvision 32-channel NVR', category: 'CCTV / NVR', serial: 'J51872204', company: 'Garments', person: 'Security', dept: 'Shared device', site: 'Garments factory 2', status: 'Assigned', warranty: '20 Jan 2027', warrantyDays: 59, value: 71300 },
    { tag: 'EG-IT-1012', model: 'Lenovo ThinkPad E14', category: 'Laptop', serial: 'PF4RT8K2', company: 'Real estate', person: 'Nusrat Jahan', dept: 'Marketing', site: 'AJ Heights', status: 'Assigned', warranty: '11 Aug 2028', warrantyDays: 628, value: 88500 },
    { tag: 'EG-IT-0057', model: 'Dell OptiPlex 3080', category: 'Desktop', serial: 'X129', company: 'Head office', person: 'Mahmudul Karim', dept: 'Supply chain', site: 'AJ Heights', status: 'Assigned', warranty: 'Expired', warrantyDays: -1, value: 9800 },
    { tag: 'EG-IT-1188', model: 'APC Smart-UPS 3 kVA', category: 'UPS / power', serial: 'AS2104331', company: 'Hotels', person: 'Server room', dept: 'Infrastructure', site: 'Hotel site', status: 'Assigned', warranty: '30 Jun 2027', warrantyDays: 220, value: 112000 },
    { tag: 'EG-IT-1203', model: 'Dell Latitude 3540', category: 'Laptop', serial: '9JK7L52', company: 'Head office', person: 'Not assigned', dept: 'IT store', site: 'AJ Heights', status: 'In stock', warranty: '05 Sep 2028', warrantyDays: 653, value: 74000 },
    { tag: 'EG-IT-0620', model: 'ZKTeco attendance terminal', category: 'Attendance device', serial: 'CJDE21330', company: 'Retail chain', person: 'HR', dept: 'Shared device', site: 'Retail outlet', status: 'Under repair', warranty: '18 Feb 2027', warrantyDays: 88, value: 14200 },
    { tag: 'EG-IT-0388', model: 'HP ProDesk 400 G7', category: 'Desktop', serial: '8CG1240XQ', company: 'Trading', person: 'Tanvir Hasan', dept: 'Accounts', site: 'Trading office', status: 'Assigned', warranty: '08 Dec 2026', warrantyDays: 16, value: 31600 }
  ],
  assetCounts: { all: 1284, Assigned: 1102, 'In stock': 61, 'Under repair': 27, warranty: 14 },

  assetDetail: {
    tag: 'EG-IT-0142',
    groups: [
      { title: 'Identification', items: [['Asset tag', 'EG-IT-0142'], ['Company', 'Head office'], ['Category', 'Network device, core switch'], ['Brand and model', 'Cisco Catalyst 9300-48P'], ['Serial number', 'FOC2318X0LM'], ['Lifecycle status', 'Under repair']] },
      { title: 'Specifications', items: [['Ports', '48 × 1G PoE+, 4 × 10G uplink'], ['Firmware', 'IOS XE 17.6.5'], ['IP address', '10.10.0.2'], ['MAC address', '00:1B:54:3C:9A:10']] },
      { title: 'Purchase & value', items: [['Purchase date', '14 Jun 2020'], ['Vendor', 'Network vendor (sample)'], ['PO / invoice', 'PO-2020-118 / INV-2020-0614'], ['Purchase cost', '৳5,15,000'], ['Useful life', '10 years, straight-line'], ['Replacement quote', '৳1,39,000 (Oct 2026)']] },
      { title: 'Warranty, insurance & verification', items: [['Warranty type', 'Manufacturer'], ['Warranty end', '14 Jun 2023, expired'], ['Insurance', 'Not covered'], ['Last verified', '5 Oct 2026'], ['Next verification due', '5 Apr 2027'], ['Condition', 'Fair']] }
    ],
    tickets: [
      { id: 'SR-2026-311', date: '09 Oct 2026', issue: 'Uplink port failure on stack member 2', cause: 'Failed supervisor port; replacement part ordered', vendor: 'Network vendor', downtime: 'Partial, ongoing', status: 'Waiting for parts', cost: 31000 },
      { id: 'SR-2025-147', date: '02 Jun 2025', issue: 'Intermittent port drops', cause: 'Firmware bug; upgraded to 17.6.5', vendor: 'Network vendor', downtime: '0.5 days', status: 'Completed', cost: 9500 },
      { id: 'SR-2024-402', date: '18 Nov 2024', issue: 'Power supply failure', cause: 'PSU burnout after power surge; PSU replaced', vendor: 'Network vendor', downtime: '1 day', status: 'Completed', cost: 27000 },
      { id: 'SR-2024-088', date: '11 Mar 2024', issue: 'Overheating alarm', cause: 'Fan module failure; module replaced', vendor: 'Network vendor', downtime: '0.5 days', status: 'Completed', cost: 18500 }
    ],
    assignments: [
      { when: 'Jun 2020 to now', who: 'IT department, Infrastructure', note: 'Installed in AJ Heights server room. Custodian: Rafiq Islam, Network Engineer. Acknowledgement signed.' },
      { when: 'May 2020 to Jun 2020', who: 'IT store, Head office', note: 'Received against PO-2020-118, tagged and configured before installation.' }
    ],
    documents: [
      { name: 'Purchase invoice INV-2020-0614', meta: 'PDF, 412 KB, uploaded 15 Jun 2020' },
      { name: 'Manufacturer warranty certificate', meta: 'PDF, 198 KB, uploaded 15 Jun 2020' },
      { name: 'Replacement quotation, October 2026', meta: 'PDF, 260 KB, uploaded 12 Oct 2026' }
    ],
    log: [
      { when: '12 Oct 2026, 11:40', who: 'Rafiq Islam', what: 'attached a replacement quotation of ৳1,39,000.' },
      { when: '09 Oct 2026, 09:15', who: 'Rafiq Islam', what: 'raised ticket SR-2026-311 and changed status to Under repair.' },
      { when: '05 Oct 2026, 16:02', who: 'Rafiq Islam', what: 'confirmed physical verification by QR scan.' },
      { when: '01 Jul 2026, 00:00', who: 'System', what: 'posted monthly depreciation; book value now ৳1,93,600.' }
    ],
    depreciation: { cost: 515000, bookValue: 185000, startYear: 2020, lifeYears: 10, elapsedYears: 6.42 }
  },

  subscriptions: {
    windows: [
      { label: 'Within 30 days', total: '৳2.9 L', tone: 'high', items: [
        { name: 'Microsoft 365, Garments', when: 'Renews 4 Dec. Cancel by 27 Nov', cost: '৳1.4 L' },
        { name: 'elegant.com.bd domain', when: 'Renews 10 Dec', cost: '৳2.5 k' },
        { name: 'Wildcard SSL certificate', when: 'Renews 17 Dec', cost: '৳18 k' } ] },
      { label: '31 to 60 days', total: '৳5.1 L', tone: 'med', items: [
        { name: 'Endpoint antivirus, all companies', when: 'Renews 2 Jan. Cancel by 18 Dec', cost: '৳3.8 L' },
        { name: 'Cloud backup storage', when: 'Renews 14 Jan', cost: '৳1.3 L' } ] },
      { label: '61 to 90 days', total: '৳7.2 L', tone: 'low', items: [
        { name: 'ERP AMC, head office', when: 'Renews 24 Jan', cost: '৳6.0 L' },
        { name: 'Firewall subscription, Hotels', when: 'Renews 7 Feb', cost: '৳1.2 L' } ] }
    ],
    list: [
      { name: 'Microsoft 365 Business Standard', plan: 'Per user, monthly billing', company: 'Garments', used: 172, seats: 180, billing: 'Monthly, USD', annual: 1760000, renews: '04 Dec 2026', days: 12, auto: 'Yes' },
      { name: 'elegant.com.bd', plan: 'Domain registration', company: 'Head office', used: 0, seats: 0, billing: 'Yearly, BDT', annual: 2500, renews: '10 Dec 2026', days: 18, auto: 'Yes' },
      { name: 'Wildcard SSL certificate', plan: '*.elegant.com.bd', company: 'Head office', used: 0, seats: 0, billing: 'Yearly, USD', annual: 18000, renews: '17 Dec 2026', days: 25, auto: 'No' },
      { name: 'Endpoint antivirus', plan: 'Business edition', company: 'All companies', used: 935, seats: 950, billing: 'Yearly, BDT', annual: 380000, renews: '02 Jan 2027', days: 41, auto: 'No' },
      { name: 'ERP annual maintenance', plan: 'Support and updates', company: 'Head office', used: 146, seats: 150, billing: 'Yearly, BDT', annual: 600000, renews: '24 Jan 2027', days: 63, auto: 'No' },
      { name: 'Firewall security subscription', plan: 'UTM bundle', company: 'Hotels', used: 0, seats: 0, billing: 'Yearly, USD', annual: 120000, renews: '07 Feb 2027', days: 77, auto: 'Yes' },
      { name: 'Microsoft 365 Business Standard', plan: 'Per user, monthly billing', company: 'Head office', used: 146, seats: 150, billing: 'Monthly, USD', annual: 1440000, renews: '30 Apr 2027', days: 159, auto: 'Yes' },
      { name: 'Adobe Creative Cloud', plan: 'Teams, all apps', company: 'Real estate', used: 18, seats: 25, billing: 'Yearly, USD', annual: 262500, renews: '15 Jun 2027', days: 205, auto: 'Yes' },
      { name: 'Zoom Workplace', plan: 'Business', company: 'Head office', used: 10, seats: 10, billing: 'Yearly, USD', annual: 132000, renews: '01 Sep 2027', days: 283, auto: 'Yes' }
    ]
  }
};
