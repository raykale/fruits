const React = require('react')

function Show(props){
    return(
        <div>
            <h1>{props.fruit.name}</h1>
            <a href='/fruits'>Go back to Index Page</a>
            <p>
                The {props.fruit.name} is {props.fruit.color} and {props.fruit.readyToEat? 'It is ready to eat': 'It is not ready to eat'}
            </p>
        </div>
    )
}

module.exports = Show