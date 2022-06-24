# Double Agent Scroll 
ES Module that automatically updates nav element or list group based on scroll position to indicate which link is currently active in the viewport. Also, when nav elements or list groups are clicked smooth scroll is being applied plus history push state.


#### ⌨️ Install from the command line:
```shell
$ npm install @inhaltone/double-agent-scroll@1.0.16
````

#### Install via package.json:
````json
"@inhaltone/double-agent-scroll": "1.0.16"
````

## Declare
import ES module to your app

```js
import { DoubleAgentScroll } from "@inhaltone/double-agent-scroll";
```
## Initialize
Initialize Double Agent Scroll with default constructor params

````js

const doubleAgentScroll = new DoubleAgentScroll();

````
By default, the instance corresponds to the below HTML structure

## HTML Layout

``````html

<!-- Navigation container -->
<nav id="doubleScrollAgent">
    <!-- href corresponds to IDs of children of scrollable container below -->
    <a href="#sectionFirst">Section First</a>
    <a href="#sectionSecond">Section Second</a>
    <a href="#sectionThird">Section Third</a>
    ...
</nav>

<!-- Scroll Agent container -->
<!-- data-scroll-target for scrollable container corresponds to navigation container ID value -->
<div data-scroll-target="doubleScrollAgent">
    <section id="sectionFirst">
        <h3>Section First</h3>
        <p>JS Module... </p>
    </section>
    <section id="sectionSecond">
        <h3>Section First</h3>
        <p>JS Module... </p>
    </section>
    <section id="sectionThird">
        <h3>Section Third</h3>
        <p>JS Module... </p>
    </section>
    ...
</div>

``````
## Syntax
The DoubleAgentScroll() constructor returns a newly created object representing the scroll HTML structure defined by the parameters.
```js
new DoubleAgentScroll();
new DoubleAgentScroll(element, params);
```
### Parameters

#### element <sup>*optional*</sup>
A string or any other object with a stringifier
#### params <sup>*optional*</sup>
An object with predefined keys
````js
let params: {
    offsetTop: Number,
    activeClassName: String
};
````
## Example

```js

const doubleAgentScroll = new DoubleAgentScroll('myAgent', {
    offsetTop: 100,
    activeClassName: 'current-section'
});
```

## Methods

``````js
// Get current index
const activeIndex = doubleAgentScroll.getActiveIndex();

// Get navigation element
const navElement = doubleAgentScroll.getScrollNavElement();

// Get children element from scrollable target container
const scrollableSections = doubleAgentScroll.getScrollTargetChildren();

// Get navigation link elements
const navLinks = doubleAgentScroll.getScrollNavChildren();

//Get current URL object with hash params
const currentUrl = doubleAgentScroll.getCurrentURL();

//Set scroll position programmaticaly
doubleAgentScroll.setScrollPosition(scrollableSection);

``````