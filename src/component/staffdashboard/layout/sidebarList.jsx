
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
        label: 'Contract',
        ref: 'Contract',
        activelogo:<i className="mdi mdi-account-multiple menu-icon" />,
        nonactivelogo: "",
        path: '#',
        sublist: [


            {
                id: 1,
                label: 'Add Contract Form',
                path: '/add-excutive-contract',
                ref: 'user',

            },

            {
                id: 2,
                label: 'Contract List',
                path: 'contract-listing',
                ref: 'user',
            },
        ]
    }, 
]

export default SIDEBAR_UL;