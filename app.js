import express from 'express';
const app = express();

// use Express JSON middleware
app.use(express.json())

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
        status: 'Successful',
        data: courses
    })
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {res.status(404).send({
            status: 'Failed',
            message: 'The course with given ID was not found'
        })
        return;
    }
    res.status(200).send({
        status: 'Successful',
        data: course
    })
});

app.post('/api/courses', (req,res) => {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send({
            status: 'Failed',
            message: 'Course name is required and should be a minimum of 3 characters'
        });
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.status(200).send({
        status: 'Successful',
        data: course
    });
});


app.put('/api/courses/:id', (req, res) => {
    // look up the course, if does not exist, return status 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
            res.status(404).send({
            status: 'Failed',
            message: 'The course with given ID was not found'
        })
        return;
    }

    // validate the course body, if invalid, return status 400
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send({
            status: 'Failed',
            message: 'Course name is required and should be a minimum of 3 characters'
        });
        return;
    }
    
    // update the course
    course.name = req.body.name;
    // return upated course
    res.status(200).send({
        status: 'Successful',
        data: course
    });
    
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
            res.status(404).send({
            status: 'Failed',
            message: 'The course with given ID was not found'
        })
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.status(200).send({
        status: 'Successful',
        message: `${course.name} has been deleted`
    });

});

module.exports = app;
