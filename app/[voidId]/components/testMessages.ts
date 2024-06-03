export type MessageType = {
    id: number,
    datetime: string,
    message: string,
    replied?: number,
}

const testMessages: MessageType[] = [
    {
        id: 1,
        datetime: '20/04/24 16:38',
        message: "This is an example message"
    },
    {
        id: 2,
        datetime: '20/04/24 16:40',
        message: "This is another example message"
    },
    {
        id: 3,
        datetime: '20/04/24 16:40',
        message: "This one is supposed to be a really long example message but i dont know what i should write here...fuck you maybe"
    },
    {
        id: 4,
        datetime: '20/04/24 16:41',
        message: "Water, \nFire, \nEarth, \nAir... \nLong ago, the four nations lived together in harmony, but everything changed when the Fire Nation attacked. \nOnly the Avatar, master of all our elements could stop them...but when the world needed him the most, he vanished"
    },
    {
        id: 5,
        datetime: '20/04/24 16:42',
        message: "Story for the gods, my bro lol"
    },
    {
        id: 6,
        datetime: '20/04/24 16:46',
        message: "Fuck you fr"
    },
    {
        id: 7,
        datetime: '20/04/24 16:47',
        message: "Blud is pained lol"
    },
    {
        id: 8,
        datetime: '20/04/24 16:49',
        message: "Nobody's reading allat my guy",
        replied: 4,
    },
    {
        id: 9,
        datetime: '20/04/24 16:50',
        message: "With all due respect, i just want to say \n \n \nFuck y'all sincerely"
    },
    {
        id: 10,
        datetime: '20/04/24 16:59',
        message: "Koshi danu jare"
    },
    {
        id: 11,
        datetime: '20/04/24 17:02',
        message: "What of this girl na..."
    },
    {
        id: 12,
        datetime: '20/04/24 17:02',
        message: "Which girl?"
    },
    {
        id: 13,
        datetime: '20/04/24 17:04',
        message: "The one that dropped out abi?",
        replied: 11
    },
    {
        id: 14,
        datetime: '20/04/24 17:05',
        message: "Ohh okayy \nThat one na long story lol",
        replied: 13
    },
    {
        id: 15,
        datetime: '20/04/24 17:07',
        message: "We get time boss...start to dey narrate everything"
    },
    {
        id: 16,
        datetime: '20/04/24 17:08',
        message: "Una too like amebo for this department ehh"
    },
]

export default testMessages