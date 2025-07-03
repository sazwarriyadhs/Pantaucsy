
const en = {
  sidebar: {
    announcements: 'Announcements',
    residents: 'Residents',
    associationManagement: 'Association Management',
    iplManagement: 'IPL Dues',
    classifieds: 'Classifieds',
    classifiedsManagement: 'Ads Management',
    events: 'Events',
    gallery: 'Photo Gallery',
    reportIssue: 'Report Issue',
    curhatWarga: 'Resident Venting',
    security: 'Security',
    schedule: 'Schedule',
    management: 'Management',
    finance: 'Finance',
    paymentConfirmation: 'Payment Confirmation',
    financialReport: 'Financial Report',
    wasteManagement: 'Waste Management',
  },
  userNav: {
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Log out',
    language: 'Language',
    currency: 'Currency',
    english: 'English',
    indonesian: 'Indonesian'
  },
  announcements: {
    title: 'Announcements',
    description: 'Latest news and updates for the Cimahpar Stoneyard community.',
    items: {
      tpq_congratulations: {
        title: 'Congratulations to the New Management of TPA Al-Mumtaz',
        content: 'The entire Cimahpar Stoneyard community congratulates the formation of the new management of TPA Al-Mumtaz. May you carry out your mandate well and bring blessings to our community.'
      },
      obituary_aswin: {
        title: 'Obituary Notice',
        content: 'With deep sorrow, we announce the passing of Mr. Aswin, resident of Block C No. 16, on June 24, 2025, at 04:35 AM. The entire Cimahpar Stoneyard community extends its heartfelt condolences. May he rest in peace and his family be granted strength.',
        address: 'Funeral home: Jl. Stoneyard Boulevard No. 1. The burial will take place on June 25, 2025, at Pondok Ranggon Cemetery.'
      },
      garden_meeting: {
        title: 'Community Garden Meeting',
        content: 'Join us this Saturday at 10 AM to plan the new community garden. All residents are welcome to participate and share their ideas.'
      },
      watch_update: {
        title: 'Neighborhood Watch Update',
        content: 'There will be a brief meeting on Tuesday evening to discuss recent security enhancements and neighborhood watch patrol schedules.'
      },
      summer_bbq: {
        title: 'Annual Summer BBQ',
        content: 'Get ready for our annual summer BBQ! It will be held at the community park on August 25th. Food, games, and fun for the whole family.'
      },
      road_maintenance: {
        title: 'Road Maintenance Notice',
        content: 'Please be aware that road maintenance will be conducted on Stoneyard Lane from August 18th to 20th. Expect minor delays.'
      }
    }
  },
  associationManagement: {
    title: 'Association Management',
    description: 'List of association managers for Cimahpar Stoneyard.',
    tableTitle: 'Managers',
    tableDescription: 'List of all managers in the association.',
    addManager: 'Add Manager',
    name: 'Name',
    position: 'Position',
    phone: 'Phone',
    email: 'Email',
    positions: {
      chairman: 'Chairman',
      secretary: 'Secretary',
      treasurer: 'Treasurer'
    }
  },
  events: {
    title: 'Community Events',
    description: 'Upcoming events and gatherings for Cimahpar Stoneyard residents.',
    recurring: {
      every_saturday: 'Every Saturday'
    },
    items: {
      national_night_out: {
        title: 'National Night Out',
        description: 'Join your neighbors and local law enforcement for an evening of community building.'
      },
      yoga_in_the_park: {
        title: 'Yoga in the Park',
        description: 'Start your weekend with a relaxing and rejuvenating yoga session. All levels welcome.'
      },
      garage_sale: {
        title: 'Cimahpar Stoneyard Garage Sale',
        description: 'Community-wide garage sale. Find hidden treasures and meet your neighbors.'
      }
    }
  },
  reportIssue: {
    title: 'Report an Issue',
    description: 'Report security, maintenance, waste, or other issues in the neighborhood.',
    form: {
      title: 'New Issue Report',
      description: 'Please provide a detailed description of the issue. Our AI assistant will summarize and categorize it for faster processing.',
      label: 'Issue Description',
      placeholder: 'e.g., The garbage bin in front of block C is overflowing and hasn\'t been collected for 3 days...',
      description2: 'Be as specific as possible for the best results.',
      validation: 'Report must be at least 10 characters.',
      submit: 'Submit Report',
      submitting: 'Analyzing...',
      addPhoto: 'Add Photo',
      takePicture: 'Take Picture',
      retakePicture: 'Retake Picture',
    },
    summary: {
      title: 'AI Analysis',
      description: 'This is the summary and category that will be sent to our management team.',
      loading: 'Generating summary & category...',
      category: 'Category',
    },
    category: {
      security: 'Security',
      maintenance: 'Maintenance',
      waste: 'Waste',
      other: 'Other',
    },
    toast: {
      success: {
        title: 'Report Submitted',
        description: 'Your issue has been analyzed and submitted successfully.',
      },
      error: {
        title: 'Submission Failed',
        description: 'There was an error processing your report. Please try again.',
      },
    },
    camera: {
      accessRequired: 'Camera Access Required',
      permissionDenied: 'Please allow camera access to use this feature.',
      toast: {
        deniedTitle: 'Camera Access Denied',
        deniedDescription: 'Please enable camera permissions in your browser settings.',
      },
    }
  },
  security: {
    management: {
      title: 'Security Management',
      description: 'Manage security personnel, shifts, and incident reports.',
      personnel: 'Personnel',
      incidents: 'Incident Reports',
      personnelTitle: 'Security Personnel',
      personnelDescription: 'List of all security staff.',
      addPersonnel: 'Add Personnel',
      id: 'ID',
      name: 'Name',
      phone: 'Phone',
      shift: 'Shift',
      incidentsTitle: 'Incident Reports',
      incidentsDescription: 'Log of all reported incidents.',
      date: 'Date',
      type: 'Type',
      summary: 'Summary',
      status: 'Status',
    },
    schedule: {
      title: 'Security Patrol Schedule',
      description: 'Weekly schedule for security patrols in the neighborhood.',
      rosterTitle: 'Patrol Roster',
      rosterDescription: 'Shifts and areas covered by our security team.',
      shift: 'Shift',
      area: 'Area Covered',
      personnel: 'Assigned Personnel',
      shifts: {
        morning: 'Morning Patrol (6 AM - 2 PM)',
        afternoon: 'Afternoon Patrol (2 PM - 10 PM)',
        night: 'Night Patrol (10 PM - 6 AM)',
        weekend: 'Weekend Rover'
      }
    },
    shifts: {
      morning: 'Morning',
      afternoon: 'Afternoon',
      night: 'Night',
      weekend: 'Weekend'
    },
    status: {
      resolved: 'Resolved',
      closed: 'Closed',
      investigation: 'Under Investigation',
    },
    incidents: {
      suspicious_vehicle: 'Suspicious Vehicle',
      suspicious_vehicle_summary: 'A suspicious vehicle was reported near the park. Officers investigated and confirmed it belonged to a visiting relative.',
      noise_complaint: 'Noise Complaint',
      noise_complaint_summary: 'Loud music reported at 11 PM. Officers advised the resident to lower the volume.',
      stray_animal: 'Stray Animal',
      stray_animal_summary: 'A lost dog was found and safely returned to its owner on Cimahpar Circle.',
      vandalism: 'Vandalism',
      vandalism_summary: 'Graffiti found on the community center wall. Awaiting security camera footage review.'
    }
  },
  classifieds: {
    title: 'Classifieds',
    description: 'Buy, sell, or trade items with your neighbors.',
    contactViaWhatsapp: 'Message on WhatsApp',
  },
  classifiedsManagement: {
    title: 'Ads Management',
    description: 'Manage classified ads for the community.',
    tableTitle: 'Ads List',
    tableDescription: 'List of all active and expired ads.',
    addAd: 'Add Ad',
    titleColumn: 'Title',
    price: 'Price',
    status: 'Status',
    expiryDate: 'Expires On',
    actions: 'Actions',
    edit: 'Edit',
    delete: {
      button: 'Delete',
      title: 'Are you sure?',
      description: 'This will permanently delete the ad "{title}".',
      cancel: 'Cancel',
      confirm: 'Delete Ad',
    },
    form: {
      addTitle: 'Add New Ad',
      addDescription: 'Fill in the details for the new classified ad.',
      editTitle: 'Edit Ad',
      editDescription: "Update the ad's details.",
      title: 'Ad Title',
      description: 'Ad Description',
      price: 'Price',
      phone: 'WhatsApp Number',
      image: 'Ad Image URL',
      imageDescription: 'Enter a URL for the ad image.',
      submitAdd: 'Create Ad',
      submitEdit: 'Save Changes',
      addPhoto: 'Ad Photo',
      takePicture: 'Take Picture',
      retakePicture: 'Retake Picture',
    },
    statuses: {
      active: 'Active',
      expired: 'Expired',
    },
    toast: {
      error: 'An ad with this title already exists.',
    },
    camera: {
      accessRequired: 'Camera Access Required',
      permissionDenied: 'Please allow camera access to use this feature.',
      toast: {
        deniedTitle: 'Camera Access Denied',
        deniedDescription: 'Please enable camera permissions in your browser settings.',
      },
    },
  },
  gallery: {
    title: 'Photo Gallery',
    description: 'Photo documentation of Cimahpar Stoneyard resident activities.',
    items: {
      independence_day_race: "Independence Day Race",
      community_cleanup: "Community Cleanup",
      resident_meeting: "Resident Meeting",
      iftar_gathering: "Iftar Gathering",
      eid_celebration: "Eid Celebration",
      morning_aerobics: "Morning Aerobics",
      community_bazaar: "Community Bazaar",
      kids_art_performance: "Kids' Art Performance",
    }
  },
  ipl: {
      title: 'Resident IPL Dues',
      description: 'Manage monthly environmental maintenance fees for residents.',
      tableTitle: 'Dues List',
      tableDescription: 'List of payment statuses for all resident IPL dues.',
      addPayment: 'Add Payment',
      confirmPayment: 'Confirm Payment',
      residentName: 'Resident Name',
      address: 'Address',
      period: 'Period',
      amount: 'Amount',
      status: 'Status',
      paid: 'Paid',
      unpaid: 'Unpaid',
  },
  residents: {
    title: 'Resident Directory',
    description: 'Contact information for residents of Cimahpar Stoneyard.',
    tableTitle: 'Residents',
    tableDescription: 'A list of all residents in the community.',
    addResident: 'Add Resident',
    name: 'Name',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    actions: 'Actions',
    edit: 'Edit',
    delete: {
      button: 'Delete',
      title: 'Are you absolutely sure?',
      description: 'This action cannot be undone. This will permanently delete the resident "{name}" and remove their data from our servers.',
      cancel: 'Cancel',
      confirm: 'Continue',
    },
    form: {
      addTitle: 'Add New Resident',
      addDescription: 'Fill in the details to add a new resident to the directory.',
      editTitle: 'Edit Resident',
      editDescription: "Update the resident's details. Email cannot be changed.",
      name: 'Full Name',
      block: 'Block',
      number: 'Number',
      phone: 'Phone Number',
      email: 'Email Address',
      submitAdd: 'Add Resident',
      submitEdit: 'Save Changes',
    }
  },
  finance: {
    confirmation: {
      title: 'Payment Confirmation',
      description: 'Submit your IPL payment confirmation here.',
      copied: 'Account number copied!',
      form: {
        title: 'Confirmation Form',
        description: 'Fill out the form below and upload your proof of payment.',
        residentEmail: {
          required: 'Please select a resident.',
          placeholder: 'Select resident name',
        },
        paymentMonth: {
          label: 'Payment Month',
          required: 'Please select the payment month.',
          placeholder: 'Select month',
        },
        paymentDate: {
          label: 'Payment Date',
          required: 'A payment date is required.',
          placeholder: 'Pick a date',
        },
        amount: {
          label: 'Amount Paid',
          required: 'Please enter the amount paid.',
        },
        proof: {
          label: 'Proof of Payment',
          required: 'Proof of payment is required.',
          description: 'Upload a screenshot or photo of your transfer receipt.',
        },
        submit: 'Submit Confirmation',
      },
      paymentInfo: {
        title: 'Payment Information',
      },
      toast: {
        title: 'Confirmation Submitted',
        description: 'Your payment confirmation has been received and will be verified shortly.',
      },
    },
    report: {
      title: 'Financial Report',
      description: "Overview of the community's finances.",
      totalIncome: 'Total Income',
      totalExpense: 'Total Expense',
      currentBalance: 'Current Balance',
      monthlyOverview: 'Monthly Overview',
      monthlyOverviewDescription: 'Income vs. Expense for the last 6 months.',
      income: 'Income',
      expense: 'Expense',
      transactionHistory: 'Transaction History',
      transactionHistoryDescription: 'List of recent financial transactions.',
      date: 'Date',
      descriptionColumn: 'Description',
      type: 'Type',
      amount: 'Amount',
      types: {
        income: 'Income',
        expense: 'Expense',
      },
      transactions: {
        security_salary: 'Security Salary - July',
        ipl_dues: 'IPL Dues Collection - July',
        cleaning_fee: 'Cleaning Fee',
        street_light_repair: 'Street Light Repair',
        facility_rental: 'Facility Rental (Hall)'
      },
      months: {
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
      }
    }
  },
  curhatWarga: {
    title: "Resident Venting Space",
    description: "A safe space to share your thoughts and feelings. Our AI friend is here to listen.",
    form: {
      title: "Share Your Thoughts",
      description: "Write down whatever is on your mind. This is a private and anonymous space.",
      label: "Your story",
      placeholder: "Feel free to share anything...",
      submit: "Send",
      submitting: "Sending...",
      validation: "Message must be at least 10 characters.",
    },
    response: {
      title: "A Note from Your AI Neighbor",
      description: "Here is a supportive response for you.",
      loading: "Thinking of a response...",
    },
    toast: {
      success: {
        title: "Message Sent",
        description: "You've received a response from your AI neighbor.",
      },
      error: {
        title: "Error",
        description: "Something went wrong. Please try again.",
      }
    }
  },
  wasteManagement: {
    title: 'Waste Management',
    description: 'Schedule and information about waste collection.',
    scheduleTitle: 'Collection Schedule',
    scheduleDescription: 'Weekly schedule for household waste collection.',
    day: 'Day',
    area: 'Area',
    type: 'Type of Waste',
    days: {
      mon_thu: 'Monday & Thursday',
      tue_fri: 'Tuesday & Friday',
      first_saturday: 'First Saturday of the month'
    },
    areas: {
      north_sector: 'North Sector (Blok A, B)',
      south_sector: 'South Sector (Blok C, D)',
      all_sectors: 'All Sectors'
    },
    types: {
      general_recyclable: 'General & Recyclable Waste',
      garden_bulky: 'Garden & Bulky Waste'
    }
  }
};
export default en;
