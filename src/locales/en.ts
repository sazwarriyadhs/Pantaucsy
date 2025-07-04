
const en = {
  sidebar: {
    announcements: 'Announcements',
    residents: 'Residents',
    associationManagement: 'Association Management',
    staffManagement: 'Staff Management',
    iplManagement: 'IPL Dues',
    classifieds: 'Classifieds',
    postAd: 'Post Ad',
    classifiedsManagement: 'Ads Management',
    adReview: 'Ad Review',
    events: 'Events',
    gallery: 'Photo Gallery',
    reportIssue: 'Report Issue',
    curhatWarga: 'Resident Venting',
    whatsappFeed: 'Community Chat',
    security: 'Security',
    schedule: 'Schedule',
    management: 'Management',
    finance: 'Finance',
    paymentConfirmation: 'Payment Confirmation',
    financialReport: 'Financial Report',
    wasteManagement: 'Waste Management',
    vehicleManagement: 'Vehicle Management',
    landingPage: 'Home Page',
    general: 'General',
    management_tools: 'Management Tools',
  },
  userNav: {
    profile: 'Profile',
    settings: 'Settings',
    language: 'Language',
    currency: 'Currency',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    english: 'English',
    indonesian: 'Indonesian',
    role: 'Role',
    roles: {
      superadmin: 'Super Admin',
      admin: 'Admin',
      warga: 'Resident'
    }
  },
  auth: {
    login: {
      title: 'Login',
      description: 'Enter your credentials to access the hub.',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      button: 'Login',
      noAccount: "Don't have an account?",
      register: 'Register',
      demoHint: 'Use the pre-filled resident credentials. For admin access, use admin@example.com. Please register accounts before logging in.'
    },
    register: {
      title: 'Register',
      description: 'Create a new account to join the community.',
      nameLabel: 'Full Name',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      button: 'Create Account',
      haveAccount: 'Already have an account?',
      login: 'Login'
    },
    logout: 'Log out',
    success: {
        register_title: 'Registration Successful',
        register: 'Please log in with your new account.'
    },
    error: {
        login_title: 'Login Error',
        register_title: 'Registration Error',
        login: 'Login failed. Please check your email and password.',
        login_demo: 'Login failed. Please register this demo account first.',
        register: 'Registration failed. Please try again.',
        register_email_in_use: 'This email is already registered. Please log in instead.',
        not_configured: 'Firebase is not configured. Please add your credentials to the .env file to enable authentication.',
        invalid_api_key: 'Configuration error: The Firebase API key is not valid. Please check your .env file.'
    }
  },
  landing: {
    header: {
      title: 'Pantau Warga Cimahpar Stoneyard',
      login: 'Login'
    },
    hero: {
      title: 'Welcome to Pantau Warga Cimahpar Stoneyard',
      subtitle: 'The all-in-one platform to connect with your neighbors, stay informed about community news, and manage residential activities seamlessly.',
      cta: 'Login & Explore'
    },
    announcements: {
      latest: "Latest Announcements",
      latest_description: "Stay informed with the most recent news from our community.",
      view_all: "View All Announcements",
    },
    classifieds: {
      title: "Community Marketplace",
      description: "Find great deals or sell your items to neighbors.",
      view_all: "View All Classifieds",
    },
    gallery: {
      title: "Community Gallery",
      description: "Moments from our vibrant community events.",
      cta: "View Full Gallery",
    },
    reminders: {
      ipl_fallback: "Don't forget to pay this month's IPL dues, neighbor! ✨"
    },
    footer: {
      copyright: '© {year} Pantau Warga. All Rights Reserved.'
    }
  },
  announcements: {
    title: 'Announcements',
    description: 'Latest news and updates for the Cimahpar Stoneyard community.',
    addAnnouncement: 'Add Announcement',
    edit: 'Edit',
    delete: {
      button: 'Delete',
      title: 'Are you sure?',
      description: 'This will permanently delete the announcement "{title}".',
      cancel: 'Cancel',
      confirm: 'Delete Announcement'
    },
    form: {
      addTitle: 'Add New Announcement',
      addDescription: 'Fill in the details for the new announcement.',
      editTitle: 'Edit Announcement',
      editDescription: "Update the announcement's details.",
      submitAdd: 'Create Announcement',
      submitEdit: 'Save Changes',
      title: 'Title',
      content: 'Content',
      date: 'Date',
      image: 'Image URL (Optional)',
      address: 'Address (Optional)',
      pickDate: 'Pick a date',
      imagePlaceholder: 'https://placehold.co/600x400.png'
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
    salary: 'Salary',
    positions: {
      chairman: 'Chairman',
      vice_chairman: 'Vice Chairman',
      secretary: 'Secretary',
      treasurer: 'Treasurer'
    }
  },
  staffManagement: {
    title: 'Staff Management',
    description: 'Manage operational staff for security and gardening. Salaries are paid on the 28th of each month via bank transfer.',
    addStaff: 'Add Staff',
    roles: {
      security: 'Security',
      gardener: 'Gardener'
    },
    tableTitle: 'Staff List',
    tableDescription: 'List of all operational staff. Salaries are paid on the 28th of each month via bank transfer.',
    name: 'Name',
    role: 'Role',
    phone: 'Phone',
    salary: 'Salary',
    actions: 'Actions',
    edit: 'Edit',
    viewReport: 'View Report',
    performanceReportTitle: "Performance Report for {name}",
    performanceReportDescription: "Monthly performance summary and notes.",
    delete: {
      button: 'Delete',
      title: 'Are you sure?',
      description: 'This will permanently delete the staff member "{name}".',
      cancel: 'Cancel',
      confirm: 'Delete Staff Member',
      toastSuccessTitle: 'Staff Deleted',
      toastSuccessDescription: '{name} has been removed from the staff list.',
    },
    form: {
      addTitle: 'Add New Staff Member',
      addDescription: 'Fill in the details for the new staff member.',
      editTitle: 'Edit Staff Member',
      editDescription: "Update the staff member's details.",
      name: 'Full Name',
      role: 'Role',
      rolePlaceholder: 'Select a role',
      phone: 'Phone Number',
      salary: 'Monthly Salary (IDR)',
      photo: 'Photo URL (Optional)',
      performanceSummary: 'Performance Summary',
      submitAdd: 'Add Staff',
      submitEdit: 'Save Changes',
      toastAddSuccessTitle: 'Staff Added',
      toastAddSuccessDescription: '{name} has been added to the staff list.',
      toastEditSuccessTitle: 'Staff Updated',
      toastEditSuccessDescription: 'The details for {name} have been updated.',
    }
  },
  events: {
    title: 'Community Events',
    description: 'Upcoming events and gatherings for Cimahpar Stoneyard residents.',
    recurring: {
      every_saturday: 'Every Saturday'
    },
    addEvent: 'Add Event',
    edit: 'Edit',
    delete: {
      button: 'Delete',
      title: 'Are you sure?',
      description: 'This will permanently delete the event "{title}".',
      cancel: 'Cancel',
      confirm: 'Delete Event'
    },
    form: {
      addTitle: 'Add New Event',
      addDescription: 'Fill in the details for the new event.',
      editTitle: 'Edit Event',
      editDescription: "Update the event's details.",
      submitAdd: 'Create Event',
      submitEdit: 'Save Changes',
      title: 'Title',
      description: 'Description',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      recurring: 'Recurring Event',
      recurringDescription: 'Is this a regularly scheduled event?',
      datePlaceholder: 'e.g., 2024-09-14 or every_saturday',
      timePlaceholder: 'e.g., 8:00 AM - 2:00 PM'
    }
  },
  reportIssue: {
    title: 'Report an Issue',
    description: 'Report security, maintenance, waste, or other issues in the neighborhood.',
    form: {
      title: 'New Issue Report',
      description: 'Please provide a detailed description of the issue. Our AI assistant will summarize and categorize it for faster processing.',
      label: 'Issue Description',
      placeholder: "e.g., The garbage bin in front of block C is overflowing and hasn't been collected for 3 days...",
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
        notFoundTitle: 'Camera Not Found',
        notFoundDescription: 'No camera device could be found. Please connect one to use this feature.',
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
    items: {
      sepeda_gunung: {
        title: 'Mountain Bike',
        description: 'Used mountain bike, great condition. Perfect for the trails around the neighborhood.'
      },
      kursi_mobil_balita: {
        title: 'Toddler Car Seat',
        description: 'Clean and safe toddler car seat. Our child has outgrown it. All straps and buckles included.'
      },
      set_mebel_teras: {
        title: 'Patio Furniture Set',
        description: 'Rattan patio set with two chairs and a small table. Cushions included. Great for a balcony or small patio.'
      },
      berbagai_tanaman_hias: {
        title: 'Various House Plants',
        description: 'Various house plants for sale. Snake plants, pothos, and succulents available. Brighten up your home!'
      },
      jasa_potong_rumput: {
        title: 'Lawn Mowing Service',
        description: 'Offering lawn mowing services for blocks A & B. Reliable and neat work. Weekly or bi-weekly schedule available.'
      },
      pempek_mantap: {
        title: 'Delicious Pempek',
        description: 'Authentic Palembang fish cakes, complete with spicy cuko sauce. Price per portion, guaranteed to get you hooked!'
      },
      iguana_hilang: {
        title: 'Lost Iguana (Reward)',
        description: "A tame green iguana has been lost around Block B. A reward will be given to the finder. Please contact the number provided."
      },
    }
  },
  postAd: {
    title: 'Post a New Ad',
    description: 'Fill out the form below to post your ad in the community marketplace.',
     form: {
      title: 'Ad Details',
      submit: 'Submit Ad for Review',
      submitting: 'Submitting...',
    },
    pricing: {
      title: 'Pricing Information',
      description: 'Per ad for 30 days.',
      note1: 'Your ad will be reviewed by management before it is published.',
      note2: 'Payment instructions will be provided after your ad is approved.'
    },
    toast: {
      success: {
        title: 'Ad Submitted',
        description: 'Your ad has been submitted for review. You will be notified once it is approved.',
      },
      error: {
        title: 'Submission Failed',
        description: 'There was an error submitting your ad. Please try again.'
      }
    },
    validation: {
      title: 'Title must be at least 3 characters.',
      description: 'Description must be at least 10 characters.',
      price: 'Price is required.',
      phone: 'Phone number must be at least 10 digits.'
    }
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
    submittedBy: 'Submitted By',
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
      submitAdd: 'Create Ad',
      submitEdit: 'Save Changes',
      adPhoto: 'Ad Photo',
      takePicture: 'Take Picture',
      removePicture: 'Remove Picture',
      uploadFile: 'Upload File',
      noImagePlaceholder: 'Camera feed unavailable',
      uploadOrCapture: 'Upload a photo or use the camera to add an image.',
      capture: 'Capture',
      cancel: 'Cancel',
    },
    statuses: {
      active: 'Active',
      expired: 'Expired',
      pending_review: 'Pending Review',
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
        notFoundTitle: 'Camera Not Found',
        notFoundDescription: 'No camera device could be found. Please connect one to use this feature.',
      },
    },
  },
  adReview: {
    title: 'Ad Review',
    description: 'Approve or reject ads submitted by residents.',
    tableTitle: 'Pending Ads',
    tableDescription: 'The following ads are awaiting your review.',
    columnTitle: 'Title',
    columnSubmittedBy: 'Submitted By',
    columnActions: 'Actions',
    reviewButton: 'Review',
    dialog: {
      title: 'Review Ad',
      description: 'Use AI to help moderate and improve the ad content.',
      loading: 'AI is reviewing the ad...',
      originalTitle: 'Original Ad',
      aiReviewTitle: 'AI Review & Suggestions',
      suggestion: 'Suggestion',
      category: 'Suggested Category',
      approveButton: 'Approve Ad',
      rejectButton: 'Reject Ad',
      closeButton: 'Close',
      rejectionReason: 'Reason for Rejection',
      approvedMessage: 'AI recommends approving this ad.',
      rejectedMessage: 'AI recommends rejecting this ad.',
    },
    toast: {
      approved: {
        title: 'Ad Approved',
        description: 'The ad "{title}" is now live.',
      },
      rejected: {
        title: 'Ad Rejected',
        description: 'The ad "{title}" has been rejected and removed from the queue.',
      },
      error: {
        title: 'AI Review Failed',
        description: 'Could not get a response from the AI. Please try again.',
      }
    },
    categories: {
      electronics: 'Electronics',
      furniture: 'Furniture',
      vehicles: 'Vehicles',
      clothing: 'Clothing',
      household: 'Household',
      services: 'Services',
      other: 'Other'
    },
    noPendingAds: 'No ads are currently pending review.'
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
    },
    edit: 'Edit',
    delete: {
      button: 'Delete',
      title: 'Are you sure?',
      description: 'This will permanently delete this photo from the gallery.',
      cancel: 'Cancel',
      confirm: 'Delete Photo',
      toastSuccessTitle: 'Photo Deleted',
      toastSuccessDescription: 'The photo has been removed from the gallery.',
    },
    form: {
      addPhoto: 'Add Photo',
      addTitle: 'Add New Photo',
      addDescription: 'Fill in the details for the new photo.',
      editTitle: 'Edit Photo',
      editDescription: "Update the photo's details.",
      titleKey: 'Title Key',
      image: 'Image URL',
      imageHint: 'Image Hint (for AI)',
      submitAdd: 'Add Photo',
      submitEdit: 'Save Changes',
      toastAddSuccessTitle: 'Photo Added',
      toastEditSuccessTitle: 'Photo Updated',
    }
  },
  ipl: {
      title: 'Resident IPL Dues',
      description: 'Manage monthly environmental maintenance fees for residents. The monthly fee is IDR 125,000 (IDR 55,000 for community services & IDR 70,000 for developer fees).',
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
    searchPlaceholder: 'Search by name, email, or phone...',
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
    },
    filter: {
      placeholder: 'Filter by block',
      allBlocks: 'All Blocks',
      noResults: 'No residents found.'
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
        paymentMethod: {
          label: 'Payment Method',
          required: 'Please select a payment method.',
          transfer: 'Bank Transfer',
          cash: 'Cash',
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
          requiredTransfer: 'Proof of payment is required for bank transfers.',
          description: 'Upload a screenshot or photo of your transfer receipt.',
          cashDescription: 'Optional: Upload a photo of the cash payment receipt.',
        },
        notes: {
          label: 'Notes (Optional)',
          placeholder: 'Add any additional notes here...',
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
  whatsappFeed: {
    title: 'Community Chat',
    description: "A live feed of announcements and discussions from the residents' WhatsApp group.",
    chatTitle: 'Cimahpar Stoneyard Residents',
    onlineStatus: 'John, Jane, Budi, Siti & 12 others',
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
    },
    statusTitle: 'Your Waste Collection Status',
    statusCheckDescription: 'This status is updated based on your IPL dues payment history.',
    statusActive: {
      title: 'Service Active',
      description: 'Your waste will be collected according to the schedule below.'
    },
    statusSuspended: {
      title: 'Service Suspended',
      description: 'Overdue IPL dues were detected. Please complete your payment to reactivate waste collection services.'
    },
    confirmPaymentButton: 'Confirm payment here.'
  },
  profile: {
    title: 'Update Profile',
    description: 'Manage your personal information and settings.',
    form: {
      photo: {
        label: 'Profile Photo',
        change: 'Take Photo',
        remove: 'Remove Photo',
      },
      name: {
        label: 'Full Name',
      },
      email: {
        label: 'Email Address',
      },
      address: {
        label: 'Address',
      },
      phone: {
        label: 'Phone Number',
      },
      location: {
        label: 'GPS Location',
        description: 'Capture your precise location to help with deliveries and emergency services. This is optional.',
        capture: 'Capture Current Location',
        capturing: 'Capturing...',
        denied: 'Location access was denied. Please enable it in your browser settings.',
        notSupported: 'Geolocation is not supported by your browser.',
        latitude: 'Latitude',
        longitude: 'Longitude',
      },
      family: {
        label: 'Family Members',
        placeholder: 'List your family members, one per line...',
      },
      submit: 'Save Changes',
      submitting: 'Saving...',
    },
    toast: {
      success: {
        title: 'Profile Updated',
        description: 'Your information has been successfully saved.',
      },
      error: {
        title: 'Update Failed',
        description: 'There was an error saving your profile. Please try again.',
      },
    },
  },
  notifications: {
    ipl: {
      dueSoon: {
        title: "IPL Dues Reminder",
        message: "This month's IPL dues will be due in 5 days (on the 28th). Please make your payment soon. Thank you.",
      },
      overdue: {
        title: "Overdue IPL Dues Notice",
        message: "Dear {name}, our records show you have an overdue IPL payment. Please settle it soon to avoid service suspension. Thank you.",
      }
    }
  },
  vehicleManagement: {
    title: 'Vehicle Management',
    description: 'Manage resident vehicle data for security and administration purposes.',
    tableTitle: 'Vehicle List',
    tableDescription: 'A list of all resident vehicles registered in the system.',
    addVehicle: 'Add Vehicle',
    resident: 'Resident',
    type: 'Type',
    vehicleInfo: 'Vehicle Information',
    licensePlate: 'License Plate',
    actions: 'Actions',
    types: {
      car: 'Car',
      motorcycle: 'Motorcycle'
    },
    edit: 'Edit',
    delete: {
      button: 'Delete',
      title: 'Are you sure?',
      description: 'This action will permanently delete the vehicle with license plate {plate}.',
      cancel: 'Cancel',
      confirm: 'Delete Vehicle',
    },
    form: {
      addTitle: 'Add New Vehicle',
      addDescription: 'Fill in the details for the new vehicle.',
      editTitle: 'Edit Vehicle',
      editDescription: "Update the vehicle's details.",
      resident: 'Resident',
      residentPlaceholder: 'Select a resident',
      type: 'Vehicle Type',
      brand: 'Brand',
      model: 'Model',
      color: 'Color',
      licensePlate: 'License Plate',
      submitAdd: 'Add Vehicle',
      submitEdit: 'Save Changes',
      toast: {
        addSuccess: 'New vehicle has been added.',
        editSuccess: 'Vehicle data has been updated.',
      }
    }
  },
};
export default en;
