# BC-FEATURE-REQUESTS-CLIENT

This is a demo use of [BC-FEATURE-REQUESTS](https://github.com/kujtimiihoxha/bc-feature-requests) API.

Live demo at [bc.kujtimhoxha.com](http://bc.kujtimhoxha.com)

## Technologies
All the technologies used on this project are open source projects.

 - Angular 2 - Very fast javascript framework.
 - MaterializeCss - Material design css framework.
 
 For project setup [angular2-seed](https://github.com/mgechev/angular2-seed) was used.
 
## Installation
 Clone the repository and npm install.
 ```
 git clone https://github.com/kujtimiihoxha/bc-feature-requests-client
 cd bc-feature-requests-client
 npm install
 ```

## Run the app.
 To run the app you need to set the api endpoint.
 The api settings are configured on the base.ts configulration file.
 ```
 |- bc-feature-requests-client/
 |    |- tools/
 |    |   |- env/
 |    |   |   |- base.ts
 ```
 
 By default the api is set to ```http://kujtimhoxha.com:8084/api/v1```
 ```
 import {EnvConfig} from './env-config.interface';
 
 const BaseConfig: EnvConfig = {
   // Sample API url
   API: 'http://kujtimhoxha.com:8084/api/v1/'
 };
 
 export = BaseConfig;
 
 ```
 
 If you don't want to use this api endpoint Change **API**.
 After the API is set run:
 
 ```
 npm start
 ```
 This will start a live reload server and you can login to the application.
 
 To build a production build you need to run:
 ```
 npm run build.prod
 ```
# Features
- Very responsive UI with modern material design.
- Very fast, this project uses the bleeding edge javascript framework Angular2.
- Very easy to deploy all the necessary work is done using npm, the only thing left is copying the generated production files to the server. In production mode all the files will be compressed.
- Completely decoupled from the backend. To change the api endpoint only one configuration needs to be edited.
- Test suite and CI [TODO] (testing is configured)
- Highly documented source code.

## App Specific Features
- User registration with email verification. (easily configurable email service in the backend)
- Feature requests with more than one client - this allows the company to track feature requests
that are required by multiple clients. Clients are add to the feature in the create wizard by drag and drop angular2 components.
- Feature request history, every change that is made to the feature request(ticked) is tracked and is shown in the history panel.
- Feature request discussions(comments) employs can comment on the feature request and communicated with each other.
- Open/Close feature request status.
- Basic Clients CRUD
- Basic Product Area CRUD
- Admin/Employ role management.

### Filtering Sorting.
- Very powerful filtering and sorting.
This project allows the user to filter by multiple parameters and cascade filters to get the feature request you are looking fore.
 
**Filter By:**
   - Open/Close
   - Client
   - Product area
   - Employ (who submitted the feature request)
   - Priority Ascending/Descending (If client filter is selected)

All this filters can be cascaded so _for ex. you can filter the feature request like:_

Show the feature request that are submitted by **employ1** and are **open** and are in the **billing** area.

This is just one example of the possible filters. The filters are very user friendly to apply and are based on drop down menus with searchable lists.

Priority filter is based on the client selected.

**Sorting**
  
 - Recently Updated
 - Least Recently Updated
 - Newest
 - Oldest
 - Target Date Descending
 - Target Date Ascending
 - By title ascending
 - By title descending
 
### Priority
Priority of the feature is stored based on the client, if many clients have the same feature request any client can have their priority for the specific feature request.

Feature request priority is unique for the client, if a feature request is submitted with a priority that already exists all the other priorities are reordered, this works with a 'free slot' logic, for ex.

If a client has 2 feature request  one with priority 4 the other with priority 2 and he requests a new feature and sets the priority to 2 the feature request with priority 2 will be shifted to 3 and the new one will get the priority 2, the priority 4 is not changed because
between priority 2 and 4 there was a free 'slot'(3), this shifting continues until all the 'slots' are taken.


##Folder structure
 ```
 |- bc-feature-requests-client/
 |    |- src/                               
 |    |    |- client/                                 The app source
 |    |    |    |- app/                               The app main
 |    |    |    |- assets/                            External assets
 |    |    |    |- css/                               Global css
 |    |    |    |- fonts/                             Fonts
 |    |    |    |- index.html                         App entry
 |    |    |    |- tsconfig.json                      Typescript configurations
 |    |    |    |- typings.c.ts                       Typescript typings
  |    |- tools/                                      Seed tools/configurations 
  |    |- gulpfile.ts                                 Task runner configurations
  |    |- karma.config.js                             Karma unit tests configurations
  |    |- package.json                                Package manager configurations
  |    |- protactor.config.js                         E2E testing configurtions
  |    |- tsconfig.json                               Typescript configurations
  |    |- tslint.json                                 Typescript linting configurations
  |    |- typings.json                                Typings package dependencies
```

