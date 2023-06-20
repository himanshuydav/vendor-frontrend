

const  VEND_SIDEBAR_UL = [
    {
        id: 1,
        label: 'Home',
        ref: 'dash',
        activelogo: <i className="mdi mdi-home menu-icon" />,
        nonactivelogo: "",
        path: '/vendor-dashboard'
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
        activelogo:<i className="mdi mdi-account-multiple menu-icon" />,
        nonactivelogo: "",
        path: '#',
        sublist: [    
            // {
            //     id: 1,
            //     label: 'Create Invoice',
            //     path: 'vendor-create-invoice',
            //     ref: 'user',
            // },
            {
                id: 1,
                label: 'Invoice Listing',
                path: 'invoice-listing',
                ref: 'user',
            },
        


        ]
    },

   


  
]

export default VEND_SIDEBAR_UL;