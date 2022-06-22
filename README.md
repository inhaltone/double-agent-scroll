# Double Agent Scroll 
JS Module that automatically updates nav element or list group based on scroll position to indicate which link is currently active in the viewport. Also, when nav elements or list groups are clicked smooth scroll is being applied plus history push state.


#### ⌨️ Install from the command line:
````bash
$ npm install @inhaltone/double-agent-scroll@1.0.4
````

#### Install via package.json:
````json
"@inhaltone/double-agent-scroll": "1.0.4"
````

## Use
import module to your app

```js
import {DoubleAgentScroll} from "@inhaltone/double-agent-scroll";
```
Initialize Double Agent Scroll by creating an instance

````js

const das = new DoubleAgentScroll(...);

````
By default, the instance captures the below mark up structure
### HTML Layout

``````html

<!-- Navigation container -->
<nav>
    <!-- link -->
    <a href="#" class="double-agent-link active"></a>
    <a href="#" class="double-agent-link"></a>
    ...
</nav>

<!-- Scroll Agent container -->
<div id="double-agent">
    <!-- Scroll Agent section to spy on -->
    <section class="double-agent-section"></section>
    <section class="double-agent-section"></section>
    ...
</div>

``````
### Initialize DoubleAgentScroll

```js

const doubleAgent = new DoubleAgentScroll('.double-agent', {
    offsetTop: Number,
    navClass: String,
    sectionClass: String
});
```

### Methods

``````js
// Get links
const navElements = doubleAgent.getNavElements();

// Get sections
const sectionElements = doubleAgent.getSectionElements();

``````