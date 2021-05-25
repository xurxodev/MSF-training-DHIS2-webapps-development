
# MSF training DHIS2 webapps development - session 1

-   We are going to practice Dhis2 apps Development using React and Clean Architecture.
-   Clean Architecture is a way of structuring code.
-   It's necessary a dhis2 server instance
-   The current code has been brought from the skeleton app

## Training requirements 

- We need to be able to list some org units of until three levels
- We need to be able to click in a org unit and show a detail panel with name and openingDate
- Every org unit has a computed data type where:
    * Level 1 -> value is "Primary"
    * Level 2 -> value is "Secondary"
    * Level 3 -> value is "Tertiary"
    * Level 4-> value is “Quaternary"
- Only users with authority All (Full authority) can see details of all levels (1,2,3,4)
- Users without authority All (Full authority) can see details of levels 1 y 2

- Analyze the requirements to identify entities, use cases and repositories to create and where set the logic.


## Development

 - UI will be development in the new training page
 - From the current code you only can to use the composition root and new training page
 - Create al css styles in TrainingPage.css. Style creation will change in the future sessions to other approaches
 - All data is fake in memory.
 - The data origin will change in the future sessions to consume a remote API.
 - In this sessión we are not going to use Material-UI, use standard html tags ul, li, div, span what you want
 - The created components will change in the future sessions to use Material-UI and Eyeseetea libraries

## Screenshots

<img width="1440" alt="training_session1_1" src="https://user-images.githubusercontent.com/5593590/119477917-ac8e3900-bd4f-11eb-8374-c75036d1bc7f.png">
<img width="1440" alt="training_session1_2" src="https://user-images.githubusercontent.com/5593590/119477944-b2841a00-bd4f-11eb-8c74-05259cc50f48.png">

