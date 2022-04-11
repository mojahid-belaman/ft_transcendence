export let users = [
    {
        id: "1c25025e-b656-11eb-8529-0242ac130003",
		avatar:"avatar1",
		status:false,
        name: "shikma",
        password:"password1",
    },
    {
        id: "1c2504f2-b656-11eb-8529-0242ac130003",
		avatar:"avatar2",
		status:true,
        name: "aboulbaz",
		password:"password2",
    },
    {
        id: "1c2505d8-b656-11eb-8529-0242ac130003",
        avatar:"avatar3",
		status:true,
        name: "knabouss",
		password:"password3",
    },
    {
        id: "1c250696-b656-11eb-8529-0242ac130003",
        avatar:"avatar4",
		status:true,
        name: "mbeleaman",
		password:"password4",
    }
]

export let channels = [
    {
        id: "9c9324e8-b656-11eb-8529-0242ac130003",
        name: "General",
        usersId:["1c25025e-b656-11eb-8529-0242ac130003","1c2504f2-b656-11eb-8529-0242ac130003","1c2505d8-b656-11eb-8529-0242ac130003"]
    },
    {
        id: "1c250754-b656-11eb-8529-0242ac130003",
        name: "Announcement",
        usersId:["1c2505d8-b656-11eb-8529-0242ac130003","1c250696-b656-11eb-8529-0242ac130003"],
    }
]