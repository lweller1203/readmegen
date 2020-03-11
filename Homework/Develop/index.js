const inquirer = require("inquirer");
const fs = require('fs'); 
const axios = require("axios")
console.log("GitHub ReadMe Generator")
console.log("-------------------------")
const responseArray = []
inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub user name?",
            name: "Username"
        }

    ])
    .then(function (response) {
        console.log('https://api.github.com/users/'+ response.Username + '/repos')
        axios.get('https://api.github.com/users/'+ response.Username + '/events/public')
        .then(function (result) {
           
            

            //email
            console.log('GitHub Email: ', result.data[1].payload.commits[0].author.email);
            let userEmail = result.data[1].payload.commits[0].author.email
            //profile pic
            console.log('Avatar URL: ', result.data[0].actor.avatar_url)
            let avatarPic = result.data[0].actor.avatar_url
            responseArray.push("User email: "+userEmail, "Avatar URL:"+avatarPic)
            
                inquirer
                    .prompt([
                    {
                        type: "input",
                        message: "Project title:",
                        name: "Title"
                    },
                    {
                        type: "input",
                        message: "Project description:",
                        name: "Description"
                    },
                    {
                        type: "input",
                        message: "Project version:",
                        name: "Version"
                    },
                    {
                        type: "input",
                        message: "Usage:",
                        name: "Usage"
                    },
                    {
                        type: "input",
                        message: "License:",
                        name: "License"
                    },
                    {
                        type: "input",
                        message: "Author(s):",
                        name: "Author"
                    },
                    {
                        type: "input",
                        message: "Test scripts:",
                        name: "Scripts"
                    },
                    {
                        type: "input",
                        message: "Questions:",
                        name: "Questions"
                    },
                ])

                .then(function(secResponse){
                    responseArray.push(secResponse)
                    console.log(responseArray)
                    fs.writeFile(secResponse.Title+'readme.md', JSON.stringify(responseArray, null, 4), function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                      }); 
                })
        })
        .catch(function (error) {
            console.log(error);
        });
        
    });
