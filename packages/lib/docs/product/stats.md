# Reading Stats

The reader should be able to track their reading progress.

## What is of value?

### Definitly of Value

- How much have I read over the last few days?
  - How much of this time is active reading?
- When do I usually read? Reading hot-spots.
- What are my least productive reading times?
  - These are times where I read or try to read but then just quit.
- What articles do I start but never finish?
- What articles do I always finish?
- What is my reading hotspot like?

## Maybe of Value

- What topics am I interested in?
  - What topics do I spend most of my time on?

## Possible models

### Tracker

- When the user starts reading an article, the tracker starts.
- The tracker tracks the user behaviour as long as the tracker component is mounted.
  - Active time
  - Idle time
- The tracker makes the call to the api
  - On specific events
  - On long-ish fixed intervals

### API

- The

## New

### Tracker
- Create a jotai atom called sessionId
  - Find a way to know when the session id expires
- When the user opens a reader and triggers the state - isActive
  - A session is created using a `creatSession` function
    - The atom is set to this value.
- As the reader keeps reading, the `updateProgress` function keeps running:
  - On specific events
  - On long-ish fixed intervals
- The session exprires either when the app is closed or when some trigger for idleness is hit.

### API
- When the `createSession is called`
  - A session is created and a article is connected to the session.
- When the `updateProgress` function is called

### Sidenotes

- Decide your reading target at the beginnning of signup.
  - con: might not be needed for people who already read.


### Tracking Algorithm

`updateProgress`


