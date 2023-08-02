import random
import csv

# Create a list of tasks
tasks = []
names = [
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
]


# Generate random data for each task
for i in range(10):
  task = {}
  task['user'] = random.randint(1,3)
  task['teamSize'] = random.randint(1, 10)
  task['Budget'] = random.randint(1, 100000)
  task['Workload'] = random.randint(1,3)
  task['completionTime'] = random.randint(1, 100)
  task['description'] = random.choice(['write a blog post', 'design a website', 'create a presentation', 'build a mobile app'])
  task['complete'] = random.randint(0, 1)
  task['personAssigned'] = random.choice(names)
  task['dueDate'] = random.choice(['today', 'tomorrow', 'next week', 'next month', 'next year'])
  task['estimatedDuration'] = random.choice(['1 hour', '2 hours', '3 hours', '4 hours', '6 hours', '12 hours', '24 hours', '48 hours', '72 hours', '1 week', '2 week', '4 week'])

  # Add the task to the list
  tasks.append(task)

# Create a CSV file with the data
with open('tasks.csv', 'w', newline='') as f:
  writer = csv.writer(f)
  writer.writerow(['user', 'teamSize', 'Budget', 'Workload', 'completionTime', 'description', 'complete', 'personAssigned', 'dueDate', 'estimatedDuration'])
  for task in tasks:
    writer.writerow([task['user'], task['teamSize'], task['Budget'], task['Workload'], task['completionTime'], task['description'], task['complete'], task['personAssigned'], task['dueDate'], task['estimatedDuration']])
