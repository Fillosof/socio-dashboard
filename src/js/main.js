// 
// snap score
// loops
var app = new Vue ({
    el: '#main',
    data: {
        tracks: [
            {
                accID: 1,
                socialName: 'Facebook',
                accName: '@abhisek.daas',
                accImgPath: 'images/1.png' ,
                followers: 1701,
                difference: 4
            }, {
                accID: 2,
                socialName: 'Twitter',
                accName: '@wholetthedasout',
                accImgPath: 'images/4.png' ,
                followers: 1567,
                difference: -3
            },{
                accID: 3,
                socialName:  'Instagram',
                accName: '@wholetthedasout',
                accImgPath: 'images/3.jpg' ,
                followers: 1139,
                difference: 11
            },{
                accID: 4,
                socialName: 'LinkedIn',
                accName: '@abhisek.daas',
                accImgPath: 'images/1.png',
                followers: 2016,
                difference: 39
            },{
                accID: 5,
                socialName: 'YouTube' ,
                accName: '@TheAbhisekD',
                accImgPath: 'images/2.jpg' ,
                followers: 3190,
                followersName: 'subscribers',
                difference: 22
            },{
                accID: 6,
                socialName: 'Snapchat',
                accName: '@abhisekd',
                accImgPath: 'images/3.jpg' ,
                followers: 8754,
                followersName: 'snap score',
                difference: 200
            },{
                accID: 7,
                socialClass: 'googleplus',
                socialName: 'Google+',
                accName: '@+AbhisekDas',
                accImgPath: 'images/3.jpg' ,
                followers: 1033,
                difference: -15
            },{
                accID: 8,
                socialName: 'Vine',
                accName: '@1316139228245221376',
                accImgPath: 'images/5.jpg' ,
                followersName: 'loops',
                followers: 1045
            },
        ]
    },
    methods: {
        formatFollowers(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    }
})