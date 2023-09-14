module.exports = {
    name: 'ExpenseTracker',
    publisher: 'Sample',
    cards: [{
        type: 'ExpenseTrackerCard',
        source: './src/cards/ExpenseTrackerCard',
        title: 'ExpenseTracker Card',
        displayCardType: 'ExpenseTracker Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};