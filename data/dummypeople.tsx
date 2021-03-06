import React from 'react';

const people = [
    {
        id: '1',
        name: 'Randy Myers',
        email: '',
        pseudonym: 'AnnonymousTexan',
        avatar: { uri: 'https://scontent.fhou1-2.fna.fbcdn.net/v/t1.6435-9/100657069_10222349946436703_2222904085466578944_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=LWvZcDEKGwcAX9em-6Y&_nc_ht=scontent.fhou1-2.fna&oh=927973b953b559de666741e10658d9bf&oe=608F40FF'},
        gender: 'male',
        dob: '',
        bio: 'Houston based writer. I usually stick with science fiction and mystery, but also dabble in the occasional fan fiction.',
        following: [],
        followers: [],
        narrations: ['1', '2'],
        author: ['3', '5'],
        finishedStory: [],
        liked: [],
        queued: [],
    },
    {
        id: '2',
        name: 'Meghan Rowell',
        email: '',
        pseudonym: 'Gallway Girl',
        avatar: { uri: 'https://scontent.fhou1-1.fna.fbcdn.net/v/t1.6435-9/32472017_10215935054428412_7195700697759744000_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_ohc=UDkkXSOjkwAAX9fUYJU&_nc_ht=scontent.fhou1-1.fna&oh=423b909ff19edbcd11c06471093ec467&oe=6090ED77'},
        gender: 'female',
        dob: '',
        bio: 'Houston based writer. I usually stick with science fiction and mystery, but also dabble in the occasional fan fiction.',
        following: [],
        followers: [],
        narrations: [],
        author: [],
        finishedStory: [],
        liked: [],
        queued: [],
    },
    {
        id: '3',
        name: 'Quinn Francis',
        email: '',
        pseudonym: 'Princess Power',
        avatar: { uri: 'https://scontent.fhou1-1.fna.fbcdn.net/v/t1.6435-9/29101575_10215437041458399_7738715968498565120_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=174925&_nc_ohc=kbL__650swwAX9400q8&_nc_ht=scontent.fhou1-1.fna&oh=e0aa3ac5c24a3b1169ed427dd3e7c418&oe=60907525'},
        gender: 'female',
        dob: '',
        bio: 'Houston based writer. I usually stick with science fiction and mystery, but also dabble in the occasional fan fiction.',
        following: [],
        followers: [],
        narrations: [],
        author: [],
        finishedStory: [],
        liked: [],
        queued: [],
    },
    {
        id: '4',
        name: 'Jon Wayne',
        email: '',
        pseudonym: 'Jack of The Sea',
        avatar: { uri: 'https://scontent.fhou1-2.fna.fbcdn.net/v/t31.18172-8/16707340_10211837536233018_5184762119056915230_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=174925&_nc_ohc=Pw88fiZZ6zcAX8jbEpa&_nc_ht=scontent.fhou1-2.fna&oh=7002dddf6bce3caf0b8a8b37321f1847&oe=6090F555'},
        gender: 'male',
        dob: '',
        bio: 'Houston based writer. I usually stick with science fiction and mystery, but also dabble in the occasional fan fiction.',
        following: [],
        followers: [],
        narrations: [],
        author: [],
        finishedStory: [],
        liked: [],
        queued: [],
    },
    {
        id: '5',
        name: 'Luke Linzy',
        email: '',
        pseudonym: 'Big Playa',
        avatar: { uri: 'https://scontent.fhou1-2.fna.fbcdn.net/v/t31.18172-8/13938196_10210013567394937_1305955137072413861_o.jpg?_nc_cat=107&ccb=1-3&_nc_sid=174925&_nc_ohc=lJvxDlCylVAAX_ESR9V&_nc_ht=scontent.fhou1-2.fna&oh=fe14bf4ac32fd0b606bf84cb35d5334d&oe=60902858'},
        gender: 'male',
        dob: '',
        bio: 'Houston based writer. I usually stick with science fiction and mystery, but also dabble in the occasional fan fiction.',
        following: [],
        followers: [],
        narrations: [],
        author: [],
        finishedStory: [],
        liked: [],
        queued: [],
    },
    {
        id: '6',
        name: 'Mikey J',
        email: '',
        pseudonym: 'Boy Genius',
        avatar: { uri: 'https://scontent-dfw5-1.xx.fbcdn.net/v/t31.18172-8/14067782_10210013470992527_5257352865464052836_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=174925&_nc_ohc=iM7S75Lik7sAX9WQP_9&_nc_ht=scontent-dfw5-1.xx&oh=67b78bd4153ec4fd87e76e334c659493&oe=6090F9C5'},
        gender: 'male',
        dob: '',
        bio: 'Houston based writer. I usually stick with science fiction and mystery, but also dabble in the occasional fan fiction.',
        following: [],
        followers: [],
        narrations: [],
        author: [],
        finishedStory: [],
        liked: [],
        queued: [],
    },
    {
        id: '7',
        name: 'Danni Bustle',
        email: '',
        pseudonym: 'Pamela Anderson',
        avatar: { uri: 'https://scontent.fhou1-1.fna.fbcdn.net/v/t1.18169-9/10730946_10205178994453635_1882738961056628879_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=174925&_nc_ohc=GsvdfFQ8J9oAX-szSMz&_nc_ht=scontent.fhou1-1.fna&oh=cf4d5a7ae5719a479372452ce7ca3e27&oe=608E8A2B'},
        gender: 'female',
        dob: '',
        bio: 'Houston based writer. I usually stick with science fiction and mystery, but also dabble in the occasional fan fiction.',
        following: [],
        followers: [],
        narrations: [],
        author: [],
        finishedStory: [],
        liked: [],
        queued: [],
    },
    {
        id: '8',
        name: 'Perry Winkle',
        email: '',
        pseudonym: 'Annonymous',
        avatar: { uri: 'https://scontent.fhou1-1.fna.fbcdn.net/v/t1.18169-9/10171799_10205179020894296_8541458448214294292_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=174925&_nc_ohc=5ffHhSv0tWUAX_gZCL3&_nc_ht=scontent.fhou1-1.fna&oh=1abc413be7eb07c0b974908a43c364fb&oe=609119B5'},
        gender: 'male',
        dob: '',
        bio: 'Houston based writer. I usually stick with science fiction and mystery, but also dabble in the occasional fan fiction.',
        following: [],
        followers: [],
        narrations: [],
        author: [],
        finishedStory: [],
        liked: [],
        queued: [],
    },
    {
        id: '9',
        name: 'Kyle Flannery',
        email: '',
        pseudonym: 'Baba ORiely',
        avatar: { uri: 'https://scontent.fhou1-1.fna.fbcdn.net/v/t31.18172-8/13958205_10210013527793947_20303793584704448_o.jpg?_nc_cat=106&ccb=1-3&_nc_sid=174925&_nc_ohc=sdPwYj1RrVkAX9-zkVG&_nc_ht=scontent.fhou1-1.fna&oh=d364d42031a3888cb35948358f440625&oe=6091D280'},
        gender: 'male',
        dob: '',
        bio: 'Houston based writer. I usually stick with science fiction and mystery, but also dabble in the occasional fan fiction.',
        following: [],
        followers: [],
        narrations: [],
        author: [],
        finishedStory: [],
        liked: [],
        queued: [],
    },
]

export default people;