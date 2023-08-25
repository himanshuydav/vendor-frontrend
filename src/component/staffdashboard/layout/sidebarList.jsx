
const SIDEBAR_UL = [
    {
        id: 1,
        label: 'Home',
        ref: 'dash',
        activelogo: <i className="mdi mdi-home menu-icon" />,
        nonactivelogo: "",
        path: '/'
    },

    {
        id: 2,
        label: 'Purchase Contract',
        ref: 'Contract',
        activelogo:<i className="mdi mdi-account-multiple menu-icon" />,
        nonactivelogo: "",
        path: '#',
        sublist: [


            {
                id: 1,
                label: 'Create',
                path: '/add-excutive-contract',
                ref: 'user',

            },

            {
                id: 2,
                label: 'Listing',
                path: 'contract-listing',
                ref: 'user',
            },
        ]
    },
    {
        id: 3,
        label: 'Bill',
        ref: 'Invoice',
        activelogo:<i className="mdi mdi-comment-processing menu-icon" />,
        nonactivelogo: "",
        path: '#',
        sublist: [    
          
            {
                id: 1,
                label: 'Listing',
                path: 'invoice-list',
                ref: 'user',
            },
        


        ]
    },
]

export default SIDEBAR_UL;