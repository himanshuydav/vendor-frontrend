
const  VP_SIDEBAR_UL = [
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
                path: 'invoice-listing',
                ref: 'user',
            },
        


        ]
    },
    {
        id: 4,
        label: 'Report',
        ref: 'dash',
        activelogo: <i className="mdi mdi-receipt menu-icon" />,
        nonactivelogo: "",
        path: '/report'
    }, 
  
]

export default VP_SIDEBAR_UL;