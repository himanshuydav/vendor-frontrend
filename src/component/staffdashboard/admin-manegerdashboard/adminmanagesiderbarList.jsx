
const  MANAGER_SIDEBAR_UL = [
    {
        id: 1,
        label: 'Home',
        ref: 'dash',
        activelogo: <i className="mdi mdi-home menu-icon" />,
        nonactivelogo: "",
        path: '/admin-manager-dashboard'
    },

    {
        id: 2,
        label: 'Contract',
        ref: 'Contract',
        activelogo:<i className="mdi mdi-account-multiple menu-icon" />,
        nonactivelogo: "",
        path: '#',
        sublist: [
            {
                id: 1,
                label: 'Add Contract Form',
                path: '/add-manager-contract',
                ref: 'user',

            },
            
            {
                id: 1,
                label: 'Contract List',
                path: 'contract-list',
                ref: 'user',
            },
        


        ]
    },
    {
        id: 3,
        label: 'Invoice',
        ref: 'Invoice',
        activelogo:<i className="mdi mdi-comment-processing menu-icon" />,
        nonactivelogo: "",
        path: '#',
        sublist: [    
          
            {
                id: 1,
                label: 'Invoice Listing',
                path: 'invoice-listing',
                ref: 'user',
            },
        


        ]
    },
    {
        id: 4,
        label: 'aproval flow',
        ref: 'dash',
        activelogo: <i className="mdi mdi-directions-fork menu-icon" />,
        nonactivelogo: "",
        path: '/approval-flow'
    }, 
]

export default MANAGER_SIDEBAR_UL;