const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Create a list of tasks
let tasks = [];
const names = [
  'Emma Johnson',
  'Noah Smith',
  'Olivia Brown',
  'Liam Davis',
  'Ava Miller',
  'Isabella Wilson',
  'Sophia Moore',
  'Mason Taylor',
  'Charlotte Anderson',
  'Elijah Thomas',
  'Amelia Jackson',
  'Harper White',
  'Ethan Harris',
  'Henry Martin',
  'Luna Thompson',
  'Alexander Garcia',
  'James Martinez',
  'Benjamin Robinson',
  'Sebastian Clark',
  'Michael Rodriguez',
  'Daniel Lewis',
  'Logan Lee',
  'Jackson Walker',
  'William Hall',
  'Gabriel Young',
  'David Hill',
  'Joseph Adams',
  'Samuel Nelson',
  'Carter Mitchell',
  'Owen Roberts',
  'Emily Turner',
  'Sofia Phillips',
  'Abigail Campbell',
  'Mia Parker',
  'Evelyn Evans',
  'Harper Richardson',
  'Camila Kelly',
  'Aria Cox',
  'Scarlett Murphy',
  'Victoria Rivera',
  'Madison Brooks',
  'Layla Gray',
  'Penelope James',
  'Aurora Watson',
  'Victoria Brooks',
  'Grace Bennett',
  'Zoey Wright',
  'Bella Reed',
  'Aubrey Mitchell',
  'Addison Lopez',
  'Lucy Price',
  'Lillian Simmons',
  'Nora Jenkins',
  'Skylar Perry',
  'Ellie Long',
  'Brooklyn Hughes',
  'Zoe Foster',
  'Stella Sanders',
  'Leah Ross',
  'Hannah Morris',
  'Shiloh Butler',
  'Elizabeth Ramirez',
  'Naomi Hayes',
  'Lyla Sanders',
  'Lily Collins',
  'Madelyn Russell',
  'Samantha Diaz',
  'Ariana Ortiz',
  'Allison Barnes',
  'Genesis Coleman',
  'Savannah Sullivan',
  'Madeline Thompson',
  'Caroline Powell',
  'Maya Watson',
  'Ruby Bryant',
  'Hailey Hughes',
  'Eva Ross',
  'Aaliyah Flores',
  'Taylor Bryant',
  'Autumn Powell',
  'Nevaeh Adams',
  'Serenity Reed',
  'Piper Gray',
  'Arianna Collins',
  'Eleanor Bennett',
  'Kylie Ward',
  'Faith Howard',
  'Harmony Cox',
  'Eliza Reed',
  'Giselle Coleman',
  'Isabelle Stewart',
  'Melanie Price',
  'Valeria Turner',
  'Gabrielle Patterson',
  'Quinn James',
  'Clara Flores',
  'Delilah Ward',
  'Reagan Simmons',
  'Hadley Collins',
  'London Butler',
  'Leighton Peterson',
];

const user = [
  'me@123', 's@gmail.com', 'bob@gmail.com'
]


// Generate random data for each task
for (let i = 0; i < 1000; i++) {
  let task = {};
  task.user = user[Math.floor(Math.random() * user.length)]
  task.teamSize = Math.floor(Math.random() * 10) + 1;
  task.Budget = Math.floor(Math.random() * 100000) + 1;
  task.Workload = Math.floor(Math.random() * 3) + 1;
  task.completionTime = Math.floor(Math.random() * 100) + 1;
  task.description = ['write a blog post', 'design a website', 'create a presentation', 'build a mobile app'][Math.floor(Math.random() * 4)];
  task.complete = Math.floor(Math.random() * 2);
  task.personAssigned = names[Math.floor(Math.random() * names.length)];
  task.dueDate = ['today', 'tomorrow', 'next week', 'next month', 'next year'][Math.floor(Math.random() * 5)];
  task.estimatedDuration = ['1 hour', '2 hours', '3 hours', '4 hours', '6 hours', '12 hours', '24 hours', '48 hours', '72 hours', '1 week', '2 week', '4 week'][Math.floor(Math.random() * 12)];

  // Add the task to the list
  tasks.push(task);
}

// Create a CSV file with the data
const csvWriter = createCsvWriter({
  path: 'tasks.csv',
  header: [
    { id: 'user', title: 'user' },
    { id: 'teamSize', title: 'teamSize' },
    { id: 'Budget', title: 'Budget' },
    { id: 'Workload', title: 'Workload' },
    { id: 'completionTime', title: 'completionTime' },
    { id: 'description', title: 'description' },
    { id: 'complete', title: 'complete' },
    { id: 'personAssigned', title: 'personAssigned' },
    { id: 'dueDate', title: 'dueDate' },
    { id: 'estimatedDuration', title: 'estimatedDuration' }
  ]
});

csvWriter.writeRecords(tasks)
  .then(() => console.log('CSV file created successfully'))
  .catch((error) => console.error(error));
