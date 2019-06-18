import express from 'express';
const app = express();

const courses = [
    {id: 1, name: 'Java Fundamentals'},
    {id: 2, name: 'PHP/Laravel Fundamentals'},
    {id: 3, name: 'Ruby on Rails Framework'}
]
app.get('/', (req, res) => {
    res.send('Helloworld!')
});

app.get('/api/courses', (req, res) => {
    res.status(200).send({
        data: courses,
        message: 'Successful'
    })
});

app.get('/api/courses/:id', (req, res) => {
    // res.status(200).send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given ID was not found')
    res.status(200).send({
        data: course,
        message: 'Successful'
    })
});

// app.post();
// app.put();
// app.delete();


// app is only one exported. No need to export as an object as below
// module.exports.app = app;

// instead export as single function
module.exports = app;
