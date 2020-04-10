# Dynamic-signUp-page
Responsive SignUp page connecting nodejs and MongoDB


<h2>Functionality Specs:</h2>
    <p>> Dynamic signUp page that depend on user's click</p>
    <p>> Add questions to the page based on category</p>

<h2>Work flow :</h2>
    <p>> Make a post request to home route on user's submitting the form</p>
    <p>> If password do not match or some error occurs , it redirects to failure route</p>
    <p>> If everything went good, it will create object of category(designer or maker) and 
         a object of user with user's filled category</p>
    <p>> The data are saved to mongoDB atlas cloud</p>
    <p>> The colloctions of users can be seen by going to Home-url"/content" to see users signedUp
           (This is just for confirmation that user signed up successfully to database )</p>
