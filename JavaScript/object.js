let students = [
    {name: 'Remy', cohort: 'Jan'},
    {name: 'Genevieve', cohort: 'March'},
    {name: 'Chuck', cohort: 'Jan'},
    {name: 'Osmund', cohort: 'June'},
    {name: 'Nikki', cohort: 'June'},
    {name: 'Boris', cohort: 'June'}
];

function showStudents() {
    for (var student of students){
        console.log('Name: '+student.name+',', 'Cohort: '+student.cohort);
    };
};

showStudents(students);

let users = {
    employees: [
        {'first_name':  'Miguel', 'last_name' : 'Jones'},
        {'first_name' : 'Ernie', 'last_name' : 'Bertson'},
        {'first_name' : 'Nora', 'last_name' : 'Lu'},
        {'first_name' : 'Sally', 'last_name' : 'Barkyoumb'}
    ],
    managers: [
       {'first_name' : 'Lillian', 'last_name' : 'Chambers'},
       {'first_name' : 'Gordon', 'last_name' : 'Poe'}
    ]
 };

 function showUsers() {
     for (key in users) {
         console.log(key.toUpperCase());
         for (i=0; i < users[key].length; i++){
             num = i + 1;
             fname = users[key][i].first_name;
             lname = users[key][i].last_name;
             length = fname.length + lname.length;
             console.log(num+' - '+lname+', '+fname+' - '+length)
         }

     }
 }

 showUsers(users);