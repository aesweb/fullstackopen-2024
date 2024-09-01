```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    activate server
    server-->>browser: The server responds with status code 201 created.
    deactivate server

    Note over browser: The server does not ask for a redirect, the browser stays on the same page
```
