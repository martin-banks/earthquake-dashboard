# Earthquake dashboard

Re-visit of an old project looking at USGS data of all recorded earthquakes around hte world. The initial project was a simple POC exploring the data; but I wanted to take it further; so here we are.


## The challenge

Create an interactive dashboard to visualise global earthquake data, it must include:

- Display all events on an interactive globe.
- Each event on the globe must reflect it's magnitude.
- Select custom date rate.
- Display a timeline of all of the events.
  - Each event should also represent the magnitude.
- Filter the events by magnitude range.
- Display a chart of the totals for all of the magnitudes in the range.
- Filter the events by those that were felt and those that triggered tsunami warnings.


## Tech used

- Gatsby v3.0 (React).
- React styled components.
- THREE.js from the `react-three-fiber` package.
- `react-input-range` (at the time I didn't want to focus on re-creating something that already existed).


## Approach



## Take aways

**Need to plan out component structure more thoroughly at design phase**

I found myself creating vast files with massive DOM structure, styles and functionality. Considering the purpose of each component and how the data would flow (more on that later) I could have acheieved a much more streamlined project structure relying less on nesting multiple components.


**Need to better plan how data is handled**

I found myself having to change where data was fetched from and how it was passed around a couple of times as the project developed.


**Target for next project**

Build out a non-functional skeleton of the project first with a clear focus on how data will flow.

