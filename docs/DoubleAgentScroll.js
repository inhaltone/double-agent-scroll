export class DoubleAgentScroll {
    scrollTarget = 'doubleScrollAgent';
    offsetTop = 100;
    activeClassName = 'active';
    scrollTargetElement;
    scrollNavElement;
    scrollTargetChildren;
    scrollNavChildren;
    activeIndex;
    url;

    constructor(...args) {
        if (args.length === 1 && typeof args[0] === 'string') {
            this.scrollTarget = args[0];
        } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') {
            this.scrollTarget = args[0];
            Object.assign(this, args[1]);
        }
        if(typeof window !== 'undefined') {
            this.scrollTargetElement = this.getScrollTarget();
            this.scrollNavElement = this.getScrollNavElement();
            this.scrollTargetChildren = this.getScrollTargetChildren();
            this.scrollNavChildren = this.getScrollNavChildren();
            this.activeIndex = this.getActiveIndex();
            this.url = this.getCurrentURL();
            this.#main();
        }
    };

    #main(){
        this.scrollTargetElement.addEventListener('scroll', this.onTargetScroll.bind(this));
        this.scrollNavChildren.forEach(link => link.addEventListener('click', this.onNavClick.bind(this)));
        this.setActiveClass(this.activeIndex);
        this.findHashOnURL();
    };

    onTargetScroll(){
        this.updateAgentState();
    };

    updateAgentState() {
        const activeIndex = this.getActiveIndex();
        if (activeIndex !== this.activeIndex) {
            const activeSectionId = this.scrollTargetChildren[activeIndex].getAttribute('id');
            this.url = this.setHashOnURL(activeSectionId);
            this.clearActiveState();
            this.setActiveClass(activeIndex);
            this.activeIndex = activeIndex;
        }
    };

    onNavClick(event){
        event.preventDefault();
        const target = this.extractHashString(event.currentTarget.getAttribute('href'));
        this.url = this.setHashOnURL(target);
        const foundSection = this.setFoundSection(target);
        this.setScrollPosition(foundSection);
    };

    extractHashString(hashString) {
        return hashString.replace(/#(\S)/g, '$1');
    };

    findHashOnURL() {
        if (this.url.hash !== '') {
            const target = this.url.hash.replace(/#(\S)/g, '$1');
            const foundSection = this.setFoundSection(target);
            this.setScrollPosition(foundSection);
        }
    };

    getActiveIndex() {
        const foundIndex = this.scrollTargetChildren.length - [...this.scrollTargetChildren].reverse().findIndex((section) => this.scrollTargetElement.scrollTop >= section.offsetTop - this.offsetTop) - 1;
        if (foundIndex > this.scrollTargetChildren.length - 1) {
            return 0;
        } else {
            return foundIndex;
        }
    };

    getScrollTarget() {
        if (typeof window !== 'undefined') {
            return document.querySelector(`[data-scroll-target="${this.scrollTarget}"]`);
        }
    };

    getScrollNavElement() {
        if (typeof window !== 'undefined') {
            return document.getElementById(this.scrollTarget);
        }
    };

    getScrollTargetChildren() {
        if (typeof window !== 'undefined') {
            return Array.from(this.scrollTargetElement.querySelectorAll('[id]'));
        }
    };

    getScrollNavChildren() {
        if (typeof window !== 'undefined') {
            return Array.from(this.scrollNavElement.querySelectorAll('a'));
        }
    };

    getCurrentURL() {
        return new URL(window.location);
    };

    setHashOnURL(target) {
        const url = new URL(window.location);
        url.hash = target;
        window.history.pushState({}, '', url);
        return url;
    };

    setFoundSection(target) {
        const foundSection = this.scrollTargetChildren.find((section) => section.id === target);
        if (foundSection !== undefined) {
            return foundSection;
        }
    };

    setScrollPosition(section) {
        this.scrollTargetElement.scrollTo({
            top: section.offsetTop - this.offsetTop,
            left: 0,
            behavior: 'smooth',
        });
    };

    setActiveClass(index) {
        this.scrollNavChildren[index].classList.add(this.activeClassName);
    };

    clearActiveState() {
        const removeActiveClass = (key) => {
            this.scrollNavChildren[key].classList.remove(this.activeClassName);
        };

        [...Array(this.scrollTargetChildren.length).keys()].forEach((key) => removeActiveClass(key));
    };
}