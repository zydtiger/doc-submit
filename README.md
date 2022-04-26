# README
---
## How to run
```
yarn
yarn start
```
## Essential Pages
| Path       | Method | Params                                 | Function                                                    |
| ---------- | ------ | -------------------------------------- | ----------------------------------------------------------- |
| /          | Get    | None                                   | Return the control page for adding events                   |
| /submit    | Get    | event                                  | Return the submission page for the queried event            |
| /upload    | Post   | The file content                       | Accept the file contents and append it to the desired event |
| /makeevent | Post   | event                                  | Make a new event (which is actually a directory)            |
| /files.*   | Get    | None, or rather, the path is the param | Navigate to the desired file path                           |
## Default Admin Password
Username: Admin
Password: 123456
> Authentication necessary at all pages except submission, protecting the files to an extent
> Not sure how long the account would be stored
