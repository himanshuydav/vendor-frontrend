
const  FINANCE_SIDEBAR_UL = [
    {
        id: 1,
        label: 'Home',
        ref: 'dash',
        activelogo: <i className="mdi mdi-home menu-icon" />,
        nonactivelogo: "",
        path: '/'
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
    }
]

export default FINANCE_SIDEBAR_UL;