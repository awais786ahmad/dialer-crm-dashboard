# Dialer CRM Dashboard

Fetch my Project named quality-dial-crm from github and compelte teh Dashboard shared components , Use the following details as refernce, 
Follow the currentt projects UI and theme and design 

AppShell

A collapsable sidebar that will be collapsed by default user can close it by clicking an icon button on top, 

on collapse mode when user hover over the sidebar it will open liek a drawer without disturbing the inner component

on open mode the inner component wil adjust accordingly

At the Top of the sidebar there is a logo of quality dial 

it will have the options Dashboard, CRM & Leads, Calling, Campaigns, Inbox, Reports & Analytics, Organization, Settings

Each option will be an accordion at a time one accordion will open and rest will close with proper transtion

CRM & Leads ( Segments, Leads, Tags, Tasks, Data table, Scripts, Templates )

Calling ( Dailer, Live, History ) 

Organization ( Workspace Settings, Teams, Members, Roles & Permissions, AI Agents ) 

Settings ( Profile, Automations, Knowledge Base, Calling )

Campaigns ( a single module no accordions )

Inbox ( a single module no accordions )

For the topbar, on the left side, first is the Route and Backlinks for the module then next is the global search bar on click which would open a modal with all the recent searches and user can serach anything on the SaaS directly from this serach bar modal. 

on the right side, first is the Dialer icon button that will open the dialer sub module, second is the notification icon button on click it opens a dropdown wth all the notifications, then teh Profile dropfdown dropdown would have prodile link , Sttings, help and support, signout and theme toggle.

on the bottom right corner is the AI copilot button , on click, opens a drawer on with agent chat window,  chat window would at the top righ corner a icon btn of previosu conversations, a dropdown of all the previosu chat conversations, and then a new conversation button which startsa a new conversation.

then coppilot button woudl hide if any drawer opens from the Right side

For Create/Edit records ro any data , it will always use modals and to display details it will always use right drawer.

For every Crud operation, There needs to a confirmation dialog, mainly for creating and deleting 

For every Create operation there needs to be a draft option as well, 

For Notifications teh Notificaiton/Alerts/Reminder icon button would have a badge showing how many Notificaiton/Alerts/Reminder their are

Notificaiton/Alerts/Reminder each would have a different color badge, if their 2  Notificaiton/ 3 Alerts/ 2 Reminders then the badge would show combined Notificaiton/Alerts/Reminders for all 

an alert would also show a toast at the top right cornor below the topbar for 10 sec 

a reminder would have a bigger toast with all the details for teh reminder and user needs to manually close it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/892c8f62-f5f4-4917-a2f8-abfa8ff127a8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
