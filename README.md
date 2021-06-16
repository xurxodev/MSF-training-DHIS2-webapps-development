
# DHIS2 webapps development - MSF training - Session 1

-   DHIS2 web application development using React and Clean Architecture.
-   Clean Architecture is a way of structuring and organising the code.
-   You will need a DHIS2 server instance up and running with CORS enabled for the localhost:8080
-   The current code has been brought from the EST skeleton app (https://github.com/EyeSeeTea/dhis2-app-skeleton)

## Requirements 

- List org units until level 4 (Fake data, not retrieving from the DHIS2 instance for now)
- When clicking on a organization unit show a detail panel with name and opening date
- Every organisation unit has a computed data type where:
    * Level 1 -> value is "Primary"
    * Level 2 -> value is "Secondary"
    * Level 3 -> value is "Tertiary"
    * Level 4 -> value is “Quaternary"
- If a user (fake) has authority ALL (Full authority) he can see the details at all levels (1,2,3,4)
- If a user (fake) does not have authority All (Full authority) he can see details at levels 1 and 2
- Analyze the requirements to identify entities, use cases and repositories. Create the relevant files and implement the logic.


## Development

 - UI to be developed in the new training page
 - There are some components and files you do not need to use in this first session. Just focus on the composition root and the new training page.
 - Create css styles in TrainingPage.css. Style creation will change in the future sessions to other approaches
 - All data is fake in memory. For now, we will not use the DHIS2 instance (API)
 - The data origin will change in future sessions to consume from a remote API.
 - In this session, we are using Material-UI. Use instead standard html tags: ul, li, div, span, etc.
 - Components developed in this session will evolve in .future sessions. We will be using Material-UI and EyeSeeTea libraries

## Screenshots

<img width="1440" alt="training_session1_1" src="https://user-images.githubusercontent.com/5593590/119477917-ac8e3900-bd4f-11eb-8374-c75036d1bc7f.png">
<img width="1440" alt="training_session1_2" src="https://user-images.githubusercontent.com/5593590/119477944-b2841a00-bd4f-11eb-8c74-05259cc50f48.png">

